"use client";
import { useState } from "react";
import Link from "next/link";
import {
  JOB_CATEGORIES, CIUDADES_SUIZA,
  PORTALES_EMPLEO_BUSQUEDA, AGENCIAS_ETT, PORTALES_PUBLICOS,
  buildUrl, type JobCategory,
} from "@/lib/buscador";

const fmt = (n: number) =>
  new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(n);

type TipoContrato = "todos" | "fijo" | "temporal" | "freelance";
type NivelExperiencia = "todos" | "junior" | "mid" | "senior";
type Modalidad = "todos" | "presencial" | "remoto" | "hibrido";

export default function BuscadorTrabajoPage() {
  const [categoria, setCategoria] = useState<JobCategory | null>(null);
  const [ciudad, setCiudad] = useState("Zürich");
  const [buscado, setBuscado] = useState(false);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [mostrarFiltrosAvanzados, setMostrarFiltrosAvanzados] = useState(false);

  // Filtros avanzados
  const [salarioMin, setSalarioMin] = useState<number | null>(null);
  const [tipoContrato, setTipoContrato] = useState<TipoContrato>("todos");
  const [nivelExp, setNivelExp] = useState<NivelExperiencia>("todos");
  const [modalidad, setModalidad] = useState<Modalidad>("todos");
  const [idiomaAleman, setIdiomaAleman] = useState(false);
  const [idiomaIngles, setIdiomaIngles] = useState(false);

  function buscar() {
    if (!categoria) return;
    setBuscado(true);
  }

  const termPrincipal = categoria?.terms[0] ?? "";

  // Opciones de salario mínimo basadas en la categoría
  const salarioOpciones = categoria ? [
    null,
    Math.floor(categoria.salarioMin * 0.8 / 100) * 100,
    categoria.salarioMin,
    Math.floor((categoria.salarioMin + categoria.salarioMax) / 2 / 100) * 100,
    categoria.salarioMax,
  ] : [];

  const toggleFavorito = (url: string) => {
    setFavoritos(prev =>
      prev.includes(url)
        ? prev.filter(f => f !== url)
        : [...prev, url]
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        <span>›</span>
        <Link href="/trabajo" className="hover:text-red-700">Trabajo</Link>
        <span>›</span>
        <span className="text-gray-600">Buscador</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Buscador de trabajo en Suiza</h1>
        <p className="text-gray-500 text-sm">
          Selecciona tu sector y ciudad — te mostramos todos los portales, agencias ETT y empleo público con tu búsqueda ya aplicada + filtros avanzados.
        </p>
        <div className="flex gap-5 mt-4 text-center">
          {[{ n: "11", l: "sectores" }, { n: "20+", l: "portales" }, { n: "15+", l: "ETTs" }].map((s) => (
            <div key={s.l}>
              <div className="text-xl font-bold text-gray-900">{s.n}</div>
              <div className="text-xs text-gray-500">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FORMULARIO */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">

        {/* Ciudad */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-xs mr-1.5">1</span>
            Ciudad o cantón
          </label>
          <select
            value={ciudad}
            onChange={(e) => { setCiudad(e.target.value); setBuscado(false); }}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-red-400 bg-white"
          >
            {CIUDADES_SUIZA.slice(0, 25).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Categorías como grid mejorado */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-xs mr-1.5">2</span>
            Sector de trabajo
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {JOB_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => { setCategoria(cat); setBuscado(false); }}
                className={`flex flex-col items-center gap-2 px-3 py-3 rounded-xl border text-sm font-medium transition-all ${
                  categoria?.slug === cat.slug
                    ? "border-red-600 bg-red-50 text-red-700 shadow-sm"
                    : "border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:text-red-700 hover:bg-red-50/30"
                }`}
              >
                <span className="text-2xl">{cat.icono}</span>
                <span className="leading-tight text-center text-xs">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Info del sector seleccionado */}
        {categoria && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-3 flex-1">
                <span className="text-2xl flex-shrink-0">{categoria.icono}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{categoria.label}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{categoria.description}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs text-gray-500 mb-1">Salario referencia</div>
                <div className="font-bold text-green-700 text-sm whitespace-nowrap">
                  {fmt(categoria.salarioMin)} – {fmt(categoria.salarioMax)}
                </div>
                <div className="text-xs text-gray-400 mt-1">/mes bruto</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categoria.terms.slice(0, 8).map((t) => (
                <span key={t} className="text-xs bg-white border border-red-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* Filtros avanzados (plegable) */}
        <div className="mb-5">
          <button
            onClick={() => setMostrarFiltrosAvanzados(!mostrarFiltrosAvanzados)}
            className="flex items-center gap-2 text-sm font-semibold text-red-700 hover:text-red-800 mb-3"
          >
            <span>{mostrarFiltrosAvanzados ? "▼" : "▶"}</span>
            <span>Filtros avanzados</span>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Nuevo</span>
          </button>

          {mostrarFiltrosAvanzados && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Salario mínimo */}
                {categoria && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">💰 Salario mínimo</label>
                    <div className="flex flex-wrap gap-2">
                      {salarioOpciones.map((sal) => (
                        <button
                          key={sal ?? "todos"}
                          onClick={() => { setSalarioMin(sal); setBuscado(false); }}
                          className={`text-xs px-3 py-2 rounded-lg border font-medium transition-all ${
                            salarioMin === sal
                              ? "border-red-600 bg-red-600 text-white"
                              : "border-gray-200 text-gray-600 bg-white hover:border-red-300"
                          }`}
                        >
                          {sal ? `${fmt(sal)}+` : "Todos"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tipo de contrato */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">📋 Tipo de contrato</label>
                  <div className="flex flex-wrap gap-2">
                    {(["todos", "fijo", "temporal", "freelance"] as TipoContrato[]).map((tipo) => (
                      <button
                        key={tipo}
                        onClick={() => { setTipoContrato(tipo); setBuscado(false); }}
                        className={`flex-1 min-w-[70px] text-xs px-3 py-2 rounded-lg border font-medium transition-all ${
                          tipoContrato === tipo
                            ? "border-red-600 bg-red-600 text-white"
                            : "border-gray-200 text-gray-600 bg-white hover:border-red-300"
                        }`}
                      >
                        {tipo === "todos" ? "Todos" : tipo === "fijo" ? "Fijo" : tipo === "temporal" ? "Temporal" : "Freelance"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nivel de experiencia */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">📊 Experiencia</label>
                  <div className="flex gap-2">
                    {(["todos", "junior", "mid", "senior"] as NivelExperiencia[]).map((nivel) => (
                      <button
                        key={nivel}
                        onClick={() => { setNivelExp(nivel); setBuscado(false); }}
                        className={`flex-1 text-xs px-3 py-2 rounded-lg border font-medium transition-all ${
                          nivelExp === nivel
                            ? "border-red-600 bg-red-600 text-white"
                            : "border-gray-200 text-gray-600 bg-white hover:border-red-300"
                        }`}
                      >
                        {nivel === "todos" ? "Todos" : nivel === "junior" ? "Junior" : nivel === "mid" ? "Mid" : "Senior"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Modalidad */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">🏢 Modalidad</label>
                  <div className="flex gap-2">
                    {(["todos", "presencial", "remoto", "hibrido"] as Modalidad[]).map((mod) => (
                      <button
                        key={mod}
                        onClick={() => { setModalidad(mod); setBuscado(false); }}
                        className={`flex-1 text-xs px-3 py-2 rounded-lg border font-medium transition-all ${
                          modalidad === mod
                            ? "border-red-600 bg-red-600 text-white"
                            : "border-gray-200 text-gray-600 bg-white hover:border-red-300"
                        }`}
                      >
                        {mod === "todos" ? "Todos" : mod === "presencial" ? "Oficina" : mod === "remoto" ? "Remoto" : "Híbrido"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Idiomas requeridos */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">🗣️ Idiomas</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setIdiomaAleman(!idiomaAleman); setBuscado(false); }}
                    className={`flex-1 text-xs px-3 py-2 rounded-lg border font-medium transition-all ${
                      idiomaAleman
                        ? "border-red-600 bg-red-600 text-white"
                        : "border-gray-200 text-gray-600 bg-white hover:border-red-300"
                    }`}
                  >
                    🇩🇪 Alemán
                  </button>
                  <button
                    onClick={() => { setIdiomaIngles(!idiomaIngles); setBuscado(false); }}
                    className={`flex-1 text-xs px-3 py-2 rounded-lg border font-medium transition-all ${
                      idiomaIngles
                        ? "border-red-600 bg-red-600 text-white"
                        : "border-gray-200 text-gray-600 bg-white hover:border-red-300"
                    }`}
                  >
                    🇬🇧 Inglés
                  </button>
                </div>
              </div>

              {/* Resumen de filtros activos */}
              {(salarioMin || tipoContrato !== "todos" || nivelExp !== "todos" || modalidad !== "todos" || idiomaAleman || idiomaIngles) && (
                <div className="flex flex-wrap items-center gap-2 text-xs text-red-700 pt-2 border-t border-gray-200">
                  <span className="font-semibold">Filtros activos:</span>
                  {salarioMin && <span className="bg-red-100 px-2 py-1 rounded-full">Salario {fmt(salarioMin)}+</span>}
                  {tipoContrato !== "todos" && <span className="bg-red-100 px-2 py-1 rounded-full">Contrato: {tipoContrato}</span>}
                  {nivelExp !== "todos" && <span className="bg-red-100 px-2 py-1 rounded-full">{nivelExp}</span>}
                  {modalidad !== "todos" && <span className="bg-red-100 px-2 py-1 rounded-full">{modalidad}</span>}
                  {idiomaAleman && <span className="bg-red-100 px-2 py-1 rounded-full">🇩🇪 Alemán</span>}
                  {idiomaIngles && <span className="bg-red-100 px-2 py-1 rounded-full">🇬🇧 Inglés</span>}
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={buscar}
          disabled={!categoria}
          style={{ background: categoria ? "#C0392B" : undefined }}
          className={`w-full font-bold py-3.5 rounded-xl text-base transition-all flex items-center justify-center gap-2 ${
            categoria ? "text-white hover:opacity-90 shadow-md shadow-red-200" : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {categoria ? (
            <>
              <span>Buscar trabajo de {categoria.label} en {ciudad}</span>
              <span className="text-lg">→</span>
            </>
          ) : (
            "Selecciona un sector para buscar"
          )}
        </button>
      </div>

      {/* RESULTADOS */}
      {buscado && categoria && (
        <div className="space-y-8">

          {/* Barra resumen */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{categoria.icono}</span>
              <div>
                <span className="font-bold text-gray-800">{categoria.label}</span>
                <span className="text-gray-400 mx-2">·</span>
                <span className="text-gray-600">{ciudad}</span>
                {favoritos.length > 0 && (
                  <>
                    <span className="text-gray-400 mx-2">·</span>
                    <span className="text-blue-700 font-semibold text-sm">❤️ {favoritos.length} favoritos</span>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={() => { setBuscado(false); setCategoria(null); }}
              className="text-xs text-gray-400 hover:text-red-600 border border-gray-200 rounded-full px-3 py-1 flex-shrink-0"
            >
              Nueva búsqueda
            </button>
          </div>

          {/* Info sobre filtros aplicados */}
          {(salarioMin || tipoContrato !== "todos" || modalidad !== "todos") && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">💡</span>
                <div className="text-sm text-blue-800">
                  <strong>Consejo:</strong> Los portales de abajo se abrirán con tu búsqueda de <strong>{categoria.label}</strong> en <strong>{ciudad}</strong>.
                  Usa sus filtros internos para aplicar salario mínimo, tipo de contrato y modalidad de trabajo específicos.
                </div>
              </div>
            </div>
          )}

          {/* Portales principales */}
          <section>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 rounded-full bg-red-600" />
              <h2 className="text-lg font-bold text-gray-800">🔍 Portales de empleo</h2>
            </div>
            <p className="text-gray-500 text-sm mb-4 ml-4">Haz clic para ver ofertas en cada portal con tu búsqueda ya aplicada.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PORTALES_EMPLEO_BUSQUEDA.map((p) => {
                const url = buildUrl(p.url, termPrincipal, ciudad);
                return (
                  <div key={p.nombre} className="relative">
                    <button
                      onClick={() => toggleFavorito(url)}
                      className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        favoritos.includes(url)
                          ? "bg-red-500 text-white shadow-md"
                          : "bg-white/90 text-gray-400 hover:bg-white hover:text-red-500 border border-gray-200"
                      }`}
                    >
                      {favoritos.includes(url) ? "❤️" : "🤍"}
                    </button>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-red-200 transition-all flex items-center gap-3 group"
                    >
                      <span className="text-2xl">{p.logo}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 group-hover:text-red-700">{p.nombre}</div>
                        <div className="text-xs text-gray-400">
                          {p.tipo === "oficial" ? "Portal oficial" : p.tipo === "empresas" ? "Directorio empresas" : "Portal general"}
                        </div>
                      </div>
                      <span className="ml-auto text-gray-500 group-hover:text-red-400 text-lg">→</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Agencias ETT */}
          <section>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 rounded-full bg-orange-500" />
              <h2 className="text-lg font-bold text-gray-800">🏢 Agencias de trabajo temporal (ETT)</h2>
            </div>
            <p className="text-gray-500 text-sm mb-4 ml-4">
              Las ETT contratan miles de trabajadores en Suiza. <strong>Regístrate en varias a la vez</strong> — consigues trabajo más rápido.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {AGENCIAS_ETT.map((a) => {
                const url = buildUrl(a.url, termPrincipal, ciudad);
                return (
                  <div key={a.nombre} className="relative">
                    <button
                      onClick={() => toggleFavorito(url)}
                      className={`absolute top-1 right-1 z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all text-xs ${
                        favoritos.includes(url)
                          ? "bg-red-500 text-white shadow-md"
                          : "bg-white/90 text-gray-400 hover:bg-white hover:text-red-500 border border-gray-200"
                      }`}
                    >
                      {favoritos.includes(url) ? "❤️" : "🤍"}
                    </button>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-gray-100 rounded-xl p-3 hover:shadow-sm hover:border-red-200 transition-all flex items-center gap-2 group"
                    >
                      <span className="text-lg">{a.logo}</span>
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-gray-800 group-hover:text-red-700 text-sm block truncate">{a.nombre}</span>
                      </div>
                      <span className="text-gray-500 group-hover:text-red-400 text-sm flex-shrink-0">→</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Empleo público */}
          <section>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 rounded-full bg-blue-600" />
              <h2 className="text-lg font-bold text-gray-800">🏛️ Empleo público — Estado y administración</h2>
            </div>
            <p className="text-gray-500 text-sm mb-4 ml-4">
              El sector público suizo ofrece contratos estables, buen salario y excelentes condiciones laborales.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PORTALES_PUBLICOS.map((p) => {
                const url = buildUrl(p.url, termPrincipal, ciudad);
                return (
                  <div key={p.nombre} className="relative">
                    <button
                      onClick={() => toggleFavorito(url)}
                      className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        favoritos.includes(url)
                          ? "bg-red-500 text-white shadow-md"
                          : "bg-white/90 text-gray-400 hover:bg-white hover:text-red-500 border border-gray-200"
                      }`}
                    >
                      {favoritos.includes(url) ? "❤️" : "🤍"}
                    </button>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm hover:border-blue-200 transition-all group"
                    >
                      <div className="font-semibold text-gray-800 group-hover:text-blue-700 mb-0.5">{p.nombre}</div>
                      <div className="text-xs text-gray-400 mb-2">{p.desc}</div>
                      <span className="text-sm text-blue-600 group-hover:underline inline-block">Ver ofertas →</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Tips del sector */}
          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>💡</span>
              <span>Consejos para {categoria.label} en Suiza</span>
            </h2>
            <ul className="space-y-2.5 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span><strong>LinkedIn es imprescindible</strong> — muchos reclutadores suizos buscan activamente perfiles. Actualiza tu perfil en inglés y alemán.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span><strong>Regístrate en varias ETT a la vez</strong> — cada agencia tiene acuerdos con empresas distintas. Más registros = más oportunidades.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span><strong>CV en formato europeo</strong> — máximo 2 páginas, foto opcional, sin datos personales innecesarios (edad, estado civil).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span><strong>Respuesta rápida</strong> — los procesos suelen cerrarse en 2-4 semanas. Contesta siempre en menos de 24h.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span><strong>Salario referencia en {categoria.label}:</strong> {fmt(categoria.salarioMin)} – {fmt(categoria.salarioMax)} CHF/mes bruto (según experiencia).</span>
              </li>
              {salarioMin && (
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0">💰</span>
                  <span><strong>Filtro aplicado:</strong> Buscar ofertas con salario mínimo de {fmt(salarioMin)}/mes. Recuerda negociar según tu experiencia.</span>
                </li>
              )}
            </ul>
          </section>

          {/* CTA calculadora */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/herramientas/salario-neto"
              className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between gap-4 hover:shadow-md hover:border-green-200 transition-all group"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 bg-green-50">💰</div>
                <div>
                  <div className="font-bold text-gray-800 group-hover:text-green-700">¿Cuánto cobrarás en neto?</div>
                  <div className="text-sm text-gray-500">Calcula tu salario real después de impuestos</div>
                </div>
              </div>
              <span className="text-gray-500 group-hover:text-green-500">→</span>
            </Link>

            <Link
              href="/vivienda"
              className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between gap-4 hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 bg-blue-50">🏠</div>
                <div>
                  <div className="font-bold text-gray-800 group-hover:text-blue-700">Buscar vivienda</div>
                  <div className="text-sm text-gray-500">Encuentra piso en {ciudad}</div>
                </div>
              </div>
              <span className="text-gray-500 group-hover:text-blue-500">→</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
