import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { allPosts as posts, categorias } from "@/lib/posts";
import Link from "next/link";
import { BASE_URL, buildMetadata, breadcrumbSchema, itemListSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog — Guías y artículos sobre vivir en Suiza",
  description: "Todas las guías, consejos y artículos sobre emigrar a Suiza, vivienda, trabajo, seguros y banca para hispanohablantes.",
  path: "/blog",
  keywords: ["blog suiza hispanohablantes", "guias vivir suiza", "articulos suiza espanol", "emigrar suiza guia"],
});

export default function BlogPage() {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Blog", url: `${BASE_URL}/blog` },
    ]),
    itemListSchema(
      posts.map((p) => ({
        name: p.titulo,
        url: `${BASE_URL}/blog/${p.slug}`,
        description: p.descripcion,
      }))
    ),
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="mb-8">
        <nav className="text-sm text-gray-400 mb-4 flex items-center gap-2" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-red-700">Inicio</Link>
          <span aria-hidden>›</span>
          <span className="text-gray-600">Blog</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Blog</h1>
        <p className="text-gray-500">Guías, consejos y experiencias reales sobre vivir en Suiza.</p>
      </div>

      {/* Filtro por categoría */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link href="/blog" className="bg-red-700 text-white text-sm px-4 py-1.5 rounded-full font-medium">
          Todos
        </Link>
        {categorias.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categorias/${cat.slug}`}
            className="bg-white border border-gray-200 text-gray-600 text-sm px-4 py-1.5 rounded-full hover:border-red-300 hover:text-red-700 transition-colors"
          >
            {cat.icono} {cat.label}
          </Link>
        ))}
      </div>

      {/* Grid de artículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} destacado />
        ))}
      </div>
    </div>
  );
}
