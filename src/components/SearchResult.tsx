/**
 * src/components/SearchResult.tsx
 * Componente individual de resultado de búsqueda
 */

"use client";

import Link from 'next/link';
import { highlightMatch, TYPE_ICONS, TYPE_LABELS, type SearchIndexItem } from '@/lib/search';

interface SearchResultProps {
  result: SearchIndexItem;
  query: string;
  onClick?: () => void;
}

export default function SearchResult({ result, query, onClick }: SearchResultProps) {
  const icon = TYPE_ICONS[result.type] || '📄';
  const label = TYPE_LABELS[result.type] || 'Contenido';

  return (
    <Link
      href={result.url}
      className="block p-3 rounded-lg hover:bg-[#F8F6F3] transition-colors"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {/* Icono del tipo */}
        <span className="text-2xl flex-shrink-0">{icon}</span>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          {/* Título */}
          <div
            className="font-semibold text-[#0A0A0A] text-sm mb-0.5 line-clamp-1"
            dangerouslySetInnerHTML={{ __html: highlightMatch(result.titulo, query) }}
          />

          {/* Descripción */}
          <div
            className="text-xs text-[#6B7280] line-clamp-2"
            dangerouslySetInnerHTML={{ __html: highlightMatch(result.descripcion, query) }}
          />

          {/* Badge de tipo */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8102E]/10 text-[#C8102E] font-medium">
              {label}
            </span>
            {result.categoria && (
              <span className="text-[10px] text-[#9CA3AF]">
                {result.categoria}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
