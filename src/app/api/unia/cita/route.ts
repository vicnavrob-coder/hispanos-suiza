import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { addUniaCita, getCitaByToken } from "@/lib/unia-citas";
import { emailSolicitudUnia, emailReciboSolicitud } from "@/lib/email-templates-unia";

const GMAIL_USER = process.env.NEWSLETTER_GMAIL_USER ?? "";
const GMAIL_PASS = process.env.NEWSLETTER_GMAIL_PASS ?? "";
const UNIA_CONTACT_EMAIL = "adriana.taddeo@unia.ch";

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  });
}

// GET: Fetch appointment by token (used by proponer/elegir pages)
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token requerido" }, { status: 400 });
  }

  const cita = await getCitaByToken(token);

  if (!cita) {
    return NextResponse.json({ error: "Cita no encontrada" }, { status: 404 });
  }

  // Return only necessary fields (hide sensitive data like full token in list views)
  return NextResponse.json({
    cita: {
      id: cita.id,
      userName: cita.userName,
      userEmail: cita.userEmail,
      userPais: cita.userPais,
      userTelefono: cita.userTelefono,
      userMensaje: cita.userMensaje,
      status: cita.status,
      horariosPropuestos: cita.horariosPropuestos,
      formato: cita.formato,
      horarioConfirmado: cita.horarioConfirmado,
      createdAt: cita.createdAt,
    },
  });
}

// POST: Create new appointment request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userEmail, userName, userPais, userTelefono, userMensaje } = body;

    // Validation
    if (!userEmail || !userName) {
      return NextResponse.json({ error: "Email y nombre son obligatorios" }, { status: 400 });
    }

    // Create appointment with token
    const { ok, token } = await addUniaCita({
      userEmail: userEmail.trim(),
      userName: userName.trim(),
      userPais: userPais?.trim() || "No especificado",
      userTelefono: userTelefono?.trim(),
      userMensaje: userMensaje?.trim(),
    });

    if (!ok || !token) {
      return NextResponse.json({ error: "Error al crear la solicitud" }, { status: 500 });
    }

    // Send emails
    if (!GMAIL_USER || !GMAIL_PASS) {
      console.warn("[unia/cita] Gmail credentials not configured");
      return NextResponse.json({ ok: true, token });
    }

    const transporter = getTransporter();

    // Email to UNIA with link to propose times
    if (UNIA_CONTACT_EMAIL) {
      try {
        await transporter.sendMail({
          from: `"HispanosEnSuiza" <${GMAIL_USER}>`,
          to: UNIA_CONTACT_EMAIL,
          replyTo: userEmail,
          subject: `Nueva solicitud de cita UNIA - ${userName}`,
          html: emailSolicitudUnia({
            userName,
            userEmail,
            userPais: userPais || "No especificado",
            userTelefono,
            userMensaje,
            token,
          }),
        });
        console.log(`[unia/cita] Notification sent to UNIA for ${userEmail}`);
      } catch (err) {
        console.error("[unia/cita] Failed to send UNIA notification:", err);
      }
    } else {
      console.warn("[unia/cita] UNIA_CONTACT_EMAIL not configured");
    }

    // Confirmation email to user
    try {
      await transporter.sendMail({
        from: `"HispanosEnSuiza" <${GMAIL_USER}>`,
        to: userEmail,
        subject: "Tu solicitud de cita con UNIA ha sido recibida",
        html: emailReciboSolicitud(userName),
      });
      console.log(`[unia/cita] Confirmation sent to ${userEmail}`);
    } catch (err) {
      console.error("[unia/cita] Failed to send user confirmation:", err);
    }

    return NextResponse.json({ ok: true, token });
  } catch (err) {
    console.error("[unia/cita] Unexpected error:", err);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
