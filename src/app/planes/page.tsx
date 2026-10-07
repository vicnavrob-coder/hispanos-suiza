"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { cantones, type TipoActividad, type Temporada, type Dificultad } from "@/lib/planes";

const MapaPlanes = dynamic(() => import("@/components/MapaPlanes"), { ssr: false, loading: () => (
  <div className="flex items-center justify-center h-full bg-gray-100 rounded-2xl">
    <div className="text-gray-400 text-sm">Cargando mapa...</div>
  </div>
)});

// ─── Constantes ───────────────────────────────────────────────────────────────

const TIPOS: { value: TipoActividad | "todos"; label: string; emoji: string }[] = [
  { value: "todos",       label: "Todos",        emoji: "🗺️" },
  { value: "senderismo",  label: "Senderismo",   emoji: "🥾" },
  { value: "teleferico",  label: "Teleférico",   emoji: "🚡" },
  { value: "esqui",       label: "Esquí",        emoji: "⛷️" },
  { value: "lago",        label: "Lagos",        emoji: "🏊" },
  { value: "naturaleza",  label: "Naturaleza",   emoji: "🌿" },
  { value: "cultura",     label: "Cultura",      emoji: "🏛️" },
  { value: "gastronomia", label: "Gastronomía",  emoji: "🧀" },
  { value: "ciclismo",    label: "Ciclismo",     emoji: "🚴" },
  { value: "familia",     label: "Familia",      emoji: "👨‍👩‍👧" },
  { value: "urbano",      label: "Ciudad",       emoji: "🏙️" },
  { value: "nieve",       label: "Nieve",        emoji: "❄️" },
];

const TEMPORADAS: { value: Temporada | "todos"; label: string; emoji: string }[] = [
  { value: "todos",     label: "Todo el año", emoji: "📅" },
  { value: "primavera", label: "Primavera",   emoji: "🌸" },
  { value: "verano",    label: "Verano",      emoji: "☀️" },
  { value: "otono",     label: "Otoño",       emoji: "🍂" },
  { value: "invierno",  label: "Invierno",    emoji: "❄️" },
];

const DIFICULTADES: { value: Dificultad | "todos"; label: string; color: string }[] = [
  { value: "todos",       label: "Toda dificultad",   color: "bg-gray-100 text-gray-600" },
  { value: "facil",       label: "Fácil",              color: "bg-green-100 text-green-700" },
  { value: "moderada",    label: "Moderada",           color: "bg-yellow-100 text-yellow-900" },
  { value: "dificil",     label: "Difícil",            color: "bg-orange-100 text-orange-700" },
  { value: "muy-dificil", label: "Muy difícil",        color: "bg-red-100 text-red-700" },
];

const DIFICULTAD_COLOR: Record<string, string> = {
  facil: "bg-green-100 text-green-700",
  moderada: "bg-yellow-100 text-yellow-900",
  dificil: "bg-orange-100 text-orange-700",
  "muy-dificil": "bg-red-100 text-red-700",
};

type Vista = "cuadricula" | "lista" | "mapa";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTemporadaActual(): Temporada {
  const m = new Date().getMonth();
  if (m >= 2 && m <= 4) return "primavera";
  if (m >= 5 && m <= 8) return "verano";
  if (m >= 9 && m <= 10) return "otono";
  return "invierno";
}

function useLocalFavoritos() {
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const saved = localStorage.getItem("planes-favoritos");
      if (saved) setFavoritos(new Set(JSON.parse(saved)));
    } catch {}
  }, []);

  const toggle = useCallback((id: string) => {
    setFavoritos(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      try { localStorage.setItem("planes-favoritos", JSON.stringify([...next])); } catch {}
      return next;
    });
  }, []);

  return { favoritos, toggle };
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function PlanesPage() {
  const [tipo, setTipo]           = useState<TipoActividad | "todos">("todos");
  const [temporada, setTemporada] = useState<Temporada | "todos">("todos");
  const [canton, setCanton]       = useState<string>("todos");
  const [dificultad, setDificultad] = useState<Dificultad | "todos">("todos");
  const [soloGratis, setSoloGratis]   = useState(false);
  const [soloNinos, setSoloNinos]     = useState(false);
  const [busqueda, setBusqueda]   = useState("");
  const [vista, setVista]         = useState<Vista>("cuadricula");
  const [soloFavoritos, setSoloFavoritos] = useState(false);
  const { favoritos, toggle } = useLocalFavoritos();

  const temporadaActual = useMemo(() => getTemporadaActual(), []);

  const todasActividades = useMemo(() =>
    cantones.flatMap(c =>
      c.actividades.map(a => ({ ...a, cantonSlug: c.slug, cantonNombre: c.nombre }))
    ), []);

  const stats = useMemo(() => ({
    total: todasActividades.length,
    gratis: todasActividades.filter(a => a.gratuito).length,
    ninos: todasActividades.filter(a => a.aptoNinos).length,
    cantones: cantones.length,
  }), [todasActividades]);

  const filtradas = useMemo(() => {
    return todasActividades.filter(a => {
      if (tipo !== "todos" && a.tipo !== tipo) return false;
      if (temporada !== "todos" && !a.temporada.includes(temporada)) return false;
      if (canton !== "todos" && a.cantonSlug !== canton) return false;
      if (dificultad !== "todos" && a.dificultad !== dificultad) return false;
      if (soloGratis && !a.gratuito) return false;
      if (soloNinos && !a.aptoNinos) return false;
      if (soloFavoritos && !favoritos.has(`${a.cantonSlug}/${a.slug}`)) return false;
      if (busqueda) {
        const q = busqueda.toLowerCase();
        if (!a.nombre.toLowerCase().includes(q) &&
            !a.descripcion.toLowerCase().includes(q) &&
            !a.cantonNombre.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [todasActividades, tipo, temporada, canton, dificultad, soloGratis, soloNinos, soloFavoritos, favoritos, busqueda]);

  const destacadas = useMemo(() =>
    todasActividades.filter(a => a.destacado).slice(0, 6), [todasActividades]);

  const estaTemporada = useMemo(() =>
    todasActividades
      .filter(a => a.temporada.includes(temporadaActual) && a.destacado)
      .slice(0, 4), [todasActividades, temporadaActual]);

  const hayFiltros = tipo !== "todos" || temporada !== "todos" || canton !== "todos" ||
    dificultad !== "todos" || soloGratis || soloNinos || soloFavoritos || busqueda !== "";

  function limpiarFiltros() {
    setTipo("todos"); setTemporada("todos"); setCanton("todos");
    setDificultad("todos"); setSoloGratis(false); setSoloNinos(false);
    setSoloFavoritos(false); setBusqueda("");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden mb-10"
           style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 50%, #16213e 100%)" }}>
        <div className="absolute inset-0 opacity-20"
             style={{ backgroundImage: "url(https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=60&auto=format&fit=crop)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #C8102E, #FF4D6D)" }} />
        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">🏔️</span>
                <span className="text-sm font-semibold text-red-400 uppercase tracking-widest">Explorar Suiza</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Planes y excursiones<br/>en los 26 cantones
              </h1>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Rutas de senderismo, teleféricos, lagos alpinos, estaciones de esquí y mucho más. Todo en español, con precios reales, cómo llegar en tren y consejos prácticos.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                <Link href="/planes/itinerarios"
                  className="inline-flex items-center gap-1.5 bg-red-700 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
                  📋 Ver itinerarios
                </Link>
                <button onClick={() => setVista("mapa")}
                  className="inline-flex items-center gap-1.5 bg-white/25 hover:bg-white/35 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors border border-white/40">
                  🗺️ Ver en mapa
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
              {[
                { num: stats.total, label: "planes", icon: "🎯" },
                { num: stats.cantones, label: "cantones", icon: "🏔️" },
                { num: stats.gratis, label: "gratuitos", icon: "🆓" },
                { num: stats.ninos, label: "para niños", icon: "👶" },
              ].map(s => (
                <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-bold text-white">{s.num}+</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Esta temporada ─────────────────────────────────────── */}
      {!hayFiltros && estaTemporada.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {TEMPORADAS.find(t => t.value === temporadaActual)?.emoji} Ideales esta temporada
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({TEMPORADAS.find(t => t.value === temporadaActual)?.label})
              </span>
            </h2>
            <button onClick={() => setTemporada(temporadaActual)}
              className="text-sm text-red-700 hover:underline font-medium">
              Ver todos →
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {estaTemporada.map(a => (
              <MiniCard key={`${a.cantonSlug}/${a.slug}`} a={a} onToggleFav={toggle} esFav={favoritos.has(`${a.cantonSlug}/${a.slug}`)} />
            ))}
          </div>
        </div>
      )}

      {/* ── Filtros ────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm sticky top-4 z-20">

        {/* Buscador + controles */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Buscar plan, montaña, cantón..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300"
            />
          </div>
          {/* Vista toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            {([
              { v: "cuadricula" as Vista, icon: "⊞" },
              { v: "lista" as Vista, icon: "≡" },
              { v: "mapa" as Vista, icon: "🗺" },
            ]).map(({ v, icon }) => (
              <button key={v} onClick={() => setVista(v)}
                title={v.charAt(0).toUpperCase() + v.slice(1)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${vista === v ? "bg-white shadow text-gray-800" : "text-gray-500 hover:text-gray-700"}`}>
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Tipo */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {TIPOS.map(t => (
            <button key={t.value} onClick={() => setTipo(t.value as TipoActividad | "todos")}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                tipo === t.value ? "bg-red-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {/* Segunda fila: temporada + dificultad + extras */}
        <div className="flex flex-wrap gap-2 items-center">
          <select value={temporada} onChange={e => setTemporada(e.target.value as Temporada | "todos")}
            className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 border-none focus:outline-none cursor-pointer">
            {TEMPORADAS.map(t => <option key={t.value} value={t.value}>{t.emoji} {t.label}</option>)}
          </select>

          <select value={dificultad} onChange={e => setDificultad(e.target.value as Dificultad | "todos")}
            className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 border-none focus:outline-none cursor-pointer">
            {DIFICULTADES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>

          <select value={canton} onChange={e => setCanton(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 border-none focus:outline-none cursor-pointer">
            <option value="todos">🗺️ Todos los cantones</option>
            {cantones.map(c => <option key={c.slug} value={c.slug}>{c.nombre}</option>)}
          </select>

          <button onClick={() => setSoloGratis(v => !v)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${soloGratis ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            🆓 Gratis
          </button>
          <button onClick={() => setSoloNinos(v => !v)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${soloNinos ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            👶 Para niños
          </button>
          <button onClick={() => setSoloFavoritos(v => !v)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${soloFavoritos ? "bg-amber-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            ❤️ Favoritos{favoritos.size > 0 && ` (${favoritos.size})`}
          </button>
        </div>

        {/* Resultado count + limpiar */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <span className="text-xs text-gray-400">
            <span className="font-semibold text-gray-700">{filtradas.length}</span> planes encontrados
          </span>
          {hayFiltros && (
            <button onClick={limpiarFiltros} className="text-xs text-red-600 hover:underline font-medium">
              ✕ Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* ── Vista MAPA ─────────────────────────────────────────── */}
      {vista === "mapa" && (
        <div className="mb-10">
          <div className="h-[500px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <MapaPlanes actividades={filtradas} />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Haz clic en los marcadores para ver detalles · {filtradas.length} planes en el mapa
          </p>
        </div>
      )}

      {/* ── Destacados (sin filtro) ──────────────────────────── */}
      {!hayFiltros && vista !== "mapa" && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">⭐ Planes imprescindibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {destacadas.map(a => (
              <ActividadCard key={`${a.cantonSlug}/${a.slug}`} a={a}
                esFav={favoritos.has(`${a.cantonSlug}/${a.slug}`)} onToggleFav={toggle} vista="cuadricula" />
            ))}
          </div>
        </div>
      )}

      {/* ── Por cantón (sin filtro) ──────────────────────────── */}
      {!hayFiltros && vista !== "mapa" && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">🗺️ Explorar por cantón</h2>
            <span className="text-xs text-gray-400">{cantones.length} cantones</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {cantones.map(c => (
              <Link key={c.slug} href={`/planes/${c.slug}`}
                className="group relative rounded-xl overflow-hidden hover:shadow-md transition-shadow aspect-[4/3]">
                <Image src={c.imagen} alt={c.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-2.5 text-white">
                  <div className="font-bold text-xs leading-tight">{c.nombre}</div>
                  <div className="text-xs text-gray-300 opacity-80">{c.actividades.length} planes</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Resultados filtrados ─────────────────────────────── */}
      {(hayFiltros || vista === "lista") && vista !== "mapa" && (
        <div>
          {!hayFiltros && (
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Todos los planes</h2>
            </div>
          )}
          {filtradas.length === 0 ? (
            <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-2xl">
              <div className="text-5xl mb-3">🔍</div>
              <p className="text-lg font-medium text-gray-600 mb-1">Sin resultados</p>
              <p className="text-sm mb-4">Prueba a cambiar los filtros</p>
              <button onClick={limpiarFiltros}
                className="text-sm text-red-700 hover:underline font-medium">Limpiar todos los filtros</button>
            </div>
          ) : vista === "lista" ? (
            <div className="space-y-3">
              {filtradas.map(a => (
                <ActividadCard key={`${a.cantonSlug}/${a.slug}`} a={a}
                  esFav={favoritos.has(`${a.cantonSlug}/${a.slug}`)} onToggleFav={toggle} vista="lista" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtradas.map(a => (
                <ActividadCard key={`${a.cantonSlug}/${a.slug}`} a={a}
                  esFav={favoritos.has(`${a.cantonSlug}/${a.slug}`)} onToggleFav={toggle} vista="cuadricula" />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── CTA Itinerarios ──────────────────────────────────── */}
      {!hayFiltros && (
        <div className="mt-12 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}>
          <div className="p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <div className="text-3xl mb-2">🗓️</div>
              <h3 className="text-xl font-bold text-white mb-2">¿No sabes por dónde empezar?</h3>
              <p className="text-gray-300 text-sm">
                Tenemos itinerarios curados para todos los gustos: familias, aventureros, parejas, cultura. Desde un fin de semana hasta 2 semanas.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/planes/itinerarios"
                className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-full transition-colors text-sm whitespace-nowrap">
                Ver itinerarios →
              </Link>
              <Link href="/herramientas/comparador-ciudades"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-full transition-colors text-sm text-center whitespace-nowrap border border-white/20">
                🧮 Calcular coste
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Componentes ──────────────────────────────────────────────────────────────

function MiniCard({ a, esFav, onToggleFav }: { a: any; esFav: boolean; onToggleFav: (id: string) => void }) {
  const id = `${a.cantonSlug}/${a.slug}`;
  return (
    <div className="relative group">
      <Link href={`/planes/${a.cantonSlug}/${a.slug}`}
        className="block relative rounded-xl overflow-hidden aspect-[3/2]">
        <Image src={a.imagen} alt={a.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-2.5 text-white">
          <div className="font-bold text-xs leading-tight">{a.nombre}</div>
          <div className="text-xs text-gray-300 opacity-80">{a.cantonNombre}</div>
        </div>
      </Link>
      <button onClick={(e) => { e.preventDefault(); onToggleFav(id); }}
        className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-black/40 rounded-full backdrop-blur-sm hover:bg-black/60 transition-colors text-sm">
        {esFav ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

function ActividadCard({ a, esFav, onToggleFav, vista }: {
  a: any; esFav: boolean; onToggleFav: (id: string) => void; vista: "cuadricula" | "lista"
}) {
  const id = `${a.cantonSlug}/${a.slug}`;
  const tipoEmoji = TIPOS.find(t => t.value === a.tipo)?.emoji ?? "📍";
  const tipoLabel = TIPOS.find(t => t.value === a.tipo)?.label ?? a.tipo;

  if (vista === "lista") {
    return (
      <div className="group bg-white border border-gray-100 rounded-xl hover:border-red-200 hover:shadow-sm transition-all flex gap-3">
        <Link href={`/planes/${a.cantonSlug}/${a.slug}`} className="flex gap-3 flex-1 p-3">
          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
            <Image src={a.imagen} alt={a.nombre} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="font-semibold text-gray-800 text-sm group-hover:text-red-700 leading-snug">{a.nombre}</div>
              {a.dificultad && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${DIFICULTAD_COLOR[a.dificultad]}`}>
                  {DIFICULTADES.find(d => d.value === a.dificultad)?.label}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 line-clamp-1 mb-2">{a.descripcion}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <span className="bg-gray-100 px-2 py-0.5 rounded-full">{tipoEmoji} {tipoLabel}</span>
              <span className="text-gray-300">{a.cantonNombre}</span>
              {a.duracion && <span>⏱ {a.duracion}</span>}
              {a.precio ? <span className="font-semibold text-gray-700">💰 {a.precio}</span> : a.gratuito && <span className="text-green-600 font-semibold">🆓 Gratis</span>}
              {a.aptoNinos && <span title="Apto para niños">👶</span>}
              {a.aptoPerros && <span title="Perros permitidos">🐕</span>}
            </div>
          </div>
        </Link>
        <button onClick={() => onToggleFav(id)}
          className="self-start p-3 text-lg hover:scale-110 transition-transform" title="Guardar en favoritos">
          {esFav ? "❤️" : "🤍"}
        </button>
      </div>
    );
  }

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow relative">
      <button onClick={() => onToggleFav(id)}
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-colors text-base"
        title="Guardar en favoritos">
        {esFav ? "❤️" : "🤍"}
      </button>
      <Link href={`/planes/${a.cantonSlug}/${a.slug}`} className="block">
        <div className="relative h-44">
          <Image src={a.imagen} alt={a.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            <span className="text-xs font-semibold bg-black/50 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
              {tipoEmoji} {tipoLabel}
            </span>
            {a.dificultad && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFICULTAD_COLOR[a.dificultad]}`}>
                {DIFICULTADES.find(d => d.value === a.dificultad)?.label}
              </span>
            )}
          </div>
          <div className="absolute bottom-3 left-3 right-10">
            <div className="font-bold text-white text-sm leading-tight">{a.nombre}</div>
            <div className="text-xs text-gray-300">{a.cantonNombre}</div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">{a.descripcion}</p>
          <div className="flex items-center flex-wrap gap-2 text-xs text-gray-400">
            {a.duracion && <span>⏱ {a.duracion}</span>}
            {a.distancia && <span>📏 {a.distancia}</span>}
            {a.precio
              ? <span className="font-semibold text-gray-700 ml-auto">💰 {a.precio}</span>
              : a.gratuito && <span className="text-green-600 font-semibold ml-auto">🆓 Gratis</span>}
          </div>
          {(a.aptoNinos || a.aptoPerros || a.altitud) && (
            <div className="flex gap-2 mt-2 pt-2 border-t border-gray-50">
              {a.aptoNinos && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">👶 Niños</span>}
              {a.aptoPerros && <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">🐕 Perros</span>}
              {a.altitud && <span className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full">⛰️ {a.altitud}</span>}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
