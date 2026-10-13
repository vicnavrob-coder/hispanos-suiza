import type { Metadata } from "next";
import { buildMetadata, BASE_URL, webAppSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Calculadora salario neto por hora en Suiza 2026 — AVS, BVG e Impuestos",
  description: "Calcula tu salario neto mensual en Suiza desde tu precio por hora. Descuenta AVS/AHV, desempleo, accidentes, BVG (2º pilar) e impuesto a la fuente por cantón.",
  path: "/herramientas/salario-neto",
  keywords: [
    "calculadora salario neto suiza", "salario por hora suiza", "precio hora trabajo suiza",
    "calculadora precio hora neto suiza", "salario neto suiza 2026", "avs bvg suiza calculo",
    "impuesto fuente suiza canton", "salario bruto neto suiza", "cuanto gano en suiza neto",
    "salario neto mensual suiza", "calculadora sueldo suiza por horas",
  ],
});

export default function SalarioNetoLayout({ children }: { children: React.ReactNode }) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Herramientas", url: `${BASE_URL}/herramientas` },
      { name: "Calculadora de salario neto", url: `${BASE_URL}/herramientas/salario-neto` },
    ]),
    webAppSchema({
      name: "Calculadora de salario neto por hora en Suiza",
      description: "Calcula tu salario neto mensual en Suiza desde tu precio por hora. Descuenta AVS, desempleo, accidentes, BVG e impuesto a la fuente por cantón.",
      path: "/herramientas/salario-neto",
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
