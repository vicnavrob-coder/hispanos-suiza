import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eventos en Suiza | Fiestas, Mercadillos y Festivales | HispanosEnSuiza',
  description: 'Descubre todos los eventos, fiestas, mercadillos navideños, festivales y actividades culturales en las principales ciudades de Suiza. Actualizado diariamente.',
  keywords: [
    'eventos suiza',
    'fiestas suiza',
    'mercadillos navideños suiza',
    'festivales suiza',
    'eventos zürich',
    'eventos ginebra',
    'eventos basilea',
    'fiestas latinas suiza',
    'eventos hispanohablantes suiza',
    'que hacer en suiza',
    'actividades suiza',
    'eventos culturales suiza',
    'mercadillos suiza',
    'conciertos suiza',
  ].join(', '),
  openGraph: {
    title: 'Eventos en Suiza - Fiestas, Mercadillos y Festivales',
    description: 'Encuentra eventos, fiestas, mercadillos navideños y festivales en Zürich, Ginebra, Basilea y otras ciudades suizas. Actualizado diariamente.',
    url: 'https://hispanosensuiza.ch/eventos',
    siteName: 'HispanosEnSuiza',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/images/og-eventos.jpg',
        width: 1200,
        height: 630,
        alt: 'Eventos en Suiza',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eventos en Suiza - Fiestas, Mercadillos y Festivales',
    description: 'Encuentra eventos, fiestas y festivales en las principales ciudades de Suiza',
    images: ['/images/og-eventos.jpg'],
  },
  alternates: {
    canonical: 'https://hispanosensuiza.ch/eventos',
  },
};

export default function EventosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
