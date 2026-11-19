import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configurar transporter de Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NEWSLETTER_GMAIL_USER,
    pass: process.env.NEWSLETTER_GMAIL_PASS,
  },
});

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

    // Email a Víctor (notificación de nueva solicitud)
    await transporter.sendMail({
      from: '"HispanosEnSuiza" <VNR.IAsolutions@gmail.com>',
      to: "VNR.IAsolutions@gmail.com",
      subject: `🎯 Nueva Solicitud Suiza Starter Pack - ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Nueva Solicitud Suiza Starter Pack</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Fecha llegada estimada:</strong> ${fechaLlegada}</p>
            <p><strong>Sector:</strong> ${sector}</p>
            ${mensaje ? `<p><strong>Mensaje:</strong><br>${mensaje.replace(/\n/g, '<br>')}</p>` : ""}
          </div>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p><strong>✅ Siguiente paso:</strong> Contactar por WhatsApp/email para confirmar disponibilidad y enviar enlace de pago señal (500 CHF).</p>
        </div>
      `,
    });

    // Email al cliente (confirmación)
    await transporter.sendMail({
      from: '"HispanosEnSuiza" <VNR.IAsolutions@gmail.com>',
      to: email,
      subject: "✅ Solicitud recibida - Suiza Starter Pack",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">¡Gracias por tu interés en el Suiza Starter Pack!</h2>
          <p>Hola ${nombre},</p>
          <p>Hemos recibido tu solicitud correctamente. Te contactaremos en las próximas 24 horas para:</p>
          <ul style="line-height: 1.8;">
            <li>Confirmar disponibilidad para tu fecha (${fechaLlegada})</li>
            <li>Responder cualquier duda que tengas</li>
            <li>Enviarte el enlace de pago de la señal (500 CHF)</li>
          </ul>

          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h3 style="margin-top: 0; color: #1e40af;">Mientras tanto...</h3>
            <p>Puedes preparar estos documentos que necesitaremos:</p>
            <ul style="line-height: 1.8;">
              <li>Pasaporte o DNI vigente</li>
              <li>CV actualizado</li>
              <li>Certificados de estudios/experiencia (si tienes)</li>
            </ul>
          </div>

          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Detalles de tu solicitud:</strong></p>
            <ul style="line-height: 1.8; margin-bottom: 0;">
              <li><strong>Fecha llegada estimada:</strong> ${fechaLlegada}</li>
              <li><strong>Sector:</strong> ${sector}</li>
            </ul>
          </div>

          <p>Si tienes dudas urgentes, escríbenos a: <a href="mailto:contacto@hispanosensuiza.com" style="color: #2563eb;">contacto@hispanosensuiza.com</a></p>

          <p>¡Nos vemos pronto en Suiza!</p>
          <p><strong>Equipo HispanosEnSuiza</strong></p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0 20px;">
          <p style="font-size: 12px; color: #64748b;">
            Si no solicitaste esto, simplemente ignora este email.
          </p>
        </div>
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
