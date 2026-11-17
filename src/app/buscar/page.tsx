/**
 * src/app/buscar/page.tsx
 * Página completa de resultados de búsqueda
 */

import { Metadata } from 'next';
import SearchPageClient from './SearchPageClient';

// Metadata (Server Component)
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string };
}): Promise<Metadata> {
  const query = searchParams.q || '';

  return {
    title: query
      ? `Resultados para "${query}" — HispanosEnSuiza`
      : 'Buscar — HispanosEnSuiza',
    description: query
      ? `Resultados de búsqueda para "${query}" en HispanosEnSuiza.ch`
      : 'Busca información sobre emigrar, vivir y trabajar en Suiza para hispanohablantes',
    robots: 'noindex, follow',
  };
}

// Server Component wrapper
export default function SearchPage() {
  return <SearchPageClient />;
}
