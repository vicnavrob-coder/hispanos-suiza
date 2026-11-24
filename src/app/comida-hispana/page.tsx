"use client";

import { useState, useEffect, useMemo } from "react";
import { getRestaurantes, Restaurante, TipoCocina, estaAbierto } from "@/lib/restaurantes";
import Image from "next/image";
import Link from "next/link";

// Iconos inline
const IconoTelefono = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const IconoUbicacion = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconoReloj = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconoEstrella = () => (
  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconoWeb = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const IconoBuscar = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

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

  // Búsquedas populares
  const busquedasPopulares = [
    { label: "Tapas", valor: "tapas" },
    { label: "Paella", valor: "paella" },
    { label: "Tacos", valor: "tacos" },
    { label: "Asado", valor: "asado" },
    { label: "Churros", valor: "churros" },
    { label: "Ceviche", valor: "ceviche" },
  ];

  // Filtrar restaurantes
  const restaurantesFiltrados = useMemo(() => {
    let filtered = [...restaurantes];

    // Filtro por búsqueda de texto
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

    // Filtro por ciudad
    if (filtros.ciudad) {
      filtered = filtered.filter(r => r.ciudad === filtros.ciudad);
    }

    // Filtro por tipo de cocina
    if (filtros.cocina) {
      filtered = filtered.filter(r =>
        r.cocina.some(c => c.toLowerCase() === filtros.cocina.toLowerCase())
      );
    }

    // Filtro por precio
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

    // Filtro por abierto ahora
    if (filtros.abierto === "si") {
      filtered = filtered.filter(r => estaAbierto(r));
    }

    // Ordenar
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando restaurantes...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 via-red-600 to-yellow-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Comida Hispana en Suiza
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl mb-8">
            Descubre los mejores restaurantes de comida española, mexicana, argentina
            y latinoamericana. Reserva o llama directamente.
          </p>

          {/* Buscador */}
          <div className="max-w-2xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <IconoBuscar />
              </div>
              <input
                type="text"
                placeholder="Buscar por nombre, plato, tipo de cocina..."
                value={filtros.busqueda}
                onChange={(e) => handleFiltroChange("busqueda", e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-orange-300"
              />
            </div>

            {/* Búsquedas populares */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-orange-200 text-sm">Populares:</span>
              {busquedasPopulares.map((bp) => (
                <button
                  key={bp.valor}
                  onClick={() => handleFiltroChange("busqueda", bp.valor)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    filtros.busqueda === bp.valor
                      ? "bg-white text-orange-600"
                      : "bg-white/20 hover:bg-white/30 text-white"
                  }`}
                >
                  {bp.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {/* Ciudad */}
            <select
              value={filtros.ciudad}
              onChange={(e) => handleFiltroChange("ciudad", e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todas las ciudades</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad} value={ciudad}>{ciudad}</option>
              ))}
            </select>

            {/* Tipo de cocina */}
            <select
              value={filtros.cocina}
              onChange={(e) => handleFiltroChange("cocina", e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Toda la cocina</option>
              {tiposCocina.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.emoji} {tipo.nombre}
                </option>
              ))}
            </select>

            {/* Precio */}
            <select
              value={filtros.precio}
              onChange={(e) => handleFiltroChange("precio", e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Cualquier precio</option>
              <option value="economico">Hasta 25 CHF</option>
              <option value="medio">25-50 CHF</option>
              <option value="alto">+50 CHF</option>
            </select>

            {/* Abierto ahora */}
            <select
              value={filtros.abierto}
              onChange={(e) => handleFiltroChange("abierto", e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Horario</option>
              <option value="si">Abierto ahora</option>
            </select>

            {/* Ordenar */}
            <select
              value={filtros.ordenar}
              onChange={(e) => handleFiltroChange("ordenar", e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="rating">Mejor valorados</option>
              <option value="reviews">Mas opiniones</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre A-Z</option>
            </select>

            {/* Limpiar */}
            {filtrosActivos > 0 && (
              <button
                onClick={limpiarFiltros}
                className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors font-medium"
              >
                Limpiar ({filtrosActivos})
              </button>
            )}
          </div>

          {/* Contador de resultados */}
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold text-orange-600">{restaurantesFiltrados.length}</span>
            <span>restaurantes encontrados</span>
            {filtrosActivos > 0 && (
              <span className="text-gray-400">
                (de {restaurantes.length} totales)
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Lista de restaurantes */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        {restaurantesFiltrados.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">
              No se encontraron restaurantes con esos filtros
            </p>
            <button
              onClick={limpiarFiltros}
              className="text-orange-600 hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurantesFiltrados.map((restaurante) => (
              <RestauranteCard key={restaurante.id} restaurante={restaurante} />
            ))}
          </div>
        )}
      </section>

      {/* CTA final */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Tienes un restaurante hispano en Suiza?
          </h2>
          <p className="text-orange-100 mb-6">
            Anade tu restaurante gratis a nuestra guía y llega a miles de hispanohablantes
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
          >
            Contactar
          </Link>
        </div>
      </section>
    </main>
  );
}

// Componente de tarjeta de restaurante
function RestauranteCard({ restaurante }: { restaurante: Restaurante }) {
  const abierto = estaAbierto(restaurante);

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-100 group">
      {/* Imagen */}
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">
            {restaurante.cocina.includes("española") && "🇪🇸"}
            {restaurante.cocina.includes("mexicana") && "🇲🇽"}
            {restaurante.cocina.includes("argentina") && "🇦🇷"}
            {restaurante.cocina.includes("peruana") && "🇵🇪"}
            {restaurante.cocina.includes("cubana") && "🇨🇺"}
            {restaurante.cocina.includes("colombiana") && "🇨🇴"}
            {restaurante.cocina.includes("vasca") && "🏴"}
          </span>
        </div>

        {/* Badge abierto/cerrado */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            abierto
              ? "bg-green-500 text-white"
              : "bg-gray-500 text-white"
          }`}>
            {abierto ? "Abierto" : "Cerrado"}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg shadow flex items-center gap-1">
          <IconoEstrella />
          <span className="font-semibold text-sm">{restaurante.rating}</span>
          <span className="text-gray-400 text-xs">({restaurante.numReviews})</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
            {restaurante.nombre}
          </h3>
          <p className="text-sm text-orange-600 font-medium">{restaurante.tipo}</p>
        </div>

        {/* Ubicación */}
        <div className="flex items-start gap-2 text-gray-600 text-sm mb-2">
          <IconoUbicacion />
          <span>{restaurante.direccion}, {restaurante.ciudad}</span>
        </div>

        {/* Precio */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
          <span className="font-medium">{restaurante.precioMedio} {restaurante.moneda}</span>
          <span className="text-gray-300">|</span>
          <span>{restaurante.ambiente}</span>
        </div>

        {/* Descripción */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {restaurante.descripcion}
        </p>

        {/* Destacados */}
        <div className="flex flex-wrap gap-2 mb-4">
          {restaurante.destacados.slice(0, 3).map((plato, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full"
            >
              {plato}
            </span>
          ))}
        </div>

        {/* Acciones */}
        <div className="flex gap-2 pt-3 border-t">
          {/* Llamar */}
          <a
            href={`tel:${restaurante.telefono}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm"
          >
            <IconoTelefono />
            Llamar
          </a>

          {/* Reservar o Web */}
          {restaurante.reservas && restaurante.linkReservas ? (
            <a
              href={restaurante.linkReservas}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium text-sm"
            >
              <IconoReloj />
              Reservar
            </a>
          ) : restaurante.web ? (
            <a
              href={restaurante.web}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              <IconoWeb />
              Web
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
