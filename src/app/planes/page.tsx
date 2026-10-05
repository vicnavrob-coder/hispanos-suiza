"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { cantones, type TipoActividad, type Temporada } from "@/lib/planes";

const TIPOS: { value: TipoActividad | "todos"; label: string; emoji: string }[] = [
  { value: "todos",       label: "Todos",        emoji: "🗺️" },
  { value: "senderismo",  label: "Senderismo",   emoji: "🥾" },
  { value: "teleferico",  label: "Teleféricos",  emoji: "🚡" },
  { value: "esqui",       label: "Esquí",        emoji: "⛷️" },
  { value: "lago",        label: "Lagos",        emoji: "🏊" },
  { value: "naturaleza",  label: "Naturaleza",   emoji: "🌿" },
  { value: "cultura",     label: "Cultura",      emoji: "🏛️" },
  { value: "gastronomia", label: "Gastronomía",  emoji: "🧀" },
  { value: "urbano",      label: "Urbano",       emoji: "🏙️" },
  { value: "nieve",       label: "Nieve",        emoji: "❄️" },
];

const TEMPORADAS: { value: Temporada | "todos"; label: string; emoji: string }[] = [
  { value: "todos",      label: "Todo el año", emoji: "📅" },
  { value: "primavera",  label: "Primavera",   emoji: "🌸" },
  { value: "verano",     label: "Verano",      emoji: "☀️" },
  { value: "otono",      label: "Otoño",       emoji: "🍂" },
  { value: "invierno",   label: "Invierno",    emoji: "❄️" },
];

const DIFICULTAD_LABEL: Record<string, string> = {
  facil: "Fácil", moderada: "Moderada", dificil: "Difícil", "muy-dificil": "Muy difícil",
};
const DIFICULTAD_COLOR: Record<string, string> = {
  facil: "bg-green-100 text-green-700",
  moderada: "bg-yellow-100 text-yellow-700",
  dificil: "bg-orange-100 text-orange-700",
  "muy-dificil": "bg-red-100 text-red-700",
};

export default function PlanesPage() {
  const [tipo, setTipo] = useState<TipoActividad | "todos">("todos");
  const [temporada, setTemporada] = useState<Temporada | "todos">("todos");
  const [canton, setCanton] = useState<string>("todos");
  const [busqueda, setBusqueda] = useState("");

  // Aplanar todas las actividades con su cantón
  const todasActividades = useMemo(() =>
    cantones.flatMap(c =>
      c.actividades.map(a => ({ ...a, cantonSlug: c.slug, cantonNombre: c.nombre }))
    ), []);

  const filtradas = useMemo(() => {
    return todasActividades.filter(a => {
      if (tipo !== "todos" && a.tipo !== tipo) return false;
      if (temporada !== "todos" && !a.temporada.includes(temporada)) return false;
      if (canton !== "todos" && a.cantonSlug !== canton) return false;
      if (busqueda) {
        const q = busqueda.toLowerCase();
        if (!a.nombre.toLowerCase().includes(q) &&
            !a.descripcion.toLowerCase().includes(q) &&
            !a.cantonNombre.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [todasActividades, tipo, temporada, canton, busqueda]);

  const destacadas = useMemo(() =>
    todasActividades.filter(a => a.destacado).slice(0, 6), [todasActividades]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Hero */}
      <div
        className="rounded-2xl p-8 md:p-12 mb-10 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 100%)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "#C8102E" }} />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">🏔️</span>
            <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">Explora Suiza</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            Planes y excursiones en Suiza
          </h1>
          <p className="text-gray-300 text-base md:text-lg">
            Rutas de senderismo, teleféricos, lagos alpinos, estaciones de esquí y planes únicos en los 26 cantones. Todo en español, con precios reales y cómo llegar.
          </p>
          <div className="flex gap-4 mt-5 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{cantones.length}</div>
              <div className="text-gray-400">cantones</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{todasActividades.length}+</div>
              <div className="text-gray-400">planes</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4</div>
              <div className="text-gray-400">idiomas del país</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-8 shadow-sm">
        {/* Buscador */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar plan, ruta, cantón..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300"
          />
        </div>

        {/* Tipo */}
        <div className="flex flex-wrap gap-2 mb-3">
          {TIPOS.map(t => (
            <button
              key={t.value}
              onClick={() => setTipo(t.value as TipoActividad | "todos")}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                tipo === t.value
                  ? "bg-red-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {/* Temporada + Cantón */}
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-wrap gap-2">
            {TEMPORADAS.map(t => (
              <button
                key={t.value}
                onClick={() => setTemporada(t.value as Temporada | "todos")}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  temporada === t.value
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
          <select
            value={canton}
            onChange={e => setCanton(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 border-none focus:outline-none cursor-pointer"
          >
            <option value="todos">🗺️ Todos los cantones</option>
            {cantones.map(c => (
              <option key={c.slug} value={c.slug}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mt-3 text-xs text-gray-400">
          {filtradas.length} planes encontrados
        </div>
      </div>

      {/* Destacados (solo si no hay filtro activo) */}
      {tipo === "todos" && temporada === "todos" && canton === "todos" && !busqueda && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">⭐ Planes imprescindibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {destacadas.map(a => (
              <ActividadCard key={a.slug} actividad={a} cantonSlug={a.cantonSlug} />
            ))}
          </div>
        </div>
      )}

      {/* Por cantón (sin filtro) o resultados filtrados */}
      {tipo === "todos" && temporada === "todos" && canton === "todos" && !busqueda ? (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">🗺️ Explorar por cantón</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cantones.map(c => (
              <Link
                key={c.slug}
                href={`/planes/${c.slug}`}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-36">
                  <Image src={c.imagen} alt={c.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <div className="font-bold">{c.nombre}</div>
                    <div className="text-xs text-gray-300">{c.actividades.length} planes</div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 line-clamp-2">{c.descripcion}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Resultados</h2>
          {filtradas.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-3">🔍</div>
              <p>No hay planes con estos filtros.</p>
              <button onClick={() => { setTipo("todos"); setTemporada("todos"); setCanton("todos"); setBusqueda(""); }}
                className="mt-3 text-sm text-red-700 hover:underline">
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtradas.map(a => (
                <ActividadCard key={`${a.cantonSlug}-${a.slug}`} actividad={a} cantonSlug={a.cantonSlug} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ActividadCard({ actividad: a, cantonSlug }: { actividad: any; cantonSlug: string }) {
  return (
    <Link
      href={`/planes/${cantonSlug}/${a.slug}`}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative h-44">
        <Image src={a.imagen} alt={a.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="text-xs font-semibold bg-black/50 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
            {TIPOS.find(t => t.value === a.tipo)?.emoji} {TIPOS.find(t => t.value === a.tipo)?.label}
          </span>
          {a.dificultad && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFICULTAD_COLOR[a.dificultad]}`}>
              {DIFICULTAD_LABEL[a.dificultad]}
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="font-bold text-white text-sm leading-tight">{a.nombre}</div>
          <div className="text-xs text-gray-300">{a.cantonNombre ?? cantonSlug}</div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{a.descripcion}</p>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          {a.duracion && <span>⏱ {a.duracion}</span>}
          {a.distancia && <span>📍 {a.distancia}</span>}
          {a.precio && <span className="font-semibold text-gray-700">💰 {a.precio}</span>}
        </div>
      </div>
    </Link>
  );
}
