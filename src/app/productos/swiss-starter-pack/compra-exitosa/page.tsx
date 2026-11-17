import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "¡Compra exitosa! - Swiss Starter Pack",
  description: "Tu compra se ha completado correctamente. Revisa tu email para el link de descarga.",
  robots: "noindex, nofollow",
};

export default function CompraExitosaPage() {
  return (
    <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="max-w-[600px] mx-auto px-4 sm:px-6 py-12 text-center">
        <div
          className="rounded-2xl p-8 sm:p-12"
          style={{ background: "rgba(255,255,255,0.95)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
        >
          {/* Success icon */}
          <div className="mb-6">
            <div
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl"
              style={{ background: "#10B981", color: "#ffffff" }}
            >
              ✓
            </div>
          </div>

          <h1
            className="font-black mb-4 leading-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A", fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
          >
            ¡Pago completado! 🎉
          </h1>

          <p
            className="mb-8 text-base sm:text-lg"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
          >
            Gracias por tu compra. Tu Swiss Starter Pack está listo.
          </p>

          {/* Email notice */}
          <div
            className="rounded-xl p-6 mb-8"
            style={{ background: "#D1FAE5", border: "1px solid #059669" }}
          >
            <div className="flex items-start gap-3 text-left">
              <div className="text-2xl">📧</div>
              <div className="flex-1">
                <h3
                  className="font-bold text-base mb-2"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#059669" }}
                >
                  Revisa tu email ahora
                </h3>
                <p
                  className="text-sm mb-2"
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#374151" }}
                >
                  Te enviamos un email con el <strong>link de descarga del Swiss Starter Pack</strong> y todas las instrucciones.
                </p>
                <p
                  className="text-xs"
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
                >
                  Si no lo ves en tu bandeja de entrada, revisa la carpeta de spam o promociones.
                </p>
              </div>
            </div>
          </div>

          {/* What's included */}
          <div
            className="rounded-xl p-6 mb-8 text-left"
            style={{ background: "#F8F6F3", border: "1px solid #E8E5E0" }}
          >
            <h3
              className="font-bold text-lg mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#0A0A0A" }}
            >
              📦 Lo que recibirás:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <p className="text-sm" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#374151" }}>
                  <strong>eBook completo 70+ páginas PDF</strong> con toda la guía paso a paso
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <p className="text-sm" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#374151" }}>
                  <strong>Plantillas editables en alemán</strong> (CV, cartas de motivación)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <p className="text-sm" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#374151" }}>
                  <strong>Calculadora de salarios interactiva</strong> por cantón
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <p className="text-sm" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#374151" }}>
                  <strong>Directorio de recursos verificados 2026</strong>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <p className="text-sm" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#374151" }}>
                  <strong>Actualizaciones gratis</strong> hasta 2027
                </p>
              </div>
            </div>
          </div>

          {/* What's next */}
          <div
            className="rounded-xl p-6 mb-8 text-left"
            style={{ background: "#EEF2FF", border: "1px solid #667eea" }}
          >
            <h3
              className="font-bold text-lg mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#667eea" }}
            >
              📋 Próximos pasos:
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ background: "#667eea", color: "#ffffff", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                >
                  1
                </div>
                <div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#0A0A0A" }}
                  >
                    Abre el email que te enviamos
                  </p>
                  <p
                    className="text-xs"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
                  >
                    Busca "Tu Swiss Starter Pack está listo"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ background: "#667eea", color: "#ffffff", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                >
                  2
                </div>
                <div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#0A0A0A" }}
                  >
                    Haz clic en "Descargar Pack"
                  </p>
                  <p
                    className="text-xs"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
                  >
                    Recibirás un archivo ZIP con todos los recursos
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ background: "#667eea", color: "#ffffff", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                >
                  3
                </div>
                <div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#0A0A0A" }}
                  >
                    Lee el README.md primero
                  </p>
                  <p
                    className="text-xs"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
                  >
                    Contiene instrucciones y links de acceso
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ background: "#667eea", color: "#ffffff", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                >
                  4
                </div>
                <div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#0A0A0A" }}
                  >
                    Empieza con el eBook
                  </p>
                  <p
                    className="text-xs"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
                  >
                    Te guiará paso a paso en tu búsqueda de empleo
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div
            className="rounded-xl p-5 mb-8"
            style={{ background: "#FEF2F2", border: "1px solid #FEE2E2" }}
          >
            <p
              className="text-sm mb-2"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#0A0A0A", fontWeight: 600 }}
            >
              ¿No recibiste el email?
            </p>
            <p
              className="text-sm"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
            >
              Revisa tu carpeta de spam o escríbenos a{" "}
              <a href="mailto:hispanosensuiza@gmail.com" style={{ color: "#667eea", textDecoration: "underline" }}>
                hispanosensuiza@gmail.com
              </a>
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full text-sm transition-opacity hover:opacity-85"
              style={{ background: "#F8F6F3", color: "#0A0A0A", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              ← Volver al inicio
            </Link>
            <a
              href="mailto:hispanosensuiza@gmail.com"
              className="flex-1 inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full text-sm transition-opacity hover:opacity-85"
              style={{ background: "#667eea", color: "#ffffff", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              Contactar soporte
            </a>
          </div>

          {/* Guarantee */}
          <div className="pt-6" style={{ borderTop: "1px solid #E8E5E0" }}>
            <p
              className="text-xs"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
            >
              ✅ <strong>Garantía 30 días:</strong> Si el pack no cumple tus expectativas, reembolso completo sin preguntas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
