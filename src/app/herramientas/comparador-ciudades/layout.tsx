import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparador de ciudades en Suiza | HispanosEnSuiza",
  description:
    "Compara ciudades suizas: coste de vida, alquiler, transporte, salarios e impuestos. Encuentra la mejor ciudad para vivir en Suiza según tu situación.",
  keywords: [
    "comparador ciudades suiza",
    "coste de vida suiza",
    "mejor ciudad suiza",
    "donde vivir en suiza",
    "zurich vs ginebra",
    "alquiler ciudades suiza",
    "impuestos por canton",
  ],
  alternates: {
    canonical: "https://hispanosensui.za/herramientas/comparador-ciudades",
  },
  openGraph: {
    title: "Comparador de Ciudades Suizas | HispanosEnSuiza",
    description:
      "Compara coste de vida, alquiler e impuestos entre ciudades suizas.",
    url: "https://hispanosensui.za/herramientas/comparador-ciudades",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comparador de Ciudades | Suiza",
    description:
      "Encuentra la mejor ciudad para vivir en Suiza según tu situación.",
  },
};

export default function ComparadorCiudadesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
