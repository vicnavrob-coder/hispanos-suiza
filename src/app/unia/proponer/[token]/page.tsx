"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

const ACCENT = "#C8102E";

interface CitaData {
  id: string;
  userName: string;
  userEmail: string;
  userPais: string;
  userTelefono?: string;
  userMensaje?: string;
  status: string;
  createdAt: string;
}

type Formato = "videollamada" | "telefono" | "presencial";

export default function ProponerPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);

  const [cita, setCita] = useState<CitaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form state
  const [opcion1, setOpcion1] = useState("");
  const [opcion2, setOpcion2] = useState("");
  const [opcion3, setOpcion3] = useState("");
  const [formato, setFormato] = useState<Formato>("videollamada");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchCita() {
      try {
        const res = await fetch(`/api/unia/cita?token=${token}`);
        const data = await res.json();

        if (!res.ok || !data.cita) {
          setError(data.error || "Cita no encontrada");
          return;
        }

        if (data.cita.status !== "solicitud") {
          setError("Esta cita ya ha sido procesada o no está disponible para proponer horarios.");
          return;
        }

        setCita(data.cita);
      } catch {
        setError("Error al cargar la cita");
      } finally {
        setLoading(false);
      }
    }

    fetchCita();
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!opcion1 || !opcion2) {
      setError("Debes proponer al menos 2 horarios.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/unia/proponer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          horarios: {
            opcion1,
            opcion2,
            opcion3: opcion3 || undefined,
          },
          formato,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Error al enviar propuesta");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-gray-200 border-t-red-600 rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error && !cita) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#FEE2E2" }}>
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/" className="text-sm font-semibold hover:underline" style={{ color: ACCENT }}>
            Volver al inicio →
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#DCFCE7" }}>
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Horarios enviados</h1>
          <p className="text-gray-600 mb-4">
            Hemos enviado los horarios propuestos a <strong>{cita?.userName}</strong>.
          </p>
          <p className="text-sm text-gray-500">
            Recibirás una notificación cuando el usuario confirme uno de los horarios.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🇨🇭</span>
            <span className="font-bold text-gray-900">HispanosEnSuiza</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900">Proponer horarios para cita UNIA</h1>
        </div>

        {/* Datos del solicitante */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>👤</span> Datos del solicitante
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Nombre:</span>
              <span className="font-semibold text-gray-900">{cita?.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span className="font-semibold text-gray-900">{cita?.userEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">País:</span>
              <span className="font-semibold text-gray-900">{cita?.userPais || "No especificado"}</span>
            </div>
            {cita?.userTelefono && (
              <div className="flex justify-between">
                <span className="text-gray-500">Teléfono:</span>
                <span className="font-semibold text-gray-900">{cita.userTelefono}</span>
              </div>
            )}
            {cita?.userMensaje && (
              <div className="pt-3 border-t border-gray-100">
                <span className="text-gray-500 text-sm">Mensaje:</span>
                <p className="mt-1 text-gray-900 bg-gray-50 rounded-lg p-3 text-sm">{cita.userMensaje}</p>
              </div>
            )}
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📅</span> Proponer horarios
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Propón 2-3 opciones de fecha y hora. El usuario elegirá una de ellas.
          </p>

          {/* Formato */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Formato de la cita
            </label>
            <div className="space-y-2">
              {[
                { value: "videollamada", label: "📹 Videollamada", desc: "Zoom, Meet, etc." },
                { value: "telefono", label: "📞 Teléfono", desc: "Llamada telefónica" },
                { value: "presencial", label: "🏢 Presencial", desc: "En oficina UNIA" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                  style={{
                    border: formato === opt.value ? `2px solid ${ACCENT}` : "1.5px solid #E5E7EB",
                    background: formato === opt.value ? "#FEF2F2" : "white",
                  }}
                >
                  <input
                    type="radio"
                    name="formato"
                    value={opt.value}
                    checked={formato === opt.value}
                    onChange={(e) => setFormato(e.target.value as Formato)}
                    className="sr-only"
                  />
                  <span className="flex-1">
                    <span className="font-semibold text-gray-900">{opt.label}</span>
                    <span className="text-gray-500 text-sm ml-2">{opt.desc}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Horarios */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Opción 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={opcion1}
                onChange={(e) => setOpcion1(e.target.value)}
                required
                className="w-full rounded-xl px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Opción 2 <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={opcion2}
                onChange={(e) => setOpcion2(e.target.value)}
                required
                className="w-full rounded-xl px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Opción 3 <span className="text-gray-400">(opcional)</span>
              </label>
              <input
                type="datetime-local"
                value={opcion3}
                onChange={(e) => setOpcion3(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-xl p-3" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-6 text-white font-bold py-3.5 rounded-xl text-sm transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: ACCENT }}
          >
            {submitting ? "Enviando..." : "Enviar horarios al usuario →"}
          </button>
        </form>
      </div>
    </div>
  );
}
