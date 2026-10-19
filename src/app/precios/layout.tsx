import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Precios y Planes Premium — HispanosEnSuiza",
  description: "Accede a herramientas premium para hispanohablantes en Suiza: buscador avanzado de trabajo, calculadoras exclusivas, guías detalladas y soporte prioritario. Desde CHF 9.90/mes.",
  path: "/precios",
  keywords: [
    "hispanosensuiza premium",
    "herramientas emigrar suiza",
    "guia trabajo suiza premium",
    "calculadora salario suiza",
    "buscador empleo suiza español",
    "ayuda emigrar suiza precio",
  ],
});

const faqs = [
  {
    pregunta: "¿Qué incluye el plan Premium de HispanosEnSuiza?",
    respuesta: "El plan Premium incluye acceso completo al buscador de trabajo avanzado, calculadoras sin límite, guías detalladas exclusivas, y soporte prioritario por email. También recibes actualizaciones mensuales sobre el mercado laboral y cambios legales.",
  },
  {
    pregunta: "¿Puedo cancelar mi suscripción en cualquier momento?",
    respuesta: "Sí, puedes cancelar cuando quieras desde tu perfil. La suscripción seguirá activa hasta el final del período pagado y no se renovará automáticamente.",
  },
  {
    pregunta: "¿Hay versión gratuita de HispanosEnSuiza?",
    respuesta: "Sí. Todas las guías básicas, artículos del blog, y herramientas con uso limitado son gratuitas. El plan Premium desbloquea funcionalidades avanzadas y uso ilimitado.",
  },
];

export default function PreciosLayout({ children }: { children: React.ReactNode }) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Precios", url: `${BASE_URL}/precios` },
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
