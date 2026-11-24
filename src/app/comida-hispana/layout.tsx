import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Restaurantes Comida Española e Hispana en Suiza 2026 | Dónde Comer",
  description:
    "Descubre los mejores restaurantes de comida española, mexicana, argentina y latinoamericana en Suiza. Tapas, paella, tacos, asado. Reserva online o llama directamente.",
  path: "/comida-hispana",
  keywords: [
    // === TIER 1: Alto volumen ===
    "restaurantes españoles suiza", "comida española suiza", "tapas suiza",
    "restaurantes latinos suiza", "comida latina suiza", "donde comer suiza",

    // === TIER 2: Por tipo de cocina ===
    "restaurantes mexicanos suiza", "tacos suiza", "burritos suiza",
    "restaurantes argentinos suiza", "asado suiza", "parrilla argentina suiza",
    "restaurantes peruanos suiza", "ceviche suiza", "pisco sour suiza",
    "restaurantes colombianos suiza", "arepas suiza", "bandeja paisa suiza",
    "restaurantes cubanos suiza", "mojitos suiza", "ropa vieja suiza",

    // === TIER 3: Por ciudad ===
    "restaurantes españoles zurich", "tapas zurich", "paella zurich",
    "restaurantes latinos ginebra", "comida mexicana ginebra",
    "restaurantes españoles basel", "tapas basel",
    "comida latina berna", "restaurantes hispanos lausanne",

    // === TIER 4: Platos específicos ===
    "paella en suiza", "tapas en suiza", "jamón ibérico suiza",
    "churros suiza", "tortilla española suiza", "croquetas suiza",
    "empanadas suiza", "tacos al pastor suiza", "margaritas suiza",

    // === TIER 5: Búsquedas de acción ===
    "reservar restaurante español suiza", "mejores tapas suiza",
    "donde comer paella suiza", "comida española cerca de mi suiza",
    "restaurantes hispanos con reserva", "comer español en zurich",

    // === TIER 6: Long-tail específico ===
    "restaurantes para españoles en suiza", "comida de casa suiza",
    "nostalgia española suiza", "sabores latinos suiza",
    "restaurantes hispanohablantes suiza", "comida en español suiza",

    // === TIER 7: Ocasiones ===
    "cena romántica española suiza", "tapas after work zurich",
    "brunch español suiza", "churros desayuno suiza",
    "cena grupos restaurante latino", "celebraciones comida española"
  ],
});

// Schemas estáticos para evitar errores en build
const FAQ_DATA = [
  {
    pregunta: "¿Dónde encontrar restaurantes españoles en Suiza?",
    respuesta: "En Suiza hay excelentes restaurantes españoles en las principales ciudades. Zürich tiene opciones como Casa Aurelio y Asador Vasco. En Ginebra encuentras El Toro y Churros Factory. Basel tiene La Mancha para tapas. Todos ofrecen auténtica cocina española con reserva online o telefónica."
  },
  {
    pregunta: "¿Cuánto cuesta comer en un restaurante español en Suiza?",
    respuesta: "El precio medio en restaurantes españoles en Suiza varía entre 30-80 CHF por persona. Taquerías y churrerías rondan los 15-30 CHF. Restaurantes de tapas y paellas entre 35-55 CHF. Asadores y restaurantes premium pueden llegar a 60-100 CHF con vino incluido."
  },
  {
    pregunta: "¿Hay comida mexicana auténtica en Suiza?",
    respuesta: "Sí, hay varios restaurantes mexicanos auténticos. Cantina Mexicana en Berna ofrece tacos al pastor y guacamole fresco. Taquería Los Amigos en Lucerna tiene street food mexicano a precios accesibles. Todos importan ingredientes originales de México."
  },
  {
    pregunta: "¿Qué restaurantes latinos tienen música en vivo?",
    respuesta: "Havana Club en Zürich ofrece música cubana en vivo los fines de semana con salsa y son cubano. Varios restaurantes organizan noches temáticas con música latina, especialmente viernes y sábados."
  },
  {
    pregunta: "¿Se puede reservar online en restaurantes hispanos?",
    respuesta: "La mayoría de restaurantes hispanos en Suiza permiten reservar online a través de su web o por teléfono. Algunos también usan plataformas como TheFork. Las taquerías y churrerías generalmente no requieren reserva."
  }
];

export default function ComidaHispanaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Restaurantes Hispanos", url: `${BASE_URL}/comida-hispana` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Restaurantes de Comida Española e Hispana en Suiza",
      description: "Directorio de restaurantes españoles, mexicanos, argentinos y latinoamericanos en Suiza con reservas y ubicaciones.",
      url: `${BASE_URL}/comida-hispana`,
      inLanguage: "es",
      isPartOf: {
        "@type": "WebSite",
        name: "HispanosEnSuiza",
        url: BASE_URL
      },
      about: {
        "@type": "FoodEstablishment",
        name: "Restaurantes Hispanos en Suiza"
      },
      audience: {
        "@type": "Audience",
        audienceType: "Hispanohablantes en Suiza",
        geographicArea: {
          "@type": "Country",
          name: "Suiza"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Mejores Restaurantes Hispanos en Suiza 2026",
      description: "Lista de los mejores restaurantes de comida española y latinoamericana en Suiza",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: 12
    },
    faqSchema(FAQ_DATA),
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
