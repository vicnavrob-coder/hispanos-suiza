import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getCitaByToken, updateCitaByToken } from "@/lib/unia-citas";
import { emailConfirmacionUsuario, emailConfirmacionUnia } from "@/lib/email-templates-unia";

const GMAIL_USER = process.env.NEWSLETTER_GMAIL_USER ?? "";
const GMAIL_PASS = process.env.NEWSLETTER_GMAIL_PASS ?? "";
// TEST MODE: Victor as UNIA, Oscar as user
// PRODUCTION: Change to "adriana.taddeo@uni.ch"
const UNIA_CONTACT_EMAIL = "vic_nav@hotmail.com";

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, horarioElegido } = body as {
      token: string;
      horarioElegido: string;
    };

    // Validation
    if (!token) {
      return NextResponse.json({ error: "Token requerido" }, { status: 400 });
    }

    if (!horarioElegido) {
      return NextResponse.json({ error: "Horario requerido" }, { status: 400 });
    }

    // Get the appointment
    const cita = await getCitaByToken(token);
    if (!cita) {
      return NextResponse.json({ error: "Cita no encontrada" }, { status: 404 });
    }

    if (cita.status !== "propuesta") {
      return NextResponse.json({ error: "Esta cita no está disponible para confirmar" }, { status: 400 });
    }

    // Verify the selected time is one of the proposed options
    const validHorarios = [
      cita.horariosPropuestos?.opcion1,
      cita.horariosPropuestos?.opcion2,
      cita.horariosPropuestos?.opcion3,
    ].filter(Boolean);

    if (!validHorarios.includes(horarioElegido)) {
      return NextResponse.json({ error: "Horario no válido" }, { status: 400 });
    }

    // Update appointment
    const updated = await updateCitaByToken(token, {
      status: "confirmada",
      horarioConfirmado: horarioElegido,
      confirmadaAt: new Date().toISOString(),
    });

    if (!updated) {
      return NextResponse.json({ error: "Error al confirmar la cita" }, { status: 500 });
    }

    // Send confirmation emails
    if (GMAIL_USER && GMAIL_PASS) {
      const transporter = getTransporter();
      const confirmacionData = {
        userName: cita.userName,
        userEmail: cita.userEmail,
        userTelefono: cita.userTelefono,
        horarioConfirmado: horarioElegido,
        formato: cita.formato!,
      };

      // Email to user
      try {
        await transporter.sendMail({
          from: `"HispanosEnSuiza" <${GMAIL_USER}>`,
          to: cita.userEmail,
          subject: "¡Tu cita con UNIA está confirmada!",
          html: emailConfirmacionUsuario(confirmacionData),
        });
        console.log(`[unia/elegir] Confirmation sent to user ${cita.userEmail}`);
      } catch (err) {
        console.error("[unia/elegir] Failed to send user email:", err);
      }

      // Email to UNIA
      if (UNIA_CONTACT_EMAIL) {
        try {
          await transporter.sendMail({
            from: `"HispanosEnSuiza" <${GMAIL_USER}>`,
            to: UNIA_CONTACT_EMAIL,
            replyTo: cita.userEmail,
            subject: `Cita confirmada: ${cita.userName}`,
            html: emailConfirmacionUnia(confirmacionData),
          });
          console.log(`[unia/elegir] Confirmation sent to UNIA`);
        } catch (err) {
          console.error("[unia/elegir] Failed to send UNIA email:", err);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[unia/elegir] Error:", err);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
