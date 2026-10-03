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

export default function BuscadorTrabajoPage() {
  const [categoria, setCategoria] = useState<JobCategory | null>(null);
  const [ciudad, setCiudad] = useState("Zürich");
  const [buscado, setBuscado] = useState(false);

  function buscar() {
    if (!categoria) return;
    setBuscado(true);
  }

  const termPrincipal = categoria?.terms[0] ?? "";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        <span>›</span>
        <Link href="/categorias/trabajo" className="hover:text-red-700">Trabajo</Link>
        <span>›</span>
        <span className="text-gray-600">Buscador</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">Buscador de trabajo en Suiza</h1>
      <p className="text-gray-500 mb-8 text-sm">
        Selecciona tu sector y ciudad — te mostramos todos los portales, agencias ETT y empleo público con tu búsqueda ya aplicada.
      </p>

      {/* FORMULARIO */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ciudad o cantón</label>
            <select
              value={ciudad}
              onChange={(e) => { setCiudad(e.target.value); setBuscado(false); }}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-red-400 bg-white"
            >
              {CIUDADES_SUIZA.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Categorías como grid */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Sector de trabajo</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {JOB_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => { setCategoria(cat); setBuscado(false); }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left ${
                  categoria?.slug === cat.slug
                    ? "border-red-600 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:text-red-700"
                }`}
              >
                <span className="text-lg flex-shrink-0">{cat.icono}</span>
                <span className="leading-tight">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Info del sector seleccionado */}
        {categoria && (
          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm text-gray-600 leading-relaxed">{categoria.description}</p>
              <div className="text-right flex-shrink-0">
                <div className="text-xs text-gray-400">Salario ref.</div>
                <div className="font-bold text-green-700 text-sm whitespace-nowrap">
                  {fmt(categoria.salarioMin)} – {fmt(categoria.salarioMax)}/mes
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {categoria.terms.slice(0, 6).map((t) => (
                <span key={t} className="text-xs bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={buscar}
          disabled={!categoria}
          style={{ background: categoria ? "#C0392B" : undefined }}
          className={`w-full font-bold py-3 rounded-xl text-base transition-opacity ${
            categoria ? "text-white hover:opacity-90" : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {categoria ? `Buscar trabajo de ${categoria.label} en ${ciudad}` : "Selecciona un sector para buscar"}
        </button>
      </div>

      {/* RESULTADOS */}
      {buscado && categoria && (
        <div className="space-y-8">

          {/* Portales principales */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-1">🔍 Portales de empleo</h2>
            <p className="text-gray-500 text-sm mb-4">Haz clic para ver ofertas en cada portal con tu búsqueda ya aplicada.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PORTALES_EMPLEO_BUSQUEDA.map((p) => (
                <a
                  key={p.nombre}
                  href={buildUrl(p.url, termPrincipal, ciudad)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm hover:border-red-200 transition-all flex items-center gap-3 group"
                >
                  <span className="text-2xl">{p.logo}</span>
                  <div>
                    <div className="font-semibold text-gray-800 group-hover:text-red-700">{p.nombre}</div>
                    <div className="text-xs text-gray-400">
                      {p.tipo === "oficial" ? "Portal oficial" : p.tipo === "empresas" ? "Directorio empresas" : "Portal general"}
                    </div>
                  </div>
                  <span className="ml-auto text-gray-300 group-hover:text-red-400 text-lg">→</span>
                </a>
              ))}
            </div>
          </section>

          {/* Agencias ETT */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-1">🏢 Agencias de trabajo temporal (ETT)</h2>
            <p className="text-gray-500 text-sm mb-4">
              Las ETT contratan miles de trabajadores en Suiza. <strong>Regístrate en varias a la vez</strong> — consigues trabajo más rápido.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AGENCIAS_ETT.map((a) => (
                <a
                  key={a.nombre}
                  href={buildUrl(a.url, termPrincipal, ciudad)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm hover:border-red-200 transition-all flex items-center gap-3 group"
                >
                  <span className="text-xl">{a.logo}</span>
                  <span className="font-semibold text-gray-800 group-hover:text-red-700 text-sm">{a.nombre}</span>
                  <span className="ml-auto text-gray-300 group-hover:text-red-400">→</span>
                </a>
              ))}
            </div>
          </section>

          {/* Empleo público */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-1">🏛️ Empleo público — Estado y administración</h2>
            <p className="text-gray-500 text-sm mb-4">
              El sector público suizo ofrece contratos estables, buen salario y excelentes condiciones laborales.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PORTALES_PUBLICOS.map((p) => (
                <a
                  key={p.nombre}
                  href={buildUrl(p.url, termPrincipal, ciudad)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm hover:border-blue-200 transition-all group"
                >
                  <div className="font-semibold text-gray-800 group-hover:text-blue-700 mb-0.5">{p.nombre}</div>
                  <div className="text-xs text-gray-400">{p.desc}</div>
                  <span className="text-sm text-blue-600 group-hover:underline mt-2 inline-block">Ver ofertas →</span>
                </a>
              ))}
            </div>
          </section>

          {/* Tips del sector */}
          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h2 className="font-bold text-gray-800 mb-3">💡 Consejos para {categoria.label} en Suiza</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>LinkedIn es imprescindible</strong> — muchos reclutadores suizos buscan activamente perfiles.</li>
              <li>• <strong>Regístrate en varias ETT a la vez</strong> — cada agencia tiene acuerdos con empresas distintas.</li>
              <li>• <strong>CV en formato europeo</strong> — máximo 2 páginas, foto opcional, sin datos personales innecesarios.</li>
              <li>• <strong>Respuesta rápida</strong> — los procesos suelen cerrarse en 2-4 semanas. Contesta siempre en 24h.</li>
              <li>• <strong>Salario referencia en {categoria.label}:</strong> {fmt(categoria.salarioMin)} – {fmt(categoria.salarioMax)} CHF/mes bruto.</li>
            </ul>
          </section>

          {/* CTA calculadora */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <div className="font-bold text-gray-800">¿Cuánto cobrarás en neto?</div>
              <div className="text-sm text-gray-500">Calcula tu salario real después de impuestos y deducciones.</div>
            </div>
            <Link
              href="/herramientas/salario-neto"
              style={{ background: "#C0392B" }}
              className="text-white font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity text-sm whitespace-nowrap"
            >
              Calcular salario →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
