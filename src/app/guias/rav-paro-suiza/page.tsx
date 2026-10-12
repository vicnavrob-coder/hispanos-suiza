import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbSchema, faqSchema, howToSchema, BASE_URL } from "@/lib/seo";

const ACCENT = "#C8102E";

// ── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "RAV en Suiza: cómo cobrar el paro paso a paso (guía en español 2026)",
  description:
    "Todo lo que necesitas saber para inscribirte en el RAV y cobrar el paro en Suiza. Requisitos, importes, plazos y errores que cuestan dinero — explicado en español.",
  path: "/guias/rav-paro-suiza",
  ogType: "article",
  ogImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "RAV suiza español",
    "cobrar paro suiza español",
    "desempleo suiza",
    "ALV suiza",
    "inscribirse RAV",
    "paro suiza hispanohablante",
  ],
});

// ── Datos de duración del paro ───────────────────────────────────────────────

const TABLA_DURACION = [
  { meses: "12 meses cotizados",  dias: "260 días",  aprox: "~13 meses de paro" },
  { meses: "18 meses cotizados",  dias: "400 días",  aprox: "~20 meses de paro" },
  { meses: "24 meses cotizados",  dias: "520 días",  aprox: "~26 meses (máx.)" },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    pregunta: "¿Cuánto tiempo tengo para inscribirme en el RAV después de quedarme sin trabajo?",
    respuesta:
      "Tienes 30 días para inscribirte en el RAV de tu municipio. Pero la caja de desempleo (Kasse) debes solicitarla en los primeros 3 días laborables. Cada día de retraso puede suponer perder días de prestación.",
  },
  {
    pregunta: "¿Puedo cobrar el paro suizo si tengo permiso B?",
    respuesta:
      "Sí. El permiso B te da derecho al paro (ALV) siempre que hayas cotizado al menos 12 meses en los últimos 24 meses. El permiso B no es un impedimento.",
  },
  {
    pregunta: "¿Qué pasa si tengo permiso L (menos de 1 año)?",
    respuesta:
      "El permiso L es un permiso de corta duración. Si tu permiso L ha expirado al quedarte sin trabajo, perdes automáticamente el derecho de residencia en Suiza y con ello el acceso al paro. Solo puedes cobrar el paro suizo si sigues teniendo permiso de residencia válido.",
  },
  {
    pregunta: "¿Cuánto paro cobro si gano CHF 6.000 brutos al mes?",
    respuesta:
      "El 70% de tu salario asegurado, es decir CHF 4.200/mes. Si tienes hijos o necesidad especial acreditada, el porcentaje sube al 80% (CHF 4.800/mes). El salario máximo asegurado es CHF 12.350/mes bruto.",
  },
  {
    pregunta: "¿Puedo cobrar el paro suizo y volver a España?",
    respuesta:
      "Sí, mediante el formulario U2 (antes E303) puedes exportar el paro suizo a España durante máximo 3 meses mientras buscas trabajo allí. Debes inscribirte en el SEPE español antes de 7 días de llegar. Pasados los 3 meses debes volver a Suiza o renunciar a la prestación.",
  },
  {
    pregunta: "¿Qué candidaturas mínimas me exige el RAV?",
    respuesta:
      "El número varía por cantón y perfil, pero en general el RAV exige entre 8 y 12 candidaturas por mes debidamente documentadas. Debes presentarlas en cada cita mensual. No cumplirlas puede resultar en una sanción (reducción o suspensión temporal de la prestación).",
  },
];

// ── JSON-LD ───────────────────────────────────────────────────────────────────

const breadcrumb = breadcrumbSchema([
  { name: "Inicio",  url: BASE_URL },
  { name: "Guías",   url: `${BASE_URL}/guias` },
  { name: "RAV y paro en Suiza", url: `${BASE_URL}/guias/rav-paro-suiza` },
]);

const faq = faqSchema(FAQS);

const howTo = howToSchema({
  name: "Cómo cobrar el paro en Suiza paso a paso",
  description: "Guía completa para inscribirse en el RAV y empezar a cobrar la prestación por desempleo (ALV) en Suiza.",
  steps: [
    { name: "Da de baja en tu empresa", text: "Envía carta o correo a Recursos Humanos comunicando tu cese. Guarda el acuse de recibo con fecha." },
    { name: "Inscríbete en la caja de desempleo (Kasse)", text: "En los primeros 3 días laborables desde el paro debes solicitar tu Kasse de desempleo. Se recomienda Unia Kasse o SYNA para hispanohablantes." },
    { name: "Inscríbete en el RAV de tu municipio", text: "Tienes 30 días desde el inicio del paro para hacerlo. Lleva pasaporte/DNI, permiso de residencia, carta de despido y datos bancarios." },
    { name: "Asiste a la primera cita en el RAV", text: "El RAV te asignará un consejero personal. Tienes derecho a un intérprete si no dominas el idioma local." },
    { name: "Elabora tu plan de búsqueda de empleo (Stellensuche)", text: "Tu consejero del RAV te indicará cuántas candidaturas debes presentar cada mes y en qué formatos." },
    { name: "Valida tus actividades mensualmente", text: "Cada mes debes presentar al RAV prueba de tus candidaturas. El pago de la prestación se realiza una vez validado." },
  ],
});

// ── Componente ────────────────────────────────────────────────────────────────

export default function RavParoSuizaPage() {
  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* ── Breadcrumb ── */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-red-700">Inicio</Link>
          <span>›</span>
          <Link href="/guias" className="hover:text-red-700">Guías</Link>
          <span>›</span>
          <span className="text-gray-600">RAV y paro en Suiza</span>
        </nav>

        {/* ── Hero ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: "#FEE2E2", color: ACCENT }}>
              📋 Derechos laborales
            </span>
            <span className="text-sm text-gray-400">Guía actualizada 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
            RAV en Suiza: cómo cobrar el paro<br />
            <span style={{ color: ACCENT }}>paso a paso (guía en español 2026)</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            El RAV es la oficina de empleo suiza. Si has perdido tu trabajo, tienes derechos concretos —
            pero hay plazos muy cortos que, si se pierden, cuestan días de prestación. Esta guía te
            explica todo en español, sin tecnicismos.
          </p>
        </div>

        {/* ── Resumen en 30 segundos ── */}
        <div className="rounded-2xl p-6 mb-10 border-l-4" style={{ background: "#F0FDF4", borderColor: "#16A34A" }}>
          <h2 className="text-lg font-black text-gray-900 mb-3">Resumen en 30 segundos</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2"><span className="text-green-600 font-bold flex-shrink-0">✓</span><span><strong>Plazo crítico 1:</strong> inscríbete en la caja de desempleo (Kasse) en los primeros <strong>3 días laborables</strong></span></li>
            <li className="flex gap-2"><span className="text-green-600 font-bold flex-shrink-0">✓</span><span><strong>Plazo crítico 2:</strong> inscríbete en el RAV en los primeros <strong>30 días</strong></span></li>
            <li className="flex gap-2"><span className="text-green-600 font-bold flex-shrink-0">✓</span><span>Cobras el <strong>70% de tu salario</strong> (80% con hijos). Máximo 148 CHF/día</span></li>
            <li className="flex gap-2"><span className="text-green-600 font-bold flex-shrink-0">✓</span><span>Necesitas <strong>12 meses cotizados</strong> en los últimos 24 meses</span></li>
            <li className="flex gap-2"><span className="text-green-600 font-bold flex-shrink-0">✓</span><span>Puedes exportar el paro a España máximo <strong>3 meses</strong> con el formulario U2</span></li>
          </ul>
        </div>

        {/* ── Qué es el RAV ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">¿Qué es el RAV?</h2>
          <div className="prose max-w-none">
            <p>
              El <strong>RAV</strong> (Regionales Arbeitsvermittlungszentrum) es la oficina cantonal de empleo suiza.
              Su equivalente en España sería el SEPE o la antigua oficina del INEM. En francés se llama <strong>ORP</strong>
              (Office régional de placement) y en italiano <strong>URC</strong> (Ufficio regionale di collocamento).
            </p>
            <p>
              A diferencia de España, el sistema de paro suizo está gestionado por los <strong>cantones</strong>, no por
              el gobierno federal. Esto significa que cada cantón tiene sus propias oficinas y puede tener ligeras
              diferencias en el proceso. El organismo federal que supervisa el sistema es el SECO (Secretaría de Estado
              de Economía).
            </p>
            <p>
              Para acceder al RAV debes haberte quedado sin trabajo (o haber reducido tu jornada involuntariamente)
              y estar <strong>empadronado en tu municipio suizo</strong>. No puedes inscribirte en el RAV desde España.
            </p>
          </div>
        </section>

        {/* ── Requisitos ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Requisitos para cobrar el paro (ALV)</h2>
          <div className="space-y-3">
            {[
              {
                ok: true,
                titulo: "Mínimo 12 meses cotizados en los últimos 24 meses",
                desc: "Se cuenta la cotización al seguro de desempleo (ALV), que aparece en tu nómina. Con 12 meses tienes derecho; con más meses cotizados, más días de prestación.",
              },
              {
                ok: true,
                titulo: "Permiso de residencia válido (B o superior)",
                desc: "El permiso B, C, L (vigente) o G (fronterizo) da acceso al paro. Debes tener el permiso vigente en el momento de quedar en paro.",
              },
              {
                ok: true,
                titulo: "Residencia registrada en Suiza",
                desc: "Debes estar empadronado en un municipio suizo. Si ya te has dado de baja del municipio, pierdes el acceso al paro.",
              },
              {
                ok: true,
                titulo: "Disponible para trabajar",
                desc: "Debes estar en condiciones de aceptar un trabajo. Una baja médica larga puede afectar al derecho.",
              },
              {
                ok: false,
                titulo: "Permiso L vencido — caso especial",
                desc: "Si tenías permiso L (menos de 1 año) y este ha caducado, en principio pierdes el permiso de residencia y con él el derecho al paro. Consulta con el RAV o un asesor antes de actuar.",
              },
            ].map(({ ok, titulo, desc }) => (
              <div key={titulo} className="flex gap-4 bg-white rounded-2xl p-5 border border-gray-100">
                <span className={`flex-shrink-0 text-lg mt-0.5 ${ok ? "text-green-600" : "text-amber-500"}`}>
                  {ok ? "✓" : "!"}
                </span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{titulo}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Cuánto se cobra ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">¿Cuánto paro se cobra en Suiza?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Sin hijos", valor: "70%", sub: "del salario asegurado" },
              { label: "Con hijos / necesidad especial", valor: "80%", sub: "del salario asegurado" },
              { label: "Máximo diario", valor: "148 CHF", sub: "por día de paro (2026)" },
            ].map(({ label, valor, sub }) => (
              <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 text-center">
                <div className="text-3xl font-black mb-1" style={{ color: ACCENT }}>{valor}</div>
                <div className="text-sm font-semibold text-gray-700 mb-0.5">{label}</div>
                <div className="text-xs text-gray-400">{sub}</div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-4 border border-blue-100 bg-blue-50 mb-6 text-sm text-blue-800">
            <strong>Salario máximo asegurado:</strong> CHF 12.350/mes bruto. Si ganas más, el paro solo se calcula
            sobre este tope. El salario asegurado se calcula sobre la media de los 6 últimos meses trabajados.
          </div>

          <h3 className="text-xl font-black text-gray-900 mb-3">Duración de la prestación según cotización</h3>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-3 px-5 py-3 text-xs font-bold uppercase tracking-wider bg-gray-50 border-b border-gray-100 text-gray-400">
              <span>Cotización previa</span>
              <span>Días de paro</span>
              <span>Duración aprox.</span>
            </div>
            <div className="divide-y divide-gray-100">
              {TABLA_DURACION.map(({ meses, dias, aprox }) => (
                <div key={meses} className="grid grid-cols-3 px-5 py-3.5 text-sm hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-gray-800">{meses}</span>
                  <span className="text-gray-700 font-bold" style={{ color: ACCENT }}>{dias}</span>
                  <span className="text-gray-500">{aprox}</span>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-400">* 520 días es el máximo absoluto. Los mayores de 55 años con más cotización pueden tener condiciones especiales.</p>
            </div>
          </div>
        </section>

        {/* ── Proceso paso a paso ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Proceso paso a paso para cobrar el paro</h2>
          <div className="space-y-4">
            {[
              {
                n: "01",
                titulo: "Da de baja en tu empresa",
                urgencia: null,
                desc: "Envía una carta o correo a Recursos Humanos o a tu responsable comunicando tu cese. Guarda el acuse de recibo con fecha — lo necesitarás para el RAV. Si te despiden ellos, pide la carta de despido (Kündigungsschreiben) por escrito.",
              },
              {
                n: "02",
                titulo: "Inscríbete en la caja de desempleo (Kasse) — ¡en los primeros 3 días!",
                urgencia: "rojo",
                desc: "La Kasse es la entidad que te paga el paro. Hay varias: Unia Kasse o SYNA son especialmente recomendadas para hispanohablantes por su orientación a trabajadores manuales y de servicios. Puedes inscribirte online. Necesitarás: DNI/pasaporte, permiso de residencia, contrato de trabajo anterior y datos bancarios.",
              },
              {
                n: "03",
                titulo: "Inscríbete en el RAV de tu municipio — en los primeros 30 días",
                urgencia: "amber",
                desc: "El RAV es la oficina de empleo cantonal. Busca el RAV de tu municipio en el sitio web de tu cantón. Lleva: pasaporte o DNI, permiso de residencia, carta de despido (o baja voluntaria), currículum en el idioma local y datos bancarios suizos.",
              },
              {
                n: "04",
                titulo: "Primera cita en el RAV",
                urgencia: null,
                desc: "El RAV te asignará un consejero (Beraterin/Berater). Tienes derecho a solicitar un intérprete si no dominas el alemán, francés o italiano. En la primera cita establecen tu perfil y te explican las obligaciones: candidaturas mínimas, citas regulares y formaciones obligatorias.",
              },
              {
                n: "05",
                titulo: "Elabora y cumple tu plan de búsqueda de empleo (Stellensuche)",
                urgencia: null,
                desc: "Cada mes debes presentar un número mínimo de candidaturas (entre 8 y 12, según cantón y perfil). Cada candidatura debe estar documentada: empresa, fecha, puesto, respuesta recibida. El RAV puede pedirte que hagas formaciones o cursos como condición.",
              },
              {
                n: "06",
                titulo: "Pagos mensuales tras validar actividades",
                urgencia: null,
                desc: "Una vez al mes presentas al RAV y a la Kasse el listado de candidaturas y actividades. Si todo está en orden, la Kasse te transfiere el paro el mes siguiente. El retraso de 1-2 semanas en el primer pago es normal.",
              },
            ].map(({ n, titulo, urgencia, desc }) => (
              <div key={n} className={`flex gap-4 rounded-2xl p-5 border ${urgencia === "rojo" ? "border-red-200 bg-red-50" : urgencia === "amber" ? "border-amber-200 bg-amber-50" : "bg-white border-gray-100"}`}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white"
                  style={{ background: urgencia === "rojo" ? ACCENT : urgencia === "amber" ? "#D97706" : ACCENT }}>
                  {n}
                </div>
                <div>
                  <h3 className={`font-bold mb-1 ${urgencia === "rojo" ? "text-red-800" : urgencia === "amber" ? "text-amber-800" : "text-gray-900"}`}>{titulo}</h3>
                  <p className={`text-sm leading-relaxed ${urgencia === "rojo" ? "text-red-700" : urgencia === "amber" ? "text-amber-700" : "text-gray-500"}`}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Errores comunes ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Errores comunes que cuestan dinero</h2>
          <div className="space-y-3">
            {[
              {
                titulo: "Esperar más de 30 días para inscribirse en el RAV",
                desc: "Cada día de retraso puede suponer perder días de prestación. El cálculo del paro empieza desde la fecha de inscripción, no retroactivamente.",
              },
              {
                titulo: "No acudir a las citas del RAV sin avisar",
                desc: "El RAV puede sancionarte con suspensión temporal del paro si faltas sin justificación. Si no puedes ir, avisa con antelación y pide cambio de cita.",
              },
              {
                titulo: "No cumplir las candidaturas mínimas mensuales",
                desc: "Presentar pocas candidaturas o sin documentación adecuada puede resultar en sanción. Guarda todas las respuestas (incluidas las negativas) para mostrarlas.",
              },
              {
                titulo: "Marcharte a España sin avisar al RAV",
                desc: "Si te vas al extranjero sin comunicarlo al RAV, pierdes el paro desde el primer día de ausencia. Si quieres ir a España, activa el formulario U2 antes de salir.",
              },
              {
                titulo: "No inscribirse en la Kasse en los primeros 3 días laborables",
                desc: "Esperar más de 3 días laborables para la Kasse puede resultar en un período de espera adicional (Wartezeit) antes de empezar a cobrar.",
              },
            ].map(({ titulo, desc }) => (
              <div key={titulo} className="flex gap-4 rounded-2xl p-5 border border-red-100 bg-red-50">
                <span className="text-red-600 font-black flex-shrink-0 text-lg mt-0.5">✗</span>
                <div>
                  <h3 className="font-bold text-red-800 mb-1">{titulo}</h3>
                  <p className="text-sm text-red-700 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Formulario U2 ── */}
        <section className="mb-10">
          <div className="rounded-2xl p-6 border-l-4" style={{ background: "#EFF6FF", borderColor: "#1D4ED8" }}>
            <h2 className="text-xl font-black text-gray-900 mb-3">¿Puedo cobrar el paro suizo y volver a España?</h2>
            <div className="prose max-w-none text-sm">
              <p>
                Sí. El <strong>formulario U2</strong> (antes llamado E303) permite exportar el paro suizo a España durante
                un máximo de <strong>3 meses</strong> mientras buscas trabajo allí. Es un derecho reconocido por el
                acuerdo bilateral España-Suiza sobre seguridad social.
              </p>
              <p>Proceso:</p>
              <ol>
                <li>Antes de salir de Suiza: solicita el formulario U2 en tu Kasse o en el RAV</li>
                <li>Al llegar a España: inscríbete en el <strong>SEPE</strong> antes de 7 días de llegada</li>
                <li>El SEPE registra tu prestación y empiezas a cobrar la misma cantidad en euros (tipo de cambio aplicado)</li>
                <li>Pasados los 3 meses: o vuelves a Suiza y reactivás el paro allí, o renuncias a la prestación suiza</li>
              </ol>
              <p className="text-blue-800 font-semibold">
                Importante: si no te inscribes en el SEPE antes de 7 días, puedes perder el derecho a la exportación.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Preguntas frecuentes sobre el paro en Suiza</h2>
          <div className="space-y-4">
            {FAQS.map(({ pregunta, respuesta }) => (
              <div key={pregunta} className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{pregunta}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{respuesta}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mb-10">
          <div className="rounded-2xl p-7 border-2 text-center" style={{ borderColor: ACCENT, background: "#FFF5F5" }}>
            <h2 className="text-xl font-black text-gray-900 mb-2">
              ¿Necesitas ayuda para tramitar el paro en Suiza?
            </h2>
            <p className="text-gray-500 text-sm mb-5 max-w-lg mx-auto">
              Nuestro <strong>Pack Aterrizaje Suiza</strong> incluye asesoramiento en español para gestionar
              tu inscripción en el RAV, revisar tus derechos laborales y preparar el CV para el mercado suizo.
            </p>
            <Link
              href="/planes"
              className="inline-block px-8 py-3 rounded-full text-white font-bold text-sm hover:opacity-90 transition-opacity"
              style={{ background: ACCENT }}
            >
              Ver Pack Aterrizaje Suiza →
            </Link>
          </div>
        </section>

        {/* ── Links relacionados ── */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">También te puede interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/trabajo/unia", label: "⚖️ UNIA: el sindicato suizo" },
              { href: "/herramientas/salario-neto", label: "🧮 Calculadora salario neto" },
              { href: "/guias/volver-espana-desde-suiza", label: "✈️ Volver a España desde Suiza" },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className="flex items-center gap-2 bg-white rounded-xl p-4 border border-gray-100 text-sm font-semibold text-gray-700 hover:text-red-700 hover:border-red-100 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
