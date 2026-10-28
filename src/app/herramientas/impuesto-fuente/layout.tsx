import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema, webAppSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Calculadora impuesto a la fuente Suiza 2026 — Quellensteuer por cantón",
  description:
    "Calcula el Quellensteuer (impuesto a la fuente) según tu cantón, estado civil, número de hijos y salario bruto. Herramienta gratuita para extranjeros sin permiso C en Suiza.",
  path: "/herramientas/impuesto-fuente",
  ogImage:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "impuesto a la fuente suiza",
    "quellensteuer calculadora",
    "calculadora quellensteuer suiza",
    "impuesto fuente extranjeros suiza",
    "quellensteuer canton zurich",
    "quellensteuer canton ginebra",
    "impuesto retencion suiza 2026",
    "quellensteuer espanoles suiza",
    "permiso b impuesto suiza",
    "calculo impuesto fuente suiza",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Herramientas", url: `${BASE_URL}/herramientas` },
      { name: "Calculadora impuesto a la fuente", url: `${BASE_URL}/herramientas/impuesto-fuente` },
    ]),
    webAppSchema({
      name: "Calculadora impuesto a la fuente Suiza 2026",
      description: "Calcula el Quellensteuer según cantón, estado civil, hijos y salario bruto.",
      path: "/herramientas/impuesto-fuente",
      applicationCategory: "FinanceApplication",
    }),
    faqSchema([
      { pregunta: "¿Qué es el Quellensteuer o impuesto a la fuente?", respuesta: "El Quellensteuer es un impuesto que se retiene directamente del salario de trabajadores extranjeros sin permiso C en Suiza. Lo descuenta el empleador y varía según el cantón, estado civil y número de hijos." },
      { pregunta: "¿Quién paga el impuesto a la fuente en Suiza?", respuesta: "Pagan el impuesto a la fuente los trabajadores extranjeros con permiso B, L o G que no tienen el permiso de establecimiento (permiso C). Una vez obtienes el permiso C, pasas a declarar impuestos como los suizos." },
      { pregunta: "¿Cómo puedo recuperar parte del Quellensteuer?", respuesta: "Puedes solicitar una corrección del impuesto a la fuente si tienes gastos deducibles como el tercer pilar (3a), gastos de formación, o contribuciones a la pensión. Debes solicitarlo antes del 31 de marzo del año siguiente." },
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
