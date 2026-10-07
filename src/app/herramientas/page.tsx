import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata, BASE_URL, breadcrumbSchema, itemListSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Herramientas gratuitas para vivir en Suiza — Calculadoras y comparadores",
  description: "Calculadoras y herramientas gratuitas para hispanohablantes en Suiza: salario neto por cantón, comparador de seguros médicos, comparador de ciudades y más.",
  path: "/herramientas",
  ogImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "herramientas suiza", "calculadora suiza gratis", "calculadora salario suiza",
    "comparador seguros suiza", "herramientas expat suiza",
    "calculadora impuestos suiza", "coste vida suiza calculadora",
    "salario neto suiza 2026",
  ],
});

const herramientas = [
  {
    icono: "💰",
    titulo: "Calculadora de salario neto suizo",
    descripcion: "Introduce tu salario bruto y calcula exactamente cuánto recibirás después de impuestos, AVS, seguro de desempleo y demás deducciones. Válido para todos los cantones.",
    estado: "disponible",
    href: "/herramientas/salario-neto",
    color: "bg-green-50 border-green-200",
    btnColor: "bg-green-700",
  },
  {
    icono: "🏙️",
    titulo: "Comparador de coste de vida por ciudad",
    descripcion: "Compara Zúrich, Ginebra, Berna, Basilea, Lausana y Lugano. Alquiler, transporte, comida y ocio. ¿Cuánto necesitas ganar en cada ciudad para vivir igual?",
    estado: "disponible",
    href: "/herramientas/comparador-ciudades",
    color: "bg-blue-50 border-blue-200",
    btnColor: "bg-blue-700",
  },
  {
    icono: "🛡️",
    titulo: "Guía seguros médicos (KVG/LAMal)",
    descripcion: "El seguro de salud es obligatorio en Suiza. Guía completa: aseguradoras, franquicias, modelos de acceso y cómo ahorrar hasta 1.200 CHF al año.",
    estado: "disponible",
    href: "/herramientas/seguros-medicos",
    color: "bg-purple-50 border-purple-200",
    btnColor: "bg-purple-700",
  },
  {
    icono: "🏠",
    titulo: "Calculadora de fianza de alquiler",
    descripcion: "Calcula cuánto necesitas ahorrar para la fianza, los primeros meses y el seguro de hogar antes de firmar un contrato de alquiler en Suiza.",
    estado: "próximamente",
    href: "#",
    color: "bg-orange-50 border-orange-200",
    btnColor: "bg-orange-700",
  },
];

export default function HerramientasPage() {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Herramientas", url: `${BASE_URL}/herramientas` },
    ]),
    itemListSchema(
      herramientas
        .filter(h => h.estado === "disponible")
        .map(h => ({
          name: h.titulo,
          url: `${BASE_URL}${h.href}`,
          description: h.descripcion,
        }))
    ),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Herramientas gratuitas</h1>
        <p className="text-gray-500">
          Calculadoras y comparadores que no existen en español para ayudarte a tomar las mejores decisiones en Suiza.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {herramientas.map((h) => (
          <div key={h.titulo} className={`border rounded-2xl p-6 ${h.color}`}>
            <div className="text-3xl mb-3">{h.icono}</div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-bold text-gray-800">{h.titulo}</h2>
              {h.estado === "próximamente" && (
                <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">Pronto</span>
              )}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{h.descripcion}</p>
            {h.estado === "disponible" ? (
              <Link
                href={h.href}
                className={`inline-block ${h.btnColor} text-white text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity`}
              >
                Usar herramienta →
              </Link>
            ) : (
              <span className="inline-block bg-gray-200 text-gray-400 text-sm px-4 py-2 rounded-full cursor-not-allowed">
                Próximamente
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
