import type { Metadata } from "next";
import Link from "next/link";
import { allPosts as posts, categorias } from "@/lib/posts";
import { getHistorias } from "@/lib/historias-comunidad";
import { BASE_URL, buildMetadata, breadcrumbSchema } from "@/lib/seo";
import BlogFeed from "@/components/BlogFeed";

export const metadata: Metadata = buildMetadata({
  title: "Blog y Comunidad — Guías y experiencias reales en Suiza",
  description: "Guías prácticas y experiencias reales de hispanohablantes viviendo en Suiza. Lee artículos y comparte tu historia.",
  path: "/blog",
  keywords: ["blog suiza hispanohablantes", "guias vivir suiza", "comunidad hispana suiza", "experiencias suiza"],
});

export default async function BlogPage() {
  const historiasComunidad = await getHistorias() ?? [];

  const schema = breadcrumbSchema([
    { name: "Inicio", url: BASE_URL },
    { name: "Blog", url: `${BASE_URL}/blog` },
  ]);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Comunidad</h1>
          <p className="text-gray-500 text-sm mt-1">
            Guías, experiencias y consejos de hispanohablantes en Suiza
          </p>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex gap-1">
            <Link
              href="/blog"
              className="px-4 py-3 text-sm font-medium text-gray-900 border-b-2 border-red-600"
            >
              Para ti
            </Link>
            {categorias.slice(0, 4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/categorias/${cat.slug}`}
                className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Feed principal */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <BlogFeed
          posts={posts}
          historias={historiasComunidad}
          categorias={categorias}
        />
      </div>
    </div>
  );
}
// 1793501816
