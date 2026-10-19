import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { addSubscriber, markEmailSent } from "@/lib/subscribers";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";

const GMAIL_USER = process.env.NEWSLETTER_GMAIL_USER ?? "";
const GMAIL_PASS = process.env.NEWSLETTER_GMAIL_PASS ?? "";

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  });
}

export async function POST(req: NextRequest) {
  let email: string;
  let nombre = "";

  try {
    const body = await req.json();
    email  = (body.email  ?? "").trim().toLowerCase();
    nombre = (body.nombre ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  // ── Guardar suscriptor (welcomeStep: 0 = email pendiente) ──
  const { ok, already } = await addSubscriber(email, nombre);

  if (!ok) {
    return NextResponse.json({ error: "Error al guardar suscriptor" }, { status: 500 });
  }

  // ── Enviar email de bienvenida (solo a nuevos) ──
  if (!already && GMAIL_USER && GMAIL_PASS) {
    try {
      const template = EMAIL_TEMPLATES[1];
      await getTransporter().sendMail({
        from: `"HispanosEnSuiza" <${GMAIL_USER}>`,
        to: email,
        subject: template.subject,
        html: template.html(nombre),
      });

      // Solo marcar como enviado DESPUÉS de enviar exitosamente
      await markEmailSent(email, 1);
      console.log(`[newsletter] Welcome email sent to ${email}`);
    } catch (err) {
      // Email NO enviado — welcomeStep queda en 0 → el cron lo reintentará
      console.error("[newsletter] Failed to send welcome email:", err);
    }
  }

  return NextResponse.json({ ok: true, already });
}
