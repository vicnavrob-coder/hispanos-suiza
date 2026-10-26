import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seguro médico en Suiza | Comparador y calculadora | HispanosEnSuiza",
  description:
    "Calcula el precio de tu seguro médico obligatorio en Suiza. Comparador de aseguradoras, franquicias y primas por cantón. Guía completa del sistema sanitario suizo para hispanohablantes.",
  keywords: [
    "seguro medico suiza",
    "krankenkasse",
    "seguro obligatorio suiza",
    "lamal suiza",
    "comparador seguros suiza",
    "prima seguro suiza",
    "franquicia seguro suiza",
    "aseguradoras suiza",
  ],
  alternates: {
    canonical: "https://hispanosensui.za/seguros",
  },
  openGraph: {
    title: "Seguro Médico en Suiza | HispanosEnSuiza",
    description:
      "Calcula tu seguro médico obligatorio (LAMal). Comparador por cantón, edad y franquicia.",
    url: "https://hispanosensui.za/seguros",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguro Médico en Suiza | HispanosEnSuiza",
    description:
      "Calcula tu seguro médico obligatorio. Guía completa del sistema sanitario suizo.",
  },
};

export default function SegurosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
