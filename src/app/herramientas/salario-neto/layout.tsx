import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de salario neto en Suiza | HispanosEnSuiza",
  description:
    "Calcula tu salario neto en Suiza. Deducciones de AVS, seguro de desempleo, pensión (BVG), impuestos por cantón y seguro médico. Descubre cuánto te quedará realmente de tu sueldo bruto.",
  keywords: [
    "salario neto suiza",
    "calculadora sueldo suiza",
    "impuestos suiza",
    "deducciones suiza",
    "avs suiza",
    "bvg suiza",
    "sueldo bruto neto suiza",
    "cuanto se cobra en suiza",
  ],
  alternates: {
    canonical: "https://hispanosensui.za/herramientas/salario-neto",
  },
  openGraph: {
    title: "Calculadora de Salario Neto en Suiza | HispanosEnSuiza",
    description:
      "Calcula cuánto te quedará de tu sueldo en Suiza después de impuestos y cotizaciones.",
    url: "https://hispanosensui.za/herramientas/salario-neto",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Salario Neto | Suiza",
    description:
      "Descubre tu salario real en Suiza después de impuestos y cotizaciones.",
  },
};

export default function SalarioNetoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
