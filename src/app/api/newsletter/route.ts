import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// nodemailer requiere Node.js runtime (no funciona en Edge)
export const runtime = "nodejs";
import { addSubscriber, markEmailSent } from "@/lib/subscribers";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";
import { SubscriberSchema, validateData, getValidationErrorMessage } from "@/lib/validation-schemas";

const GMAIL_USER = process.env.NEWSLETTER_GMAIL_USER ?? "";
const GMAIL_PASS = process.env.NEWSLETTER_GMAIL_PASS ?? "";

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod
    const validation = validateData(SubscriberSchema, {
      email: typeof body.email === 'string' ? body.email.trim().toLowerCase() : body.email,
      nombre: typeof body.nombre === 'string' ? body.nombre.trim() : body.nombre,
      origen: body.origen,
    });

    if (!validation.success) {
      return NextResponse.json(
        { error: getValidationErrorMessage(validation.errors) },
        { status: 400 }
      );
    }

    const { email, nombre } = validation.data;

    // ── Guardar suscriptor (welcomeStep: 0 = email pendiente) ──
    const { ok, already } = await addSubscriber(email, nombre || "");

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
          html: template.html(nombre || ""),
        });

        // Solo marcar como enviado DESPUÉS de enviar exitosamente
        await markEmailSent(email, 1);
      } catch (err) {
        // Email NO enviado — welcomeStep queda en 0 → el cron lo reintentará
      }
    }

    return NextResponse.json({ ok: true, already });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al procesar suscripción" },
      { status: 500 }
    );
  }
}
