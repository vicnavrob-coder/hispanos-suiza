import type { Metadata } from "next";
import { buildMetadata, webAppSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Trabajo en Suiza para hispanohablantes 2026 — Ofertas por sector y ciudad",
  description: "Busca trabajo en Suiza en español. Ofertas en tiempo real de jobs.ch y LinkedIn filtradas por sector y ciudad: tecnología, sanidad, construcción, limpieza, hostelería y más.",
  path: "/trabajo",
  ogImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "trabajo suiza hispanohablantes", "ofertas empleo suiza español", "buscar trabajo suiza",
    "trabajo suiza por sector", "empleo suiza ciudad", "trabajo suiza 2026",
    "trabajo suiza latinoamericano", "jobs.ch español", "trabajo suiza sin alemán",
    "ofertas trabajo zurich ginebra basilea", "trabajar suiza desde españa",
    "trabajo suiza limpieza construccion hosteleria",
  ],
});

export default function TrabajoLayout({ children }: { children: React.ReactNode }) {
  const schemas = [
    webAppSchema({
      name: "Buscador de trabajo en Suiza para hispanohablantes",
      description: "Busca ofertas de trabajo en Suiza por sector y ciudad con resultados en tiempo real de jobs.ch, LinkedIn y agencias ETT. Filtrado preciso para hispanohablantes.",
      path: "/trabajo",
      applicationCategory: "BusinessApplication",
    }),
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
