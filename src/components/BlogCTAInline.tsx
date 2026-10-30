"use client";

import { useState, FormEvent } from "react";

type State = "idle" | "loading" | "ok" | "error";

/**
 * CTA de captación que se inserta inline dentro del contenido del blog
 * Diseñado para aparecer después de los primeros párrafos del artículo
 */
export default function BlogCTAInline({
  variant = "newsletter"
}: {
  variant?: "newsletter" | "checklist"
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setState("loading");
    setMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          source: variant === "checklist" ? "checklist_cta" : "blog_inline"
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setState("ok");
        setMsg(variant === "checklist"
          ? "Checklist enviada a tu email"
          : "Suscrito correctamente");
        setEmail("");
      } else {
        setState("error");
        setMsg(data.error ?? "Error. Inténtalo de nuevo.");
      }
    } catch {
      setState("error");
      setMsg("Error de red. Inténtalo de nuevo.");
    }
  };

  if (state === "ok") {
    return (
      <div className="my-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">🎉</div>
        <p className="text-green-800 font-semibold">{msg}</p>
        {variant === "checklist" && (
          <p className="text-green-600 text-sm mt-1">Revisa tu bandeja de entrada (y spam)</p>
        )}
      </div>
    );
  }

  if (variant === "checklist") {
    return (
      <div className="my-8 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl flex-shrink-0">📋</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 mb-1 text-lg">
              Checklist: primeros 30 días en Suiza
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              PDF gratuito con los 27 trámites que tienes que hacer al llegar, en orden.
              Incluye enlaces directos y plazos legales.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                disabled={state === "loading"}
                className="flex-1 px-4 py-2.5 text-sm border border-amber-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                  disabled:opacity-50 bg-white"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold
                  text-sm rounded-lg transition-colors disabled:opacity-60 whitespace-nowrap"
              >
                {state === "loading" ? "Enviando..." : "Enviar checklist"}
              </button>
            </form>
            {state === "error" && (
              <p className="text-xs text-red-500 mt-2">{msg}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              Sin spam. Te suscribes también a tips semanales.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default: newsletter CTA
  return (
    <div className="my-8 bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0">🇨🇭</div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 mb-1 text-lg">
            ¿Te está siendo útil esta guía?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Cada semana enviamos guías prácticas, ofertas de trabajo y experiencias reales
            de la comunidad hispana en Suiza. Gratis y sin spam.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={state === "loading"}
              className="flex-1 px-4 py-2.5 text-sm border border-red-200 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent
                disabled:opacity-50 bg-white"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold
                text-sm rounded-lg transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {state === "loading" ? "Suscribiendo..." : "Suscribirme gratis"}
            </button>
          </form>
          {state === "error" && (
            <p className="text-xs text-red-500 mt-2">{msg}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            +4.200 hispanos ya suscritos
          </p>
        </div>
      </div>
    </div>
  );
}
