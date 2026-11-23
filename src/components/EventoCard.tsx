'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ExternalLink, Tag } from 'lucide-react';
import type { Evento } from '@/lib/eventos';

interface EventoCardProps {
  evento: Evento;
}

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

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Imagen */}
      {evento.imagen && (
        <div className="relative h-48 w-full">
          <Image
            src={evento.imagen}
            alt={evento.titulo}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Contenido */}
      <div className="p-6">
        {/* Categoría */}
        <div className="flex items-center gap-2 mb-3">
          <Tag className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-600">
            {evento.categoria_nombre}
          </span>
        </div>

        {/* Título */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {evento.titulo}
        </h3>

        {/* Descripción */}
        {evento.descripcion && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {evento.descripcion}
          </p>
        )}

        {/* Fecha y ubicación */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>{formatFecha(evento.fecha)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>{evento.ciudad}, {evento.canton}</span>
          </div>
        </div>

        {/* Precio */}
        <div className="mb-4">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
            {evento.precio}
          </span>
        </div>

        {/* Link externo */}
        {evento.link && (
          <a
            href={evento.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
          >
            Ver más información
            <ExternalLink className="h-4 w-4" />
          </a>
        )}

        {/* Fuente */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-xs text-gray-500">
            Fuente: {evento.fuente}
          </span>
        </div>
      </div>
    </div>
  );
}
