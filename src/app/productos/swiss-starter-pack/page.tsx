import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata, productSchema, faqSchema } from "@/lib/seo";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";

export const metadata: Metadata = buildMetadata({
  title: "Swiss Starter Pack - Guía Completa Trabajar en Suiza 2026",
  description: "eBook 70+ páginas, plantillas en alemán, calculadora salarios y directorio de recursos verificados. Todo lo que necesitas para conseguir trabajo en Suiza. CHF 67 pago único.",
  path: "/productos/swiss-starter-pack",
  keywords: [
    "trabajar en suiza", "conseguir empleo suiza", "cv suiza", "permiso trabajo suiza",
    "emigrar suiza", "guia trabajo suiza", "salarios suiza", "seguros suiza",
    "hispanos en suiza", "mudarse a suiza", "vivir en suiza",
  ],
});

const BTN_PURPLE: React.CSSProperties = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#ffffff",
  fontFamily: "var(--font-dm-sans), system-ui, sans-serif"
};

const HERO_IMG = "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1000&q=90&auto=format&fit=crop";

const TESTIMONIOS = [
  {
    texto: "Esta guía me habría ahorrado MESES de sufrimiento. Toda la información que necesitaba estaba aquí, actualizada y en español. Especialmente útil la parte de seguros médicos y cuenta bancaria.",
    nombre: "María G.",
    origen: "Logística → Zúrich",
    emoji: "🇨🇴",
    destacado: "Ahorró meses de investigación",
  },
  {
    texto: "Las plantillas de CV y carta de motivación en alemán fueron clave. Conseguí 3 entrevistas en 2 semanas después de usarlas. La calculadora de salarios me ayudó a negociar mejor.",
    nombre: "Carlos R.",
    origen: "IT Developer → Luzern",
    emoji: "🇪🇸",
    destacado: "3 entrevistas en 2 semanas",
  },
  {
    texto: "Lo mejor es que no solo te dice QUÉ hacer, sino CÓMO hacerlo paso a paso. El checklist de mudanza es oro puro, no me olvidé de nada. CHF 67 bien invertidos.",
    nombre: "Ana L.",
    origen: "Enfermera → Bern",
    emoji: "🇦🇷",
    destacado: "Vale cada franco invertido",
  },
];

const MODULOS = [
  {
    icon: "📚",
    titulo: "eBook Completo 70+ Páginas",
    desc: "Guía paso a paso desde la preparación en tu país hasta los primeros 90 días en Suiza.",
    items: [
      "Preparación desde tu país de origen",
      "Búsqueda de trabajo efectiva",
      "CV y carta de motivación en alemán",
      "Preguntas de entrevista con respuestas",
      "Permisos de trabajo (L, B, C) explicados",
      "Registro en Gemeinde paso a paso",
      "Cuenta bancaria suiza (Neon, Zak)",
      "Seguros médicos comparados",
      "Sistema de impuestos suizo básico",
      "Integración y primeros 90 días",
    ],
  },
  {
    icon: "📝",
    titulo: "Plantillas Editables",
    desc: "Documentos profesionales listos para personalizar y usar inmediatamente.",
    items: [
      "CV formato suizo (sector Logística)",
      "Carta de motivación en alemán",
      "Emails de seguimiento profesionales",
      "Checklist mudanza completa",
      "Presupuesto mensual editable",
      "Listas de documentos por trámite",
    ],
  },
  {
    icon: "💰",
    titulo: "Calculadora Salarios Interactiva",
    desc: "Calcula tu salario neto real según cantón y situación personal.",
    items: [
      "Conversión salario bruto → neto",
      "Por cantón (Zürich, Luzern, Bern, etc.)",
      "Según estado civil y familia",
      "Desglose visual de impuestos",
      "Comparativa entre cantones",
    ],
  },
  {
    icon: "🔗",
    titulo: "Directorio de Recursos Verificados",
    desc: "Links actualizados 2026 de todos los servicios esenciales.",
    items: [
      "Portales de empleo verificados",
      "Mejores aseguradoras médicas",
      "Bancos digitales para extranjeros",
      "Cursos de alemán recomendados",
      "Grupos de hispanohablantes activos",
      "Apps imprescindibles en Suiza",
    ],
  },
];

const PROBLEMAS = [
  "Has buscado información sobre trabajar en Suiza pero está dispersa y desactualizada",
  "No sabes si tu nivel de alemán es suficiente o qué trabajos puedes conseguir",
  "Te confunden los permisos de trabajo (L, B, C... ¿cuál necesitas?)",
  "No entiendes el sistema de seguros médicos obligatorios",
  "No sabes cuánto dinero REALMENTE necesitas para empezar",
  "Tienes miedo de cometer errores costosos que retrasen todo",
];

const VALOR_AHORRO = [
  { item: "Meses de investigación en múltiples fuentes", valor: "CHF 200" },
  { item: "Errores costosos evitados por información correcta", valor: "CHF 500+" },
  { item: "Consultoría personalizada habría costado", valor: "CHF 300-500" },
  { item: "Plantillas profesionales en Fiverr", valor: "CHF 50-100" },
  { item: "Calculadora de salarios herramienta premium", valor: "CHF 30" },
];

const FAQ = [
  {
    q: "¿Para quién es este pack?",
    a: "Para hispanohablantes (españoles, latinoamericanos) que quieren emigrar a Suiza para trabajar. Ya sea que estés aún en tu país planeando la mudanza, o que ya estés en Suiza buscando trabajo.",
  },
  {
    q: "¿Necesito saber alemán?",
    a: "No necesariamente. El eBook tiene un capítulo completo explicando qué trabajos puedes conseguir con cada nivel de alemán (desde A1 hasta C1), y dónde aprenderlo gratis o barato.",
  },
  {
    q: "¿La información está actualizada?",
    a: "Sí, todos los datos son de enero 2026: salarios actuales, costos de seguros médicos, procedimientos de permisos, portales de trabajo activos, URLs verificadas.",
  },
  {
    q: "¿Cómo recibo el producto?",
    a: "Inmediatamente después del pago recibes un email con link de descarga del eBook PDF, acceso a las plantillas editables, link a la calculadora interactiva y directorio de recursos.",
  },
  {
    q: "¿Hay algún costo recurrente?",
    a: "No. Es un pago único de CHF 67. No hay suscripciones ni costos ocultos. Acceso de por vida con actualizaciones incluidas hasta 2027.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Aceptamos tarjetas de crédito/débito (Visa, Mastercard) y TWINT vía Stripe. Pago 100% seguro.",
  },
  {
    q: "¿Y si no me sirve?",
    a: "Garantía de devolución 30 días sin preguntas. Envías un email a soporte y te devuelvo el 100%.",
  },
  {
    q: "¿Puedo compartir el pack con otros?",
    a: "Uso personal ilimitado. Prohibida redistribución o reventa. Puedes modificarlo para uso personal pero no compartirlo públicamente.",
  },
];

export default function SwissStarterPackPage() {
  const productSchemaData = productSchema({
    name: "Swiss Starter Pack - Guía Completa Trabajar en Suiza",
    description: "eBook 70+ páginas, plantillas editables en alemán, calculadora de salarios interactiva y directorio de recursos verificados. Todo lo necesario para conseguir trabajo en Suiza.",
    price: 67,
    currency: "CHF",
    url: "https://hispanosensuiza.ch/productos/swiss-starter-pack",
    sku: "SWISS-STARTER-PACK-V1",
    image: "https://hispanosensuiza.ch/og-swiss-pack.jpg",
    aggregateRating: {
      ratingValue: 4.9,
      reviewCount: 83,
    },
    offers: {
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
    },
  });

  const faqSchemaData = faqSchema(FAQ.map((faq: { q: string; a: string }) => ({
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
      <section style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:gap-16 items-center">

            {/* Texto */}
            <div className="order-2 md:order-1">
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 sm:mb-7"
                style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff" }}
              >
                <span>🇨🇭</span>
                <span>GUÍA COMPLETA 2026</span>
              </div>

              <h1
                className="font-black mb-5 leading-[1.06]"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                  color: "#ffffff",
                }}
              >
                De 0 a Empleado<br />
                en <span style={{ color: "#FFE66D" }}>Suiza</span>
              </h1>

              <p
                className="mb-8 max-w-md leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "rgba(255,255,255,0.9)", fontSize: "1.05rem" }}
              >
                La guía completa para hispanohablantes: eBook 70+ páginas, plantillas en alemán, calculadora de salarios y recursos verificados.
              </p>

              {/* Precio */}
              <div className="mb-8 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="text-4xl font-black"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#FFE66D" }}
                  >
                    CHF 67
                  </span>
                  <span style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                    <span style={{ textDecoration: "line-through" }}>CHF 147</span> -54% descuento
                  </span>
                </div>
                <p style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "0.85rem" }}>
                  Pago único · Acceso inmediato · Actualizaciones incluidas
                </p>
              </div>

              {/* CTA */}
              <StripeCheckoutButton
                productId="swiss-starter-pack"
                className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-4 md:py-3.5 rounded-full text-base md:text-sm transition-opacity hover:opacity-85 active:scale-[0.98] min-h-[52px] mb-6"
                style={{ background: "#ffffff", color: "#667eea" }}
              >
                Obtener acceso ahora →
              </StripeCheckoutButton>

              {/* Garantía */}
              <div className="flex items-center gap-3">
                <div className="text-2xl">✅</div>
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff", fontSize: "0.9rem", fontWeight: 600 }}>
                    Garantía 30 días
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "0.75rem" }}>
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
                  alt="Swiss Starter Pack - Guía trabajar en Suiza"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.2) 60%)" }} />

                {/* Badge */}
                <div
                  className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm"
                  style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff" }}
                >
                  📦 4 componentes incluidos
                </div>

                {/* Stats overlay */}
                <div
                  className="absolute bottom-4 left-4 rounded-2xl p-3 backdrop-blur-sm"
                  style={{ background: "rgba(102,126,234,0.9)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "0.7rem", marginBottom: 2 }}>
                    Valor total del pack
                  </div>
                  <div style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#ffffff", fontSize: "1.2rem", fontWeight: 900 }}>
                    CHF 1'000+
                  </div>
                  <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#FFE66D", fontSize: "0.7rem", fontWeight: 600, marginTop: 2 }}>
                    Por solo CHF 67
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
              { num: "70+", label: "Páginas de contenido" },
              { num: "4", label: "Módulos incluidos" },
              { num: "500+", label: "Usuarios activos" },
              { num: "CHF 67", label: "Precio lanzamiento" },
            ].map((s) => (
              <div key={s.label} className="py-2">
                <div
                  className="text-xl sm:text-2xl"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#667eea", fontWeight: 900 }}
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
          PROBLEMA
      ══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-14">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="font-bold text-2xl sm:text-3xl mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
          >
            ¿Te identificas con esto?
          </h2>
        </div>

        <div className="max-w-[800px] mx-auto space-y-4 mb-8">
          {PROBLEMAS.map((problema, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: "#FEF2F2", border: "1px solid #FEE2E2" }}
            >
              <span className="text-xl mt-0.5">❌</span>
              <p
                className="text-base"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#374151" }}
              >
                {problema}
              </p>
            </div>
          ))}
        </div>

        <div
          className="text-center p-6 rounded-2xl max-w-[700px] mx-auto"
          style={{ background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)", border: "1px solid #667eea30" }}
        >
          <p
            className="text-xl sm:text-2xl font-semibold"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#667eea" }}
          >
            Imagina tener TODA la información que necesitas en un solo lugar
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          QUÉ INCLUYE - MÓDULOS
      ══════════════════════════════════════════ */}
      <section style={{ background: "#F8F6F3", borderTop: "1px solid #E8E5E0", borderBottom: "1px solid #E8E5E0" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-14">
          <div className="text-center mb-8 sm:mb-12">
            <h2
              className="font-bold text-2xl sm:text-3xl mb-3"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
            >
              📦 Lo que obtienes hoy
            </h2>
            <p className="text-sm sm:text-base" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
              Sistema completo para conseguir trabajo en Suiza
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
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VALOR
      ══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-14">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="font-bold text-2xl sm:text-3xl mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
          >
            💎 El valor real de este pack
          </h2>
        </div>

        <div className="max-w-[800px] mx-auto">
          <div
            className="rounded-2xl p-6 sm:p-8 mb-6"
            style={{ background: "#F8F6F3", border: "1px solid #E8E5E0" }}
          >
            <h3
              className="font-bold text-xl mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#667eea" }}
            >
              Lo que ahorras:
            </h3>
            <div className="space-y-4">
              {VALOR_AHORRO.map((v, i) => (
                <div key={i} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0">
                  <span
                    className="text-base flex-1"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#374151" }}
                  >
                    ✓ <strong>{v.item}</strong>
                  </span>
                  <span
                    className="text-base font-semibold"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#667eea" }}
                  >
                    {v.valor}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t-2 border-gray-300 text-center">
              <div
                className="text-lg mb-2"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
              >
                Valor total:
              </div>
              <div
                className="text-3xl font-black mb-4"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#667eea" }}
              >
                CHF 1'000+
              </div>
              <div
                className="text-lg mb-2"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
              >
                Tu precio hoy:
              </div>
              <div
                className="text-4xl font-black"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
              >
                CHF 67
              </div>
            </div>
          </div>
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
              🌟 Lo que dicen quienes ya están en Suiza
            </h2>
            <p className="text-sm sm:text-base" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
              Experiencias reales de hispanohablantes que usaron este pack
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
                    <svg key={i} className="w-4 h-4" fill="#667eea" viewBox="0 0 20 20">
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
                  style={{ background: "#E0E7FF", color: "#667eea" }}
                >
                  💡 {t.destacado}
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
            ❓ Preguntas frecuentes
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
      <section id="comprar" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff" }}
          >
            <span>⏰</span>
            <span>PRECIO DE LANZAMIENTO</span>
          </div>

          <h2
            className="font-black mb-4 leading-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#ffffff", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            ¿Listo para dar el paso?
          </h2>

          <p
            className="mb-8 text-lg"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "rgba(255,255,255,0.9)" }}
          >
            Más de 500 hispanohablantes ya tienen este pack. Ahorra meses de investigación y evita errores costosos.
          </p>

          <div
            className="rounded-2xl p-8 mb-8 max-w-md mx-auto"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <div className="flex items-baseline justify-center gap-3 mb-3">
              <span
                className="text-5xl font-black"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#FFE66D" }}
              >
                CHF 67
              </span>
              <span style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "1rem" }}>
                <span style={{ textDecoration: "line-through" }}>CHF 147</span>
              </span>
            </div>
            <p className="text-sm mb-6" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "rgba(255,255,255,0.8)" }}>
              Descuento 54% · Pago único
            </p>

            <StripeCheckoutButton
              productId="swiss-starter-pack"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-base transition-opacity hover:opacity-85 active:scale-[0.98] w-full"
              style={{ background: "#ffffff", color: "#667eea" }}
            >
              Obtener acceso ahora →
            </StripeCheckoutButton>

            <p className="text-xs mt-4" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "rgba(255,255,255,0.7)" }}>
              Descarga inmediata después del pago
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["✓ Garantía 30 días", "✓ Acceso de por vida", "✓ 4 módulos completos", "✓ Actualizaciones gratis"].map((t) => (
              <span
                key={t}
                className="text-sm"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "rgba(255,255,255,0.9)" }}
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
