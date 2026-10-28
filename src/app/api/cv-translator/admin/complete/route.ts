import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { markCompleted, markError, getQueueItem } from "@/lib/cv-queue";
import { emailCVCompletado } from "@/lib/email-templates";
import type { CVData } from "@/app/api/cv-translator/route";

export const runtime = "nodejs";

const GMAIL_USER = process.env.NEWSLETTER_GMAIL_USER ?? "";
const GMAIL_PASS = process.env.NEWSLETTER_GMAIL_PASS ?? "";
const SITE = "https://hispanosensuiza.ch";

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  });
}

/**
 * POST /api/cv-translator/admin/complete
 *
 * Mark a CV as completed with the translated result
 * Requires CV_ADMIN_KEY environment variable to be set
 */
export async function POST(req: NextRequest) {
  try {
    const adminKey = process.env.CV_ADMIN_KEY;

    if (!adminKey) {
      console.error("[cv-admin] CV_ADMIN_KEY environment variable not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const body = await req.json();
    const { key, id, cv, error: errorMsg } = body;

    if (!key || key !== adminKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    // If error message provided, mark as error
    if (errorMsg) {
      const success = await markError(id, errorMsg);
      return NextResponse.json({ ok: success, action: "error" });
    }

    // Validate CV structure
    if (!cv || !cv.personalInfo || !cv.personalInfo.fullName) {
      return NextResponse.json(
        { error: "Invalid CV structure - personalInfo.fullName required" },
        { status: 400 }
      );
    }

    // Get queue item to retrieve user email
    const queueItem = await getQueueItem(id);
    if (!queueItem) {
      return NextResponse.json(
        { error: "CV not found in queue" },
        { status: 404 }
      );
    }

    // Mark as completed with result
    const result = {
      cv: cv as CVData,
      translatedAt: new Date().toISOString(),
    };

    const success = await markCompleted(id, result);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to update CV status" },
        { status: 500 }
      );
    }

    // Send notification email to user
    let emailSent = false;
    if (GMAIL_USER && GMAIL_PASS && queueItem.email) {
      try {
        const cvUrl = `${SITE}/herramientas/traductor-cv?id=${id}`;
        const userName = cv.personalInfo?.fullName?.split(" ")[0] || "Usuario";

        await getTransporter().sendMail({
          from: `"HispanosEnSuiza" <${GMAIL_USER}>`,
          to: queueItem.email,
          subject: "Tu CV traducido está listo 📄",
          html: emailCVCompletado(userName, cvUrl),
        });

        emailSent = true;
        console.log(`[cv-translator] Email sent to ${queueItem.email} for CV ${id}`);
      } catch (err) {
        console.error("[cv-translator] Failed to send notification email:", err);
      }
    } else {
      console.warn("[cv-translator] Gmail credentials not configured, email not sent");
    }

    return NextResponse.json({
      ok: true,
      action: "completed",
      id,
      emailSent,
    });
  } catch (e) {
    console.error("Admin complete error:", e);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
