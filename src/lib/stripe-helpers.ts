import nodemailer from "nodemailer";

interface Purchase {
  id: string;
  sessionId: string;
  email: string;
  name: string;
  amount: number;
  currency: string;
  timestamp: string;
  product: string;
}

interface EmailParams {
  to: string;
  name: string;
  downloadId: string;
}

// Configurar transporter de Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEWSLETTER_GMAIL_USER,
    pass: process.env.NEWSLETTER_GMAIL_PASS,
  },
});

/**
 * Guarda una compra en GitHub Gist
 */
export async function savePurchase(purchase: Purchase): Promise<void> {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GIST_ID = process.env.TEMPLATE_PURCHASES_GIST_ID;

  if (!GITHUB_TOKEN || !GIST_ID) {
    throw new Error("Missing GitHub credentials for saving purchase");
  }

  try {
    // Obtener gist actual
    const getResponse = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!getResponse.ok) {
      throw new Error(`Failed to fetch gist: ${getResponse.statusText}`);
    }

    const gist = await getResponse.json();
    const currentContent = gist.files["purchases.json"]?.content || "[]";
    const purchases = JSON.parse(currentContent);

    // Añadir nueva compra
    purchases.push(purchase);

    // Actualizar gist
    const updateResponse = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        files: {
          "purchases.json": {
            content: JSON.stringify(purchases, null, 2),
          },
        },
      }),
    });

    if (!updateResponse.ok) {
      throw new Error(`Failed to update gist: ${updateResponse.statusText}`);
    }

    console.log("✅ Compra guardada en GitHub Gist:", purchase.id);
  } catch (error) {
    console.error("Error guardando compra:", error);
    throw error;
  }
}

/**
 * Envía email con link de descarga del template
 */
export async function sendTemplateEmail({ to, name, downloadId }: EmailParams): Promise<void> {
  const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/productos/template-emigrar-suiza/descargar/${downloadId}`;

  const mailOptions = {
    from: `HispanosEnSuiza <${process.env.NEWSLETTER_GMAIL_USER}>`,
    to,
    subject: "🎉 Tu Template para Emigrar a Suiza está listo",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%);
            padding: 30px;
            text-align: center;
            border-radius: 12px 12px 0 0;
          }
          .header h1 {
            color: #ffffff;
            margin: 0 0 10px 0;
            font-size: 24px;
          }
          .header p {
            color: #9CA3AF;
            margin: 0;
            font-size: 14px;
          }
          .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #E8E5E0;
          }
          .cta-button {
            display: inline-block;
            background: #C8102E;
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 50px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
          }
          .steps {
            background: #F8F6F3;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .steps h3 {
            color: #0A0A0A;
            margin-top: 0;
          }
          .steps ol {
            margin: 10px 0;
            padding-left: 20px;
          }
          .steps li {
            margin: 8px 0;
            color: #374151;
          }
          .footer {
            background: #F8F6F3;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 12px 12px;
            font-size: 13px;
            color: #6B7280;
          }
          .guarantee {
            background: #D1FAE5;
            border-left: 4px solid #059669;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🇨🇭 ¡Gracias por tu compra!</h1>
          <p>Tu template está listo para descargar</p>
        </div>

        <div class="content">
          <p>Hola${name ? ` ${name}` : ""},</p>

          <p>¡Bienvenido a la comunidad de HispanosEnSuiza! 🎉</p>

          <p>Tu <strong>Template Completo para Emigrar a Suiza</strong> está listo. Incluye todo lo que necesitas:</p>

          <ul>
            <li>📋 Checklist de 50 pasos organizados</li>
            <li>📚 7 guías completas (1'975 líneas)</li>
            <li>💰 Tracker de gastos con presupuesto</li>
            <li>📞 50+ contactos verificados 2026</li>
            <li>📄 3 plantillas listas para usar</li>
          </ul>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${downloadUrl}" class="cta-button">
              📥 Descargar Template Ahora
            </a>
          </div>

          <div class="steps">
            <h3>🚀 Instrucciones Rápidas:</h3>
            <ol>
              <li>Haz clic en el botón de arriba para descargar</li>
              <li>Descomprime el archivo ZIP (16 archivos)</li>
              <li>Lee <strong>README.md</strong> primero</li>
              <li>Importa los CSVs a Notion/Excel</li>
              <li>Empieza con la <strong>Guía 01</strong> (Registro en la Comuna)</li>
            </ol>
          </div>

          <div class="guarantee">
            <strong>✅ Garantía 30 días:</strong> Si el template no cumple tus expectativas, reembolso completo sin preguntas. Escríbenos a soporte@hispanosensuiza.ch
          </div>

          <p><strong>Acceso de por vida:</strong> Este link de descarga es válido permanentemente. Guárdalo en un lugar seguro.</p>

          <p style="margin-top: 30px;"><strong>¿Necesitas ayuda?</strong></p>
          <p>Estamos aquí para ayudarte:</p>
          <ul>
            <li>📧 Email: soporte@hispanosensuiza.ch</li>
            <li>🌐 Web: <a href="https://hispanosensuiza.ch">hispanosensuiza.ch</a></li>
            <li>⏰ Respuesta: 24-48h hábiles</li>
          </ul>

          <p style="margin-top: 30px;">¡Buena suerte en tu nueva vida en Suiza! 🇨🇭</p>

          <p style="margin-top: 20px; color: #6B7280; font-size: 14px;">
            Saludos,<br>
            <strong>Equipo HispanosEnSuiza.ch</strong>
          </p>
        </div>

        <div class="footer">
          <p>Este email fue enviado porque compraste el Template Emigrar a Suiza</p>
          <p style="margin-top: 10px;">
            HispanosEnSuiza.ch | La guía real para vivir en Suiza<br>
            <a href="https://hispanosensuiza.ch" style="color: #C8102E;">hispanosensuiza.ch</a>
          </p>
        </div>
      </body>
      </html>
    `,
    text: `
¡Gracias por tu compra!

Hola${name ? ` ${name}` : ""},

Tu Template Completo para Emigrar a Suiza está listo.

DESCARGAR AHORA:
${downloadUrl}

INSTRUCCIONES RÁPIDAS:
1. Descarga el archivo ZIP
2. Descomprime los 16 archivos
3. Lee README.md primero
4. Importa CSVs a Notion/Excel
5. Empieza con Guía 01 (Registro Comuna)

QUÉ INCLUYE:
- 50 pasos organizados por fase
- 7 guías completas (1'975 líneas)
- Tracker de gastos
- 50+ contactos verificados
- 3 plantillas listas

GARANTÍA 30 DÍAS:
Si no cumple expectativas, reembolso completo sin preguntas.
Email: soporte@hispanosensuiza.ch

¿NECESITAS AYUDA?
Email: soporte@hispanosensuiza.ch
Web: https://hispanosensuiza.ch
Respuesta: 24-48h hábiles

¡Buena suerte en Suiza! 🇨🇭

Equipo HispanosEnSuiza.ch
    `.trim(),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email enviado a:", to);
  } catch (error) {
    console.error("Error enviando email:", error);
    throw error;
  }
}

/**
 * Verifica si un downloadId es válido
 */
export async function verifyDownloadId(downloadId: string): Promise<boolean> {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GIST_ID = process.env.TEMPLATE_PURCHASES_GIST_ID;

  if (!GITHUB_TOKEN || !GIST_ID) {
    return false;
  }

  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      return false;
    }

    const gist = await response.json();
    const content = gist.files["purchases.json"]?.content || "[]";
    const purchases = JSON.parse(content);

    return purchases.some((p: Purchase) => p.id === downloadId);
  } catch (error) {
    console.error("Error verificando downloadId:", error);
    return false;
  }
}
