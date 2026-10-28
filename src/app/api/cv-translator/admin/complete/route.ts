import { NextRequest, NextResponse } from "next/server";
import { markCompleted, markError } from "@/lib/cv-queue";
import type { CVData } from "@/app/api/cv-translator/route";

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

    return NextResponse.json({
      ok: true,
      action: "completed",
      id,
    });
  } catch (e) {
    console.error("Admin complete error:", e);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
