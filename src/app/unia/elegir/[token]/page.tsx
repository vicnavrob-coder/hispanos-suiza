"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

const ACCENT = "#C8102E";

interface HorariosPropuestos {
  opcion1: string;
  opcion2: string;
  opcion3?: string;
}

interface CitaData {
  id: string;
  userName: string;
  userEmail: string;
  status: string;
  horariosPropuestos?: HorariosPropuestos;
  formato?: string;
}

const formatoLabels: Record<string, string> = {
  videollamada: "📹 Videollamada",
  telefono: "📞 Teléfono",
  presencial: "🏢 Presencial",
};

function formatDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

export default function ElegirPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);

  const [cita, setCita] = useState<CitaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedHorario, setSelectedHorario] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmedTime, setConfirmedTime] = useState("");

  useEffect(() => {
    async function fetchCita() {
      try {
        const res = await fetch(`/api/unia/cita?token=${token}`);
        const data = await res.json();

        if (!res.ok || !data.cita) {
          setError(data.error || "Cita no encontrada");
          return;
        }

        if (data.cita.status === "confirmada" || data.cita.status === "completada") {
          setError("Esta cita ya ha sido confirmada.");
          return;
        }

        if (data.cita.status !== "propuesta") {
          setError("Esta cita aún no tiene horarios disponibles para elegir.");
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

    if (!selectedHorario) {
      setError("Por favor, selecciona un horario.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/unia/elegir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          horarioElegido: selectedHorario,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Error al confirmar la cita");
      }

      setConfirmedTime(selectedHorario);
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
          <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#DCFCE7" }}>
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Cita confirmada!</h1>
          <p className="text-gray-600 mb-4">
            Tu cita con UNIA ha sido confirmada para:
          </p>
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
            <p className="font-bold text-green-800 text-lg">{formatDateTime(confirmedTime)}</p>
            <p className="text-green-600 text-sm mt-1">{formatoLabels[cita?.formato || "videollamada"]}</p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Recibirás un email de confirmación con todos los detalles.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-all"
            style={{ background: ACCENT }}
          >
            Volver al inicio →
          </Link>
        </div>
      </div>
    );
  }

  const horarios = cita?.horariosPropuestos;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🇨🇭</span>
            <span className="font-bold text-gray-900">HispanosEnSuiza</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Elige tu horario</h1>
          <p className="text-gray-500">Selecciona el horario que mejor te convenga para tu cita con UNIA</p>
        </div>

        {/* Formato */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-center">
          <p className="text-amber-800 font-semibold">
            {formatoLabels[cita?.formato || "videollamada"]}
          </p>
        </div>

        {/* Opciones de horario */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-bold text-gray-900 mb-4">Horarios disponibles</h2>

          <div className="space-y-3">
            {horarios?.opcion1 && (
              <label
                className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                style={{
                  border: selectedHorario === horarios.opcion1 ? `2px solid ${ACCENT}` : "1.5px solid #E5E7EB",
                  background: selectedHorario === horarios.opcion1 ? "#FEF2F2" : "white",
                }}
              >
                <input
                  type="radio"
                  name="horario"
                  value={horarios.opcion1}
                  checked={selectedHorario === horarios.opcion1}
                  onChange={(e) => setSelectedHorario(e.target.value)}
                  className="sr-only"
                />
                <div
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: selectedHorario === horarios.opcion1 ? ACCENT : "#D1D5DB",
                    background: selectedHorario === horarios.opcion1 ? ACCENT : "white",
                  }}
                >
                  {selectedHorario === horarios.opcion1 && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{formatDateTime(horarios.opcion1)}</p>
                </div>
              </label>
            )}

            {horarios?.opcion2 && (
              <label
                className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                style={{
                  border: selectedHorario === horarios.opcion2 ? `2px solid ${ACCENT}` : "1.5px solid #E5E7EB",
                  background: selectedHorario === horarios.opcion2 ? "#FEF2F2" : "white",
                }}
              >
                <input
                  type="radio"
                  name="horario"
                  value={horarios.opcion2}
                  checked={selectedHorario === horarios.opcion2}
                  onChange={(e) => setSelectedHorario(e.target.value)}
                  className="sr-only"
                />
                <div
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: selectedHorario === horarios.opcion2 ? ACCENT : "#D1D5DB",
                    background: selectedHorario === horarios.opcion2 ? ACCENT : "white",
                  }}
                >
                  {selectedHorario === horarios.opcion2 && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{formatDateTime(horarios.opcion2)}</p>
                </div>
              </label>
            )}

            {horarios?.opcion3 && (
              <label
                className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                style={{
                  border: selectedHorario === horarios.opcion3 ? `2px solid ${ACCENT}` : "1.5px solid #E5E7EB",
                  background: selectedHorario === horarios.opcion3 ? "#FEF2F2" : "white",
                }}
              >
                <input
                  type="radio"
                  name="horario"
                  value={horarios.opcion3}
                  checked={selectedHorario === horarios.opcion3}
                  onChange={(e) => setSelectedHorario(e.target.value)}
                  className="sr-only"
                />
                <div
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: selectedHorario === horarios.opcion3 ? ACCENT : "#D1D5DB",
                    background: selectedHorario === horarios.opcion3 ? ACCENT : "white",
                  }}
                >
                  {selectedHorario === horarios.opcion3 && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{formatDateTime(horarios.opcion3)}</p>
                </div>
              </label>
            )}
          </div>

          {error && (
            <div className="mt-4 rounded-xl p-3" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !selectedHorario}
            className="w-full mt-6 text-white font-bold py-3.5 rounded-xl text-sm transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: ACCENT }}
          >
            {submitting ? "Confirmando..." : "Confirmar horario →"}
          </button>

          <p className="text-xs text-center text-gray-400 mt-4">
            Recibirás un email de confirmación con todos los detalles de la cita.
          </p>
        </form>
      </div>
    </div>
  );
}
