'use client';

import Image from 'next/image';
import { Calendar, MapPin, ExternalLink, Tag, Ticket } from 'lucide-react';
import type { Evento } from '@/lib/eventos';

interface EventoCardProps {
  evento: Evento;
}

const CATEGORIAS_DISPLAY: Record<string, { emoji: string; nombre: string; color: string }> = {
  'christmas': { emoji: '🎄', nombre: 'Navidad', color: '#C8102E' },
  'culture': { emoji: '🎭', nombre: 'Cultura', color: '#7c3aed' },
  'music': { emoji: '🎵', nombre: 'Música', color: '#2563eb' },
  'sports': { emoji: '🏃', nombre: 'Deportes', color: '#059669' },
  'food': { emoji: '🍴', nombre: 'Gastronomía', color: '#dc2626' },
  'festival': { emoji: '🎊', nombre: 'Festival', color: '#C8102E' },
  'family': { emoji: '👨‍👩‍👧', nombre: 'Familia', color: '#0891b2' },
  'outdoor': { emoji: '🌳', nombre: 'Aire Libre', color: '#16a34a' },
  'other': { emoji: '🎉', nombre: 'Otros', color: '#6b7280' }
};

export default function EventoCard({ evento }: EventoCardProps) {
  const formatFecha = (fecha: string) => {
    if (fecha === 'Por confirmar') return fecha;

    try {
      const date = new Date(fecha);
      return new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch {
      return fecha;
    }
  };

  const categoria = CATEGORIAS_DISPLAY[evento.categoria] || CATEGORIAS_DISPLAY['other'];

  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{ border: '1px solid #E8E5E0' }}
    >
      {/* Imagen del evento */}
      {evento.imagen && (
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={evento.imagen}
            alt={evento.titulo}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay gradient */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 100%)' }}
          />

          {/* Badge categoría superpuesto */}
          <div
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md"
            style={{
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(0,0,0,0.05)',
              color: categoria.color,
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif'
            }}
          >
            <span>{categoria.emoji}</span>
            <span>{categoria.nombre}</span>
          </div>

          {/* Badge precio */}
          {evento.precio && (
            <div
              className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md"
              style={{
                background: 'rgba(10,10,10,0.85)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#ffffff',
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif'
              }}
            >
              <Ticket className="h-3 w-3" />
              <span>{evento.precio}</span>
            </div>
          )}
        </div>
      )}

      {/* Contenido */}
      <div className="p-6">
        {/* Título */}
        <h3
          className="font-bold text-lg mb-3 line-clamp-2 leading-tight group-hover:text-[#C8102E] transition-colors"
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            color: '#0A0A0A'
          }}
        >
          {evento.titulo}
        </h3>

        {/* Descripción */}
        {evento.descripcion && (
          <p
            className="text-sm mb-4 line-clamp-3 leading-relaxed"
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#6B7280'
            }}
          >
            {evento.descripcion}
          </p>
        )}

        {/* Fecha y ubicación */}
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: '#FFF1F3' }}
            >
              <Calendar className="h-4 w-4" style={{ color: '#C8102E' }} />
            </div>
            <span
              className="text-sm font-medium"
              style={{
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                color: '#374151'
              }}
            >
              {formatFecha(evento.fecha)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: '#F8F6F3' }}
            >
              <MapPin className="h-4 w-4" style={{ color: '#6B7280' }} />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className="text-sm font-medium"
                style={{
                  fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                  color: '#374151'
                }}
              >
                {evento.ciudad}
              </span>
              <span
                className="text-xs ml-1"
                style={{
                  fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                  color: '#9CA3AF'
                }}
              >
                {evento.canton}
              </span>
            </div>
          </div>
        </div>

        {/* Footer con link */}
        <div
          className="pt-4 flex items-center justify-between"
          style={{ borderTop: '1px solid #F0EDEA' }}
        >
          {/* Fuente pequeña */}
          <span
            className="text-xs"
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#9CA3AF'
            }}
          >
            {evento.fuente}
          </span>

          {/* Link externo */}
          {evento.link && (
            <a
              href={evento.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{
                color: '#C8102E',
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif'
              }}
            >
              Ver más
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
