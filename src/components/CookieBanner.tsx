"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "hs_cookie_consent";

export type ConsentValue = "all" | "essential" | null;

export function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem(CONSENT_KEY) as ConsentValue) ?? null;
}

export function setConsent(value: "all" | "essential") {
  localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent("hs-consent-change", { detail: value }));
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  const accept = (type: "all" | "essential") => {
    setConsent(type);
    setVisible(false);

    if (type === "all") {
      // GA4 will be loaded by the analytics component listening to the event
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      role="dialog"
      aria-label="Aviso de cookies"
    >
      <div
        className="max-w-3xl mx-auto rounded-2xl p-5 shadow-2xl"
        style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">🍪</span>
              <span className="text-white font-semibold text-sm">Usamos cookies</span>
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Usamos cookies esenciales para el funcionamiento del sitio y, con tu permiso, cookies de analítica (Google Analytics) para mejorar la experiencia.
              Sin coste para ti.{" "}
              <Link href="/cookies" className="text-[#C8102E] hover:underline">
                Más información
              </Link>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={() => accept("essential")}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#9CA3AF] transition-colors hover:text-white"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              Solo esenciales
            </button>
            <button
              onClick={() => accept("all")}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-colors hover:opacity-90"
              style={{ background: "#C8102E" }}
            >
              Aceptar todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
