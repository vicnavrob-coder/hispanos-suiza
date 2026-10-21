import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Recursos Gratuitos para Vivir en Suiza — Guías y Herramientas",
  description: "Descarga guías gratuitas en español para vivir en Suiza: checklist primer mes, guía de salarios, calculadoras y más. Todo lo que necesitas para tu nueva vida.",
  path: "/recursos",
  keywords: [
    "guias gratis suiza español",
    "recursos vivir suiza",
    "checklist mudarse suiza",
    "guia salarios suiza",
    "herramientas emigrar suiza",
    "descargas gratuitas suiza",
  ],
});

const recursos = [
  {
    titulo: "Checklist: Tu Primer Mes",
    descripcion: "25 tareas esenciales organizadas por categoría para que no se te olvide nada en tu primer mes en Suiza.",
    icono: "📋",
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-50",
    href: "/recursos/primer-mes",
    tags: ["Gratis", "PDF"],
  },
  {
    titulo: "Guía de Salarios 2026",
    descripcion: "Salarios reales por sector y puesto: IT, Sanidad, Finanzas, Hostelería y Construcción. +25 puestos.",
    icono: "💰",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    href: "/recursos/guia-salarios",
    tags: ["Gratis", "Actualizado"],
  },
];

const herramientas = [
  {
    titulo: "Calculadora Salario Neto",
    descripcion: "Calcula cuánto te queda después de impuestos y deducciones obligatorias.",
    icono: "🧮",
    href: "/herramientas/salario-neto",
  },
  {
    titulo: "Calculadora Coste de Vida",
    descripcion: "Compara el coste de vida entre ciudades suizas y planifica tu presupuesto.",
    icono: "📊",
    href: "/herramientas/coste-vida",
  },
];

export default function RecursosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F6F3] to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0032A0] to-[#C8102E] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            Recursos Gratuitos
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Guías, checklists y herramientas en español para facilitar tu vida en Suiza.
            Todo creado por hispanohablantes que ya pasaron por esto.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Lead Magnets */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Guías descargables
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {recursos.map((recurso, i) => (
              <Link
                key={i}
                href={recurso.href}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-2 bg-gradient-to-r ${recurso.color}`} />
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 ${recurso.bgColor} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                      {recurso.icono}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {recurso.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#0032A0] transition-colors">
                        {recurso.titulo}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {recurso.descripcion}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm font-semibold text-[#0032A0]">
                    Descargar gratis
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Herramientas */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Herramientas online
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {herramientas.map((herramienta, i) => (
              <Link
                key={i}
                href={herramienta.href}
                className="group flex items-center gap-4 bg-white rounded-xl p-4 shadow hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                  {herramienta.icono}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0032A0] transition-colors">
                    {herramienta.titulo}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {herramienta.descripcion}
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0032A0] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Premium */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200 text-center">
          <span className="inline-block bg-amber-200 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
            PREMIUM
          </span>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            ¿Quieres acceso a todo?
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Con la suscripción premium tienes acceso ilimitado a todas las herramientas,
            calculadoras avanzadas, y soporte personalizado.
          </p>
          <Link
            href="/precios"
            className="inline-block px-6 py-3 bg-[#C8102E] text-white font-bold rounded-xl hover:opacity-90 transition"
          >
            Ver planes premium →
          </Link>
        </section>
      </div>
    </div>
  );
}
