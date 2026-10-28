import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema, webAppSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Buscar piso en Suiza 2026 | Alquiler y WG | HispanosEnSuiza",
  description:
    "Encuentra piso de alquiler en Suiza. Buscador con ofertas de Homegate, ImmoScout24, Flatfox y más. Estudios, pisos compartidos (WG) y apartamentos en Zúrich, Ginebra, Basilea y toda Suiza.",
  path: "/vivienda",
  keywords: [
    "alquiler suiza",
    "piso suiza",
    "vivienda suiza",
    "wg suiza",
    "piso compartido suiza",
    "homegate",
    "flatfox",
    "alquiler zurich",
    "alquiler ginebra",
    "buscar piso suiza",
    "precio alquiler suiza",
  ],
});

export default function ViviendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Buscar vivienda", url: `${BASE_URL}/vivienda` },
    ]),
    webAppSchema({
      name: "Buscador de pisos en Suiza",
      description: "Buscador de alquiler con ofertas de Homegate, ImmoScout24, Flatfox y portales WG.",
      path: "/vivienda",
      applicationCategory: "LifestyleApplication",
    }),
    faqSchema([
      { pregunta: "¿Cuánto cuesta alquilar un piso en Suiza?", respuesta: "Los precios varían mucho por ciudad. En Zúrich un estudio cuesta 1.500-2.200 CHF/mes, un piso de 2 habitaciones 2.200-3.000 CHF. En Ginebra son similares. En ciudades más pequeñas como Berna o Basilea los precios son un 15-20% más bajos." },
      { pregunta: "¿Qué es una WG en Suiza?", respuesta: "WG (Wohngemeinschaft) es un piso compartido entre varias personas, cada una con su habitación privada pero compartiendo cocina, baño y salón. Es la opción más económica: 600-1.200 CHF/mes por habitación. Muy popular entre jóvenes y recién llegados." },
      { pregunta: "¿Qué documentos necesito para alquilar en Suiza?", respuesta: "Normalmente piden: extracto de registro de deudas (Betreibungsregister), contrato de trabajo o nóminas, copia del pasaporte/permiso de residencia, y a veces referencias de anteriores caseros. El depósito suele ser de 3 meses de alquiler." },
      { pregunta: "¿Cuáles son los mejores portales para buscar piso en Suiza?", respuesta: "Los principales son Homegate.ch (el más grande), ImmoScout24.ch, Flatfox.ch (sin comisiones), Comparis.ch, y para WG: wgzimmer.ch, ronorp.net. En Suiza francesa también Anibis.ch." },
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
