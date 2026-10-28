import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema, webAppSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Seguro médico en Suiza 2026 | Comparador LAMal | HispanosEnSuiza",
  description:
    "Calcula el precio de tu seguro médico obligatorio en Suiza. Comparador de aseguradoras, franquicias y primas por cantón. Guía completa del sistema sanitario suizo para hispanohablantes.",
  path: "/seguros",
  keywords: [
    "seguro medico suiza",
    "krankenkasse",
    "seguro obligatorio suiza",
    "lamal suiza",
    "comparador seguros suiza",
    "prima seguro suiza",
    "franquicia seguro suiza",
    "aseguradoras suiza",
    "seguro salud suiza",
    "cuanto cuesta seguro medico suiza",
  ],
});

export default function SegurosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Seguro médico", url: `${BASE_URL}/seguros` },
    ]),
    webAppSchema({
      name: "Comparador de seguros médicos en Suiza",
      description: "Calcula y compara el precio del seguro médico obligatorio (LAMal) por cantón, edad y franquicia.",
      path: "/seguros",
      applicationCategory: "FinanceApplication",
    }),
    faqSchema([
      { pregunta: "¿Es obligatorio el seguro médico en Suiza?", respuesta: "Sí, es obligatorio desde el primer día de residencia. Tienes 3 meses desde tu llegada para contratar el seguro básico (LAMal/KVG). Si no lo haces, el cantón te asignará uno de oficio y puede haber recargos." },
      { pregunta: "¿Cuánto cuesta el seguro médico en Suiza?", respuesta: "La prima varía por cantón, edad y franquicia. En promedio: 350-450 CHF/mes para un adulto con franquicia estándar (300 CHF). En cantones caros como Ginebra puede superar los 500 CHF; en Appenzell puede ser menos de 300 CHF." },
      { pregunta: "¿Qué es la franquicia en el seguro suizo?", respuesta: "La franquicia es la cantidad que pagas de tu bolsillo antes de que el seguro empiece a cubrir gastos. Puedes elegir entre 300 CHF (prima más alta) y 2.500 CHF (prima más baja). Si vas poco al médico, una franquicia alta puede ahorrarte dinero." },
      { pregunta: "¿Puedo cambiar de aseguradora en Suiza?", respuesta: "Sí, puedes cambiar de aseguradora una vez al año (para el 1 de enero) si avisas antes del 30 de noviembre. También puedes cambiar a mitad de año (1 de julio) pero solo si tu prima ha subido. El cambio es gratuito y la nueva aseguradora debe aceptarte." },
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
