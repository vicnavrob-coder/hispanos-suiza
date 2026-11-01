"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const NAV_LINKS = [
  { href: "/trabajo",      label: "Trabajo" },
  { href: "/vivienda",     label: "Vivienda" },
  { href: "/ciudades",     label: "Ciudades" },
  { href: "/planes",       label: "Planes" },
  { href: "/seguros",      label: "Seguros" },
  { href: "/herramientas", label: "Herramientas" },
  { href: "/blog",         label: "Blog" },
];

const MOBILE_LINKS = [
  { href: "/trabajo",                label: "💼 Trabajo" },
  { href: "/trabajo/unia",           label: "⚖️ UNIA — Derechos laborales" },
  { href: "/trabajo/esqui-suiza",    label: "⛷️ Trabajo en estaciones de esquí" },
  { href: "/latinoamericanos",       label: "🌎 Emigrar desde Latinoamérica" },
  { href: "/vivienda",               label: "🏠 Vivienda" },
  { href: "/ciudades",               label: "🏙️ Ciudades" },
  { href: "/planes",                 label: "🏔️ Planes" },
  { href: "/seguros",                label: "🛡️ Seguros" },
  { href: "/herramientas",           label: "🔧 Herramientas" },
  { href: "/guias",                  label: "📋 Guías prácticas" },
  { href: "/blog",                   label: "📝 Blog" },
  { href: "/historias-reales",       label: "❤️ Historias reales" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, openModal } = useAuth();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <header
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid #E8E5E0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
        className="sticky top-0 z-50"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <span className="text-xl">🇨🇭</span>
              <div>
                <div
                  className="font-bold text-base leading-tight text-[#0A0A0A]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  HispanosEnSuiza
                </div>
                <div className="text-[10px] text-[#6B7280] leading-tight hidden sm:block">
                  La guía real para vivir en Suiza
                </div>
              </div>
            </Link>

            {/* Nav desktop */}
            <nav
              className="hidden md:flex items-center gap-1"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      color: active ? "#C8102E" : "#374151",
                      background: active ? "rgba(200,16,46,0.06)" : "transparent",
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => {
                      if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "#0A0A0A";
                    }}
                    onMouseLeave={(e) => {
                      if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "#374151";
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="ml-3 flex items-center gap-2">
                {user ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-[#F8F6F3] border border-[#E8E5E0] rounded-full pl-1.5 pr-3 py-1">
                      <div className="w-6 h-6 rounded-full bg-[#C8102E] flex items-center justify-center text-xs font-bold text-white">
                        {user.nombre.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-[#0A0A0A] font-medium truncate max-w-[100px]">
                        {user.nombre.split(" ")[0]}
                      </span>
                    </div>
                    <button
                      onClick={logout}
                      className="text-[#6B7280] hover:text-[#0A0A0A] text-xs transition-colors font-medium"
                    >
                      Salir
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => openModal()}
                    className="text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors shadow-sm"
                    style={{ background: "#C8102E", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#A00D24")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#C8102E")}
                  >
                    Acceder
                  </button>
                )}
              </div>
            </nav>

            {/* Hamburger mobile - 44x44 touch target */}
            <button
              className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-[#0A0A0A] active:bg-gray-100 rounded-full transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{
            background: "rgba(10,10,10,0.98)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-white">
              <span className="text-xl">🇨🇭</span>
              <span
                className="font-bold text-lg"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                HispanosEnSuiza
              </span>
            </div>
            {/* Close button - 44x44 touch target */}
            <button
              className="flex items-center justify-center w-11 h-11 -mr-2 text-white/70 active:bg-white/10 rounded-full transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User info mobile */}
          {user && (
            <div className="mx-6 mt-4 bg-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C8102E] flex items-center justify-center text-white font-bold">
                {user.nombre.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{user.nombre}</div>
                <div className="text-white/50 text-xs">{user.email}</div>
              </div>
            </div>
          )}

          <nav id="mobile-nav" className="flex flex-col gap-0.5 px-4 mt-3 flex-1 overflow-y-auto">
            {MOBILE_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium py-3.5 px-4 rounded-xl transition-colors active:bg-white/10"
                  style={{
                    color: active ? "#ffffff" : "rgba(255,255,255,0.8)",
                    background: active ? "rgba(200,16,46,0.25)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 py-4 space-y-3 border-t border-white/10 safe-bottom">
            {user ? (
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="block w-full border border-white/20 text-white font-semibold text-center py-4 rounded-2xl text-base active:bg-white/10 transition-colors"
              >
                Cerrar sesión
              </button>
            ) : (
              <button
                onClick={() => { setMenuOpen(false); openModal(); }}
                className="block w-full text-white font-bold text-center py-4 rounded-2xl text-base active:opacity-90 transition-opacity"
                style={{ background: "#C8102E" }}
              >
                Crear cuenta gratis →
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
