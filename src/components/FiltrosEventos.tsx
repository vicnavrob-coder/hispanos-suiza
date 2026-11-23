'use client';

import { Filter, X, Search, Calendar, TrendingUp } from 'lucide-react';

interface FiltrosEventosProps {
  filtros: {
    ciudad: string;
    categoria: string;
    fecha: string;
    busqueda: string;
    precio: string;
    ordenar: string;
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
  'wine': '🍷 Vino y Gastronomía',
  'winter': '⛷️ Deportes de Invierno',
  'tech': '💻 Tecnología e Innovación',
  'art': '🎨 Arte y Exposiciones',
  'nightlife': '🎉 Vida Nocturna',
  'other': '🎪 Otros Eventos'
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

  const limpiarFiltros = () => {
    onChange({
      ciudad: 'all',
      categoria: 'all',
      fecha: 'all',
      busqueda: '',
      precio: 'all',
      ordenar: 'fecha'
    });
  };

  const busquedaRapida = (busqueda: string) => {
    onChange({
      ...filtros,
      busqueda
    });
  };

  const hayFiltrosActivos = filtros.ciudad !== 'all' ||
    filtros.categoria !== 'all' ||
    filtros.fecha !== 'all' ||
    filtros.busqueda !== '' ||
    filtros.precio !== 'all' ||
    filtros.ordenar !== 'fecha';

  return (
    <div
      className="bg-white rounded-2xl p-6 mb-8 shadow-sm"
      style={{ border: '1px solid #E8E5E0' }}
    >
      <div className="flex items-center justify-between mb-6">
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
            Buscar y Filtrar Eventos
          </h2>
        </div>

        {/* Botón limpiar filtros */}
        {hayFiltrosActivos && (
          <button
            onClick={limpiarFiltros}
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{
              color: '#C8102E',
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif'
            }}
          >
            <X className="h-4 w-4" />
            Limpiar todo
          </button>
        )}
      </div>

      {/* Búsqueda por texto */}
      <div className="mb-5">
        <label
          htmlFor="busqueda"
          className="block text-sm font-semibold mb-2"
          style={{
            fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
            color: '#374151'
          }}
        >
          🔍 Buscar por nombre
        </label>
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5"
            style={{ color: '#9CA3AF' }}
          />
          <input
            id="busqueda"
            type="text"
            value={filtros.busqueda}
            onChange={(e) => handleChange('busqueda', e.target.value)}
            placeholder="Ej: Street Parade, Fasnacht, Montreux..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl transition-all focus:outline-none"
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
          />
        </div>
      </div>

      {/* Búsquedas rápidas */}
      <div className="mb-5">
        <p
          className="text-xs font-semibold mb-2.5"
          style={{
            fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
            color: '#6B7280'
          }}
        >
          🔥 Búsquedas populares
        </p>
        <div className="flex flex-wrap gap-2">
          {['Navidad', 'Festival', 'Zürich', 'Gratis', 'Música'].map((termino) => (
            <button
              key={termino}
              onClick={() => busquedaRapida(termino)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 active:scale-95"
              style={{
                background: filtros.busqueda === termino ? '#C8102E' : '#F8F6F3',
                color: filtros.busqueda === termino ? '#ffffff' : '#6B7280',
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                border: '1px solid',
                borderColor: filtros.busqueda === termino ? '#C8102E' : '#E8E5E0'
              }}
            >
              {termino}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-5">
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

        {/* Fecha mejorada */}
        <div>
          <label
            htmlFor="fecha"
            className="block text-sm font-semibold mb-2"
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#374151'
            }}
          >
            📅 Cuándo
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
            <option value="manana">Mañana</option>
            <option value="fin-semana">Este fin de semana</option>
            <option value="semana">Próximos 7 días</option>
            <option value="15-dias">Próximos 15 días</option>
            <option value="mes">Este mes</option>
            <option value="proximo-mes">Próximo mes</option>
            <option value="3-meses">Próximos 3 meses</option>
          </select>
        </div>

        {/* Precio */}
        <div>
          <label
            htmlFor="precio"
            className="block text-sm font-semibold mb-2"
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#374151'
            }}
          >
            💰 Precio
          </label>
          <select
            id="precio"
            value={filtros.precio}
            onChange={(e) => handleChange('precio', e.target.value)}
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
            <option value="all">Todos los precios</option>
            <option value="gratis">Gratis</option>
            <option value="pago">De pago</option>
          </select>
        </div>

        {/* Ordenar */}
        <div>
          <label
            htmlFor="ordenar"
            className="block text-sm font-semibold mb-2"
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#374151'
            }}
          >
            🔄 Ordenar
          </label>
          <select
            id="ordenar"
            value={filtros.ordenar}
            onChange={(e) => handleChange('ordenar', e.target.value)}
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
            <option value="fecha">Por fecha</option>
            <option value="alfabetico">Alfabético (A-Z)</option>
            <option value="relevancia">Por relevancia</option>
          </select>
        </div>
      </div>

      {/* Indicadores de filtros activos */}
      {hayFiltrosActivos && (
        <div className="pt-4 border-t flex flex-wrap gap-2" style={{ borderColor: '#F0EDEA' }}>
          <span
            className="text-xs font-semibold"
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#6B7280'
            }}
          >
            Filtros activos:
          </span>

          {filtros.busqueda !== '' && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: '#FFF1F3',
                color: '#C8102E',
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif'
              }}
            >
              🔍 "{filtros.busqueda}"
            </span>
          )}

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
              📅 {
                filtros.fecha === 'hoy' ? 'Hoy' :
                filtros.fecha === 'manana' ? 'Mañana' :
                filtros.fecha === 'fin-semana' ? 'Este fin de semana' :
                filtros.fecha === 'semana' ? 'Próximos 7 días' :
                filtros.fecha === '15-dias' ? 'Próximos 15 días' :
                filtros.fecha === 'mes' ? 'Este mes' :
                filtros.fecha === 'proximo-mes' ? 'Próximo mes' :
                filtros.fecha === '3-meses' ? 'Próximos 3 meses' :
                filtros.fecha
              }
            </span>
          )}

          {filtros.precio !== 'all' && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: '#FFF1F3',
                color: '#C8102E',
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif'
              }}
            >
              💰 {filtros.precio === 'gratis' ? 'Gratis' : 'De pago'}
            </span>
          )}

          {filtros.ordenar !== 'fecha' && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: '#FFF1F3',
                color: '#C8102E',
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif'
              }}
            >
              🔄 {
                filtros.ordenar === 'alfabetico' ? 'A-Z' :
                filtros.ordenar === 'relevancia' ? 'Relevancia' :
                'Por fecha'
              }
            </span>
          )}
        </div>
      )}
    </div>
  );
}
