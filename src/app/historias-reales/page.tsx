import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema } from "@/lib/seo";
import { getHistorias } from "@/lib/historias-comunidad";
import HistoriasFeed from "@/components/HistoriasFeed";
import HistoriaCard from "@/components/HistoriaCard";

export const metadata: Metadata = buildMetadata({
  title: "Historias reales — Comunidad de hispanohablantes en Suiza",
  description: "Historias reales de españoles y latinoamericanos que viven en Suiza. Comparte tu experiencia y lee lo que otros han vivido.",
  path: "/historias-reales",
  ogImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "historias reales suiza", "experiencias españoles suiza", "vivir en suiza testimonios",
    "comunidad hispana suiza", "expatriados suiza experiencias",
  ],
});

// Historias destacadas (ejemplos)
const historiasDestacadas = [
  {
    nombre: "Carlos G.",
    origen: "Valencia, España",
    ciudad: "Zúrich",
    trabajo: "Ingeniero de software",
    anio: "2024",
    resumen: "Llegué sin hablar alemán, con un contrato de trabajo y €2.000 en el bolsillo.",
    extracto: "El mayor error fue no contratar el seguro médico la primera semana. Pensé que tenía 3 meses, pero si tienes cualquier problema de salud, la aseguradora aplica retroactividad.",
    tags: ["seguro médico", "Zúrich"],
  },
  {
    nombre: "María F.",
    origen: "Bogotá, Colombia",
    ciudad: "Ginebra",
    trabajo: "Traductora freelance",
    anio: "2023",
    resumen: "Vine con visa de turista, conseguí trabajo en 6 semanas y regularicé mi situación.",
    extracto: "Muchos me decían que era imposible regularizarse una vez dentro. No es verdad, pero hay que hacerlo muy bien.",
    tags: ["latinoamericana", "Ginebra", "visado"],
  },
];

export default async function HistoriasRealesPage() {
  const historiasComunidad = await getHistorias() ?? [];

  const schema = breadcrumbSchema([
    { name: "Inicio", url: BASE_URL },
    { name: "Historias reales", url: `${BASE_URL}/historias-reales` },
  ]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Historias de la comunidad</h1>
        <p className="text-gray-500 text-sm">
          Experiencias reales de hispanohablantes en Suiza. Comparte la tuya.
        </p>
      </div>

      {/* Feed principal - Muro tipo Facebook */}
      <HistoriasFeed initialHistorias={historiasComunidad} />

      {/* Separador */}
      <div className="my-10 flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-sm text-gray-400">Historias destacadas</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Historias destacadas (ejemplos) */}
      <div className="space-y-4">
        {historiasDestacadas.map((historia, i) => (
          <HistoriaCard key={`destacada-${i}`} historia={historia} variant="compact" />
        ))}
      </div>
    </div>
  );
}
