/**
 * src/components/SearchBar.tsx
 * Componente principal del buscador
 */

"use client";

import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '@/lib/search';
import SearchDropdown from './SearchDropdown';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { results, loading } = useSearch(query);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cerrar dropdown con Escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.length >= 2) setIsOpen(true);
          }}
          placeholder="Buscar RAV, vivienda, ciudades..."
          className="w-full px-4 py-2 pl-10 rounded-full border border-[#E8E5E0]
                     focus:border-[#C8102E] focus:outline-none focus:ring-2
                     focus:ring-[#C8102E]/20 text-sm transition-all"
          style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] w-4 h-4" />
      </div>

      {isOpen && query.length >= 2 && (
        <SearchDropdown
          results={results}
          query={query}
          loading={loading}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
