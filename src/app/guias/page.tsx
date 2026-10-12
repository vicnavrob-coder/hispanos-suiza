import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbSchema, itemListSchema, BASE_URL } from "@/lib/seo";

const ACCENT = "#C8102E";

// ── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Guías prácticas para hispanohablantes en Suiza 2026",
  description:
    "Guías paso a paso sobre los trámites más importantes en Suiza: cobrar el paro, divorciarse, volver a España. Todo en español, con datos reales y actualizados.",
  path: "/guias",
  keywords: [
    "guias suiza español",
    "tramites suiza hispanohablante",
    "guia paro suiza",
    "guia divorcio suiza",
    "volver a españa desde suiza",
  ],
});

// ── Guías ─────────────────────────────────────────────────────────────────────

const GUIAS = [
  {
    href: "/guias/rav-paro-suiza",
    emoji: "📋",
    categoria: "Derechos laborales",
    categoriaColor: "#FEE2E2",
    categoriaText: ACCENT,
    titulo: "RAV en Suiza: cómo cobrar el paro paso a paso",
    desc: "Todo lo que necesitas saber para inscribirte en el RAV y cobrar la prestación por desempleo (ALV). Plazos, importes, errores que cuestan dinero y el formulario U2 para exportar el paro a España.",
    tags: ["RAV", "ALV", "Desempleo", "Formulario U2"],
    tiempo: "10 min lectura",
    actualizado: "Octubre 2026",
  },
  {
    href: "/guias/divorcio-suiza",
    emoji: "⚖️",
    categoria: "Derecho familiar",
    categoriaColor: "#EDE9FE",
    categoriaText: "#5B21B6",
    titulo: "Divorcio en Suiza siendo hispanohablante: proceso y derechos",
    desc: "Cómo funciona el divorcio en el derecho suizo, qué pasa con tu permiso de residencia, custodia de hijos, reparto del segundo pilar y cómo hacer que el divorcio suizo sea válido en España.",
    tags: ["Divorcio", "Permiso B", "Segundo pilar", "Custodia"],
    tiempo: "12 min lectura",
    actualizado: "Octubre 2026",
  },
  {
    href: "/guias/volver-espana-desde-suiza",
    emoji: "✈️",
    categoria: "Retorno a España",
    categoriaColor: "#DCFCE7",
    categoriaText: "#15803D",
    titulo: "Volver a España desde Suiza: todo lo que debes gestionar",
    desc: "Guía exhaustiva con checklist de 20 puntos: segundo pilar, AHV/convenio de pensiones, paro exportable (U2), baja municipal, cancelación del LAMal, impuestos del año de salida y trámites al llegar.",
    tags: ["Retorno", "Segundo pilar", "AHV", "LAMal", "Formulario U2"],
    tiempo: "15 min lectura",
    actualizado: "Octubre 2026",
  },
];

// ── JSON-LD ───────────────────────────────────────────────────────────────────

const breadcrumb = breadcrumbSchema([
  { name: "Inicio", url: BASE_URL },
  { name: "Guías",  url: `${BASE_URL}/guias` },
]);

const itemList = itemListSchema(
  GUIAS.map((g) => ({
    name: g.titulo,
    url: `${BASE_URL}${g.href}`,
    description: g.desc,
  }))
);

// ── Componente ────────────────────────────────────────────────────────────────

export default function GuiasPage() {
  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* ── Breadcrumb ── */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-red-700">Inicio</Link>
          <span>›</span>
          <span className="text-gray-600">Guías</span>
        </nav>

        {/* ── Hero ── */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: "#FEE2E2", color: ACCENT }}>
              Guías prácticas
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
            Guías prácticas para<br />
            <span style={{ color: ACCENT }}>hispanohablantes en Suiza</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Trámites reales explicados en español. Sin tecnicismos innecesarios, sin información
            desactualizada. Cada guía ha sido investigada con fuentes oficiales suizas y revisada para 2026.
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { valor: "3", label: "Guías publicadas" },
            { valor: "100%", label: "En español" },
            { valor: "2026", label: "Datos actualizados" },
          ].map(({ valor, label }) => (
            <div key={label} className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
              <div className="text-2xl font-black mb-0.5" style={{ color: ACCENT }}>{valor}</div>
              <div className="text-xs text-gray-400">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Lista de guías ── */}
        <section className="mb-12">
          <div className="space-y-6">
            {GUIAS.map(({ href, emoji, categoria, categoriaColor, categoriaText, titulo, desc, tags, tiempo, actualizado }) => (
              <Link key={href} href={href} className="block group">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-red-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0 mt-1">{emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: categoriaColor, color: categoriaText }}>
                          {categoria}
                        </span>
                        <span className="text-xs text-gray-400">{tiempo}</span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400">Actualizado {actualizado}</span>
                      </div>
                      <h2 className="text-xl font-black text-gray-900 mb-2 group-hover:text-red-700 transition-colors leading-tight">
                        {titulo}
                      </h2>
                      <p className="text-sm text-gray-500 leading-relaxed mb-3">{desc}</p>
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex gap-2 flex-wrap">
                          {tags.map((tag) => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm font-bold text-gray-400 group-hover:text-red-600 transition-colors flex-shrink-0">
                          Leer guía →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CTA newsletter / planes ── */}
        <section className="mb-12">
          <div className="rounded-2xl p-7 text-center" style={{ background: "#0A0A0A" }}>
            <h2 className="text-xl font-black text-white mb-2">
              ¿Tienes una situación concreta?
            </h2>
            <p className="text-white/70 text-sm mb-5 max-w-lg mx-auto">
              Nuestro equipo de asesores en español puede ayudarte con trámites, permisos, seguros
              médicos y más. Sin listas de espera, sin burocracia.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/planes"
                className="inline-block px-6 py-2.5 rounded-full text-white font-bold text-sm hover:opacity-90 transition-opacity"
                style={{ background: ACCENT }}>
                Ver planes →
              </Link>
              <Link href="/sobre-nosotros"
                className="inline-block px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.25)", color: "white" }}>
                Quiénes somos
              </Link>
            </div>
          </div>
        </section>

        {/* ── Otras secciones ── */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Explora el resto de HispanosEnSuiza</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { href: "/trabajo",      label: "💼 Trabajo" },
              { href: "/vivienda",     label: "🏠 Vivienda" },
              { href: "/seguros",      label: "🛡️ Seguros" },
              { href: "/herramientas/salario-neto", label: "🧮 Calculadora" },
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
