import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Checklist: Tu Primer Mes en Suiza — Descarga Gratis",
  description: "25 tareas esenciales para tu primer mes en Suiza: documentos, vivienda, trabajo, vida diaria e integración. Checklist gratuito en español actualizado 2026.",
  path: "/recursos/primer-mes",
  keywords: [
    "checklist mudarse suiza",
    "primer mes suiza que hacer",
    "tramites llegar suiza",
    "documentos necesarios suiza",
    "registrarse suiza extranjero",
    "cuenta bancaria suiza",
    "seguro medico suiza plazo",
    "guia recien llegados suiza",
  ],
});

const faqs = [
  {
    pregunta: "¿Qué es lo primero que debo hacer al llegar a Suiza?",
    respuesta: "Lo primero es registrarte en el Ayuntamiento (Einwohnerkontrolle/Contrôle des habitants) de tu municipio en los primeros 14 días. Necesitarás pasaporte, contrato de trabajo y contrato de alquiler. Allí inicias el trámite del permiso de residencia.",
  },
  {
    pregunta: "¿Cuánto tiempo tengo para contratar el seguro médico en Suiza?",
    respuesta: "Tienes un plazo máximo de 3 meses desde tu llegada para contratar el seguro médico obligatorio (KVG/LAMal). Si no lo haces, el cantón te asignará uno automáticamente, que suele ser más caro. Recomendamos hacerlo en las primeras 2 semanas.",
  },
  {
    pregunta: "¿Necesito abrir una cuenta bancaria suiza?",
    respuesta: "Sí, es prácticamente imprescindible. Tu empleador depositará el salario en cuenta suiza y muchos servicios requieren IBAN suizo. Los bancos principales son UBS, Credit Suisse, PostFinance, Raiffeisen y cantorales. Algunos ofrecen cuentas online como Neon o Yuh.",
  },
];

export default function PrimerMesLayout({ children }: { children: React.ReactNode }) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Recursos", url: `${BASE_URL}/recursos` },
      { name: "Checklist Primer Mes", url: `${BASE_URL}/recursos/primer-mes` },
    ]),
    faqSchema(faqs),
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
