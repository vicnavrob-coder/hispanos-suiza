import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getCitaByToken, updateCitaByToken, type CitaFormato, type HorariosPropuestos } from "@/lib/unia-citas";
import { emailHorariosUsuario } from "@/lib/email-templates-unia";

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
    const { token, horarios, formato } = body as {
      token: string;
      horarios: { opcion1: string; opcion2: string; opcion3?: string };
      formato: CitaFormato;
    };

    // Validation
    if (!token) {
      return NextResponse.json({ error: "Token requerido" }, { status: 400 });
    }

    if (!horarios?.opcion1 || !horarios?.opcion2) {
      return NextResponse.json({ error: "Se requieren al menos 2 horarios" }, { status: 400 });
    }

    if (!["videollamada", "telefono", "presencial"].includes(formato)) {
      return NextResponse.json({ error: "Formato inválido" }, { status: 400 });
    }

    // Get the appointment
    const cita = await getCitaByToken(token);
    if (!cita) {
      return NextResponse.json({ error: "Cita no encontrada" }, { status: 404 });
    }

    if (cita.status !== "solicitud") {
      return NextResponse.json({ error: "Esta cita ya ha sido procesada" }, { status: 400 });
    }

    // Prepare horarios
    const horariosPropuestos: HorariosPropuestos = {
      opcion1: new Date(horarios.opcion1).toISOString(),
      opcion2: new Date(horarios.opcion2).toISOString(),
      opcion3: horarios.opcion3 ? new Date(horarios.opcion3).toISOString() : undefined,
    };

    // Update appointment
    const updated = await updateCitaByToken(token, {
      status: "propuesta",
      horariosPropuestos,
      formato,
      propuestaAt: new Date().toISOString(),
    });

    if (!updated) {
      return NextResponse.json({ error: "Error al actualizar la cita" }, { status: 500 });
    }

    // Send email to user
    if (GMAIL_USER && GMAIL_PASS) {
      try {
        const transporter = getTransporter();
        await transporter.sendMail({
          from: `"HispanosEnSuiza" <${GMAIL_USER}>`,
          to: cita.userEmail,
          subject: "UNIA te propone horarios para tu cita",
          html: emailHorariosUsuario({
            userName: cita.userName,
            horarios: horariosPropuestos,
            formato,
            token,
          }),
        });
        console.log(`[unia/proponer] Email sent to ${cita.userEmail}`);
      } catch (err) {
        console.error("[unia/proponer] Failed to send email:", err);
        // Continue even if email fails - the appointment is still updated
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[unia/proponer] Error:", err);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
