"use client";

import { useState } from "react";

export default function StarterPackForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fechaLlegada: "",
    sector: "",
    mensaje: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/starter-pack/solicitud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar solicitud");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        "Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo o contáctanos por email."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          ¡Solicitud Recibida!
        </h3>
        <p className="text-slate-600 mb-6">
          Te contactaremos en las próximas 24 horas para confirmar disponibilidad
          y enviarte el enlace de pago de la señal (500 CHF).
        </p>
        <p className="text-sm text-slate-500">
          Revisa tu email (incluyendo spam) para nuestro mensaje.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-2xl p-8 space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-semibold text-slate-900 mb-2"
          >
            Nombre completo *
          </label>
          <input
            type="text"
            id="nombre"
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-900"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            placeholder="María García"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-900 mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-900"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="maria@ejemplo.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="telefono"
            className="block text-sm font-semibold text-slate-900 mb-2"
          >
            Teléfono / WhatsApp *
          </label>
          <input
            type="tel"
            id="telefono"
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-900"
            value={formData.telefono}
            onChange={(e) =>
              setFormData({ ...formData, telefono: e.target.value })
            }
            placeholder="+34 600 123 456"
          />
        </div>

        <div>
          <label
            htmlFor="fechaLlegada"
            className="block text-sm font-semibold text-slate-900 mb-2"
          >
            Fecha llegada estimada *
          </label>
          <input
            type="date"
            id="fechaLlegada"
            required
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-900"
            value={formData.fechaLlegada}
            onChange={(e) =>
              setFormData({ ...formData, fechaLlegada: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="sector"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Sector de trabajo *
        </label>
        <select
          id="sector"
          required
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-200 outline-none transition-all text-slate-900"
          value={formData.sector}
          onChange={(e) =>
            setFormData({ ...formData, sector: e.target.value })
          }
        >
          <option value="">Selecciona tu sector</option>
          <option value="hosteleria">Hostelería (camarero, cocina, limpieza hoteles)</option>
          <option value="limpieza">Limpieza (edificios, oficinas, residencias)</option>
          <option value="almacen">Almacén / Logística</option>
          <option value="construccion">Construcción</option>
          <option value="cuidado">Cuidado de personas (ancianos, niños)</option>
          <option value="industria">Industria / Producción</option>
          <option value="admin">Administrativo / Oficina</option>
          <option value="otros">Otros</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="mensaje"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Cuéntanos un poco más (opcional)
        </label>
        <textarea
          id="mensaje"
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-900 resize-none"
          value={formData.mensaje}
          onChange={(e) =>
            setFormData({ ...formData, mensaje: e.target.value })
          }
          placeholder="Experiencia previa, nivel alemán, dudas específicas..."
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Enviando...
          </>
        ) : (
          <>
            Solicitar Mi Plaza
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-slate-500 text-center">
        * Campos obligatorios. No spam, prometido.
      </p>
    </form>
  );
}
