import { notFound } from "next/navigation";
import { verifyDownloadId } from "@/lib/stripe-helpers";
import Link from "next/link";

interface PageProps {
  params: Promise<{ downloadId: string }>;
}

export default async function DescargarTemplatePage({ params }: PageProps) {
  const { downloadId } = await params;

  // Verificar que el downloadId sea válido
  const isValid = await verifyDownloadId(downloadId);

  if (!isValid) {
    notFound();
  }

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
            ¡Compra completada! 🎉
          </h1>

          <p
            className="mb-8 text-base sm:text-lg"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}
          >
            Tu template está listo para descargar
          </p>

          {/* Download button */}
          <a
            href="/template-emigrar-suiza-v1.0.zip"
            download="template-emigrar-suiza-v1.0.zip"
            className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-base transition-opacity hover:opacity-85 active:scale-[0.98] w-full sm:w-auto mb-6"
            style={{ background: "#C8102E", color: "#ffffff", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          >
            📥 Descargar Template (ZIP)
          </a>

          {/* Instructions */}
          <div
            className="rounded-xl p-6 mb-6 text-left"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <h3
              className="font-bold text-lg mb-3"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#ffffff" }}
            >
              🚀 Instrucciones rápidas:
            </h3>
            <ol
              className="space-y-2 text-sm"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#E5E7EB", paddingLeft: "20px" }}
            >
              <li>Descarga el archivo ZIP haciendo clic en el botón de arriba</li>
              <li>Descomprime todos los archivos (16 archivos en total)</li>
              <li>Lee <strong>README.md</strong> primero para instrucciones detalladas</li>
              <li>Importa los archivos CSV a Notion, Excel o Google Sheets</li>
              <li>Empieza con la <strong>Guía 01</strong> (Registro en la Comuna)</li>
            </ol>
          </div>

          {/* What's included */}
          <div
            className="rounded-xl p-6 mb-6 text-left"
            style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)" }}
          >
            <h3
              className="font-bold text-base mb-3"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#10B981" }}
            >
              📦 Qué incluye:
            </h3>
            <ul
              className="space-y-1.5 text-sm"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#E5E7EB", listStyle: "none" }}
            >
              <li>✓ Checklist de 50 pasos organizados</li>
              <li>✓ 7 guías completas (1'975 líneas)</li>
              <li>✓ Tracker de gastos con presupuesto</li>
              <li>✓ 50+ contactos verificados 2026</li>
              <li>✓ 3 plantillas listas para usar</li>
            </ul>
          </div>

          {/* Support */}
          <div className="mb-8">
            <p
              className="text-sm mb-2"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}
            >
              <strong>¿Necesitas ayuda?</strong>
            </p>
            <p
              className="text-sm"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
            >
              Escríbenos a{" "}
              <a href="mailto:soporte@hispanosensuiza.ch" style={{ color: "#C8102E", textDecoration: "underline" }}>
                soporte@hispanosensuiza.ch
              </a>
              <br />
              Respuesta en 24-48h hábiles
            </p>
          </div>

          {/* Back to site */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}
          >
            ← Volver a HispanosEnSuiza
          </Link>

          {/* Guarantee */}
          <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p
              className="text-xs"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
            >
              ✅ <strong>Garantía 30 días:</strong> Si el template no cumple tus expectativas, reembolso completo sin preguntas
            </p>
          </div>
        </div>

        {/* Note */}
        <p
          className="mt-6 text-xs"
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}
        >
          Guarda este link en un lugar seguro. Puedes volver a descargar el template cuando quieras.
        </p>
      </div>
    </div>
  );
}
