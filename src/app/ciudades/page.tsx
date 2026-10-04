import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ciudades } from "@/lib/ciudades";
import { BASE_URL, buildMetadata, breadcrumbSchema, itemListSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Guía de ciudades de Suiza para hispanohablantes — Dónde vivir",
  description: "Compara las principales ciudades de Suiza: Zúrich, Ginebra, Basilea, Berna, Lausana y Lugano. Alquileres, salarios, idioma y comunidad hispanohablante.",
  path: "/ciudades",
  keywords: ["ciudades suiza hispanohablantes", "donde vivir suiza", "mejores ciudades suiza espanoles", "comparar ciudades suiza", "zurich ginebra basilea vivir"],
});

const COSTE_LABEL: Record<string, string> = {
  "muy-alto": "Muy alto",
  "alto": "Alto",
  "moderado": "Moderado",
};
const COSTE_COLOR: Record<string, string> = {
  "muy-alto": "text-red-600",
  "alto": "text-amber-600",
  "moderado": "text-green-600",
};

export default function CiudadesPage() {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Ciudades", url: `${BASE_URL}/ciudades` },
    ]),
    itemListSchema(
      ciudades.map((c) => ({
        name: `Vivir en ${c.nombre}`,
        url: `${BASE_URL}/ciudades/${c.slug}`,
        description: c.descripcion,
      }))
    ),
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        <span aria-hidden>›</span>
        <span className="text-gray-600">Ciudades</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">¿Dónde vivir en Suiza?</h1>
        <p className="text-gray-500 max-w-2xl">
          Guías detalladas sobre las principales ciudades suizas para españoles y latinoamericanos. Alquileres reales, salarios, idioma, barrios y comunidad hispanohablante.
        </p>
      </div>

      {/* Grid de ciudades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {ciudades.map((c) => (
          <Link
            key={c.slug}
            href={`/ciudades/${c.slug}`}
            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-40">
              <Image
                src={c.imagen}
                alt={`${c.nombre}, Suiza`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <div className="flex items-center gap-2">
                  <span>{c.emoji}</span>
                  <span className="font-bold">{c.nombre}</span>
                </div>
                <div className="text-xs text-gray-300">{c.idioma}</div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{c.descripcion}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400">Alquiler estudio</span>
                  <div className="font-semibold text-gray-800">{c.alquilerEstudio}</div>
                </div>
                <div>
                  <span className="text-gray-400">Coste de vida</span>
                  <div className={`font-semibold ${COSTE_COLOR[c.costeVida]}`}>{COSTE_LABEL[c.costeVida]}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Comparador CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold mb-2">¿No sabes cuál elegir?</h2>
        <p className="text-gray-300 text-sm mb-5 max-w-md mx-auto">
          Compara dos ciudades lado a lado: coste de vida, alquiler, impuestos y poder adquisitivo real.
        </p>
        <Link
          href="/herramientas/comparador-ciudades"
          style={{ background: "#C8102E" }}
          className="inline-block text-white font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Comparar ciudades →
        </Link>
      </div>
    </div>
  );
}
