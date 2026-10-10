import type { Metadata } from "next";
import { buildMetadata, BASE_URL } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Buscador de trabajo en Suiza para españoles y latinoamericanos 2026",
  description: "Busca trabajo en Suiza por sector y ciudad. Accede a los mejores portales de empleo suizos, agencias de trabajo temporal y ofertas directas. Guía en español.",
  path: "/trabajo/buscador",
  ogImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "buscador trabajo suiza", "trabajo suiza español", "empleo suiza hispanohablantes",
    "portales empleo suiza", "agencias trabajo temporal suiza", "ofertas trabajo suiza 2026",
    "trabajar suiza sin alemán", "trabajo suiza latinoamericanos",
  ],
});

export default function BuscadorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
