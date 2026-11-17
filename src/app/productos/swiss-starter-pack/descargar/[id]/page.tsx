import type { Metadata } from "next";
import Link from "next/link";
import { verifyDownloadId } from "@/lib/stripe-helpers";

export const metadata: Metadata = {
  title: "Descargar Swiss Starter Pack - HispanosEnSuiza",
  description: "Descarga tu Swiss Starter Pack completo",
  robots: "noindex, nofollow",
};

const BTN_PURPLE: React.CSSProperties = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#ffffff",
  fontFamily: "var(--font-dm-sans), system-ui, sans-serif"
};

export default async function DescargarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Verificar que el downloadId sea válido
  const isValid = await verifyDownloadId(id);

  if (!isValid) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div className="max-w-md w-full text-center">
          <div className="p-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.95)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div className="text-5xl mb-4">❌</div>
            <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair), serif", color: "#0A0A0A" }}>
              Link inválido
            </h1>
            <p className="mb-6" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
              Este link de descarga no es válido o ha expirado.
            </p>
            <Link
              href="/productos/swiss-starter-pack"
              className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full text-sm transition-opacity hover:opacity-85"
              style={{ background: "#667eea", color: "#ffffff", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              ← Volver al producto
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <div className="max-w-2xl w-full text-center">
        <div className="p-8 rounded-2xl mb-6" style={{ background: "rgba(255,255,255,0.95)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair), serif", color: "#0A0A0A" }}>
            ¡Tu Swiss Starter Pack está listo!
          </h1>
          <p className="text-lg mb-8" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
            Descarga todos los recursos para trabajar en Suiza
          </p>

          <a
            href="/swiss-starter-pack-v1.0.zip"
            download="swiss-starter-pack.zip"
            className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-base transition-opacity hover:opacity-85 active:scale-[0.98] w-full mb-4"
            style={BTN_PURPLE}
          >
            ⬇️ Descargar Swiss Starter Pack
          </a>

          <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#6B7280" }}>
            Archivo ZIP con eBook, plantillas y recursos incluidos
          </p>
        </div>

        {/* Instrucciones */}
        <div className="p-6 rounded-xl mb-6 text-left" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
          <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff" }}>
            📋 Qué hacer ahora:
          </h3>
          <ol className="space-y-3" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff", fontSize: "0.9rem" }}>
            <li><strong>1.</strong> Haz clic en el botón de arriba para descargar el ZIP</li>
            <li><strong>2.</strong> Descomprime el archivo (verás: eBook PDF, plantillas, calculadora, recursos)</li>
            <li><strong>3.</strong> Lee <strong>README.md</strong> primero para instrucciones y links de acceso</li>
            <li><strong>4.</strong> Abre el <strong>eBook PDF</strong> para empezar la guía paso a paso</li>
            <li><strong>5.</strong> Accede a la <strong>calculadora de salarios</strong> online (link en README)</li>
            <li><strong>6.</strong> Usa las <strong>plantillas en alemán</strong> para tu CV y cartas</li>
          </ol>
        </div>

        {/* Contenido */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
            <div className="text-3xl mb-2">📚</div>
            <p className="font-bold mb-1" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff", fontSize: "0.9rem" }}>
              eBook 70+
            </p>
            <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "rgba(255,255,255,0.7)" }}>
              Páginas PDF
            </p>
          </div>

          <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
            <div className="text-3xl mb-2">📝</div>
            <p className="font-bold mb-1" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff", fontSize: "0.9rem" }}>
              Plantillas
            </p>
            <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "rgba(255,255,255,0.7)" }}>
              En alemán
            </p>
          </div>

          <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
            <div className="text-3xl mb-2">💰</div>
            <p className="font-bold mb-1" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff", fontSize: "0.9rem" }}>
              Calculadora
            </p>
            <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "rgba(255,255,255,0.7)" }}>
              Salarios netos
            </p>
          </div>

          <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
            <div className="text-3xl mb-2">🔗</div>
            <p className="font-bold mb-1" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff", fontSize: "0.9rem" }}>
              Recursos
            </p>
            <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "rgba(255,255,255,0.7)" }}>
              Verificados 2026
            </p>
          </div>
        </div>

        {/* Support */}
        <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
          <p className="text-sm mb-2" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#ffffff" }}>
            ¿Problemas con la descarga?
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href="mailto:hispanosensuiza@gmail.com"
              className="text-sm font-semibold"
              style={{ color: "#FFE66D", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              📧 Contactar soporte
            </a>
            <Link
              href="/"
              className="text-sm font-semibold"
              style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              🏠 Ir a inicio
            </Link>
          </div>
        </div>

        <p className="text-xs mt-6" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "rgba(255,255,255,0.7)" }}>
          ✅ Garantía 30 días | 📥 Acceso de por vida | 🔒 Link privado
        </p>
      </div>
    </main>
  );
}
