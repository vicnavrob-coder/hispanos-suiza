import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Buscador de pisos y vivienda en Suiza — Para hispanohablantes",
  description: "Busca pisos y vivienda en alquiler en Suiza. Accede a los mejores portales inmobiliarios suizos: Homegate, ImmoScout24, Flatfox y más. Guía en español.",
  path: "/vivienda",
  keywords: [
    "pisos alquiler suiza", "buscar piso suiza", "vivienda suiza hispanohablantes",
    "alquilar piso suiza", "homegate suiza", "flatfox suiza", "immoScout suiza",
    "apartamento suiza espanol",
  ],
});

export default function ViviendaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
