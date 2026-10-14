"use client";

import { useState } from "react";
import Link from "next/link";
import { SALARY_DATA, CIUDADES } from "@/lib/data";

// ─── Constants ────────────────────────────────────────────────────────────────

const SECTORES = Object.entries(SALARY_DATA).map(([nombre, v]) => ({
  nombre,
  icono: v.icono,
  min: v.min,
  max: v.max,
}));

const TARGET_SLUGS = ["zurich", "ginebra", "berna", "basilea", "lausana", "lugano"];
const CIUDADES_FILTRADAS = CIUDADES.filter((c) => TARGET_SLUGS.includes(c.slug));

// Zúrich salarioMedio = 7200 → base 1.0
const ZURICH_BASE = 7200;

const NIVELES = [
  { label: "Junior (0-2 años)", multiplier: 0.85 },
  { label: "Medio (3-5 años)", multiplier: 1.0 },
  { label: "Senior (6-10 años)", multiplier: 1.2 },
  { label: "Experto (+10 años)", multiplier: 1.4 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const round100 = (n: number) => Math.round(n / 100) * 100;

const fmt = (n: number) =>
  `CHF ${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "'")}`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function ComparadorSalariosPage() {
  const [sectorSeleccionado, setSectorSeleccionado] = useState<string | null>(null);
  const [nivelIndex, setNivelIndex] = useState<number | null>(null);

  const sectorData = sectorSeleccionado ? SALARY_DATA[sectorSeleccionado] : null;
  const nivel = nivelIndex !== null ? NIVELES[nivelIndex] : null;

  const mostrarResultados = sectorData !== null && nivel !== null;

  // Summary range (sin ajuste de ciudad)
  const summaryMin = sectorData ? round100(sectorData.min * (nivel?.multiplier ?? 1)) : 0;
  const summaryMax = sectorData ? round100(sectorData.max * (nivel?.multiplier ?? 1)) : 0;

  type FilaResultado = {
    ciudad: string;
    bruto: number;
    neto: number;
    costeVida: number;
    sobrante: number;
  };

  const filas: FilaResultado[] = mostrarResultados
    ? CIUDADES_FILTRADAS.map((c) => {
        const cityFactor = c.salarioMedio / ZURICH_BASE;
        const bruto = round100(sectorData!.min * nivel!.multiplier * cityFactor);
        const neto = Math.round(bruto * 0.82);
        const costeVida =
          c.alquiler1HabPeriferia + c.alimentacion + c.transporte + c.seguroMedico;
        const sobrante = neto - costeVida;
        return { ciudad: c.nombre, bruto, neto, costeVida, sobrante };
      })
    : [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10" style={{ background: "#F8F6F3", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">Inicio</Link>
        <span className="mx-2">›</span>
        <Link href="/herramientas" className="hover:underline">Herramientas</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700 font-medium">Comparador salarios</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Comparador de salarios por profesión
        </h1>
        <p className="text-gray-500 text-base">
          Selecciona tu sector y experiencia para ver cuánto puedes ganar en cada ciudad suiza.
        </p>
      </div>

      {/* Step 1 — Select sector */}
      <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#C0392B] text-white text-sm font-bold mr-2">1</span>
          Elige tu sector profesional
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {SECTORES.map((s) => {
            const selected = sectorSeleccionado === s.nombre;
            return (
              <button
                key={s.nombre}
                onClick={() => setSectorSeleccionado(s.nombre)}
                className={`flex flex-col items-center justify-center gap-1 p-4 rounded-xl border-2 transition-all cursor-pointer text-center ${
                  selected
                    ? "border-[#C0392B] bg-red-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="text-2xl">{s.icono}</span>
                <span className={`text-xs font-medium leading-tight ${selected ? "text-[#C0392B]" : "text-gray-700"}`}>
                  {s.nombre}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2 — Select experience */}
      <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#C0392B] text-white text-sm font-bold mr-2">2</span>
          Nivel de experiencia
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {NIVELES.map((n, i) => {
            const selected = nivelIndex === i;
            return (
              <button
                key={n.label}
                onClick={() => setNivelIndex(i)}
                className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer ${
                  selected
                    ? "bg-[#C0392B] text-white border-[#C0392B]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
              >
                {n.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Results */}
      {mostrarResultados && (
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          {/* Summary card */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
            <p className="text-gray-800 text-base leading-relaxed">
              En{" "}
              <strong className="text-[#C0392B]">{sectorSeleccionado}</strong>{" "}
              con experiencia{" "}
              <strong>{nivel!.label}</strong>{" "}
              puedes ganar entre{" "}
              <strong className="text-[#C0392B]">{fmt(summaryMin)}</strong>{" "}
              y{" "}
              <strong className="text-[#C0392B]">{fmt(summaryMax)}</strong>{" "}
              al mes bruto en Suiza
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Ciudad</th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700">Salario bruto est.</th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700">Salario neto aprox.</th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700">Coste vida mensual</th>
                  <th className="text-center py-3 px-2 font-semibold text-gray-700">¿Te llega?</th>
                </tr>
              </thead>
              <tbody>
                {filas.map((fila) => {
                  let estado: { label: string; cls: string };
                  if (fila.sobrante > 500) {
                    estado = { label: "✅ Sí sobra", cls: "text-green-700 bg-green-50 px-2 py-1 rounded-lg font-semibold" };
                  } else if (fila.sobrante >= 0) {
                    estado = { label: "⚠️ Justo", cls: "text-yellow-700 bg-yellow-50 px-2 py-1 rounded-lg font-semibold" };
                  } else {
                    estado = { label: "❌ No llega", cls: "text-red-700 bg-red-50 px-2 py-1 rounded-lg font-semibold" };
                  }

                  return (
                    <tr key={fila.ciudad} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-2 font-medium text-gray-800">{fila.ciudad}</td>
                      <td className="py-3 px-2 text-right text-gray-700">{fmt(fila.bruto)}</td>
                      <td className="py-3 px-2 text-right text-gray-700">{fmt(fila.neto)}</td>
                      <td className="py-3 px-2 text-right text-gray-600">{fmt(fila.costeVida)}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={estado.cls}>{estado.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            Estimaciones orientativas basadas en datos de mercado 2026. El salario real depende de empresa, convenio colectivo y negociación.
          </p>

          {/* CTA */}
          <div className="mt-5">
            <Link
              href="/herramientas/salario-neto"
              className="inline-block bg-[#C0392B] text-white text-sm font-semibold px-5 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Calcula tu salario neto exacto →
            </Link>
          </div>
        </section>
      )}

      {/* Empty state hint */}
      {!mostrarResultados && (
        <div className="text-center py-10 text-gray-400 text-sm">
          {!sectorSeleccionado
            ? "Selecciona un sector para comenzar"
            : "Ahora elige tu nivel de experiencia para ver los resultados"}
        </div>
      )}
    </div>
  );
}
