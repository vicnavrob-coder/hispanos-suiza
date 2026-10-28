import type { Metadata } from "next";
import { buildMetadata, BASE_URL, webAppSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Calculadora de salario neto en Suiza 2026 — Cuánto cobrarás realmente",
  description:
    "Calcula tu salario neto en Suiza. Deducciones de AVS, seguro de desempleo, pensión (BVG), impuestos por cantón y seguro médico. Descubre cuánto te quedará realmente de tu sueldo bruto.",
  path: "/herramientas/salario-neto",
  keywords: [
    "salario neto suiza",
    "calculadora sueldo suiza",
    "impuestos suiza",
    "deducciones suiza",
    "avs suiza",
    "bvg suiza",
    "sueldo bruto neto suiza",
    "cuanto se cobra en suiza",
    "calculadora salario suiza 2026",
  ],
});

export default function SalarioNetoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Herramientas", url: `${BASE_URL}/herramientas` },
      { name: "Calculadora salario neto", url: `${BASE_URL}/herramientas/salario-neto` },
    ]),
    webAppSchema({
      name: "Calculadora de salario neto en Suiza",
      description: "Calcula tu sueldo neto real en Suiza con deducciones de AVS, BVG, impuestos y seguro médico.",
      path: "/herramientas/salario-neto",
      applicationCategory: "FinanceApplication",
    }),
    faqSchema([
      { pregunta: "¿Cuánto se descuenta del salario bruto en Suiza?", respuesta: "En Suiza se descuenta aproximadamente entre 12% y 18% del salario bruto, dependiendo del cantón. Incluye AVS (5.3%), seguro de desempleo (1.1%), accidentes (~1%), BVG/pensión (~7%) e impuesto a la fuente (variable por cantón)." },
      { pregunta: "¿Qué es el AVS en Suiza?", respuesta: "El AVS (AHV en alemán) es el sistema de pensiones del primer pilar en Suiza. Se descuenta el 5.3% del salario bruto y proporciona una pensión básica al jubilarse." },
      { pregunta: "¿Cuál es el cantón con menos impuestos en Suiza?", respuesta: "Zug es el cantón con la tasa impositiva más baja de Suiza (alrededor del 8.8%), seguido de Schwyz y Nidwalden. Los cantones más caros son Ginebra y Vaud con tasas superiores al 13%." },
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
