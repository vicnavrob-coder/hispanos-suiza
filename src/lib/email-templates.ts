/**
 * Welcome email sequence for HispanosEnSuiza newsletter.
 * 5 emails sent at day 0, 3, 7, 14, 21.
 * Pure HTML strings — sent via Gmail SMTP.
 */

const SITE = "https://hispanosensuiza.ch";
const BRAND_COLOR = "#C8102E";

function layout(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:20px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%">
  <tr><td style="background:${BRAND_COLOR};padding:24px 30px">
    <a href="${SITE}" style="color:#fff;font-size:20px;font-weight:700;text-decoration:none">🇨🇭 HispanosEnSuiza</a>
  </td></tr>
  <tr><td style="padding:30px">
    <h1 style="margin:0 0 16px;font-size:22px;color:#1a1a2e">${title}</h1>
    ${body}
  </td></tr>
  <tr><td style="background:#f8fafc;padding:20px 30px;font-size:12px;color:#94a3b8;text-align:center">
    <a href="${SITE}" style="color:${BRAND_COLOR};text-decoration:none">hispanosensuiza.ch</a> · La guía real para hispanohablantes en Suiza<br>
    <span style="font-size:11px">Si no quieres recibir más emails, responde con "baja" y te eliminamos.</span>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function cta(text: string, url: string): string {
  return `<a href="${url}" style="display:inline-block;background:${BRAND_COLOR};color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;margin:8px 0">${text}</a>`;
}

function p(text: string): string {
  return `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#374151">${text}</p>`;
}

export const EMAIL_TEMPLATES: Record<number, { subject: string; html: (nombre?: string) => string }> = {

  // ── Email 1: Bienvenida (Día 0) ──
  1: {
    subject: "Bienvenido a HispanosEnSuiza 🇨🇭 — tu guía empieza aquí",
    html: (nombre) => layout("¡Bienvenido a la comunidad!", [
      p(`Hola${nombre ? ` ${nombre}` : ""},`),
      p("Acabas de unirte a <strong>+5.000 hispanohablantes</strong> que viven (o quieren vivir) en Suiza. Cada semana te enviaremos lo más útil: guías prácticas, herramientas y consejos que no encontrarás en ningún otro sitio."),
      p("<strong>🎁 Tu regalo de bienvenida:</strong>"),
      `<table width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0 20px">
        <tr><td style="padding:14px;background:#fef2f2;border-radius:8px;border-left:4px solid #C8102E">
          <strong style="color:#991b1b">📋 Checklist: Tu Primer Mes en Suiza</strong><br>
          <span style="font-size:14px;color:#7f1d1d">25 tareas esenciales organizadas por categoría para que no se te olvide nada.</span><br>
          <a href="${SITE}/recursos/primer-mes" style="color:${BRAND_COLOR};font-size:13px;font-weight:600">Descargar gratis →</a>
        </td></tr>
      </table>`,
      p("También puedes usar nuestra calculadora de salario neto para saber cuánto te queda en mano después de impuestos, cotizaciones y seguros."),
      cta("Calcular mi salario neto →", `${SITE}/herramientas/salario-neto`),
      p("Nos vemos pronto con más contenido útil."),
      p("Un abrazo,<br><strong>El equipo de HispanosEnSuiza</strong>"),
    ].join("")),
  },

  // ── Email 2: Coste de vida (Día 3) ──
  2: {
    subject: "¿Cuánto cuesta vivir en Suiza de verdad? (con números)",
    html: (nombre) => layout("El coste de vida real en Suiza", [
      p(`Hola${nombre ? ` ${nombre}` : ""},`),
      p("Una de las primeras preguntas que todo el mundo se hace antes de mudarse a Suiza es: <strong>¿cuánto cuesta vivir ahí realmente?</strong> Los números que se ven online suelen estar inflados o desactualizados. Nosotros hemos hecho la comparativa con datos reales de 2026."),
      p("Algunos datos que te van a sorprender:"),
      `<ul style="margin:0 0 14px;padding-left:20px;font-size:15px;line-height:1.8;color:#374151">
        <li>Un piso de 2 habitaciones en Zúrich: 1.800-2.500 CHF/mes</li>
        <li>Supermercado mensual para una persona: 400-600 CHF</li>
        <li>Seguro médico obligatorio: 380-520 CHF/mes</li>
        <li>Abono de transporte mensual: 70-120 CHF</li>
      </ul>`,
      p("Pero ojo: los salarios también son proporcionales. Un enfermero gana 75.000 CHF/año, un ingeniero 100.000+."),
      `<table width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0 20px">
        <tr><td style="padding:14px;background:#eff6ff;border-radius:8px;border-left:4px solid #0032A0">
          <strong style="color:#1e3a8a">💰 Guía de Salarios Suiza 2026</strong><br>
          <span style="font-size:14px;color:#1e40af">Rangos salariales reales por sector y puesto: IT, Sanidad, Finanzas y más.</span><br>
          <a href="${SITE}/recursos/guia-salarios" style="color:${BRAND_COLOR};font-size:13px;font-weight:600">Descargar gratis →</a>
        </td></tr>
      </table>`,
      cta("Leer la comparativa completa →", `${SITE}/blog/coste-vida-suiza-vs-espana-comparativa`),
      p("Mañana no, pero en unos días te mando algo sobre herramientas que te van a ahorrar horas de búsqueda."),
      p("¡Hasta pronto!<br><strong>Equipo HispanosEnSuiza</strong>"),
    ].join("")),
  },

  // ── Email 3: Herramientas (Día 7) ──
  3: {
    subject: "3 herramientas que ojalá yo hubiera tenido al llegar a Suiza",
    html: (nombre) => layout("Herramientas que te ahorran horas", [
      p(`Hola${nombre ? ` ${nombre}` : ""},`),
      p("Llevas una semana con nosotros y queremos presentarte <strong>las herramientas que hemos construido</strong> para que tomar decisiones sobre tu vida en Suiza sea más fácil:"),
      `<table width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0 20px">
        <tr><td style="padding:12px;background:#fef3c7;border-radius:8px;margin-bottom:8px">
          <strong style="color:#92400e">🧮 Calculadora de salario neto</strong><br>
          <span style="font-size:14px;color:#78350f">Introduce tu bruto y cantón → salario neto al instante</span><br>
          <a href="${SITE}/herramientas/salario-neto" style="color:${BRAND_COLOR};font-size:13px">Usar herramienta →</a>
        </td></tr>
        <tr><td style="height:8px"></td></tr>
        <tr><td style="padding:12px;background:#dbeafe;border-radius:8px">
          <strong style="color:#1e40af">⚖️ Comparador de ciudades</strong><br>
          <span style="font-size:14px;color:#1e3a5f">Compara coste de vida, salarios y calidad de vida</span><br>
          <a href="${SITE}/herramientas/comparador-ciudades" style="color:${BRAND_COLOR};font-size:13px">Comparar ciudades →</a>
        </td></tr>
        <tr><td style="height:8px"></td></tr>
        <tr><td style="padding:12px;background:#fce7f3;border-radius:8px">
          <strong style="color:#9d174d">📊 Calculadora impuesto fuente</strong><br>
          <span style="font-size:14px;color:#831843">Si llegas con permiso B, calcula cuánto te retienen</span><br>
          <a href="${SITE}/herramientas/impuesto-fuente" style="color:${BRAND_COLOR};font-size:13px">Calcular impuesto →</a>
        </td></tr>
      </table>`,
      p("Son gratis y las actualizamos con los datos oficiales de cada cantón."),
      p("Un saludo,<br><strong>Equipo HispanosEnSuiza</strong>"),
    ].join("")),
  },

  // ── Email 4: Ciudades y comunidad (Día 14) ──
  4: {
    subject: "¿A qué ciudad de Suiza te mudas? (guía por ciudad)",
    html: (nombre) => layout("Elige tu ciudad en Suiza", [
      p(`Hola${nombre ? ` ${nombre}` : ""},`),
      p("Suiza tiene ciudades muy diferentes entre sí. No es lo mismo vivir en Zúrich (alemán, caro, tech) que en Ginebra (francés, internacional, ONU) o en Basilea (pharma, frontera con Francia y Alemania)."),
      p("Hemos creado <strong>guías detalladas por ciudad</strong> con barrios, alquileres, mercado laboral y comunidad hispanohablante:"),
      `<ul style="margin:0 0 14px;padding-left:20px;font-size:15px;line-height:2;color:#374151">
        <li><a href="${SITE}/ciudades/zurich" style="color:${BRAND_COLOR}">Vivir en Zúrich</a> — la más cara, la que mejor paga</li>
        <li><a href="${SITE}/ciudades/ginebra" style="color:${BRAND_COLOR}">Vivir en Ginebra</a> — francófona, internacional</li>
        <li><a href="${SITE}/ciudades/basilea" style="color:${BRAND_COLOR}">Vivir en Basilea</a> — pharma, cultura, frontera</li>
        <li><a href="${SITE}/ciudades/berna" style="color:${BRAND_COLOR}">Vivir en Berna</a> — capital federal, tranquila</li>
        <li><a href="${SITE}/ciudades/lausana" style="color:${BRAND_COLOR}">Vivir en Lausana</a> — EPFL, startups, lago Lemán</li>
      </ul>`,
      cta("Ver todas las ciudades →", `${SITE}/ciudades`),
      p("¿Ya sabes a cuál te vas? Respóndeme y te mando consejos específicos."),
      p("¡Un abrazo!<br><strong>Equipo HispanosEnSuiza</strong>"),
    ].join("")),
  },

  // ── Email 5: Planificación a largo plazo (Día 21) ──
  5: {
    subject: "Lo que nadie te cuenta sobre impuestos y ahorro en Suiza",
    html: (nombre) => layout("Planifica tu futuro financiero en Suiza", [
      p(`Hola${nombre ? ` ${nombre}` : ""},`),
      p("Este es el último email de nuestra serie de bienvenida, y lo dedicamos a algo que marca la diferencia a largo plazo: <strong>entender los impuestos y el sistema de ahorro suizo</strong>."),
      p("Tres cosas que necesitas saber:"),
      `<ol style="margin:0 0 14px;padding-left:20px;font-size:15px;line-height:1.8;color:#374151">
        <li><strong>El Quellensteuer</strong> — si llegas con permiso B, te retienen impuestos directamente del sueldo. Muchos pagan de más sin saberlo. <a href="${SITE}/blog/quellensteuer-impuesto-fuente-suiza-guia" style="color:${BRAND_COLOR}">Guía completa →</a></li>
        <li><strong>El Pilar 3a</strong> — el vehículo de ahorro fiscal más potente en Suiza. Puedes deducir hasta 7.056 CHF/año de impuestos. <a href="${SITE}/blog/pilar-3a-suiza-guia-hispanohablantes" style="color:${BRAND_COLOR}">Cómo funciona →</a></li>
        <li><strong>Suiza vs España en impuestos</strong> — la diferencia real, con números. <a href="${SITE}/blog/impuestos-suiza-vs-espana-comparativa-2026" style="color:${BRAND_COLOR}">Comparativa →</a></li>
      </ol>`,
      cta("Usar la calculadora de impuesto fuente →", `${SITE}/herramientas/impuesto-fuente`),
      `<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0">
        <tr><td style="padding:16px;background:#fef3c7;border-radius:8px;border:1px solid #fde68a">
          <strong style="color:#92400e">⚖️ ¿Problemas con tu contrato de trabajo?</strong><br>
          <span style="font-size:14px;color:#78350f">UNIA, el mayor sindicato de Suiza, ofrece asesoramiento laboral gratuito para hispanohablantes. Puedes pedir cita directamente desde nuestra web.</span><br>
          <a href="${SITE}/trabajo/unia" style="color:${BRAND_COLOR};font-size:13px;font-weight:600;display:inline-block;margin-top:8px">Más info sobre UNIA →</a>
        </td></tr>
      </table>`,
      p("A partir de ahora te llegarán nuestras newsletters semanales con lo más relevante. Si alguna vez necesitas algo específico, responde a este email directamente."),
      p("Ha sido un placer tenerte en la serie de bienvenida. ¡Mucho éxito en Suiza!"),
      p("<strong>Equipo HispanosEnSuiza</strong>"),
    ].join("")),
  },
};
