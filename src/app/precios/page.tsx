"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";
import { PLANS } from "@/lib/plans";
import { useSubscription } from "@/hooks/useSubscription";

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function PreciosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const sub = useSubscription();

  async function handleSubscribe() {
    const user = getUser();
    if (!user) {
      router.push("/?login=1");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          nombre: user.nombre,
          plan: "premium",
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Error al iniciar el pago");
      }
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  async function handlePortal() {
    const user = getUser();
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  }

  const plan = PLANS.premium;

  return (
    <main className="min-h-screen bg-[#F8F6F3] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
            +5.000 hispanohablantes confían en nosotros
          </span>
          <h1 className="text-4xl font-bold text-[#1a1a2e] mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Toma mejores decisiones en Suiza
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Herramientas, guías y asesoramiento para que tu vida en Suiza sea más fácil desde el primer día.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* Free */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-1">Gratuito</h2>
              <p className="text-gray-500 text-sm">Para empezar</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-800">CHF 0</span>
                <span className="text-gray-500 ml-1">/mes</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {["Artículos y guías básicas", "Newsletter semanal", "Acceso parcial a herramientas"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckIcon /> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 px-6 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Continuar gratis
            </button>
          </div>

          {/* Premium */}
          <div className="bg-[#1a1a2e] rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#C8102E] text-white text-xs font-bold px-3 py-1 rounded-full">
              MÁS POPULAR
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1">{plan.name}</h2>
              <p className="text-gray-400 text-sm">Acceso completo</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">CHF {plan.price_chf}</span>
                <span className="text-gray-400 ml-1">/mes</span>
              </div>
              <p className="text-gray-500 text-xs mt-1">Cancela cuando quieras</p>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 text-[#C8102E] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            {sub.loading ? (
              <div className="w-full py-3 rounded-xl bg-[#C8102E]/20 animate-pulse h-12" />
            ) : sub.active ? (
              <div className="space-y-3">
                <div className="bg-green-500/20 text-green-400 text-sm text-center py-2 rounded-lg font-medium">
                  ✓ Ya eres Premium
                </div>
                <button
                  onClick={handlePortal}
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-xl border border-gray-600 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                >
                  Gestionar suscripción
                </button>
              </div>
            ) : (
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-[#C8102E] text-white font-semibold hover:bg-[#a50d26] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Redirigiendo…" : "Suscribirme ahora"}
              </button>
            )}

            {error && (
              <p className="mt-3 text-red-400 text-xs text-center">{error}</p>
            )}
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          {[
            "🔒 Pago seguro con Stripe",
            "✅ Cancela en cualquier momento",
            "💳 Visa, Mastercard, PostFinance",
            "🇨🇭 Precios en CHF",
          ].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-[#1a1a2e] mb-6 text-center">
            Lo que dicen nuestros usuarios
          </h3>
          <div className="space-y-4">
            {[
              {
                text: "La calculadora de salario neto me ahorró horas de búsqueda. Negocié mi contrato con los números claros y conseguí un mejor salario.",
                name: "Carlos M.",
                location: "Madrid → Zúrich",
                emoji: "🇪🇸",
              },
              {
                text: "La cita con UNIA fue clave. Me ayudaron a reclamar horas extra que no me pagaban. Recuperé casi 2.000 CHF.",
                name: "Ana L.",
                location: "Bogotá → Ginebra",
                emoji: "🇨🇴",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-xl p-5 border border-gray-100">
                <p className="text-gray-600 text-sm mb-3 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{t.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-[#1a1a2e] mb-6 text-center" style={{ fontFamily: "Playfair Display, serif" }}>
            Preguntas frecuentes
          </h3>
          <div className="space-y-4">
            {[
              {
                q: "¿Puedo cancelar cuando quiera?",
                a: "Sí, puedes cancelar en cualquier momento desde tu perfil. No hay permanencia ni penalización.",
              },
              {
                q: "¿Qué métodos de pago aceptáis?",
                a: "Aceptamos todas las tarjetas de crédito y débito (Visa, Mastercard, Amex) y PostFinance Card.",
              },
              {
                q: "¿Se renueva automáticamente?",
                a: "Sí, la suscripción se renueva mensualmente. Te avisamos por email antes de cada cobro.",
              },
              {
                q: "¿Qué incluye el plan Premium?",
                a: "Acceso completo a todas las herramientas (calculadora de salario, comparador de ciudades, buscador de empleo), guías PDF descargables y soporte prioritario.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl p-5 border border-gray-100">
                <p className="font-semibold text-gray-800 mb-2">{q}</p>
                <p className="text-gray-600 text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
