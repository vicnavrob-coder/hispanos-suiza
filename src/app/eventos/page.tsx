'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Sparkles, TrendingUp } from 'lucide-react';
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
    fecha: 'all',
    busqueda: '',
    precio: 'all',
    ordenar: 'fecha'
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
        const ciudadesUnicas = [...new Set(data.eventos.map((e: Evento) => e.ciudad))] as string[];
        const categoriasUnicas = [...new Set(data.eventos.map((e: Evento) => e.categoria))] as string[];

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

    // Filtrar por búsqueda de texto
    if (filtros.busqueda !== '') {
      const busquedaLower = filtros.busqueda.toLowerCase();
      filtered = filtered.filter(e =>
        e.titulo.toLowerCase().includes(busquedaLower) ||
        (e.descripcion && e.descripcion.toLowerCase().includes(busquedaLower)) ||
        e.ciudad.toLowerCase().includes(busquedaLower)
      );
    }

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
      hoy.setHours(0, 0, 0, 0);

      switch (filtros.fecha) {
        case 'hoy':
          filtered = filtered.filter(e => {
            if (e.fecha === 'Por confirmar') return false;
            const fechaEvento = new Date(e.fecha);
            fechaEvento.setHours(0, 0, 0, 0);
            return fechaEvento.getTime() === hoy.getTime();
          });
          break;

        case 'manana':
          const manana = new Date(hoy.getTime() + 24 * 60 * 60 * 1000);
          filtered = filtered.filter(e => {
            if (e.fecha === 'Por confirmar') return false;
            const fechaEvento = new Date(e.fecha);
            fechaEvento.setHours(0, 0, 0, 0);
            return fechaEvento.getTime() === manana.getTime();
          });
          break;

        case 'fin-semana':
          // Encontrar el próximo sábado y domingo
          const diaSemana = hoy.getDay();
          const diasHastaSabado = diaSemana === 0 ? 6 : 6 - diaSemana;
          const sabado = new Date(hoy.getTime() + diasHastaSabado * 24 * 60 * 60 * 1000);
          const domingo = new Date(sabado.getTime() + 24 * 60 * 60 * 1000);
          filtered = filtered.filter(e => {
            if (e.fecha === 'Por confirmar') return false;
            const fechaEvento = new Date(e.fecha);
            fechaEvento.setHours(0, 0, 0, 0);
            return fechaEvento.getTime() >= sabado.getTime() && fechaEvento.getTime() <= domingo.getTime();
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

        case '15-dias':
          const quinceDias = new Date(hoy.getTime() + 15 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(e => {
            if (e.fecha === 'Por confirmar') return false;
            const fechaEvento = new Date(e.fecha);
            return fechaEvento >= hoy && fechaEvento <= quinceDias;
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

        case 'proximo-mes':
          const inicioProximoMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 1);
          const finProximoMes = new Date(hoy.getFullYear(), hoy.getMonth() + 2, 0);
          filtered = filtered.filter(e => {
            if (e.fecha === 'Por confirmar') return false;
            const fechaEvento = new Date(e.fecha);
            return fechaEvento >= inicioProximoMes && fechaEvento <= finProximoMes;
          });
          break;

        case '3-meses':
          const tresMeses = new Date(hoy.getTime() + 90 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(e => {
            if (e.fecha === 'Por confirmar') return false;
            const fechaEvento = new Date(e.fecha);
            return fechaEvento >= hoy && fechaEvento <= tresMeses;
          });
          break;
      }
    }

    // Filtrar por precio
    if (filtros.precio !== 'all') {
      if (filtros.precio === 'gratis') {
        filtered = filtered.filter(e => e.precio && e.precio.toLowerCase().includes('gratis'));
      } else if (filtros.precio === 'pago') {
        filtered = filtered.filter(e => e.precio && !e.precio.toLowerCase().includes('gratis'));
      }
    }

    // Ordenar resultados
    switch (filtros.ordenar) {
      case 'alfabetico':
        filtered.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;

      case 'relevancia':
        // Ordenar por categorías populares primero, luego por fecha
        const categoriasPopulares = ['christmas', 'festival', 'music', 'culture'];
        filtered.sort((a, b) => {
          const aPopular = categoriasPopulares.includes(a.categoria) ? 0 : 1;
          const bPopular = categoriasPopulares.includes(b.categoria) ? 0 : 1;
          if (aPopular !== bPopular) return aPopular - bPopular;

          // Si ambos son igual de populares, ordenar por fecha
          if (a.fecha === 'Por confirmar') return 1;
          if (b.fecha === 'Por confirmar') return -1;
          return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
        });
        break;

      case 'fecha':
      default:
        // Ordenar por fecha (más próximos primero)
        filtered.sort((a, b) => {
          if (a.fecha === 'Por confirmar') return 1;
          if (b.fecha === 'Por confirmar') return -1;
          return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
        });
        break;
    }

    setEventosFiltrados(filtered);
  }, [filtros, eventos]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8F6F3' }}>
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-14 w-14 border-4 border-t-transparent mx-auto mb-4"
            style={{ borderColor: '#C8102E', borderTopColor: 'transparent' }}
          />
          <p
            className="font-medium"
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#6B7280'
            }}
          >
            Cargando eventos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#F8F6F3' }}>
      {/* Hero Section */}
      <section style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-6"
              style={{
                background: 'rgba(200,16,46,0.14)',
                border: '1px solid rgba(200,16,46,0.3)',
                color: '#F87171',
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif'
              }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Actualizado diariamente</span>
            </div>

            {/* Título */}
            <h1
              className="font-black mb-5 leading-tight"
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: '#ffffff'
              }}
            >
              Eventos en <span style={{ color: '#C8102E' }}>Suiza</span>
            </h1>

            {/* Descripción */}
            <p
              className="max-w-2xl mx-auto mb-8 leading-relaxed"
              style={{
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                color: '#9CA3AF',
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)'
              }}
            >
              Descubre fiestas, mercadillos navideños, festivales y eventos culturales en las principales ciudades de Suiza.
              Toda la información traducida al español.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(200,16,46,0.14)' }}
                >
                  <Calendar className="h-5 w-5" style={{ color: '#C8102E' }} />
                </div>
                <div className="text-left">
                  <div
                    className="text-xl font-black"
                    style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      color: '#ffffff'
                    }}
                  >
                    {eventos.length}+
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                      color: '#9CA3AF'
                    }}
                  >
                    Eventos activos
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(200,16,46,0.14)' }}
                >
                  <MapPin className="h-5 w-5" style={{ color: '#C8102E' }} />
                </div>
                <div className="text-left">
                  <div
                    className="text-xl font-black"
                    style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      color: '#ffffff'
                    }}
                  >
                    {ciudades.length}
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                      color: '#9CA3AF'
                    }}
                  >
                    Ciudades cubiertas
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(200,16,46,0.14)' }}
                >
                  <TrendingUp className="h-5 w-5" style={{ color: '#C8102E' }} />
                </div>
                <div className="text-left">
                  <div
                    className="text-xl font-black"
                    style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      color: '#ffffff'
                    }}
                  >
                    100%
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                      color: '#9CA3AF'
                    }}
                  >
                    En español
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Filtros */}
        <FiltrosEventos
          filtros={filtros}
          onChange={setFiltros}
          ciudades={ciudades}
          categorias={categorias}
        />

        {/* Contador de resultados mejorado */}
        <div
          className="mb-6 p-4 rounded-xl flex items-center justify-between"
          style={{
            background: '#ffffff',
            border: '1px solid #E8E5E0'
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: '#FFF1F3' }}
            >
              <Calendar className="h-5 w-5" style={{ color: '#C8102E' }} />
            </div>
            <div>
              <p
                className="text-sm font-semibold"
                style={{
                  fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                  color: '#374151'
                }}
              >
                {eventosFiltrados.length === 0 ? (
                  'No se encontraron eventos'
                ) : (
                  <>
                    <span
                      className="text-xl font-black"
                      style={{
                        color: '#C8102E',
                        fontFamily: 'var(--font-playfair), Georgia, serif'
                      }}
                    >
                      {eventosFiltrados.length}
                    </span>
                    {' evento'}
                    {eventosFiltrados.length !== 1 ? 's' : ''}
                    {' encontrado'}
                    {eventosFiltrados.length !== 1 ? 's' : ''}
                  </>
                )}
              </p>
              {eventosFiltrados.length > 0 && (
                <p
                  className="text-xs"
                  style={{
                    fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                    color: '#9CA3AF'
                  }}
                >
                  de {eventos.length} eventos totales
                </p>
              )}
            </div>
          </div>

          {eventosFiltrados.length === 0 && (
            <p
              className="text-xs"
              style={{
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                color: '#9CA3AF'
              }}
            >
              Prueba con otros filtros
            </p>
          )}
        </div>

        {/* Grid de Eventos */}
        {eventosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventosFiltrados.map((evento) => (
              <EventoCard key={evento.id} evento={evento} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 bg-white rounded-2xl"
            style={{ border: '1px solid #E8E5E0' }}
          >
            <Calendar
              className="h-16 w-16 mx-auto mb-4"
              style={{ color: '#D1D5DB' }}
            />
            <h3
              className="text-xl font-bold mb-2"
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                color: '#374151'
              }}
            >
              No hay eventos disponibles
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                color: '#9CA3AF',
                fontSize: '0.875rem'
              }}
            >
              Intenta cambiar los filtros o vuelve más tarde
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section
        className="border-t"
        style={{ background: '#0A0A0A', borderColor: '#1a1a1a' }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-5"
            style={{
              background: 'rgba(200,16,46,0.14)',
              border: '1px solid rgba(200,16,46,0.3)',
              color: '#F87171',
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif'
            }}
          >
            📢 Para organizadores
          </div>

          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              color: '#ffffff',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)'
            }}
          >
            ¿Organizas eventos en Suiza?
          </h2>

          <p
            className="mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#9CA3AF',
              fontSize: '1rem'
            }}
          >
            Contacta con nosotros para aparecer en nuestro calendario de eventos y llegar a
            miles de hispanohablantes en Suiza
          </p>

          <a
            href="mailto:info@hispanosensuiza.ch"
            className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-full text-sm transition-opacity hover:opacity-85 active:scale-[0.98]"
            style={{
              background: '#C8102E',
              color: '#ffffff',
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif'
            }}
          >
            Contactar ahora →
          </a>
        </div>
      </section>
    </div>
  );
}
