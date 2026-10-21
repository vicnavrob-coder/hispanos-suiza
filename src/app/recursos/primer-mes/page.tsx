"use client";

import { useState } from "react";
import Link from "next/link";

const ACCENT = "#C8102E";

const checklistItems = [
  {
    categoria: "Documentos esenciales",
    items: [
      "Registrarte en el Ayuntamiento (Einwohnerkontrolle) en los primeros 14 días",
      "Solicitar el permiso de residencia (B o L) si aún no lo tienes",
      "Obtener tu número AVS/AHV (seguridad social suiza)",
      "Abrir una cuenta bancaria suiza (UBS, Credit Suisse, Raiffeisen, PostFinance)",
      "Contratar seguro médico obligatorio (KVG/LAMal) en máximo 3 meses",
    ],
  },
  {
    categoria: "Vivienda",
    items: [
      "Firmar contrato de alquiler y pagar Kaution (depósito 2-3 meses)",
      "Activar electricidad, agua y calefacción",
      "Contratar internet y telefonía móvil",
      "Registrar tu dirección para recibir correo",
      "Obtener llaves del buzón y contenedores de basura",
    ],
  },
  {
    categoria: "Trabajo",
    items: [
      "Entregar documentos a RRHH (permiso, cuenta bancaria, AVS)",
      "Entender tu nómina suiza (bruto, deducciones, neto)",
      "Conocer tus derechos laborales básicos (vacaciones, horas extra)",
      "Considerar afiliarte a un sindicato (UNIA) para protección",
      "Guardar todos los documentos del contrato",
    ],
  },
  {
    categoria: "Vida diaria",
    items: [
      "Descargar apps esenciales: SBB (trenes), MeteoSwiss, Twint (pagos)",
      "Obtener tarjeta de transporte público (AG, Halbtax o cantonal)",
      "Localizar supermercados cercanos (Migros, Coop, Lidl, Aldi)",
      "Encontrar médico de cabecera (Hausarzt)",
      "Conocer el sistema de reciclaje de tu municipio",
    ],
  },
  {
    categoria: "Integración",
    items: [
      "Apuntarte a curso de idioma local (alemán, francés o italiano)",
      "Unirte a grupos de hispanohablantes en tu ciudad",
      "Explorar tu barrio y transporte público",
      "Conocer los festivos suizos y de tu cantón",
      "Registrarte en el consulado español/latinoamericano",
    ],
  },
];

export default function PrimerMesPage() {
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
          source: "lead-magnet-primer-mes"
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
      <div className="bg-gradient-to-r from-[#C8102E] to-[#0032A0] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            RECURSO GRATUITO
          </span>
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            Checklist: Tu Primer Mes en Suiza
          </h1>
          <p className="text-lg opacity-90 mb-6">
            25 tareas esenciales organizadas por categoría para que no se te olvide nada
          </p>
          <div className="flex items-center justify-center gap-4 text-sm opacity-80">
            <span>✓ 100% gratis</span>
            <span>✓ En español</span>
            <span>✓ Actualizado 2026</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Preview del checklist */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Vista previa del checklist
          </h2>

          <div className="space-y-6">
            {checklistItems.map((cat, i) => (
              <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  {cat.categoria}
                </h3>
                <ul className="space-y-2 ml-8">
                  {cat.items.slice(0, 2).map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5">☐</span>
                      {item}
                    </li>
                  ))}
                  <li className="text-sm text-gray-400 italic">
                    + {cat.items.length - 2} tareas más...
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario de descarga */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 border border-amber-200">
          {enviado ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">¡Checklist enviado!</h3>
              <p className="text-gray-600 mb-6">
                Revisa tu email ({email}) para acceder al checklist completo.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-[#C8102E] text-white font-bold rounded-xl hover:opacity-90 transition"
              >
                Explorar más recursos →
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Descarga el checklist completo gratis
                </h3>
                <p className="text-gray-600">
                  Te lo enviamos a tu email para que puedas consultarlo siempre
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8102E] text-gray-900"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8102E] text-gray-900"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-white font-bold text-lg transition hover:opacity-90 disabled:opacity-60"
                  style={{ background: ACCENT }}
                >
                  {loading ? "Enviando..." : "Enviar checklist gratis →"}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  También recibirás consejos semanales para tu vida en Suiza.
                  Puedes darte de baja en cualquier momento.
                </p>
              </form>
            </>
          )}
        </div>

        {/* Beneficios */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📋</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Organizado</h4>
            <p className="text-sm text-gray-600">5 categorías, 25 tareas priorizadas</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">✅</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Práctico</h4>
            <p className="text-sm text-gray-600">Marca cada tarea completada</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🇨🇭</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Actualizado</h4>
            <p className="text-sm text-gray-600">Información vigente para 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
