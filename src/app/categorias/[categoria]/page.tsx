import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { categorias, getPostsByCategoria } from "@/lib/posts";
import Link from "next/link";
import { BASE_URL, buildMetadata, breadcrumbSchema, itemListSchema } from "@/lib/seo";

type Props = PageProps<"/categorias/[categoria]">;

export async function generateStaticParams() {
  return categorias.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const cat = categorias.find((c) => c.slug === categoria);
  if (!cat) return {};
  return buildMetadata({
    title: `${cat.label} en Suiza — Guías para hispanohablantes`,
    description: `Guías completas y artículos verificados sobre ${cat.label.toLowerCase()} en Suiza para españoles y latinoamericanos. Información real y actualizada.`,
    path: `/categorias/${categoria}`,
    keywords: [`${cat.label.toLowerCase()} suiza`, `${categoria} suiza hispanohablantes`, `guia ${categoria} suiza`],
  });
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  const cat = categorias.find((c) => c.slug === categoria);
  if (!cat) notFound();

  const articulosCategoria = getPostsByCategoria(categoria);
  const otrasCategoria = categorias.filter((c) => c.slug !== categoria);

  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Blog", url: `${BASE_URL}/blog` },
      { name: cat.label, url: `${BASE_URL}/categorias/${categoria}` },
    ]),
    ...(articulosCategoria.length > 0
      ? [itemListSchema(articulosCategoria.map((p) => ({
          name: p.titulo,
          url: `${BASE_URL}/blog/${p.slug}`,
          description: p.descripcion,
        })))]
      : []),
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        <span aria-hidden>›</span>
        <Link href="/blog" className="hover:text-red-700">Blog</Link>
        <span aria-hidden>›</span>
        <span className="text-gray-600">{cat.label}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{cat.icono}</span>
            <h1 className="text-3xl font-bold text-gray-800">{cat.label}</h1>
          </div>
          <p className="text-gray-500 mb-8">
            {articulosCategoria.length} artículo{articulosCategoria.length !== 1 ? "s" : ""} sobre {cat.label.toLowerCase()} para hispanohablantes en Suiza.
          </p>

          {articulosCategoria.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articulosCategoria.map((post) => (
                <ArticleCard key={post.slug} post={post} destacado />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10 text-center">
              <p className="text-gray-500 mb-2">Próximamente artículos sobre este tema.</p>
              <p className="text-sm text-gray-400">Suscríbete para ser el primero en recibirlos.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">Otros temas</h3>
            <ul className="space-y-2">
              {otrasCategoria.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categorias/${c.slug}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-700 transition-colors py-1"
                  >
                    <span>{c.icono}</span>
                    <span>{c.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-900 text-white rounded-2xl p-5">
            <h3 className="font-bold mb-1 text-sm">Newsletter semanal</h3>
            <p className="text-gray-400 text-xs mb-3">Lo más útil sobre vivir en Suiza, cada semana.</p>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 mb-2 focus:outline-none focus:border-red-500"
            />
            <button
              style={{ background: "#C0392B" }}
              className="w-full text-white text-sm font-semibold py-2 rounded-lg hover:opacity-90"
            >
              Suscribirme gratis
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
