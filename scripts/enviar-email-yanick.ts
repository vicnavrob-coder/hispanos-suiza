/**
 * Script para enviar manualmente emails a Yanick Suter
 * - Email de bienvenida por suscribirse
 * - Email de confirmación por publicar historia
 */

import nodemailer from 'nodemailer';

// Cargar variables de entorno
const GMAIL_USER = process.env.NEWSLETTER_GMAIL_USER || "VNR.IAsolutions@gmail.com";
const GMAIL_PASS = process.env.NEWSLETTER_GMAIL_PASS || "mwnmkbgrpjfpjyak";

// Datos de Yanick
const YANICK = {
  email: "suteryanick44@gmail.com",
  nombre: "Yanick Suter",
  historiaSlug: "yanick-mein-leben-in-der-schweiz-wrdg",
  historiaTitulo: "Mein Leben in der Schweiz",
};

const SITE = "https://hispanosensuiza.ch";

// Crear transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: GMAIL_USER, pass: GMAIL_PASS },
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Template: Email de historia publicada
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function emailHistoriaPublicada(nombre: string, titulo: string, slug: string): string {
  const historiaUrl = `${SITE}/historias-reales/${slug}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { background: #C8102E; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px 20px; }
    .button { display: inline-block; background: #C8102E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
    .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎉 ¡Tu historia está publicada!</h1>
  </div>

  <div class="content">
    <p>Hola ${nombre},</p>

    <p><strong>¡Gracias por compartir tu historia con la comunidad!</strong> Tu experiencia "${titulo}" ya está publicada y visible para miles de hispanohablantes que están considerando mudarse a Suiza.</p>

    <p>Tu historia puede inspirar y ayudar a otros que están pasando por el mismo proceso de emigración.</p>

    <p style="text-align: center;">
      <a href="${historiaUrl}" class="button">Ver mi historia →</a>
    </p>

    <p><strong>¿Qué pasa ahora?</strong></p>
    <ul>
      <li>Tu historia está visible en <a href="${SITE}/historias-reales">HispanosEnSuiza.ch</a></li>
      <li>La compartiremos en nuestras redes sociales (Facebook e Instagram)</li>
      <li>Otros usuarios pueden darle "Me gusta" y compartirla</li>
    </ul>

    <p>Si quieres actualizar o editar tu historia, responde a este email y te ayudamos.</p>

    <p>¡Gracias por ser parte de nuestra comunidad! 🇨🇭</p>

    <p>Un abrazo,<br><strong>Equipo HispanosEnSuiza</strong></p>
  </div>

  <div class="footer">
    <p>HispanosEnSuiza.ch - La comunidad de hispanohablantes en Suiza</p>
    <p><a href="${SITE}">Visitar sitio web</a> | <a href="${SITE}/sobre-nosotros">Sobre nosotros</a></p>
  </div>
</body>
</html>
  `.trim();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Template: Email de bienvenida (opcional, si se suscribió)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function emailBienvenida(nombre: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { background: #C8102E; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px 20px; }
    .button { display: inline-block; background: #C8102E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
    .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>¡Bienvenido a HispanosEnSuiza! 🇨🇭</h1>
  </div>

  <div class="content">
    <p>Hola ${nombre},</p>

    <p>¡Gracias por unirte a nuestra comunidad de hispanohablantes en Suiza!</p>

    <p>HispanosEnSuiza es tu portal de confianza para todo lo relacionado con vivir, trabajar y adaptarse a la vida en Suiza.</p>

    <p><strong>Recursos que tenemos para ti:</strong></p>
    <ul>
      <li>📝 <strong>Guías completas</strong> sobre emigrar, trabajar, vivienda y más</li>
      <li>❤️ <strong>Historias reales</strong> de hispanohablantes viviendo en Suiza</li>
      <li>🔧 <strong>Herramientas prácticas</strong> (calculadoras de salario, impuestos, seguros)</li>
      <li>💼 <strong>Ofertas de trabajo</strong> en Suiza</li>
      <li>🏔️ <strong>Actividades y planes</strong> para disfrutar Suiza</li>
    </ul>

    <p style="text-align: center;">
      <a href="${SITE}" class="button">Explorar HispanosEnSuiza →</a>
    </p>

    <p>¿Tienes una pregunta o quieres compartir tu historia? Responde a este email, ¡nos encantaría ayudarte!</p>

    <p>Un abrazo,<br><strong>Equipo HispanosEnSuiza</strong></p>
  </div>

  <div class="footer">
    <p>HispanosEnSuiza.ch - La comunidad de hispanohablantes en Suiza</p>
    <p><a href="${SITE}">Visitar sitio web</a> | <a href="${SITE}/sobre-nosotros">Sobre nosotros</a></p>
  </div>
</body>
</html>
  `.trim();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enviar emails
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async function main() {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Enviar emails a Yanick Suter");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");
  console.log(`Destinatario: ${YANICK.email}`);
  console.log(`Nombre: ${YANICK.nombre}`);
  console.log("");

  try {
    // Email 1: Historia publicada
    console.log("📧 Enviando email de historia publicada...");
    const result1 = await transporter.sendMail({
      from: `"HispanosEnSuiza" <${GMAIL_USER}>`,
      to: YANICK.email,
      subject: `¡Tu historia "${YANICK.historiaTitulo}" está publicada! 🎉`,
      html: emailHistoriaPublicada(YANICK.nombre, YANICK.historiaTitulo, YANICK.historiaSlug),
    });
    console.log(`✅ Email de historia publicada enviado - Message ID: ${result1.messageId}`);

    console.log("");

    // Email 2: Bienvenida (opcional)
    console.log("📧 Enviando email de bienvenida...");
    const result2 = await transporter.sendMail({
      from: `"HispanosEnSuiza" <${GMAIL_USER}>`,
      to: YANICK.email,
      subject: "¡Bienvenido a HispanosEnSuiza! 🇨🇭",
      html: emailBienvenida(YANICK.nombre),
    });
    console.log(`✅ Email de bienvenida enviado - Message ID: ${result2.messageId}`);

    console.log("");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅ Ambos emails enviados exitosamente");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  } catch (error) {
    console.error("");
    console.error("❌ Error enviando emails:");
    console.error(error);
    process.exit(1);
  }
}

main();
