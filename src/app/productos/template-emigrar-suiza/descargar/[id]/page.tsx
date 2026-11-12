import type { Metadata } from "next";
import Link from "next/link";
import { verifyDownloadId } from "@/lib/stripe-helpers";

export const metadata: Metadata = {
  title: "Descargar Template - HispanosEnSuiza",
  description: "Descarga tu template para emigrar a Suiza",
  robots: "noindex, nofollow",
};

const BTN_RED: React.CSSProperties = {
  background: "#C8102E",
  color: "#ffffff",
  fontFamily: "var(--font-dm-sans), system-ui, sans-serif"
};

export default async function DescargarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Verificar que el downloadId sea válido
  const isValid = await verifyDownloadId(id);

  if (!isValid) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A0A0A" }}>
        <div className="max-w-md w-full text-center">
          <div className="p-8 rounded-2xl" style={{ background: "#111111", border: "1px solid #1F1F1F" }}>
            <div className="text-5xl mb-4">❌</div>
            <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair), serif", color: "#ffffff" }}>
              Link inválido
            </h1>
            <p className="mb-6" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}>
              Este link de descarga no es válido o ha expirado.
            </p>
            <Link
              href="/productos/template-emigrar-suiza"
              className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full text-sm transition-opacity hover:opacity-85"
              style={{ background: "#1F1F1F", color: "#ffffff", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              ← Volver al producto
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A0A0A" }}>
      <div className="max-w-2xl w-full text-center">
        <div className="p-8 rounded-2xl mb-6" style={{ background: "#111111", border: "1px solid #1F1F1F" }}>
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair), serif", color: "#ffffff" }}>
            ¡Tu template está listo!
          </h1>
          <p className="text-lg mb-8" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#9CA3AF" }}>
            Descarga tu template completo para emigrar a Suiza
          </p>

          <a
            href="/downloads/template-emigrar-suiza.zip"
            download="template-emigrar-suiza.zip"
            className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-base transition-opacity hover:opacity-85 active:scale-[0.98] w-full mb-4"
            style={BTN_RED}
          >
            ⬇️ Descargar Template (41 KB)
          </a>

          <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
            Archivo ZIP con 16 archivos incluidos
          </p>
        </div>

        {/* Instrucciones */}
        <div className="p-6 rounded-xl mb-6 text-left" style={{ background: "rgba(200, 16, 46, 0.05)", border: "1px solid rgba(200, 16, 46, 0.2)" }}>
          <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff" }}>
            📋 Qué hacer ahora:
          </h3>
          <ol className="space-y-3" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#E5E7EB", fontSize: "0.9rem" }}>
            <li><strong>1.</strong> Haz clic en el botón de arriba para descargar</li>
            <li><strong>2.</strong> Descomprime el archivo ZIP (verás 3 carpetas: databases, guias, plantillas)</li>
            <li><strong>3.</strong> Lee <strong>README.md</strong> primero para instrucciones detalladas</li>
            <li><strong>4.</strong> Importa los 4 archivos CSV a Notion o Excel</li>
            <li><strong>5.</strong> Empieza con <strong>01-registro-comuna-anmeldung.md</strong> (crítico primeros 14 días)</li>
          </ol>
        </div>

        {/* Contenido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg" style={{ background: "#111111", border: "1px solid #1F1F1F" }}>
            <div className="text-3xl mb-2">📋</div>
            <p className="font-bold mb-1" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff", fontSize: "0.9rem" }}>
              50 Pasos
            </p>
            <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
              Checklist completa
            </p>
          </div>

          <div className="p-4 rounded-lg" style={{ background: "#111111", border: "1px solid #1F1F1F" }}>
            <div className="text-3xl mb-2">📚</div>
            <p className="font-bold mb-1" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff", fontSize: "0.9rem" }}>
              7 Guías
            </p>
            <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
              1'975 líneas
            </p>
          </div>

          <div className="p-4 rounded-lg" style={{ background: "#111111", border: "1px solid #1F1F1F" }}>
            <div className="text-3xl mb-2">👥</div>
            <p className="font-bold mb-1" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff", fontSize: "0.9rem" }}>
              50+ Contactos
            </p>
            <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
              Verificados 2026
            </p>
          </div>
        </div>

        {/* Support */}
        <div className="p-4 rounded-lg" style={{ background: "#111111", border: "1px solid #1F1F1F" }}>
          <p className="text-sm mb-2" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#E5E7EB" }}>
            ¿Problemas con la descarga?
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href="mailto:soporte@hispanosensuiza.ch"
              className="text-sm font-semibold"
              style={{ color: "#C8102E", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              📧 Contactar soporte
            </a>
            <Link
              href="/"
              className="text-sm font-semibold"
              style={{ color: "#9CA3AF", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              🏠 Ir a inicio
            </Link>
          </div>
        </div>

        <p className="text-xs mt-6" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
          ✅ Garantía 30 días | 📥 Acceso de por vida | 🔒 Link privado
        </p>
      </div>
    </main>
  );
}
