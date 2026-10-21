import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Guía de Salarios en Suiza 2026 — Por Sector y Puesto",
  description: "Salarios reales en Suiza por sector: IT, Sanidad, Finanzas, Hostelería, Construcción. Rangos salariales en CHF para +25 puestos. Guía gratuita en español.",
  path: "/recursos/guia-salarios",
  keywords: [
    "salarios suiza 2026",
    "cuanto gana desarrollador suiza",
    "sueldo enfermero suiza",
    "salario medico suiza",
    "sueldo ingeniero suiza",
    "salario cocinero suiza",
    "cuanto se gana en suiza",
    "sueldos tecnologia suiza",
    "salarios IT suiza",
    "trabajar finanzas suiza sueldo",
    "salario medio suiza por profesion",
    "guia salarial suiza español",
  ],
});

const faqs = [
  {
    pregunta: "¿Cuánto gana un desarrollador de software en Suiza?",
    respuesta: "Un desarrollador junior gana entre CHF 70.000-90.000/año, mientras que un senior puede ganar CHF 100.000-140.000/año. DevOps/SRE suelen ganar CHF 110.000-150.000/año. Los CTOs pueden superar CHF 200.000/año.",
  },
  {
    pregunta: "¿Cuánto gana un médico en Suiza?",
    respuesta: "Un médico residente gana CHF 80.000-100.000/año. Los médicos especialistas ganan significativamente más: CHF 150.000-300.000/año dependiendo de la especialidad y el cantón.",
  },
  {
    pregunta: "¿Es normal negociar el salario en Suiza?",
    respuesta: "Sí, es completamente normal y esperado. Los rangos salariales suelen tener margen de negociación. Tu salario final dependerá de tu experiencia, idiomas, ubicación geográfica y tamaño de la empresa.",
  },
];

export default function GuiaSalariosLayout({ children }: { children: React.ReactNode }) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Recursos", url: `${BASE_URL}/recursos` },
      { name: "Guía Salarios", url: `${BASE_URL}/recursos/guia-salarios` },
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
