import type { Metadata } from "next";
import { buildMetadata, BASE_URL, webAppSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Comparador de salarios por profesión en Suiza 2026 — Cuánto se gana",
  description: "Compara salarios por sector y experiencia en Zúrich, Ginebra, Berna, Basilea, Lausana y Lugano. IT, sanidad, construcción, hostelería y más.",
  path: "/herramientas/comparador-salarios",
  keywords: [
    "salario suiza por profesion",
    "cuanto gana un informatico suiza",
    "salario medio suiza sector",
    "comparador salarios suiza ciudad",
  ],
});

export default function ComparadorSalariosLayout({ children }: { children: React.ReactNode }) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Herramientas", url: `${BASE_URL}/herramientas` },
      { name: "Comparador de salarios", url: `${BASE_URL}/herramientas/comparador-salarios` },
    ]),
    webAppSchema({
      name: "Comparador de salarios por profesión en Suiza",
      description: "Compara salarios por sector y experiencia en las 6 principales ciudades suizas.",
      path: "/herramientas/comparador-salarios",
      applicationCategory: "FinanceApplication",
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
