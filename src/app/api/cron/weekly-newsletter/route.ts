import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getActiveSubscribers, markEmailSent, canSendEmail } from "@/lib/subscribers";
import { aggregateNewsletterContent } from "@/lib/newsletter-content";
import { generateNewsletterSubject, generateNewsletterHTML } from "@/lib/email-templates";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 minutes max (Vercel Pro allows up to 300s)

const GMAIL_USER = process.env.NEWSLETTER_GMAIL_USER ?? "";
const GMAIL_PASS = process.env.NEWSLETTER_GMAIL_PASS ?? "";
const CRON_SECRET = process.env.CRON_SECRET ?? "";

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  });
}

/**
 * Send emails in chunks to avoid timeouts
 * @param emails Array of email addresses
 * @param chunkSize Number of emails per chunk
 * @param delayMs Delay between chunks in milliseconds
 */
async function sendInChunks<T>(
  items: T[],
  processor: (item: T) => Promise<void>,
  chunkSize = 50,
  delayMs = 100
): Promise<void> {
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    await Promise.all(chunk.map(processor));

    // Delay between chunks to avoid rate limiting
    if (i + chunkSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
}

export async function GET(req: NextRequest) {
  // ── Authentication ──
  const authHeader = req.headers.get("authorization");
  const secretParam = req.nextUrl.searchParams.get("secret");
  const isAuthorized =
    (authHeader === `Bearer ${CRON_SECRET}`) ||
    (secretParam && secretParam === CRON_SECRET);

  if (!CRON_SECRET || !isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!GMAIL_USER || !GMAIL_PASS) {
    return NextResponse.json({ error: "Gmail credentials not configured" }, { status: 500 });
  }

  // ── Get active subscribers ──
  const subs = await getActiveSubscribers();
  if (subs === null) {
    return NextResponse.json({ error: "Failed to read subscribers" }, { status: 500 });
  }

  if (subs.length === 0) {
    return NextResponse.json({
      sent: 0,
      errors: [],
      message: "No active subscribers"
    });
  }

  // ── Filter: only send to those who can receive email (20h minimum) ──
  const eligible = subs.filter(sub => canSendEmail(sub));

  if (eligible.length === 0) {
    return NextResponse.json({
      sent: 0,
      errors: [],
      message: `${subs.length} subscribers but none eligible (20h rate limit)`
    });
  }

  console.log(`[weekly-newsletter] ${eligible.length} eligible subscribers out of ${subs.length} total`);

  // ── Aggregate content ──
  let content;
  try {
    content = await aggregateNewsletterContent();
  } catch (e) {
    console.error("[weekly-newsletter] Failed to aggregate content:", e);
    return NextResponse.json({
      error: "Failed to aggregate content",
      details: String(e)
    }, { status: 500 });
  }

  // ── Generate email subject ──
  const subject = generateNewsletterSubject(content.weekNumber);

  // ── Send emails in chunks ──
  const transporter = getTransporter();
  let totalSent = 0;
  const errors: string[] = [];

  const processor = async (sub: typeof eligible[0]) => {
    try {
      const html = generateNewsletterHTML(sub.nombre, content);

      await transporter.sendMail({
        from: `"HispanosEnSuiza" <${GMAIL_USER}>`,
        to: sub.email,
        subject,
        html,
      });

      // Update lastEmailAt immediately after sending
      // Note: We don't increment welcomeStep for newsletters
      // We just update lastEmailAt to prevent duplicate sends
      const saved = await markEmailSent(sub.email, sub.welcomeStep);

      if (!saved) {
        errors.push(`${sub.email}: newsletter sent but timestamp update failed`);
      }

      totalSent++;
      console.log(`[weekly-newsletter] Sent to ${sub.email}`);
    } catch (e) {
      errors.push(`${sub.email}: ${String(e)}`);
      console.error(`[weekly-newsletter] Error sending to ${sub.email}:`, e);
    }
  };

  try {
    await sendInChunks(eligible, processor, 50, 100);
  } catch (e) {
    console.error("[weekly-newsletter] Chunk processing error:", e);
    return NextResponse.json({
      sent: totalSent,
      errors: [...errors, `Chunk error: ${String(e)}`],
      partial: true
    }, { status: 500 });
  }

  console.log(`[weekly-newsletter] Completed: ${totalSent} sent, ${errors.length} errors`);

  return NextResponse.json({
    sent: totalSent,
    errors,
    weekNumber: content.weekNumber,
    featuredType: content.featuredType,
    contentStats: {
      jobs: content.jobs.length,
      hasStory: !!content.story,
      hasBlogPost: !!content.blogPost,
      tool: content.tool.name,
    },
  });
}
