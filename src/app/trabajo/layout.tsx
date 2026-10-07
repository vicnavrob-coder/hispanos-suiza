import type { Metadata } from "next";
import { buildMetadata, BASE_URL, webAppSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Buscador de trabajo en Suiza para hispanohablantes",
  description: "Encuentra ofertas de trabajo en Suiza en español. Busca por sector y ciudad en jobs.ch y LinkedIn: tecnología, sanidad, construcción, hostelería y más.",
  path: "/trabajo",
  ogImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "trabajo suiza hispanohablantes", "ofertas empleo suiza español",
    "buscar trabajo suiza", "empleo suiza español", "trabajo suiza linkedin",
    "trabajar suiza desde españa", "trabajo suiza latinoamericano",
    "jobs.ch español", "trabajo suiza sin hablar alemán",
    "salario trabajo suiza 2026", "visa trabajo suiza",
  ],
});

export default function TrabajoLayout({ children }: { children: React.ReactNode }) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio",          url: BASE_URL },
      { name: "Buscar trabajo",  url: `${BASE_URL}/trabajo` },
    ]),
    webAppSchema({
      name: "Buscador de trabajo en Suiza",
      description: "Busca ofertas de trabajo en Suiza por sector y ciudad. Resultados en tiempo real de jobs.ch y LinkedIn.",
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
