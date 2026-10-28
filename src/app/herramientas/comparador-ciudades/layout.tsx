import type { Metadata } from "next";
import { buildMetadata, BASE_URL, webAppSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Comparador de ciudades en Suiza 2026 — Dónde vivir mejor",
  description:
    "Compara ciudades suizas: coste de vida, alquiler, transporte, salarios e impuestos. Encuentra la mejor ciudad para vivir en Suiza según tu situación.",
  path: "/herramientas/comparador-ciudades",
  keywords: [
    "comparador ciudades suiza",
    "coste de vida suiza",
    "mejor ciudad suiza",
    "donde vivir en suiza",
    "zurich vs ginebra",
    "alquiler ciudades suiza",
    "impuestos por canton",
    "ciudad mas barata suiza",
  ],
});

export default function ComparadorCiudadesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Herramientas", url: `${BASE_URL}/herramientas` },
      { name: "Comparador de ciudades", url: `${BASE_URL}/herramientas/comparador-ciudades` },
    ]),
    webAppSchema({
      name: "Comparador de ciudades suizas",
      description: "Compara coste de vida, alquileres, salarios e impuestos entre 11 ciudades de Suiza.",
      path: "/herramientas/comparador-ciudades",
      applicationCategory: "LifestyleApplication",
    }),
    faqSchema([
      { pregunta: "¿Cuál es la ciudad más barata para vivir en Suiza?", respuesta: "Las ciudades más económicas de Suiza son Lugano (cantón Ticino) y ciudades del cantón de Argovia como Aarau. El coste de vida puede ser hasta un 30% menor que en Zúrich o Ginebra." },
      { pregunta: "¿Qué ciudad de Suiza tiene mejor calidad de vida?", respuesta: "Zúrich y Ginebra lideran los rankings mundiales de calidad de vida. Zúrich destaca por seguridad y transporte, mientras Ginebra ofrece un ambiente más internacional." },
      { pregunta: "¿Dónde hay más hispanohablantes en Suiza?", respuesta: "Las mayores comunidades hispanohablantes están en Ginebra (~22.000), Zúrich (~18.000) y Lausana (~12.000). En total hay más de 140.000 hispanohablantes en Suiza." },
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
