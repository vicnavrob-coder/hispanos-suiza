import type { Metadata } from "next";
import { buildMetadata, BASE_URL, webAppSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

const FAQS = [
  {
    pregunta: "¿Cuánto cuesta alquilar un piso en Suiza en 2026?",
    respuesta: "Depende de la ciudad. En Zúrich un apartamento de 1 habitación cuesta CHF 1.600-2.200/mes; en Ginebra CHF 1.500-2.100/mes; en Basilea CHF 1.200-1.700/mes; en ciudades más pequeñas desde CHF 900/mes.",
  },
  {
    pregunta: "¿Qué documentos necesito para alquilar un piso en Suiza?",
    respuesta: "Normalmente piden: Betreibungsregisterauszug (extracto de deudas), últimas 3 nóminas, copia del permiso de residencia, carta de presentación personal, y referencias del anterior casero o empleador.",
  },
  {
    pregunta: "¿Cuánto es el depósito (Kaution) en Suiza?",
    respuesta: "El depósito habitual es de 2 a 3 meses de alquiler. Este dinero se deposita en una cuenta bloqueada (Mietkautionskonto) a nombre del inquilino y se devuelve al finalizar el contrato si no hay daños.",
  },
  {
    pregunta: "¿Puedo alquilar un piso en Suiza siendo extranjero sin historial suizo?",
    respuesta: "Sí, aunque es más difícil. Compensa la falta de historial con una carta de presentación sólida en el idioma local, referencias de tu empleador, y si es posible, ofrece un depósito más alto o un aval.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Buscador de pisos y vivienda en Suiza — Para hispanohablantes",
  description: "Busca pisos y vivienda en alquiler en Suiza. Accede a los mejores portales inmobiliarios suizos: Homegate, ImmoScout24, Flatfox y más. Guía en español.",
  path: "/vivienda",
  ogImage: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "pisos alquiler suiza", "buscar piso suiza", "vivienda suiza hispanohablantes",
    "alquilar piso suiza", "homegate suiza", "flatfox suiza", "immoScout suiza",
    "piso compartido suiza", "kaution alquiler suiza", "betreibungsregister suiza",
    "cómo alquilar piso suiza extranjero", "wg zimmer suiza",
  ],
});

export default function ViviendaLayout({ children }: { children: React.ReactNode }) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio",           url: BASE_URL },
      { name: "Buscar vivienda",  url: `${BASE_URL}/vivienda` },
    ]),
    webAppSchema({
      name: "Buscador de vivienda en Suiza",
      description: "Busca pisos en alquiler en Suiza. Resultados en tiempo real de flatfox.ch más acceso directo a Homegate, ImmoScout24 y más.",
      path: "/vivienda",
      applicationCategory: "BusinessApplication",
    }),
    faqSchema(FAQS),
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
