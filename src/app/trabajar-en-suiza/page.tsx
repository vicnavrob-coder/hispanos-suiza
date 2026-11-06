import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Trabajar en Suiza 2026: Guía Completa para Españoles y Latinoamericanos",
  description: "Todo lo que necesitas saber para trabajar en Suiza: requisitos, salarios, permisos, mejores sectores, portales de empleo y cómo buscar trabajo desde España. Guía actualizada 2026 para hispanohablantes.",
  path: "/trabajar-en-suiza",
  keywords: [
    "trabajar en suiza", "trabajos en suiza para españoles", "empleos suiza",
    "como trabajar en suiza", "trabajar en suiza sin saber aleman",
    "requisitos para trabajar en suiza", "permisos trabajo suiza",
    "trabajar en zurich", "trabajar en ginebra", "trabajar en basilea",
    "salarios trabajo suiza", "mejores trabajos suiza", "empleo suiza 2026"
  ],
});

export default function TrabajarEnSuizaPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      {/* Hero */}
      <section style={{ background: "#0A0A0A" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(200,16,46,0.14)", border: "1px solid rgba(200,16,46,0.3)", color: "#F87171" }}
            >
              <span>🇨🇭</span>
              <span>GUÍA ACTUALIZADA 2026</span>
            </div>
            <h1
              className="font-black mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#ffffff", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Trabajar en Suiza:<br />
              <span style={{ color: "#C8102E" }}>Guía Completa 2026</span>
            </h1>
            <p
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}
            >
              Todo lo que necesitas saber para encontrar trabajo en Suiza: requisitos, salarios, permisos, sectores con más demanda y portales de empleo verificados.
            </p>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        
        {/* Requisitos básicos */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8" style={{ border: "1px solid #E8E5E0" }}>
          <h2
            className="font-bold text-2xl mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
          >
            ✅ Requisitos para Trabajar en Suiza
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🇪🇺</span>
              <div>
                <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#0A0A0A" }}>
                  Ciudadanos UE/AELC (España)
                </h3>
                <p style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280", fontSize: "0.95rem" }}>
                  Libre circulación. Solo necesitas contrato de trabajo y solicitar permiso B/L en Suiza. No requiere visa previa.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🌎</span>
              <div>
                <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#0A0A0A" }}>
                  Latinoamericanos (fuera UE)
                </h3>
                <p style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280", fontSize: "0.95rem" }}>
                  Necesitas que la empresa demuestre que no encontró candidatos UE/CH. Generalmente requiere alta cualificación (IT, medicina, finanzas, directivos).
                </p>
                <Link href="/latinoamericanos" className="text-sm font-semibold mt-2 inline-block" style={{ color: "#C8102E" }}>
                  Ver guía específica para latinoamericanos →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sectores con más demanda */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8" style={{ border: "1px solid #E8E5E0" }}>
          <h2
            className="font-bold text-2xl mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
          >
            📊 Sectores con Más Demanda en Suiza 2026
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { sector: "IT y Tech", salario: "90K-140K CHF/año", demanda: "Muy Alta", icon: "💻" },
              { sector: "Sanidad", salario: "80K-120K CHF/año", demanda: "Muy Alta", icon: "🏥" },
              { sector: "Finanzas y Banca", salario: "100K-180K CHF/año", demanda: "Alta", icon: "💰" },
              { sector: "Ingenierías", salario: "85K-130K CHF/año", demanda: "Alta", icon: "⚙️" },
              { sector: "Hostelería", salario: "50K-70K CHF/año", demanda: "Alta", icon: "🍽️" },
              { sector: "Construcción", salario: "60K-90K CHF/año", demanda: "Media-Alta", icon: "🏗️" },
            ].map((item) => (
              <div key={item.sector} className="p-4 rounded-lg" style={{ background: "#F8F6F3" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.icon}</span>
                  <h3 className="font-semibold" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#0A0A0A" }}>
                    {item.sector}
                  </h3>
                </div>
                <p className="text-sm mb-1" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
                  Salario: <span className="font-semibold" style={{ color: "#0A0A0A" }}>{item.salario}</span>
                </p>
                <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#059669" }}>
                  Demanda: {item.demanda}
                </p>
              </div>
            ))}
          </div>
          <Link href="/recursos/guia-salarios" className="text-sm font-semibold mt-4 inline-block" style={{ color: "#C8102E" }}>
            Ver guía completa de salarios 2026 →
          </Link>
        </div>

        {/* Herramientas útiles */}
        <div className="bg-[#C8102E] text-white rounded-2xl p-6 sm:p-8 mb-8">
          <h2
            className="font-bold text-2xl mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            🛠️ Herramientas Gratuitas para Tu Búsqueda
          </h2>
          <div className="space-y-3">
            {[
              { href: "/herramientas/generador-cv", title: "Generador CV Suizo (GRATIS)", desc: "Crea tu CV profesional con foto en formato suizo" },
              { href: "/herramientas/salario-neto", title: "Calculadora Salario Neto", desc: "Descubre cuánto cobrarás realmente después de impuestos" },
              { href: "/trabajo/buscador", title: "Buscador de Empleo", desc: "7 portales de empleo suizos en un solo lugar" },
              { href: "/herramientas/permiso-trabajo", title: "Permisos de Trabajo", desc: "Comprueba qué permiso necesitas según tu situación" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block bg-white/10 hover:bg-white/20 transition-colors rounded-lg p-4"
              >
                <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
                  {tool.title}
                </h3>
                <p className="text-sm opacity-90" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
                  {tool.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] text-white rounded-2xl p-8 text-center">
          <h2
            className="font-bold text-2xl sm:text-3xl mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            ¿Listo para empezar tu búsqueda?
          </h2>
          <p className="mb-6 max-w-xl mx-auto" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}>
            Crea tu CV en formato suizo profesional en 5 minutos. Primera generación 100% GRATIS.
          </p>
          <Link
            href="/herramientas/generador-cv"
            className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-4 rounded-full text-base transition-opacity hover:opacity-85"
            style={{ background: "#C8102E", color: "#ffffff" }}
          >
            Crear mi CV suizo gratis →
          </Link>
        </div>

      </section>
    </div>
  );
}
