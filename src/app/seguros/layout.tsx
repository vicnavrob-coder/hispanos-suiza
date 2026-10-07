import type { Metadata } from "next";
import { buildMetadata, BASE_URL, webAppSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Calculadora de seguros médicos en Suiza — KVG y suplementarios",
  description: "Calcula el coste de tu seguro médico obligatorio (KVG/LAMal) en Suiza por cantón, edad y franquicia. Compara aseguradoras y ahorra hasta 1.200 CHF al año.",
  path: "/seguros",
  ogImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "seguro medico suiza calculadora", "kvg suiza precio", "lamal suiza coste",
    "comparar seguros suiza", "seguro salud suiza extranjero",
    "cuanto cuesta seguro medico suiza 2026", "krankenversicherung suiza",
    "seguro obligatorio suiza hispanohablante", "franquicia seguro suiza",
    "diferencia kvg lamal suiza", "aseguradoras baratas suiza",
  ],
});

export default function SegurosLayout({ children }: { children: React.ReactNode }) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio",          url: BASE_URL },
      { name: "Seguro médico",   url: `${BASE_URL}/seguros` },
    ]),
    webAppSchema({
      name: "Calculadora de seguro médico suizo (KVG/LAMal)",
      description: "Calcula tu prima de seguro médico obligatorio en Suiza por cantón, edad y franquicia. Compara aseguradoras.",
      path: "/seguros",
      applicationCategory: "HealthApplication",
    }),
    faqSchema([
      {
        pregunta: "¿Es obligatorio el seguro médico en Suiza?",
        respuesta: "Sí. El seguro médico básico (KVG/LAMal) es obligatorio para todos los residentes en Suiza. Tienes un plazo máximo de 3 meses desde tu llegada para contratarlo. Si no lo haces, el cantón te asigna uno automáticamente, que suele ser más caro.",
      },
      {
        pregunta: "¿Cuánto cuesta el seguro médico en Suiza?",
        respuesta: "El coste varía según el cantón, la edad y la franquicia elegida. Para un adulto en 2026, la prima media oscila entre 300 y 550 CHF al mes. Ginebra y Vaud son los cantones más caros; Appenzell y Uri los más baratos. Con la franquicia máxima (2.500 CHF) puedes reducir la prima hasta un 40%.",
      },
      {
        pregunta: "¿Qué diferencia hay entre KVG y LAMal?",
        respuesta: "KVG (Krankenversicherungsgesetz) y LAMal (Loi sur l'assurance-maladie) son exactamente lo mismo: el seguro médico obligatorio suizo, llamado así en alemán y en francés respectivamente. Cubre médico de cabecera, urgencias, hospitalización en sala general y medicamentos de la lista oficial.",
      },
      {
        pregunta: "¿Puedo cambiar de aseguradora cada año?",
        respuesta: "Sí. Puedes cambiar de aseguradora de seguro básico cada 31 de diciembre notificando antes del 30 de noviembre. El seguro básico es idéntico en todas las aseguradoras — solo cambia el precio. Para los seguros suplementarios, el cambio puede estar sujeto a revisión médica.",
      },
      {
        pregunta: "¿Hay ayudas para pagar el seguro médico?",
        respuesta: "Sí. Si tus ingresos son bajos, tienes derecho a una subvención cantonal (Prämienverbilligung / réduction de prime). Cada cantón fija sus propios criterios. En general, si tu prima supera el 10% de tus ingresos imponibles, puedes solicitarla. Consúltalo en la oficina de seguros de tu cantón.",
      },
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
