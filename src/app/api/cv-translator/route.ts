import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export const runtime = "nodejs";
export const maxDuration = 60; // Allow up to 60s for AI processing

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Structured CV data for Swiss-style CV
export interface CVData {
  personalInfo: {
    fullName: string;
    dateOfBirth?: string;
    nationality?: string;
    maritalStatus?: string;
    address?: string;
    phone?: string;
    email?: string;
    photo?: string; // URL or base64
  };
  professionalSummary: string;
  workExperience: Array<{
    position: string;
    company: string;
    location?: string;
    startDate: string;
    endDate: string; // or "Present" / "Heute"
    responsibilities: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location?: string;
    startDate?: string;
    endDate: string;
    details?: string;
  }>;
  skills: {
    languages: Array<{ language: string; level: string }>;
    technical: string[];
    soft: string[];
  };
  certifications?: Array<{
    name: string;
    issuer?: string;
    date?: string;
  }>;
  interests?: string[];
}

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  return result.text;
}

async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

async function translateAndStructureCV(rawText: string): Promise<CVData> {
  const systemPrompt = `Eres un experto en recursos humanos especializado en CVs para el mercado laboral suizo/alemán.

Tu tarea es:
1. Extraer toda la información del CV proporcionado
2. Traducir TODO al alemán (Hochdeutsch)
3. Estructurar según el formato suizo estándar
4. Adaptar la terminología al mercado laboral suizo/alemán

IMPORTANTE sobre el estilo suizo:
- Formato cronológico inverso (más reciente primero)
- Fechas en formato: MM/YYYY o "Heute" para presente
- Niveles de idioma según Marco Común Europeo: Muttersprache, C2, C1, B2, B1, A2, A1
- Títulos académicos adaptados al sistema DACH (Bachelor, Master, Doktor, etc.)
- Cargos laborales en alemán estándar

Devuelve SOLO un JSON válido con esta estructura exacta (sin markdown, sin explicaciones):
{
  "personalInfo": {
    "fullName": "string",
    "dateOfBirth": "string o null",
    "nationality": "string o null",
    "maritalStatus": "string o null (ledig/verheiratet/geschieden)",
    "address": "string o null",
    "phone": "string o null",
    "email": "string o null"
  },
  "professionalSummary": "string - resumen profesional en alemán, 2-3 frases",
  "workExperience": [
    {
      "position": "cargo en alemán",
      "company": "nombre empresa",
      "location": "ciudad, país",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY o Heute",
      "responsibilities": ["responsabilidad 1 en alemán", "..."]
    }
  ],
  "education": [
    {
      "degree": "título en alemán",
      "institution": "nombre institución",
      "location": "ciudad, país",
      "startDate": "MM/YYYY o null",
      "endDate": "MM/YYYY",
      "details": "detalles adicionales o null"
    }
  ],
  "skills": {
    "languages": [
      {"language": "Spanisch", "level": "Muttersprache"},
      {"language": "Deutsch", "level": "B2"}
    ],
    "technical": ["habilidad técnica 1", "..."],
    "soft": ["habilidad blanda en alemán", "..."]
  },
  "certifications": [
    {
      "name": "nombre certificación",
      "issuer": "emisor o null",
      "date": "MM/YYYY o null"
    }
  ],
  "interests": ["interés en alemán", "..."]
}

Si algún campo no está en el CV original, usa null o array vacío según corresponda.
Traduce TODO al alemán, incluyendo nombres de habilidades, responsabilidades, etc.`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: `Aquí está el CV a traducir y adaptar al formato suizo:\n\n${rawText}`,
      },
    ],
    system: systemPrompt,
  });

  // Extract text from response
  const textContent = response.content.find((c) => c.type === "text");
  if (!textContent || textContent.type !== "text") {
    throw new Error("No text response from AI");
  }

  // Parse JSON from response
  let jsonStr = textContent.text.trim();

  // Remove markdown code blocks if present
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  try {
    return JSON.parse(jsonStr) as CVData;
  } catch (e) {
    console.error("Failed to parse CV JSON:", jsonStr);
    throw new Error("Failed to parse AI response as JSON");
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "AI service not configured" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const email = formData.get("email") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Validate file type
    const fileName = file.name.toLowerCase();
    const isPDF = fileName.endsWith(".pdf");
    const isDOCX = fileName.endsWith(".docx");

    if (!isPDF && !isDOCX) {
      return NextResponse.json(
        { error: "Only PDF and DOCX files are supported" },
        { status: 400 }
      );
    }

    // File size limit (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 5MB)" },
        { status: 400 }
      );
    }

    // Extract text from file
    const buffer = Buffer.from(await file.arrayBuffer());
    let rawText: string;

    try {
      if (isPDF) {
        rawText = await extractTextFromPDF(buffer);
      } else {
        rawText = await extractTextFromDOCX(buffer);
      }
    } catch (e) {
      console.error("Text extraction error:", e);
      return NextResponse.json(
        { error: "Could not read file content" },
        { status: 400 }
      );
    }

    if (!rawText || rawText.trim().length < 50) {
      return NextResponse.json(
        { error: "Could not extract enough text from file. Is it a valid CV?" },
        { status: 400 }
      );
    }

    // Translate and structure with AI
    const cvData = await translateAndStructureCV(rawText);

    // TODO: Track usage in Gist (email, date, free/paid)

    return NextResponse.json({
      ok: true,
      cv: cvData,
      originalLength: rawText.length,
    });
  } catch (e) {
    console.error("CV translation error:", e);
    return NextResponse.json(
      { error: "Failed to process CV. Please try again." },
      { status: 500 }
    );
  }
}
