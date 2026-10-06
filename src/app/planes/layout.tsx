import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Planes y excursiones en Suiza — Qué hacer y ver 2026",
  description: "Descubre las mejores excursiones, rutas de senderismo, esquí y actividades en los 26 cantones de Suiza. Guía completa para hispanohablantes.",
  path: "/planes",
  keywords: [
    "excursiones suiza", "planes suiza hispanohablantes", "senderismo suiza",
    "que hacer en suiza", "turismo suiza español", "actividades suiza",
    "rutas suiza", "visitar suiza", "escapadas suiza",
  ],
});

export default function PlanesLayout({ children }: { children: React.ReactNode }) {
  const schema = breadcrumbSchema([
    { name: "Inicio",                  url: BASE_URL },
    { name: "Planes y excursiones",    url: `${BASE_URL}/planes` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
