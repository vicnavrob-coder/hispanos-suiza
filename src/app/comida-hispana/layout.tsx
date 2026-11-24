import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Restaurantes Espanoles y Latinos en Suiza 2026 | Tapas, Tacos, Paella",
  description:
    "Encuentra los mejores restaurantes de comida espanola, mexicana, argentina y latina en Suiza. Tapas en Zurich, tacos en Berna, paella en Ginebra. Reserva mesa, ver menu y ubicacion. Guia completa con +12 restaurantes hispanos.",
  path: "/comida-hispana",
  keywords: [
    // === TIER 1: Alto volumen - Genericos ===
    "restaurantes espanoles suiza",
    "comida espanola suiza",
    "restaurantes latinos suiza",
    "comida latina suiza",
    "tapas suiza",
    "donde comer suiza",
    "restaurantes hispanohablantes suiza",
    "comida espana suiza",

    // === TIER 2: Por tipo de cocina ===
    "restaurantes mexicanos suiza",
    "tacos suiza",
    "burritos suiza",
    "comida mexicana suiza",
    "restaurantes argentinos suiza",
    "asado argentino suiza",
    "parrilla argentina suiza",
    "empanadas suiza",
    "restaurantes peruanos suiza",
    "ceviche suiza",
    "pisco sour suiza",
    "lomo saltado suiza",
    "restaurantes colombianos suiza",
    "arepas suiza",
    "bandeja paisa suiza",
    "restaurantes cubanos suiza",
    "mojitos suiza",
    "ropa vieja suiza",
    "restaurante vasco suiza",
    "pintxos suiza",

    // === TIER 3: Por ciudad - Zurich ===
    "restaurantes espanoles zurich",
    "tapas zurich",
    "paella zurich",
    "comida espanola zurich",
    "restaurantes latinos zurich",
    "tacos zurich",
    "comida mexicana zurich",
    "restaurante argentino zurich",
    "ceviche zurich",

    // === TIER 4: Por ciudad - Ginebra ===
    "restaurantes espanoles ginebra",
    "tapas ginebra",
    "comida latina ginebra",
    "restaurantes mexicanos ginebra",
    "churros ginebra",
    "comida espanola ginebra",

    // === TIER 5: Por ciudad - Otras ===
    "restaurantes espanoles basel",
    "tapas basel",
    "comida latina berna",
    "restaurantes hispanos lausanne",
    "tacos lucerna",
    "comida mexicana winterthur",
    "restaurante espanol st gallen",

    // === TIER 6: Platos especificos ===
    "paella en suiza",
    "tapas en suiza",
    "jamon iberico suiza",
    "churros suiza",
    "tortilla espanola suiza",
    "croquetas suiza",
    "gazpacho suiza",
    "sangria suiza",
    "empanadas argentinas suiza",
    "tacos al pastor suiza",
    "margaritas suiza",
    "guacamole suiza",
    "nachos suiza",
    "ceviche peruano suiza",
    "pisco suiza",

    // === TIER 7: Busquedas de accion ===
    "reservar restaurante espanol suiza",
    "mejores tapas suiza",
    "donde comer paella suiza",
    "comida espanola cerca de mi suiza",
    "restaurantes hispanos con reserva",
    "comer espanol en zurich",
    "restaurante latino abierto ahora",
    "comida espanola a domicilio suiza",
    "mejores restaurantes latinos suiza",

    // === TIER 8: Long-tail especifico ===
    "restaurantes para espanoles en suiza",
    "comida de casa suiza",
    "nostalgia espanola suiza",
    "sabores latinos suiza",
    "restaurantes hispanohablantes suiza",
    "comida en espanol suiza",
    "restaurantes espanoles baratos suiza",
    "tapas economicas zurich",
    "comida latina barata suiza",

    // === TIER 9: Ocasiones ===
    "cena romantica espanola suiza",
    "tapas after work zurich",
    "brunch espanol suiza",
    "churros desayuno suiza",
    "cena grupos restaurante latino",
    "celebraciones comida espanola",
    "cumpleanos restaurante mexicano suiza",
    "cena empresa restaurante espanol",

    // === TIER 10: Comparativos y preguntas ===
    "mejor restaurante espanol suiza",
    "mejor paella suiza",
    "mejores tacos suiza",
    "mejor ceviche suiza",
    "restaurante espanol mas autentico suiza",
    "donde comer bien espanol suiza",
    "restaurantes espanoles recomendados zurich"
  ],
});

// FAQs expandidas para featured snippets
const FAQ_DATA = [
  {
    pregunta: "¿Donde encontrar restaurantes espanoles en Suiza?",
    respuesta: "En Suiza hay excelentes restaurantes espanoles en las principales ciudades. Zurich tiene Casa Aurelio (paellas) y Asador Vasco (cocina vasca). En Ginebra encuentras El Toro (carnes) y Churros Factory. Basel tiene La Mancha para tapas. St. Gallen cuenta con Bodega Espanola. Todos ofrecen autentica cocina espanola con reserva online o telefonica."
  },
  {
    pregunta: "¿Cuanto cuesta comer en un restaurante espanol en Suiza?",
    respuesta: "El precio medio en restaurantes espanoles en Suiza varia entre 30-80 CHF por persona. Taquerias y churrerias rondan los 15-30 CHF. Restaurantes de tapas y paellas entre 35-55 CHF. Asadores y restaurantes premium como Asador Vasco pueden llegar a 60-100 CHF con vino incluido. Los menus del dia suelen costar entre 20-35 CHF."
  },
  {
    pregunta: "¿Hay comida mexicana autentica en Suiza?",
    respuesta: "Si, hay varios restaurantes mexicanos autenticos en Suiza. Cantina Mexicana en Berna ofrece tacos al pastor y guacamole fresco. Taqueria Los Amigos en Lucerna tiene street food mexicano a precios accesibles (15-30 CHF). Ambos importan ingredientes originales de Mexico como chiles, tortillas de maiz y especias autenticas."
  },
  {
    pregunta: "¿Que restaurantes latinos tienen musica en vivo en Suiza?",
    respuesta: "Havana Club en Zurich ofrece musica cubana en vivo los viernes y sabados con salsa, son cubano y latin jazz. El ambiente es festivo con mojitos autenticos. Algunos restaurantes organizan noches tematicas con musica latina, especialmente en fines de semana. Consulta directamente con cada restaurante para fechas de eventos."
  },
  {
    pregunta: "¿Se puede reservar online en restaurantes hispanos en Suiza?",
    respuesta: "La mayoria de restaurantes hispanos en Suiza permiten reservar online a traves de su web o por telefono. Restaurantes como Casa Aurelio, El Gaucho y Asador Vasco tienen sistema de reservas online. Las taquerias y churrerias generalmente no requieren reserva. Para fines de semana se recomienda reservar con 2-3 dias de antelacion."
  },
  {
    pregunta: "¿Cual es el mejor restaurante espanol en Zurich?",
    respuesta: "Los mejores restaurantes espanoles en Zurich son: Asador Vasco (4.9 estrellas) especializado en cocina vasca, pintxos y txuleta. Casa Aurelio (4.6 estrellas) famoso por sus paellas valencianas con 30 anos de tradicion. Ambos ofrecen experiencias gastronomicas autenticas con productos importados de Espana."
  },
  {
    pregunta: "¿Donde comer paella en Suiza?",
    respuesta: "La mejor paella en Suiza la encuentras en Casa Aurelio en Zurich, con paella valenciana autentica preparada por el chef Aurelio con receta tradicional. Tambien puedes encontrar paella en El Toro (Ginebra) y otros restaurantes espanoles. Los precios oscilan entre 35-55 CHF por persona."
  },
  {
    pregunta: "¿Hay restaurantes argentinos con asado en Suiza?",
    respuesta: "Si, El Gaucho en Lausanne es el mejor restaurante argentino de Suiza. Ofrece autentico asado con carnes importadas de Argentina, empanadas caseras, provoleta y los mejores vinos malbec. El bife de chorizo es su especialidad. Precio medio: 55-90 CHF. Abre de martes a domingo con reserva recomendada."
  },
  {
    pregunta: "¿Donde comprar churros en Suiza?",
    respuesta: "Churros Factory en Ginebra es la mejor churreria de Suiza. Ofrecen churros recien hechos con chocolate caliente espanol, porras, bunuelos y cafe. Abierto desde las 8:00, perfecto para desayuno. Precios: 10-20 CHF. Tambien tienen opcion de llevar (takeaway)."
  },
  {
    pregunta: "¿Que restaurante peruano hay en Suiza?",
    respuesta: "Casa Peru en Winterthur es el mejor restaurante peruano de Suiza. Especializado en ceviche fresco preparado al momento, lomo saltado y pisco sour autentico. Calificacion: 4.7 estrellas. Precio medio: 40-65 CHF. Ingredientes premium importados de Peru. Abierto de martes a domingo."
  }
];

// Schema de restaurantes para SEO
const RESTAURANTS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mejores Restaurantes Hispanos en Suiza 2026",
  description: "Directorio completo de restaurantes de comida espanola, mexicana, argentina y latinoamericana en Suiza",
  url: `${BASE_URL}/comida-hispana`,
  numberOfItems: 12,
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Restaurant",
        name: "Asador Vasco",
        description: "Cocina vasca de alta calidad. Pintxos elaborados, pescados frescos y txuleta.",
        servesCuisine: ["Vasca", "Espanola", "Pintxos"],
        priceRange: "$$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Seefeldstrasse 220",
          addressLocality: "Zurich",
          postalCode: "8008",
          addressCountry: "CH"
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "267"
        },
        telephone: "+41 44 383 77 88"
      }
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Restaurant",
        name: "El Gaucho",
        description: "Autentica parrilla argentina con carnes importadas de Argentina.",
        servesCuisine: ["Argentina", "Parrilla", "Carnes"],
        priceRange: "$$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Avenue de la Gare 12",
          addressLocality: "Lausanne",
          postalCode: "1003",
          addressCountry: "CH"
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "423"
        },
        telephone: "+41 21 320 55 88"
      }
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Restaurant",
        name: "Churros Factory",
        description: "La mejor churreria de Suiza. Churros recien hechos con chocolate caliente.",
        servesCuisine: ["Espanola", "Churros", "Desayunos"],
        priceRange: "$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Rue du Mont-Blanc 18",
          addressLocality: "Geneve",
          postalCode: "1201",
          addressCountry: "CH"
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "534"
        },
        telephone: "+41 22 731 55 66"
      }
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Restaurant",
        name: "La Mancha",
        description: "Bar de tapas moderno con toque manchego y amplia seleccion de vinos espanoles.",
        servesCuisine: ["Espanola", "Tapas", "Vinos"],
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Steinenvorstadt 67",
          addressLocality: "Basel",
          postalCode: "4051",
          addressCountry: "CH"
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.7",
          reviewCount: "189"
        },
        telephone: "+41 61 272 33 44"
      }
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Restaurant",
        name: "Casa Peru",
        description: "Ceviche fresco, lomo saltado y pisco sour autentico peruano.",
        servesCuisine: ["Peruana", "Ceviche", "Mariscos"],
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Marktgasse 48",
          addressLocality: "Winterthur",
          postalCode: "8400",
          addressCountry: "CH"
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.7",
          reviewCount: "156"
        },
        telephone: "+41 52 212 33 55"
      }
    }
  ]
};

// Schema de organizacion local
const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/comida-hispana`,
  name: "Guia de Restaurantes Hispanos en Suiza - HispanosEnSuiza",
  description: "Directorio completo de restaurantes de comida espanola y latinoamericana en Suiza. Encuentra tapas, paella, tacos, ceviche y mas.",
  url: `${BASE_URL}/comida-hispana`,
  areaServed: {
    "@type": "Country",
    name: "Suiza"
  },
  serviceType: "Restaurant Directory"
};

// Schema de pagina web
const WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Restaurantes de Comida Espanola e Hispana en Suiza 2026",
  description: "Directorio de restaurantes espanoles, mexicanos, argentinos y latinoamericanos en Suiza con reservas, ubicaciones y menus.",
  url: `${BASE_URL}/comida-hispana`,
  inLanguage: "es",
  isPartOf: {
    "@type": "WebSite",
    name: "HispanosEnSuiza",
    url: BASE_URL
  },
  about: {
    "@type": "Thing",
    name: "Restaurantes Hispanos en Suiza"
  },
  audience: {
    "@type": "Audience",
    audienceType: "Hispanohablantes en Suiza",
    geographicArea: {
      "@type": "Country",
      name: "Suiza"
    }
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Restaurantes Hispanos en Suiza",
    numberOfItems: 12
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".descripcion"]
  }
};

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
    WEBPAGE_SCHEMA,
    RESTAURANTS_SCHEMA,
    LOCAL_BUSINESS_SCHEMA,
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
