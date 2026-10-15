"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const CANTONES = [
  { code: "ZH", name: "Zúrich", tasa: 0.118 },
  { code: "GE", name: "Ginebra", tasa: 0.132 },
  { code: "BE", name: "Berna", tasa: 0.124 },
  { code: "BS", name: "Basilea-Ciudad", tasa: 0.115 },
  { code: "VD", name: "Vaud (Lausana)", tasa: 0.128 },
  { code: "ZG", name: "Zug", tasa: 0.115 },
  { code: "AG", name: "Argovia", tasa: 0.112 },
  { code: "LU", name: "Lucerna", tasa: 0.124 },
  { code: "TI", name: "Tesino", tasa: 0.121 },
  { code: "SG", name: "San Galo", tasa: 0.116 },
];

const ESTADOS_CIVILES = [
  {
    code: "soltero",
    label: "Soltero/a",
    multiplier: 1.0,
    desc: "Sin pareja a cargo",
  },
  {
    code: "casado_unico",
    label: "Casado/a — un ingreso",
    multiplier: 0.92,
    desc: "Pareja sin ingresos propios",
  },
  {
    code: "casado_doble",
    label: "Casado/a — dos ingresos",
    multiplier: 1.05,
    desc: "Ambos cónyuges trabajan",
  },
  {
    code: "monoparental",
    label: "Familia monoparental",
    multiplier: 0.9,
    desc: "Un progenitor con hijos a cargo",
  },
];

/* ─── Helpers ───────────────────────────────────────────────────────────────── */

function formatCHF(n: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(n);
}

function pct(n: number) {
  return (n * 100).toFixed(1) + "%";
}

/* ─── Calculation ───────────────────────────────────────────────────────────── */

function calcular(
  tasaBase: number,
  multiplier: number,
  hijos: number,
  salarioBruto: number
) {
  const impuestoBruto = salarioBruto * tasaBase * multiplier;
  const deduccionHijos = Math.min(hijos * 250, impuestoBruto * 0.3);
  const impuestoFinal = Math.max(0, impuestoBruto - deduccionHijos);
  const salarioNeto = salarioBruto - impuestoFinal;
  const tasaEfectiva = salarioBruto > 0 ? impuestoFinal / salarioBruto : 0;
  return { impuestoBruto, deduccionHijos, impuestoFinal, salarioNeto, tasaEfectiva };
}

/* ─── Step components ───────────────────────────────────────────────────────── */

function StepIndicator({ step, current }: { step: number; current: number }) {
  const done = step < current;
  const active = step === current;
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
        ${done ? "bg-red-700 text-white" : active ? "bg-red-100 text-red-700 ring-2 ring-red-700" : "bg-gray-100 text-gray-400"}`}
    >
      {done ? "✓" : step}
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────────────── */

export default function ImpuestoFuentePage() {
  const [step, setStep] = useState(1);
  const [canton, setCanton] = useState<(typeof CANTONES)[0] | null>(null);
  const [estado, setEstado] = useState<(typeof ESTADOS_CIVILES)[0] | null>(null);
  const [hijos, setHijos] = useState(0);
  const [salario, setSalario] = useState(5000);

  const result = useMemo(() => {
    if (!canton || !estado) return null;
    return calcular(canton.tasa, estado.multiplier, hijos, salario);
  }, [canton, estado, hijos, salario]);

  const steps = ["Cantón", "Estado civil", "Hijos", "Salario"];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <nav className="text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        {" › "}
        <Link href="/herramientas" className="hover:text-red-700">Herramientas</Link>
        {" › "}
        <span>Impuesto a la fuente</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-1">
        Calculadora impuesto a la fuente
      </h1>
      <p className="text-gray-500 mb-8 text-sm leading-relaxed">
        Quellensteuer para extranjeros sin permiso C. Resultado estimado — tu
        empleador aplica la tabla oficial del cantón.
      </p>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <StepIndicator step={i + 1} current={step} />
              <span className="text-[10px] text-gray-400 mt-1 hidden sm:block">{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 w-8 ${i + 1 < step ? "bg-red-700" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* ── Step 1: Canton ── */}
      {step === 1 && (
        <div>
          <h2 className="font-semibold text-gray-700 mb-4">¿En qué cantón trabajas?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CANTONES.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setCanton(c);
                  setStep(2);
                }}
                className={`border rounded-xl p-3 text-left transition-all hover:border-red-400
                  ${canton?.code === c.code ? "border-red-700 bg-red-50" : "border-gray-200 bg-white"}`}
              >
                <div className="font-semibold text-gray-800 text-sm">{c.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">Tasa base {pct(c.tasa)}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 2: Civil status ── */}
      {step === 2 && (
        <div>
          <h2 className="font-semibold text-gray-700 mb-4">¿Cuál es tu estado civil?</h2>
          <div className="flex flex-col gap-3">
            {ESTADOS_CIVILES.map((e) => (
              <button
                key={e.code}
                onClick={() => {
                  setEstado(e);
                  setStep(3);
                }}
                className={`border rounded-xl p-4 text-left transition-all hover:border-red-400
                  ${estado?.code === e.code ? "border-red-700 bg-red-50" : "border-gray-200 bg-white"}`}
              >
                <div className="font-semibold text-gray-800">{e.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{e.desc}</div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="mt-4 text-sm text-gray-400 hover:text-red-700">
            ← Volver
          </button>
        </div>
      )}

      {/* ── Step 3: Children ── */}
      {step === 3 && (
        <div>
          <h2 className="font-semibold text-gray-700 mb-4">¿Cuántos hijos tienes a cargo?</h2>
          <p className="text-xs text-gray-400 mb-4">
            Cada hijo reduce el impuesto en 250 CHF/mes (máx. 30% del impuesto bruto).
          </p>
          <div className="grid grid-cols-5 gap-3">
            {[0, 1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => {
                  setHijos(n);
                  setStep(4);
                }}
                className={`border rounded-xl py-4 text-center font-bold text-lg transition-all hover:border-red-400
                  ${hijos === n ? "border-red-700 bg-red-50 text-red-700" : "border-gray-200 bg-white text-gray-700"}`}
              >
                {n === 4 ? "4+" : n}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="mt-4 text-sm text-gray-400 hover:text-red-700">
            ← Volver
          </button>
        </div>
      )}

      {/* ── Step 4: Salary ── */}
      {step === 4 && (
        <div>
          <h2 className="font-semibold text-gray-700 mb-1">¿Cuál es tu salario bruto mensual?</h2>
          <p className="text-xs text-gray-400 mb-6">Antes de cualquier deducción.</p>

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Salario bruto</span>
            <span className="text-2xl font-bold text-gray-800">{formatCHF(salario)}</span>
          </div>
          <input
            type="range"
            min={2000}
            max={20000}
            step={100}
            value={salario}
            onChange={(e) => setSalario(Number(e.target.value))}
            className="w-full accent-red-700 mb-2"
          />
          <div className="flex justify-between text-xs text-gray-400 mb-6">
            <span>CHF 2.000</span>
            <span>CHF 20.000</span>
          </div>

          <button onClick={() => setStep(2)} className="text-sm text-gray-400 hover:text-red-700">
            ← Volver
          </button>
        </div>
      )}

      {/* ── Results ── */}
      {step === 4 && result && canton && estado && (
        <div className="mt-8">
          {/* Summary card */}
          <div className="bg-red-700 text-white rounded-2xl p-6 mb-4 text-center">
            <div className="text-sm opacity-80 mb-1">Impuesto a la fuente estimado</div>
            <div className="text-5xl font-black mb-1">{formatCHF(result.impuestoFinal)}</div>
            <div className="text-sm opacity-80">al mes · tasa efectiva {pct(result.tasaEfectiva)}</div>
          </div>

          {/* Breakdown table */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden mb-4">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 text-gray-600">Salario bruto</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">
                    {formatCHF(salario)}
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 text-gray-600">
                    Cantón: {canton.name} · tasa {pct(canton.tasa)}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500">—</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 text-gray-600">
                    Estado civil: {estado.label} (×{estado.multiplier})
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500">—</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 text-gray-600">Impuesto bruto</td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {formatCHF(result.impuestoBruto)}
                  </td>
                </tr>
                {result.deduccionHijos > 0 && (
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-600">
                      Deducción hijos ({hijos === 4 ? "4+" : hijos} × 250 CHF)
                    </td>
                    <td className="px-4 py-3 text-right text-green-600">
                      −{formatCHF(result.deduccionHijos)}
                    </td>
                  </tr>
                )}
                <tr className="bg-gray-50 font-semibold">
                  <td className="px-4 py-3 text-gray-800">Impuesto a la fuente final</td>
                  <td className="px-4 py-3 text-right text-red-700">
                    {formatCHF(result.impuestoFinal)}
                  </td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-3 text-gray-800 font-semibold">Salario neto estimado</td>
                  <td className="px-4 py-3 text-right text-green-700 font-bold text-lg">
                    {formatCHF(result.salarioNeto)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 mb-6 leading-relaxed">
            <strong>Aviso:</strong> Este cálculo es una estimación basada en las tasas cantonales de 2026.
            El impuesto real lo determina la tabla oficial que aplica tu empleador según el código de
            tarifa asignado por las autoridades fiscales. No incluye el 2.º y 3.er pilar, ni otras deducciones
            específicas de tu situación.
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/herramientas/salario-neto"
              className="flex-1 bg-red-700 text-white text-sm font-semibold px-5 py-3 rounded-full text-center hover:bg-red-800 transition-colors"
            >
              Ver deducción AVS/BVG completa →
            </Link>
            <Link
              href="/herramientas/comparador-ciudades"
              className="flex-1 border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-3 rounded-full text-center hover:border-red-400 transition-colors"
            >
              Comparar coste de vida por ciudad
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
