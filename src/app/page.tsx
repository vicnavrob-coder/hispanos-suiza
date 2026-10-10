import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { posts, categorias, getDestacados } from "@/lib/posts";
import { buildMetadata, organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "HispanosEnSuiza — La guía real para vivir en Suiza",
  description: "Guías prácticas, herramientas gratuitas e historias reales para españoles y latinoamericanos que viven o quieren vivir en Suiza. Trabajo, vivienda, seguros, banca y más.",
  path: "/",
  keywords: [
    "vivir en suiza", "españoles en suiza", "emigrar a suiza",
    "latinoamericanos suiza", "trabajar en suiza", "guia suiza hispanohablantes",
    "seguro medico suiza", "salario suiza", "piso suiza",
  ],
});

const HERO_IMG  = "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1000&q=90&auto=format&fit=crop";
const ALPS_IMG  = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=90&auto=format&fit=crop";
const LUCERNA_IMG = "https://images.unsplash.com/photo-1527856263669-12c3a0af2aa6?w=800&q=90&auto=format&fit=crop";

const TESTIMONIOS = [
  {
    texto: "Llegué a Zúrich sin hablar alemán ni conocer a nadie. La guía del seguro médico me ahorró semanas de confusión y varios cientos de francos.",
    nombre: "Carlos M.",
    origen: "Madrid → Zúrich",
    emoji: "🇪🇸",
  },
  {
    texto: "Usé la calculadora de salario neto antes de negociar mi contrato. Llegué a la reunión con los números claros y conseguí 400 CHF más al mes.",
    nombre: "Valeria R.",
    origen: "Buenos Aires → Ginebra",
    emoji: "🇦🇷",
  },
  {
    texto: "Encontré piso en dos semanas siguiendo los pasos de la guía de vivienda. En Ginebra, que es prácticamente imposible sin saber cómo funciona.",
    nombre: "Diego F.",
    origen: "Bogotá → Ginebra",
    emoji: "🇨🇴",
  },
];

const BTN_RED: React.CSSProperties = { background: "#C8102E", color: "#ffffff", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" };
const BTN_OUTLINE: React.CSSProperties = { border: "1.5px solid rgba(255,255,255,0.25)", color: "#ffffff", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" };

export default function Home() {
  const destacados = getDestacados();
  const recientes  = posts.slice(0, 6);

  const schemas = [organizationSchema(), websiteSchema()];

  return (
    <div>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section style={{ background: "#0A0A0A" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Texto */}
            <div className="order-2 md:order-1">
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-7"
                style={{ background: "rgba(200,16,46,0.14)", border: "1px solid rgba(200,16,46,0.3)", color: "#F87171" }}
              >
                <span>🇨🇭</span>
                <span>+142.000 hispanohablantes viven en Suiza</span>
              </div>

              <h1
                className="font-black mb-5 leading-[1.06]"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                  color: "#ffffff",
                }}
              >
                Vivir en Suiza<br />
                <span style={{ color: "#C8102E" }}>sin que nadie</span><br />
                te lo explique
              </h1>

              <p
                className="mb-8 max-w-md leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF", fontSize: "1.05rem" }}
              >
                Guías reales sobre trabajo, vivienda, seguros y banca — escritas por españoles y latinoamericanos que ya vivieron esto. Sin burocracia, sin rodeos.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-9">
                <Link
                  href="/blog/guia-emigrar-suiza-espanoles-2026"
                  className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-full text-sm transition-opacity hover:opacity-85"
                  style={BTN_RED}
                >
                  Empezar por aquí →
                </Link>
                <Link
                  href="/herramientas"
                  className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-full text-sm transition-colors hover:bg-white/10"
                  style={BTN_OUTLINE}
                >
                  Ver herramientas
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["🇪🇸","🇲🇽","🇦🇷","🇨🇴","🇻🇪"].map((flag, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm border-2"
                      style={{ background: "#1c1c1c", borderColor: "#0A0A0A", zIndex: 5 - i }}
                    >
                      {flag}
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280", fontSize: "0.75rem" }}>
                  Miles de hispanohablantes ya lo usan ·{" "}
                  <span style={{ color: "#ffffff", fontWeight: 600 }}>100% gratis</span>
                </p>
              </div>
            </div>

            {/* Foto hero */}
            <div className="order-1 md:order-2">
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={HERO_IMG}
                  alt="Zürich, Suiza — vista panorámica desde el lago"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.18) 0%, transparent 60%)" }} />

                {/* Badge ciudad */}
                <div
                  className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm"
                  style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff" }}
                >
                  📍 Zürich, Suiza
                </div>

                {/* Badge salario */}
                <div
                  className="absolute bottom-4 left-4 rounded-2xl p-3 backdrop-blur-sm"
                  style={{ background: "rgba(10,10,10,0.78)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF", fontSize: "0.7rem", marginBottom: 2 }}>
                    Salario neto estimado · Zúrich
                  </div>
                  <div style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#ffffff", fontSize: "1.2rem", fontWeight: 900 }}>
                    CHF 5.840 / mes
                  </div>
                  <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#C8102E", fontSize: "0.7rem", fontWeight: 600, marginTop: 2 }}>
                    Calcula el tuyo →
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
        <div className="max-w-[1200px] mx-auto px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { num: "142K+", label: "Hispanohablantes en Suiza" },
              { num: "559K",  label: "Búsquedas mensuales" },
              { num: "11",    label: "Ciudades comparadas" },
              { num: "100%",  label: "Información verificada" },
            ].map((s) => (
              <div key={s.label} className="py-2">
                <div
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#C8102E", fontSize: "1.75rem", fontWeight: 900 }}
                >
                  {s.num}
                </div>
                <div
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280", fontSize: "0.72rem", marginTop: 2 }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ACCESOS RÁPIDOS
      ══════════════════════════════════════════ */}
      <section style={{ background: "#F8F6F3", borderBottom: "1px solid #E8E5E0" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: "/trabajo",  icon: "💼", title: "Encontrar trabajo",  desc: "Ofertas reales por sector y ciudad, con ETT y empleo público", accent: "#C8102E", iconBg: "#FFF1F3" },
              { href: "/vivienda", icon: "🏠", title: "Buscar piso",        desc: "Portales inmobiliarios suizos con la búsqueda ya aplicada",    accent: "#1d4ed8", iconBg: "#EFF6FF" },
              { href: "/seguros",  icon: "🛡️", title: "Contratar seguro",   desc: "Calcula tu prima KVG y compara las mejores aseguradoras",      accent: "#7c3aed", iconBg: "#F5F3FF" },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex items-center gap-4 bg-white rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{ border: "1px solid #E8E5E0", borderLeft: `4px solid ${card.accent}` }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: card.iconBg }}>
                  {card.icon}
                </div>
                <div className="min-w-0">
                  <div style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A", fontWeight: 600, fontSize: "0.88rem", lineHeight: 1.3, marginBottom: 2 }}>
                    {card.title}
                  </div>
                  <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280", fontSize: "0.75rem", lineHeight: 1.4 }}>
                    {card.desc}
                  </div>
                </div>
                <span className="ml-auto flex-shrink-0 text-sm transition-colors" style={{ color: "#D1D5DB" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CATEGORÍAS
      ══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-6 py-14">
        <h2
          className="font-bold mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A", fontSize: "1.5rem" }}
        >
          Todo lo que necesitas saber
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categorias.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categorias/${cat.slug}`}
              className="group flex flex-col items-center gap-2 bg-white rounded-2xl p-4 min-h-[90px] transition-all text-center justify-center hover:-translate-y-0.5 hover:shadow-md"
              style={{ border: "1px solid #E8E5E0" }}
            >
              <span className="w-10 h-10 rounded-full bg-[#F8F6F3] flex items-center justify-center text-xl group-hover:bg-[#FFF1F3] transition-colors">
                {cat.icono}
              </span>
              <span
                className="group-hover:text-[#C8102E] transition-colors"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#374151", fontSize: "0.72rem", fontWeight: 500, lineHeight: 1.3 }}
              >
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOTO SUIZA — Los Alpes / vida real
      ══════════════════════════════════════════ */}
      <section style={{ background: "#0A0A0A", overflow: "hidden" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Fotos apiladas */}
            <div className="relative">
              {/* Foto principal — Alpes */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={ALPS_IMG}
                  alt="Los Alpes suizos — paisaje de montaña con lago"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.12)" }} />
                {/* Badge ubicación */}
                <div
                  className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm"
                  style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff" }}
                >
                  🏔️ Alpes suizos
                </div>
              </div>

              {/* Foto secundaria — Lucerna, superpuesta */}
              <div
                className="absolute -bottom-5 -right-4 rounded-2xl overflow-hidden shadow-2xl border-4 hidden md:block"
                style={{ width: "42%", aspectRatio: "4/3", borderColor: "#0A0A0A" }}
              >
                <Image
                  src={LUCERNA_IMG}
                  alt="Lucerna, Suiza — puente de la capilla"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>

            {/* Texto */}
            <div className="md:pl-4">
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(200,16,46,0.14)", border: "1px solid rgba(200,16,46,0.3)", color: "#F87171" }}
              >
                💬 Experiencia real, no teoría
              </div>

              <h2
                className="font-black mb-5 leading-[1.1]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#ffffff", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)" }}
              >
                Lo que no cuenta ningún blog genérico
              </h2>

              <p
                className="mb-7 leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF", fontSize: "1rem" }}
              >
                Cada guía la ha revisado alguien que vivió ese proceso en Suiza: la burocracia del seguro médico, cómo negociar el alquiler, qué pasa si pierdes el trabajo. Sin generalidades.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: "🏥", text: "Seguro médico sin tecnicismos — básico, suplementario y franquicia óptima" },
                  { icon: "📋", text: "Permisos L, B, C y G: cuándo pedirlos y qué documentos necesitas" },
                  { icon: "💰", text: "Calculadora de salario neto con todos los descuentos reales del cantón" },
                ].map((item) => (
                  <div key={item.icon} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                    <p style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF", fontSize: "0.875rem", lineHeight: 1.6 }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/historias-reales"
                className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-full text-sm transition-opacity hover:opacity-85"
                style={BTN_RED}
              >
                Leer historias reales →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ARTÍCULOS DESTACADOS
      ══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2
              className="font-bold"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A", fontSize: "1.5rem" }}
            >
              Las guías más importantes
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280", fontSize: "0.875rem", marginTop: 4 }}>
              Por dónde empezar si estás planificando o acabas de llegar
            </p>
          </div>
          <Link
            href="/blog"
            className="flex-shrink-0 ml-4 hover:underline"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#C8102E", fontSize: "0.875rem", fontWeight: 500 }}
          >
            Ver todas →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destacados.map((post) => (
            <ArticleCard key={post.slug} post={post} destacado />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIOS
      ══════════════════════════════════════════ */}
      <section style={{ background: "#F8F6F3", borderTop: "1px solid #E8E5E0", borderBottom: "1px solid #E8E5E0" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-14">
          <div className="text-center mb-10">
            <h2
              className="font-bold"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A", fontSize: "1.5rem" }}
            >
              Lo que dice la comunidad
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280", fontSize: "0.875rem", marginTop: 6 }}>
              Experiencias reales de personas que usaron estas guías
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIOS.map((t) => (
              <div
                key={t.nombre}
                className="bg-white rounded-2xl p-6 flex flex-col gap-4"
                style={{ border: "1px solid #E8E5E0" }}
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="#C8102E" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p
                  className="flex-1 leading-relaxed"
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#374151", fontSize: "0.875rem" }}
                >
                  &ldquo;{t.texto}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid #F0EDEA" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-base" style={{ background: "#F8F6F3" }}>
                    {t.emoji}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#0A0A0A", fontWeight: 600, fontSize: "0.875rem" }}>
                      {t.nombre}
                    </div>
                    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF", fontSize: "0.72rem" }}>
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
          HERRAMIENTAS
      ══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2
              className="font-bold"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A", fontSize: "1.5rem" }}
            >
              Herramientas gratuitas
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280", fontSize: "0.875rem", marginTop: 4 }}>
              Calculadoras y comparadores para tomar decisiones con datos reales
            </p>
          </div>
          <Link
            href="/herramientas"
            className="flex-shrink-0 ml-4 hover:underline"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#C8102E", fontSize: "0.875rem", fontWeight: 500 }}
          >
            Ver todas →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              href: "/herramientas/salario-neto",
              icon: "🧮",
              titulo: "Calculadora de salario neto",
              desc: "Introduce tu salario bruto y obtén el neto exacto con AHV, ALV, impuestos y seguro desglosados.",
              tag: "Más usada",
              tagColor: "#C8102E",
              tagBg: "#FFF1F3",
              accent: "#C8102E",
            },
            {
              href: "/herramientas/comparador-ciudades",
              icon: "🏙️",
              titulo: "Comparador de ciudades",
              desc: "Compara coste de vida en 11 ciudades suizas: alquiler, impuestos, salarios y dinero disponible al mes.",
              tag: "11 ciudades",
              tagColor: "#1d4ed8",
              tagBg: "#EFF6FF",
              accent: "#1d4ed8",
            },
            {
              href: "/seguros",
              icon: "🏥",
              titulo: "Comparador de seguros",
              desc: "Calcula tu prima básica KVG según edad, cantón y franquicia. Compara las principales aseguradoras.",
              tag: "Ahorra CHF 500/año",
              tagColor: "#7c3aed",
              tagBg: "#F5F3FF",
              accent: "#7c3aed",
            },
          ].map((h) => (
            <Link
              key={h.href}
              href={h.href}
              className="group bg-white rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              style={{ border: "1px solid #E8E5E0", borderTop: `3px solid ${h.accent}` }}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: h.tagBg }}>
                  {h.icon}
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: h.tagBg, color: h.tagColor }}
                >
                  {h.tag}
                </span>
              </div>
              <div>
                <h3
                  className="font-bold mb-2 group-hover:text-[#C8102E] transition-colors"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
                >
                  {h.titulo}
                </h3>
                <p style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280", fontSize: "0.875rem", lineHeight: 1.6 }}>
                  {h.desc}
                </p>
              </div>
              <div
                className="mt-auto flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: h.accent, fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              >
                Abrir herramienta →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ARTÍCULOS RECIENTES
      ══════════════════════════════════════════ */}
      <section style={{ background: "#F8F6F3", borderTop: "1px solid #E8E5E0" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2
                className="font-bold"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A", fontSize: "1.5rem" }}
              >
                Últimas guías
              </h2>
              <p style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280", fontSize: "0.875rem", marginTop: 4 }}>
                Actualizadas con información de 2026
              </p>
            </div>
            <Link
              href="/blog"
              className="flex-shrink-0 ml-4 hover:underline"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#C8102E", fontSize: "0.875rem", fontWeight: 500 }}
            >
              Ver todas →
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recientes.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NEWSLETTER
      ══════════════════════════════════════════ */}
      <section style={{ background: "#0A0A0A" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div>
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(200,16,46,0.14)", border: "1px solid rgba(200,16,46,0.3)", color: "#F87171" }}
              >
                📬 Newsletter semanal
              </div>
              <h2
                className="font-black mb-4 leading-tight"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#ffffff", fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
              >
                Una guía práctica cada semana, en tu correo
              </h2>
              <p
                className="mb-6 leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF", fontSize: "1rem" }}
              >
                Cambios en seguros, oportunidades de empleo, trucos de vivienda y más. Sin spam. Baja cuando quieras.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {["Sin spam", "Baja cuando quieras", "100% gratis"].map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280", fontSize: "0.75rem" }}
                  >
                    <span style={{ color: "#C8102E" }}>✓</span> {t}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <p
                className="font-semibold mb-4"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff", fontSize: "0.875rem" }}
              >
                Únete gratis — solo tu email
              </p>
              <NewsletterForm />
              <p
                className="mt-3"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#4B5563", fontSize: "0.72rem" }}
              >
                Tus datos están seguros.{" "}
                <Link href="/privacidad" className="underline hover:text-white transition-colors" style={{ color: "#6B7280" }}>
                  Política de privacidad
                </Link>.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
