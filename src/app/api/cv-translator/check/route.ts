import { NextRequest, NextResponse } from "next/server";
import { canUserTranslate } from "@/lib/cv-usage";

export const runtime = "nodejs";

/**
 * GET /api/cv-translator/check?email=...
 *
 * Check if user can translate a CV (has free credit or subscription).
 * Call this BEFORE uploading to avoid wasting resources.
 */
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  const result = await canUserTranslate(email);

  return NextResponse.json({
    allowed: result.allowed,
    reason: result.reason,
    freeUsed: result.freeUsed,
    hasSubscription: result.hasSubscription,
    // Pricing info for paywall
    pricing: {
      monthly: { price: 9.90, currency: "CHF", cvLimit: "unlimited" },
      yearly: { price: 79, currency: "CHF", cvLimit: "unlimited", savings: "33%" },
      perCv: { price: 4.90, currency: "CHF" },
    },
  });
}
