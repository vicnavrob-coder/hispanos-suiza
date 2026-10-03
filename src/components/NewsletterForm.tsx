"use client";

import { useState, FormEvent } from "react";

type State = "idle" | "loading" | "ok" | "error";

export default function NewsletterForm() {
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
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setState("ok");
        setMsg(data.already ? "¡Ya estabas suscrito!" : "¡Suscrito! Revisa tu email.");
        setEmail("");
      } else {
        setState("error");
        setMsg(data.error ?? "Error al suscribir. Inténtalo de nuevo.");
      }
    } catch {
      setState("error");
      setMsg("Error de red. Inténtalo de nuevo.");
    }
  };

  if (state === "ok") {
    return (
      <div
        className="rounded-xl px-4 py-3 text-sm font-medium"
        style={{ background: "rgba(21,128,61,0.15)", border: "1px solid rgba(21,128,61,0.3)", color: "#4ade80" }}
      >
        ✓ {msg}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        required
        disabled={state === "loading"}
        className="rounded-xl px-4 py-2.5 text-sm placeholder-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#C8102E] transition-all text-white disabled:opacity-50"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        }}
      />
      {state === "error" && (
        <p className="text-xs text-red-400">{msg}</p>
      )}
      <button
        type="submit"
        disabled={state === "loading"}
        className="text-white text-sm font-semibold py-2.5 rounded-xl transition-all disabled:opacity-60"
        style={{ background: "#C8102E", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        {state === "loading" ? "Suscribiendo…" : "Suscribirme gratis"}
      </button>
    </form>
  );
}
