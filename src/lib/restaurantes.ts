/**
 * Librería para gestionar restaurantes hispanos en Suiza
 */

export interface Horario {
  lunes: string;
  martes: string;
  miercoles: string;
  jueves: string;
  viernes: string;
  sabado: string;
  domingo: string;
}

export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface Restaurante {
  id: string;
  nombre: string;
  tipo: string;
  cocina: string[];
  descripcion: string;
  direccion: string;
  ciudad: string;
  canton: string;
  codigoPostal: string;
  coordenadas: Coordenadas;
  telefono: string;
  email: string;
  web: string;
  horario: Horario;
  precioMedio: string;
  moneda: string;
  reservas: boolean;
  linkReservas: string | null;
  destacados: string[];
  ambiente: string;
  imagen: string;
  rating: number;
  numReviews: number;
  tags: string[];
}

export interface TipoCocina {
  id: string;
  nombre: string;
  emoji: string;
}

export interface Ciudad {
  nombre: string;
  canton: string;
}

export interface RestaurantesData {
  restaurantes: Restaurante[];
  total: number;
  fecha_actualizacion: string;
  ciudades: Ciudad[];
  tiposCocina: TipoCocina[];
}

/**
 * Obtener todos los restaurantes (cliente y servidor)
 */
export async function getRestaurantes(): Promise<RestaurantesData> {
  try {
    const response = await fetch('/data/restaurantes-hispanos.json');
    if (response.ok) {
      const data: RestaurantesData = await response.json();
      return data;
    }
  } catch (fetchError) {
    console.warn('Error fetching restaurantes data:', fetchError);
  }

  // Si falla, devolver estructura vacía
  return {
    restaurantes: [],
    total: 0,
    fecha_actualizacion: new Date().toISOString().split('T')[0],
    ciudades: [],
    tiposCocina: []
  };
}

/**
 * Obtener restaurante por ID
 */
export async function getRestauranteById(id: string): Promise<Restaurante | null> {
  const data = await getRestaurantes();
  return data.restaurantes.find(r => r.id === id) || null;
}

/**
 * Obtener restaurantes por ciudad
 */
export async function getRestaurantesByCiudad(ciudad: string): Promise<Restaurante[]> {
  const data = await getRestaurantes();
  return data.restaurantes.filter(r => r.ciudad.toLowerCase() === ciudad.toLowerCase());
}

/**
 * Obtener restaurantes por tipo de cocina
 */
export async function getRestaurantesByCocina(cocina: string): Promise<Restaurante[]> {
  const data = await getRestaurantes();
  return data.restaurantes.filter(r =>
    r.cocina.some(c => c.toLowerCase() === cocina.toLowerCase())
  );
}

/**
 * Buscar restaurantes por texto
 */
export async function buscarRestaurantes(texto: string): Promise<Restaurante[]> {
  const data = await getRestaurantes();
  const textoLower = texto.toLowerCase();

  return data.restaurantes.filter(r =>
    r.nombre.toLowerCase().includes(textoLower) ||
    r.descripcion.toLowerCase().includes(textoLower) ||
    r.tipo.toLowerCase().includes(textoLower) ||
    r.ciudad.toLowerCase().includes(textoLower) ||
    r.cocina.some(c => c.toLowerCase().includes(textoLower)) ||
    r.tags.some(t => t.toLowerCase().includes(textoLower)) ||
    r.destacados.some(d => d.toLowerCase().includes(textoLower))
  );
}

/**
 * Obtener ciudades únicas con restaurantes
 */
export async function getCiudadesConRestaurantes(): Promise<string[]> {
  const data = await getRestaurantes();
  return [...new Set(data.restaurantes.map(r => r.ciudad))].sort();
}

/**
 * Obtener tipos de cocina disponibles
 */
export async function getTiposCocina(): Promise<TipoCocina[]> {
  const data = await getRestaurantes();
  return data.tiposCocina;
}

/**
 * Verificar si un restaurante está abierto ahora
 */
export function estaAbierto(restaurante: Restaurante): boolean {
  const ahora = new Date();
  const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const diaActual = dias[ahora.getDay()] as keyof Horario;
  const horarioHoy = restaurante.horario[diaActual];

  if (horarioHoy === 'Cerrado') return false;

  const horaActual = ahora.getHours() * 60 + ahora.getMinutes();

  // Parsear horarios (pueden ser "11:30-14:30, 18:00-23:00" o "11:30-23:00")
  const rangos = horarioHoy.split(',').map(r => r.trim());

  for (const rango of rangos) {
    const [inicio, fin] = rango.split('-').map(h => {
      const [horas, minutos] = h.trim().split(':').map(Number);
      return horas * 60 + minutos;
    });

    if (horaActual >= inicio && horaActual <= fin) {
      return true;
    }
  }

  return false;
}

/**
 * Formatear precio medio
 */
export function formatearPrecio(precioMedio: string, moneda: string): string {
  return `${precioMedio} ${moneda}`;
}

/**
 * Obtener emoji de rating
 */
export function getRatingEmoji(rating: number): string {
  if (rating >= 4.8) return '🌟';
  if (rating >= 4.5) return '⭐';
  if (rating >= 4.0) return '👍';
  return '👌';
}
