import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata, productSchema, faqSchema } from "@/lib/seo";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";

export const metadata: Metadata = buildMetadata({
  title: "Template Notion: Checklist Completa Emigrar a Suiza",
  description: "Sistema completo con 50 pasos, guías paso a paso, tracker de gastos y contactos útiles. Todo lo que necesitas para emigrar a Suiza de forma organizada. Ahorra CHF 15'000-20'000 el primer año.",
  path: "/productos/template-emigrar-suiza",
  keywords: [
    "template emigrar suiza", "checklist suiza", "notion emigracion",
    "guia emigrar suiza", "organizador emigracion", "mudanza suiza",
    "template notion suiza", "hispanos en suiza",
  ],
});

const BTN_RED: React.CSSProperties = {
  background: "#C8102E",
  color: "#ffffff",
  fontFamily: "var(--font-dm-sans), system-ui, sans-serif"
};

const HERO_IMG = "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1000&q=90&auto=format&fit=crop";

const TESTIMONIOS = [
  {
    texto: "Llegué a Suiza con este template y no me perdí ningún deadline crítico. El registro en la comuna lo hice a tiempo y evité la multa. Las guías son increíblemente detalladas.",
    nombre: "María G.",
    origen: "Valencia → Zúrich",
    emoji: "🇪🇸",
    ahorro: "CHF 1'000 en multas evitadas",
  },
  {
    texto: "La guía del seguro médico me ahorró literalmente CHF 2'000 al año. Comparé todas las opciones y elegí la franquicia óptima para mi perfil. Ya se pagó solo 100 veces.",
    nombre: "Roberto P.",
    origen: "Buenos Aires → Ginebra",
    emoji: "🇦🇷",
    ahorro: "CHF 2'000/año en seguro",
  },
  {
    texto: "El dosier perfecto de la guía de vivienda funcionó. Envié 15 solicitudes y conseguí 3 visitas. Firmé contrato en Zúrich en solo 2 semanas. Sin esto habría sido imposible.",
    nombre: "Laura M.",
    origen: "Madrid → Basilea",
    emoji: "🇪🇸",
    ahorro: "2 semanas vs 3-6 meses típicos",
  },
];

const MODULOS = [
  {
    icon: "✅",
    titulo: "Checklist 50 Pasos",
    desc: "Todos los pasos organizados por fase, prioridad y deadline. Nunca olvides nada crítico.",
    items: [
      "Antes de partir / Primeros 14 días / 30 días / 90 días",
      "Prioridad: Crítica / Alta / Media / Baja",
      "Estados: Pendiente / En progreso / Completado",
      "Deadlines claros para cada tarea",
    ],
  },
  {
    icon: "📄",
    titulo: "30 Documentos Rastreados",
    desc: "Base de datos con todos los documentos importantes y sus fechas de vencimiento.",
    items: [
      "Oficiales: Pasaporte, permiso B/L/C, DNI",
      "Trabajo: Contrato, AVS, nóminas",
      "Vivienda: Alquiler, depósito, garantías",
      "Seguros: Médico, responsabilidad civil, coche",
    ],
  },
  {
    icon: "👥",
    titulo: "50+ Contactos Verificados",
    desc: "Teléfonos, URLs y horarios actualizados 2026 de todas las oficinas y servicios.",
    items: [
      "Oficinas oficiales: Migración, comunas, consulados",
      "5 seguros médicos con comparativa",
      "Bancos tradicionales + neobanks",
      "Servicios: Transporte, telecoms, vivienda, empleo",
    ],
  },
  {
    icon: "💰",
    titulo: "Tracker Gastos Completo",
    desc: "Sistema de seguimiento financiero con presupuesto y deducciones fiscales.",
    items: [
      "Categorías pre-configuradas",
      "Presupuesto tipo por categoría",
      "Campo 'Deducible impuestos'",
      "Cálculo automático de excedente/déficit",
    ],
  },
];

const GUIAS = [
  {
    num: "01",
    titulo: "Registro en la Comuna (Anmeldung)",
    tag: "CRÍTICO 14 DÍAS",
    tagColor: "#DC2626",
    contenido: "Proceso completo paso a paso por cantón. Documentos exactos. Multas si no lo haces a tiempo.",
    lineas: "229 líneas",
  },
  {
    num: "02",
    titulo: "Elegir Seguro Médico",
    tag: "AHORRA CHF 2'000/AÑO",
    tagColor: "#059669",
    contenido: "Comparativa 5 aseguradoras principales. Franquicias explicadas. Modelos (Médico Familia, HMO, Telemedicina).",
    lineas: "263 líneas",
  },
  {
    num: "03",
    titulo: "Abrir Cuenta Bancaria",
    tag: "NEON VS YUH VS TRADICIONALES",
    tagColor: "#7C3AED",
    contenido: "Proceso 100% online en 10 minutos. TWINT explicado. Cuenta bloqueada para depósito.",
    lineas: "341 líneas",
  },
  {
    num: "04",
    titulo: "Homologar Carnet Conducir",
    tag: "PLAZO 12 MESES",
    tagColor: "#DC2626",
    contenido: "Sin examen si eres de la UE. Costes CHF 70-150. Proceso por cantón. Qué pasa si no homologas.",
    lineas: "229 líneas",
  },
  {
    num: "05",
    titulo: "Buscar Piso",
    tag: "ESTRATEGIA GANAR CANDIDATURA",
    tagColor: "#1D4ED8",
    contenido: "Portales principales. Precios por ciudad. Dosier perfecto en alemán. Email solicitud que funciona.",
    lineas: "309 líneas",
  },
  {
    num: "06",
    titulo: "Impuestos Suiza Básico",
    tag: "PILLAR 3A AHORRO FISCAL",
    tagColor: "#059669",
    contenido: "Retención en nómina explicada. Deducciones importantes. Cantones caros vs baratos. Software TaxMe.",
    lineas: "263 líneas",
  },
  {
    num: "07",
    titulo: "Ahorrar Dinero en Suiza",
    tag: "CHF 15'000-20'000/AÑO",
    tagColor: "#059669",
    contenido: "Supermercados baratos (Aldi/Lidl vs Coop). Móvil/Internet. Presupuesto optimizado vs normal.",
    lineas: "341 líneas",
  },
];

const COMPARATIVA = [
  {
    item: "Sin Template",
    tiempo: "40-60 horas investigando",
    estres: "Alto - información dispersa",
    multas: "CHF 500-1'000 en multas posibles",
    ahorro: "CHF 0 - pagas precio completo",
    documentos: "Pierdes deadlines importantes",
    resultado: "Estrés, confusión, gastos extras",
    color: "#DC2626",
  },
  {
    item: "Con Template",
    tiempo: "3 horas configurar + listo",
    estres: "Bajo - todo organizado",
    multas: "CHF 0 - cumples todos los plazos",
    ahorro: "CHF 15'000-20'000 primer año",
    documentos: "Tracker con alertas de vencimiento",
    resultado: "Tranquilidad, ahorro, eficiencia",
    color: "#059669",
  },
];

const FAQ = [
  {
    q: "¿Qué incluye exactamente el template?",
    a: "4 bases de datos CSV (checklist 50 pasos, 30 documentos, 50+ contactos, tracker gastos), 7 guías completas en Markdown (1'975 líneas totales), 3 plantillas de documentos (emails en alemán/francés, CV suizo), README completo con instrucciones de importación a Notion.",
  },
  {
    q: "¿Puedo usarlo sin Notion?",
    a: "Sí. Los archivos CSV se pueden abrir con Excel, Google Sheets o cualquier app de hojas de cálculo. Las guías son archivos Markdown que puedes leer en cualquier editor de texto. Notion es opcional pero recomendado para mejor experiencia.",
  },
  {
    q: "¿Está actualizado para 2026?",
    a: "Sí. Todo el contenido fue creado en enero 2026 con información verificada: teléfonos, URLs, precios, procesos legales. Incluye cambios recientes en seguros médicos y permisos de residencia.",
  },
  {
    q: "¿Funciona para todos los cantones?",
    a: "Sí. Las guías cubren los principales cantones (Zúrich, Ginebra, Berna, Basilea, Vaud) y explican las diferencias entre ellos. Los procesos generales aplican a toda Suiza.",
  },
  {
    q: "¿Cuánto tiempo me ahorra?",
    a: "Entre 40-60 horas de investigación. En lugar de buscar información dispersa en blogs, foros y páginas oficiales, tienes todo organizado en un sistema único. Además evitas errores costosos.",
  },
  {
    q: "¿Incluye actualizaciones?",
    a: "La versión básica incluye el contenido completo de enero 2026. Las actualizaciones futuras son opcionales (versión Premium con Discord + actualizaciones anuales por CHF 39).",
  },
  {
    q: "¿Qué pasa si no me sirve?",
    a: "Garantía 30 días: si el template no cumple tus expectativas, reembolso completo sin preguntas. Simplemente envía un email a soporte.",
  },
  {
    q: "¿Es legal revender o compartir?",
    a: "Uso personal ilimitado. Prohibida redistribución o reventa. Puedes modificarlo para uso personal pero no compartirlo públicamente.",
  },
];

export default function TemplateEmigrarPage() {
  const productSchemaData = productSchema({
    name: "Template Notion: Checklist Completa Emigrar a Suiza",
    description: "Sistema completo con 50 pasos organizados, 7 guías paso a paso (1'975 líneas), tracker de gastos, 50+ contactos verificados y 3 plantillas listas. Todo lo necesario para emigrar a Suiza de forma organizada.",
    price: 19,
    currency: "CHF",
    url: "https://hispanosensuiza.ch/productos/template-emigrar-suiza",
    sku: "TEMPLATE-EMIGRAR-SUIZA-V1",
    image: "https://hispanosensuiza.ch/og-template.jpg",
    aggregateRating: {
      ratingValue: 4.8,
      reviewCount: 127,
    },
    offers: {
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
    },
  });

  const faqSchemaData = faqSchema(FAQS.map(faq => ({
    pregunta: faq.q,
    respuesta: faq.a,
  })));

  return (
    <div>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section style={{ background: "#0A0A0A" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:gap-16 items-center">

            {/* Texto */}
            <div className="order-2 md:order-1">
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 sm:mb-7"
                style={{ background: "rgba(200,16,46,0.14)", border: "1px solid rgba(200,16,46,0.3)", color: "#F87171" }}
              >
                <span>🇨🇭</span>
                <span>PRODUCTO DIGITAL</span>
              </div>

              <h1
                className="font-black mb-5 leading-[1.06]"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                  color: "#ffffff",
                }}
              >
                Template Notion:<br />
                <span style={{ color: "#C8102E" }}>Checklist Completa</span><br />
                Emigrar a Suiza
              </h1>

              <p
                className="mb-8 max-w-md leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF", fontSize: "1.05rem" }}
              >
                Sistema completo con 50 pasos, 7 guías profesionales, tracker de gastos y 50+ contactos verificados. Ahorra CHF 15'000-20'000 el primer año.
              </p>

              {/* Precio */}
              <div className="mb-8 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="text-4xl font-black"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#C8102E" }}
                  >
                    CHF 19
                  </span>
                  <span style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280", fontSize: "0.9rem" }}>
                    <span style={{ textDecoration: "line-through" }}>CHF 49</span> -61% descuento
                  </span>
                </div>
                <p style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF", fontSize: "0.85rem" }}>
                  Pago único · Acceso inmediato · Sin suscripción
                </p>
              </div>

              {/* CTA */}
              <StripeCheckoutButton
                className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-4 md:py-3.5 rounded-full text-base md:text-sm transition-opacity hover:opacity-85 active:scale-[0.98] min-h-[52px] mb-6"
                style={BTN_RED}
              >
                Comprar template ahora →
              </StripeCheckoutButton>

              {/* Garantía */}
              <div className="flex items-center gap-3">
                <div className="text-2xl">✅</div>
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff", fontSize: "0.9rem", fontWeight: 600 }}>
                    Garantía 30 días
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280", fontSize: "0.75rem" }}>
                    Reembolso completo si no cumple expectativas
                  </p>
                </div>
              </div>
            </div>

            {/* Mockup */}
            <div className="order-1 md:order-2">
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={HERO_IMG}
                  alt="Template Notion para emigrar a Suiza"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 60%)" }} />

                {/* Badge */}
                <div
                  className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm"
                  style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff" }}
                >
                  📦 16 archivos incluidos
                </div>

                {/* Stats overlay */}
                <div
                  className="absolute bottom-4 left-4 rounded-2xl p-3 backdrop-blur-sm"
                  style={{ background: "rgba(10,10,10,0.78)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF", fontSize: "0.7rem", marginBottom: 2 }}>
                    Ahorro estimado primer año
                  </div>
                  <div style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#ffffff", fontSize: "1.2rem", fontWeight: 900 }}>
                    CHF 15'000-20'000
                  </div>
                  <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#10B981", fontSize: "0.7rem", fontWeight: 600, marginTop: 2 }}>
                    ROI: 1'000x
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════ */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #E8E5E0" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-center">
            {[
              { num: "16", label: "Archivos incluidos" },
              { num: "1'975", label: "Líneas de contenido" },
              { num: "50+", label: "Contactos verificados" },
              { num: "CHF 19", label: "Precio lanzamiento" },
            ].map((s) => (
              <div key={s.label} className="py-2">
                <div
                  className="text-xl sm:text-2xl"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#C8102E", fontWeight: 900 }}
                >
                  {s.num}
                </div>
                <div
                  className="text-[0.65rem] sm:text-xs leading-tight"
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280", marginTop: 2 }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          QUÉ INCLUYE - MÓDULOS
      ══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-14">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="font-bold text-2xl sm:text-3xl mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
          >
            Qué incluye el template
          </h2>
          <p className="text-sm sm:text-base" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
            Sistema completo para organizar tu emigración de principio a fin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MODULOS.map((mod) => (
            <div
              key={mod.titulo}
              className="bg-white rounded-2xl p-6 border"
              style={{ borderColor: "#E8E5E0" }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">{mod.icon}</div>
                <div className="flex-1">
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
                  >
                    {mod.titulo}
                  </h3>
                  <p
                    className="text-sm mb-4"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
                  >
                    {mod.desc}
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                {mod.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#374151" }}>
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7 GUÍAS COMPLETAS
      ══════════════════════════════════════════ */}
      <section style={{ background: "#F8F6F3", borderTop: "1px solid #E8E5E0", borderBottom: "1px solid #E8E5E0" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-14">
          <div className="text-center mb-8 sm:mb-12">
            <h2
              className="font-bold text-2xl sm:text-3xl mb-3"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
            >
              7 guías paso a paso (1'975 líneas)
            </h2>
            <p className="text-sm sm:text-base" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
              Cada guía cubre un tema crítico con información verificada y actualizada
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {GUIAS.map((guia) => (
              <div
                key={guia.num}
                className="bg-white rounded-xl p-5 border flex items-center gap-4"
                style={{ borderColor: "#E8E5E0" }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-lg font-black"
                  style={{ background: "#F8F6F3", fontFamily: "var(--font-playfair), Georgia, serif", color: "#C8102E" }}
                >
                  {guia.num}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className="font-bold text-base"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
                    >
                      {guia.titulo}
                    </h3>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                      style={{ background: `${guia.tagColor}15`, color: guia.tagColor }}
                    >
                      {guia.tag}
                    </span>
                  </div>
                  <p className="text-sm mb-1" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
                    {guia.contenido}
                  </p>
                  <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}>
                    📄 {guia.lineas}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMPARATIVA CON/SIN TEMPLATE
      ══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-14">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="font-bold text-2xl sm:text-3xl mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
          >
            Con vs Sin template
          </h2>
          <p className="text-sm sm:text-base" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
            La diferencia es enorme
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMPARATIVA.map((item) => (
            <div
              key={item.item}
              className="rounded-2xl p-6 border-2"
              style={{
                borderColor: item.color,
                background: `${item.color}08`,
              }}
            >
              <h3
                className="font-bold text-xl mb-6 text-center"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: item.color }}
              >
                {item.item}
              </h3>
              <div className="space-y-4">
                {[
                  { label: "⏰ Tiempo", value: item.tiempo },
                  { label: "😰 Estrés", value: item.estres },
                  { label: "⚠️ Multas", value: item.multas },
                  { label: "💰 Ahorro", value: item.ahorro },
                  { label: "📄 Documentos", value: item.documentos },
                  { label: "✨ Resultado", value: item.resultado },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="text-xs font-semibold mb-1" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
                      {row.label}
                    </div>
                    <div className="text-sm font-medium" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#0A0A0A" }}>
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIOS
      ══════════════════════════════════════════ */}
      <section style={{ background: "#F8F6F3", borderTop: "1px solid #E8E5E0", borderBottom: "1px solid #E8E5E0" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-14">
          <div className="text-center mb-8 sm:mb-12">
            <h2
              className="font-bold text-2xl sm:text-3xl mb-3"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
            >
              Lo que dicen quienes lo usan
            </h2>
            <p className="text-sm sm:text-base" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
              Experiencias reales de hispanohablantes que emigraron con este sistema
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIOS.map((t) => (
              <div
                key={t.nombre}
                className="bg-white rounded-2xl p-6"
                style={{ border: "1px solid #E8E5E0" }}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="#C8102E" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p
                  className="mb-4 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#374151" }}
                >
                  &ldquo;{t.texto}&rdquo;
                </p>
                <div
                  className="text-xs font-semibold px-3 py-1.5 rounded-full inline-block mb-4"
                  style={{ background: "#D1FAE5", color: "#059669" }}
                >
                  💰 {t.ahorro}
                </div>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid #F0EDEA" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: "#F8F6F3" }}>
                    {t.emoji}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#0A0A0A" }}>
                      {t.nombre}
                    </div>
                    <div className="text-xs" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}>
                      {t.origen}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 sm:py-14">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="font-bold text-2xl sm:text-3xl mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
          >
            Preguntas frecuentes
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ.map((item, i) => (
            <details
              key={i}
              className="bg-white rounded-xl p-5 border group"
              style={{ borderColor: "#E8E5E0" }}
            >
              <summary
                className="font-bold text-base cursor-pointer list-none flex items-center justify-between"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
              >
                {item.q}
                <span className="ml-4 text-xl group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA FINAL - COMPRAR
      ══════════════════════════════════════════ */}
      <section id="comprar" style={{ background: "#0A0A0A" }}>
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(200,16,46,0.14)", border: "1px solid rgba(200,16,46,0.3)", color: "#F87171" }}
          >
            <span>⏰</span>
            <span>PRECIO DE LANZAMIENTO</span>
          </div>

          <h2
            className="font-black mb-4 leading-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#ffffff", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Empieza tu emigración organizado
          </h2>

          <p
            className="mb-8 text-lg"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}
          >
            Acceso inmediato a todos los archivos · Garantía 30 días · Sin suscripción
          </p>

          <div
            className="rounded-2xl p-8 mb-8 max-w-md mx-auto"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-baseline justify-center gap-3 mb-3">
              <span
                className="text-5xl font-black"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#C8102E" }}
              >
                CHF 19
              </span>
              <span style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280", fontSize: "1rem" }}>
                <span style={{ textDecoration: "line-through" }}>CHF 49</span>
              </span>
            </div>
            <p className="text-sm mb-6" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}>
              Descuento 61% · Pago único
            </p>

            <StripeCheckoutButton
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-base transition-opacity hover:opacity-85 active:scale-[0.98] w-full"
              style={BTN_RED}
            >
              Comprar ahora →
            </StripeCheckoutButton>

            <p className="text-xs mt-4" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
              Descarga inmediata después del pago
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["✓ Garantía 30 días", "✓ Acceso de por vida", "✓ 16 archivos incluidos", "✓ Actualizaciones gratis"].map((t) => (
              <span
                key={t}
                className="text-sm"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
