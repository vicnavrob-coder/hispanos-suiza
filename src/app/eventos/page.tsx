'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import EventoCard from '@/components/EventoCard';
import FiltrosEventos from '@/components/FiltrosEventos';
import type { Evento } from '@/lib/eventos';

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventosFiltrados, setEventosFiltrados] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    ciudad: 'all',
    categoria: 'all',
    fecha: 'all'
  });

  const [ciudades, setCiudades] = useState<string[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);

  // Cargar eventos al montar el componente
  useEffect(() => {
    async function fetchEventos() {
      try {
        const response = await fetch('/api/eventos');
        const data = await response.json();

        setEventos(data.eventos || []);
        setEventosFiltrados(data.eventos || []);

        // Extraer ciudades y categorías únicas
        const ciudadesUnicas = [...new Set(data.eventos.map((e: Evento) => e.ciudad))];
        const categoriasUnicas = [...new Set(data.eventos.map((e: Evento) => e.categoria))];

        setCiudades(ciudadesUnicas);
        setCategorias(categoriasUnicas);

      } catch (error) {
        console.error('Error cargando eventos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEventos();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...eventos];

    // Filtrar por ciudad
    if (filtros.ciudad !== 'all') {
      filtered = filtered.filter(e => e.ciudad === filtros.ciudad);
    }

    // Filtrar por categoría
    if (filtros.categoria !== 'all') {
      filtered = filtered.filter(e => e.categoria === filtros.categoria);
    }

    // Filtrar por fecha
    if (filtros.fecha !== 'all') {
      const hoy = new Date();

      switch (filtros.fecha) {
        case 'hoy':
          filtered = filtered.filter(e => {
            if (e.fecha === 'Por confirmar') return false;
            const fechaEvento = new Date(e.fecha);
            return fechaEvento.toDateString() === hoy.toDateString();
          });
          break;

        case 'semana':
          const unaSemana = new Date(hoy.getTime() + 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(e => {
            if (e.fecha === 'Por confirmar') return false;
            const fechaEvento = new Date(e.fecha);
            return fechaEvento >= hoy && fechaEvento <= unaSemana;
          });
          break;

        case 'mes':
          const unMes = new Date(hoy.getTime() + 30 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(e => {
            if (e.fecha === 'Por confirmar') return false;
            const fechaEvento = new Date(e.fecha);
            return fechaEvento >= hoy && fechaEvento <= unMes;
          });
          break;
      }
    }

    setEventosFiltrados(filtered);
  }, [filtros, eventos]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando eventos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="h-8 w-8" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Eventos en Suiza
              </h1>
            </div>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Descubre fiestas, mercadillos, festivales y eventos culturales en las principales ciudades de Suiza
            </p>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Actualizado diariamente</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>10 ciudades</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filtros */}
        <FiltrosEventos
          filtros={filtros}
          onChange={setFiltros}
          ciudades={ciudades}
          categorias={categorias}
        />

        {/* Contador de resultados */}
        <div className="mb-6">
          <p className="text-gray-600">
            {eventosFiltrados.length === 0 ? (
              'No se encontraron eventos con los filtros seleccionados'
            ) : (
              <>
                Mostrando <span className="font-semibold text-green-600">{eventosFiltrados.length}</span> evento{eventosFiltrados.length !== 1 ? 's' : ''}
              </>
            )}
          </p>
        </div>

        {/* Grid de Eventos */}
        {eventosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventosFiltrados.map((evento) => (
              <EventoCard key={evento.id} evento={evento} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No hay eventos disponibles
            </h3>
            <p className="text-gray-500">
              Intenta cambiar los filtros o vuelve más tarde
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Organizas eventos en Suiza?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contacta con nosotros para aparecer en nuestro calendario de eventos y llegar a miles de hispanohablantes en Suiza
          </p>
          <a
            href="mailto:info@hispanosensuiza.ch"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Contactar
          </a>
        </div>
      </div>
    </div>
  );
}
