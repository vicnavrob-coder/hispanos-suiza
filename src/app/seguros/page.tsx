"use client";
import { useState } from "react";
import Link from "next/link";
import {
  CIUDADES_SUIZA, GRUPOS_EDAD, CANTON_FACTOR, FRANQUICIA_FACTOR,
  type GrupoEdad,
} from "@/lib/buscador";
import { SEGUROS_ASEGURADORAS, SEGUROS_FRANQUICIAS, SEGUROS_MODELOS } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";

const FRANQUICIAS_OPCIONES = [300, 500, 1000, 1500, 2000, 2500] as const;

const fmt = (n: number) =>
  new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(n);

const ACCENT = "#7c3aed";
const ACCENT_DARK = "#5b21b6";

const GRUPO_EMOJIS: Record<string, string> = {
  "0-18":  "👶",
  "19-25": "🧑",
  "26-35": "👨",
  "36-45": "👨‍💼",
  "46-55": "🧔",
  "56-65": "👴",
  "66+":   "🧓",
};

// How much cheaper a franquicia is vs 300 CHF base
const FRANQUICIA_AHORRO: Record<number, string | null> = {
  300:  null,
  500:  "~7%",
  1000: "~18%",
  1500: "~26%",
  2000: "~32%",
  2500: "~38%",
};

export default function SegurosPage() {
  const [grupoEdad, setGrupoEdad] = useState<GrupoEdad | null>(null);
  const [canton, setCanton] = useState("Zürich");
  const [franquicia, setFranquicia] = useState<number>(300);
  const [calculado, setCalculado] = useState(false);
  const { user, openModal } = useAuth();

  function calcular() {
    if (!grupoEdad) return;
    if (!user) { openModal(() => calcular()); return; }
    setCalculado(true);
    setTimeout(() => {
      document.getElementById("resultados-seguros")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  const primaEstimada =
    grupoEdad
      ? Math.round(grupoEdad.primaRef * (CANTON_FACTOR[canton] ?? 1) * (FRANQUICIA_FACTOR[franquicia] ?? 1))
      : 0;

  const primaHMO = Math.round(primaEstimada * 0.8);
  const primaTelmed = Math.round(primaEstimada * 0.75);

  const notaFranquicia = SEGUROS_FRANQUICIAS.find((f) => f.chf === franquicia)?.nota;

  // Approximate monthly saving vs franquicia 300
  function ahorroMensual(f: number): string | null {
    if (!grupoEdad || f === 300) return null;
    const base = Math.round(grupoEdad.primaRef * (CANTON_FACTOR[canton] ?? 1) * (FRANQUICIA_FACTOR[300] ?? 1));
    const actual = Math.round(grupoEdad.primaRef * (CANTON_FACTOR[canton] ?? 1) * (FRANQUICIA_FACTOR[f] ?? 1));
    const saving = base - actual;
    return saving > 0 ? `Ahorras ~${fmt(saving)}/mes` : null;
  }

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-200" style={{ borderTop: `3px solid ${ACCENT}` }}>
        <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
          <nav className="text-xs text-gray-400 mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-gray-600 transition-colors">Inicio</Link>
            <span>›</span>
            <span className="text-gray-600 font-medium">Seguro médico</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 leading-tight">
                Comparador de seguro médico
              </h1>
              <p className="text-gray-500 text-sm max-w-xl">
                Calcula tu prima según edad, cantón y franquicia. Compara aseguradoras y elige la más barata.
              </p>
            </div>
            <div className="flex gap-5 text-center flex-shrink-0">
              {[
                { n: "8", l: "aseguradoras" },
                { n: "6", l: "franquicias" },
                { n: "4", l: "modelos" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-xl font-bold text-gray-900">{s.n}</div>
                  <div className="text-xs text-gray-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ALERTA OBLIGATORIO ───────────────────────────────── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center gap-2.5">
          <span className="text-sm flex-shrink-0">⚠️</span>
          <p className="text-xs text-amber-800">
            <strong>Seguro obligatorio — plazo máximo 3 meses desde tu llegada.</strong>{" "}
            Si no lo contratas, el cantón te asigna uno automáticamente — suele ser más caro.
          </p>
        </div>
      </div>

      {/* ── PASOS ────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-0 overflow-x-auto">
          {[
            { n: "1", label: "Grupo de edad", done: !!grupoEdad },
            { n: "2", label: "Cantón y franquicia", done: !!grupoEdad },
            { n: "3", label: "Ver resultados", done: calculado },
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

          {/* Grupos de edad */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-xs mr-1.5" style={{ background: ACCENT }}>1</span>
              Tu grupo de edad
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {GRUPOS_EDAD.map((g) => (
                <button
                  key={g.slug}
                  onClick={() => { setGrupoEdad(g); setCalculado(false); }}
                  className={`flex flex-col items-center justify-center px-3 rounded-xl border text-sm font-medium transition-all text-center ${
                    grupoEdad?.slug === g.slug
                      ? "border-purple-600 bg-purple-50 text-purple-700 shadow-sm"
                      : "border-gray-200 bg-white text-gray-700 hover:border-purple-200 hover:bg-purple-50/30"
                  }`}
                  style={{ minHeight: "56px" }}
                >
                  <span className="text-lg mb-0.5">{GRUPO_EMOJIS[g.slug] ?? "👤"}</span>
                  <span className="text-xs leading-tight">{g.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            {/* Cantón */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-xs mr-1.5" style={{ background: ACCENT }}>2</span>
                Cantón de residencia
              </label>
              <div className="flex flex-wrap gap-1.5">
                {CIUDADES_SUIZA.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCanton(c); setCalculado(false); }}
                    className={`px-2.5 py-1 rounded-full border text-xs font-medium transition-all ${
                      canton === c
                        ? "text-white border-transparent"
                        : "border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-700 bg-white"
                    }`}
                    style={canton === c ? { background: ACCENT } : {}}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Franquicia */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-xs mr-1.5" style={{ background: ACCENT }}>3</span>
                Franquicia anual (deducible)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {FRANQUICIAS_OPCIONES.map((f) => {
                  const saving = grupoEdad ? ahorroMensual(f) : FRANQUICIA_AHORRO[f];
                  return (
                    <button
                      key={f}
                      onClick={() => { setFranquicia(f); setCalculado(false); }}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border font-bold transition-all ${
                        franquicia === f
                          ? "text-white border-transparent shadow-sm"
                          : "border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:text-purple-700"
                      }`}
                      style={franquicia === f ? { background: ACCENT } : {}}
                    >
                      <span className="text-sm">{f} CHF</span>
                      {saving && (
                        <span className={`text-[10px] font-semibold mt-0.5 leading-tight ${
                          franquicia === f ? "text-green-200" : "text-green-600"
                        }`}>
                          {saving}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {notaFranquicia && (
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <span className="text-purple-500">ℹ</span> {notaFranquicia}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={calcular}
            disabled={!grupoEdad}
            style={{ background: grupoEdad ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` : undefined }}
            className={`w-full font-bold py-3.5 rounded-xl text-base transition-all flex items-center justify-center gap-2 ${
              grupoEdad ? "text-white hover:opacity-95 shadow-md shadow-purple-200" : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {grupoEdad && !user ? (
              <>
                <span>🔒</span>
                <span>Regístrate gratis para calcular</span>
              </>
            ) : grupoEdad ? (
              <>
                <span>Calcular prima para {grupoEdad.label} en {canton}</span>
                <span className="text-lg">→</span>
              </>
            ) : (
              "Selecciona tu grupo de edad"
            )}
          </button>
        </div>

        {/* ── RESULTADOS ───────────────────────────────────────── */}
        {calculado && grupoEdad && (
          <div id="resultados-seguros" className="space-y-10 fade-in-up">

            {/* Resumen */}
            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
              <span className="text-2xl">🛡️</span>
              <div>
                <span className="font-bold text-gray-800">{grupoEdad.label}</span>
                <span className="text-gray-400 mx-2">·</span>
                <span className="text-gray-600">{canton}</span>
                <span className="text-gray-400 mx-2">·</span>
                <span className="text-gray-600">Franquicia {franquicia} CHF</span>
              </div>
              <button
                onClick={() => { setCalculado(false); setGrupoEdad(null); }}
                className="ml-auto text-xs text-gray-400 hover:text-purple-600 border border-gray-200 rounded-full px-3 py-1"
              >
                Nuevo cálculo
              </button>
            </div>

            {/* Prima estimada */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 rounded-full" style={{ background: ACCENT }} />
                <h2 className="text-lg font-bold text-gray-800">Prima mensual estimada</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Estándar */}
                <div className="bg-white rounded-2xl border-2 border-purple-200 shadow-sm overflow-hidden">
                  <div className="bg-purple-50 px-5 pt-5 pb-3 text-center">
                    <div className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-2">Modelo Estándar</div>
                    <div className="text-5xl font-black text-purple-700 leading-none">{fmt(primaEstimada)}</div>
                    <div className="text-xs text-gray-400 mt-1">por mes</div>
                  </div>
                  <div className="px-5 py-3 text-center">
                    <div className="text-xs text-gray-500">Libertad total de médico</div>
                  </div>
                </div>
                {/* HMO */}
                <div className="bg-white rounded-2xl border-2 border-green-200 shadow-sm overflow-hidden relative">
                  <div className="absolute -top-0 left-0 right-0 flex justify-center">
                    <span className="bg-green-600 text-white text-xs font-bold px-3 py-0.5 rounded-b-full">Recomendado</span>
                  </div>
                  <div className="bg-green-50 px-5 pt-7 pb-3 text-center">
                    <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">Modelo HMO</div>
                    <div className="text-5xl font-black text-green-700 leading-none">{fmt(primaHMO)}</div>
                    <div className="text-xs text-green-600 font-semibold mt-1">~20% menos</div>
                  </div>
                  <div className="px-5 py-3 text-center">
                    <div className="text-xs text-gray-500">Centro médico fijo asignado</div>
                  </div>
                </div>
                {/* Telmed */}
                <div className="bg-white rounded-2xl border-2 border-green-200 shadow-sm overflow-hidden relative">
                  <div className="absolute -top-0 left-0 right-0 flex justify-center">
                    <span className="bg-green-700 text-white text-xs font-bold px-3 py-0.5 rounded-b-full">Mayor ahorro</span>
                  </div>
                  <div className="bg-green-50 px-5 pt-7 pb-3 text-center">
                    <div className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">Modelo Telmed</div>
                    <div className="text-5xl font-black text-green-700 leading-none">{fmt(primaTelmed)}</div>
                    <div className="text-xs text-green-600 font-semibold mt-1">~25% menos</div>
                  </div>
                  <div className="px-5 py-3 text-center">
                    <div className="text-xs text-gray-500">Llamada previa obligatoria</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                * Estimación calculada según datos medios 2026 para {canton}. Usa{" "}
                <a href="https://www.priminfo.admin.ch/de/praemien" target="_blank" rel="noopener noreferrer" className="underline text-purple-600">
                  priminfo.admin.ch
                </a>{" "}
                para precios exactos por aseguradora.
              </p>
            </section>

            {/* Aseguradoras */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 rounded-full bg-green-500" />
                <h2 className="text-lg font-bold text-gray-800">Aseguradoras — de más barata a más cara</h2>
              </div>
              <p className="text-gray-500 text-sm mb-4 ml-4">
                El seguro básico es <strong>exactamente igual en todas</strong>. Solo cambia el precio y el servicio.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SEGUROS_ASEGURADORAS.map((a) => {
                  const esBarata = a.precio.includes("barata") || a.precio === "Barata";
                  return (
                    <a
                      key={a.nombre}
                      href={a.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-purple-200 transition-all flex items-center gap-3 group border-l-4"
                      style={{ borderLeftColor: esBarata ? "#16a34a" : ACCENT }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-800 group-hover:text-purple-700">{a.nombre}</div>
                        <div className="text-xs text-gray-500 mt-0.5 truncate">{a.nota}</div>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${
                        esBarata ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-600"
                      }`}>
                        {a.precio}
                      </span>
                    </a>
                  );
                })}
              </div>
            </section>

            {/* Modelos */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 rounded-full bg-amber-500" />
                <h2 className="text-lg font-bold text-gray-800">Modelos de acceso al médico</h2>
              </div>
              <p className="text-gray-500 text-sm mb-4 ml-4">Reducir el modelo puede ahorrarte hasta un 25% en la prima mensual.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SEGUROS_MODELOS.map((m) => (
                  <div
                    key={m.nombre}
                    className={`rounded-xl p-4 border ${m.recomendado ? "border-green-200 bg-green-50" : "bg-white border-gray-100"}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-800">{m.nombre}</h3>
                      {m.recomendado && (
                        <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">Recomendado</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{m.desc}</p>
                    <p className="text-green-700 text-sm font-semibold mt-1.5">{m.precio}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA oficial */}
            <div
              style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}
              className="text-white rounded-2xl p-6 text-center"
            >
              <h2 className="font-bold text-lg mb-1">Compara precios exactos — herramienta oficial del gobierno</h2>
              <p className="text-purple-100 text-sm mb-4">
                Gratuita · Sin registro · Todos los cantones y aseguradoras
              </p>
              <a
                href="https://www.priminfo.admin.ch/de/praemien"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white font-bold px-6 py-2.5 rounded-full hover:bg-purple-50 transition-colors text-sm"
                style={{ color: ACCENT }}
              >
                Abrir priminfo.admin.ch →
              </a>
            </div>

            {/* CTAs cruzados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/trabajo"
                className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-red-100 transition-all flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 bg-red-50">💼</div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 group-hover:text-red-700">Buscar trabajo</div>
                  <div className="text-sm text-gray-500">Portales, ETT y empleo público.</div>
                </div>
                <span className="text-gray-300 group-hover:text-red-400">→</span>
              </Link>
              <Link
                href="/vivienda"
                className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-blue-100 transition-all flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 bg-blue-50">🏠</div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 group-hover:text-blue-700">Buscar vivienda</div>
                  <div className="text-sm text-gray-500">Todos los portales inmobiliarios.</div>
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
