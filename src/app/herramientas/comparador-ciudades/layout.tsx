import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema, webAppSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Comparador de ciudades suizas — Coste de vida 2026",
  description: "Compara el coste de vida en Zúrich, Ginebra, Berna, Basilea, Lausana, Lugano, Lucerna, Zug, Winterthur, Baar y Cham. Alquiler, impuestos, seguros y salarios. ¿Cuánto necesitas ganar en cada ciudad?",
  path: "/herramientas/comparador-ciudades",
  keywords: [
    "comparador ciudades suizas", "coste vida zurich ginebra", "ciudad mas barata suiza",
    "zurich vs ginebra coste vida", "vivir en zug suiza", "impuestos canton zug",
    "baar cham zug suiza", "lucerna suiza vivir", "winterthur vs zurich coste vida",
    "alquiler zurich ginebra berna", "cuanto cuesta vivir zurich 2026",
  ],
});

export default function ComparadorLayout({ children }: { children: React.ReactNode }) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Herramientas", url: `${BASE_URL}/herramientas` },
      { name: "Comparador de ciudades", url: `${BASE_URL}/herramientas/comparador-ciudades` },
    ]),
    webAppSchema({
      name: "Comparador de coste de vida en ciudades suizas",
      description: "Herramienta gratuita para comparar el coste de vida entre las principales ciudades de Suiza.",
      path: "/herramientas/comparador-ciudades",
      applicationCategory: "FinanceApplication",
    }),
    faqSchema([
      {
        pregunta: "¿Cuál es la ciudad más barata para vivir en Suiza?",
        respuesta: "Lugano (Ticino) y Cham son las más asequibles, con alquileres desde 1.100–1.350 CHF/mes para un piso de 1 habitación. Lucerna y Berna son buenas opciones intermedias. Zug, Zúrich y Ginebra son las más caras.",
      },
      {
        pregunta: "¿Dónde se pagan menos impuestos en Suiza?",
        respuesta: "El cantón Zug tiene los impuestos más bajos de Suiza (≈11.5%). Baar, Cham y Zug ciudad comparten esa tasa. Basilea-Ciudad también es muy competitiva (11.5%). Ginebra tiene los impuestos más altos (13.2%).",
      },
      {
        pregunta: "¿Qué ciudad suiza es mejor para hispanohablantes?",
        respuesta: "Lugano es la más fácil culturalmente (italiano cercano al español). Ginebra y Lausana son ideales si hablas francés. Zúrich y Winterthur ofrecen el mayor mercado laboral y muchas empresas en inglés. Lucerna es perfecta para hostelería y turismo.",
      },
      {
        pregunta: "¿Merece la pena vivir en Baar o Cham en lugar de Zug?",
        respuesta: "Sí. Baar y Cham están en el mismo cantón Zug (mismos impuestos bajos) pero el alquiler es 20-30% más barato que en Zug ciudad. La conexión a Zúrich es de 30-35 minutos en tren. Son opciones muy inteligentes para trabajadores de Zug o Zúrich.",
      },
    ]),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      {children}
    </>
  );
}
