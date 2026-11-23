'use client';

import { Filter } from 'lucide-react';

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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">Filtrar Eventos</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ciudad */}
        <div>
          <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-2">
            Ciudad
          </label>
          <select
            id="ciudad"
            value={filtros.ciudad}
            onChange={(e) => handleChange('ciudad', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            id="categoria"
            value={filtros.categoria}
            onChange={(e) => handleChange('categoria', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
            Fecha
          </label>
          <select
            id="fecha"
            value={filtros.fecha}
            onChange={(e) => handleChange('fecha', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">Todas las fechas</option>
            <option value="hoy">Hoy</option>
            <option value="semana">Esta semana</option>
            <option value="mes">Este mes</option>
          </select>
        </div>
      </div>

      {/* Botón limpiar filtros */}
      {(filtros.ciudad !== 'all' || filtros.categoria !== 'all' || filtros.fecha !== 'all') && (
        <div className="mt-4">
          <button
            onClick={() => onChange({ ciudad: 'all', categoria: 'all', fecha: 'all' })}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
