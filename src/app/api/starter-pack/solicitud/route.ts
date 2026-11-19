import { NextResponse } from "next/server";
import { Resend } from "resend";

// Inicializar Resend solo si hay API key configurada
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, fechaLlegada, sector, mensaje } = body;

    // Validación básica
    if (!nombre || !email || !telefono || !fechaLlegada || !sector) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Verificar que Resend está configurado
    if (!resend) {
      console.error("RESEND_API_KEY no configurada");
      return NextResponse.json(
        { error: "Servicio de email no configurado" },
        { status: 500 }
      );
    }

    // Email a Víctor (notificación de nueva solicitud)
    await resend.emails.send({
      from: "HispanosEnSuiza <noreply@hispanosensuiza.com>",
      to: "VNR.IAsolutions@gmail.com",
      subject: `🎯 Nueva Solicitud Suiza Starter Pack - ${nombre}`,
      html: `
        <h2>Nueva Solicitud Suiza Starter Pack</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Fecha llegada estimada:</strong> ${fechaLlegada}</p>
        <p><strong>Sector:</strong> ${sector}</p>
        ${mensaje ? `<p><strong>Mensaje:</strong><br>${mensaje}</p>` : ""}
        <hr>
        <p><strong>Siguiente paso:</strong> Contactar por WhatsApp/email para confirmar disponibilidad y enviar enlace de pago señal (500 CHF).</p>
      `,
    });

    // Email al cliente (confirmación)
    await resend.emails.send({
      from: "HispanosEnSuiza <noreply@hispanosensuiza.com>",
      to: email,
      subject: "✅ Solicitud recibida - Suiza Starter Pack",
      html: `
        <h2>¡Gracias por tu interés en el Suiza Starter Pack!</h2>
        <p>Hola ${nombre},</p>
        <p>Hemos recibido tu solicitud correctamente. Te contactaremos en las próximas 24 horas para:</p>
        <ul>
          <li>Confirmar disponibilidad para tu fecha (${fechaLlegada})</li>
          <li>Responder cualquier duda que tengas</li>
          <li>Enviarte el enlace de pago de la señal (500 CHF)</li>
        </ul>

        <h3>Mientras tanto...</h3>
        <p>Puedes preparar estos documentos que necesitaremos:</p>
        <ul>
          <li>Pasaporte o DNI vigente</li>
          <li>CV actualizado</li>
          <li>Certificados de estudios/experiencia (si tienes)</li>
        </ul>

        <p><strong>Detalles de tu solicitud:</strong></p>
        <ul>
          <li><strong>Fecha llegada estimada:</strong> ${fechaLlegada}</li>
          <li><strong>Sector:</strong> ${sector}</li>
        </ul>

        <p>Si tienes dudas urgentes, escríbenos a: <a href="mailto:contacto@hispanosensuiza.com">contacto@hispanosensuiza.com</a></p>

        <p>¡Nos vemos pronto en Suiza!</p>
        <p><strong>Equipo HispanosEnSuiza</strong></p>

        <hr>
        <p style="font-size: 12px; color: #666;">
          Si no solicitaste esto, simplemente ignora este email.
        </p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error procesando solicitud:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
