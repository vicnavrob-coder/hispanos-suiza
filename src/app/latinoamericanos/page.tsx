import type { Metadata } from "next";
import Link from "next/link";
import { paises } from "@/lib/latinoamericanos";
import { BASE_URL, buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Emigrar a Suiza desde Latinoamérica: guía completa 2026",
  description:
    "Todo lo que necesitas saber para emigrar a Suiza desde Colombia, México, Venezuela, Argentina, Perú o Ecuador. Sistema de cuotas, permisos de trabajo, plazos y requisitos reales.",
  path: "/latinoamericanos",
  keywords: [
    "emigrar a suiza desde latinoamerica",
    "latinoamericanos en suiza",
    "permiso trabajo suiza no UE",
    "visa suiza latinoamerica",
    "contingente suiza latinoamerica",
    "trabajar suiza hispanoamerica 2026",
    "proceso emigrar suiza",
  ],
});

const faqsGenerales = [
  {
    pregunta: "¿Pueden los latinoamericanos trabajar libremente en Suiza?",
    respuesta:
      "No. Suiza no es miembro de la UE y aplica un sistema de contingentes anuales para ciudadanos de países terceros (no-UE/AELC). Cada año se asigna un número limitado de nuevos permisos de trabajo por cantón. Sin una empresa suiza que patrocine la solicitud, no es posible obtener el permiso.",
  },
  {
    pregunta: "¿Qué es exactamente el sistema de contingentes suizo?",
    respuesta:
      "El Gobierno suizo fija anualmente un número máximo de nuevos permisos de trabajo para ciudadanos de países terceros (no-UE), distribuidos entre los cantones. Cuando un cantón agota su cuota anual, no puede emitir más permisos hasta enero del año siguiente. Esto significa que incluso con oferta de trabajo en mano, el proceso puede bloquearse por falta de cuota.",
  },
  {
    pregunta: "¿Cuánto tiempo tarda todo el proceso de emigrar a Suiza?",
    respuesta:
      "El proceso completo —desde que una empresa suiza inicia la solicitud hasta que llegas a Suiza— dura habitualmente entre 4 y 9 meses. El cuello de botella principal es la aprobación cantonal (que depende de la disponibilidad de cuota) y el visado consular.",
  },
  {
    pregunta: "¿Puedo ir a Suiza de turista y buscar trabajo allí?",
    respuesta:
      "No es el camino recomendado. Los latinoamericanos pueden entrar a la zona Schengen con visado de turista (90 días en 180), pero trabajar con visado turista es ilegal en Suiza y puede resultar en expulsión. El permiso de trabajo debe gestionarse desde el país de origen, antes de entrar.",
  },
  {
    pregunta: "¿Qué idioma necesito para trabajar en Suiza?",
    respuesta:
      "Depende del sector y el cantón. En hostelería de lujo y organismos internacionales, el inglés es frecuentemente suficiente. Pero para integrarse plenamente y tener más opciones laborales, aprender el idioma local es esencial: alemán (65% del territorio), francés (20%) o italiano (8%). Los cantones francófonos son más accesibles lingüísticamente para latinoamericanos.",
  },
];

const profesionesDestacadas = [
  { icon: "👨‍🍳", nombre: "Cocina y hostelería", detalle: "Chefs, pasteleros, camareros. Demanda constante en hoteles de lujo y zonas turísticas alpinas." },
  { icon: "💻", nombre: "Tecnología", detalle: "Desarrolladores senior, data scientists, ingenieros de software. Zúrich es hub tech europeo." },
  { icon: "🏗️", nombre: "Construcción", detalle: "Técnicos especializados (yesistas, fontaneros, electricistas). Sueldos altos por convenio colectivo." },
  { icon: "🏥", nombre: "Sanidad y cuidados", detalle: "Auxiliares de enfermería y cuidadores de mayores. Escasez crónica en todo el territorio suizo." },
  { icon: "🏦", nombre: "Finanzas y consultoría", detalle: "Auditores, analistas financieros, consultores. Zúrich, Ginebra, Zug y Basilea." },
  { icon: "🌍", nombre: "Organismos internacionales", detalle: "ONU, OMS, OMC, CICR. Ginebra es la capital del multilateralismo. Perfil diplomático y técnico." },
];

const pasosCuotas = [
  {
    numero: 1,
    titulo: "Empresa suiza te ofrece trabajo",
    descripcion: "Sin oferta de trabajo de una empresa suiza registrada, el proceso no puede comenzar. La empresa debe estar dispuesta a patrocinar el permiso.",
  },
  {
    numero: 2,
    titulo: "Empresa solicita el permiso al cantón",
    descripcion: "La empresa presenta la solicitud a la autoridad cantonal de trabajo, justificando que no encontró candidato adecuado en Suiza ni en la UE.",
  },
  {
    numero: 3,
    titulo: "Cantón revisa disponibilidad de cuota",
    descripcion: "El cantón verifica que tiene cuota disponible dentro del contingente anual asignado por la Confederación. Si está agotado, hay que esperar.",
  },
  {
    numero: 4,
    titulo: "Aprobación federal (SEM)",
    descripcion: "La Secretaría de Estado de Migraciones da la autorización definitiva a nivel federal. Con esto en mano, el proceso consular puede comenzar.",
  },
  {
    numero: 5,
    titulo: "Visado en la embajada suiza",
    descripcion: "Con la autorización del SEM, solicitas el visado de larga duración (tipo D) en la embajada o consulado de Suiza de tu país.",
  },
  {
    numero: 6,
    titulo: "Llegada y registro en Suiza",
    descripcion: "Al llegar, tienes 14 días para registrarte en tu municipio. Recibes el permiso físico y puedes empezar a trabajar.",
  },
];

const schemas = [
  breadcrumbSchema([
    { name: "Inicio", url: BASE_URL },
    { name: "Latinoamericanos", url: `${BASE_URL}/latinoamericanos` },
  ]),
  faqSchema(faqsGenerales),
];

export default function LatinoamericanosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        <span aria-hidden>›</span>
        <span className="text-gray-600">Latinoamericanos</span>
      </nav>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-10 bg-gradient-to-br from-[#0A0A0A] to-gray-900 p-8 md:p-12 border border-gray-800">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#C8102E]/10 border border-[#C8102E]/30 rounded-full px-3 py-1 mb-4">
            <span className="text-[#C8102E] text-xs font-semibold uppercase tracking-wider">Guía 2026</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            Emigrar a Suiza desde<br />
            <span className="text-[#C8102E]">Latinoamérica</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Guía completa sobre el proceso real para ciudadanos de Colombia, México, Venezuela, Argentina, Perú y Ecuador. Sistema de cuotas, permisos, plazos y qué necesitas realmente.
          </p>
        </div>
        <div className="absolute top-0 right-0 text-[150px] opacity-5 leading-none select-none" aria-hidden>🌎</div>
      </div>

      {/* Alerta sistema de cuotas */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
        <div className="flex gap-3">
          <span className="text-xl flex-shrink-0">⚠️</span>
          <div>
            <p className="font-bold text-gray-800 text-sm mb-1">Lo más importante que debes saber antes de empezar</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Suiza no es miembro de la UE. Los latinoamericanos están clasificados como ciudadanos de «terceros países» y deben obtener un permiso de trabajo dentro de un contingente anual limitado. <strong>Sin una empresa suiza dispuesta a solicitar el permiso en tu nombre, el proceso no puede comenzar.</strong> El primer paso siempre es conseguir una oferta de trabajo.
            </p>
          </div>
        </div>
      </div>

      {/* Grid de países */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Guías por país de origen</h2>
        <p className="text-gray-500 text-sm mb-6">Selecciona tu país para ver el proceso detallado, plazos, cantones más abiertos y profesiones con más demanda.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paises.map((pais) => (
            <Link
              key={pais.slug}
              href={`/latinoamericanos/${pais.slug}`}
              className="group bg-white border border-gray-100 hover:border-[#C8102E]/40 rounded-2xl p-5 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-4xl">{pais.emoji}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pais.nivelDificultad === "muy-alto" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                  Dificultad: {pais.nivelDificultad === "muy-alto" ? "Muy alta" : "Alta"}
                </span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-[#C8102E] transition-colors">
                {pais.nombre}
              </h3>
              <p className="text-gray-500 text-xs mb-3">{pais.poblacionEnSuiza} en Suiza</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{pais.descripcion}</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-400 mb-0.5">Plazo estimado</div>
                  <div className="text-xs font-semibold text-gray-700">{pais.plazosEstimados}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-400 mb-0.5">Permiso</div>
                  <div className="text-xs font-semibold text-gray-700 truncate">{pais.permisoPrincipal.split("(")[0].trim()}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#C8102E] text-sm font-semibold">
                Ver guía completa
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Cómo funciona el sistema de cuotas */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Cómo funciona el sistema de cuotas suizo</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-2xl">
          El mayor malentendido que tienen los latinoamericanos al planificar emigrar a Suiza es creer que pueden ir a buscar trabajo allí como turistas. Así funciona realmente el sistema.
        </p>
        <div className="space-y-4">
          {pasosCuotas.map((paso) => (
            <div key={paso.numero} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C8102E] text-white text-sm font-bold flex items-center justify-center">
                {paso.numero}
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1">
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{paso.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{paso.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-[#0A0A0A] rounded-xl p-5 text-white">
          <p className="text-sm leading-relaxed text-gray-300">
            <span className="text-white font-semibold">Dato clave sobre el contingente:</span> En 2025, Suiza asignó aproximadamente 8.500 nuevos permisos B anuales para ciudadanos no-UE en todo el territorio. Los cantones de Zúrich, Vaud, Ginebra y Aargau concentran históricamente la mayor parte de la cuota disponible. Los cantones pequeños pueden agotar su cuota en los primeros meses del año.
          </p>
        </div>
      </section>

      {/* Profesiones más demandadas */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Profesiones más demandadas para latinoamericanos</h2>
        <p className="text-gray-500 text-sm mb-6 max-w-2xl">
          Estos son los sectores donde la demanda de trabajo no cubre la oferta del mercado local, lo que aumenta las posibilidades de que una empresa justifique contratar fuera de la UE.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profesionesDestacadas.map((prof) => (
            <div key={prof.nombre} className="bg-white border border-gray-100 rounded-xl p-4 flex gap-3">
              <span className="text-2xl flex-shrink-0">{prof.icon}</span>
              <div>
                <div className="font-semibold text-gray-800 text-sm mb-1">{prof.nombre}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{prof.detalle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats clave */}
      <section className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { valor: "~93.000", label: "Latinoamericanos residentes en Suiza" },
            { valor: "8.500", label: "Permisos B nuevos al año (no-UE aprox.)" },
            { valor: "4–9 meses", label: "Duración media del proceso completo" },
            { valor: "5 años", label: "Para obtener permiso C (residencia permanente)" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[#C8102E] mb-1">{stat.valor}</div>
              <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTAs herramientas */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Herramientas útiles para planificar tu emigración</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/herramientas/salario-neto"
            className="flex items-center gap-3 bg-white border border-gray-200 hover:border-[#C8102E]/40 rounded-xl p-4 transition-colors group"
          >
            <span className="text-2xl">🧮</span>
            <div>
              <div className="font-semibold text-gray-800 text-sm group-hover:text-[#C8102E]">Calculadora de salario neto</div>
              <div className="text-xs text-gray-500">Calcula cuánto cobrarías realmente en Suiza descontando impuestos y cotizaciones</div>
            </div>
          </Link>
          <Link
            href="/trabajo/buscador"
            className="flex items-center gap-3 bg-white border border-gray-200 hover:border-[#C8102E]/40 rounded-xl p-4 transition-colors group"
          >
            <span className="text-2xl">🔍</span>
            <div>
              <div className="font-semibold text-gray-800 text-sm group-hover:text-[#C8102E]">Buscador de trabajo en Suiza</div>
              <div className="text-xs text-gray-500">Ofertas de empleo actualizadas en todos los cantones y sectores</div>
            </div>
          </Link>
        </div>
      </section>

      {/* FAQs generales */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas frecuentes sobre emigrar a Suiza desde Latinoamérica</h2>
        <div className="space-y-4">
          {faqsGenerales.map((faq, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-800 mb-2">{faq.pregunta}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.respuesta}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
