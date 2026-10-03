"use client";
import { useState } from "react";
import Link from "next/link";
import {
  CIUDADES_SUIZA, TIPOS_VIVIENDA, type TipoVivienda,
} from "@/lib/buscador";
import type { ViviendaItem, PortalInfo } from "@/app/api/vivienda/route";
import { useAuth } from "@/contexts/AuthContext";

const fmt = (n: number) =>
  new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(n);

const ACCENT = "#1d4ed8";
const ACCENT_DARK = "#1e3a8a";

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

const CONSEJOS = [
  { icono: "📄", titulo: "Documentación necesaria", cuerpo: "Pasaporte/DNI, contrato de trabajo, últimas nóminas y permiso de residencia. Sin estos papeles la mayoría de propietarios no te responderán." },
  { icono: "💳", titulo: "Betreibungsregister", cuerpo: "El registro de deudas suizo. Lo piden casi todos los propietarios. Se solicita en el Betreibungsamt de tu municipio. Cuesta ~17 CHF y tarda 2-3 días." },
  { icono: "✍️", titulo: "Carta de presentación", cuerpo: "En Suiza es habitual escribir una carta personal al propietario. Preséntate, di que no fumas (Nichtraucher) y que cuidarás bien el piso." },
  { icono: "💰", titulo: "Fianza (Kaution)", cuerpo: "Equivale a 2-3 meses de alquiler. Se deposita en una cuenta bloqueada. Puedes usar una garantía bancaria para no inmovilizar el dinero." },
  { icono: "⚡", titulo: "Responde rápido", cuerpo: "Los buenos pisos desaparecen en horas. Ten la documentación lista de antemano y contesta en menos de 1 hora al propietario." },
  { icono: "🌐", titulo: "Empadronamiento (Anmeldung)", cuerpo: "Al mudarte tienes 14 días para empadronarte. Necesitas el contrato de alquiler y el pasaporte. Es obligatorio." },
];

export default function ViviendaPage() {
  const [tipo, setTipo] = useState<TipoVivienda | null>(null);
  const [ciudad, setCiudad] = useState("Zürich");
  const [listings, setListings] = useState<ViviendaItem[]>([]);
  const [portales, setPortales] = useState<PortalInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [buscado, setBuscado] = useState(false);
  const [error, setError] = useState("");
  const { user, openModal } = useAuth();

  const esWG = tipo?.slug === "wg-habitacion";

  async function buscar() {
    if (!tipo) return;
    if (!user) { openModal(() => buscar()); return; }
    setLoading(true);
    setBuscado(true);
    setListings([]);
    setError("");

    try {
      const res = await fetch(
        `/api/vivienda?city=${encodeURIComponent(ciudad)}&tipo=${encodeURIComponent(tipo.slug)}`
      );
      const data = await res.json();
      setListings(data.listings ?? []);
      setPortales(data.portales ?? []);
      if ((data.listings ?? []).length === 0)
        setError("Sin resultados directos. Usa los portales de abajo para ver pisos reales.");
    } catch {
      setError("Error al cargar. Usa los portales directamente.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        document.getElementById("resultados-vivienda")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-200" style={{ borderTop: `3px solid ${ACCENT}` }}>
        <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
          <nav className="text-xs text-gray-400 mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-gray-600 transition-colors">Inicio</Link>
            <span>›</span>
            <span className="text-gray-600 font-medium">Buscar vivienda</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 leading-tight">
                Buscador de vivienda en Suiza
              </h1>
              <p className="text-gray-500 text-sm max-w-xl">
                Accede a los mejores portales inmobiliarios suizos con tu búsqueda ya aplicada.
              </p>
            </div>
            <div className="flex gap-5 text-center flex-shrink-0">
              {[{ n: "5", l: "tipos" }, { n: "6+", l: "portales" }, { n: "10", l: "ciudades" }].map((s) => (
                <div key={s.l}>
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
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-0 overflow-x-auto">
          {[
            { n: "1", label: "Tipo de alojamiento", done: !!tipo },
            { n: "2", label: "Ciudad", done: !!tipo },
            { n: "3", label: "Ver pisos", done: buscado },
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

          {/* Tipos de vivienda — Step 1 */}
          <div className="mb-5">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-xs mr-1.5" style={{ background: ACCENT }}>1</span>
              Tipo de alojamiento
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {TIPOS_VIVIENDA.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => { setTipo(t); setBuscado(false); }}
                  className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                    tipo?.slug === t.slug
                      ? "border-blue-600 bg-blue-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/30"
                  }`}
                  style={{ minHeight: "80px" }}
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">{t.icono}</span>
                  <div>
                    <div className={`font-semibold text-sm ${tipo?.slug === t.slug ? "text-blue-700" : "text-gray-800"}`}>{t.label}</div>
                    <div className="text-xs text-blue-600 font-bold mt-1">{fmt(t.precioMin)} – {fmt(t.precioMax)}/mes</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {tipo && (
            <div className="rounded-xl p-4 mb-5 border border-blue-100 bg-blue-50/60 flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{tipo.icono}</span>
              <div>
                <p className="text-sm text-gray-700 leading-relaxed">{tipo.description}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="bg-white border border-blue-100 text-blue-700 font-bold text-xs px-3 py-1 rounded-lg">
                    {fmt(tipo.precioMin)} – {fmt(tipo.precioMax)}/mes en {ciudad}
                  </span>
                  {esWG && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">✓ Ideal para recién llegados</span>}
                </div>
              </div>
            </div>
          )}

          {/* Ciudad chips — Step 2 */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-xs mr-1.5" style={{ background: ACCENT }}>2</span>
              Ciudad
            </label>
            <div className="flex flex-wrap gap-2">
              {CIUDADES_SUIZA.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCiudad(c); setBuscado(false); }}
                  className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                    ciudad === c ? "text-white border-transparent" : "border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700 bg-white"
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
            disabled={!tipo || loading}
            style={{ background: tipo && !loading ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` : undefined }}
            className={`w-full font-bold py-3.5 rounded-xl text-base transition-all flex items-center justify-center gap-2 ${
              tipo && !loading ? "text-white hover:opacity-95 shadow-md shadow-blue-200" : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span>Buscando portales disponibles…</span>
              </>
            ) : tipo && !user ? (
              <>
                <span>🔒</span>
                <span>Regístrate gratis para ver portales</span>
              </>
            ) : tipo ? (
              <>
                <span>Buscar {tipo.label} en {ciudad}</span>
                <span className="text-lg">→</span>
              </>
            ) : (
              "Selecciona el tipo de alojamiento"
            )}
          </button>
        </div>

        {/* ── RESULTADOS ───────────────────────────────────────── */}
        {buscado && !loading && (
          <div id="resultados-vivienda" className="space-y-10">

            {/* Barra resumen */}
            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
              <span className="text-2xl">{tipo?.icono}</span>
              <div className="flex-1">
                <span className="font-bold text-gray-800">{tipo?.label}</span>
                <span className="text-gray-400 mx-2">·</span>
                <span className="text-gray-600">{ciudad}</span>
                {listings.length > 0 && (
                  <>
                    <span className="text-gray-400 mx-2">·</span>
                    <span className="text-green-700 font-semibold text-sm">{listings.length} pisos disponibles</span>
                  </>
                )}
              </div>
              <button
                onClick={() => { setBuscado(false); setTipo(null); setListings([]); }}
                className="text-xs text-gray-400 hover:text-blue-600 border border-gray-200 rounded-full px-3 py-1"
              >
                Nueva búsqueda
              </button>
            </div>

            {/* Pisos reales */}
            {listings.length > 0 ? (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 rounded-full" style={{ background: ACCENT }} />
                  <h2 className="text-lg font-bold text-gray-800">Pisos disponibles ahora</h2>
                  <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                    {listings.length} en flatfox.ch
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {listings.map((item, i) => (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:border-blue-200 transition-all group flex flex-col"
                    >
                      {/* Thumbnail */}
                      {item.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-36 object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-36 bg-blue-50 flex items-center justify-center text-4xl">🏠</div>
                      )}

                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-bold text-gray-800 group-hover:text-blue-700 text-sm leading-snug mb-2 flex-1">
                          {item.title}
                        </h3>

                        {/* Datos */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.price && (
                            <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                              {fmt(item.price)}/mes
                            </span>
                          )}
                          {item.rooms && (
                            <span className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full">
                              {item.rooms} hab.
                            </span>
                          )}
                          {item.size && (
                            <span className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full">
                              {item.size} m²
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-50">
                          <span className="flex items-center gap-1">📍 {item.location}</span>
                          <span className="text-blue-500 font-medium group-hover:underline">Ver anuncio →</span>
                        </div>
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

            {/* Portales — principales cuando no hay listings, complementarios si los hay */}
            <section>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-1 h-6 rounded-full ${listings.length === 0 ? "bg-blue-500" : "bg-gray-300"}`} />
                <h2 className={`font-bold ${listings.length === 0 ? "text-lg text-gray-800" : "text-base text-gray-700"}`}>
                  {listings.length === 0
                    ? `Buscar ${tipo?.label ?? "piso"} en ${ciudad} — portales directos`
                    : "Buscar también en otros portales"}
                </h2>
              </div>
              <p className="text-gray-500 text-sm mb-4 ml-4">
                Los portales se abren con tu búsqueda ya aplicada.
              </p>
              <div className={`grid gap-3 ${listings.length === 0 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 sm:grid-cols-3"}`}>
                {portales.map((p) => (
                  <a
                    key={p.nombre}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-white border rounded-xl hover:border-blue-200 transition-all group ${
                      listings.length === 0 ? "p-5 border-gray-100 hover:shadow-md border-l-4" : "p-3 border-gray-100 text-sm"
                    }`}
                    style={listings.length === 0 ? { borderLeftColor: ACCENT } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <span className={listings.length === 0 ? "text-2xl" : "text-lg"}>{p.logo}</span>
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold text-gray-800 group-hover:text-blue-700 ${listings.length === 0 ? "" : "text-sm"}`}>{p.nombre}</div>
                        <div className="text-xs text-gray-400 truncate">{p.desc}</div>
                      </div>
                      {listings.length === 0 ? (
                        <span
                          className="text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 transition-colors"
                          style={{ background: "#eff6ff", color: ACCENT }}
                        >
                          Abrir portal →
                        </span>
                      ) : (
                        <span className="text-gray-300 group-hover:text-blue-400 flex-shrink-0">→</span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Precios referencia */}
            <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h2 className="font-bold text-gray-800 mb-4">📊 Precios de alquiler en {ciudad} (2026)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {TIPOS_VIVIENDA.map((t) => (
                  <div key={t.slug} className={`bg-white rounded-xl p-3 border ${t.slug === tipo?.slug ? "border-blue-400 shadow-sm" : "border-gray-100"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span>{t.icono}</span>
                      <span className="text-xs font-semibold text-gray-700 leading-tight">{t.label}</span>
                    </div>
                    <div className="font-bold text-blue-700 text-sm">{fmt(t.precioMin)} – {fmt(t.precioMax)}/mes</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">* Precios orientativos para {ciudad}. Varían según zona y estado del piso.</p>
            </section>

            {/* Consejos */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 rounded-full bg-amber-500" />
                <h2 className="text-lg font-bold text-gray-800">Cómo alquilar en Suiza</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CONSEJOS.map((c) => (
                  <div key={c.titulo} className="bg-white border border-gray-100 rounded-xl p-4 flex gap-3">
                    <span className="text-xl flex-shrink-0">{c.icono}</span>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm mb-1">{c.titulo}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{c.cuerpo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTAs cruzados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/trabajo" className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-red-100 transition-all flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 bg-red-50">💼</div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 group-hover:text-red-700">Buscar trabajo</div>
                  <div className="text-sm text-gray-500">Ofertas reales de jobs.ch.</div>
                </div>
                <span className="text-gray-300 group-hover:text-red-400">→</span>
              </Link>
              <Link href="/seguros" className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-purple-100 transition-all flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 bg-purple-50">🛡️</div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 group-hover:text-purple-700">Seguro médico obligatorio</div>
                  <div className="text-sm text-gray-500">Compara y contrata tu KVG/LAMal.</div>
                </div>
                <span className="text-gray-300 group-hover:text-purple-400">→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
