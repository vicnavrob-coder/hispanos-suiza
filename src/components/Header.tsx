"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const NAV_LINKS = [
  { href: "/trabajo",      label: "Trabajo" },
  { href: "/vivienda",     label: "Vivienda" },
  { href: "/seguros",      label: "Seguros" },
  { href: "/herramientas", label: "Herramientas" },
  { href: "/blog",         label: "Blog" },
];

const MOBILE_LINKS = [
  { href: "/trabajo",          label: "💼 Trabajo" },
  { href: "/vivienda",         label: "🏠 Vivienda" },
  { href: "/seguros",          label: "🛡️ Seguros" },
  { href: "/herramientas",     label: "🔧 Herramientas" },
  { href: "/blog",             label: "📝 Blog" },
  { href: "/historias-reales", label: "❤️ Historias reales" },
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
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between h-16" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
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

            {/* Hamburger mobile */}
            <button
              className="md:hidden text-[#0A0A0A] hover:text-[#C8102E] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
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
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-white">
              <span className="text-xl">🇨🇭</span>
              <span
                className="font-bold text-lg"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                HispanosEnSuiza
              </span>
            </div>
            <button
              className="text-white/70 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <nav className="flex flex-col gap-1 px-6 mt-4 flex-1">
            {MOBILE_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-medium py-3 px-4 rounded-xl transition-colors"
                  style={{
                    color: active ? "#ffffff" : "rgba(255,255,255,0.75)",
                    background: active ? "rgba(200,16,46,0.2)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-6 py-6 space-y-3 border-t border-white/10">
            {user ? (
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="block w-full border border-white/20 text-white font-semibold text-center py-3 rounded-2xl text-base hover:bg-white/10 transition-colors"
              >
                Cerrar sesión
              </button>
            ) : (
              <button
                onClick={() => { setMenuOpen(false); openModal(); }}
                className="block w-full text-white font-bold text-center py-3.5 rounded-2xl text-base transition-colors"
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
