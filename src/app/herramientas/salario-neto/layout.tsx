import type { Metadata } from "next";
import { buildMetadata, BASE_URL, webAppSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Calculadora de salario neto en Suiza 2026 — Por cantón",
  description: "Calcula tu salario neto en Suiza de forma gratuita. Descuenta AVS/AHV, seguro de desempleo e impuestos por cantón. Válido para todos los cantones suizos.",
  path: "/herramientas/salario-neto",
  keywords: [
    "calculadora salario neto suiza", "salario bruto neto suiza", "sueldos suiza",
    "impuestos suiza extranjero", "ahv avs suiza calculo", "salario neto suiza canton",
    "cuanto gano en suiza neto", "salario minimo suiza 2026",
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
      name: "Calculadora de salario neto suizo",
      description: "Calcula tu salario neto en Suiza descontando AVS, seguro de desempleo e impuestos por cantón.",
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
