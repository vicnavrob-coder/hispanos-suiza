"use client";

import { useState, useEffect, useMemo } from "react";
import { getRestaurantes, Restaurante, TipoCocina, estaAbierto, Horario } from "@/lib/restaurantes";
import Link from "next/link";

// Iconos SVG
const IconoTelefono = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const IconoUbicacion = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconoReloj = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconoEstrella = ({ filled = true }: { filled?: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconoMapa = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const IconoWeb = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const IconoBuscar = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconoCerrar = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconoDinero = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Imágenes de Unsplash para cada tipo de cocina
const IMAGENES_COCINA: Record<string, string> = {
  "española": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=600&h=400&fit=crop",
  "tapas": "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop",
  "paella": "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=600&h=400&fit=crop",
  "mexicana": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop",
  "argentina": "https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop",
  "peruana": "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=600&h=400&fit=crop",
  "cubana": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=400&fit=crop",
  "colombiana": "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=400&fit=crop",
  "vasca": "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400&fit=crop",
  "churros": "https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=600&h=400&fit=crop",
  "default": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop"
};

function getImagenRestaurante(restaurante: Restaurante): string {
  for (const cocina of restaurante.cocina) {
    if (IMAGENES_COCINA[cocina]) {
      return IMAGENES_COCINA[cocina];
    }
  }
  // Buscar en tags
  for (const tag of restaurante.tags) {
    if (IMAGENES_COCINA[tag]) {
      return IMAGENES_COCINA[tag];
    }
  }
  return IMAGENES_COCINA.default;
}

function getGoogleMapsUrl(restaurante: Restaurante): string {
  const query = encodeURIComponent(`${restaurante.nombre}, ${restaurante.direccion}, ${restaurante.codigoPostal} ${restaurante.ciudad}, Suiza`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function getPrecioIconos(precioMedio: string): number {
  const precio = parseInt(precioMedio.split('-')[0]);
  if (precio <= 25) return 1;
  if (precio <= 50) return 2;
  if (precio <= 75) return 3;
  return 4;
}

interface Filtros {
  ciudad: string;
  cocina: string;
  busqueda: string;
  precio: string;
  abierto: string;
  ordenar: string;
}

export default function ComidaHispanaPage() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [tiposCocina, setTiposCocina] = useState<TipoCocina[]>([]);
  const [ciudades, setCiudades] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalRestaurante, setModalRestaurante] = useState<Restaurante | null>(null);
  const [filtros, setFiltros] = useState<Filtros>({
    ciudad: "",
    cocina: "",
    busqueda: "",
    precio: "",
    abierto: "",
    ordenar: "rating"
  });

  useEffect(() => {
    async function cargarDatos() {
      const data = await getRestaurantes();
      setRestaurantes(data.restaurantes);
      setTiposCocina(data.tiposCocina);
      setCiudades([...new Set(data.restaurantes.map(r => r.ciudad))].sort());
      setLoading(false);
    }
    cargarDatos();
  }, []);

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalRestaurante(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const busquedasPopulares = [
    { label: "Tapas", valor: "tapas", emoji: "🍢" },
    { label: "Paella", valor: "paella", emoji: "🥘" },
    { label: "Tacos", valor: "tacos", emoji: "🌮" },
    { label: "Asado", valor: "asado", emoji: "🥩" },
    { label: "Churros", valor: "churros", emoji: "🍩" },
    { label: "Ceviche", valor: "ceviche", emoji: "🐟" },
  ];

  const restaurantesFiltrados = useMemo(() => {
    let filtered = [...restaurantes];

    if (filtros.busqueda) {
      const texto = filtros.busqueda.toLowerCase();
      filtered = filtered.filter(r =>
        r.nombre.toLowerCase().includes(texto) ||
        r.descripcion.toLowerCase().includes(texto) ||
        r.tipo.toLowerCase().includes(texto) ||
        r.cocina.some(c => c.toLowerCase().includes(texto)) ||
        r.tags.some(t => t.toLowerCase().includes(texto)) ||
        r.destacados.some(d => d.toLowerCase().includes(texto))
      );
    }

    if (filtros.ciudad) {
      filtered = filtered.filter(r => r.ciudad === filtros.ciudad);
    }

    if (filtros.cocina) {
      filtered = filtered.filter(r =>
        r.cocina.some(c => c.toLowerCase() === filtros.cocina.toLowerCase())
      );
    }

    if (filtros.precio) {
      filtered = filtered.filter(r => {
        const precioMin = parseInt(r.precioMedio.split('-')[0]);
        switch (filtros.precio) {
          case "economico": return precioMin <= 25;
          case "medio": return precioMin > 25 && precioMin <= 50;
          case "alto": return precioMin > 50;
          default: return true;
        }
      });
    }

    if (filtros.abierto === "si") {
      filtered = filtered.filter(r => estaAbierto(r));
    }

    switch (filtros.ordenar) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        filtered.sort((a, b) => b.numReviews - a.numReviews);
        break;
      case "precio-asc":
        filtered.sort((a, b) => {
          const precioA = parseInt(a.precioMedio.split('-')[0]);
          const precioB = parseInt(b.precioMedio.split('-')[0]);
          return precioA - precioB;
        });
        break;
      case "precio-desc":
        filtered.sort((a, b) => {
          const precioA = parseInt(a.precioMedio.split('-')[0]);
          const precioB = parseInt(b.precioMedio.split('-')[0]);
          return precioB - precioA;
        });
        break;
      case "nombre":
        filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
    }

    return filtered;
  }, [restaurantes, filtros]);

  const handleFiltroChange = (key: keyof Filtros, value: string) => {
    setFiltros(prev => ({ ...prev, [key]: value }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      ciudad: "",
      cocina: "",
      busqueda: "",
      precio: "",
      abierto: "",
      ordenar: "rating"
    });
  };

  const filtrosActivos = Object.entries(filtros).filter(
    ([key, value]) => value && key !== "ordenar"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-orange-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
            <span className="absolute inset-0 flex items-center justify-center text-3xl">🍽️</span>
          </div>
          <p className="text-gray-600 font-medium">Cargando restaurantes...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero mejorado */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-500 to-yellow-500"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              🍽️ Guia de Restaurantes Hispanos en Suiza
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Sabores de casa<br />
              <span className="text-yellow-300">en Suiza</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Descubre los mejores restaurantes de comida espanola, mexicana, argentina
              y latinoamericana. Reserva mesa o llama directamente.
            </p>

            {/* Buscador mejorado */}
            <div className="bg-white rounded-2xl shadow-2xl p-2">
              <div className="flex items-center">
                <div className="pl-4">
                  <IconoBuscar />
                </div>
                <input
                  type="text"
                  placeholder="Buscar restaurante, plato o tipo de cocina..."
                  value={filtros.busqueda}
                  onChange={(e) => handleFiltroChange("busqueda", e.target.value)}
                  className="flex-1 px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none text-lg"
                />
                {filtros.busqueda && (
                  <button
                    onClick={() => handleFiltroChange("busqueda", "")}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <IconoCerrar />
                  </button>
                )}
              </div>
            </div>

            {/* Busquedas populares */}
            <div className="flex flex-wrap gap-3 mt-6">
              {busquedasPopulares.map((bp) => (
                <button
                  key={bp.valor}
                  onClick={() => handleFiltroChange("busqueda", bp.valor)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                    filtros.busqueda === bp.valor
                      ? "bg-white text-orange-600 shadow-lg"
                      : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  }`}
                >
                  {bp.emoji} {bp.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filtros sticky */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={filtros.ciudad}
              onChange={(e) => handleFiltroChange("ciudad", e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium text-gray-700"
            >
              <option value="">📍 Todas las ciudades</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad} value={ciudad}>{ciudad}</option>
              ))}
            </select>

            <select
              value={filtros.cocina}
              onChange={(e) => handleFiltroChange("cocina", e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium text-gray-700"
            >
              <option value="">🍴 Tipo de cocina</option>
              {tiposCocina.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.emoji} {tipo.nombre}
                </option>
              ))}
            </select>

            <select
              value={filtros.precio}
              onChange={(e) => handleFiltroChange("precio", e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium text-gray-700"
            >
              <option value="">💰 Precio</option>
              <option value="economico">$ Hasta 25 CHF</option>
              <option value="medio">$$ 25-50 CHF</option>
              <option value="alto">$$$ +50 CHF</option>
            </select>

            <button
              onClick={() => handleFiltroChange("abierto", filtros.abierto === "si" ? "" : "si")}
              className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                filtros.abierto === "si"
                  ? "bg-green-500 text-white"
                  : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              🟢 Abierto ahora
            </button>

            <select
              value={filtros.ordenar}
              onChange={(e) => handleFiltroChange("ordenar", e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium text-gray-700"
            >
              <option value="rating">⭐ Mejor valorados</option>
              <option value="reviews">💬 Mas opiniones</option>
              <option value="precio-asc">💰 Precio: menor</option>
              <option value="precio-desc">💰 Precio: mayor</option>
              <option value="nombre">🔤 Nombre A-Z</option>
            </select>

            {filtrosActivos > 0 && (
              <button
                onClick={limpiarFiltros}
                className="px-4 py-2.5 text-orange-600 hover:bg-orange-50 rounded-xl transition-colors font-medium flex items-center gap-2"
              >
                <IconoCerrar />
                Limpiar ({filtrosActivos})
              </button>
            )}
          </div>

          {/* Contador */}
          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl font-bold text-orange-600">{restaurantesFiltrados.length}</span>
            <span className="text-gray-600">
              {restaurantesFiltrados.length === 1 ? 'restaurante encontrado' : 'restaurantes encontrados'}
              {filtrosActivos > 0 && <span className="text-gray-400"> de {restaurantes.length}</span>}
            </span>
          </div>
        </div>
      </section>

      {/* Lista de restaurantes */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        {restaurantesFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-6 block">🍽️</span>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No encontramos restaurantes</h3>
            <p className="text-gray-500 mb-6">Prueba con otros filtros o busqueda</p>
            <button
              onClick={limpiarFiltros}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
            >
              Ver todos los restaurantes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurantesFiltrados.map((restaurante) => (
              <RestauranteCard
                key={restaurante.id}
                restaurante={restaurante}
                onVerMas={() => setModalRestaurante(restaurante)}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-5xl mb-6 block">🍳</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Tienes un restaurante hispano?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Anade tu restaurante gratis y llega a miles de hispanohablantes en Suiza
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Anadir mi restaurante
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Modal de detalles */}
      {modalRestaurante && (
        <RestauranteModal
          restaurante={modalRestaurante}
          onClose={() => setModalRestaurante(null)}
        />
      )}
    </main>
  );
}

// Componente de tarjeta mejorado
function RestauranteCard({ restaurante, onVerMas }: { restaurante: Restaurante; onVerMas: () => void }) {
  const abierto = estaAbierto(restaurante);
  const precioNivel = getPrecioIconos(restaurante.precioMedio);
  const imagen = getImagenRestaurante(restaurante);

  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Imagen */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={imagen}
          alt={restaurante.nombre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
            abierto ? "bg-green-500 text-white" : "bg-gray-800 text-white"
          }`}>
            {abierto ? "Abierto" : "Cerrado"}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
          <IconoEstrella />
          <span className="font-bold text-gray-900">{restaurante.rating}</span>
        </div>

        {/* Nombre sobre imagen */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
            {restaurante.nombre}
          </h3>
          <p className="text-white/90 text-sm font-medium">{restaurante.tipo}</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Ubicacion y precio */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <IconoUbicacion />
            <span className="text-sm font-medium">{restaurante.ciudad}</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <span key={i} className={i < precioNivel ? "text-orange-500" : "text-gray-300"}>
                $
              </span>
            ))}
            <span className="text-sm text-gray-500 ml-1">{restaurante.precioMedio} CHF</span>
          </div>
        </div>

        {/* Descripcion */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {restaurante.descripcion}
        </p>

        {/* Platos destacados */}
        <div className="flex flex-wrap gap-2 mb-5">
          {restaurante.destacados.slice(0, 3).map((plato, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-orange-50 text-orange-700 text-xs rounded-full font-medium"
            >
              {plato}
            </span>
          ))}
        </div>

        {/* Acciones */}
        <div className="flex gap-3">
          <a
            href={`tel:${restaurante.telefono}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold shadow-sm hover:shadow-md"
          >
            <IconoTelefono />
            Llamar
          </a>
          <button
            onClick={onVerMas}
            className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 transition-colors font-semibold"
          >
            Ver mas
          </button>
        </div>
      </div>
    </article>
  );
}

// Modal de detalles
function RestauranteModal({ restaurante, onClose }: { restaurante: Restaurante; onClose: () => void }) {
  const abierto = estaAbierto(restaurante);
  const imagen = getImagenRestaurante(restaurante);
  const mapsUrl = getGoogleMapsUrl(restaurante);
  const precioNivel = getPrecioIconos(restaurante.precioMedio);

  const diasSemana: (keyof Horario)[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
  const hoy = new Date().getDay();
  const diaHoy = diasSemana[hoy === 0 ? 6 : hoy - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header con imagen */}
        <div className="relative h-64">
          <img src={imagen} alt={restaurante.nombre} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            <IconoCerrar />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                abierto ? "bg-green-500 text-white" : "bg-gray-600 text-white"
              }`}>
                {abierto ? "Abierto ahora" : "Cerrado"}
              </span>
              <div className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full">
                <IconoEstrella />
                <span className="font-bold">{restaurante.rating}</span>
                <span className="text-gray-500 text-sm">({restaurante.numReviews})</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">{restaurante.nombre}</h2>
            <p className="text-white/90">{restaurante.tipo}</p>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Descripcion */}
          <p className="text-gray-700 leading-relaxed mb-6">{restaurante.descripcion}</p>

          {/* Info rapida */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <IconoDinero />
                <span className="text-sm font-medium">Precio medio</span>
              </div>
              <div className="flex items-center gap-2">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < precioNivel ? "text-orange-500" : "text-gray-300"}`}>$</span>
                ))}
                <span className="font-bold text-gray-900">{restaurante.precioMedio} CHF</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <span className="text-sm font-medium">Ambiente</span>
              </div>
              <p className="font-bold text-gray-900">{restaurante.ambiente}</p>
            </div>
          </div>

          {/* Platos destacados */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Platos destacados</h3>
            <div className="flex flex-wrap gap-2">
              {restaurante.destacados.map((plato, i) => (
                <span key={i} className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full font-medium">
                  {plato}
                </span>
              ))}
            </div>
          </div>

          {/* Horarios */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Horario</h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              {diasSemana.map((dia) => (
                <div
                  key={dia}
                  className={`flex justify-between py-1 ${dia === diaHoy ? 'font-bold text-orange-600' : 'text-gray-600'}`}
                >
                  <span className="capitalize">{dia === diaHoy ? `${dia} (hoy)` : dia}</span>
                  <span>{restaurante.horario[dia]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ubicacion */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Ubicacion</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 mb-3">
                {restaurante.direccion}<br />
                {restaurante.codigoPostal} {restaurante.ciudad}, {restaurante.canton}
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700"
              >
                <IconoMapa />
                Ver en Google Maps
              </a>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-4">
            <a
              href={`tel:${restaurante.telefono}`}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-bold text-lg shadow-lg"
            >
              <IconoTelefono />
              Llamar ahora
            </a>
            {restaurante.reservas && restaurante.linkReservas && (
              <a
                href={restaurante.linkReservas}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-4 border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 transition-colors font-bold text-lg"
              >
                <IconoReloj />
                Reservar
              </a>
            )}
            {restaurante.web && (
              <a
                href={restaurante.web}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-bold"
              >
                <IconoWeb />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
