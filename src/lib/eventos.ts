/**
 * Librería para gestionar eventos en Suiza
 */

import fs from 'fs';
import path from 'path';

export interface Evento {
  id: string;
  titulo: string;
  titulo_original: string;
  descripcion: string;
  descripcion_original: string;
  fecha: string;
  fecha_texto: string;
  ciudad: string;
  canton: string;
  categoria: string;
  categoria_nombre: string;
  idioma_original: string;
  link: string;
  imagen: string;
  fuente: string;
  fecha_scraping: string;
  precio: string;
  ubicacion: {
    ciudad: string;
    canton: string;
  };
}

export interface EventosData {
  eventos: Evento[];
  total: number;
  fecha_actualizacion: string;
  ciudades: Array<{nombre: string; canton: string}>;
}

const GIST_ID = process.env.NEXT_PUBLIC_GIST_ID_EVENTOS || '';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

/**
 * Obtener todos los eventos desde GitHub Gist o archivo local
 */
export async function getEventos(): Promise<EventosData> {
  try {
    // Intentar desde Gist si está configurado
    if (GIST_ID) {
      const url = `https://api.github.com/gists/${GIST_ID}`;
      const headers: HeadersInit = {};

      if (GITHUB_TOKEN) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
      }

      const response = await fetch(url, {
        headers,
        next: { revalidate: 3600 } // Cache por 1 hora
      });

      if (response.ok) {
        const gist = await response.json();
        const content = gist.files['eventos-suiza.json'].content;
        const data: EventosData = JSON.parse(content);
        return data;
      }
    }

    // Fallback: leer desde archivo local de ejemplo
    // En server-side, usar fs; en client-side, usar fetch
    if (typeof window === 'undefined') {
      // Server-side: usar fs
      const filePath = path.join(process.cwd(), 'public', 'data', 'eventos-ejemplo.json');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const data: EventosData = JSON.parse(fileContent);
      return data;
    } else {
      // Client-side: usar fetch
      const localResponse = await fetch('/data/eventos-ejemplo.json');
      if (localResponse.ok) {
        const data: EventosData = await localResponse.json();
        return data;
      }
    }

    throw new Error('No se pudo cargar eventos');

  } catch (error) {
    console.error('Error obteniendo eventos:', error);
    // Devolver datos vacíos como último recurso
    return {
      eventos: [],
      total: 0,
      fecha_actualizacion: '',
      ciudades: []
    };
  }
}

/**
 * Obtener eventos filtrados
 */
export async function getEventosFiltrados(filtros: {
  ciudad?: string;
  categoria?: string;
  fecha?: string;
}): Promise<Evento[]> {
  const data = await getEventos();
  let eventos = data.eventos;

  // Filtrar por ciudad
  if (filtros.ciudad && filtros.ciudad !== 'all') {
    eventos = eventos.filter(e => e.ciudad === filtros.ciudad);
  }

  // Filtrar por categoría
  if (filtros.categoria && filtros.categoria !== 'all') {
    eventos = eventos.filter(e => e.categoria === filtros.categoria);
  }

  // Filtrar por fecha
  if (filtros.fecha && filtros.fecha !== 'all') {
    const hoy = new Date();

    switch (filtros.fecha) {
      case 'hoy':
        eventos = eventos.filter(e => {
          if (e.fecha === 'Por confirmar') return false;
          const fechaEvento = new Date(e.fecha);
          return fechaEvento.toDateString() === hoy.toDateString();
        });
        break;

      case 'semana':
        const unaSemana = new Date(hoy.getTime() + 7 * 24 * 60 * 60 * 1000);
        eventos = eventos.filter(e => {
          if (e.fecha === 'Por confirmar') return false;
          const fechaEvento = new Date(e.fecha);
          return fechaEvento >= hoy && fechaEvento <= unaSemana;
        });
        break;

      case 'mes':
        const unMes = new Date(hoy.getTime() + 30 * 24 * 60 * 60 * 1000);
        eventos = eventos.filter(e => {
          if (e.fecha === 'Por confirmar') return false;
          const fechaEvento = new Date(e.fecha);
          return fechaEvento >= hoy && fechaEvento <= unMes;
        });
        break;
    }
  }

  // Ordenar por fecha (próximos primero)
  eventos.sort((a, b) => {
    if (a.fecha === 'Por confirmar') return 1;
    if (b.fecha === 'Por confirmar') return -1;
    return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
  });

  return eventos;
}

/**
 * Obtener un evento por ID
 */
export async function getEventoById(id: string): Promise<Evento | null> {
  const data = await getEventos();
  return data.eventos.find(e => e.id === id) || null;
}

/**
 * Obtener eventos por ciudad
 */
export async function getEventosPorCiudad(ciudad: string): Promise<Evento[]> {
  const data = await getEventos();
  return data.eventos.filter(e => e.ciudad === ciudad);
}

/**
 * Obtener categorías únicas
 */
export async function getCategorias(): Promise<string[]> {
  const data = await getEventos();
  const categorias = new Set(data.eventos.map(e => e.categoria));
  return Array.from(categorias);
}

/**
 * Obtener ciudades con eventos
 */
export async function getCiudadesConEventos(): Promise<string[]> {
  const data = await getEventos();
  const ciudades = new Set(data.eventos.map(e => e.ciudad));
  return Array.from(ciudades);
}

/**
 * Buscar eventos por texto
 */
export async function buscarEventos(query: string): Promise<Evento[]> {
  const data = await getEventos();
  const queryLower = query.toLowerCase();

  return data.eventos.filter(e =>
    e.titulo.toLowerCase().includes(queryLower) ||
    e.descripcion.toLowerCase().includes(queryLower) ||
    e.ciudad.toLowerCase().includes(queryLower) ||
    e.categoria_nombre.toLowerCase().includes(queryLower)
  );
}
