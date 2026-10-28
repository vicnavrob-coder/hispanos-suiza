import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema, webAppSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Buscar trabajo en Suiza 2026 | 8 fuentes + 13 ETTs | HispanosEnSuiza",
  description:
    "Buscador de empleo en Suiza para hispanohablantes. Ofertas en tiempo real de jobs.ch, LinkedIn, JobScout24, Jobup, RAV job-room, Adzuna y agencias ETT. Sectores: construcción, hostelería, electricidad, limpieza, logística y más.",
  path: "/trabajo",
  keywords: [
    "trabajo en suiza",
    "empleo suiza",
    "trabajar en suiza",
    "ofertas de trabajo suiza",
    "ETT suiza",
    "agencias temporales suiza",
    "jobs.ch",
    "empleo hispanohablantes suiza",
    "trabajo suiza español",
    "trabajar suiza sin aleman",
  ],
});

export default function TrabajoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Buscar trabajo", url: `${BASE_URL}/trabajo` },
    ]),
    webAppSchema({
      name: "Buscador de trabajo en Suiza",
      description: "Buscador con ofertas de jobs.ch, LinkedIn, JobScout24, Jobup y agencias ETT. 8 fuentes en tiempo real.",
      path: "/trabajo",
      applicationCategory: "BusinessApplication",
    }),
    faqSchema([
      { pregunta: "¿Puedo trabajar en Suiza sin hablar alemán?", respuesta: "Sí, especialmente en la Suiza francesa (Ginebra, Lausana) o en sectores como hostelería, construcción y limpieza donde el idioma es menos crítico. En Zúrich y la Suiza alemana, el alemán es más necesario para puestos de cara al cliente." },
      { pregunta: "¿Cuáles son los mejores portales de empleo en Suiza?", respuesta: "Los principales son jobs.ch (el más grande), LinkedIn, JobScout24, Jobup (Suiza francesa), Indeed.ch y RAV job-room (portal oficial del gobierno). Para ETTs: Adecco, Manpower, Randstad y Kelly Services." },
      { pregunta: "¿Qué salario puedo esperar en Suiza?", respuesta: "Los salarios en Suiza son los más altos de Europa. Un camarero gana 3.500-4.500 CHF brutos/mes, un albañil 4.500-5.500 CHF, un cocinero 4.000-5.500 CHF, y un desarrollador de software 8.000-12.000 CHF." },
      { pregunta: "¿Necesito permiso de trabajo para trabajar en Suiza?", respuesta: "Si eres ciudadano de la UE/AELC, tienes libre circulación y solo necesitas registrarte en el municipio. Si eres de fuera de la UE (ej: Latinoamérica), necesitas un permiso de trabajo que debe gestionar la empresa suiza dentro del contingente anual." },
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
