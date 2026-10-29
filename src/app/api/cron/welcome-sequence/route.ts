import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSubscribers, markEmailSent, canSendEmail } from "@/lib/subscribers";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";

export const runtime = "nodejs";

const GMAIL_USER = process.env.NEWSLETTER_GMAIL_USER ?? "";
const GMAIL_PASS = process.env.NEWSLETTER_GMAIL_PASS ?? "";
const CRON_SECRET = process.env.CRON_SECRET ?? "";

// Días de espera desde WELCOME_START para cada email
const SCHEDULE: Record<number, number> = {
  1: 0,   // Email 1 (bienvenida) → día 0 (retry si falló en signup)
  2: 3,   // Email 2 → día 3
  3: 7,   // Email 3 → día 7
  4: 14,  // Email 4 → día 14
  5: 21,  // Email 5 → día 21
};

function daysSince(dateStr: string): number {
  const start = new Date(dateStr).getTime();
  return Math.floor((Date.now() - start) / 86_400_000);
}

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  });
}

export async function GET(req: NextRequest) {
  // Vercel Cron sends Authorization header, also allow query param for manual testing
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

  const subs = await getSubscribers();
  if (subs === null) {
    return NextResponse.json({ error: "Failed to read subscribers" }, { status: 500 });
  }
  if (subs.length === 0) {
    return NextResponse.json({ sent: 0, errors: [], message: "No subscribers" });
  }

  const transporter = getTransporter();
  let totalSent = 0;
  const errors: string[] = [];

  for (const sub of subs) {
    if (sub.blacklisted) continue;

    // Guard: no enviar si se envió hace menos de 20 horas
    if (!canSendEmail(sub)) continue;

    // Determinar el siguiente email a enviar
    const nextStep = sub.welcomeStep + 1;
    if (nextStep > 5) continue; // Secuencia completa

    const minDays = SCHEDULE[nextStep];
    if (minDays === undefined) continue;

    // ¿Han pasado suficientes días?
    if (daysSince(sub.welcomeStart) < minDays) continue;

    const template = EMAIL_TEMPLATES[nextStep];
    if (!template) continue;

    try {
      await transporter.sendMail({
        from: `"HispanosEnSuiza" <${GMAIL_USER}>`,
        to: sub.email,
        subject: template.subject,
        html: template.html(sub.nombre),
      });

      // Guardar INMEDIATAMENTE después de cada envío
      const saved = await markEmailSent(sub.email, nextStep);
      if (!saved) {
        errors.push(`${sub.email}: email ${nextStep} sent but step update failed`);
      }

      totalSent++;
      console.log(`[welcome-cron] Sent email ${nextStep} to ${sub.email}`);
    } catch (e) {
      errors.push(`${sub.email}: ${String(e)}`);
    }
  }

  console.log(`[welcome-cron] Sent: ${totalSent}, Errors: ${errors.length}`);
  return NextResponse.json({ sent: totalSent, errors });
}
