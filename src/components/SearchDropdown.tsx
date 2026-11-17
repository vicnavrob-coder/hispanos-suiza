/**
 * src/components/SearchDropdown.tsx
 * Dropdown de resultados de búsqueda
 */

"use client";

import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import type { SearchIndexItem } from '@/lib/search';
import SearchResult from './SearchResult';

interface SearchDropdownProps {
  results: SearchIndexItem[];
  query: string;
  loading: boolean;
  onClose: () => void;
}

export default function SearchDropdown({
  results,
  query,
  loading,
  onClose,
}: SearchDropdownProps) {
  const displayedResults = results.slice(0, 8);
  const hasMore = results.length > 8;

  return (
    <div
      className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl
                 shadow-lg border border-[#E8E5E0] max-h-[500px] overflow-y-auto z-50
                 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {loading && (
        <div className="p-4 flex items-center justify-center gap-2 text-[#6B7280]">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Buscando...</span>
        </div>
      )}

      {!loading && results.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <div className="text-lg font-semibold text-[#0A0A0A] mb-2">
            No encontramos resultados para "{query}"
          </div>
          <div className="text-sm text-[#6B7280]">
            Intenta con otros términos o consulta nuestras{' '}
            <Link href="/blog" className="text-[#C8102E] hover:underline">
              guías principales
            </Link>
          </div>
        </div>
      )}

      {!loading && results.length > 0 && (
        <>
          <div className="p-2">
            {displayedResults.map(result => (
              <SearchResult
                key={result.id}
                result={result}
                query={query}
                onClick={onClose}
              />
            ))}
          </div>

          {hasMore && (
            <div className="border-t border-[#E8E5E0] p-3">
              <Link
                href={`/buscar?q=${encodeURIComponent(query)}`}
                className="text-sm text-[#C8102E] hover:underline font-medium"
                onClick={onClose}
              >
                Ver todos los {results.length} resultados →
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
