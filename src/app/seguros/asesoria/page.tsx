import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, BASE_URL, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Asesor de seguros en español en Suiza | Consulta gratuita con José",
  description: "Habla con José, asesor español experto en seguros médicos suizos. Videollamada gratuita de 45 minutos donde te explica todo, resuelve tus dudas y puedes contratar tu seguro LAMal/KVG.",
  path: "/seguros/asesoria",
  ogImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "asesor seguros suiza español",
    "consulta seguro medico suiza",
    "ayuda seguro suiza hispanohablante",
    "seguro medico suiza en español",
    "asesor lamal kvg español",
    "comparar seguros suiza español",
    "experto seguros suiza",
    "consulta gratuita seguro suiza",
    "jose seguros suiza",
    "asesoria seguros expatriados suiza",
  ],
});

const schemas = [
  breadcrumbSchema([
    { name: "Inicio", url: BASE_URL },
    { name: "Seguros", url: `${BASE_URL}/seguros` },
    { name: "Asesoría gratuita", url: `${BASE_URL}/seguros/asesoria` },
  ]),
  faqSchema([
    {
      pregunta: "¿La consulta con José es realmente gratuita?",
      respuesta: "Sí, la consulta de 40-45 minutos por videollamada es completamente gratuita. José te explica todo con calma, resuelve todas tus dudas y, si llegáis a un acuerdo, puedes contratar el seguro directamente con él.",
    },
    {
      pregunta: "¿Qué puedo preguntar en la consulta?",
      respuesta: "Puedes preguntar sobre qué aseguradora elegir, qué franquicia te conviene según tu situación, cómo funciona el sistema LAMal/KVG, si necesitas seguro complementario, cómo cambiar de aseguradora, y cualquier duda sobre el seguro médico en Suiza.",
    },
    {
      pregunta: "¿Puedo contratar el seguro con José?",
      respuesta: "Sí. Si después de la explicación decides contratar, José puede gestionar la contratación directamente durante la llamada o ayudarte con los trámites. Todo en español y sin complicaciones.",
    },
    {
      pregunta: "¿Cómo reservo la cita?",
      respuesta: "Haz clic en el botón de reservar cita y elige un horario disponible en el calendario de Google. Recibirás un enlace de videollamada por email. Es muy sencillo.",
    },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Asesoría gratuita de seguros médicos en Suiza",
    description: "Consulta gratuita de 45 minutos con José, asesor español experto en seguros médicos suizos LAMal/KVG. Explicación completa y posibilidad de contratar directamente.",
    provider: {
      "@type": "Person",
      name: "José",
      description: "Asesor español experto en seguros médicos suizos",
    },
    serviceType: "Asesoría de seguros",
    areaServed: {
      "@type": "Country",
      name: "Suiza",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Hispanohablantes en Suiza",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CHF",
      description: "Consulta gratuita de 45 minutos con posibilidad de contratación",
    },
    url: `${BASE_URL}/seguros/asesoria`,
  },
];

const VENTAJAS = [
  {
    icono: "🇪🇸",
    titulo: "100% en español",
    descripcion: "Sin barreras de idioma. José te explica todo en tu lengua, con paciencia y claridad.",
  },
  {
    icono: "⏱️",
    titulo: "45 minutos completos",
    descripcion: "Tiempo suficiente para explicarte todo bien, resolver todas tus dudas y no quedarte con ninguna pregunta.",
  },
  {
    icono: "💰",
    titulo: "Te ayuda a ahorrar",
    descripcion: "Elegir bien la franquicia y el modelo puede ahorrarte cientos de francos al año.",
  },
  {
    icono: "✍️",
    titulo: "Contrata directamente",
    descripcion: "Si llegáis a un acuerdo, puedes contratar el seguro en la misma llamada. Sin papeleo extra.",
  },
  {
    icono: "🆓",
    titulo: "Totalmente gratis",
    descripcion: "La consulta es gratuita y sin compromiso. Nada que perder, mucho que ganar.",
  },
  {
    icono: "🏔️",
    titulo: "Vive en Suiza",
    descripcion: "José conoce el sistema de primera mano. Sabe lo que es llegar nuevo y no entender nada.",
  },
];

const TEMAS = [
  "Qué aseguradora elegir según tu cantón",
  "Qué franquicia te conviene (300, 500, 1000, 2500...)",
  "Diferencia entre modelo estándar, HMO y Telmed",
  "Si necesitas seguro complementario o no",
  "Cómo cambiar de aseguradora si ya tienes una",
  "Cómo solicitar la reducción de prima (Prämienverbilligung)",
  "Qué hacer si llegas nuevo y no tienes número AHV aún",
  "Dudas sobre cobertura, accidentes, maternidad...",
];

export default function AsesoriaPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <nav className="text-sm text-green-200 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span>›</span>
            <Link href="/seguros" className="hover:text-white">Seguros</Link>
            <span>›</span>
            <span className="text-white">Asesoría gratuita</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                Consulta gratuita · Sin compromiso
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
                ¿Dudas con el seguro médico en Suiza?
              </h1>
              <p className="text-lg text-green-100 mb-6 max-w-xl">
                Habla con <strong>José</strong>, asesor español que vive en Suiza y te explica todo
                en tu idioma. <strong>45 minutos de videollamada gratis</strong> donde resuelves todas tus dudas
                y puedes contratar tu seguro directamente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="https://calendar.app.google/pZrPbwRThpDsRW3z5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-green-700 font-bold px-8 py-4 rounded-full text-lg hover:bg-green-50 transition-colors shadow-xl"
                >
                  <span>📅</span>
                  <span>Reservar cita gratuita</span>
                </a>
                <Link
                  href="/seguros"
                  className="inline-flex items-center justify-center gap-2 bg-green-700/50 text-white font-semibold px-6 py-4 rounded-full hover:bg-green-700 transition-colors"
                >
                  Ver calculadora de primas
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30 shadow-2xl">
                <div className="text-center">
                  <div className="text-6xl mb-2">🧑‍💼</div>
                  <div className="text-white font-bold text-xl">José</div>
                  <div className="text-green-200 text-sm">Asesor en español</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { valor: "Gratis", label: "Consulta completa" },
              { valor: "45 min", label: "Videollamada" },
              { valor: "100%", label: "En español" },
              { valor: "Directo", label: "Contrata en la llamada" },
            ].map(({ valor, label }) => (
              <div key={label}>
                <div className="text-2xl md:text-3xl font-black text-green-700">{valor}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Por qué hablar con José */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">¿Por qué hablar con José?</h2>
          <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
            Elegir el seguro médico en Suiza puede ser confuso. José te ahorra horas de investigación
            y te ayuda a tomar la mejor decisión para tu situación.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VENTAJAS.map((v) => (
              <div key={v.titulo} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{v.icono}</div>
                <h3 className="font-bold text-gray-900 mb-1">{v.titulo}</h3>
                <p className="text-sm text-gray-600">{v.descripcion}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Qué puedes preguntar */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">¿Qué puedes preguntarle?</h2>
          <p className="text-gray-500 text-center mb-8">
            En 45 minutos José te explica todo y resuelve dudas como estas:
          </p>
          <div className="bg-green-50 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TEMAS.map((tema) => (
                <div key={tema} className="flex items-start gap-3">
                  <span className="text-green-600 text-lg flex-shrink-0">✓</span>
                  <span className="text-gray-700">{tema}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Cómo funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "1",
                titulo: "Reserva tu cita",
                descripcion: "Elige un horario disponible en el calendario. Solo te lleva 30 segundos.",
                icono: "📅",
              },
              {
                n: "2",
                titulo: "Recibe el enlace",
                descripcion: "Te llega un email con el enlace de Google Meet para la videollamada.",
                icono: "📧",
              },
              {
                n: "3",
                titulo: "Habla con José",
                descripcion: "45 minutos donde te lo explica todo, resuelves dudas y puedes contratar.",
                icono: "💬",
              },
            ].map((paso) => (
              <div key={paso.n} className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl mx-auto mb-4">
                  {paso.icono}
                </div>
                <div className="w-8 h-8 rounded-full bg-green-600 text-white font-bold flex items-center justify-center mx-auto -mt-6 mb-3 text-sm border-2 border-white">
                  {paso.n}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{paso.titulo}</h3>
                <p className="text-sm text-gray-600">{paso.descripcion}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA grande */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">¿Listo para resolver tus dudas?</h2>
            <p className="text-green-100 mb-6 max-w-xl mx-auto">
              Reserva tu cita gratuita ahora. Sin compromiso, sin coste, sin letra pequeña.
            </p>
            <a
              href="https://calendar.app.google/pZrPbwRThpDsRW3z5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-700 font-bold px-10 py-4 rounded-full text-lg hover:bg-green-50 transition-colors shadow-xl"
            >
              <span>📅</span>
              <span>Reservar cita con José</span>
            </a>
            <p className="text-green-200 text-sm mt-4">
              ✓ Gratuito · ✓ 45 minutos · ✓ Por videollamada · ✓ Puedes contratar directamente
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Preguntas frecuentes</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                q: "¿La consulta es realmente gratuita?",
                a: "Sí, la consulta de 45 minutos es completamente gratuita. José te explica todo con calma y sin presiones. Si decides contratar, lo hacéis en la misma llamada.",
              },
              {
                q: "¿Puedo contratar el seguro con José?",
                a: "Sí. José te asesora y, si llegáis a un acuerdo sobre qué seguro te conviene, puedes contratarlo directamente durante la videollamada. Todo en español y sin complicaciones.",
              },
              {
                q: "¿Y si no quiero contratar en la llamada?",
                a: "Sin problema. La consulta es sin compromiso. José te da toda la información y tú decides cuándo y cómo contratar. No hay ninguna presión.",
              },
              {
                q: "¿Puedo hablar con José si ya tengo seguro?",
                a: "Por supuesto. Muchas personas quieren saber si están pagando de más o si les conviene cambiar de aseguradora o franquicia. José te puede orientar y ayudarte a cambiar si quieres.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{q}</h3>
                <p className="text-sm text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Links relacionados */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Herramientas relacionadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/seguros", label: "🧮 Calculadora de primas" },
              { href: "/herramientas/seguros-medicos", label: "📚 Guía completa del seguro médico" },
              { href: "/herramientas/salario-neto", label: "💰 Calculadora de salario neto" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 bg-white rounded-xl p-4 border border-gray-100 text-sm font-semibold text-gray-700 hover:text-green-700 hover:border-green-100 transition-colors"
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
