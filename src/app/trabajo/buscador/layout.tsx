import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Buscador de trabajo Suiza 2026 — Ofertas reales por sector y ciudad",
  description: "Encuentra ofertas de trabajo reales en Suiza al momento. Busca por sector (IT, sanidad, construcción, limpieza…) y ciudad (Zúrich, Ginebra, Basilea, Lucerna…). Resultados de jobs.ch, LinkedIn y agencias ETT.",
  path: "/trabajo/buscador",
  ogImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "buscador trabajo suiza 2026", "ofertas trabajo suiza tiempo real", "trabajo suiza por sector ciudad",
    "trabajo zurich ginebra basilea lucerna", "trabajo it suiza", "trabajo sanidad suiza",
    "trabajo construccion suiza", "trabajo limpieza suiza", "trabajo hosteleria suiza",
    "agencias trabajo temporal suiza", "jobs.ch ofertas español", "empleo suiza hispanohablantes",
  ],
});

export default function BuscadorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
