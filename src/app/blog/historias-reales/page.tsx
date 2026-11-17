import type { Metadata } from "next";
import Link from "next/link";
import { categorias } from "@/lib/posts";
import { getHistorias } from "@/lib/historias-comunidad";
import { BASE_URL, buildMetadata, breadcrumbSchema } from "@/lib/seo";
import HistoriasFeed from "@/components/HistoriasFeed";

export const metadata: Metadata = buildMetadata({
  title: "Historias reales de hispanohablantes en Suiza",
  description: "Experiencias reales de españoles y latinoamericanos viviendo en Suiza. Lee historias de la comunidad y comparte la tuya.",
  path: "/blog/historias-reales",
  keywords: ["historias reales suiza", "experiencias españoles suiza", "vivir en suiza testimonios", "comunidad hispana suiza"],
});

export default async function HistoriasRealesBlogPage() {
  const historiasComunidad = await getHistorias() ?? [];

  const schema = breadcrumbSchema([
    { name: "Inicio", url: BASE_URL },
    { name: "Blog", url: `${BASE_URL}/blog` },
    { name: "Historias reales", url: `${BASE_URL}/blog/historias-reales` },
  ]);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Historias reales</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1">
            Experiencias de hispanohablantes viviendo en Suiza
          </p>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex gap-0 sm:gap-1 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <Link
              href="/blog"
              className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900 active:bg-gray-100 transition-colors whitespace-nowrap flex-shrink-0"
            >
              Para ti
            </Link>
            <Link
              href="/blog/historias-reales"
              className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 border-b-2 border-red-600 whitespace-nowrap flex-shrink-0"
            >
              ❤️ Historias reales
            </Link>
            {categorias.slice(0, 3).map((cat) => (
              <Link
                key={cat.slug}
                href={`/categorias/${cat.slug}`}
                className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900 active:bg-gray-100 transition-colors whitespace-nowrap flex-shrink-0"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Feed de historias */}
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <HistoriasFeed initialHistorias={historiasComunidad} />
      </div>
    </div>
  );
}
