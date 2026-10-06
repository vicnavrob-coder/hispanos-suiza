import type { Metadata } from "next";
import { buildMetadata, BASE_URL, webAppSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Calculadora de seguros médicos en Suiza — KVG y suplementarios",
  description: "Calcula el coste de tu seguro médico obligatorio (KVG/LAMal) en Suiza por cantón, edad y franquicia. Compara aseguradoras y ahorra hasta 1.200 CHF al año.",
  path: "/seguros",
  keywords: [
    "seguro medico suiza calculadora", "kvg suiza precio", "lamal suiza coste",
    "comparar seguros suiza", "seguro salud suiza extranjero",
    "cuanto cuesta seguro medico suiza", "krankenversicherung suiza",
    "seguro obligatorio suiza hispanohablante",
  ],
});

export default function SegurosLayout({ children }: { children: React.ReactNode }) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio",          url: BASE_URL },
      { name: "Seguro médico",   url: `${BASE_URL}/seguros` },
    ]),
    webAppSchema({
      name: "Calculadora de seguro médico suizo (KVG/LAMal)",
      description: "Calcula tu prima de seguro médico obligatorio en Suiza por cantón, edad y franquicia. Compara aseguradoras.",
      path: "/seguros",
      applicationCategory: "HealthApplication",
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
