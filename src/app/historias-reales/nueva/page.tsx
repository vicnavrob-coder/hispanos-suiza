import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, BASE_URL, breadcrumbSchema } from "@/lib/seo";
import HistoriaForm from "@/components/HistoriaForm";

export const metadata: Metadata = buildMetadata({
  title: "Comparte tu historia — HispanosEnSuiza",
  description: "Cuenta tu experiencia viviendo en Suiza. Tu historia puede ayudar a miles de hispanohablantes que están pensando en emigrar.",
  path: "/historias-reales/nueva",
  noIndex: true, // No indexar página de creación
});

export default function NuevaHistoriaPage() {
  const schema = breadcrumbSchema([
    { name: "Inicio", url: BASE_URL },
    { name: "Historias reales", url: `${BASE_URL}/historias-reales` },
    { name: "Compartir historia", url: `${BASE_URL}/historias-reales/nueva` },
  ]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        <span aria-hidden>›</span>
        <Link href="/historias-reales" className="hover:text-red-700">Historias reales</Link>
        <span aria-hidden>›</span>
        <span className="text-gray-600">Nueva</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Comparte tu historia</h1>
        <p className="text-gray-500">
          Tu experiencia puede ayudar a miles de hispanohablantes que están donde tú estabas.
          Cuéntanos cómo fue tu llegada, qué aprendiste, qué consejos darías.
        </p>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
        <h2 className="font-semibold text-blue-800 mb-2">Consejos para una buena historia</h2>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Sé específico: fechas, ciudades, cantidades ayudan a otros</li>
          <li>• Comparte errores: lo que salió mal también enseña</li>
          <li>• Da contexto: tu situación inicial ayuda a que otros se identifiquen</li>
          <li>• Incluye consejos prácticos que te hubiera gustado saber</li>
        </ul>
      </div>

      {/* Formulario */}
      <HistoriaForm />

      {/* Footer info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400">
          Tu historia se publicará con tu nombre y se compartirá en nuestras redes sociales.
        </p>
        <Link
          href="/historias-reales"
          className="inline-block mt-4 text-sm text-red-600 hover:text-red-700 font-medium"
        >
          ← Volver a historias
        </Link>
      </div>
    </div>
  );
}
