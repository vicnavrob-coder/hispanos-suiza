import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbSchema, faqSchema, howToSchema, BASE_URL } from "@/lib/seo";

const ACCENT = "#C8102E";

// ── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Divorcio en Suiza siendo hispanohablante: proceso, derechos y permiso 2026",
  description:
    "Guía completa del divorcio en Suiza: proceso civil, custodia, pensiones, segundo pilar y qué pasa con tu permiso de residencia. En español, con datos reales.",
  path: "/guias/divorcio-suiza",
  ogType: "article",
  ogImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "divorcio suiza español",
    "separación suiza trámites",
    "divorcio suiza permiso residencia",
    "divorcio mutuo acuerdo suiza",
    "custodia hijos suiza divorcio",
    "segundo pilar divorcio suiza",
  ],
});

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    pregunta: "¿Qué pasa con mi permiso de residencia si me divorcio de mi pareja suiza?",
    respuesta:
      "Depende del tiempo que lleves en Suiza. Si llevas menos de 3 años con permiso B por reagrupación familiar, el divorcio puede poner en riesgo el permiso. Con más de 3 años el permiso B se convierte generalmente en independiente. Con permiso C (5+ años) no hay ningún riesgo. Si eres víctima de violencia doméstica, el tiempo no importa: puedes pedir un permiso humanitario.",
  },
  {
    pregunta: "¿Puedo divorciarme en Suiza siendo español o latinoamericano?",
    respuesta:
      "Sí. Si vives en Suiza, los tribunales civiles suizos tienen competencia para tramitar tu divorcio, aunque seas extranjero. El divorcio se rige principalmente por el Código Civil suizo (ZGB).",
  },
  {
    pregunta: "¿Cuánto tarda un divorcio por mutuo acuerdo en Suiza?",
    respuesta:
      "Un divorcio por mutuo acuerdo con acuerdo completo sobre todos los puntos (custodia, bienes, alimentos) suele tardar entre 2 y 6 meses desde la presentación de la demanda. El proceso es más rápido que en España.",
  },
  {
    pregunta: "¿Qué pasa con el segundo pilar si me divorcio?",
    respuesta:
      "El segundo pilar (Pensionskasse / BVG) cotizado durante el matrimonio se divide entre los dos cónyuges. Se llama Vorsorgeausgleich (compensación de previsión). Es automático salvo acuerdo contrario homologado por el tribunal.",
  },
  {
    pregunta: "¿El divorcio suizo es válido en España?",
    respuesta:
      "Sí. El divorcio pronunciado en Suiza es automáticamente reconocido en España en virtud del Reglamento Bruselas II bis, que aplica a todos los estados miembros de la UE y por convenio bilateral. Solo tienes que inscribirlo en el Registro Civil Central de Madrid (puede hacerse desde el consulado).",
  },
];

// ── JSON-LD ───────────────────────────────────────────────────────────────────

const breadcrumb = breadcrumbSchema([
  { name: "Inicio",  url: BASE_URL },
  { name: "Guías",   url: `${BASE_URL}/guias` },
  { name: "Divorcio en Suiza", url: `${BASE_URL}/guias/divorcio-suiza` },
]);

const faq = faqSchema(FAQS);

const howTo = howToSchema({
  name: "Cómo divorciarse en Suiza siendo hispanohablante",
  description: "Proceso completo del divorcio civil en Suiza para españoles y latinoamericanos residentes.",
  totalTime: "PT3M",
  steps: [
    { name: "Redactar el convenio regulador", text: "Si hay mutuo acuerdo, elaborar el Scheidungskonvention con todos los puntos: custodia, alimentos, bienes y segundo pilar. Puede hacerse sin abogado si hay acuerdo total." },
    { name: "Presentar la demanda en el tribunal cantonal", text: "Dirigirse al Zivilgericht (tribunal civil) del cantón de residencia con la demanda y el convenio firmado. Se acompaña de documentación: pasaportes, certificado de matrimonio, certificado de nacimiento de los hijos si los hay." },
    { name: "Audiencia ante el juez", text: "Ambas partes deben comparecer. El juez verifica que las condiciones son libres, informadas y equilibradas. No es necesario abogado si hay acuerdo completo." },
    { name: "Sentencia de divorcio", text: "El juez dicta sentencia. En casos con acuerdo total suele tardar 2-6 meses. La sentencia incluye todos los acuerdos sobre hijos, bienes y pensiones." },
    { name: "Inscribir el divorcio en España (si aplica)", text: "El divorcio suizo es automáticamente reconocido en España. Para inscribirlo, contactar con el Registro Civil Central de Madrid o el consulado español más cercano con copia de la sentencia." },
  ],
});

// ── Componente ────────────────────────────────────────────────────────────────

export default function DivorcioSuizaPage() {
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
          <span className="text-gray-600">Divorcio en Suiza</span>
        </nav>

        {/* ── Hero ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: "#FEE2E2", color: ACCENT }}>
              ⚖️ Derecho familiar
            </span>
            <span className="text-sm text-gray-400">Guía actualizada 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
            Divorcio en Suiza siendo hispanohablante:<br />
            <span style={{ color: ACCENT }}>proceso, derechos y qué pasa con el permiso 2026</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Separarse en Suiza siendo extranjero añade una capa de complejidad que la mayoría de las guías
            ignoran: el permiso de residencia, el segundo pilar y el reconocimiento en España.
            Esta guía lo explica todo en español.
          </p>
        </div>

        {/* ── Resumen en 30 segundos ── */}
        <div className="rounded-2xl p-6 mb-10 border-l-4" style={{ background: "#F0FDF4", borderColor: "#16A34A" }}>
          <h2 className="text-lg font-black text-gray-900 mb-3">Resumen en 30 segundos</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2"><span className="text-green-600 font-bold flex-shrink-0">✓</span><span>Si vives en Suiza, los <strong>tribunales suizos</strong> son competentes aunque seas español o latinoamericano</span></li>
            <li className="flex gap-2"><span className="text-green-600 font-bold flex-shrink-0">✓</span><span>Divorcio por <strong>mutuo acuerdo</strong>: 2–6 meses, sin abogado obligatorio si hay acuerdo total</span></li>
            <li className="flex gap-2"><span className="text-amber-500 font-bold flex-shrink-0">!</span><span>Permiso B por reagrupación con <strong>menos de 3 años</strong>: el divorcio puede afectar al permiso</span></li>
            <li className="flex gap-2"><span className="text-green-600 font-bold flex-shrink-0">✓</span><span>El <strong>segundo pilar</strong> cotizado durante el matrimonio se divide a partes iguales</span></li>
            <li className="flex gap-2"><span className="text-green-600 font-bold flex-shrink-0">✓</span><span>El divorcio suizo es <strong>válido en España</strong> automáticamente (Reglamento Bruselas II bis)</span></li>
          </ul>
        </div>

        {/* ── Derecho suizo de divorcio ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">El divorcio en el derecho suizo</h2>
          <div className="prose max-w-none">
            <p>
              El divorcio en Suiza está regulado por el <strong>Código Civil suizo (ZGB — Zivilgesetzbuch)</strong>,
              principalmente en los artículos 111–149. Si resides en Suiza, los tribunales civiles suizos tienen
              competencia para tramitar tu divorcio, independientemente de tu nacionalidad o la de tu pareja.
            </p>
            <p>
              Existen dos vías principales:
            </p>
            <ul>
              <li><strong>Divorcio por mutuo acuerdo (Scheidung auf gemeinsames Begehren)</strong>: ambos cónyuges están de acuerdo en divorciarse y han llegado a un acuerdo sobre todos los puntos clave (custodia, bienes, alimentos). Es la vía más rápida y económica.</li>
              <li><strong>Divorcio unilateral (Scheidungsklage)</strong>: cuando no hay acuerdo o uno de los cónyuges se opone. Requiere haber vivido separados durante al menos <strong>2 años</strong> o acreditar que la convivencia es insoportable.</li>
            </ul>
          </div>
        </section>

        {/* ── Proceso mutuo acuerdo ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Proceso de divorcio por mutuo acuerdo paso a paso</h2>
          <div className="space-y-4">
            {[
              {
                n: "01",
                titulo: "Negociar y redactar el convenio regulador (Scheidungskonvention)",
                desc: "El convenio debe cubrir: custodia de los hijos, régimen de visitas, pensión alimentaria para los hijos (Alimente), reparto de bienes y del segundo pilar, y eventual pensión entre cónyuges. Si hay acuerdo en todo, no es obligatorio contratar abogado — aunque es recomendable para revisar el documento.",
              },
              {
                n: "02",
                titulo: "Presentar la demanda conjunta en el Zivilgericht cantonal",
                desc: "La demanda se presenta ante el tribunal civil (Zivilgericht o Tribunal Civil) del cantón donde vivís. Los formularios y el proceso varían ligeramente por cantón. Se puede presentar en persona o por correo. Se adjunta el convenio regulador, acta de matrimonio y documentos de los hijos si los hay.",
              },
              {
                n: "03",
                titulo: "Audiencia ante el juez",
                desc: "Ambas partes deben comparecer. El juez verifica que el acuerdo es libre y consciente, que los intereses de los hijos están protegidos y que ninguno ha sido coaccionado. Tienes derecho a que el procedimiento sea en el idioma oficial del cantón; si no lo dominas, puedes llevar intérprete.",
              },
              {
                n: "04",
                titulo: "Sentencia de divorcio",
                desc: "El juez dicta la sentencia de divorcio. En casos no disputados puede tardar entre 2 y 6 meses. La sentencia incluye todas las condiciones acordadas y es jurídicamente vinculante.",
              },
              {
                n: "05",
                titulo: "Inscripción en el registro civil (Zivilstandsamt)",
                desc: "Una vez firme la sentencia, el tribunal la comunica al registro civil. No necesitas hacer gestiones adicionales en Suiza para que quede registrado.",
              },
            ].map(({ n, titulo, desc }) => (
              <div key={n} className="flex gap-4 bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white"
                  style={{ background: ACCENT }}>
                  {n}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{titulo}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Permiso de residencia ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">¿Qué pasa con el permiso de residencia?</h2>
          <div className="rounded-2xl p-5 border border-amber-200 bg-amber-50 mb-6">
            <p className="text-amber-800 text-sm font-semibold mb-2">Esta es la pregunta más importante para muchos hispanohablantes</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              Si tienes un permiso B obtenido por reagrupación familiar (es decir, te viniste a Suiza porque tu pareja suiza o con permiso C te trajo), el divorcio puede afectar a tu permiso de residencia. La situación varía mucho según cuánto tiempo llevas en Suiza.
            </p>
          </div>
          <div className="space-y-3">
            {[
              {
                color: "red",
                titulo: "Menos de 3 años en Suiza con permiso B por reagrupación",
                desc: "Riesgo de pérdida del permiso. La autoridad de extranjería (cantonal) puede no renovar el permiso B si ya no existe el vínculo conyugal. Sin embargo, hay excepciones: si tienes hijos en Suiza, si llevas trabajando, o si eres víctima de violencia doméstica (en cuyo caso el tiempo no importa).",
                badge: "Riesgo",
              },
              {
                color: "amber",
                titulo: "Entre 3 y 5 años en Suiza con permiso B",
                desc: "El permiso B generalmente se convierte en un permiso B independiente (no vinculado al cónyuge) si has estado integrado/a en el mercado laboral suizo. La autoridad valora: trabajo, idioma, integración. Es recomendable pedir asesoramiento antes de divorciarte formalmente.",
                badge: "Situación media",
              },
              {
                color: "green",
                titulo: "5+ años en Suiza con permiso C",
                desc: "El permiso C (establecimiento) no está vinculado al matrimonio. El divorcio no afecta en absoluto a tu derecho de residencia. Puedes divorciarte sin ningún impacto en tu estatus migratorio.",
                badge: "Sin riesgo",
              },
              {
                color: "blue",
                titulo: "Violencia doméstica — caso especial",
                desc: "Si eres víctima de violencia doméstica, la ley suiza protege tu permiso de residencia independientemente del tiempo que lleves. Debes documentar la situación (denuncia policial, informe médico) y solicitar un permiso humanitario.",
                badge: "Protección especial",
              },
            ].map(({ color, titulo, desc, badge }) => {
              const colors: Record<string, { bg: string; border: string; badge: string; badgeText: string; text: string; title: string }> = {
                red:   { bg: "bg-red-50",   border: "border-red-200",   badge: "bg-red-100",   badgeText: "text-red-700",   text: "text-red-700",   title: "text-red-900" },
                amber: { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100", badgeText: "text-amber-700", text: "text-amber-700", title: "text-amber-900" },
                green: { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-100", badgeText: "text-green-700", text: "text-green-700", title: "text-green-900" },
                blue:  { bg: "bg-blue-50",  border: "border-blue-200",  badge: "bg-blue-100",  badgeText: "text-blue-700",  text: "text-blue-700",  title: "text-blue-900" },
              };
              const c = colors[color];
              return (
                <div key={titulo} className={`rounded-2xl p-5 border ${c.bg} ${c.border}`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className={`font-bold ${c.title}`}>{titulo}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${c.badge} ${c.badgeText}`}>{badge}</span>
                  </div>
                  <p className={`text-sm leading-relaxed ${c.text}`}>{desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Custodia ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Custodia de los hijos en el divorcio suizo</h2>
          <div className="prose max-w-none">
            <p>
              Desde la reforma de 2014, la <strong>custodia compartida (gemeinsame elterliche Sorge)</strong> es el
              estándar legal en Suiza. Esto significa que, salvo circunstancias excepcionales, ambos padres comparten
              la responsabilidad parental (Sorgerecht) aunque los hijos vivan principalmente con uno de ellos.
            </p>
            <p>
              Lo que sí se negocia es la <strong>residencia habitual</strong> del menor (con quién vive la mayor
              parte del tiempo). El tribunal prioriza la estabilidad: si los hijos han vivido siempre en Suiza y
              están escolarizados aquí, es muy poco probable que el juez autorice llevarlos a España sin el acuerdo
              del otro progenitor.
            </p>
            <p>
              La <strong>pensión alimentaria (Alimente)</strong> se calcula según tablas cantorales basadas en los
              ingresos del progenitor que paga y las necesidades del menor. En caso de desacuerdo, el tribunal la fija.
            </p>
          </div>
          <div className="rounded-2xl p-4 border border-amber-200 bg-amber-50 mt-4 text-sm text-amber-800">
            <strong>Importante:</strong> llevar a los hijos a España sin el acuerdo del otro progenitor y sin
            autorización judicial constituye sustracción internacional de menores (Convenio de La Haya 1980).
            Consulta siempre con un abogado antes de actuar.
          </div>
        </section>

        {/* ── Pensión conyugal ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Pensión de divorcio entre cónyuges</h2>
          <div className="prose max-w-none">
            <p>
              La pensión entre cónyuges (alimentos conyugales) no es automática en Suiza. Solo se concede si
              uno de los cónyuges <strong>no puede mantenerse por sí mismo</strong> tras el divorcio — situación
              más frecuente cuando uno dejó de trabajar para cuidar a los hijos durante el matrimonio.
            </p>
            <p>
              Es temporal en la mayoría de los casos: dura lo suficiente para que el cónyuge que recibe la pensión
              pueda reinsertarse en el mercado laboral. El tribunal suizo es bastante riguroso: si tienes capacidad
              de trabajar, se espera que lo hagas.
            </p>
          </div>
        </section>

        {/* ── Bienes y segundo pilar ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Reparto de bienes y del segundo pilar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">Bienes adquiridos durante el matrimonio</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Por defecto, los bienes adquiridos durante el matrimonio (participación en adquisiciones —
                Errungenschaftsbeteiligung) se dividen a partes iguales. Los bienes propios anteriores al matrimonio
                y las herencias personales no se dividen.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">Segundo pilar (Vorsorgeausgleich)</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                El dinero cotizado al segundo pilar (BVG/LPP) durante el matrimonio se divide en dos partes
                iguales entre los cónyuges, independientemente de quién haya cotizado más. Esto es automático
                y está regulado por ley. Solo se puede evitar con acuerdo específico homologado por el tribunal.
              </p>
            </div>
          </div>
        </section>

        {/* ── Reconocimiento en España ── */}
        <section className="mb-10">
          <div className="rounded-2xl p-6 border-l-4" style={{ background: "#EFF6FF", borderColor: "#1D4ED8" }}>
            <h2 className="text-xl font-black text-gray-900 mb-3">El divorcio suizo en España: reconocimiento</h2>
            <div className="prose max-w-none text-sm">
              <p>
                El divorcio pronunciado en Suiza es <strong>automáticamente reconocido en España</strong>
                en virtud del Reglamento Bruselas II bis (Reglamento CE 2201/2003) y del acuerdo bilateral
                España-Suiza. No necesitas un proceso de "exequátur" para que sea válido.
              </p>
              <p>Sin embargo, sí debes inscribirlo en el Registro Civil español para que quede constancia en tus registros:</p>
              <ol>
                <li>Obtén una copia certificada de la sentencia de divorcio suiza con la apostilla de La Haya</li>
                <li>Tradúcela al español por traductor jurado (si está en alemán, francés o italiano)</li>
                <li>Envía la documentación al Registro Civil Central de Madrid — puedes hacerlo desde el consulado español en Suiza</li>
              </ol>
              <p className="text-blue-800 font-semibold">
                Si quieres volver a casarte en España, necesitarás haber inscrito el divorcio previamente.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Preguntas frecuentes sobre el divorcio en Suiza</h2>
          <div className="space-y-4">
            {FAQS.map(({ pregunta, respuesta }) => (
              <div key={pregunta} className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{pregunta}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{respuesta}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Aviso legal ── */}
        <div className="rounded-2xl p-4 border border-gray-200 bg-gray-50 mb-10 text-xs text-gray-400">
          Esta guía tiene carácter informativo general. No constituye asesoramiento jurídico. Cada caso de divorcio
          tiene circunstancias particulares. Consulta siempre con un abogado de familia habilitado en Suiza antes
          de tomar decisiones.
        </div>

        {/* ── CTA ── */}
        <section className="mb-10">
          <div className="rounded-2xl p-7 border-2 text-center" style={{ borderColor: ACCENT, background: "#FFF5F5" }}>
            <h2 className="text-xl font-black text-gray-900 mb-2">
              ¿Necesitas orientación sobre tu situación?
            </h2>
            <p className="text-gray-500 text-sm mb-5 max-w-lg mx-auto">
              En el <strong>Pack Aterrizaje Suiza</strong> te conectamos con asesores en español que pueden
              orientarte sobre permisos de residencia, trámites y servicios de asesoramiento jurídico.
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
              { href: "/guias/rav-paro-suiza",             label: "📋 Cobrar el paro en Suiza" },
              { href: "/guias/volver-espana-desde-suiza",  label: "✈️ Volver a España desde Suiza" },
              { href: "/seguros",                          label: "🛡️ Seguros médicos en Suiza" },
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
