"use client";

import { useState } from "react";
import Link from "next/link";

const ACCENT = "#C8102E";

const salariosPorSector = [
  {
    sector: "Tecnología / IT",
    roles: [
      { puesto: "Desarrollador Junior", rango: "70.000 - 90.000" },
      { puesto: "Desarrollador Senior", rango: "100.000 - 140.000" },
      { puesto: "DevOps / SRE", rango: "110.000 - 150.000" },
      { puesto: "Product Manager", rango: "120.000 - 160.000" },
      { puesto: "CTO / Director Tech", rango: "180.000 - 280.000" },
    ],
  },
  {
    sector: "Sanidad",
    roles: [
      { puesto: "Enfermero/a", rango: "65.000 - 85.000" },
      { puesto: "Médico residente", rango: "80.000 - 100.000" },
      { puesto: "Médico especialista", rango: "150.000 - 300.000" },
      { puesto: "Farmacéutico", rango: "90.000 - 120.000" },
      { puesto: "Fisioterapeuta", rango: "60.000 - 80.000" },
    ],
  },
  {
    sector: "Finanzas / Banca",
    roles: [
      { puesto: "Analista Junior", rango: "80.000 - 100.000" },
      { puesto: "Analista Senior", rango: "120.000 - 160.000" },
      { puesto: "Portfolio Manager", rango: "150.000 - 250.000" },
      { puesto: "Director de Banca", rango: "200.000 - 400.000" },
      { puesto: "Compliance Officer", rango: "100.000 - 150.000" },
    ],
  },
  {
    sector: "Hostelería / Turismo",
    roles: [
      { puesto: "Camarero/a", rango: "42.000 - 52.000" },
      { puesto: "Cocinero/a", rango: "48.000 - 65.000" },
      { puesto: "Chef ejecutivo", rango: "75.000 - 120.000" },
      { puesto: "Recepcionista hotel", rango: "45.000 - 55.000" },
      { puesto: "Director de hotel", rango: "90.000 - 150.000" },
    ],
  },
  {
    sector: "Construcción",
    roles: [
      { puesto: "Peón construcción", rango: "50.000 - 60.000" },
      { puesto: "Oficial especializado", rango: "60.000 - 75.000" },
      { puesto: "Electricista", rango: "65.000 - 85.000" },
      { puesto: "Jefe de obra", rango: "90.000 - 130.000" },
      { puesto: "Ingeniero civil", rango: "85.000 - 120.000" },
    ],
  },
];

export default function GuiaSalariosPage() {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !nombre) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          nombre,
          source: "lead-magnet-guia-salarios"
        }),
      });

      if (res.ok) {
        setEnviado(true);
      } else {
        setError("Error al enviar. Inténtalo de nuevo.");
      }
    } catch {
      setError("Error de conexión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F6F3] to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0032A0] to-[#C8102E] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            GUÍA SALARIAL 2026
          </span>
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            Salarios en Suiza por Sector y Puesto
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Datos reales de +25 puestos en 5 sectores principales. Sabe cuánto puedes ganar antes de negociar.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm opacity-80">
            <span>✓ Datos 2026</span>
            <span>✓ CHF bruto/año</span>
            <span>✓ Por experiencia</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Preview de salarios */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Vista previa de salarios (CHF/año)
          </h2>

          <div className="space-y-8">
            {salariosPorSector.slice(0, 3).map((sector, i) => (
              <div key={i}>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  {sector.sector}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      {sector.roles.slice(0, 2).map((rol, j) => (
                        <tr key={j} className="border-b border-gray-100">
                          <td className="py-2 text-gray-600">{rol.puesto}</td>
                          <td className="py-2 text-right font-semibold text-gray-900">
                            CHF {rol.rango}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={2} className="py-2 text-gray-400 italic text-xs">
                          + {sector.roles.length - 2} puestos más en la guía completa...
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            <div className="text-center py-4 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-sm">
                + 2 sectores más: <strong>Hostelería</strong> y <strong>Construcción</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Formulario de descarga */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-blue-200">
          {enviado ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">¡Guía enviada!</h3>
              <p className="text-gray-600 mb-6">
                Revisa tu email ({email}) para acceder a la guía salarial completa.
              </p>
              <Link
                href="/herramientas/salario-neto"
                className="inline-block px-6 py-3 bg-[#0032A0] text-white font-bold rounded-xl hover:opacity-90 transition"
              >
                Calcular mi salario neto →
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Descarga la guía salarial completa
                </h3>
                <p className="text-gray-600">
                  25+ puestos con rangos salariales detallados por experiencia
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0032A0] text-gray-900"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0032A0] text-gray-900"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-white font-bold text-lg transition hover:opacity-90 disabled:opacity-60 bg-[#0032A0]"
                >
                  {loading ? "Enviando..." : "Descargar guía gratis →"}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Recibirás la guía + consejos para negociar tu salario en Suiza.
                </p>
              </form>
            </>
          )}
        </div>

        {/* Info adicional */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h4 className="font-bold text-amber-900 mb-2">💡 Consejo para negociar</h4>
          <p className="text-amber-800 text-sm">
            En Suiza es normal negociar el salario. Los rangos que mostramos son orientativos —
            tu salario final depende de experiencia, idiomas, ubicación y empresa.
            Usa nuestra <Link href="/herramientas/salario-neto" className="underline font-semibold">calculadora de salario neto</Link> para
            saber cuánto te queda después de impuestos y deducciones.
          </p>
        </div>
      </div>
    </div>
  );
}
