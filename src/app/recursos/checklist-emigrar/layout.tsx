import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checklist Emigrar a Suiza | 50 Pasos Esenciales | HispanosEnSuiza',
  description:
    'Descarga gratis el checklist completo para emigrar a Suiza desde Espana. 50 pasos esenciales: documentos, trabajo, vivienda, permisos y mas.',
  keywords: [
    'emigrar a suiza',
    'checklist emigrar suiza',
    'mudarse a suiza',
    'trabajar en suiza',
    'vivir en suiza',
    'espanoles en suiza',
    'permisos suiza',
    'documentos suiza',
  ],
  openGraph: {
    title: 'Checklist: 50 Pasos para Emigrar a Suiza',
    description:
      'Todo lo que necesitas hacer antes, durante y despues de mudarte a Suiza. Descarga gratis.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Checklist Emigrar a Suiza - Gratis',
    description: '50 pasos esenciales para mudarte a Suiza sin olvidar nada.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
