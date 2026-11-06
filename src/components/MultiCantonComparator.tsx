"use client";

import { useState } from "react";
import { CANTONES } from "@/lib/data";

interface ComparadorProps {
  salarioBruto: number;
}

interface ResultadoCanton {
  nombre: string;
  slug: string;
  neto: number;
  impuesto: number;
  totalDescuentos: number;
  pctDescuento: number;
}

const fmt = (n: number) =>
  `CHF ${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "'")}`;

export default function MultiCantonComparator({ salarioBruto }: ComparadorProps) {
  const [sortBy, setSortBy] = useState<"neto" | "impuesto">("neto");
  const [showChart, setShowChart] = useState(true);

  // Calcular para todos los cantones
  const resultados: ResultadoCanton[] = CANTONES.map((canton) => {
    // Mismos cálculos que en la calculadora individual
    const avs = salarioBruto * 0.053;
    const desempleo = salarioBruto * 0.011;
    const accidente = salarioBruto * 0.010;
    const bvg = salarioBruto * 0.070;
    const baseImponible = salarioBruto - avs - desempleo - accidente - bvg;
    const impuesto = baseImponible * canton.tasa;
    const totalDescuentos = avs + desempleo + accidente + bvg + impuesto;
    const neto = salarioBruto - totalDescuentos;

    return {
      nombre: canton.nombre,
      slug: canton.slug,
      neto,
      impuesto,
      totalDescuentos,
      pctDescuento: (totalDescuentos / salarioBruto) * 100,
    };
  });

  // Ordenar
  const sorted = [...resultados].sort((a, b) =>
    sortBy === "neto" ? b.neto - a.neto : a.impuesto - b.impuesto
  );

  const mejorCanton = sorted[0];
  const peorCanton = sorted[sorted.length - 1];
  const diferencia = mejorCanton.neto - peorCanton.neto;

  return (
    <div className="space-y-6">
      {/* Header con insights */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Comparación de los 26 cantones suizos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Mejor cantón</p>
            <p className="text-2xl font-bold text-green-700">{mejorCanton.nombre}</p>
            <p className="text-sm text-green-600">{fmt(mejorCanton.neto)} neto</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Peor cantón</p>
            <p className="text-2xl font-bold text-red-700">{peorCanton.nombre}</p>
            <p className="text-sm text-red-600">{fmt(peorCanton.neto)} neto</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Diferencia anual</p>
            <p className="text-2xl font-bold text-blue-700">{fmt(diferencia * 12)}</p>
            <p className="text-sm text-blue-600">Ahorro potencial/año</p>
          </div>
        </div>
      </div>

      {/* Toggle Chart/Table */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowChart(true)}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            showChart
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          📊 Gráfico
        </button>
        <button
          onClick={() => setShowChart(false)}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            !showChart
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          📋 Tabla
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "neto" | "impuesto")}
          className="ml-auto px-4 py-2 border border-gray-200 rounded-lg bg-white"
        >
          <option value="neto">Ordenar por neto (mayor a menor)</option>
          <option value="impuesto">Ordenar por impuesto (menor a mayor)</option>
        </select>
      </div>

      {/* Chart View */}
      {showChart && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h4 className="font-bold text-gray-900 mb-4">Salario neto mensual por cantón</h4>
          <div className="space-y-2">
            {sorted.map((r, i) => {
              const maxNeto = sorted[0].neto;
              const widthPct = (r.neto / maxNeto) * 100;
              const isTop5 = i < 5;
              const isBottom5 = i >= sorted.length - 5;

              return (
                <div key={r.slug} className="flex items-center gap-3">
                  <div className="w-8 text-sm text-gray-500 text-right">{i + 1}</div>
                  <div className="w-32 text-sm font-medium text-gray-700 truncate">
                    {r.nombre}
                  </div>
                  <div className="flex-1 relative">
                    <div
                      className={`h-8 rounded-lg transition-all ${
                        isTop5
                          ? "bg-gradient-to-r from-green-400 to-green-500"
                          : isBottom5
                          ? "bg-gradient-to-r from-red-400 to-red-500"
                          : "bg-gradient-to-r from-blue-400 to-blue-500"
                      }`}
                      style={{ width: `${widthPct}%` }}
                    >
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold">
                        {fmt(r.neto)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Table View */}
      {!showChart && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Cantón
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    Salario Neto
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    Impuesto
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    % Descuento
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    Dif. vs mejor
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.map((r, i) => {
                  const isTop5 = i < 5;
                  const isBottom5 = i >= sorted.length - 5;
                  const difVsMejor = mejorCanton.neto - r.neto;

                  return (
                    <tr
                      key={r.slug}
                      className={`hover:bg-gray-50 ${
                        isTop5
                          ? "bg-green-50"
                          : isBottom5
                          ? "bg-red-50"
                          : ""
                      }`}
                    >
                      <td className="px-4 py-3 text-sm text-gray-500">{i + 1}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {r.nombre}
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-right text-green-700">
                        {fmt(r.neto)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-red-600">
                        {fmt(r.impuesto)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">
                        {r.pctDescuento.toFixed(1)}%
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        {difVsMejor === 0 ? (
                          <span className="text-green-600 font-bold">Mejor</span>
                        ) : (
                          <span className="text-red-600">-{fmt(difVsMejor)}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top 5 y Bottom 5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h4 className="font-bold text-green-900 mb-3">Top 5 cantones (más neto)</h4>
          <div className="space-y-2">
            {sorted.slice(0, 5).map((r, i) => (
              <div key={r.slug} className="flex justify-between items-center">
                <span className="text-sm text-green-800">
                  {i + 1}. {r.nombre}
                </span>
                <span className="text-sm font-bold text-green-700">{fmt(r.neto)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h4 className="font-bold text-red-900 mb-3">Bottom 5 cantones (menos neto)</h4>
          <div className="space-y-2">
            {sorted.slice(-5).reverse().map((r, i) => (
              <div key={r.slug} className="flex justify-between items-center">
                <span className="text-sm text-red-800">
                  {sorted.length - 4 + i}. {r.nombre}
                </span>
                <span className="text-sm font-bold text-red-700">{fmt(r.neto)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={() => {
          const dataStr = JSON.stringify(sorted, null, 2);
          const dataBlob = new Blob([dataStr], { type: "application/json" });
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `comparacion-cantones-${salarioBruto}.json`;
          link.click();
        }}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
      >
        📥 Exportar datos (JSON)
      </button>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        💡 <strong>Consejo:</strong> Mudarte al cantón con menor carga fiscal puede ahorrarte hasta{" "}
        <strong>{fmt(diferencia * 12)}</strong> al año. Considera también el coste de vida y la
        distancia al trabajo antes de decidir.
      </div>
    </div>
  );
}
