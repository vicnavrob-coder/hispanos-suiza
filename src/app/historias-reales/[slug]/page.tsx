import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getHistoriaBySlug, getHistorias, incrementViews, TEMAS_HISTORIA } from "@/lib/historias-comunidad";
import { buildMetadata, BASE_URL, breadcrumbSchema, articleSchema } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const historias = await getHistorias();
  if (!historias) return [];
  return historias.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const historia = await getHistoriaBySlug(slug);
  if (!historia) return {};

  const preview = historia.contenido.length > 160
    ? historia.contenido.slice(0, 160).trim() + "..."
    : historia.contenido;

  return buildMetadata({
    title: `${historia.titulo} — Historia de ${historia.autorNombre}`,
    description: preview,
    path: `/historias-reales/${slug}`,
    ogType: "article",
    publishedTime: historia.publishedAt,
    keywords: [
      "historia real suiza",
      historia.ciudadSuiza ? `vivir en ${historia.ciudadSuiza}` : "vivir en suiza",
      "experiencia emigrar suiza",
      "hispanohablantes suiza",
    ],
  });
}

export default async function HistoriaPage({ params }: Props) {
  const { slug } = await params;
  const historia = await getHistoriaBySlug(slug);

  if (!historia) {
    notFound();
  }

  // Incrementar vistas (fire-and-forget)
  incrementViews(slug).catch(() => {});

  const fecha = new Date(historia.publishedAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const temaLabel = TEMAS_HISTORIA.find((t) => t.value === historia.tema)?.label;

  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Historias reales", url: `${BASE_URL}/historias-reales` },
      { name: historia.titulo, url: `${BASE_URL}/historias-reales/${slug}` },
    ]),
    articleSchema({
      titulo: historia.titulo,
      descripcion: historia.contenido.slice(0, 160),
      slug: `historias-reales/${slug}`,
      fecha: historia.publishedAt,
      autor: historia.autorNombre,
    }),
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        <span aria-hidden>›</span>
        <Link href="/historias-reales" className="hover:text-red-700">Historias reales</Link>
        <span aria-hidden>›</span>
        <span className="text-gray-600 truncate max-w-[200px]">{historia.titulo}</span>
      </nav>

      {/* Header */}
      <article>
        <header className="mb-8">
          {/* Author info */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 overflow-hidden"
              style={{ background: historia.autorAvatar ? "transparent" : "#C8102E" }}
            >
              {historia.autorAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={historia.autorAvatar}
                  alt={historia.autorNombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                historia.autorNombre.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{historia.autorNombre}</p>
              <p className="text-sm text-gray-500">
                {historia.autorPais && `${historia.autorPais}`}
                {historia.autorPais && historia.ciudadSuiza && " → "}
                {historia.ciudadSuiza && historia.ciudadSuiza}
              </p>
              <p className="text-sm text-gray-400">{fecha}</p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            {historia.titulo}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {temaLabel && (
              <span className="text-sm bg-red-50 text-red-700 px-3 py-1 rounded-full">
                {temaLabel}
              </span>
            )}
            {historia.ciudadSuiza && (
              <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {historia.ciudadSuiza}
              </span>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="prose max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
            {historia.contenido}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-10 pt-8 border-t border-gray-100">
          {/* Stats */}
          {(historia.views ?? 0) > 0 && (
            <p className="text-sm text-gray-400 mb-6">
              {historia.views} {historia.views === 1 ? "persona ha leído" : "personas han leído"} esta historia
            </p>
          )}

          {/* Share CTA */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-2">¿Te ha resultado útil esta historia?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Tú también puedes compartir tu experiencia y ayudar a otros hispanohablantes que están pensando en emigrar a Suiza.
            </p>
            <Link
              href="/historias-reales/nueva"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
            >
              Compartir mi historia →
            </Link>
          </div>
        </footer>
      </article>

      {/* Back link */}
      <div className="mt-8 text-center">
        <Link
          href="/historias-reales"
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          ← Ver todas las historias
        </Link>
      </div>
    </div>
  );
}
