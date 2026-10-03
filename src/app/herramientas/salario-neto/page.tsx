"use client";
import { useState } from "react";
import Link from "next/link";
import { SALARY_DATA, CANTONES as CANTONES_DATA } from "@/lib/data";

const CANTONES = CANTONES_DATA.map((c) => ({ slug: c.slug, nombre: c.nombre, tasa: c.tasa }));
const SECTORES = Object.entries(SALARY_DATA).map(([nombre, v]) => ({ nombre, icono: v.icono, min: v.min, max: v.max }));

const fmt = (n: number) =>
  new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(n);

export default function SalarioNetoPage() {
  const [bruto, setBruto] = useState("");
  const [canton, setCanton] = useState(CANTONES[0].slug);
  const [resultado, setResultado] = useState<null | {
    neto: number; avs: number; desempleo: number; impuesto: number;
  }>(null);

  function calcular() {
    const salarioBruto = parseFloat(bruto);
    if (!salarioBruto || salarioBruto <= 0) return;
    const cantonData = CANTONES.find((c) => c.slug === canton)!;
    const avs = salarioBruto * 0.053;
    const desempleo = salarioBruto * 0.011;
    const baseImponible = salarioBruto - avs - desempleo;
    const impuesto = baseImponible * cantonData.tasa;
    setResultado({ neto: salarioBruto - avs - desempleo - impuesto, avs, desempleo, impuesto });
  }

  function usarSalario(min: number, max: number) {
    setBruto(String(Math.round((min + max) / 2)));
    setResultado(null);
  }

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
      <p className="text-gray-500 mb-8 text-sm">
        Calcula cuánto recibirás en mano según tu salario bruto y cantón.
        Incluye AVS (5.3%), seguro de desempleo (1.1%) e impuesto a la fuente estimado.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calculadora */}
        <div className="flex-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-4">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Salario bruto mensual (CHF)
              </label>
              <input
                type="number"
                value={bruto}
                onChange={(e) => { setBruto(e.target.value); setResultado(null); }}
                placeholder="Ej: 5000"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-red-400 text-lg"
              />
            </div>
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
              className="w-full text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity text-base"
            >
              Calcular salario neto
            </button>
          </div>

          {resultado && (
            <div className="bg-white border border-green-100 rounded-2xl p-6">
              <h2 className="font-bold text-gray-800 mb-4">Resultado mensual estimado</h2>
              <div className="space-y-3 mb-4">
                {[
                  { label: "Salario bruto", valor: parseFloat(bruto), color: "text-gray-800", signo: "" },
                  { label: "AVS / AI / APG (5.3%)", valor: resultado.avs, color: "text-red-600", signo: "−" },
                  { label: "Seguro de desempleo (1.1%)", valor: resultado.desempleo, color: "text-red-600", signo: "−" },
                  { label: "Impuesto a la fuente (estimado)", valor: resultado.impuesto, color: "text-red-600", signo: "−" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{r.label}</span>
                    <span className={`font-medium ${r.color}`}>{r.signo} {fmt(r.valor)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-800">Salario neto estimado</span>
                  <span className="font-bold text-2xl text-green-700">{fmt(resultado.neto)}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                * Cálculo orientativo. No incluye BVG/LPP (pensión empresa) ni impuesto eclesiástico.
              </p>
            </div>
          )}

          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            💡 <strong>Tip:</strong> Los impuestos varían hasta un 15% entre cantones.
            Zúrich y Basilea suelen ser más ventajosos que Ginebra para sueldos medios.
          </div>
        </div>

        {/* Salarios de referencia por sector */}
        <div className="w-full lg:w-72">
          <h2 className="font-bold text-gray-800 mb-3 text-sm">Salarios de referencia por sector</h2>
          <p className="text-xs text-gray-400 mb-3">Haz clic para usar el salario medio del sector.</p>
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
        </div>
      </div>
    </div>
  );
}
