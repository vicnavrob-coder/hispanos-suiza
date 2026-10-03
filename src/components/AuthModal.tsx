"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createMockGoogleCredential } from "@/lib/auth";

const IS_DEV = process.env.NODE_ENV === "development";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void;
          renderButton: (parent: HTMLElement, config: object) => void;
        };
      };
    };
  }
}

const GA_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export default function AuthModal() {
  const { showModal, closeModal, registerUser, loginUser, loginUserWithGoogle } = useAuth();

  const [emailOpen, setEmailOpen] = useState(false);
  const [isLogin, setIsLogin]     = useState(false);
  const [nombre, setNombre]       = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [error, setError]         = useState("");
  const [submitting, setSubmitting] = useState(false);

  const googleBtnRef = useRef<HTMLDivElement>(null);
  const googleInitRef = useRef(false);

  // Reset al abrir
  useEffect(() => {
    if (showModal) {
      setEmailOpen(false);
      setIsLogin(false);
      setError("");
      setNombre("");
      setEmail("");
      setPassword("");
      googleInitRef.current = false;
    }
  }, [showModal]);

  const initGoogle = useCallback(() => {
    if (!GA_CLIENT_ID || !window.google || !googleBtnRef.current || googleInitRef.current) return;
    googleInitRef.current = true;

    window.google.accounts.id.initialize({
      client_id: GA_CLIENT_ID,
      callback: (res: { credential: string }) => {
        const result = loginUserWithGoogle(res.credential);
        if (!result.ok) setError(result.error ?? "Error con Google.");
      },
    });

    window.google.accounts.id.renderButton(googleBtnRef.current, {
      type: "standard",
      theme: "filled_black",
      size: "large",
      text: "continue_with",
      shape: "rectangular",
      width: "320",
      logo_alignment: "left",
    });
  }, [loginUserWithGoogle]);

  // Renderizar botón Google cuando el modal abre
  useEffect(() => {
    if (!showModal || !GA_CLIENT_ID) return;

    if (window.google) {
      // Script ya cargado
      initGoogle();
    } else {
      // Esperar a que cargue
      const script = document.querySelector<HTMLScriptElement>(
        'script[src*="accounts.google.com/gsi/client"]'
      );
      if (script) {
        script.addEventListener("load", initGoogle);
        return () => script.removeEventListener("load", initGoogle);
      }
    }
  }, [showModal, initGoogle]);

  if (!showModal) return null;

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 80));

    if (!isLogin) {
      if (!nombre.trim()) { setError("Escribe tu nombre."); setSubmitting(false); return; }
      if (password.length < 6) { setError("Mínimo 6 caracteres."); setSubmitting(false); return; }
      const res = registerUser(email, password, nombre.trim());
      if (!res.ok) setError(res.error ?? "Error al crear cuenta.");
    } else {
      const res = loginUser(email, password);
      if (!res.ok) setError(res.error ?? "Email o contraseña incorrectos.");
    }
    setSubmitting(false);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-[360px] overflow-hidden"
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🇨🇭</span>
              <span
                className="font-black text-[#0A0A0A] text-base"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                HispanosEnSuiza
              </span>
            </div>
            <h2 className="font-bold text-[20px] text-[#0A0A0A] leading-tight">
              Accede gratis<br />a todas las herramientas
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#0A0A0A] transition-all flex-shrink-0 ml-2"
            aria-label="Cerrar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Beneficios rápidos */}
        <div className="px-6 pb-5">
          <div className="grid grid-cols-2 gap-1.5">
            {[
              "🧮 Calculadora de salario",
              "🏙️ Comparador de ciudades",
              "💼 Buscador de trabajo",
              "🏠 Portales de vivienda",
            ].map((b) => (
              <div
                key={b}
                className="text-xs text-[#374151] px-2.5 py-1.5 rounded-lg"
                style={{ background: "#F8F6F3" }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 space-y-3">
          {/* ── Botón Google ── */}
          {GA_CLIENT_ID ? (
            /* Botón real renderizado por GIS */
            <div
              ref={googleBtnRef}
              className="w-full overflow-hidden rounded-xl"
              style={{ minHeight: 44 }}
            />
          ) : IS_DEV ? (
            /* Simulador de desarrollo: recorre exactamente el mismo código */
            <DevGoogleButton onCredential={(cred) => {
              const result = loginUserWithGoogle(cred);
              if (!result.ok) setError(result.error ?? "Error simulando Google.");
            }} />
          ) : null}

          {/* ── Toggle email ── */}
          {!emailOpen ? (
            <button
              onClick={() => setEmailOpen(true)}
              className="w-full py-2.5 text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors font-medium"
            >
              Usar email y contraseña →
            </button>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-2.5 pt-1">
              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
                <span className="text-xs text-[#9CA3AF]">
                  {isLogin ? "Iniciar sesión" : "Crear cuenta"}
                </span>
                <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
              </div>

              {!isLogin && (
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  required
                  autoFocus
                  className="w-full rounded-xl px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#C8102E] transition-all"
                  style={{ border: "1.5px solid #E5E7EB" }}
                />
              )}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                autoFocus={isLogin}
                className="w-full rounded-xl px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#C8102E] transition-all"
                style={{ border: "1.5px solid #E5E7EB" }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isLogin ? "Contraseña" : "Contraseña (mín. 6 caracteres)"}
                required
                minLength={isLogin ? 1 : 6}
                className="w-full rounded-xl px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#C8102E] transition-all"
                style={{ border: "1.5px solid #E5E7EB" }}
              />

              {error && (
                <p className="text-xs text-red-600 px-1">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full text-white font-bold py-3 rounded-xl text-sm transition-all hover:opacity-90 disabled:opacity-60 active:scale-[0.98]"
                style={{ background: "#C8102E" }}
              >
                {submitting
                  ? "Un momento…"
                  : isLogin
                  ? "Entrar →"
                  : "Crear cuenta gratis →"}
              </button>

              <button
                type="button"
                onClick={() => { setIsLogin(!isLogin); setError(""); }}
                className="w-full text-center text-xs text-[#6B7280] hover:text-[#C8102E] transition-colors py-1"
              >
                {isLogin
                  ? "¿No tienes cuenta? Créala gratis"
                  : "¿Ya tienes cuenta? Inicia sesión"}
              </button>
            </form>
          )}
        </div>

        {/* Footer legal */}
        <div
          className="px-6 py-3 text-center"
          style={{ borderTop: "1px solid #F3F4F6" }}
        >
          <p className="text-xs text-[#9CA3AF]">
            Al acceder aceptas nuestra{" "}
            <a href="/privacidad" className="underline hover:text-[#374151] transition-colors">
              política de privacidad
            </a>
            . Sin spam. Gratis siempre.
          </p>
        </div>
      </div>
    </div>
  );
}

/** Solo visible en NODE_ENV=development. Simula exactamente lo que haría Google GIS. */
function DevGoogleButton({ onCredential }: { onCredential: (cred: string) => void }) {
  const [loading, setLoading]   = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName]         = useState("Ana García");
  const [email, setEmail]       = useState("ana.garcia@gmail.com");

  // Clic principal → registra inmediatamente sin pasos extra
  const simulate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setShowForm(false);
    await new Promise((r) => setTimeout(r, 600));
    onCredential(createMockGoogleCredential(name.trim(), email.trim()));
    setLoading(false);
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={simulate}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-sm font-semibold transition-all disabled:opacity-60 hover:bg-[#F9FAFB] active:scale-[0.98]"
        style={{ border: "1.5px solid #E5E7EB", color: "#374151", background: "#fff" }}
      >
        {loading ? (
          <svg className="w-4 h-4 animate-spin text-[#9CA3AF]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
        ) : <GoogleLogo />}
        {loading ? "Conectando con Google…" : "Continuar con Google"}
      </button>

      {/* Badge DEV + enlace para cambiar los datos de prueba */}
      <div className="flex items-center justify-center gap-1.5">
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
          style={{ background: "#FEF9C3", color: "#92400E", border: "1px solid #FDE68A" }}
        >
          DEV
        </span>
        <span className="text-[11px] text-[#9CA3AF]">
          Registrará como <strong className="text-[#374151]">{name}</strong>
        </span>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="text-[11px] text-[#C8102E] hover:underline font-medium"
        >
          {showForm ? "cerrar" : "cambiar"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={simulate}
          className="rounded-xl p-3 space-y-2"
          style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="w-full rounded-lg px-3 py-2 text-xs border border-[#FDE68A] bg-white focus:outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@gmail.com"
            className="w-full rounded-lg px-3 py-2 text-xs border border-[#FDE68A] bg-white focus:outline-none"
          />
          <button type="submit" className="w-full py-2 rounded-lg text-xs font-bold text-white" style={{ background: "#C8102E" }}>
            Usar estos datos →
          </button>
        </form>
      )}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
