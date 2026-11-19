import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Servicios Premium — Emigra a Suiza con Acompañamiento Profesional",
  description: "Servicios exclusivos para hispanohablantes que emigran a Suiza: Template Notion, Swiss Pack eBook, y Suiza Starter Pack con alojamiento y acompañamiento completo. Desde CHF 29 hasta servicio VIP completo.",
  path: "/premium",
  keywords: [
    "servicios premium suiza",
    "emigrar suiza con ayuda",
    "relocation suiza",
    "guia emigrar suiza",
    "template emigracion suiza",
    "servicio vip suiza",
    "acompañamiento mudanza suiza",
  ],
});

const SERVICIOS = [
  {
    id: "template",
    nombre: "Template Notion",
    subtitulo: "Organizate desde el día 1",
    descripcion: "Sistema completo en Notion con 50 pasos, tracker de gastos, 30 documentos rastreados y 50+ contactos verificados.",
    precio: "29 CHF",
    precioOriginal: null,
    badge: "Más Popular",
    badgeColor: "bg-blue-600",
    destacados: [
      "✅ Checklist 50 pasos organizada por prioridad",
      "📄 30 documentos importantes rastreados",
      "👥 50+ contactos verificados 2026",
      "💰 Tracker de gastos y presupuestos",
      "📚 10 guías paso a paso incluidas",
      "⚡ Acceso inmediato después del pago",
    ],
    testimonial: {
      texto: "No me perdí ningún deadline crítico. El registro en la comuna lo hice a tiempo y evité la multa.",
      autor: "María G.",
      origen: "Valencia → Zürich",
    },
    cta: "Ver Template",
    link: "/productos/template-emigrar-suiza",
    color: "from-red-600 to-red-700",
  },
  {
    id: "ebook",
    nombre: "Swiss Starter Pack",
    subtitulo: "Guía completa para trabajar",
    descripcion: "eBook 70+ páginas con guías paso a paso, plantillas profesionales en alemán, calculadora de salarios y directorio completo de recursos.",
    precio: "67 CHF",
    precioOriginal: null,
    badge: "Best Value",
    badgeColor: "bg-purple-600",
    destacados: [
      "📚 eBook 70+ páginas en español",
      "📝 Plantillas CV + carta motivación (alemán)",
      "💶 Calculadora salarios y negociación",
      "🏥 Comparativa seguros médicos",
      "🏦 Guía cuenta bancaria paso a paso",
      "🎯 Directorio 100+ recursos verificados",
    ],
    testimonial: {
      texto: "Las plantillas en alemán fueron clave. Conseguí 3 entrevistas en 2 semanas después de usarlas.",
      autor: "Carlos R.",
      origen: "IT Developer → Luzern",
    },
    cta: "Ver eBook",
    link: "/productos/swiss-starter-pack",
    color: "from-purple-600 to-purple-700",
  },
  {
    id: "relocation",
    nombre: "Suiza Starter Pack",
    subtitulo: "Servicio VIP Completo",
    descripcion: "Llega a Suiza con todo resuelto: alojamiento 30 días, te acompaño personalmente a las ETT, kit llegada completo y soporte 24/7 primer mes.",
    precio: "2.890 CHF",
    precioOriginal: "4.500 CHF",
    badge: "VIP",
    badgeColor: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    destacados: [
      "🏠 Alojamiento garantizado 30 días (Luzern)",
      "🤝 Te acompaño PERSONALMENTE a 3 ETT principales",
      "📋 Kit llegada: registro, banco, transporte, móvil",
      "📄 CV profesional formato suizo (alemán + francés)",
      "💬 Grupo WhatsApp 24/7 soporte primer mes",
      "👥 Comunidad exclusiva HispanosEnSuiza Premium",
    ],
    testimonial: {
      texto: "Oferta lanzamiento: Las primeras 2 personas obtienen 600 CHF descuento → solo 2.290 CHF",
      autor: "Solo 2 plazas/mes",
      origen: "Servicio premium personalizado",
    },
    cta: "Solicitar Plaza",
    link: "/starter-pack-vip",
    color: "from-blue-600 to-blue-700",
  },
];

export default function ServiciosPremiumPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="text-2xl">⭐</span>
            <span className="text-sm font-semibold">Servicios Exclusivos</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Emigra a Suiza con
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
              Acompañamiento Profesional
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Desde herramientas de organización hasta servicio VIP completo con alojamiento y acompañamiento personal.
            Elige el nivel de apoyo que necesitas.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>142K+ usuarios confían en nosotros</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Actualizado 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>En español</span>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICIOS.map((servicio, idx) => (
            <div
              key={servicio.id}
              className={`relative flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${
                servicio.id === "relocation" ? "border-blue-500 lg:scale-105" : "border-slate-200"
              } transition-transform hover:scale-105`}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`inline-block ${servicio.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                  {servicio.badge}
                </span>
              </div>

              {/* Header */}
              <div className={`bg-gradient-to-r ${servicio.color} text-white p-8 pb-12`}>
                <h2 className="text-2xl font-bold mb-2">{servicio.nombre}</h2>
                <p className="text-sm opacity-90">{servicio.subtitulo}</p>
              </div>

              {/* Precio */}
              <div className="bg-slate-50 px-8 py-6 border-b border-slate-200">
                <div className="flex items-baseline gap-2">
                  {servicio.precioOriginal && (
                    <span className="text-lg text-slate-400 line-through">{servicio.precioOriginal}</span>
                  )}
                  <span className="text-4xl font-bold text-slate-900">{servicio.precio}</span>
                </div>
                {servicio.precioOriginal && (
                  <p className="text-sm text-green-600 font-medium mt-1">
                    Ahorra {parseInt(servicio.precioOriginal) - parseInt(servicio.precio)} CHF
                  </p>
                )}
                {servicio.id === "template" && (
                  <p className="text-sm text-slate-600 mt-1">Pago único</p>
                )}
                {servicio.id === "ebook" && (
                  <p className="text-sm text-slate-600 mt-1">Pago único</p>
                )}
                {servicio.id === "relocation" && (
                  <p className="text-sm text-slate-600 mt-1">500 CHF señal + 2.390 CHF pre-llegada</p>
                )}
              </div>

              {/* Descripción */}
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-slate-600 mb-6">{servicio.descripcion}</p>

                {/* Destacados */}
                <div className="space-y-3 mb-6">
                  {servicio.destacados.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-lg flex-shrink-0">{item.split(" ")[0]}</span>
                      <span className="text-sm text-slate-700">{item.split(" ").slice(1).join(" ")}</span>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="bg-slate-50 rounded-lg p-4 mb-6 border-l-4 border-slate-300">
                  <p className="text-sm text-slate-700 italic mb-2">"{servicio.testimonial.texto}"</p>
                  <p className="text-xs text-slate-600 font-medium">
                    — {servicio.testimonial.autor}
                    <br />
                    <span className="text-slate-500">{servicio.testimonial.origen}</span>
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={servicio.link}
                  className={`mt-auto block text-center bg-gradient-to-r ${servicio.color} text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105`}
                >
                  {servicio.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparación */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">¿Cuál servicio necesitas?</h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Cada servicio está diseñado para un momento diferente de tu viaje a Suiza
          </p>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Característica</th>
                  <th className="px-6 py-4 text-center">Template</th>
                  <th className="px-6 py-4 text-center">eBook</th>
                  <th className="px-6 py-4 text-center bg-blue-600">VIP Pack</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-6 py-4 font-medium">Mejor para</td>
                  <td className="px-6 py-4 text-center text-sm">Organizarte</td>
                  <td className="px-6 py-4 text-center text-sm">Buscar trabajo</td>
                  <td className="px-6 py-4 text-center text-sm bg-blue-50">Llegar sin estrés</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Alojamiento incluido</td>
                  <td className="px-6 py-4 text-center">—</td>
                  <td className="px-6 py-4 text-center">—</td>
                  <td className="px-6 py-4 text-center bg-blue-50">✅ 30 días</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Acompañamiento personal</td>
                  <td className="px-6 py-4 text-center">—</td>
                  <td className="px-6 py-4 text-center">—</td>
                  <td className="px-6 py-4 text-center bg-blue-50">✅ Presencial</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Guías y checklists</td>
                  <td className="px-6 py-4 text-center">✅</td>
                  <td className="px-6 py-4 text-center">✅</td>
                  <td className="px-6 py-4 text-center bg-blue-50">✅</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Plantillas profesionales</td>
                  <td className="px-6 py-4 text-center">—</td>
                  <td className="px-6 py-4 text-center">✅</td>
                  <td className="px-6 py-4 text-center bg-blue-50">✅</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Soporte 24/7</td>
                  <td className="px-6 py-4 text-center">—</td>
                  <td className="px-6 py-4 text-center">—</td>
                  <td className="px-6 py-4 text-center bg-blue-50">✅ 1 mes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Inversión</td>
                  <td className="px-6 py-4 text-center font-bold">29 CHF</td>
                  <td className="px-6 py-4 text-center font-bold">67 CHF</td>
                  <td className="px-6 py-4 text-center font-bold bg-blue-50">2.890 CHF</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿No estás seguro cuál elegir?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Todos nuestros servicios tienen garantía de satisfacción. Si no estás contento, te devolvemos tu dinero.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/suiza-starter-pack"
              className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Ver Servicio VIP
            </Link>
            <a
              href="mailto:contacto@hispanosensuiza.com"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
