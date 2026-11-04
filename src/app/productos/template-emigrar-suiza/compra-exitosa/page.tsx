import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "¡Compra exitosa! - Template Emigrar a Suiza",
  description: "Tu compra se ha completado correctamente. Revisa tu email para el link de descarga.",
  robots: "noindex, nofollow",
};

export default function CompraExitosaPage() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="max-w-[600px] mx-auto px-4 sm:px-6 py-12 text-center">
        <div
          className="rounded-2xl p-8 sm:p-12"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {/* Success icon */}
          <div className="mb-6">
            <div
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl"
              style={{ background: "#059669" }}
            >
              ✓
            </div>
          </div>

          <h1
            className="font-black mb-4 leading-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#ffffff", fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
          >
            ¡Pago completado! 🎉
          </h1>

          <p
            className="mb-8 text-base sm:text-lg"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}
          >
            Gracias por tu compra. Tu template está listo.
          </p>

          {/* Email notice */}
          <div
            className="rounded-xl p-6 mb-8"
            style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)" }}
          >
            <div className="flex items-start gap-3 text-left">
              <div className="text-2xl">📧</div>
              <div className="flex-1">
                <h3
                  className="font-bold text-base mb-2"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#10B981" }}
                >
                  Revisa tu email
                </h3>
                <p
                  className="text-sm mb-2"
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#E5E7EB" }}
                >
                  Te hemos enviado un email con el <strong>link de descarga del template</strong>.
                </p>
                <p
                  className="text-xs"
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}
                >
                  Si no lo ves en tu bandeja de entrada, revisa la carpeta de spam o promociones.
                </p>
              </div>
            </div>
          </div>

          {/* What's next */}
          <div
            className="rounded-xl p-6 mb-8 text-left"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <h3
              className="font-bold text-lg mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#ffffff" }}
            >
              📋 Qué hacer ahora:
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ background: "#C8102E", color: "#ffffff", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                >
                  1
                </div>
                <div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff" }}
                  >
                    Abre el email que te enviamos
                  </p>
                  <p
                    className="text-xs"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}
                  >
                    Busca "Tu Template para Emigrar a Suiza está listo"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ background: "#C8102E", color: "#ffffff", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                >
                  2
                </div>
                <div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff" }}
                  >
                    Haz clic en el botón "Descargar Template"
                  </p>
                  <p
                    className="text-xs"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}
                  >
                    Recibirás un archivo ZIP con 16 archivos
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ background: "#C8102E", color: "#ffffff", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                >
                  3
                </div>
                <div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff" }}
                  >
                    Descomprime y lee README.md
                  </p>
                  <p
                    className="text-xs"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}
                  >
                    Contiene todas las instrucciones de configuración
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div
            className="rounded-xl p-5 mb-8"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p
              className="text-sm mb-2"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff", fontWeight: 600 }}
            >
              ¿No recibiste el email?
            </p>
            <p
              className="text-sm"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}
            >
              Revisa tu carpeta de spam o escríbenos a{" "}
              <a href="mailto:soporte@hispanosensuiza.ch" style={{ color: "#C8102E", textDecoration: "underline" }}>
                soporte@hispanosensuiza.ch
              </a>
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full text-sm transition-opacity hover:opacity-85"
              style={{ background: "rgba(255,255,255,0.1)", color: "#ffffff", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              ← Volver al inicio
            </Link>
            <a
              href="mailto:soporte@hispanosensuiza.ch"
              className="flex-1 inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full text-sm transition-opacity hover:opacity-85"
              style={{ background: "#C8102E", color: "#ffffff", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              Contactar soporte
            </a>
          </div>

          {/* Guarantee */}
          <div className="pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p
              className="text-xs"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
            >
              ✅ <strong>Garantía 30 días:</strong> Si el template no cumple tus expectativas, reembolso completo sin preguntas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
