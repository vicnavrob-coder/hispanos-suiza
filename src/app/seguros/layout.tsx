import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema, webAppSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Comparador de Seguro Médico Suiza 2026 | Calcula tu prima | HispanosEnSuiza",
  description:
    "Calculadora de seguro médico obligatorio (KVG/LAMal) en Suiza. Compara primas por edad, cantón y franquicia. 8 aseguradoras, 4 modelos de acceso. Tips para ahorrar hasta 1.800 CHF/año.",
  path: "/seguros",
  keywords: [
    "seguro medico suiza",
    "kvg lamal",
    "seguro obligatorio suiza",
    "prima seguro suiza",
    "comparar seguros suiza",
    "helsana css swica",
    "franquicia seguro suiza",
    "seguro medico español suiza",
    "cuanto cuesta seguro suiza",
    "mejor seguro medico suiza",
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
      name: "Comparador de Seguro Médico en Suiza",
      description: "Calcula tu prima de seguro médico obligatorio según edad, cantón y franquicia. Compara aseguradoras y modelos.",
      path: "/seguros",
      applicationCategory: "FinanceApplication",
    }),
    faqSchema([
      { pregunta: "¿Es obligatorio el seguro médico en Suiza?", respuesta: "Sí, el seguro básico (KVG/LAMal) es obligatorio para todos los residentes. Tienes 3 meses desde tu llegada para contratarlo. Si no lo haces, el cantón te asigna uno automáticamente, normalmente más caro." },
      { pregunta: "¿Cuánto cuesta el seguro médico en Suiza?", respuesta: "Depende de tu edad, cantón y franquicia elegida. Un adulto de 26-35 años paga entre 300-500 CHF/mes con franquicia estándar. Eligiendo modelo HMO/Telmed y franquicia alta (2.500 CHF) puedes bajar a 200-350 CHF/mes." },
      { pregunta: "¿Qué es la franquicia del seguro?", respuesta: "Es el monto anual que pagas de tu bolsillo antes de que el seguro cubra gastos. Va de 300 a 2.500 CHF. Franquicia alta = prima mensual más baja, pero pagas más si tienes gastos médicos." },
      { pregunta: "¿Puedo tener el mismo médico con modelo HMO o Telmed?", respuesta: "Depende. En HMO acudes a un centro médico asignado. En Telmed llamas primero a una línea 24h que te orienta. Ambos dan acceso a especialistas si es necesario, pero ahorras 15-25% en la prima." },
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
