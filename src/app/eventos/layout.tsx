import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Eventos en Suiza 2026-2027: Festivales, Conciertos, Mercados Navideños',
  description: 'Descubre +12 eventos en 20 ciudades de Suiza: Street Parade, Fasnacht Basel, Montreux Jazz, mercados navideños, eventos deportivos y culturales. Traducido al español, actualizado diariamente. Zürich, Ginebra, Basilea, Berna, Lucerna y más.',
  path: '/eventos',
  keywords: [
    // General eventos Suiza
    'eventos suiza', 'eventos en suiza', 'que hacer en suiza',
    'eventos suiza 2026', 'eventos suiza 2027', 'agenda suiza',
    'festivales suiza', 'conciertos suiza', 'fiestas suiza',

    // Eventos específicos populares
    'street parade zurich', 'fasnacht basel', 'montreux jazz festival',
    'mercadillo navideño zurich', 'mercado navidad suiza',
    'carnaval basel', 'festival jazz suiza', 'zibelemarit berna',

    // Por tipo de evento
    'festivales suiza', 'conciertos suiza', 'eventos culturales suiza',
    'mercados navideños suiza', 'eventos deportivos suiza',
    'eventos gastronomicos suiza', 'vida nocturna suiza',
    'festivales musica suiza', 'eventos tecnologia suiza',

    // Por ciudad principal
    'eventos zurich', 'eventos ginebra', 'eventos basilea',
    'eventos berna', 'eventos lausana', 'eventos lucerna',
    'eventos lugano', 'eventos montreux', 'eventos locarno',
    'que hacer en zurich', 'que hacer en ginebra', 'que hacer en basilea',

    // Long-tail específicos
    'mercadillo navideño zurich 2026', 'street parade zurich 2027',
    'fasnacht basel fechas', 'montreux jazz festival entradas',
    'eventos hispanohablantes suiza', 'agenda cultural suiza español',
    'festivales verano suiza', 'eventos invierno suiza',

    // Búsquedas de hispanohablantes
    'eventos para latinos en suiza', 'agenda suiza en español',
    'fiestas suiza hispanohablantes', 'que hacer fin de semana suiza',
    'eventos gratis suiza', 'festivales gratuitos suiza',

    // Por temporada
    'eventos navidad suiza', 'eventos verano suiza', 'eventos invierno suiza',
    'mercados navideños suiza 2026', 'festivales verano suiza 2027',

    // Por categoría específica
    'copa mundo esqui suiza', 'maraton ginebra', 'festival cine locarno',
    'festival luces lucerna', 'fiesta nacional suiza', 'tech summit zurich',
    'wine festival suiza', 'fiesta vendimia suiza',

    // Búsquedas de planificación
    'calendario eventos suiza', 'agenda eventos suiza',
    'proximos eventos suiza', 'eventos este mes suiza',
    'eventos hoy suiza', 'eventos fin de semana suiza'
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
  '@type': 'WebPage',
  name: 'Eventos en Suiza 2026-2027',
  description: 'Calendario de eventos en 20 ciudades de Suiza',
  url: 'https://hispanosensuiza.ch/eventos',
  inLanguage: 'es',
  isPartOf: {
    '@type': 'WebSite',
    name: 'HispanosEnSuiza',
    url: 'https://hispanosensuiza.ch'
  }
};

export default function EventosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENT_LIST_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_SCHEMA) }}
      />
      {children}
    </>
  );
}
