import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getPendingItems, markCompleted, markError, getQueueItem } from "@/lib/cv-queue";
import { emailCVCompletado } from "@/lib/email-templates";
import type { CVData } from "@/app/api/cv-translator/route";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 minutes max for processing multiple CVs

const GMAIL_USER = process.env.NEWSLETTER_GMAIL_USER ?? "";
const GMAIL_PASS = process.env.NEWSLETTER_GMAIL_PASS ?? "";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";
const CV_PROCESS_SECRET = process.env.CV_PROCESS_SECRET ?? process.env.CV_ADMIN_KEY ?? "";
const SITE = "https://hispanosensuiza.ch";

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  });
}

/**
 * Extract text from base64 PDF/DOCX content
 * Uses pdfjs-dist directly for better serverless compatibility
 */
async function extractText(fileContent: string, fileType: "pdf" | "docx"): Promise<string> {
  const buffer = Buffer.from(fileContent, "base64");

  if (fileType === "pdf") {
    try {
      // Use pdfjs-dist directly for serverless compatibility
      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

      // Disable worker to avoid issues in serverless
      pdfjsLib.GlobalWorkerOptions.workerSrc = "";

      const uint8Array = new Uint8Array(buffer);
      const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
      const pdf = await loadingTask.promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item) => ("str" in item ? (item as { str: string }).str : ""))
          .filter(Boolean)
          .join(" ");
        fullText += pageText + "\n";
      }

      return fullText.trim();
    } catch (pdfError) {
      console.error("[process-pending] PDF parsing error:", pdfError);
      throw new Error(`PDF parsing failed: ${pdfError instanceof Error ? pdfError.message : 'Unknown error'}`);
    }
  } else {
    // Dynamic import for mammoth
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }
}

/**
 * Use Claude API to translate and structure CV
 */
async function translateAndStructure(text: string): Promise<CVData> {
  const prompt = `Analiza este CV y conviértelo al formato estructurado JSON para el mercado laboral suizo.

INSTRUCCIONES:
1. Si el CV está en español, tradúcelo al alemán (Hochdeutsch)
2. Si ya está en alemán, mantenlo pero mejora la terminología profesional
3. Extrae TODA la información disponible
4. Usa terminología profesional alemana/suiza
5. Formatea las fechas como MM/YYYY o YYYY

ESTRUCTURA JSON REQUERIDA (devuelve SOLO el JSON, sin markdown):
{
  "personalInfo": {
    "fullName": "Nombre Completo",
    "dateOfBirth": "DD.MM.YYYY (si está disponible)",
    "nationality": "Nacionalidad",
    "address": "Dirección completa",
    "phone": "Teléfono",
    "email": "Email"
  },
  "professionalSummary": "Resumen profesional en alemán (2-3 frases)",
  "workExperience": [
    {
      "position": "Cargo en alemán",
      "company": "Empresa",
      "location": "Ciudad, País",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY o Aktuell",
      "responsibilities": ["Responsabilidad 1 en alemán", "..."]
    }
  ],
  "education": [
    {
      "degree": "Título en alemán",
      "institution": "Institución",
      "location": "Ciudad, País",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY"
    }
  ],
  "skills": {
    "languages": [
      {"language": "Idioma", "level": "Nivel (Muttersprache/C2/C1/B2/B1/A2/A1)"}
    ],
    "technical": ["Habilidad técnica 1", "..."],
    "soft": ["Habilidad blanda 1", "..."]
  },
  "certifications": [
    {
      "name": "Nombre certificación",
      "issuer": "Emisor",
      "date": "MM/YYYY"
    }
  ]
}

CV A PROCESAR:
${text}

Responde SOLO con el JSON válido, sin explicaciones ni markdown.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "content-type": "application/json",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data.content[0]?.text;

  if (!content) {
    throw new Error("No content in Claude response");
  }

  // Extract JSON from response (handle potential markdown code blocks)
  let jsonStr = content.trim();
  const jsonMatch = jsonStr.match(/```json\n?([\s\S]*?)\n?```/) ||
                    jsonStr.match(/```\n?([\s\S]*?)\n?```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  const cv = JSON.parse(jsonStr) as CVData;

  // Validate required fields
  if (!cv.personalInfo?.fullName) {
    throw new Error("CV missing required field: personalInfo.fullName");
  }

  return cv;
}

/**
 * Send completion email to user
 */
async function sendCompletionEmail(
  userEmail: string,
  cvId: string,
  userName: string
): Promise<boolean> {
  if (!GMAIL_USER || !GMAIL_PASS) {
    console.warn("[process-pending] Gmail credentials not configured");
    return false;
  }

  try {
    const cvUrl = `${SITE}/herramientas/traductor-cv?id=${cvId}`;
    const firstName = userName.split(" ")[0] || "Usuario";

    await getTransporter().sendMail({
      from: `"HispanosEnSuiza" <${GMAIL_USER}>`,
      to: userEmail,
      subject: "Tu CV traducido está listo 📄",
      html: emailCVCompletado(firstName, cvUrl),
    });

    console.log(`[process-pending] Email sent to ${userEmail}`);
    return true;
  } catch (err) {
    console.error("[process-pending] Failed to send email:", err);
    return false;
  }
}

/**
 * GET /api/cv-translator/process-pending?secret=...
 *
 * Automatically process all pending CVs using Claude API.
 * Called by Vercel Cron or manually by admin.
 */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!secret || secret !== CV_PROCESS_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 }
    );
  }

  const pending = await getPendingItems();

  if (pending.length === 0) {
    return NextResponse.json({
      ok: true,
      message: "No pending CVs to process",
      processed: 0,
      failed: 0,
    });
  }

  let processed = 0;
  let failed = 0;
  const results: Array<{ id: string; status: string; error?: string }> = [];

  for (const item of pending) {
    try {
      console.log(`[process-pending] Processing CV ${item.id} for ${item.email}`);

      // 1. Extract text from file
      if (!item.fileContent) {
        throw new Error("No file content available");
      }
      const text = await extractText(item.fileContent, item.fileType);

      if (!text || text.trim().length < 50) {
        throw new Error("Could not extract sufficient text from CV");
      }

      // 2. Translate and structure with Claude
      const cv = await translateAndStructure(text);

      // 3. Mark as completed
      const result = {
        cv,
        translatedAt: new Date().toISOString(),
      };

      const success = await markCompleted(item.id, result);
      if (!success) {
        throw new Error("Failed to save completed CV");
      }

      // 4. Send email notification
      const emailSent = await sendCompletionEmail(
        item.email,
        item.id,
        cv.personalInfo.fullName
      );

      processed++;
      results.push({
        id: item.id,
        status: "completed",
        error: emailSent ? undefined : "Email not sent",
      });

      console.log(`[process-pending] Successfully processed CV ${item.id}`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      console.error(`[process-pending] Failed to process CV ${item.id}:`, errorMsg);

      await markError(item.id, errorMsg);
      failed++;
      results.push({ id: item.id, status: "error", error: errorMsg });
    }
  }

  return NextResponse.json({
    ok: true,
    message: `Processed ${processed} CVs, ${failed} failed`,
    processed,
    failed,
    total: pending.length,
    results,
  });
}
