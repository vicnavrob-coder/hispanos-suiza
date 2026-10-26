import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar trabajo en Suiza | 8 fuentes + 13 ETTs | HispanosEnSuiza",
  description:
    "Buscador de empleo en Suiza para hispanohablantes. Ofertas en tiempo real de jobs.ch, LinkedIn, JobScout24, Jobup, RAV job-room, Adzuna y agencias ETT. Sectores: construcción, hostelería, electricidad, limpieza, logística y más.",
  keywords: [
    "trabajo en suiza",
    "empleo suiza",
    "trabajar en suiza",
    "ofertas de trabajo suiza",
    "ETT suiza",
    "agencias temporales suiza",
    "jobs.ch",
    "empleo hispanohablantes suiza",
  ],
  alternates: {
    canonical: "https://hispanosensui.za/trabajo",
  },
  openGraph: {
    title: "Buscador de Trabajo en Suiza | HispanosEnSuiza",
    description:
      "Encuentra empleo en Suiza. 8 fuentes de ofertas en tiempo real + 13 agencias ETT. Construcción, hostelería, electricidad, logística y más.",
    url: "https://hispanosensui.za/trabajo",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buscador de Trabajo en Suiza | HispanosEnSuiza",
    description:
      "Encuentra empleo en Suiza. 8 fuentes de ofertas en tiempo real + 13 agencias ETT.",
  },
};

export default function TrabajoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
