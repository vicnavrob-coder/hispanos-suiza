import type { Metadata } from "next";
import { buildMetadata, BASE_URL, webAppSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Calculadora permiso de trabajo Suiza 2026 — L, B, C o G",
  description: "Descubre qué permiso de trabajo te corresponde en Suiza según tu nacionalidad y tipo de contrato. Guía para españoles, latinoamericanos y ciudadanos UE.",
  path: "/herramientas/permiso-trabajo",
  keywords: [
    "permiso trabajo suiza", "calculadora permiso suiza", "permiso b suiza", "permiso l suiza",
    "permiso g suiza", "que permiso necesito suiza", "permiso trabajo español suiza",
    "permiso trabajo latinoamericano suiza 2026",
  ],
});

export default function PermisoTrabajoLayout({ children }: { children: React.ReactNode }) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Herramientas", url: `${BASE_URL}/herramientas` },
      { name: "Calculadora permiso de trabajo", url: `${BASE_URL}/herramientas/permiso-trabajo` },
    ]),
    webAppSchema({
      name: "Calculadora de permiso de trabajo en Suiza",
      description: "Descubre qué permiso de trabajo te corresponde en Suiza según tu nacionalidad y tipo de contrato.",
      path: "/herramientas/permiso-trabajo",
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
