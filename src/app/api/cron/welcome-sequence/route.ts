import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSubscribers, markEmailSent, canSendEmail } from "@/lib/subscribers";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";

export const runtime = "nodejs";

const GMAIL_USER = process.env.NEWSLETTER_GMAIL_USER ?? "";
const GMAIL_PASS = process.env.NEWSLETTER_GMAIL_PASS ?? "";

// Días de espera desde WELCOME_START para cada email
const SCHEDULE: Record<number, number> = {
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
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!GMAIL_USER || !GMAIL_PASS) {
    return NextResponse.json({ error: "Gmail credentials not configured" }, { status: 500 });
  }

  const subs = await getSubscribers();
  if (subs.length === 0) {
    return NextResponse.json({ sent: 0, errors: [], message: "No subscribers" });
  }

  const transporter = getTransporter();
  let totalSent = 0;
  const errors: string[] = [];

  for (const sub of subs) {
    // Saltar si secuencia completa, no iniciada, o blacklisted
    if (!sub.welcomeStart || sub.welcomeStep === 0 || sub.welcomeStep >= 5 || sub.blacklisted) {
      continue;
    }

    // Guard: no enviar si se envió hace menos de 20 horas (previene duplicados)
    if (!canSendEmail(sub)) {
      continue;
    }

    const nextStep = sub.welcomeStep + 1;
    const minDays = SCHEDULE[nextStep];
    if (!minDays) continue;

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

      // Guardar INMEDIATAMENTE después de cada envío (no batch)
      // Re-lee el Gist para evitar sobreescribir cambios concurrentes
      const saved = await markEmailSent(sub.email, nextStep);
      if (!saved) {
        errors.push(`${sub.email}: email sent but step update failed`);
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
