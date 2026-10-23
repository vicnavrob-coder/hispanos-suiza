import { NextRequest, NextResponse } from "next/server";
import { addJoseReferido } from "@/lib/jose-referidos";

// José's Google Calendar link
const JOSE_CALENDAR_URL = "https://calendar.app.google/pZrPbwRThpDsRW3z5";

/**
 * GET /api/seguros/jose-clic?source=asesoria&email=...&name=...
 *
 * Tracks a click to José's calendar and redirects.
 * Used to count how many people are referred to José.
 */
export async function GET(req: NextRequest) {
  const source = req.nextUrl.searchParams.get("source") || "unknown";
  const email = req.nextUrl.searchParams.get("email") || undefined;
  const name = req.nextUrl.searchParams.get("name") || undefined;

  // Anonymized IP (just for rough counting, not tracking)
  let ipHash: string | undefined;
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0].trim();
    // Only keep first two octets for privacy
    const parts = ip.split(".");
    if (parts.length >= 2) {
      ipHash = `${parts[0]}.${parts[1]}.x.x`;
    }
  }

  // Track the referral (fire and forget - don't block redirect)
  addJoseReferido({
    userEmail: email,
    userName: name,
    source,
    ipHash,
  }).catch((err) => {
    console.error("[jose-clic] Failed to track referral:", err);
  });

  // Redirect to José's calendar
  return NextResponse.redirect(JOSE_CALENDAR_URL, 302);
}

/**
 * POST /api/seguros/jose-clic
 * Body: { source, email?, name? }
 *
 * Same as GET but for programmatic tracking (returns JSON instead of redirect)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { source, email, name } = body;

    if (!source) {
      return NextResponse.json({ error: "source is required" }, { status: 400 });
    }

    const result = await addJoseReferido({
      userEmail: email,
      userName: name,
      source,
    });

    if (!result.ok) {
      return NextResponse.json({ error: "Failed to track referral" }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      id: result.id,
      calendarUrl: JOSE_CALENDAR_URL,
    });
  } catch (err) {
    console.error("[jose-clic] POST error:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
