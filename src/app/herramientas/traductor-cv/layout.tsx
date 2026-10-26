import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Traductor de CV al alemán | Formato suizo | HispanosEnSuiza",
  description:
    "Traduce tu currículum al alemán y adáptalo al formato suizo. Sube tu CV en español y descarga un Lebenslauf profesional listo para el mercado laboral suizo.",
  keywords: [
    "traducir cv aleman",
    "curriculum vitae suiza",
    "lebenslauf español aleman",
    "cv formato suizo",
    "traductor curriculum",
    "cv trabajo suiza",
    "adaptar cv suiza",
    "curriculum aleman plantilla",
  ],
  alternates: {
    canonical: "https://hispanosensui.za/herramientas/traductor-cv",
  },
  openGraph: {
    title: "Traductor de CV al Alemán | Formato Suizo",
    description:
      "Traduce y adapta tu CV al formato suizo profesional. Gratis tu primer CV.",
    url: "https://hispanosensui.za/herramientas/traductor-cv",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traductor de CV | Español → Alemán",
    description:
      "Convierte tu currículum español en un Lebenslauf suizo profesional.",
  },
};

export default function TraductorCVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
