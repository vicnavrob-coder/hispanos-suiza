import type { Metadata } from "next";
import { buildMetadata, BASE_URL, webAppSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Buscador de pisos y vivienda en Suiza — Para hispanohablantes",
  description: "Busca pisos y vivienda en alquiler en Suiza. Accede a los mejores portales inmobiliarios suizos: Homegate, ImmoScout24, Flatfox y más. Guía en español.",
  path: "/vivienda",
  ogImage: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "pisos alquiler suiza", "buscar piso suiza", "vivienda suiza hispanohablantes",
    "alquilar piso suiza", "homegate suiza", "flatfox suiza", "immoScout suiza",
    "piso compartido suiza", "kaution alquiler suiza", "betreibungsregister suiza",
    "cómo alquilar piso suiza extranjero", "wg zimmer suiza",
  ],
});

export default function ViviendaLayout({ children }: { children: React.ReactNode }) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio",           url: BASE_URL },
      { name: "Buscar vivienda",  url: `${BASE_URL}/vivienda` },
    ]),
    webAppSchema({
      name: "Buscador de vivienda en Suiza",
      description: "Busca pisos en alquiler en Suiza. Resultados en tiempo real de flatfox.ch más acceso directo a Homegate, ImmoScout24 y más.",
      path: "/vivienda",
      applicationCategory: "BusinessApplication",
    }),
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
