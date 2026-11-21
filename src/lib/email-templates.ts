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

// CV Translation notification email
export function emailCVCompletado(nombre: string, cvUrl: string): string {
  return layout("Tu CV traducido está listo", [
    p(`Hola ${nombre},`),
    p("¡Buenas noticias! <strong>Tu CV ya ha sido traducido</strong> al formato estándar suizo."),
    p("Tu nuevo CV incluye:"),
    `<ul style="margin:0 0 14px;padding-left:20px;font-size:15px;line-height:1.8;color:#374151">
      <li>Formato profesional suizo (Lebenslauf)</li>
      <li>Estructura clara: datos personales, experiencia, formación, idiomas</li>
      <li>Optimizado para ATS (sistemas de seguimiento de candidatos)</li>
      <li>Descarga en PDF listo para enviar</li>
    </ul>`,
    cta("Ver y descargar mi CV →", cvUrl),
    p("El enlace estará disponible durante 30 días."),
    `<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0">
      <tr><td style="padding:14px;background:#eff6ff;border-radius:8px;border-left:4px solid #0032A0">
        <strong style="color:#1e3a8a">💼 ¿Buscando trabajo en Suiza?</strong><br>
        <span style="font-size:14px;color:#1e40af">Usa nuestro buscador de empleo con ofertas de jobs.ch, LinkedIn, Indeed y más.</span><br>
        <a href="${SITE}/trabajo/buscador" style="color:${BRAND_COLOR};font-size:13px;font-weight:600">Buscar ofertas →</a>
      </td></tr>
    </table>`,
    p("¡Mucho éxito en tu búsqueda!"),
    p("<strong>Equipo HispanosEnSuiza</strong>"),
  ].join(""));
}

// Email de agradecimiento para autores de historias
export function emailHistoriaPublicada(nombre: string, titulo: string, slug: string): string {
  const historiaUrl = `${SITE}/historias-reales/${slug}`;

  return layout("¡Tu historia está publicada! 🎉", [
    p(`Hola ${nombre},`),
    p(`<strong>¡Gracias por compartir tu historia con la comunidad!</strong> Tu experiencia "${titulo}" ya está publicada y visible para todos los hispanohablantes que están considerando mudarse a Suiza.`),
    `<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0">
      <tr><td style="padding:16px;background:#fef2f2;border-radius:8px;border-left:4px solid ${BRAND_COLOR}">
        <strong style="color:#991b1b">📖 Tu historia publicada</strong><br>
        <span style="font-size:14px;color:#7f1d1d;line-height:1.6">"${titulo}"</span><br>
        <a href="${historiaUrl}" style="color:${BRAND_COLOR};font-size:13px;font-weight:600;margin-top:8px;display:inline-block">Ver mi historia →</a>
      </td></tr>
    </table>`,
    p("Tu historia también se compartirá automáticamente en nuestras redes sociales (Facebook e Instagram) para llegar a más personas."),
    p("<strong>¿Qué pasa ahora?</strong>"),
    `<ul style="margin:0 0 14px;padding-left:20px;font-size:15px;line-height:1.8;color:#374151">
      <li>Tu historia estará visible permanentemente en la web</li>
      <li>Otros usuarios podrán leerla y aprender de tu experiencia</li>
      <li>Puedes compartir el enlace con quien quieras</li>
      <li>Si necesitas editar algo, responde a este email</li>
    </ul>`,
    `<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0">
      <tr><td style="padding:14px;background:#eff6ff;border-radius:8px;border-left:4px solid #0032A0">
        <strong style="color:#1e3a8a">💬 Únete a la comunidad</strong><br>
        <span style="font-size:14px;color:#1e40af">Sigue compartiendo consejos y experiencias con otros hispanohablantes en Suiza.</span><br>
        <a href="${SITE}/historias-reales" style="color:${BRAND_COLOR};font-size:13px;font-weight:600">Leer otras historias →</a>
      </td></tr>
    </table>`,
    p("Gracias por formar parte de HispanosEnSuiza. Tu historia ayudará a muchas personas que están pasando por lo mismo que tú viviste."),
    p("Un fuerte abrazo,<br><strong>Equipo HispanosEnSuiza</strong>"),
  ].join(""));
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

  // ── Email 6: Re-engagement (para usuarios inactivos) ──
  6: {
    subject: "¿Sigues pensando en Suiza? Aquí tienes lo más útil",
    html: (nombre) => layout("Te echábamos de menos", [
      p(`Hola${nombre ? ` ${nombre}` : ""},`),
      p("Hace tiempo que no te pasas por HispanosEnSuiza. Puede que ya estés en Suiza (¡enhorabuena!), que lo hayas pospuesto, o simplemente que estés ocupado."),
      p("Por si acaso, aquí te dejamos <strong>lo más útil</strong> de los últimos meses:"),
      `<ul style="margin:0 0 14px;padding-left:20px;font-size:15px;line-height:1.8;color:#374151">
        <li><a href="${SITE}/herramientas/salario-neto" style="color:${BRAND_COLOR}">Nueva calculadora de salario neto 2026</a> — actualizada con nuevos datos fiscales</li>
        <li><a href="${SITE}/blog" style="color:${BRAND_COLOR}">Guías actualizadas de ciudades</a> — precios reales de alquiler, mercado laboral</li>
        <li><a href="${SITE}/herramientas/generador-cv" style="color:${BRAND_COLOR}">Generador de CV suizo</a> — crea tu CV en formato estándar suizo</li>
      </ul>`,
      p("Si cambias de idea y ya no quieres recibir emails, simplemente responde con 'baja' y te eliminamos."),
      p("Si hay algo específico en lo que podamos ayudarte, escríbenos."),
      p("Un saludo,<br><strong>Equipo HispanosEnSuiza</strong>"),
    ].join("")),
  },

  // ── Email 7: Promocional Premium ──
  7: {
    subject: "Ahorra 61% — Tu plan completo para emigrar a Suiza",
    html: (nombre) => layout("Todo lo que necesitas para emigrar", [
      p(`Hola${nombre ? ` ${nombre}` : ""},`),
      p("Si estás considerando seriamente mudarte a Suiza, tenemos algo que va a ahorrarte <strong>cientos de horas de búsqueda</strong> y miles de francos en errores evitables."),
      `<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0">
        <tr><td style="padding:20px;background:linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);border-radius:12px;border:2px solid #fcd34d">
          <div style="text-align:center">
            <div style="font-size:28px;font-weight:800;color:#92400e;margin-bottom:8px">Template: Emigrar a Suiza</div>
            <div style="font-size:16px;color:#78350f;margin-bottom:16px">La guía completa que realmente funciona</div>
            <div style="margin-bottom:16px">
              <span style="text-decoration:line-through;color:#94a3b8;font-size:18px">49 CHF</span>
              <span style="font-size:32px;font-weight:800;color:#C8102E;margin-left:12px">19 CHF</span>
              <span style="background:#16a34a;color:white;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:700;margin-left:8px">-61%</span>
            </div>
            <div style="text-align:left;color:#78350f;font-size:14px;line-height:1.8;margin-bottom:16px">
              <strong>✓</strong> Checklist completa: 50 pasos desde el comienzo hasta tu primer día<br>
              <strong>✓</strong> 7 guías profesionales (1.975 líneas de contenido verificado)<br>
              <strong>✓</strong> Calculadora de gastos con deducciones fiscales<br>
              <strong>✓</strong> 50+ contactos verificados (embajadas, seguros, mudanzas)<br>
              <strong>✓</strong> Te ahorra CHF 15.000-20.000 en tu primer año
            </div>
          </div>
        </td></tr>
      </table>`,
      cta("Ver el template completo →", `${SITE}/productos/template-emigrar-suiza`),
      p("<strong>Garantía:</strong> Si compras y en 30 días no te ha ahorrado al menos 10 veces su precio, te devolvemos el 100%."),
      p("Un saludo,<br><strong>Equipo HispanosEnSuiza</strong>"),
    ].join("")),
  },

  // ── Email 8: Testimonios y casos de éxito ──
  8: {
    subject: "\"Ojalá lo hubiera sabido antes de mudarme\" — 3 historias reales",
    html: (nombre) => layout("Historias reales de hispanohablantes en Suiza", [
      p(`Hola${nombre ? ` ${nombre}` : ""},`),
      p("A veces la mejor forma de aprender es escuchando a quien ya pasó por ahí. Hoy te compartimos <strong>3 historias reales</strong> de hispanohablantes que se mudaron a Suiza:"),
      `<table width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0 20px">
        <tr><td style="padding:14px;background:#fef2f2;border-radius:8px;border-left:4px solid #C8102E;margin-bottom:12px">
          <strong style="color:#991b1b">María, enfermera en Zúrich</strong><br>
          <span style="font-size:14px;color:#7f1d1d;font-style:italic">"Pensé que con mi nivel B1 de alemán no sería suficiente. Me equivoqué: en el hospital todos hablan inglés y me dieron clases gratis. Mi salario pasó de €1.800 a CHF 6.200/mes."</span>
        </td></tr>
        <tr><td style="height:12px"></td></tr>
        <tr><td style="padding:14px;background:#eff6ff;border-radius:8px;border-left:4px solid #0032A0;margin-bottom:12px">
          <strong style="color:#1e3a8a">Carlos, ingeniero en Basilea</strong><br>
          <span style="font-size:14px;color:#1e40af;font-style:italic">"Lo que más me costó fue encontrar piso. Tardé 3 meses viviendo en Airbnb (error caro). Consejo: usa WG Zimmer y sé rápido respondiendo, en 2 horas ya no hay piso."</span>
        </td></tr>
        <tr><td style="height:12px"></td></tr>
        <tr><td style="padding:14px;background:#f0fdf4;border-radius:8px;border-left:4px solid #16a34a">
          <strong style="color:#166534">Ana, abogada en Ginebra</strong><br>
          <span style="font-size:14px;color:#15803d;font-style:italic">"Negocié mi contrato sin saber cómo funcionaban los impuestos aquí. Me retuvieron un 20% de más el primer año. Lección: usa la calculadora de impuesto fuente ANTES de firmar."</span>
        </td></tr>
      </table>`,
      cta("Leer más historias reales →", `${SITE}/historias-reales`),
      p("¿Tienes tu propia historia? Responde a este email y la publicamos (anónima si quieres)."),
      p("Un abrazo,<br><strong>Equipo HispanosEnSuiza</strong>"),
    ].join("")),
  },

  // ── Email 9: Contenido viral / referral ──
  9: {
    subject: "Regala esta guía a un amigo que esté pensando en Suiza",
    html: (nombre) => layout("Ayuda a alguien más", [
      p(`Hola${nombre ? ` ${nombre}` : ""},`),
      p("Si HispanosEnSuiza te ha sido útil, probablemente conozcas a alguien más que esté en la misma situación: <strong>pensando en mudarse a Suiza</strong>, buscando trabajo, o ya viviendo ahí pero con dudas."),
      p("Reenviarle este email o compartir nuestra web puede ahorrarle semanas de búsqueda y miles de francos en errores evitables."),
      `<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0">
        <tr><td style="padding:16px;background:#fef3c7;border-radius:8px;text-align:center">
          <div style="font-size:16px;font-weight:700;color:#92400e;margin-bottom:12px">🎁 Comparte HispanosEnSuiza</div>
          <a href="https://wa.me/?text=Si%20est%C3%A1s%20pensando%20en%20Suiza%2C%20esta%20web%20te%20va%20a%20ahorrar%20horas%3A%20https%3A%2F%2Fhispanosensuiza.ch" style="display:inline-block;background:#25D366;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;margin:4px">📱 Compartir por WhatsApp</a>
        </td></tr>
      </table>`,
      p("Lo más útil que pueden encontrar:"),
      `<ul style="margin:0 0 14px;padding-left:20px;font-size:15px;line-height:1.8;color:#374151">
        <li><a href="${SITE}/herramientas/salario-neto" style="color:${BRAND_COLOR}">Calculadora de salario neto</a> — saber exactamente cuánto va a ganar</li>
        <li><a href="${SITE}/herramientas/comparador-ciudades" style="color:${BRAND_COLOR}">Comparador de ciudades</a> — elegir dónde vivir con datos reales</li>
        <li><a href="${SITE}/recursos/primer-mes" style="color:${BRAND_COLOR}">Checklist del primer mes</a> — no olvidar nada importante</li>
      </ul>`,
      p("Gracias por formar parte de nuestra comunidad."),
      p("Un abrazo,<br><strong>Equipo HispanosEnSuiza</strong>"),
    ].join("")),
  },
};

// ─────────────────────────────────────────────────────────────
// WEEKLY NEWSLETTER TEMPLATE
// ─────────────────────────────────────────────────────────────

import type { NewsletterContent } from "./newsletter-content";

export function generateNewsletterSubject(weekNumber: number): string {
  return `🇨🇭 Newsletter Semanal #${weekNumber} - HispanosEnSuiza`;
}

export function generateNewsletterHTML(
  nombre: string,
  content: NewsletterContent
): string {
  const { weekNumber, featuredType, jobs, story, blogPost, tool } = content;

  const utmParams = `utm_source=newsletter&utm_medium=email&utm_campaign=weekly-${weekNumber}`;

  // ── Featured Section (rotates weekly) ──
  let featuredSection = "";

  if (featuredType === "job" && jobs.length > 0) {
    const job = jobs[0];
    featuredSection = `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 24px">
        <tr><td style="padding:20px;background:#fef2f2;border-radius:12px;border-left:5px solid ${BRAND_COLOR}">
          <h2 style="margin:0 0 12px;font-size:18px;color:#991b1b">🔥 Oferta Destacada de la Semana</h2>
          <strong style="color:#1a1a2e;font-size:16px">${job.title}</strong><br>
          <span style="font-size:14px;color:#64748b">${job.company} · ${job.location}</span><br>
          ${job.salary ? `<span style="font-size:14px;color:#059669;font-weight:600">${job.salary}</span><br>` : ""}
          ${cta("Ver oferta completa →", `${job.url}?${utmParams}`)}
        </td></tr>
      </table>`;
  } else if (featuredType === "story" && story) {
    featuredSection = `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 24px">
        <tr><td style="padding:20px;background:#fef3c7;border-radius:12px;border-left:5px solid #f59e0b">
          <h2 style="margin:0 0 12px;font-size:18px;color:#92400e">📖 Historia Destacada</h2>
          <strong style="color:#1a1a2e;font-size:16px">${story.titulo}</strong><br>
          <span style="font-size:14px;color:#64748b">Por ${story.autorNombre}${story.ciudadSuiza ? ` · ${story.ciudadSuiza}` : ""}</span><br>
          ${cta("Leer historia →", `${SITE}/comunidad/historias/${story.slug}?${utmParams}`)}
        </td></tr>
      </table>`;
  } else if (featuredType === "blog" && blogPost) {
    featuredSection = `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 24px">
        <tr><td style="padding:20px;background:#dbeafe;border-radius:12px;border-left:5px solid #0032A0">
          <h2 style="margin:0 0 12px;font-size:18px;color:#1e3a8a">📝 Artículo del Blog</h2>
          <strong style="color:#1a1a2e;font-size:16px">${blogPost.titulo}</strong><br>
          <span style="font-size:14px;color:#64748b">${blogPost.categoria} · ${blogPost.tiempoLectura} min lectura</span><br>
          ${cta("Leer artículo →", `${SITE}/blog/${blogPost.slug}?${utmParams}`)}
        </td></tr>
      </table>`;
  } else {
    featuredSection = `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 24px">
        <tr><td style="padding:20px;background:#fce7f3;border-radius:12px;border-left:5px solid #9d174d">
          <h2 style="margin:0 0 12px;font-size:18px;color:#9d174d">🛠️ Herramienta de la Semana</h2>
          <strong style="color:#1a1a2e;font-size:16px">${tool.icon} ${tool.name}</strong><br>
          <span style="font-size:14px;color:#64748b">${tool.description}</span><br>
          ${cta(tool.cta, `${tool.url}?${utmParams}`)}
        </td></tr>
      </table>`;
  }

  // ── Jobs Section ──
  const jobsSection = jobs.length > 0 ? `
    <h2 style="margin:24px 0 16px;font-size:18px;color:#1a1a2e">💼 Top 3 Ofertas de Trabajo</h2>
    ${jobs.map(job => `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 12px;background:#f8fafc;border-radius:8px;overflow:hidden">
        <tr><td style="padding:14px">
          <strong style="color:#1a1a2e;font-size:15px">${job.title}</strong><br>
          <span style="font-size:13px;color:#64748b">${job.company} · ${job.location}</span><br>
          ${job.salary ? `<span style="font-size:13px;color:#059669;font-weight:600">${job.salary}</span><br>` : ""}
          <a href="${job.url}?${utmParams}" style="color:${BRAND_COLOR};font-size:13px;font-weight:600;text-decoration:none">Ver oferta →</a>
        </td></tr>
      </table>
    `).join("")}
  ` : "";

  // ── Story Section ──
  const storySection = story && featuredType !== "story" ? `
    <h2 style="margin:24px 0 16px;font-size:18px;color:#1a1a2e">📖 Historia de la Comunidad</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 12px;background:#fef3c7;border-radius:8px;overflow:hidden">
      <tr><td style="padding:14px">
        <strong style="color:#1a1a2e;font-size:15px">${story.titulo}</strong><br>
        <span style="font-size:13px;color:#64748b">Por ${story.autorNombre}${story.ciudadSuiza ? ` desde ${story.ciudadSuiza}` : ""}</span><br>
        <a href="${SITE}/comunidad/historias/${story.slug}?${utmParams}" style="color:${BRAND_COLOR};font-size:13px;font-weight:600;text-decoration:none">Leer historia →</a>
      </td></tr>
    </table>
  ` : "";

  // ── Blog Section ──
  const blogSection = blogPost && featuredType !== "blog" ? `
    <h2 style="margin:24px 0 16px;font-size:18px;color:#1a1a2e">📝 Artículo del Blog</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 12px;background:#dbeafe;border-radius:8px;overflow:hidden">
      <tr><td style="padding:14px">
        <strong style="color:#1a1a2e;font-size:15px">${blogPost.titulo}</strong><br>
        <span style="font-size:13px;color:#64748b">${blogPost.descripcion.slice(0, 120)}...</span><br>
        <a href="${SITE}/blog/${blogPost.slug}?${utmParams}" style="color:${BRAND_COLOR};font-size:13px;font-weight:600;text-decoration:none">Leer más →</a>
      </td></tr>
    </table>
  ` : "";

  // ── Tool Section ──
  const toolSection = featuredType !== "tool" ? `
    <h2 style="margin:24px 0 16px;font-size:18px;color:#1a1a2e">🛠️ Herramienta de la Semana</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 12px;background:#fce7f3;border-radius:8px;overflow:hidden">
      <tr><td style="padding:14px">
        <strong style="color:#1a1a2e;font-size:15px">${tool.icon} ${tool.name}</strong><br>
        <span style="font-size:13px;color:#64748b">${tool.description}</span><br>
        <a href="${tool.url}?${utmParams}" style="color:${BRAND_COLOR};font-size:13px;font-weight:600;text-decoration:none">${tool.cta}</a>
      </td></tr>
    </table>
  ` : "";

  return layout(
    `Newsletter Semanal #${weekNumber}`,
    [
      p(`Hola ${nombre}!`),
      p(`Te enviamos lo más interesante de esta semana para hispanohablantes en Suiza.`),
      featuredSection,
      jobsSection,
      storySection,
      blogSection,
      toolSection,
      `<table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 16px">
        <tr><td style="padding:16px;background:#f1f5f9;border-radius:8px;text-align:center">
          <span style="font-size:14px;color:#475569">¿Buscas trabajo en Suiza?</span><br>
          <a href="${SITE}/trabajo/buscador?${utmParams}" style="color:${BRAND_COLOR};font-size:14px;font-weight:600;text-decoration:none">Explora +1,000 ofertas actualizadas diariamente →</a>
        </td></tr>
      </table>`,
      p("¡Hasta la semana que viene!"),
      p("<strong>Equipo HispanosEnSuiza</strong>"),
    ].join("")
  );
}
