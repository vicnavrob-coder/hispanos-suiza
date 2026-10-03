"use client";
import { useState } from "react";
import Link from "next/link";
import {
  JOB_CATEGORIES, CIUDADES_SUIZA,
  PORTALES_EMPLEO_BUSQUEDA, AGENCIAS_ETT, PORTALES_PUBLICOS,
  buildUrl, type JobCategory,
} from "@/lib/buscador";
import type { JobItem } from "@/app/api/jobs/route";
import { useAuth } from "@/contexts/AuthContext";

const fmt = (n: number) =>
  new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(n);

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

const ACCENT = "#C0392B";
const ACCENT_DARK = "#96281B";

const CIUDAD_EMOJIS: Record<string, string> = {
  "Zürich":     "🏔️",
  "Geneva":     "🌊",
  "Basel":      "🏛️",
  "Bern":       "🐻",
  "Lausanne":   "🎓",
  "Lugano":     "☀️",
  "Winterthur": "🌿",
  "St. Gallen": "📚",
  "Lucerne":    "🌉",
  "Zug":        "💼",
};

// Salary range text for unselected state
function salaryLabel(cat: JobCategory): string {
  return `${fmt(cat.salarioMin)}–${fmt(cat.salarioMax)}`;
}

export default function TrabajoPage() {
  const [categoria, setCategoria] = useState<JobCategory | null>(null);
  const [ciudad, setCiudad] = useState("Zürich");
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [buscado, setBuscado] = useState(false);
  const [error, setError] = useState("");
  const { user, openModal } = useAuth();

  async function buscar() {
    if (!categoria) return;
    if (!user) { openModal(() => buscar()); return; }
    setLoading(true);
    setBuscado(true);
    setJobs([]);
    setError("");

    try {
      const term = categoria.terms[0];
      const res = await fetch(
        `/api/jobs?term=${encodeURIComponent(term)}&city=${encodeURIComponent(ciudad)}`
      );
      const data = await res.json();
      setJobs(data.jobs ?? []);
      if ((data.jobs ?? []).length === 0) setError("Sin resultados. Prueba con otra ciudad.");
    } catch {
      setError("Error al cargar ofertas. Usa los portales directamente.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        document.getElementById("resultados-trabajo")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }

  const termPrincipal = categoria?.terms[0] ?? "";

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
                Ofertas reales de LinkedIn y portales suizos. Regístrate gratis para buscar.
              </p>
            </div>
            <div className="flex gap-5 text-center flex-shrink-0">
              {[
                { n: "11", l: "sectores" },
                { n: "6",  l: "portales" },
                { n: "6",  l: "agencias ETT" },
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

      {/* ── PASOS ────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-0 overflow-x-auto">
          {[
            { n: "1", label: "Elige el sector", done: !!categoria },
            { n: "2", label: "Ciudad", done: !!categoria },
            { n: "3", label: "Ver ofertas", done: buscado },
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
                    onClick={() => { setCategoria(cat); setBuscado(false); }}
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
          {categoria && (
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
            </label>
            <div className="flex flex-wrap gap-2">
              {CIUDADES_SUIZA.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCiudad(c); setBuscado(false); }}
                  className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                    ciudad === c ? "text-white border-transparent" : "border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-700 bg-white"
                  }`}
                  style={ciudad === c ? { background: ACCENT } : {}}
                >
                  {CIUDAD_EMOJIS[c] ?? ""} {c}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={buscar}
            disabled={!categoria || loading}
            style={{ background: categoria && !loading ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` : undefined }}
            className={`w-full font-bold py-3.5 rounded-xl text-base transition-all flex items-center justify-center gap-2 ${
              categoria && !loading ? "text-white hover:opacity-95 shadow-md shadow-red-200" : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span>Cargando ofertas de LinkedIn…</span>
              </>
            ) : categoria && !user ? (
              <>
                <span>🔒</span>
                <span>Regístrate gratis para ver ofertas</span>
              </>
            ) : categoria ? (
              <>
                <span>Buscar {categoria.label} en {ciudad}</span>
                <span className="text-lg">→</span>
              </>
            ) : (
              "Selecciona un sector para empezar"
            )}
          </button>
        </div>

        {/* ── RESULTADOS ───────────────────────────────────────── */}
        {buscado && loading && (
          <div id="resultados-trabajo" className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-gray-100">
                <div className="skeleton h-5 mx-4 mt-4 rounded mb-2" />
                <div className="skeleton h-3 mx-4 w-1/3 rounded mb-3" />
                <div className="skeleton h-3 mx-4 w-2/3 rounded mb-4" />
              </div>
            ))}
          </div>
        )}

        {buscado && !loading && (
          <div id="resultados-trabajo" className="space-y-10">

            {/* Barra resumen */}
            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
              <span className="text-2xl">{categoria?.icono}</span>
              <div className="flex-1">
                <span className="font-bold text-gray-800">{categoria?.label}</span>
                <span className="text-gray-400 mx-2">·</span>
                <span className="text-gray-600">{ciudad}</span>
                {jobs.length > 0 && (
                  <>
                    <span className="text-gray-400 mx-2">·</span>
                    <span className="text-green-700 font-semibold text-sm">{jobs.length} ofertas</span>
                  </>
                )}
              </div>
              <button
                onClick={() => { setBuscado(false); setCategoria(null); setJobs([]); }}
                className="text-xs text-gray-400 hover:text-red-600 border border-gray-200 rounded-full px-3 py-1"
              >
                Nueva búsqueda
              </button>
            </div>

            {/* Ofertas reales */}
            {jobs.length > 0 ? (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 rounded-full" style={{ background: ACCENT }} />
                  <h2 className="text-lg font-bold text-gray-800">Ofertas de trabajo — actualizadas ahora</h2>
                  <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                    {jobs.length} en LinkedIn
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {jobs.map((job, i) => (
                    <a
                      key={i}
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-red-200 transition-all group flex flex-col border-l-4"
                      style={{ borderLeftColor: ACCENT }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-gray-800 group-hover:text-red-700 text-sm leading-snug flex-1">
                          {job.title}
                        </h3>
                        <span className="text-gray-300 group-hover:text-red-400 text-lg flex-shrink-0">→</span>
                      </div>
                      {job.company && (
                        <div className="text-xs font-bold text-gray-700 mb-1">{job.company}</div>
                      )}
                      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-gray-50">
                        {job.location && (
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <span>📍</span>{job.location}
                          </span>
                        )}
                        {job.pubDate && (
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full ml-auto"
                            style={{ background: "#fef3c7", color: "#92400e" }}
                          >
                            {timeAgo(job.pubDate)}
                          </span>
                        )}
                        <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                          LinkedIn
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ) : error ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
                <p className="text-amber-800 font-semibold mb-1">⚠ {error}</p>
                <p className="text-amber-700 text-sm">Usa los portales de abajo para buscar directamente.</p>
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
                    href={buildUrl(p.url, termPrincipal, ciudad)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-gray-100 rounded-xl p-3 hover:border-red-200 transition-all flex items-center gap-2 group text-sm"
                  >
                    <span className="text-lg">{p.logo}</span>
                    <span className="font-medium text-gray-700 group-hover:text-red-700">{p.nombre}</span>
                    <span className="ml-auto text-gray-300 group-hover:text-red-400 text-xs">→</span>
                  </a>
                ))}
              </div>
            </section>

            {/* ETT */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 rounded-full bg-amber-500" />
                <h2 className="text-base font-bold text-gray-700">Agencias ETT — regístrate en varias</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {AGENCIAS_ETT.map((a) => (
                  <a
                    key={a.nombre}
                    href={buildUrl(a.url, termPrincipal, ciudad)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-gray-100 rounded-xl p-3 hover:border-amber-200 transition-all flex items-center gap-2 group text-sm"
                  >
                    <span>{a.logo}</span>
                    <span className="font-medium text-gray-700 group-hover:text-amber-700">{a.nombre}</span>
                    <span className="ml-auto text-gray-300 group-hover:text-amber-400 text-xs">→</span>
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
                    href={buildUrl(p.url, termPrincipal, ciudad)}
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
                <span>💡</span> Consejos para {categoria?.label} en Suiza
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-700">
                <li className="flex gap-2"><span className="text-amber-500 flex-shrink-0">▸</span><span><strong>LinkedIn es imprescindible</strong> — muchos reclutadores suizos buscan activamente perfiles.</span></li>
                <li className="flex gap-2"><span className="text-amber-500 flex-shrink-0">▸</span><span><strong>Regístrate en varias ETT a la vez</strong> — cada agencia tiene acuerdos con empresas distintas.</span></li>
                <li className="flex gap-2"><span className="text-amber-500 flex-shrink-0">▸</span><span><strong>CV en formato europeo</strong> — máximo 2 páginas, foto opcional.</span></li>
                <li className="flex gap-2"><span className="text-amber-500 flex-shrink-0">▸</span><span><strong>Salario referencia en {categoria?.label}:</strong> {categoria && fmt(categoria.salarioMin)} – {categoria && fmt(categoria.salarioMax)} CHF/mes bruto.</span></li>
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
                <span className="text-gray-300 group-hover:text-red-400">→</span>
              </Link>
              <Link href="/vivienda" className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-blue-100 transition-all flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 bg-blue-50">🏠</div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 group-hover:text-blue-700">¿Dónde vivir?</div>
                  <div className="text-sm text-gray-500">Pisos reales de flatfox y otros portales.</div>
                </div>
                <span className="text-gray-300 group-hover:text-blue-400">→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
