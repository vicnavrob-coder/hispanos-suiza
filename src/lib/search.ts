/**
 * src/lib/search.ts
 * Librería de búsqueda client-side para HispanosEnSuiza
 */

"use client";

import { useState, useEffect, type ReactNode } from 'react';

// ────────────────────────────────────────────────────────────
// TIPOS
// ────────────────────────────────────────────────────────────

export type SearchItemType =
  | 'post'
  | 'ciudad'
  | 'actividad'
  | 'pais'
  | 'historia'
  | 'herramienta'
  | 'recurso'
  | 'guia'
  | 'pagina';

export type SearchIndexItem = {
  id: string;
  type: SearchItemType;
  titulo: string;
  descripcion: string;
  contenido?: string;
  url: string;
  categoria?: string;
  keywords: string[];
  relevancia: number;
  imagen?: string;
};

export type SearchIndex = {
  version: string;
  generatedAt: string;
  items: SearchIndexItem[];
};

// ────────────────────────────────────────────────────────────
// METADATA DE TIPOS
// ────────────────────────────────────────────────────────────

export const TYPE_ICONS: Record<SearchItemType, string> = {
  post: '📝',
  ciudad: '🏙️',
  actividad: '🏔️',
  pais: '🌎',
  historia: '❤️',
  herramienta: '🔧',
  recurso: '📋',
  guia: '📖',
  pagina: '📄',
};

export const TYPE_LABELS: Record<SearchItemType, string> = {
  post: 'Blog',
  ciudad: 'Ciudad',
  actividad: 'Plan',
  pais: 'País',
  historia: 'Historia',
  herramienta: 'Herramienta',
  recurso: 'Recurso',
  guia: 'Guía',
  pagina: 'Página',
};

// ────────────────────────────────────────────────────────────
// CARGA DEL ÍNDICE (Lazy Load con Cache)
// ────────────────────────────────────────────────────────────

let cachedSearchIndex: SearchIndex | null = null;
let loadingPromise: Promise<SearchIndex> | null = null;

export async function loadSearchIndex(): Promise<SearchIndex> {
  // Si ya está cargado, retornar
  if (cachedSearchIndex) return cachedSearchIndex;

  // Si ya está cargando, retornar la misma promesa
  if (loadingPromise) return loadingPromise;

  // Cargar índice
  loadingPromise = fetch('/search-index.json')
    .then(r => {
      if (!r.ok) throw new Error(`Failed to load search index: ${r.status}`);
      return r.json();
    })
    .then((data: SearchIndex) => {
      cachedSearchIndex = data;
      return data;
    })
    .catch(err => {
      loadingPromise = null; // Reset para permitir retry
      throw err;
    });

  return loadingPromise;
}

// ────────────────────────────────────────────────────────────
// NORMALIZACIÓN DE TEXTO
// ────────────────────────────────────────────────────────────

/**
 * Normaliza texto: lowercase, sin acentos, trim
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
    .trim();
}

/**
 * Escapa caracteres especiales regex
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ────────────────────────────────────────────────────────────
// ALGORITMO DE SCORING
// ────────────────────────────────────────────────────────────

/**
 * Calcula score de relevancia (0-100) para un item
 */
function calculateScore(
  item: SearchIndexItem,
  terms: string[],
  fullQuery: string
): number {
  let score = item.relevancia || 0;

  const tituloNorm = normalizeText(item.titulo);
  const descripcionNorm = normalizeText(item.descripcion);
  const contenidoNorm = normalizeText(item.contenido || '');
  const keywordsNorm = item.keywords.map(normalizeText);

  // 1. MATCH EXACTO EN TÍTULO (+50 puntos)
  if (tituloNorm.includes(fullQuery)) {
    score += 50;
  }

  // 2. MATCH PARCIAL EN TÍTULO (+30 puntos dividido por términos)
  terms.forEach(term => {
    if (tituloNorm.includes(term)) {
      score += 30 / terms.length;
    }
  });

  // 3. MATCH EN KEYWORDS (+20 puntos dividido por términos)
  terms.forEach(term => {
    if (keywordsNorm.some(k => k.includes(term))) {
      score += 20 / terms.length;
    }
  });

  // 4. MATCH EN DESCRIPCIÓN (+15 puntos dividido por términos)
  terms.forEach(term => {
    if (descripcionNorm.includes(term)) {
      score += 15 / terms.length;
    }
  });

  // 5. MATCH EN CONTENIDO (+5 puntos dividido por términos)
  if (contenidoNorm) {
    terms.forEach(term => {
      if (contenidoNorm.includes(term)) {
        score += 5 / terms.length;
      }
    });
  }

  return score;
}

// ────────────────────────────────────────────────────────────
// BÚSQUEDA PRINCIPAL
// ────────────────────────────────────────────────────────────

/**
 * Busca en el índice y retorna resultados ordenados por score
 */
export function searchIndex(
  query: string,
  index: SearchIndexItem[]
): SearchIndexItem[] {
  const q = normalizeText(query);
  const terms = q.split(/\s+/).filter(t => t.length >= 2);

  if (terms.length === 0) return [];

  const results = index
    .map(item => ({
      item,
      score: calculateScore(item, terms, q),
    }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(r => r.item);

  return results;
}

// ────────────────────────────────────────────────────────────
// HIGHLIGHTING DE TÉRMINOS
// ────────────────────────────────────────────────────────────

/**
 * Resalta los términos de búsqueda en un texto
 */
export function highlightMatch(text: string, query: string): string {
  if (!query) return text;

  const terms = normalizeText(query)
    .split(/\s+/)
    .filter(t => t.length >= 2);

  let highlighted = text;

  terms.forEach(term => {
    const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
    highlighted = highlighted.replace(
      regex,
      '<mark class="bg-yellow-200 text-black px-0.5 rounded">$1</mark>'
    );
  });

  return highlighted;
}

// ────────────────────────────────────────────────────────────
// REACT HOOKS
// ────────────────────────────────────────────────────────────

/**
 * Hook de debouncing
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook principal de búsqueda
 */
export function useSearch(query: string) {
  const [results, setResults] = useState<SearchIndexItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    // No buscar si query es muy corto
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    loadSearchIndex()
      .then(index => {
        const searchResults = searchIndex(debouncedQuery, index.items);
        setResults(searchResults);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading search index:', err);
        setError('Error al cargar el índice de búsqueda');
        setLoading(false);
      });
  }, [debouncedQuery]);

  return { results, loading, error };
}
