import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, allPosts as posts, allPosts, categorias } from "@/lib/posts";
import { BASE_URL, buildMetadata, articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";
import RespuestaRapida from "@/components/RespuestaRapida";

type Props = PageProps<"/blog/[slug]">;

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.titulo,
    description: post.descripcion,
    path: `/blog/${slug}`,
    ogType: "article",
    publishedTime: post.fecha,
    keywords: post.palabrasClave,
    ogImage: post.imagen?.startsWith("/images/")
      ? `${BASE_URL}${post.imagen}`
      : undefined,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const cat = categorias.find((c) => c.slug === post.categoria);
  const relacionados = allPosts
    .filter((p) => p.slug !== post.slug && p.categoria === post.categoria)
    .slice(0, 3);
  const fecha = new Date(post.fecha).toLocaleDateString("es-ES", {
    day: "numeric", month: "long", year: "numeric",
  });

  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Blog", url: `${BASE_URL}/blog` },
      { name: cat?.label ?? post.categoria, url: `${BASE_URL}/categorias/${post.categoria}` },
      { name: post.titulo, url: `${BASE_URL}/blog/${post.slug}` },
    ]),
    articleSchema({
      titulo: post.titulo,
      descripcion: post.descripcion,
      slug: post.slug,
      fecha: post.fecha,
      fechaModificada: post.fechaModificada,
      categoria: cat?.label,
      tiempoLectura: post.tiempoLectura,
      imagen: post.imagen?.startsWith("/images/") ? `${BASE_URL}${post.imagen}` : undefined,
      autor: post.autor,
    }),
    ...(post.faq?.length ? [faqSchema(post.faq)] : []),
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Artículo principal */}
        <article className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-red-700">Inicio</Link>
            <span aria-hidden>›</span>
            <Link href="/blog" className="hover:text-red-700">Blog</Link>
            <span aria-hidden>›</span>
            <Link href={`/categorias/${post.categoria}`} className="hover:text-red-700">{cat?.label}</Link>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold text-red-700 bg-red-50 px-3 py-1 rounded-full">
                {cat?.icono} {cat?.label}
              </span>
              <span className="text-sm text-gray-400">{post.tiempoLectura} min de lectura</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
              {post.titulo}
            </h1>
            <p className="text-lg text-gray-500 mb-4">{post.descripcion}</p>
            <div className="flex items-center gap-3 text-sm text-gray-400 pb-6 border-b border-gray-100">
              <span>📅 {fecha}</span>
              <span>·</span>
              <span>✍️ {post.autor ?? "Equipo HispanosEnSuiza"}</span>
            </div>
          </div>

          {/* Respuesta rápida — featured snippet */}
          {post.faq?.[0] && (
            <RespuestaRapida
              pregunta={post.faq[0].pregunta}
              respuesta={post.faq[0].respuesta}
            />
          )}

          {/* Contenido */}
          {post.contenido ? (
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.contenido }}
            />
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
              <p className="text-amber-700 font-medium">Artículo completo próximamente.</p>
              <p className="text-amber-600 text-sm mt-1">Suscríbete para recibir una notificación cuando esté listo.</p>
            </div>
          )}

          {/* FAQ Section — si el post tiene preguntas frecuentes */}
          {post.faq?.length ? (
            <div className="mt-10 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas frecuentes</h2>
              <div className="space-y-5">
                {post.faq.map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800 mb-2">{item.pregunta}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.respuesta}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* CTA afiliados */}
          <div style={{ background: "linear-gradient(135deg, #C8102E, #A00D24)" }} className="text-white rounded-2xl p-6 mt-10">
            <h3 className="font-bold text-lg mb-2">¿Necesitas seguro médico en Suiza?</h3>
            <p className="text-red-100 text-sm mb-4">
              Compara las mejores aseguradoras y ahorra hasta 1.200 CHF al año. Obligatorio para todos los residentes.
            </p>
            <a
              href="https://www.comparis.ch/krankenkassen/index"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block bg-white text-red-700 font-bold px-5 py-2.5 rounded-full hover:bg-red-50 transition-colors text-sm"
            >
              Comparar seguros →
            </a>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          {/* Newsletter */}
          <div className="bg-gray-900 text-white rounded-2xl p-5 mb-6">
            <h3 className="font-bold mb-1">Newsletter semanal</h3>
            <p className="text-gray-400 text-xs mb-3">Lo más útil sobre vivir en Suiza, cada semana.</p>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 mb-2"
            />
            <button
              style={{ background: "#C8102E" }}
              className="w-full text-white text-sm font-semibold py-2 rounded-lg hover:opacity-90"
            >
              Suscribirme gratis
            </button>
          </div>

          {/* Categorías */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">Categorías</h3>
            <ul className="space-y-2">
              {categorias.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categorias/${c.slug}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-700 transition-colors"
                  >
                    <span>{c.icono}</span>
                    <span>{c.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Herramientas */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
            <h3 className="font-bold text-gray-800 mb-1 text-sm">🧮 Herramientas</h3>
            <p className="text-xs text-gray-500 mb-3">Calcula tu salario neto, compara ciudades y más.</p>
            <Link
              href="/herramientas"
              className="inline-block text-sm font-semibold text-blue-700 hover:underline"
            >
              Ver herramientas →
            </Link>
          </div>

          {/* Artículos relacionados */}
          {relacionados.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 mt-6">
              <h3 className="font-bold text-gray-800 mb-3 text-sm">Artículos relacionados</h3>
              <ul className="space-y-3">
                {relacionados.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="text-sm text-gray-700 hover:text-red-700 leading-snug block transition-colors"
                    >
                      {r.titulo}
                    </Link>
                    <span className="text-xs text-gray-400">{r.tiempoLectura} min</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
