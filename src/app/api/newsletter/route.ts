import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const GMAIL_USER = process.env.NEWSLETTER_GMAIL_USER ?? "";
const GMAIL_PASS = process.env.NEWSLETTER_GMAIL_PASS ?? "";
const NOTIFY_TO  = process.env.NEWSLETTER_NOTIFY_TO ?? GMAIL_USER;

const BREVO_API_KEY = process.env.BREVO_API_KEY ?? "";
const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID ?? "2", 10);

// ID del template 1 en Brevo: "HES-01 Bienvenida + Calculadora salario"
const BREVO_TEMPLATE_WELCOME = 1;

/** Envía un email transaccional usando un template de Brevo */
async function sendBrevoTemplate(
  toEmail: string,
  toName: string,
  templateId: number,
  params?: Record<string, string>,
) {
  return fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": BREVO_API_KEY, "content-type": "application/json" },
    body: JSON.stringify({
      templateId,
      to: [{ email: toEmail, name: toName || toEmail }],
      params: params ?? {},
    }),
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

  // ── Brevo: añadir contacto + iniciar secuencia ───────────────────────────
  if (BREVO_API_KEY) {
    try {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

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
          attributes: {
            NOMBRE:        nombre || undefined,
            SOURCE:        "footer-hispanosensuiza",
            WELCOME_STEP:  "1",
            WELCOME_START: today,
          },
        }),
      });

      const alreadyExists =
        res.status === 204 ||
        (await res.json().catch(() => ({}))).code === "duplicate_parameter";

      // Enviar email de bienvenida (email 1) solo a contactos nuevos
      if (!alreadyExists && res.ok) {
        await sendBrevoTemplate(email, nombre, BREVO_TEMPLATE_WELCOME);
      }

      return NextResponse.json({ ok: true, already: alreadyExists });
    } catch {
      // Brevo falló — continuar con fallback
    }
  }

  // ── Fallback: notificación Gmail ─────────────────────────────────────────
  if (GMAIL_USER && GMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: GMAIL_USER, pass: GMAIL_PASS },
      });
      await transporter.sendMail({
        from:    `"HispanosEnSuiza" <${GMAIL_USER}>`,
        to:      NOTIFY_TO,
        subject: `📩 Nuevo suscriptor newsletter — ${email}`,
        text:    `Nuevo suscriptor:\n\n${email}\n${nombre ? `Nombre: ${nombre}\n` : ""}Fecha: ${new Date().toISOString()}`,
      });
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[newsletter] Gmail error:", err);
      return NextResponse.json({ error: "Error al suscribir" }, { status: 502 });
    }
  }

  console.warn("[newsletter] Sin credenciales — modo simulación");
  return NextResponse.json({ ok: true, simulated: true });
}
