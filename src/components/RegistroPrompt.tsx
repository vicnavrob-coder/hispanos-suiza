"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const DISMISS_KEY = "hs_registro_prompt_dismissed";
const SCROLL_THRESHOLD = 0.55; // aparece al 55% de scroll
const TIME_THRESHOLD_MS = 25_000; // o a los 25 segundos

export default function RegistroPrompt() {
  const { user, openModal } = useAuth();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // No mostrar si ya está logueado o ya lo descartó esta sesión
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    let triggered = false;

    const trigger = () => {
      if (triggered) return;
      triggered = true;
      // Pequeño delay visual antes de animar la entrada
      setTimeout(() => setVisible(true), 300);
    };

    // Trigger por scroll
    const onScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= SCROLL_THRESHOLD) trigger();
    };

    // Trigger por tiempo
    const timer = setTimeout(trigger, TIME_THRESHOLD_MS);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  };

  const handleCTA = () => {
    dismiss();
    openModal();
  };

  // No renderizar nada si el usuario ya está logueado
  if (!mounted || user) return null;

  return (
    <div
      className="fixed bottom-6 right-5 z-40 w-[calc(100%-2.5rem)] max-w-[300px] transition-all duration-500 ease-out"
      style={{
        transform: visible ? "translateY(0)" : "translateY(120%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      role="complementary"
      aria-label="Invitación a registrarse"
    >
      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        {/* Barra de color superior */}
        <div className="h-1" style={{ background: "#C8102E" }} />

        <div className="p-5">
          {/* Cabecera */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🇨🇭</span>
              <span
                className="text-white font-bold text-sm"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Accede a todo, gratis
              </span>
            </div>
            <button
              onClick={dismiss}
              className="text-[#4B5563] hover:text-white transition-colors ml-2 flex-shrink-0 -mt-0.5"
              aria-label="Cerrar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Beneficios */}
          <ul
            className="space-y-1.5 mb-4"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          >
            {[
              { icon: "🧮", text: "Calculadora de salario neto" },
              { icon: "🏙️", text: "Comparador de 11 ciudades" },
              { icon: "💼", text: "Buscador de trabajo en Suiza" },
              { icon: "🏠", text: "Portales de vivienda filtrados" },
            ].map((b) => (
              <li key={b.text} className="flex items-center gap-2">
                <span className="text-sm">{b.icon}</span>
                <span className="text-xs text-[#9CA3AF]">{b.text}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={handleCTA}
            className="w-full text-white font-semibold text-sm py-2.5 rounded-xl transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              background: "#C8102E",
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            }}
          >
            Crear cuenta gratis →
          </button>

          <p
            className="text-center text-xs text-[#4B5563] mt-2"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          >
            Sin tarjeta · Sin spam
          </p>
        </div>
      </div>
    </div>
  );
}
