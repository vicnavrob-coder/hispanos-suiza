import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Planes y Excursiones en Suiza 2026 | 26 cantones | HispanosEnSuiza",
  description:
    "Descubre los mejores planes en Suiza: senderismo, lagos alpinos, teleféricos, esquí, cultura y gastronomía. 200+ actividades en los 26 cantones con precios, cómo llegar en tren y consejos prácticos.",
  path: "/planes",
  keywords: [
    "planes suiza",
    "excursiones suiza",
    "senderismo suiza",
    "que hacer suiza",
    "lagos suiza",
    "montañas suiza",
    "teleféricos suiza",
    "esqui suiza",
    "turismo suiza español",
    "actividades suiza",
    "rutas suiza",
  ],
});

export default function PlanesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Planes y excursiones", url: `${BASE_URL}/planes` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Planes y Excursiones en Suiza",
      description: "Guía completa de actividades, rutas y excursiones en los 26 cantones suizos",
      url: `${BASE_URL}/planes`,
      inLanguage: "es",
      isPartOf: {
        "@type": "WebSite",
        name: "HispanosEnSuiza",
        url: BASE_URL,
      },
    },
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
