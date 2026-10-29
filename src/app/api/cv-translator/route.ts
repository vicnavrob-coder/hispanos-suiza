import { NextRequest, NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import { canUserTranslate, recordTranslation } from "@/lib/cv-usage";
import { addToQueue, getQueueItem } from "@/lib/cv-queue";

export const runtime = "nodejs";
export const maxDuration = 30;

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
    photo?: string;
  };
  professionalSummary: string;
  workExperience: Array<{
    position: string;
    company: string;
    location?: string;
    startDate: string;
    endDate: string;
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

/**
 * POST /api/cv-translator
 *
 * Adds CV to processing queue. CVs are processed by Nexus (Claude) manually.
 * Returns a queue ID for polling status.
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const email = formData.get("email") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Check if user can translate (has free credit or subscription)
    const usageCheck = await canUserTranslate(email);
    if (!usageCheck.allowed) {
      return NextResponse.json(
        {
          error: "limit_reached",
          message: "Ya has usado tu traducción gratuita. Suscríbete para traducir más CVs.",
          freeUsed: usageCheck.freeUsed,
          pricing: {
            monthly: { price: 9.90, currency: "CHF" },
            yearly: { price: 79, currency: "CHF" },
            perCv: { price: 4.90, currency: "CHF" },
          },
        },
        { status: 402 }
      );
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

    // Get file buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Add to processing queue
    const queueResult = await addToQueue(
      email,
      file.name,
      isPDF ? "pdf" : "docx",
      buffer
    );

    if (!queueResult.ok || !queueResult.id) {
      return NextResponse.json(
        { error: "Failed to queue CV for processing" },
        { status: 500 }
      );
    }

    // Record usage - isPaid if subscription OR if they already used their free one
    const isPaid = usageCheck.hasSubscription || usageCheck.freeUsed > 0;
    await recordTranslation(email, isPaid);

    return NextResponse.json({
      ok: true,
      status: "queued",
      queueId: queueResult.id,
      message: "Tu CV está en cola. Te notificaremos por email cuando esté listo.",
      estimatedTime: "1-4 horas (horario laboral)",
    });
  } catch (e) {
    console.error("CV queue error:", e);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/cv-translator?id=...
 *
 * Check status of a queued CV translation
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Queue ID required" }, { status: 400 });
  }

  const item = await getQueueItem(id);

  if (!item) {
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }

  // Don't expose file content in response
  const response: {
    id: string;
    status: string;
    createdAt: string;
    processedAt?: string;
    cv?: CVData;
    error?: string;
  } = {
    id: item.id,
    status: item.status,
    createdAt: item.createdAt,
    processedAt: item.processedAt,
  };

  if (item.status === "completed" && item.result) {
    response.cv = item.result.cv;
  }

  if (item.status === "error") {
    response.error = item.error;
  }

  return NextResponse.json(response);
}
