import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, BASE_URL, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { ESTACIONES, PUESTOS_SKI } from "@/lib/esqui";

export const metadata: Metadata = buildMetadata({
  title: "Trabajar en estaciones de esquí en Suiza: guía completa 2026",
  description:
    "Guía completa para trabajar en estaciones de esquí suizas: salarios, puestos, permisos y qué estaciones tienen más hispanohablantes. Actualizada 2026.",
  path: "/trabajo/esqui-suiza",
  ogImage:
    "https://images.unsplash.com/photo-1547483238-f400e65ccd56?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "trabajo estacion esqui suiza",
    "trabajar en suiza ski",
    "temporada ski suiza español",
    "trabajo temporal suiza esqui",
    "empleo estacion nieve suiza",
    "monitor esqui suiza",
    "temporero suiza invierno",
  ],
});

const ACCENT = "#C8102E";

const schemas = [
  breadcrumbSchema([
    { name: "Inicio",             url: BASE_URL },
    { name: "Trabajo",            url: `${BASE_URL}/trabajo` },
    { name: "Estaciones de esquí", url: `${BASE_URL}/trabajo/esqui-suiza` },
  ]),
  faqSchema([
    {
      pregunta: "¿Necesito hablar alemán para trabajar en una estación de esquí en Suiza?",
      respuesta:
        "Depende de la estación. En Verbier o Crans-Montana se trabaja principalmente en inglés o francés. En Zermatt o Davos el alemán ayuda pero muchos empleadores contratan con inglés básico para hostelería. Las estaciones francófonas (Crans-Montana, Leysin) son más accesibles para hispanohablantes.",
    },
    {
      pregunta: "¿Cuándo empezar a buscar trabajo en estaciones de esquí suizas?",
      respuesta:
        "Lo ideal es aplicar entre octubre y noviembre para empezar en diciembre. Las mejores posiciones se cubren rápido. Para temporada de verano (julio-septiembre), busca desde marzo-abril. Las estaciones de alta altitud como Saas-Fee abren ya en octubre.",
    },
    {
      pregunta: "¿El alojamiento está incluido en el contrato de trabajo?",
      respuesta:
        "La mayoría de estaciones grandes ofrecen alojamiento para el personal, bien incluido en el contrato o a precio muy reducido (100–400 CHF/mes). Siempre pregunta antes de firmar. El alojamiento suele ser compartido (habitación en residencia o piso del staff). En las estaciones más pequeñas puede no estar disponible.",
    },
    {
      pregunta: "¿Es posible trabajar solo parte de la temporada o hay que comprometerse a todo?",
      respuesta:
        "Los contratos más comunes son de temporada completa (diciembre-abril). Algunos empleadores, especialmente en hostelería, aceptan contratos parciales de 2-3 meses para el pico (diciembre-febrero). Los trabajos de instructor de esquí o ski patrol suelen requerir compromiso de temporada completa.",
    },
    {
      pregunta: "¿Cómo es el ambiente para hispanohablantes en las estaciones de esquí?",
      respuesta:
        "Varía mucho por estación. Verbier, Crans-Montana y Leysin tienen comunidades latinas bien establecidas con grupos de WhatsApp, encuentros y redes de apoyo. En estaciones más pequeñas la comunidad es menor pero el ambiente de equipo internacional suele facilitar la integración. Muchos empiezan como temporeros y llevan años establecidos.",
    },
    {
      pregunta: "¿Los latinoamericanos (no UE) pueden trabajar en estaciones de esquí suizas?",
      respuesta:
        "Sí, aunque con más trámites. El trabajo estacional entra dentro del contingente anual de permisos para ciudadanos no-UE. La diferencia clave es que el empleador (el hotel o la estación) solicita el permiso por ti, no tú directamente. Por eso es más fácil conseguirlo a través de un empleador grande con experiencia en contratar extranjeros.",
    },
  ]),
];

const VENTAJAS = [
  {
    icono: "💰",
    titulo: "Salarios 30–50% superiores a Francia o Italia",
    desc: "Un camarero en una estación suiza gana entre 3.500 y 4.500 CHF/mes. En las mismas estaciones francesas, 1.800–2.200 EUR. La diferencia es sustancial incluso descontando el coste de vida.",
  },
  {
    icono: "🏠",
    titulo: "Alojamiento incluido o muy barato",
    desc: "La mayoría de hoteles y estaciones grandes ofrecen alojamiento para el personal. A veces gratis, a veces a 100–400 CHF/mes. Reduce mucho el coste real de vivir.",
  },
  {
    icono: "🎿",
    titulo: "Forfait de esquí incluido",
    desc: "Muchos contratos incluyen o subvencionan el pase de ski. Para hacerte una idea: un forfait en Verbier cuesta 400–600 CHF para el público general.",
  },
  {
    icono: "🤝",
    titulo: "Comunidad hispanohablante establecida",
    desc: "En estaciones como Verbier, Crans-Montana o Leysin hay grupos activos de hispanohablantes con redes de apoyo, compañeros de piso y grupos de WhatsApp.",
  },
  {
    icono: "🚪",
    titulo: "Puerta de entrada a Suiza",
    desc: "Muchos hispanohablantes llegaron a Suiza por primera vez para una temporada de ski. Después de meses con permiso de trabajo, encontraron empleo fijo y se quedaron.",
  },
  {
    icono: "🌍",
    titulo: "Ambiente internacional",
    desc: "Las estaciones suizas tienen personal de toda Europa y América Latina. El idioma de trabajo suele ser inglés o francés, no alemán. Mucho más accesible.",
  },
];

const TEMPORADAS = [
  {
    nombre: "Temporada de invierno",
    meses: "Mediados nov – mediados abril",
    pico: "Diciembre – febrero",
    demanda: "Alta",
    color: "#1d4ed8",
    colorLight: "#EFF6FF",
  },
  {
    nombre: "Temporada de verano",
    meses: "Julio – septiembre",
    pico: "Agosto",
    demanda: "Moderada",
    color: "#15803d",
    colorLight: "#F0FDF4",
  },
  {
    nombre: "Alta altitud (todo el año)",
    meses: "Octubre – mayo (nieve), julio – septiembre (glaciar)",
    pico: "Diciembre – marzo",
    demanda: "Continua",
    color: ACCENT,
    colorLight: "#FFF5F5",
  },
];

const HISPANOS_BADGE: Record<"alto" | "medio" | "bajo", { label: string; color: string; bg: string }> = {
  alto:  { label: "Muchos hispanos", color: "#15803d", bg: "#F0FDF4" },
  medio: { label: "Comunidad media", color: "#b45309", bg: "#FFFBEB" },
  bajo:  { label: "Poca comunidad",  color: "#6b7280", bg: "#F9FAFB" },
};

export default function EsquiSuizaPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* ── Breadcrumb ── */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-red-700">Inicio</Link>
          <span>›</span>
          <Link href="/trabajo" className="hover:text-red-700">Trabajo</Link>
          <span>›</span>
          <span className="text-gray-600">Estaciones de esquí</span>
        </nav>

        {/* ── Hero ── */}
        <div
          className="relative rounded-3xl overflow-hidden mb-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1547483238-f400e65ccd56?w=1200&q=80&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "320px",
          }}
        >
          <div className="relative z-10 px-8 py-12">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-sm font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(200,16,46,0.85)", color: "white" }}
              >
                🎿 Trabajo estacional
              </span>
              <span className="text-sm text-white/70">Guía 2026</span>
            </div>
            <h1 className="text-4xl font-black text-white leading-tight mb-4 max-w-2xl">
              Trabajar en estaciones de esquí en Suiza
            </h1>
            <p className="text-white/80 text-lg max-w-xl mb-8">
              Salarios muy superiores a otras estaciones alpinas, alojamiento incluido y muchos
              hispanohablantes ya establecidos. La ruta más popular para llegar a Suiza.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-lg">
              {[
                { valor: "8+",           label: "Grandes estaciones" },
                { valor: "3.400–7.000",  label: "CHF/mes según puesto" },
                { valor: "4–6 meses",    label: "Temporada típica" },
              ].map(({ valor, label }) => (
                <div key={label} className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-xl font-black text-white">{valor}</div>
                  <div className="text-xs text-white/70 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Por qué Suiza ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-6">
            ¿Por qué trabajar en estaciones de esquí en Suiza?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VENTAJAS.map(({ icono, titulo, desc }) => (
              <div key={titulo} className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{icono}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{titulo}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Temporadas ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Cuándo hay trabajo: las temporadas</h2>
          <p className="text-gray-500 text-sm mb-5">
            La temporada de invierno es la principal. Las estaciones de alta altitud tienen demanda casi todo el año.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TEMPORADAS.map(({ nombre, meses, pico, demanda, color, colorLight }) => (
              <div
                key={nombre}
                className="rounded-2xl p-5 border"
                style={{ background: colorLight, borderColor: color + "33" }}
              >
                <div
                  className="text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-3"
                  style={{ background: color, color: "white" }}
                >
                  {demanda}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{nombre}</h3>
                <p className="text-sm text-gray-600">{meses}</p>
                <p className="text-xs text-gray-400 mt-1">Pico: {pico}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <strong>Consejo:</strong> Saas-Fee y Zermatt empiezan a contratar personal para octubre-noviembre.
            Si te presentas antes que el resto, tienes más opciones de elegir puesto.
          </div>
        </section>

        {/* ── Puestos y salarios ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Puestos de trabajo y salarios</h2>
          <p className="text-gray-500 text-sm mb-5">
            Salarios brutos aproximados para la temporada 2025–2026. El neto depende de la franquicia fiscal y del cantón.
          </p>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-3 px-5 py-3 text-xs font-bold uppercase tracking-wider bg-gray-50 border-b border-gray-100 text-gray-400">
              <span className="col-span-1">Puesto</span>
              <span className="col-span-1">Salario bruto/mes</span>
              <span className="col-span-1 hidden md:block">Requisitos</span>
            </div>
            <div className="divide-y divide-gray-100">
              {PUESTOS_SKI.map(({ puesto, salario, nota }) => (
                <div
                  key={puesto}
                  className="grid grid-cols-3 px-5 py-3.5 text-sm hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 col-span-1">{puesto}</span>
                  <span className="text-green-700 font-semibold col-span-1">{salario}</span>
                  <span className="text-gray-400 text-xs col-span-1 hidden md:block leading-relaxed">{nota}</span>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                * Rangos orientativos 2025–2026. El salario final depende de la estación, el empleador y la experiencia previa.
              </p>
            </div>
          </div>
        </section>

        {/* ── Qué permiso necesito ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Qué permiso de trabajo necesito</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <h3 className="font-bold text-blue-900 mb-2">🇪🇺 Ciudadanos UE/EEE (incluidos españoles)</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span><strong>Permiso L</strong>: para contratos de menos de 3 meses</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span><strong>Permiso B</strong>: si el contrato es de más de 3 meses (el más común en estaciones)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span>Se solicita en la oficina de control de habitantes de tu municipio tras llegar</span>
                </li>
              </ul>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
              <h3 className="font-bold text-orange-900 mb-2">🌎 Latinoamericanos (no UE)</h3>
              <ul className="space-y-2 text-sm text-orange-800">
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span>El trabajo estacional entra dentro del contingente anual de permisos para no-UE</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span><strong>El empleador solicita el permiso por ti</strong> — no tú directamente</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span>Más fácil conseguirlo en hostelería de estaciones grandes con tradición de contratar extranjeros</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Cómo conseguir trabajo ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Cómo conseguir trabajo: paso a paso</h2>
          <div className="space-y-4">
            {[
              {
                n: "01",
                titulo: "Prepara tu CV en el idioma de la estación",
                desc: 'Alemán para estaciones del Valais alemán o Graubünden (Zermatt, Davos, Saas-Fee). Francés para estaciones romandas (Verbier, Crans-Montana, Leysin). Inglés siempre ayuda como segundo idioma. Destaca experiencia en hostelería, idiomas y disponibilidad para temporada completa.',
              },
              {
                n: "02",
                titulo: "Aplica entre octubre y noviembre para diciembre",
                desc: "Las mejores posiciones se cubren en octubre-noviembre. Envía candidaturas directamente en la web de cada estación u hotel. No esperes a diciembre — para entonces muchos puestos están cubiertos.",
              },
              {
                n: "03",
                titulo: "Usa plataformas especializadas",
                desc: "jobs.ch con filtro 'Tourismus' y cantón, hrecruitment.com (especializado en hostelería ski), season-workers.com. También LinkedIn para hoteles de lujo en Verbier o Zermatt.",
              },
              {
                n: "04",
                titulo: "Escuelas de esquí: contacto directo",
                desc: "Si tienes certificación (Swiss Snow, BASI, CASI), contacta directamente con las Schweizer Schneesportschulen de cada estación. La demanda de instructores de habla española/inglesa es alta.",
              },
              {
                n: "05",
                titulo: "Redes de hispanohablantes",
                desc: "Grupos de Facebook 'Hispanos en Suiza', 'Trabajando en Verbier/Crans' y grupos de WhatsApp específicos por estación. Son muy activos en octubre-noviembre con ofertas directas de empleadores.",
              },
            ].map(({ n, titulo, desc }) => (
              <div key={n} className="flex gap-4 bg-white rounded-2xl p-5 border border-gray-100">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white"
                  style={{ background: ACCENT }}
                >
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

        {/* ── Incluido / No incluido ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Qué suele incluir el contrato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <h3 className="font-bold text-green-800 mb-3">✅ Suele incluir</h3>
              <ul className="space-y-2 text-sm text-green-700">
                {[
                  "Alojamiento compartido para el personal (incluido o muy reducido)",
                  "Transporte local dentro del área de la estación",
                  "Forfait (pase de esquí) parcial o completo",
                  "Comidas durante el turno (desayuno/almuerzo en muchos hoteles)",
                  "Uniformes o ropa de trabajo",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <h3 className="font-bold text-red-800 mb-3">⚠️ No siempre incluye</h3>
              <ul className="space-y-2 text-sm text-red-700">
                {[
                  "Seguro médico LAMal (obligatorio — a veces el empleador ayuda a gestionarlo)",
                  "Transporte internacional hasta la estación",
                  "Ropa de abrigo personal (las estaciones son frías)",
                  "Teléfono móvil suizo",
                  "Seguro de responsabilidad civil (Haftpflicht)",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-red-500 font-bold flex-shrink-0">!</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
            <strong>Sobre el seguro médico:</strong> Es obligatorio desde los primeros 3 meses de residencia.
            Muchos empleadores de hostelería ayudan a gestionar la contratación de LAMal para el personal
            extranjero. Pregúntalo antes de firmar.{" "}
            <Link href="/herramientas/seguros-medicos" className="font-semibold text-red-700 hover:underline">
              Ver guía de seguros médicos →
            </Link>
          </div>
        </section>

        {/* ── Grid de estaciones ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Las 8 estaciones con más trabajo para hispanohablantes</h2>
          <p className="text-gray-500 text-sm mb-6">
            Ordenadas por nivel de comunidad hispanohablante y facilidad de acceso para recién llegados.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ESTACIONES.map((e) => {
              const badge = HISPANOS_BADGE[e.nivelHispanos];
              return (
                <div key={e.nombre} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm hover:border-red-100 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-black text-gray-900 text-lg">{e.nombre}</h3>
                      <p className="text-sm text-gray-400">Cantón {e.canton} · {e.pistasKm} de pistas</p>
                    </div>
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ml-2"
                      style={{ background: badge.bg, color: badge.color }}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{e.descripcion}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <span className="text-gray-400">Salario aprox.</span>
                      <p className="font-bold text-gray-800 mt-0.5">{e.salarioAproximado}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <span className="text-gray-400">Idioma principal</span>
                      <p className="font-bold text-gray-800 mt-0.5">{e.idiomaPrincipal}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {e.puestosHabituales.map((p) => (
                      <span key={p} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {p}
                      </span>
                    ))}
                  </div>
                  <a
                    href={e.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-xs font-semibold text-red-700 hover:underline"
                  >
                    Web oficial →
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "¿Necesito hablar alemán para trabajar en ski?",
                a: "Depende de la estación. En Verbier o Crans-Montana se trabaja principalmente en inglés o francés. En Zermatt o Davos el alemán ayuda pero muchos empleadores contratan con inglés básico para hostelería. Las estaciones francófonas (Crans-Montana, Leysin) son más accesibles para hispanohablantes.",
              },
              {
                q: "¿Cuándo empezar a buscar?",
                a: "Lo ideal es aplicar entre octubre y noviembre para empezar en diciembre. Las mejores posiciones se cubren rápido. Para temporada de verano (julio-septiembre), busca desde marzo-abril. Las estaciones de alta altitud como Saas-Fee abren ya en octubre.",
              },
              {
                q: "¿El alojamiento está incluido?",
                a: "La mayoría de estaciones grandes ofrecen alojamiento para el personal, bien incluido o a precio muy reducido (100–400 CHF/mes). Siempre pregunta antes de firmar. El alojamiento suele ser compartido en residencia o piso del staff.",
              },
              {
                q: "¿Es posible trabajar solo parte de la temporada?",
                a: "Los contratos más comunes son de temporada completa (diciembre-abril). Algunos empleadores aceptan contratos parciales de 2-3 meses para el pico. Los trabajos de instructor de esquí o ski patrol suelen requerir compromiso de temporada completa.",
              },
              {
                q: "¿Cómo es el ambiente para hispanohablantes?",
                a: "Varía por estación. Verbier, Crans-Montana y Leysin tienen comunidades latinas bien establecidas. En estaciones más pequeñas la comunidad es menor pero el ambiente internacional facilita la integración. Muchos empiezan como temporeros y llevan años establecidos.",
              },
              {
                q: "¿Los latinoamericanos no-UE pueden trabajar en estaciones de esquí?",
                a: "Sí. El trabajo estacional entra en el contingente anual. La clave es que el empleador solicita el permiso por ti. Por eso es más fácil a través de un hotel grande con experiencia contratando extranjeros.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA final ── */}
        <section className="mb-10">
          <div className="rounded-2xl p-7 text-center border-2" style={{ borderColor: ACCENT, background: "#FFF5F5" }}>
            <h2 className="text-xl font-black text-gray-900 mb-2">
              ¿Listo para buscar trabajo en las estaciones?
            </h2>
            <p className="text-gray-500 text-sm mb-6 max-w-lg mx-auto">
              Usa nuestro buscador de empleo en Suiza o calcula cuánto te quedaría neto con el salario
              de la estación que te interesa.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/trabajo/buscador"
                className="inline-block px-7 py-3 rounded-full text-white font-bold text-sm hover:opacity-90 transition-opacity"
                style={{ background: ACCENT }}
              >
                Buscar ofertas de trabajo →
              </Link>
              <Link
                href="/herramientas/salario-neto"
                className="inline-block px-7 py-3 rounded-full font-bold text-sm border border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-700 transition-colors"
              >
                Calcular salario neto →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Links relacionados ── */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">También te puede interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/trabajo/unia",                    label: "⚖️ Sindicato UNIA — derechos laborales" },
              { href: "/herramientas/seguros-medicos",    label: "🏥 Guía del seguro médico LAMal" },
              { href: "/herramientas/comparador-ciudades", label: "🏙️ Comparador de ciudades suizas" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 bg-white rounded-xl p-4 border border-gray-100 text-sm font-semibold text-gray-700 hover:text-red-700 hover:border-red-100 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
