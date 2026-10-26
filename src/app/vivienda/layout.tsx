import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar piso en Suiza | Portales de vivienda | HispanosEnSuiza",
  description:
    "Encuentra piso de alquiler en Suiza. Buscador con ofertas de Homegate, ImmoScout24, Flatfox y más. Estudios, pisos compartidos (WG) y apartamentos en Zúrich, Ginebra, Basilea y toda Suiza.",
  keywords: [
    "alquiler suiza",
    "piso suiza",
    "vivienda suiza",
    "wg suiza",
    "piso compartido suiza",
    "homegate",
    "flatfox",
    "alquiler zurich",
    "alquiler ginebra",
  ],
  alternates: {
    canonical: "https://hispanosensui.za/vivienda",
  },
  openGraph: {
    title: "Buscar Piso en Suiza | HispanosEnSuiza",
    description:
      "Encuentra alquiler en Suiza. Buscador con ofertas de Homegate, ImmoScout24, Flatfox y portales WG.",
    url: "https://hispanosensui.za/vivienda",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buscar Piso en Suiza | HispanosEnSuiza",
    description:
      "Encuentra alquiler en Suiza. Estudios, pisos y WG en toda Suiza.",
  },
};

export default function ViviendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
