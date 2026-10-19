"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import {
  JOB_CATEGORIES, CIUDADES_SUIZA,
  PORTALES_EMPLEO_BUSQUEDA, AGENCIAS_ETT, PORTALES_PUBLICOS,
  buildUrl, type JobCategory,
} from "@/lib/buscador";
import type { JobItem } from "@/app/api/jobs/route";
import { useAuth } from "@/contexts/AuthContext";

// Formateador consistente server/client (sin Intl.NumberFormat que produce \xa0 distinto por entorno)
const fmt = (n: number) =>
  `CHF ${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "'")}`;


function timeAgo(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const diff = Date.now() - d.getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Hoy";
    if (days === 1) return "Ayer";
    if (days < 7)  return `Hace ${days} días`;
    if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`;
    return `Hace ${Math.floor(days / 30)} meses`;
  } catch { return ""; }
}

const ACCENT      = "#C0392B";
const ACCENT_DARK = "#96281B";

const CIUDAD_EMOJIS: Record<string, string> = {
  "Toda Suiza":   "🇨🇭",
  "Zürich":       "🏔️",
  "Geneva":       "🌊",
  "Basel":        "🏛️",
  "Bern":         "🐻",
  "Lausanne":     "🎓",
  "Lugano":       "☀️",
  "Winterthur":   "🌿",
  "St. Gallen":   "📚",
  "Lucerne":      "🌉",
  "Zug":          "💼",
  "Aarau":        "🏭",
  "Biel/Bienne":  "⌚",
  "Fribourg":     "🏰",
  "Solothurn":    "🏛️",
  "Neuchâtel":    "🍷",
  "Sion":         "🏔️",
  "Chur":         "🏔️",
  "Bellinzona":   "🏰",
  "Thun":         "🏞️",
  "Schaffhausen": "💧",
  "Olten":        "🚂",
  "Baden":        "♨️",
  "Frauenfeld":   "🌾",
  "Herisau":      "🏡",
};

const SOURCE_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  "jobs.ch":     { bg: "#e0f2fe", color: "#0369a1", label: "jobs.ch" },
  "LinkedIn":    { bg: "#dbeafe", color: "#1d4ed8", label: "LinkedIn" },
  "Tempservice": { bg: "#fff7ed", color: "#c2410c", label: "Tempservice ETT" },
  "tempoX":      { bg: "#fef2f2", color: "#b91c1c", label: "tempoX ETT" },
  "JobScout24":  { bg: "#f0fdf4", color: "#15803d", label: "JobScout24" },
  "Jobup":       { bg: "#faf5ff", color: "#7c3aed", label: "Jobup.ch" },
  "job-room":    { bg: "#eff6ff", color: "#1e40af", label: "RAV job-room" },
};

function salaryLabel(cat: JobCategory): string {
  return `${fmt(cat.salarioMin)}–${fmt(cat.salarioMax)}`;
}

export default function TrabajoPage() {
  const [categoria, setCategoria]     = useState<JobCategory | null>(null);
  const [ciudad, setCiudad]           = useState("Toda Suiza");
  const [mostrarTodasCiudades, setMostrarTodasCiudades] = useState(false);
  const [expandedJobs, setExpandedJobs] = useState<Set<number>>(new Set());
  const toggleExpand = useCallback((i: number) => {
    setExpandedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  }, []);
  const [customTerm, setCustomTerm] = useState("");
  const [jobs, setJobs]           = useState<JobItem[]>([]);
  const [loading, setLoading]     = useState(false);
  const [buscado, setBuscado]     = useState(false);
  const [error, setError]         = useState("");
  const [sources, setSources] = useState<{ jobsCh: number; linkedin: number; tempservice: number; tempoX: number; jobScout24: number; jobup: number; jobRoom: number } | null>(null);
  const { user, openModal }       = useAuth();

  async function buscar() {
    if (!categoria && !customTerm.trim()) return;
    if (!user) { openModal(() => buscar()); return; }

    setLoading(true);
    setBuscado(true);
    setJobs([]);
    setError("");
    setSources(null);

    try {
      // Término principal: texto libre si se escribió, sino terms[0] del sector
      const term  = customTerm.trim() || (categoria?.terms[0] ?? "");
      // Segundo término para enriquecer si hay pocos resultados
      const term2 = !customTerm.trim() && categoria ? (categoria.terms[1] ?? "") : "";

      const params = new URLSearchParams({ term, city: ciudad });
      if (term2) params.set("term2", term2);
      if (categoria && !customTerm.trim()) params.set("sectorFilter", categoria.slug);

      const res  = await fetch(`/api/jobs?${params}`);
      const data = await res.json();
      const result: JobItem[] = data.jobs ?? [];
      setJobs(result);
      setSources(data.sources ?? null);
      if (result.length === 0) setError("Sin resultados. Prueba otra ciudad o busca directamente en los portales de abajo.");
    } catch {
      setError("Error al cargar ofertas. Usa los portales directamente.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        document.getElementById("resultados-trabajo")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }

  const termPrincipal = customTerm.trim() || (categoria?.terms[0] ?? "");

  // Texto de ciudad para mostrar en portales (URL-compatible)
  const ciudadUrl = ciudad === "Toda Suiza" ? "Switzerland" : ciudad;

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-200" style={{ borderTop: `3px solid ${ACCENT}` }}>
        <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
          <nav className="text-xs text-gray-400 mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-gray-600 transition-colors">Inicio</Link>
            <span>›</span>
            <span className="text-gray-600 font-medium">Buscar trabajo</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 leading-tight">
                Buscador de trabajo en Suiza
              </h1>
              <p className="text-gray-500 text-sm max-w-xl">
                Ofertas en tiempo real de 7 fuentes: jobs.ch, JobScout24, Jobup.ch, RAV job-room, LinkedIn, Tempservice y tempoX. Más 13 agencias ETT directas.
              </p>
            </div>
            <div className="flex gap-5 text-center flex-shrink-0">
              {[
                { n: "11", l: "sectores" },
                { n: "7",  l: "fuentes live" },
                { n: "13", l: "ETTs listadas" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-xl font-bold text-gray-900">{s.n}</div>
                  <div className="text-xs text-gray-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── UNIA BANNER ─────────────────────────────────────── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl flex-shrink-0">⚖️</span>
            <div>
              <span className="font-bold text-amber-900 text-sm">¿Conoces tus derechos laborales en Suiza?</span>
              <span className="text-amber-700 text-sm ml-2">La UNIA te protege desde el primer día de trabajo.</span>
            </div>
          </div>
          <Link
            href="/trabajo/unia"
            className="flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full text-white transition-opacity hover:opacity-90"
            style={{ background: "#C8102E" }}
          >
            Qué es la UNIA →
          </Link>
        </div>
      </div>

      {/* ── PASOS ────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-0 overflow-x-auto">
          {[
            { n: "1", label: "Elige el sector", done: !!categoria || !!customTerm.trim() },
            { n: "2", label: "Ciudad",           done: true },
            { n: "3", label: "Ver ofertas",      done: buscado },
          ].map((paso, i) => (
            <div key={paso.n} className="flex items-center flex-shrink-0">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: paso.done ? ACCENT : "#e5e7eb", color: paso.done ? "#fff" : "#9ca3af" }}
                >
                  {paso.done ? "✓" : paso.n}
                </div>
                <span className={`text-sm font-medium whitespace-nowrap ${paso.done ? "text-gray-800" : "text-gray-400"}`}>
                  {paso.label}
                </span>
              </div>
              {i < 2 && <div className="w-8 md:w-12 h-px bg-gray-200 mx-2 flex-shrink-0" />}
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* ── FORMULARIO ───────────────────────────────────────── */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">

          {/* Búsqueda libre — opcional */}
          <div className="mb-5">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Búsqueda libre{" "}
              <span className="font-normal text-gray-400 text-xs">(opcional — o elige un sector abajo)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customTerm}
                onChange={(e) => { setCustomTerm(e.target.value); setBuscado(false); }}
                placeholder="Ej: cocinero, electricista, nurse…"
                className="flex-1 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                style={{ border: "1.5px solid #E5E7EB", focusRingColor: ACCENT } as React.CSSProperties}
                onKeyDown={(e) => { if (e.key === "Enter") buscar(); }}
              />
              {customTerm.trim() && (
                <button
                  onClick={() => { setCustomTerm(""); setBuscado(false); }}
                  className="px-3 py-2 rounded-xl text-xs text-gray-400 hover:text-gray-600 border border-gray-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Categorías — Step 1 */}
          <div className="mb-5">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-xs mr-1.5" style={{ background: ACCENT }}>1</span>
              Sector de trabajo
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {JOB_CATEGORIES.map((cat) => {
                const selected = categoria?.slug === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => { setCategoria(cat); setCustomTerm(""); setBuscado(false); }}
                    className={`relative flex flex-col items-start px-3 py-3 rounded-xl border text-sm font-medium transition-all text-left ${
                      selected
                        ? "border-red-600 bg-red-50 text-red-700 shadow-sm"
                        : "border-gray-200 bg-white text-gray-700 hover:border-red-200 hover:bg-red-50/40"
                    }`}
                    style={{ minHeight: "72px" }}
                  >
                    {selected && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                        ✓
                      </span>
                    )}
                    <span className="text-2xl mb-1 flex-shrink-0">{cat.icono}</span>
                    <span className="font-medium text-sm leading-tight">{cat.label}</span>
                    {selected ? (
                      <span className="text-[10px] text-green-600 font-semibold mt-0.5">
                        {salaryLabel(cat)}/mes
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        {salaryLabel(cat)}/mes
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info sector */}
          {categoria && !customTerm.trim() && (
            <div className="rounded-xl p-4 mb-5 border border-red-100 bg-red-50/60">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{categoria.icono}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">{categoria.description}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="bg-white border border-red-100 text-green-700 font-bold text-xs px-3 py-1 rounded-lg">
                      {fmt(categoria.salarioMin)} – {fmt(categoria.salarioMax)}/mes
                    </span>
                    {categoria.terms.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs bg-white border border-red-200 text-red-600 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ciudad chips — Step 2 */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-xs mr-1.5" style={{ background: ACCENT }}>2</span>
              Ciudad o cantón
              <span className="font-normal text-gray-400 text-xs ml-2">({CIUDADES_SUIZA.length - 1} opciones)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {(mostrarTodasCiudades ? CIUDADES_SUIZA : CIUDADES_SUIZA.slice(0, 11)).map((c) => (
                <button
                  key={c}
                  onClick={() => { setCiudad(c); setBuscado(false); }}
                  className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                    ciudad === c ? "text-white border-transparent" : "border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-700 bg-white"
                  }`}
                  style={ciudad === c ? { background: c === "Toda Suiza" ? "#1d4ed8" : ACCENT } : {}}
                >
                  {CIUDAD_EMOJIS[c] ?? ""} {c}
                </button>
              ))}
              <button
                onClick={() => setMostrarTodasCiudades(!mostrarTodasCiudades)}
                className="px-3 py-1.5 rounded-full border border-dashed border-gray-300 text-sm text-gray-500 hover:border-red-300 hover:text-red-600 transition-all"
              >
                {mostrarTodasCiudades ? "▲ Menos" : `+${CIUDADES_SUIZA.length - 11} más`}
              </button>
            </div>
          </div>

          <button
            onClick={buscar}
            disabled={(!categoria && !customTerm.trim()) || loading}
            style={{ background: (categoria || customTerm.trim()) && !loading ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` : undefined }}
            className={`w-full font-bold py-3.5 rounded-xl text-base transition-all flex items-center justify-center gap-2 ${
              (categoria || customTerm.trim()) && !loading ? "text-white hover:opacity-95 shadow-md shadow-red-200" : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span>Buscando en 7 fuentes: jobs.ch, LinkedIn, JobScout24, jobup, RAV, Tempservice, tempoX…</span>
              </>
            ) : (categoria || customTerm.trim()) && !user ? (
              <>
                <span>🔒</span>
                <span>Regístrate gratis para ver ofertas</span>
              </>
            ) : categoria || customTerm.trim() ? (
              <>
                <span>
                  Buscar {customTerm.trim() || categoria?.label} en {ciudad}
                </span>
                <span className="text-lg">→</span>
              </>
            ) : (
              "Selecciona un sector o escribe qué buscas"
            )}
          </button>
        </div>

        {/* ── RESULTADOS ───────────────────────────────────────── */}
        {buscado && loading && (
          <div id="resultados-trabajo" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-gray-100 border-l-4" style={{ borderLeftColor: "#e5e7eb" }}>
                <div className="p-4 pb-3">
                  <div className="skeleton h-5 rounded mb-2" />
                  <div className="skeleton h-3 w-1/2 rounded mb-2" />
                  <div className="skeleton h-3 w-2/3 rounded" />
                </div>
                <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex gap-2">
                  <div className="skeleton h-5 w-16 rounded-full" />
                  <div className="skeleton h-5 w-12 rounded-full" />
                  <div className="skeleton h-5 w-20 rounded-full ml-auto" />
                </div>
              </div>
            ))}
          </div>
        )}

        {buscado && !loading && (
          <div id="resultados-trabajo" className="space-y-10">

            {/* Barra resumen */}
            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
              <span className="text-2xl">{customTerm.trim() ? "🔎" : (categoria?.icono ?? "🔎")}</span>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-gray-800">{customTerm.trim() || categoria?.label}</span>
                <span className="text-gray-400 mx-2">·</span>
                <span className="text-gray-600">{ciudad}</span>
                {jobs.length > 0 && (
                  <>
                    <span className="text-gray-400 mx-2">·</span>
                    <span className="text-green-700 font-semibold text-sm">{jobs.length} ofertas</span>
                  </>
                )}
                {sources && (
                  <span className="text-gray-400 text-xs ml-2">
                    (jobs.ch: {sources.jobsCh} · Scout24: {sources.jobScout24} · jobup: {sources.jobup} · RAV: {sources.jobRoom} · ETT: {sources.tempservice + sources.tempoX} · LinkedIn: {sources.linkedin})
                  </span>
                )}
              </div>
              <button
                onClick={() => { setBuscado(false); setCategoria(null); setJobs([]); setCustomTerm(""); }}
                className="text-xs text-gray-400 hover:text-red-600 border border-gray-200 rounded-full px-3 py-1 flex-shrink-0"
              >
                Nueva búsqueda
              </button>
            </div>

            {/* Ofertas reales */}
            {jobs.length > 0 ? (
              <section>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <div className="w-1 h-6 rounded-full" style={{ background: ACCENT }} />
                  <h2 className="text-lg font-bold text-gray-800">Ofertas en tiempo real</h2>
                  <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                    {jobs.length} ofertas
                  </span>
                  {jobs.some(j => j.isEtt) && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                      🏭 {jobs.filter(j => j.isEtt).length} de agencias ETT
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  {jobs.map((job, i) => {
                    const src      = SOURCE_STYLE[job.source] ?? SOURCE_STYLE["LinkedIn"];
                    const expanded = expandedJobs.has(i);
                    const hasContact = job.applyEmail || job.applyPhone;
                    const salaryRange = categoria
                      ? `${fmt(categoria.salarioMin)}–${fmt(categoria.salarioMax)} CHF/mes`
                      : null;
                    return (
                      <div
                        key={i}
                        className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col border-l-4 overflow-hidden"
                        style={{ borderLeftColor: hasContact ? "#16a34a" : job.isEtt ? "#f59e0b" : ACCENT }}
                      >
                        {/* ── CABECERA ──────────────────────────────── */}
                        <div className="p-4 pb-3">

                          {/* Badges superiores */}
                          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                            {job.sectorEs && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 uppercase tracking-wide">
                                {job.sectorEs}
                              </span>
                            )}
                            {hasContact && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                ✅ Contacto directo disponible
                              </span>
                            )}
                            {job.isEtt && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                                🏭 Agencia ETT
                              </span>
                            )}
                            {job.pubDate && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-400 ml-auto">
                                🕐 {timeAgo(job.pubDate)}
                              </span>
                            )}
                          </div>

                          {/* Título en español */}
                          <h3 className="font-bold text-gray-900 text-base leading-snug mb-0.5">
                            {job.titleEs ?? job.title}
                          </h3>
                          {job.titleEs && (
                            <p className="text-[11px] text-gray-400 mb-2 italic">
                              Anuncio original: &ldquo;{job.title}&rdquo;
                            </p>
                          )}

                          {/* Empresa + ubicación */}
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                            {job.company && (
                              <span className="font-semibold flex items-center gap-1">
                                🏢 {job.company}
                              </span>
                            )}
                            {job.location && (
                              <span className="flex items-center gap-1">
                                📍 {job.location}
                              </span>
                            )}
                            {job.contractType && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                                📋 {job.contractType}
                              </span>
                            )}
                            {job.workload && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-medium">
                                ⏱ {job.workload}
                              </span>
                            )}
                          </div>

                          {/* Salario */}
                          {(job.salary || salaryRange) && (
                            <div className="mb-3">
                              <span className="text-sm font-bold text-green-700">
                                💰 {job.salary ?? `Aprox. ${salaryRange}`}
                              </span>
                            </div>
                          )}

                          {/* Descripción */}
                          {job.description && (
                            <div className="mb-3">
                              <p className={`text-sm text-gray-600 leading-relaxed ${expanded ? "" : "line-clamp-3"}`}>
                                {expanded ? (job.descriptionFull ?? job.description) : job.description}
                              </p>
                              {(job.descriptionFull?.length ?? 0) > 280 && (
                                <button
                                  onClick={() => toggleExpand(i)}
                                  className="text-xs text-red-600 hover:text-red-800 font-semibold mt-1"
                                >
                                  {expanded ? "▲ Ver menos" : "▼ Ver descripción completa"}
                                </button>
                              )}
                            </div>
                          )}

                          {/* Requisitos — siempre visibles si los hay */}
                          {job.requirements && job.requirements.length > 0 && (
                            <div className="mb-3">
                              <p className="text-xs font-bold text-gray-600 mb-1.5">📌 Requisitos:</p>
                              <ul className="space-y-0.5">
                                {(expanded ? job.requirements : job.requirements.slice(0, 3)).map((r, ri) => (
                                  <li key={ri} className="text-xs text-gray-600 flex gap-2">
                                    <span className="text-green-500 flex-shrink-0">✓</span>
                                    <span>{r}</span>
                                  </li>
                                ))}
                                {!expanded && job.requirements.length > 3 && (
                                  <li className="text-xs text-gray-400 ml-4">+{job.requirements.length - 3} más…</li>
                                )}
                              </ul>
                            </div>
                          )}

                          {/* Idioma requerido */}
                          {job.languageRequired && (
                            <div className="mb-2">
                              <span className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold">
                                🗣 Idioma requerido: {job.languageRequired}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* ── SECCIÓN DE CONTACTO DIRECTO ───────────── */}
                        {hasContact ? (
                          <div className="mx-4 mb-3 rounded-xl border border-green-200 bg-green-50 p-3">
                            <p className="text-xs font-bold text-green-800 mb-2.5">
                              📬 Contactar directamente — sin pasar por el portal
                            </p>
                            <div className="flex flex-col gap-2">
                              {job.applyEmail && (
                                <a
                                  href={`mailto:${job.applyEmail}?subject=Candidatura: ${job.titleEs ?? job.title}&body=Hola,%0A%0AMe interesa la oferta de ${job.titleEs ?? job.title} en ${job.company}.%0A%0AQuedo a vuestra disposición.%0A%0ASaludos`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-2 bg-white border border-green-200 rounded-lg px-3 py-2 hover:bg-green-100 transition-colors"
                                >
                                  <span className="text-lg flex-shrink-0">✉️</span>
                                  <div className="min-w-0">
                                    <div className="text-xs font-bold text-green-800">Enviar email</div>
                                    <div className="text-xs text-green-700 truncate">{job.applyEmail}</div>
                                  </div>
                                  <span className="ml-auto text-green-600 text-sm font-bold flex-shrink-0">→</span>
                                </a>
                              )}
                              {job.applyPhone && (
                                <a
                                  href={`tel:${job.applyPhone.replace(/[\s.-]/g, "")}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-2 bg-white border border-green-200 rounded-lg px-3 py-2 hover:bg-green-100 transition-colors"
                                >
                                  <span className="text-lg flex-shrink-0">📞</span>
                                  <div>
                                    <div className="text-xs font-bold text-green-800">Llamar</div>
                                    <div className="text-xs text-green-700">{job.applyPhone}</div>
                                  </div>
                                  <span className="ml-auto text-green-600 text-sm font-bold flex-shrink-0">→</span>
                                </a>
                              )}
                              {job.companyWebsite && (
                                <a
                                  href={job.companyWebsite}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-2 bg-white border border-blue-200 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
                                >
                                  <span className="text-lg flex-shrink-0">🌐</span>
                                  <div className="min-w-0">
                                    <div className="text-xs font-bold text-blue-800">Web de la empresa</div>
                                    <div className="text-xs text-blue-600 truncate">{job.companyWebsite.replace(/^https?:\/\//, "")}</div>
                                  </div>
                                  <span className="ml-auto text-blue-500 text-sm font-bold flex-shrink-0">↗</span>
                                </a>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="mx-4 mb-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
                            <p className="text-[11px] text-gray-500">
                              ℹ️ Sin datos de contacto en este anuncio.{" "}
                              <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-red-600 font-semibold hover:underline">
                                Ver oferta completa →
                              </a>
                            </p>
                          </div>
                        )}

                        {/* ── FOOTER ───────────────────────────────── */}
                        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center gap-2 flex-wrap">
                          <span
                            className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: src.bg, color: src.color }}
                          >
                            {src.label}
                          </span>
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto text-xs text-gray-400 hover:text-red-600 flex items-center gap-1 font-medium"
                          >
                            Ver oferta original ↗
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : error ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
                <p className="text-amber-800 font-semibold mb-1">⚠ {error}</p>
                <p className="text-amber-700 text-sm">Prueba buscar directamente en los portales de abajo.</p>
              </div>
            ) : null}

            {/* Portales como fallback / complemento */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 rounded-full bg-gray-300" />
                <h2 className="text-base font-bold text-gray-700">Buscar también en otros portales</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PORTALES_EMPLEO_BUSQUEDA.map((p) => (
                  <a
                    key={p.nombre}
                    href={buildUrl(p.url, termPrincipal, ciudadUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-gray-100 rounded-xl p-3 hover:border-red-200 transition-all flex items-center gap-2 group text-sm"
                  >
                    <span className="text-lg">{p.logo}</span>
                    <span className="font-medium text-gray-700 group-hover:text-red-700">{p.nombre}</span>
                    <span className="ml-auto text-gray-500 group-hover:text-red-400 text-xs">→</span>
                  </a>
                ))}
              </div>
            </section>

            {/* ETT */}
            <section>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-6 rounded-full bg-amber-500" />
                <h2 className="text-base font-bold text-gray-700">Agencias ETT — la vía más rápida para trabajar</h2>
              </div>
              <p className="text-xs text-gray-500 mb-4 ml-4">
                Regístrate directamente en varias a la vez. Las temporeras tienen acceso a ofertas que <strong>no aparecen en portales públicos</strong> — especialmente en construcción, hostelería y logística.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {AGENCIAS_ETT.map((a) => (
                  <a
                    key={a.nombre}
                    href={buildUrl(a.url, termPrincipal, ciudadUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-gray-100 rounded-xl p-3 hover:border-amber-200 transition-all flex flex-col gap-0.5 group text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span>{a.logo}</span>
                      <span className="font-medium text-gray-700 group-hover:text-amber-700">{a.nombre}</span>
                      <span className="ml-auto text-gray-400 group-hover:text-amber-400 text-xs">→</span>
                    </div>
                    {a.desc && (
                      <span className="text-[10px] text-gray-400 ml-6">{a.desc}</span>
                    )}
                  </a>
                ))}
              </div>
            </section>

            {/* Empleo público */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 rounded-full bg-blue-500" />
                <h2 className="text-base font-bold text-gray-700">Empleo público</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PORTALES_PUBLICOS.map((p) => (
                  <a
                    key={p.nombre}
                    href={buildUrl(p.url, termPrincipal, ciudadUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-gray-100 rounded-xl p-3 hover:border-blue-200 transition-all group"
                  >
                    <div className="font-semibold text-gray-800 group-hover:text-blue-700 text-sm mb-0.5">{p.nombre}</div>
                    <div className="text-xs text-gray-400">{p.desc}</div>
                  </a>
                ))}
              </div>
            </section>

            {/* Tips */}
            <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>💡</span> Consejos para buscar trabajo en Suiza
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-700">
                <li className="flex gap-2"><span className="text-amber-500 flex-shrink-0">▸</span><span><strong>jobs.ch es el portal más grande</strong> — la mayoría de empresas suizas publica aquí primero.</span></li>
                <li className="flex gap-2"><span className="text-amber-500 flex-shrink-0">▸</span><span><strong>LinkedIn es imprescindible</strong> — muchos reclutadores suizos buscan activamente perfiles.</span></li>
                <li className="flex gap-2"><span className="text-amber-500 flex-shrink-0">▸</span><span><strong>Las ETT son lo primero</strong> — ICM Bau, tempoX, Adia y las demás tienen ofertas exclusivas que no salen en los portales públicos. Regístrate en varias.</span></li>
                <li className="flex gap-2"><span className="text-amber-500 flex-shrink-0">▸</span><span><strong>CV en formato europeo</strong> — máximo 2 páginas, foto opcional.</span></li>
                {categoria && (
                  <li className="flex gap-2"><span className="text-amber-500 flex-shrink-0">▸</span><span><strong>Salario referencia en {categoria.label}:</strong> {fmt(categoria.salarioMin)} – {fmt(categoria.salarioMax)} CHF/mes bruto.</span></li>
                )}
              </ul>
            </section>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/herramientas/salario-neto" className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-red-100 transition-all flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 bg-red-50">💰</div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 group-hover:text-red-700">¿Cuánto cobrarás neto?</div>
                  <div className="text-sm text-gray-500">Calcula después de impuestos y cotizaciones.</div>
                </div>
                <span className="text-gray-500 group-hover:text-red-500">→</span>
              </Link>
              <Link href="/vivienda" className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-blue-100 transition-all flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 bg-blue-50">🏠</div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 group-hover:text-blue-700">¿Dónde vivir?</div>
                  <div className="text-sm text-gray-500">Pisos reales de flatfox y otros portales.</div>
                </div>
                <span className="text-gray-500 group-hover:text-blue-500">→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
