"use client";

import { useState } from "react";

export default function NewsletterSignupForm() {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !nombre) {
      setStatus("error");
      setMessage("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          nombre: nombre.trim(),
          source: "landing-newsletter",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(
          data.already
            ? "Ya estás suscrito. ¡Revisa tu email cada jueves!"
            : "¡Bienvenido! Revisa tu email para confirmar la suscripción."
        );
        setEmail("");
        setNombre("");

        // Track conversion (Google Analytics / Plausible)
        if (typeof window !== "undefined" && (window as any).plausible) {
          (window as any).plausible("Newsletter Signup", {
            props: { source: "landing-newsletter" },
          });
        }
      } else {
        setStatus("error");
        setMessage(
          data.error || "Error al suscribirte. Inténtalo de nuevo."
        );
      }
    } catch (error) {
      setStatus("error");
      setMessage("Error de conexión. Inténtalo de nuevo.");
      console.error("Newsletter signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label
            htmlFor="nombre"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            👤 Tu nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: María García"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={loading}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            📧 Tu email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={loading}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-red-700 px-6 py-4 font-bold text-white shadow-lg transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Suscribiendo...
            </span>
          ) : (
            "🎁 Suscribirme Gratis"
          )}
        </button>

        {/* Status Messages */}
        {status === "success" && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-800">
            <div className="flex gap-2">
              <span>✅</span>
              <div>
                <div className="font-bold">¡Suscripción exitosa!</div>
                <div>{message}</div>
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
            <div className="flex gap-2">
              <span>❌</span>
              <div>
                <div className="font-bold">Error</div>
                <div>{message}</div>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <p className="text-center text-xs text-gray-500">
          Al suscribirte aceptas recibir emails semanales. Puedes cancelar
          cuando quieras. Consulta nuestra{" "}
          <a href="/privacidad" className="text-red-700 underline">
            política de privacidad
          </a>
          .
        </p>
      </form>
    </div>
  );
}
