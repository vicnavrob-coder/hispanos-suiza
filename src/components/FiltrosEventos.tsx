'use client';

import { Filter, X } from 'lucide-react';

interface FiltrosEventosProps {
  filtros: {
    ciudad: string;
    categoria: string;
    fecha: string;
  };
  onChange: (filtros: any) => void;
  ciudades: string[];
  categorias: string[];
}

const CATEGORIAS_DISPLAY: Record<string, string> = {
  'christmas': '🎄 Mercadillos Navideños',
  'culture': '🎭 Cultura y Arte',
  'music': '🎵 Música y Conciertos',
  'sports': '🏃 Deportes',
  'food': '🍴 Gastronomía',
  'festival': '🎊 Festivales',
  'family': '👨‍👩‍👧 Familia y Niños',
  'outdoor': '🌳 Aire Libre',
  'other': '🎉 Otros Eventos'
};

export default function FiltrosEventos({
  filtros,
  onChange,
  ciudades,
  categorias
}: FiltrosEventosProps) {
  const handleChange = (campo: string, valor: string) => {
    onChange({
      ...filtros,
      [campo]: valor
    });
  };

  const hayFiltrosActivos = filtros.ciudad !== 'all' || filtros.categoria !== 'all' || filtros.fecha !== 'all';

  return (
    <div
      className="bg-white rounded-2xl p-6 mb-8 shadow-sm"
      style={{ border: '1px solid #E8E5E0' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: '#FFF1F3' }}
          >
            <Filter className="h-4 w-4" style={{ color: '#C8102E' }} />
          </div>
          <h2
            className="text-lg font-bold"
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              color: '#0A0A0A'
            }}
          >
            Filtrar Eventos
          </h2>
        </div>

        {/* Botón limpiar filtros */}
        {hayFiltrosActivos && (
          <button
            onClick={() => onChange({ ciudad: 'all', categoria: 'all', fecha: 'all' })}
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{
              color: '#C8102E',
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif'
            }}
          >
            <X className="h-4 w-4" />
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ciudad */}
        <div>
          <label
            htmlFor="ciudad"
            className="block text-sm font-semibold mb-2"
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#374151'
            }}
          >
            📍 Ciudad
          </label>
          <select
            id="ciudad"
            value={filtros.ciudad}
            onChange={(e) => handleChange('ciudad', e.target.value)}
            className="w-full px-4 py-3 rounded-xl transition-all focus:outline-none"
            style={{
              border: '1.5px solid #E8E5E0',
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#374151',
              fontSize: '0.875rem',
              background: '#ffffff'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#C8102E';
              e.target.style.boxShadow = '0 0 0 3px rgba(200,16,46,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E8E5E0';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="all">Todas las ciudades</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad} value={ciudad}>
                {ciudad}
              </option>
            ))}
          </select>
        </div>

        {/* Categoría */}
        <div>
          <label
            htmlFor="categoria"
            className="block text-sm font-semibold mb-2"
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#374151'
            }}
          >
            🎯 Categoría
          </label>
          <select
            id="categoria"
            value={filtros.categoria}
            onChange={(e) => handleChange('categoria', e.target.value)}
            className="w-full px-4 py-3 rounded-xl transition-all focus:outline-none"
            style={{
              border: '1.5px solid #E8E5E0',
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#374151',
              fontSize: '0.875rem',
              background: '#ffffff'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#C8102E';
              e.target.style.boxShadow = '0 0 0 3px rgba(200,16,46,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E8E5E0';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="all">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORIAS_DISPLAY[cat] || cat}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label
            htmlFor="fecha"
            className="block text-sm font-semibold mb-2"
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#374151'
            }}
          >
            📅 Fecha
          </label>
          <select
            id="fecha"
            value={filtros.fecha}
            onChange={(e) => handleChange('fecha', e.target.value)}
            className="w-full px-4 py-3 rounded-xl transition-all focus:outline-none"
            style={{
              border: '1.5px solid #E8E5E0',
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#374151',
              fontSize: '0.875rem',
              background: '#ffffff'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#C8102E';
              e.target.style.boxShadow = '0 0 0 3px rgba(200,16,46,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E8E5E0';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="all">Todas las fechas</option>
            <option value="hoy">Hoy</option>
            <option value="semana">Esta semana</option>
            <option value="mes">Este mes</option>
          </select>
        </div>
      </div>

      {/* Indicadores de filtros activos */}
      {hayFiltrosActivos && (
        <div className="mt-5 flex flex-wrap gap-2">
          {filtros.ciudad !== 'all' && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: '#FFF1F3',
                color: '#C8102E',
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif'
              }}
            >
              📍 {filtros.ciudad}
            </span>
          )}
          {filtros.categoria !== 'all' && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: '#FFF1F3',
                color: '#C8102E',
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif'
              }}
            >
              {CATEGORIAS_DISPLAY[filtros.categoria] || filtros.categoria}
            </span>
          )}
          {filtros.fecha !== 'all' && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: '#FFF1F3',
                color: '#C8102E',
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif'
              }}
            >
              📅 {filtros.fecha === 'hoy' ? 'Hoy' : filtros.fecha === 'semana' ? 'Esta semana' : 'Este mes'}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
