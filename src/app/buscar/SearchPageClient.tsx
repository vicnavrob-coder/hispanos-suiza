/**
 * src/app/buscar/SearchPageClient.tsx
 * Cliente de la página de búsqueda
 */

"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Loader2 } from 'lucide-react';
import { loadSearchIndex, searchIndex as performSearch, type SearchIndexItem } from '@/lib/search';
import SearchResult from '@/components/SearchResult';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<SearchIndexItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar cuando cambia la query
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    loadSearchIndex()
      .then(index => {
        const searchResults = performSearch(query, index.items);
        setResults(searchResults);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading search index:', err);
        setError('Error al cargar los resultados');
        setLoading(false);
      });
  }, [query]);

  // Actualizar query cuando cambia el parámetro URL
  useEffect(() => {
    if (queryParam) setQuery(queryParam);
  }, [queryParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length >= 2) {
      window.history.pushState({}, '', `/buscar?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#C8102E] mb-4"
          >
            ← Volver a inicio
          </Link>
          <h1 className="text-3xl font-bold text-[#0A0A0A] mb-2">
            Buscar en HispanosEnSuiza
          </h1>
          <p className="text-[#6B7280]">
            Encuentra guías, herramientas y recursos para emigrar a Suiza
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar RAV, vivienda, ciudades..."
              className="w-full px-4 py-3 pl-12 rounded-xl border border-[#E8E5E0]
                         focus:border-[#C8102E] focus:outline-none focus:ring-2
                         focus:ring-[#C8102E]/20 text-base"
              style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] w-5 h-5" />
          </div>
        </form>

        {/* Results Count */}
        {!loading && query.length >= 2 && (
          <div className="mb-6 text-sm text-[#6B7280]">
            {results.length === 0 ? (
              'No se encontraron resultados'
            ) : (
              <>
                {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para{' '}
                <strong className="text-[#0A0A0A]">"{query}"</strong>
              </>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center gap-2 text-[#6B7280] py-12">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Buscando...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && query.length >= 2 && results.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-xl font-semibold text-[#0A0A0A] mb-2">
              No encontramos resultados para "{query}"
            </div>
            <div className="text-[#6B7280] mb-6">
              Intenta con otros términos o explora nuestro contenido:
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href="/blog"
                className="px-4 py-2 bg-white border border-[#E8E5E0] rounded-lg
                           hover:border-[#C8102E] hover:text-[#C8102E] transition-colors"
              >
                📝 Blog
              </Link>
              <Link
                href="/ciudades"
                className="px-4 py-2 bg-white border border-[#E8E5E0] rounded-lg
                           hover:border-[#C8102E] hover:text-[#C8102E] transition-colors"
              >
                🏙️ Ciudades
              </Link>
              <Link
                href="/herramientas"
                className="px-4 py-2 bg-white border border-[#E8E5E0] rounded-lg
                           hover:border-[#C8102E] hover:text-[#C8102E] transition-colors"
              >
                🔧 Herramientas
              </Link>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="bg-white rounded-xl border border-[#E8E5E0] overflow-hidden">
            {results.map(result => (
              <div key={result.id} className="border-b border-[#E8E5E0] last:border-b-0">
                <SearchResult result={result} query={query} />
              </div>
            ))}
          </div>
        )}

        {/* Prompt State */}
        {!loading && !error && query.length < 2 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-xl font-semibold text-[#0A0A0A] mb-2">
              ¿Qué estás buscando?
            </div>
            <div className="text-[#6B7280] mb-6">
              Escribe al menos 2 caracteres para buscar
            </div>
            <div className="text-sm text-[#6B7280]">
              Ejemplos: <strong>RAV</strong>, <strong>Zúrich alquiler</strong>,{' '}
              <strong>seguros médicos</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPageClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#C8102E]" />
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
