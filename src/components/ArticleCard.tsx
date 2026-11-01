import Link from "next/link";
import { Post, categorias } from "@/lib/posts";

const CATEGORY_COLORS: Record<string, string> = {
  emigrar:      "#C8102E",
  vivienda:     "#1d4ed8",
  trabajo:      "#C8102E",
  banca:        "#15803d",
  seguros:      "#7c3aed",
  "vida-diaria": "#b45309",
};

const CATEGORY_BG: Record<string, string> = {
  emigrar:      "#FFF1F3",
  vivienda:     "#EFF6FF",
  trabajo:      "#FFF1F3",
  banca:        "#F0FDF4",
  seguros:      "#F5F3FF",
  "vida-diaria": "#FFFBEB",
};

export default function ArticleCard({ post, destacado = false }: { post: Post; destacado?: boolean }) {
  const cat = categorias.find(c => c.slug === post.categoria);
  const fecha = new Date(post.fecha).toLocaleDateString("es-ES", {
    day: "numeric", month: "short", year: "numeric"
  });
  const accentColor = CATEGORY_COLORS[post.categoria] ?? "#C8102E";
  const badgeBg = CATEGORY_BG[post.categoria] ?? "#FFF1F3";

  if (destacado) {
    return (
      <Link href={`/blog/${post.slug}`} className="block group">
        <article
          className="bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-200 active:scale-[0.98] hover:-translate-y-1 hover:shadow-lg"
          style={{
            border: "1px solid #E8E5E0",
            borderLeft: `4px solid ${accentColor}`,
          }}
        >
          <div className="p-4 sm:p-6">
            {/* Category badge */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span
                className="text-[0.65rem] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                style={{
                  color: accentColor,
                  background: badgeBg,
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                }}
              >
                {cat?.icono} {cat?.label ?? post.categoria}
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-bold text-[#0A0A0A] mb-2 leading-snug group-hover:text-[#C8102E] transition-colors text-base sm:text-lg"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              {post.titulo}
            </h2>

            {/* Description */}
            <p
              className="text-[#6B7280] text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 line-clamp-3"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              {post.descripcion}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 sm:pt-4" style={{ borderTop: "1px solid #E8E5E0" }}>
              <span
                className="text-[0.65rem] sm:text-xs text-[#9CA3AF]"
                style={{ fontFamily: "'DM Mono', 'Courier New', monospace" }}
              >
                {fecha} · {post.tiempoLectura} min
              </span>
              <span
                className="text-xs sm:text-sm font-semibold group-hover:underline"
                style={{ color: "#C8102E", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              >
                Leer más →
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article
        className="bg-white rounded-lg sm:rounded-xl p-3.5 sm:p-5 transition-all duration-200 active:scale-[0.99] hover:-translate-y-0.5 hover:shadow-md flex gap-3 sm:gap-4 items-start"
        style={{
          border: "1px solid #E8E5E0",
          borderLeft: `4px solid ${accentColor}`,
        }}
      >
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg sm:text-xl"
          style={{ background: badgeBg }}
        >
          {cat?.icono ?? "📄"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[0.65rem] sm:text-xs font-semibold"
              style={{
                color: accentColor,
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              }}
            >
              {cat?.label ?? post.categoria}
            </span>
          </div>
          <h3
            className="font-semibold text-[#0A0A0A] group-hover:text-[#C8102E] transition-colors leading-snug mb-1 line-clamp-2 text-sm sm:text-base"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
          >
            {post.titulo}
          </h3>
          <span
            className="text-[0.65rem] sm:text-xs text-[#9CA3AF]"
            style={{ fontFamily: "'DM Mono', 'Courier New', monospace" }}
          >
            {fecha} · {post.tiempoLectura} min
          </span>
        </div>
      </article>
    </Link>
  );
}
