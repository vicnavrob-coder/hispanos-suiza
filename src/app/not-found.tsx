import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada — HispanosEnSuiza",
  robots: { index: false, follow: false },
};

const SUGERENCIAS = [
  { href: "/blog/guia-emigrar-suiza-espanoles-2026", label: "Guía para emigrar a Suiza" },
  { href: "/herramientas/salario-neto",              label: "Calculadora de salario neto" },
  { href: "/herramientas/comparador-ciudades",       label: "Comparador de ciudades" },
  { href: "/blog",                                   label: "Todas las guías" },
];

export default function NotFound() {
  return (
    <div
      className="min-h-[70vh] flex items-center justify-center px-6 py-20"
      style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
    >
      <div className="max-w-lg w-full text-center">

        {/* Número grande */}
        <div
          className="text-[120px] font-black leading-none mb-2 select-none"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#E8E5E0" }}
        >
          404
        </div>

        <div className="text-3xl mb-1">🇨🇭</div>

        <h1
          className="text-2xl font-bold text-[#0A0A0A] mb-3"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Esta página no existe
        </h1>
        <p className="text-[#6B7280] text-sm leading-relaxed mb-8">
          La URL que buscas no existe o ha cambiado de dirección.<br />
          Puede que el enlace esté desactualizado.
        </p>

        {/* CTA principal */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all hover:opacity-90 mb-8"
          style={{ background: "#C8102E" }}
        >
          ← Volver al inicio
        </Link>

        {/* Sugerencias */}
        <div
          className="rounded-2xl p-5 text-left"
          style={{ background: "#F8F6F3", border: "1px solid #E8E5E0" }}
        >
          <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
            Quizás buscabas…
          </p>
          <ul className="space-y-2">
            {SUGERENCIAS.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="text-sm text-[#374151] hover:text-[#C8102E] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#C8102E]">→</span>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
