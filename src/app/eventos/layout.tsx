import type { Metadata } from 'next';
import { buildMetadata, BASE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  // Title optimizado para CTR (máx 60 chars visibles)
  title: 'Eventos Suiza 2026-2027 | Festivales, Mercados Navideños, Conciertos',
  // Description optimizada para CTR (máx 155 chars, con CTA implícito)
  description: '🎄 Descubre +50 eventos en Suiza: Street Parade, Fasnacht Basel, Montreux Jazz, mercados navideños. ✅ Filtros avanzados, fechas actualizadas, TODO en español. ¡Encuentra tu próximo evento!',
  path: '/eventos',
  ogImage: `${BASE_URL}/og-eventos.png`,
  keywords: [
    // === TIER 1: Alto volumen, intención clara ===
    'eventos suiza', 'eventos en suiza', 'que hacer en suiza',
    'festivales suiza', 'conciertos suiza', 'fiestas suiza',
    'mercados navideños suiza', 'navidad suiza', 'christmas markets switzerland spanish',

    // === TIER 2: Eventos específicos (branded, alto intent) ===
    'street parade zurich', 'street parade zurich 2027', 'street parade fechas',
    'fasnacht basel', 'fasnacht basel 2027', 'carnaval basilea fechas',
    'montreux jazz festival', 'montreux jazz 2027', 'montreux jazz entradas',
    'mercadillo navideño zurich', 'weihnachtsmarkt zurich español',
    'zibelemarit berna', 'fete de lescalade ginebra', 'paleo festival nyon',
    'fete des vignerons vevey', 'locarno film festival', 'art basel',

    // === TIER 3: Por ciudad (long-tail geográfico) ===
    'eventos zurich', 'que hacer en zurich', 'fiestas zurich', 'conciertos zurich',
    'eventos ginebra', 'que hacer en ginebra', 'fiestas ginebra', 'nightlife ginebra',
    'eventos basilea', 'que hacer en basilea', 'carnaval basilea',
    'eventos berna', 'que hacer en berna', 'mercado navidad berna',
    'eventos lucerna', 'que hacer en lucerna', 'festival luces lucerna',
    'eventos lausana', 'que hacer en lausana', 'vida nocturna lausana',
    'eventos lugano', 'que hacer en lugano', 'fiestas ticino',
    'eventos montreux', 'que hacer en montreux', 'jazz montreux',
    'eventos interlaken', 'eventos st moritz', 'eventos zermatt',
    'eventos locarno', 'eventos neuchatel', 'eventos friburgo',

    // === TIER 4: Por tipo/categoría ===
    'festivales musica suiza', 'conciertos electronica suiza', 'techno zurich',
    'festivales verano suiza', 'open air suiza', 'festivales gratis suiza',
    'mercados navidad suiza 2026', 'christmas markets suiza español',
    'eventos culturales suiza', 'museos suiza', 'exposiciones suiza',
    'eventos deportivos suiza', 'maraton suiza', 'triatlon suiza', 'esqui suiza eventos',
    'eventos gastronomicos suiza', 'wine festivals suiza', 'food festivals suiza',
    'vida nocturna suiza', 'clubs zurich', 'bares ginebra', 'nightlife basilea',
    'eventos familiares suiza', 'actividades niños suiza', 'parques tematicos suiza',
    'eventos tecnologia suiza', 'tech conferences zurich', 'startups suiza',

    // === TIER 5: Por temporada/fecha ===
    'eventos suiza 2026', 'eventos suiza 2027', 'agenda suiza 2026',
    'eventos diciembre suiza', 'eventos enero suiza', 'eventos febrero suiza',
    'eventos verano suiza 2027', 'eventos invierno suiza 2026',
    'eventos navidad suiza 2026', 'nochevieja suiza', 'año nuevo suiza',
    'semana santa suiza', 'pascua suiza', 'feriados suiza eventos',
    'eventos hoy suiza', 'eventos este fin de semana suiza', 'eventos este mes suiza',

    // === TIER 6: Hispanohablantes específico (nicho valioso) ===
    'eventos para latinos en suiza', 'eventos hispanohablantes suiza',
    'agenda suiza en español', 'guia eventos suiza español',
    'fiestas latinas suiza', 'fiestas latinoamericanas zurich',
    'comunidad hispana suiza eventos', 'españoles en suiza eventos',
    'mexicanos en suiza eventos', 'colombianos en suiza eventos',
    'argentinos en suiza eventos', 'venezolanos en suiza eventos',

    // === TIER 7: Intención de compra/planificación ===
    'calendario eventos suiza', 'agenda eventos suiza', 'proximos eventos suiza',
    'entradas eventos suiza', 'tickets festivales suiza', 'reservar eventos suiza',
    'eventos gratis suiza', 'eventos gratuitos zurich', 'que hacer gratis suiza',
    'mejores eventos suiza', 'top festivales suiza', 'eventos imperdibles suiza',

    // === TIER 8: Preguntas (featured snippets) ===
    'cuando es street parade', 'cuando es fasnacht basel', 'cuando es montreux jazz',
    'donde hay mercados navideños suiza', 'mejores mercados navidad suiza',
    'que festivales hay en suiza', 'que eventos hay en zurich este mes'
  ],
});

// Schemas JSON-LD como constantes estáticas (build-time)
const EVENT_LIST_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Eventos en Suiza',
  description: 'Calendario completo de eventos, festivales y actividades en Suiza para hispanohablantes',
  numberOfItems: 12,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Event',
        name: 'Street Parade Zürich',
        description: 'El festival de música electrónica más grande de Suiza',
        startDate: '2027-08-14',
        location: {
          '@type': 'Place',
          name: 'Zürich',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Zürich',
            addressRegion: 'ZH',
            addressCountry: 'CH'
          }
        },
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=85',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CHF'
        }
      }
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Event',
        name: 'Fasnacht de Basilea',
        description: 'El carnaval más grande de Suiza',
        startDate: '2027-02-21',
        endDate: '2027-02-23',
        location: {
          '@type': 'Place',
          name: 'Basilea',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Basel',
            addressRegion: 'BS',
            addressCountry: 'CH'
          }
        },
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=85',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CHF'
        }
      }
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Event',
        name: 'Montreux Jazz Festival',
        description: 'Festival de jazz prestigioso junto al lago Lemán',
        startDate: '2027-07-01',
        endDate: '2027-07-16',
        location: {
          '@type': 'Place',
          name: 'Montreux',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Montreux',
            addressRegion: 'VD',
            addressCountry: 'CH'
          }
        },
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=85',
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '50',
          highPrice: '200',
          priceCurrency: 'CHF'
        }
      }
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Event',
        name: 'Mercadillo Navideño de Zürich',
        description: 'El mercadillo navideño más grande de interior de Europa',
        startDate: '2026-12-01',
        endDate: '2026-12-24',
        location: {
          '@type': 'Place',
          name: 'Zürich',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Zürich',
            addressRegion: 'ZH',
            addressCountry: 'CH'
          }
        },
        image: 'https://images.unsplash.com/photo-1512389098783-66b81f86e199?w=800&q=85',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CHF'
        }
      }
    }
  ]
};

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: 'https://hispanosensuiza.ch'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Eventos',
      item: 'https://hispanosensuiza.ch/eventos'
    }
  ]
};

const WEBPAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Eventos en Suiza 2026-2027 - Calendario Completo en Español',
  description: 'Calendario completo de eventos, festivales, mercados navideños y conciertos en Suiza. Información actualizada en español para hispanohablantes.',
  url: 'https://hispanosensuiza.ch/eventos',
  inLanguage: 'es',
  isPartOf: {
    '@type': 'WebSite',
    name: 'HispanosEnSuiza',
    url: 'https://hispanosensuiza.ch'
  },
  about: {
    '@type': 'Thing',
    name: 'Eventos y Festivales en Suiza'
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Hispanohablantes en Suiza',
    geographicArea: {
      '@type': 'Country',
      name: 'Switzerland'
    }
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Lista de Eventos en Suiza',
    numberOfItems: 50
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.evento-titulo', '.evento-fecha']
  }
};

// FAQ Schema para featured snippets en Google
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuáles son los mejores eventos en Suiza en 2027?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los mejores eventos en Suiza incluyen: Street Parade Zürich (agosto), el festival de música electrónica más grande de Europa; Fasnacht Basel (febrero), el carnaval más importante de Suiza; Montreux Jazz Festival (julio), festival de jazz de fama mundial; y los mercadillos navideños de Zürich, Basilea y Berna (diciembre). Todos estos eventos atraen a miles de visitantes cada año.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cuándo es el Street Parade en Zürich?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El Street Parade de Zürich se celebra el segundo sábado de agosto. En 2027 será el 14 de agosto. Es el festival de música electrónica más grande de Suiza y uno de los más grandes del mundo, con más de 1 millón de asistentes. La entrada es gratuita y recorre el lago de Zürich.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Dónde hay mercados navideños en Suiza?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los principales mercados navideños de Suiza están en: Zürich (el más grande de interior de Europa, en la Estación Central), Basilea (en la Barfüsserplatz y Münsterplatz), Berna (en la Münsterplattform con vistas a los Alpes), Montreux (junto al lago Lemán), Lucerna (en el centro histórico) y Ginebra (en la Place du Molard). Funcionan desde finales de noviembre hasta el 24 de diciembre.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Qué es el Fasnacht de Basilea?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El Fasnacht de Basilea es el carnaval más grande e importante de Suiza, declarado Patrimonio Cultural Inmaterial de la UNESCO. Se celebra durante 3 días a partir del lunes siguiente al Miércoles de Ceniza. Comienza a las 4 de la madrugada con el \"Morgestraich\" (desfile de linternas) y continúa con desfiles, música y máscaras tradicionales. En 2027 será del 21 al 23 de febrero.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Hay eventos gratuitos en Suiza?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, muchos eventos en Suiza son gratuitos. Entre los más populares: Street Parade Zürich (gratis), Fête de la Musique en varias ciudades (junio), mercadillos navideños (entrada libre), Zibelemärit Berna (mercado de cebollas), y muchos festivales al aire libre. Los mercados navideños, desfiles y eventos culturales públicos generalmente no tienen costo de entrada.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cuándo es el Montreux Jazz Festival?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El Montreux Jazz Festival se celebra durante las dos primeras semanas de julio, del 1 al 16 de julio en 2027. Es uno de los festivales de jazz más prestigiosos del mundo, fundado en 1967. Se realiza en Montreux, junto al lago Lemán. Hay conciertos gratuitos al aire libre y conciertos pagados en el Centro de Convenciones. Las entradas para artistas principales cuestan entre 50-200 CHF.'
      }
    }
  ]
};

// Schema de EventSeries para Google
const EVENT_SERIES_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'EventSeries',
  name: 'Eventos en Suiza 2026-2027',
  description: 'Serie completa de eventos, festivales y actividades culturales en Suiza',
  url: 'https://hispanosensuiza.ch/eventos',
  inLanguage: 'es',
  location: {
    '@type': 'Country',
    name: 'Switzerland',
    alternateName: 'Suiza'
  },
  organizer: {
    '@type': 'Organization',
    name: 'HispanosEnSuiza',
    url: 'https://hispanosensuiza.ch'
  },
  subEvent: [
    {
      '@type': 'Event',
      name: 'Street Parade Zürich 2027',
      startDate: '2027-08-14',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode'
    },
    {
      '@type': 'Event',
      name: 'Fasnacht Basel 2027',
      startDate: '2027-02-21',
      endDate: '2027-02-23',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode'
    },
    {
      '@type': 'Event',
      name: 'Montreux Jazz Festival 2027',
      startDate: '2027-07-01',
      endDate: '2027-07-16',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode'
    },
    {
      '@type': 'Event',
      name: 'Mercados Navideños Suiza 2026',
      startDate: '2026-11-25',
      endDate: '2026-12-24',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode'
    }
  ]
};

export default function EventosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Schema: Lista de eventos principales */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENT_LIST_SCHEMA) }}
      />
      {/* Schema: Navegación breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />
      {/* Schema: Página de colección */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_SCHEMA) }}
      />
      {/* Schema: FAQ para featured snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      {/* Schema: Serie de eventos */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENT_SERIES_SCHEMA) }}
      />
      {children}
    </>
  );
}
