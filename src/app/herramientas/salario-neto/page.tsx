"use client";
import { useState } from "react";
import Link from "next/link";
import { SALARY_DATA, CANTONES as CANTONES_DATA } from "@/lib/data";

const CANTONES = CANTONES_DATA.map((c) => ({ slug: c.slug, nombre: c.nombre, tasa: c.tasa }));
const SECTORES = Object.entries(SALARY_DATA).map(([nombre, v]) => ({ nombre, icono: v.icono, min: v.min, max: v.max }));

// Formateadores sin Intl (evita hidratación)
const fmt = (n: number) =>
  `CHF ${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "'")}`;
const fmtH = (n: number) =>
  `CHF ${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, "'")}`;

// Semanas por mes exactas
const SEMANAS_MES = 52 / 12; // 4.333...

type Resultado = {
  bruto: number;
  avs: number;
  desempleo: number;
  accidente: number;
  bvg: number;
  impuesto: number;
  neto: number;
  netoPorHora: number;
  netoPorDia: number;
  horasMes: number;
  diasMes: number;
  tasaCanton: number;
};

export default function SalarioNetoPage() {
  const [modo, setModo]       = useState<"hora" | "mes">("hora");
  // inputs modo hora
  const [precioH, setPrecioH] = useState("");
  const [horasD, setHorasD]   = useState("8");
  const [diasS, setDiasS]     = useState("5");
  // input modo mes
  const [bruto, setBruto]     = useState("");
  // común
  const [canton, setCanton]   = useState(CANTONES[0].slug);
  const [resultado, setResultado] = useState<Resultado | null>(null);

  function calcular() {
    const cantonData = CANTONES.find((c) => c.slug === canton)!;
    let salarioBruto: number;
    let horasMes: number;
    let diasMes: number;

    if (modo === "hora") {
      const ph = parseFloat(precioH);
      const hd = parseFloat(horasD);
      const ds = parseFloat(diasS);
      if (!ph || ph <= 0 || !hd || hd <= 0 || !ds || ds <= 0) return;
      horasMes = hd * ds * SEMANAS_MES;
      diasMes  = ds * SEMANAS_MES;
      salarioBruto = ph * horasMes;
    } else {
      const b = parseFloat(bruto);
      if (!b || b <= 0) return;
      salarioBruto = b;
      const hd = 8;
      const ds = 5;
      horasMes = hd * ds * SEMANAS_MES;
      diasMes  = ds * SEMANAS_MES;
    }

    // ── Retenciones del empleado en Suiza ──────────────────────────────────
    // 1. AVS/AHV (pensión 1er pilar) + AI/IV (invalidez) + APG/EO = 5.30%
    const avs      = salarioBruto * 0.053;
    // 2. Seguro de desempleo ALV = 1.10%
    const desempleo = salarioBruto * 0.011;
    // 3. SUVA – accidentes no profesionales ≈ 1.0% (varía por empresa/sector)
    const accidente = salarioBruto * 0.010;
    // 4. BVG/LPP (pensión 2º pilar) ≈ 7% empleado (varía por edad y plan)
    const bvg       = salarioBruto * 0.070;
    // 5. Impuesto a la fuente – sobre base ya reducida por cotizaciones
    const baseImponible = salarioBruto - avs - desempleo - accidente - bvg;
    const impuesto      = baseImponible * cantonData.tasa;

    const neto = salarioBruto - avs - desempleo - accidente - bvg - impuesto;

    setResultado({
      bruto: salarioBruto,
      avs, desempleo, accidente, bvg, impuesto, neto,
      netoPorHora: neto / horasMes,
      netoPorDia:  neto / diasMes,
      horasMes, diasMes,
      tasaCanton: cantonData.tasa,
    });
  }

  function usarSalario(min: number, max: number) {
    const media = Math.round((min + max) / 2);
    if (modo === "hora") {
      // Convertir salario mensual medio → precio/hora (asumiendo 8h/día, 5 días)
      const precioHora = media / (8 * 5 * SEMANAS_MES);
      setPrecioH(precioHora.toFixed(2));
    } else {
      setBruto(String(media));
    }
    setResultado(null);
  }

  // Vista previa del bruto mensual en modo hora
  const brutoPrevio = modo === "hora" && precioH && horasD && diasS
    ? parseFloat(precioH) * parseFloat(horasD) * parseFloat(diasS) * SEMANAS_MES
    : null;

  const totalDescuentos = resultado
    ? resultado.avs + resultado.desempleo + resultado.accidente + resultado.bvg + resultado.impuesto
    : 0;
  const pctDescuento = resultado ? (totalDescuentos / resultado.bruto) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        <span>›</span>
        <Link href="/herramientas" className="hover:text-red-700">Herramientas</Link>
        <span>›</span>
        <span className="text-gray-600">Calculadora salario neto</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">Calculadora de salario neto suizo</h1>
      <p className="text-gray-500 mb-8 text-sm max-w-2xl">
        Introduce tu precio por hora y horas trabajadas. La calculadora descuenta AVS, desempleo,
        accidentes, BVG (2º pilar) e impuesto a la fuente para darte el sueldo neto mensual real.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Calculadora ─────────────────────────────────────────────────── */}
        <div className="flex-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-4 shadow-sm">

            {/* Toggle modo */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
              {(["hora", "mes"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setModo(m); setResultado(null); }}
                  className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={modo === m
                    ? { background: "#C0392B", color: "#fff" }
                    : { background: "transparent", color: "#6B7280" }}
                >
                  {m === "hora" ? "⏱ Por hora" : "📅 Por mes"}
                </button>
              ))}
            </div>

            {modo === "hora" ? (
              <>
                {/* ── Inputs modo hora ─────────────────────────── */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Precio por hora (CHF/h)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">CHF</span>
                    <input
                      type="number"
                      value={precioH}
                      onChange={(e) => { setPrecioH(e.target.value); setResultado(null); }}
                      placeholder="Ej: 25.00"
                      step="0.50"
                      className="w-full border border-gray-200 rounded-xl pl-14 pr-4 py-3 text-gray-800 focus:outline-none focus:border-red-400 text-lg"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">/hora</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Horas por día
                    </label>
                    <select
                      value={horasD}
                      onChange={(e) => { setHorasD(e.target.value); setResultado(null); }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-red-400 bg-white"
                    >
                      {[4, 5, 6, 7, 8, 8.5, 9, 10, 12].map((h) => (
                        <option key={h} value={h}>{h}h / día</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Días por semana
                    </label>
                    <select
                      value={diasS}
                      onChange={(e) => { setDiasS(e.target.value); setResultado(null); }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-red-400 bg-white"
                    >
                      {[3, 4, 5, 6].map((d) => (
                        <option key={d} value={d}>{d} días / semana</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Vista previa bruto */}
                {brutoPrevio !== null && !isNaN(brutoPrevio) && brutoPrevio > 0 && (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 mb-4 flex items-center justify-between">
                    <span className="text-sm text-blue-700">Salario bruto mensual estimado</span>
                    <span className="font-bold text-blue-800">{fmt(brutoPrevio)}</span>
                  </div>
                )}
              </>
            ) : (
              /* ── Input modo mes ───────────────────────────── */
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Salario bruto mensual (CHF)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">CHF</span>
                  <input
                    type="number"
                    value={bruto}
                    onChange={(e) => { setBruto(e.target.value); setResultado(null); }}
                    placeholder="Ej: 5000"
                    className="w-full border border-gray-200 rounded-xl pl-14 pr-4 py-3 text-gray-800 focus:outline-none focus:border-red-400 text-lg"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">/mes</span>
                </div>
              </div>
            )}

            {/* Cantón */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Cantón de residencia
              </label>
              <select
                value={canton}
                onChange={(e) => { setCanton(e.target.value); setResultado(null); }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-red-400 bg-white"
              >
                {CANTONES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.nombre}</option>
                ))}
              </select>
            </div>

            <button
              onClick={calcular}
              style={{ background: "#C0392B" }}
              className="w-full text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity text-base"
            >
              Calcular salario neto →
            </button>
          </div>

          {/* ── Resultado ──────────────────────────────────────────────────── */}
          {resultado && (
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">

              {/* Cabecera — neto mensual */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-5 text-white">
                <p className="text-green-100 text-sm mb-1">Salario neto mensual estimado</p>
                <p className="text-4xl font-extrabold tracking-tight">{fmt(resultado.neto)}</p>
                <p className="text-green-200 text-xs mt-1">
                  Se descuenta el {pctDescuento.toFixed(1)}% del bruto ({fmt(totalDescuentos)} en total)
                </p>
              </div>

              {/* Neto por hora / día */}
              <div className="grid grid-cols-2 border-b border-gray-100">
                <div className="px-5 py-4 border-r border-gray-100">
                  <p className="text-xs text-gray-500 mb-0.5">Neto por hora</p>
                  <p className="text-xl font-bold text-gray-800">{fmtH(resultado.netoPorHora)}</p>
                  <p className="text-[10px] text-gray-400">{Math.round(resultado.horasMes)} h/mes</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs text-gray-500 mb-0.5">Neto por día</p>
                  <p className="text-xl font-bold text-gray-800">{fmtH(resultado.netoPorDia)}</p>
                  <p className="text-[10px] text-gray-400">{Math.round(resultado.diasMes)} días/mes</p>
                </div>
              </div>

              {/* Desglose detallado */}
              <div className="px-6 py-4 space-y-2.5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Desglose de retenciones</p>

                {/* Bruto */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 font-semibold">Salario bruto</span>
                  <span className="text-sm font-bold text-gray-800">{fmt(resultado.bruto)}</span>
                </div>

                {/* Línea separadora */}
                <div className="border-t border-dashed border-gray-200 my-1" />

                {[
                  {
                    label: "AVS / AI / APG",
                    pct: "5.30%",
                    valor: resultado.avs,
                    desc: "Pensión 1er pilar + invalidez + reemplazo ingresos",
                  },
                  {
                    label: "Seguro de desempleo",
                    pct: "1.10%",
                    valor: resultado.desempleo,
                    desc: "ALV — obligatorio desde CHF 500/mes",
                  },
                  {
                    label: "Accidentes no profesionales",
                    pct: "≈1.0%",
                    valor: resultado.accidente,
                    desc: "SUVA — varía por empresa y sector",
                  },
                  {
                    label: "BVG / LPP (2º pilar)",
                    pct: "≈7.0%",
                    valor: resultado.bvg,
                    desc: "Pensión empresa — varía con la edad y el plan",
                  },
                  {
                    label: `Impuesto a la fuente (${(resultado.tasaCanton * 100).toFixed(1)}%)`,
                    pct: `${(resultado.tasaCanton * 100).toFixed(1)}%`,
                    valor: resultado.impuesto,
                    desc: "Estimado según cantón — sobre base reducida por cotizaciones",
                  },
                ].map((r) => (
                  <div key={r.label} className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-red-500 font-bold text-xs flex-shrink-0">−</span>
                        <span className="text-sm text-gray-700">{r.label}</span>
                        <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0">{r.pct}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 ml-4 mt-0.5 leading-tight">{r.desc}</p>
                    </div>
                    <span className="text-sm font-semibold text-red-600 flex-shrink-0">{fmt(r.valor)}</span>
                  </div>
                ))}

                {/* Total descuentos */}
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total descuentos</span>
                  <span className="text-sm font-bold text-red-600">{fmt(totalDescuentos)}</span>
                </div>

                {/* Neto final */}
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex justify-between items-center">
                  <span className="font-bold text-gray-800">Salario neto mensual</span>
                  <span className="font-extrabold text-2xl text-green-700">{fmt(resultado.neto)}</span>
                </div>
              </div>

              <div className="px-6 pb-4">
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  * Cálculo orientativo. El BVG varía según edad, plan de empresa y coordinación.
                  El impuesto a la fuente depende de estado civil, hijos y otros ingresos.
                  No incluye impuesto eclesiástico ni complementos salariales (13º paga, vacaciones).
                </p>
              </div>
            </div>
          )}

          {/* Tip cantones */}
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            💡 <strong>Tip:</strong> Los impuestos varían hasta un 15% entre cantones.
            Zug y Schwyz son los más ventajosos; Ginebra y Vaud los más elevados para sueldos medios.
          </div>

          {/* Herramientas relacionadas */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Herramientas relacionadas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/herramientas/impuesto-fuente"
                className="bg-white border border-gray-100 rounded-xl p-4 hover:border-red-200 hover:shadow-sm transition-all flex items-center gap-3"
              >
                <span className="text-2xl">💸</span>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">Calculadora Quellensteuer</div>
                  <div className="text-xs text-gray-500">Impuesto a la fuente por cantón</div>
                </div>
              </Link>
              <Link
                href="/herramientas/comparador-ciudades"
                className="bg-white border border-gray-100 rounded-xl p-4 hover:border-red-200 hover:shadow-sm transition-all flex items-center gap-3"
              >
                <span className="text-2xl">🏙️</span>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">Comparador de ciudades</div>
                  <div className="text-xs text-gray-500">Coste de vida y calidad por ciudad</div>
                </div>
              </Link>
              <Link
                href="/herramientas/traductor-cv"
                className="bg-white border border-gray-100 rounded-xl p-4 hover:border-red-200 hover:shadow-sm transition-all flex items-center gap-3"
              >
                <span className="text-2xl">📄</span>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">Traductor de CV al alemán</div>
                  <div className="text-xs text-gray-500">Lebenslauf formato suizo</div>
                </div>
              </Link>
              <Link
                href="/trabajo"
                className="bg-white border border-gray-100 rounded-xl p-4 hover:border-red-200 hover:shadow-sm transition-all flex items-center gap-3"
              >
                <span className="text-2xl">💼</span>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">Buscador de trabajo</div>
                  <div className="text-xs text-gray-500">Ofertas de empleo en Suiza</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Salarios de referencia ─────────────────────────────────────── */}
        <div className="w-full lg:w-72">
          <h2 className="font-bold text-gray-800 mb-3 text-sm">Salarios de referencia por sector</h2>
          <p className="text-xs text-gray-400 mb-3">
            Clic para usar el salario medio del sector.
          </p>
          <div className="flex flex-col gap-2">
            {SECTORES.map((s) => (
              <button
                key={s.nombre}
                onClick={() => usarSalario(s.min, s.max)}
                className="bg-white border border-gray-100 rounded-xl px-3 py-2.5 hover:border-red-200 hover:shadow-sm transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{s.icono}</span>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-red-700">{s.nombre}</span>
                  </div>
                  <span className="text-xs text-green-700 font-semibold whitespace-nowrap">
                    {fmt(s.min)}–{fmt(s.max)}
                  </span>
                </div>
              </button>
            ))}
            <p className="text-xs text-gray-400 mt-1">Fuente: ICT-Berufsbildung / jobs.ch (2024–2026)</p>
          </div>

          {/* Equivalencia horas ↔ mes */}
          <div className="mt-6 bg-gray-50 border border-gray-100 rounded-xl p-4">
            <p className="text-xs font-bold text-gray-600 mb-3">Equivalencias rápidas CHF/hora</p>
            <div className="space-y-1.5">
              {[
                { h: 18, label: "Peón / Ayudante" },
                { h: 22, label: "Oficial (construcción)" },
                { h: 25, label: "Cocinero" },
                { h: 28, label: "Electricista" },
                { h: 35, label: "Técnico / Enfermero" },
                { h: 45, label: "IT / Informática" },
              ].map((r) => {
                const mensual = r.h * 8 * 5 * SEMANAS_MES;
                return (
                  <div key={r.h} className="flex justify-between text-xs">
                    <span className="text-gray-600">{r.label}</span>
                    <span className="text-gray-500">
                      <span className="font-semibold text-gray-700">{r.h} CHF/h</span>
                      <span className="text-gray-400 ml-1">≈ {fmt(mensual)}/mes</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
