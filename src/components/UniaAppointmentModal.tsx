"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ACCENT = "#C8102E";

export default function UniaAppointmentModal({ open, onClose }: Props) {
  const { user } = useAuth();

  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setTelefono("");
      setMensaje("");
      setSuccess(false);
      setError("");
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/unia/cita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          userName: user.nombre,
          userPais: user.pais || "",
          userTelefono: telefono.trim() || undefined,
          userMensaje: mensaje.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Error al enviar la solicitud");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-[420px] overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between" style={{ borderBottom: "1px solid #F3F4F6" }}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚖️</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#FEE2E2", color: ACCENT }}>
                UNIA
              </span>
            </div>
            <h2 className="font-bold text-[20px] text-[#0A0A0A] leading-tight">
              Solicitar cita con UNIA
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Te contactaremos para coordinar la cita
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#0A0A0A] transition-all flex-shrink-0 ml-2"
            aria-label="Cerrar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          /* Success State */
          <div className="px-6 py-8 text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#DCFCE7" }}>
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Solicitud enviada</h3>
            <p className="text-sm text-[#6B7280] mb-4">
              Hemos enviado tu solicitud a UNIA. Pronto recibirás un email con las opciones de horario disponibles.
            </p>
            <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm text-blue-800">
                <strong>¿Qué pasará ahora?</strong><br />
                1. UNIA revisará tu solicitud<br />
                2. Recibirás un email con 2-3 horarios<br />
                3. Eliges el que mejor te convenga<br />
                4. ¡Cita confirmada!
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: ACCENT }}
            >
              Entendido
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {/* User info preview */}
            <div className="rounded-xl p-3" style={{ background: "#F8F6F3" }}>
              <p className="text-xs text-[#6B7280] mb-1">Solicitando como:</p>
              <p className="text-sm font-semibold text-[#0A0A0A]">{user?.nombre}</p>
              <p className="text-xs text-[#6B7280]">{user?.email}</p>
            </div>

            {/* Phone (optional) */}
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1.5">
                Teléfono <span className="text-[#9CA3AF] font-normal">(opcional)</span>
              </label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="+41 79 123 45 67"
                className="w-full rounded-xl px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#C8102E] transition-all"
                style={{ border: "1.5px solid #E5E7EB" }}
              />
              <p className="text-xs text-[#9CA3AF] mt-1">
                Si prefieres que te llamen, indica tu número
              </p>
            </div>

            {/* Message (optional) */}
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1.5">
                Mensaje <span className="text-[#9CA3AF] font-normal">(opcional)</span>
              </label>
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Cuéntanos brevemente tu situación o consulta..."
                rows={3}
                className="w-full rounded-xl px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#C8102E] transition-all resize-none"
                style={{ border: "1.5px solid #E5E7EB" }}
              />
            </div>

            {/* Info box */}
            <div className="rounded-xl p-3" style={{ background: "#FEF3C7", border: "1px solid #FDE68A" }}>
              <p className="text-xs text-[#92400E]">
                <strong>¿Qué es UNIA?</strong> El mayor sindicato de Suiza. Te asesoran en conflictos laborales, revisan contratos y defienden tus derechos.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl p-3" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full text-white font-bold py-3.5 rounded-xl text-sm transition-all hover:opacity-90 disabled:opacity-60 active:scale-[0.98]"
              style={{ background: ACCENT }}
            >
              {submitting ? "Enviando solicitud..." : "Solicitar cita →"}
            </button>

            {/* Footer info */}
            <p className="text-xs text-center text-[#9CA3AF]">
              Es gratis. UNIA te propondrá horarios y tú eliges el que mejor te convenga.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
