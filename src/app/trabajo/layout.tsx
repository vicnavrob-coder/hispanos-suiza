import type { Metadata } from "next";
import { buildMetadata, webAppSchema, faqSchema, breadcrumbSchema, BASE_URL } from "@/lib/seo";

const FAQS = [
  {
    pregunta: "¿Es posible encontrar trabajo en Suiza sin hablar alemán o francés?",
    respuesta: "Sí, especialmente en sectores como IT, hostelería, limpieza y construcción donde el inglés o español es suficiente. En empresas internacionales (Zúrich, Ginebra) el inglés es idioma de trabajo. No obstante, el alemán o francés mejora mucho las oportunidades.",
  },
  {
    pregunta: "¿Cuál es el salario mínimo en Suiza en 2026?",
    respuesta: "Suiza no tiene salario mínimo federal, pero algunos cantones sí: Ginebra CHF 24.32/hora, Basilea-Ciudad CHF 21/hora, Neuchâtel CHF 21.09/hora. En la práctica, los salarios mínimos en convenios colectivos rondan CHF 4.000-5.000/mes.",
  },
  {
    pregunta: "¿Puedo trabajar en Suiza con permiso de turista?",
    respuesta: "No. Los ciudadanos de la UE tienen 90 días para buscar trabajo, pero necesitan el permiso B o L para trabajar legalmente. Los latinoamericanos necesitan contrato previo y permiso antes de entrar al país.",
  },
  {
    pregunta: "¿Cuáles son los sectores con más demanda de trabajadores en Suiza?",
    respuesta: "Los sectores con más demanda son: tecnología e IT, sanidad (enfermería, cuidadores), hostelería, construcción, logística y transporte, limpieza, y servicios financieros. El sector farmacéutico en Basilea tiene fuerte demanda.",
  },
];

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
    "contrato trabajo suiza modelo", "permiso trabajo suiza español",
    "cuanto gana enfermera suiza", "trabajo remoto desde suiza",
    "primer empleo suiza recien llegado",
  ],
});

export default function TrabajoLayout({ children }: { children: React.ReactNode }) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Trabajo en Suiza", url: `${BASE_URL}/trabajo` },
    ]),
    webAppSchema({
      name: "Buscador de trabajo en Suiza para hispanohablantes",
      description: "Busca ofertas de trabajo en Suiza por sector y ciudad con resultados en tiempo real de jobs.ch, LinkedIn y agencias ETT. Filtrado preciso para hispanohablantes.",
      path: "/trabajo",
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
