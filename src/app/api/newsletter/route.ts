import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const GMAIL_USER = process.env.NEWSLETTER_GMAIL_USER ?? "";
const GMAIL_PASS = process.env.NEWSLETTER_GMAIL_PASS ?? "";
const NOTIFY_TO  = process.env.NEWSLETTER_NOTIFY_TO ?? GMAIL_USER;

// Brevo como backend secundario (cuando esté configurado)
const BREVO_API_KEY = process.env.BREVO_API_KEY ?? "";
const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID ?? "2", 10);

export async function POST(req: NextRequest) {
  let email: string;

  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  // Intentar Brevo si está configurado
  if (BREVO_API_KEY) {
    try {
      const res = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": BREVO_API_KEY,
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email,
          listIds: [BREVO_LIST_ID],
          updateEnabled: true,
          attributes: { SOURCE: "footer-hispanosensuiza" },
        }),
      });

      if (res.ok || res.status === 204) return NextResponse.json({ ok: true });

      const data = await res.json().catch(() => ({}));
      if (data.code === "duplicate_parameter" || data.code === 17) {
        return NextResponse.json({ ok: true, already: true });
      }
    } catch {
      // Brevo failed — fallback to Gmail notification
    }
  }

  // Fallback: notificación por Gmail (siempre activo si hay credenciales)
  if (GMAIL_USER && GMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: GMAIL_USER, pass: GMAIL_PASS },
      });

      await transporter.sendMail({
        from: `"HispanosEnSuiza" <${GMAIL_USER}>`,
        to: NOTIFY_TO,
        subject: `📩 Nuevo suscriptor newsletter — ${email}`,
        text: `Nuevo suscriptor en hispanosensuiza.ch:\n\n${email}\n\nFecha: ${new Date().toISOString()}`,
        html: `<p><strong>Nuevo suscriptor en hispanosensuiza.ch:</strong></p><p>${email}</p><p style="color:#9CA3AF;font-size:12px">${new Date().toISOString()}</p>`,
      });

      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[newsletter] Gmail error:", err);
      return NextResponse.json({ error: "Error al suscribir" }, { status: 502 });
    }
  }

  // Sin configuración — modo dev
  console.warn("[newsletter] Sin credenciales configuradas — modo simulación");
  return NextResponse.json({ ok: true, simulated: true });
}
