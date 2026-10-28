import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema, webAppSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Traductor de CV al alemán 2026 — Lebenslauf formato suizo gratis",
  description:
    "Traduce tu currículum al alemán y adáptalo al formato suizo. Sube tu CV en español y descarga un Lebenslauf profesional listo para el mercado laboral suizo. Primera traducción gratis.",
  path: "/herramientas/traductor-cv",
  keywords: [
    "traducir cv aleman",
    "curriculum vitae suiza",
    "lebenslauf español aleman",
    "cv formato suizo",
    "traductor curriculum aleman",
    "cv trabajo suiza",
    "adaptar cv suiza",
    "curriculum aleman plantilla",
    "lebenslauf online gratis",
    "cv aleman traduccion",
  ],
});

export default function TraductorCVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Herramientas", url: `${BASE_URL}/herramientas` },
      { name: "Traductor de CV", url: `${BASE_URL}/herramientas/traductor-cv` },
    ]),
    webAppSchema({
      name: "Traductor de CV español a alemán - Formato suizo",
      description: "Traduce y adapta tu CV al formato Lebenslauf suizo profesional. Sube PDF o Word y descarga tu CV en alemán.",
      path: "/herramientas/traductor-cv",
      applicationCategory: "BusinessApplication",
    }),
    faqSchema([
      { pregunta: "¿Cómo es el formato de CV en Suiza?", respuesta: "El CV suizo (Lebenslauf) sigue el formato cronológico inverso con foto, datos personales completos (incluyendo fecha de nacimiento y nacionalidad), experiencia detallada y niveles de idiomas según el Marco Europeo (A1-C2)." },
      { pregunta: "¿Necesito traducir mi CV al alemán para trabajar en Suiza?", respuesta: "Depende de la región. En la Suiza alemana (Zúrich, Berna, Basilea) sí es muy recomendable tener el CV en alemán. En Ginebra y Lausana puedes usar francés, y en Lugano italiano." },
      { pregunta: "¿Cuánto cuesta traducir un CV al alemán?", respuesta: "Tu primer CV es gratis con nuestra herramienta. Para traducciones adicionales puedes suscribirte por 9.90 CHF/mes (ilimitado) o pagar 4.90 CHF por traducción individual." },
      { pregunta: "¿Qué diferencia hay entre un CV español y un Lebenslauf suizo?", respuesta: "El Lebenslauf suizo incluye foto profesional, fecha de nacimiento, nacionalidad, estado civil y niveles de idioma certificados. Es más formal y detallado que el CV español típico." },
    ]),
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
