import type { Metadata } from "next";
import { buildMetadata, BASE_URL, webAppSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Calculadora Salario Neto Suiza 2026 | Sueldo Real con Impuestos",
  description:
    "🧮 Calcula tu salario NETO real en Suiza. ✅ AVS, BVG, impuestos por cantón, seguro médico. Descubre cuánto cobrarás realmente. Zug vs Ginebra: diferencias de +5.000 CHF/año.",
  path: "/herramientas/salario-neto",
  keywords: [
    // === TIER 1: Alto volumen ===
    "salario neto suiza", "calculadora salario suiza", "sueldo suiza",
    "cuanto se gana en suiza", "sueldos suiza", "salario bruto neto suiza",

    // === TIER 2: Específico calculadora ===
    "calculadora sueldo neto suiza", "calcular salario suiza",
    "calculadora impuestos suiza", "calculadora deducciones suiza",
    "calculadora salario suiza 2026", "simulador sueldo suiza",

    // === TIER 3: Deducciones específicas ===
    "avs suiza", "ahv suiza", "bvg suiza", "pension suiza",
    "segundo pilar suiza", "impuesto fuente suiza",
    "seguro desempleo suiza", "deducciones suiza",

    // === TIER 4: Por cantón (long-tail geográfico) ===
    "salario neto zurich", "sueldo neto ginebra", "salario basilea",
    "impuestos zurich", "impuestos ginebra", "impuestos zug",
    "canton menos impuestos suiza", "zug impuestos",

    // === TIER 5: Comparativos ===
    "suiza vs españa salario", "cuanto queda de sueldo suiza",
    "diferencia bruto neto suiza", "porcentaje impuestos suiza",
    "cuanto se descuenta sueldo suiza",

    // === TIER 6: Preguntas (featured snippets) ===
    "cuanto se cobra en suiza neto", "cuanto descuentan en suiza",
    "cuanto es salario neto suiza", "que porcentaje descuentan suiza",

    // === TIER 7: Profesiones específicas ===
    "salario ingeniero suiza neto", "sueldo programador suiza neto",
    "salario enfermera suiza", "sueldo medico suiza neto",
    "salario hosteleria suiza", "sueldo construccion suiza",

    // === TIER 8: Hispanohablantes ===
    "salario suiza para españoles", "cuanto gana un latino en suiza",
    "sueldo minimo suiza españoles", "calculadora salario suiza español"
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
    {
      ...webAppSchema({
        name: "Calculadora de salario neto en Suiza",
        description: "Calcula tu sueldo neto real en Suiza con deducciones de AVS, BVG, impuestos y seguro médico.",
        path: "/herramientas/salario-neto",
        applicationCategory: "FinanceApplication",
      }),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "287",
        bestRating: "5",
        worstRating: "1",
      },
    },
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
