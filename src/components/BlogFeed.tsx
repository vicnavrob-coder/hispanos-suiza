"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Post } from "@/lib/posts";

type Categoria = { slug: string; label: string; icono: string };
import { HistoriaComunidad, CIUDADES_SUIZA, TEMAS_HISTORIA } from "@/lib/historias-comunidad";

interface BlogFeedProps {
  posts: Post[];
  historias: HistoriaComunidad[];
  categorias: Categoria[];
}

// Función para fecha relativa
function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "ahora";
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)} h`;
  if (seconds < 604800) return `hace ${Math.floor(seconds / 86400)} d`;

  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}

// Tipo unificado para el feed
type FeedItem =
  | { type: "post"; data: Post; date: Date }
  | { type: "historia"; data: HistoriaComunidad; date: Date };

export default function BlogFeed({ posts, historias, categorias }: BlogFeedProps) {
  const { user, openModal } = useAuth();
  const [localHistorias, setLocalHistorias] = useState<HistoriaComunidad[]>(historias);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    titulo: "",
    contenido: "",
    ciudadSuiza: "",
    tema: "",
  });

  const charCount = form.contenido.length;

  // Combinar posts y historias en un feed unificado
  const feedItems: FeedItem[] = [
    ...posts.map((p): FeedItem => ({
      type: "post",
      data: p,
      date: new Date(p.fecha),
    })),
    ...localHistorias.map((h): FeedItem => ({
      type: "historia",
      data: h,
      date: new Date(h.publishedAt),
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return openModal();

    if (!form.titulo.trim() || charCount < 200) {
      setError("Título requerido y mínimo 200 caracteres");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/historias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          autorEmail: user.email,
          autorNombre: user.nombre,
          autorPais: user.pais,
          autorAvatar: user.picture,
          ...form,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setLocalHistorias((prev) => [data.historia, ...prev]);
        setForm({ titulo: "", contenido: "", ciudadSuiza: "", tema: "" });
        setIsExpanded(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(data.error ?? "Error al publicar");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryInfo = (slug: string) => categorias.find((c) => c.slug === slug);
  const getTemaLabel = (value: string) => TEMAS_HISTORIA.find((t) => t.value === value)?.label;

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Composer */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {success && (
          <div className="bg-green-50 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 border-b border-green-100">
            <span>✓</span>
            <span className="text-green-800 text-xs sm:text-sm font-medium">¡Publicado!</span>
          </div>
        )}

        {!isExpanded ? (
          <div
            onClick={() => user ? setIsExpanded(true) : openModal()}
            className="p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 overflow-hidden text-sm sm:text-base"
              style={{ background: user?.picture ? "transparent" : "#C8102E" }}
            >
              {user?.picture ? (
                <img src={user.picture} alt="" className="w-full h-full object-cover" />
              ) : (
                user?.nombre?.charAt(0).toUpperCase() ?? "?"
              )}
            </div>
            <div className="flex-1 bg-gray-100 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 text-gray-500 text-xs sm:text-sm">
              {user ? "Comparte tu experiencia en Suiza..." : "Inicia sesión para publicar..."}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold overflow-hidden"
                  style={{ background: user?.picture ? "transparent" : "#C8102E" }}
                >
                  {user?.picture ? (
                    <img src={user.picture} alt="" className="w-full h-full object-cover" />
                  ) : (
                    user?.nombre?.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-800">{user?.nombre}</span>
              </div>
              <button type="button" onClick={() => setIsExpanded(false)} className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 active:bg-gray-100 rounded-full min-w-[44px] min-h-[44px]">
                ✕
              </button>
            </div>

            <input
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              placeholder="Título de tu historia..."
              className="w-full text-base sm:text-lg font-semibold border-0 focus:ring-0 px-0 py-2 placeholder-gray-400"
            />
            <textarea
              name="contenido"
              value={form.contenido}
              onChange={handleChange}
              placeholder="Cuéntanos tu experiencia..."
              rows={4}
              className="w-full border-0 focus:ring-0 px-0 py-2 placeholder-gray-400 resize-none text-gray-700 text-sm sm:text-base"
            />

            <div className="flex flex-wrap gap-2 py-3 border-t border-gray-100">
              <select name="ciudadSuiza" value={form.ciudadSuiza} onChange={handleChange} className="text-xs sm:text-xs bg-gray-100 border-0 rounded-full px-3 py-2.5 sm:py-1.5 min-h-[48px] sm:min-h-[36px]">
                <option value="">📍 Ciudad</option>
                {CIUDADES_SUIZA.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select name="tema" value={form.tema} onChange={handleChange} className="text-xs sm:text-xs bg-gray-100 border-0 rounded-full px-3 py-2.5 sm:py-1.5 min-h-[48px] sm:min-h-[36px]">
                <option value="">🏷️ Tema</option>
                {TEMAS_HISTORIA.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>

            {error && <p className="text-red-600 text-xs mb-2">{error}</p>}

            <div className="flex justify-between items-center pt-2">
              <span className="text-[0.65rem] sm:text-xs text-gray-400">{charCount}/5000 (mín 200)</span>
              <button
                type="submit"
                disabled={isSubmitting || charCount < 200}
                className="bg-red-600 hover:bg-red-700 active:bg-red-800 active:scale-[0.98] disabled:bg-gray-300 text-white text-sm sm:text-sm font-semibold px-5 sm:px-5 py-3 sm:py-2 rounded-full min-h-[48px] transition-all"
              >
                {isSubmitting ? "..." : "Publicar"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Feed */}
      {feedItems.map((item, i) => (
        <article key={`${item.type}-${i}`} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm active:bg-gray-50 transition-all">
          {item.type === "post" ? (
            // Artículo del blog
            <Link href={`/blog/${item.data.slug}`} className="block p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-base sm:text-lg">{getCategoryInfo(item.data.categoria)?.icono ?? "📄"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">HispanosEnSuiza</span>
                    <span className="text-[0.65rem] sm:text-xs text-gray-400">· {timeAgo(item.data.fecha)}</span>
                  </div>
                  <span className="text-[0.65rem] sm:text-xs text-red-600 font-medium">
                    {getCategoryInfo(item.data.categoria)?.label}
                  </span>
                </div>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 leading-snug hover:text-red-700 transition-colors">
                {item.data.titulo}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-2.5 sm:mb-3">
                {item.data.descripcion}
              </p>

              <div className="flex items-center justify-between text-[0.65rem] sm:text-xs text-gray-400 pt-2.5 sm:pt-3 border-t border-gray-100">
                <span>{item.data.tiempoLectura} min de lectura</span>
                <span className="text-red-600 font-medium">Leer artículo →</span>
              </div>
            </Link>
          ) : (
            // Historia de la comunidad
            <Link href={`/historias-reales/${item.data.slug}`} className="block p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm overflow-hidden"
                  style={{ background: item.data.autorAvatar ? "transparent" : "#6366F1" }}
                >
                  {item.data.autorAvatar ? (
                    <img src={item.data.autorAvatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    item.data.autorNombre.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{item.data.autorNombre}</span>
                    <span className="text-[0.65rem] sm:text-xs text-gray-400 flex-shrink-0">· {timeAgo(item.data.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[0.65rem] sm:text-xs text-gray-500">
                    {item.data.autorPais && <span>{item.data.autorPais}</span>}
                    {item.data.ciudadSuiza && <span>→ {item.data.ciudadSuiza}</span>}
                  </div>
                </div>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 leading-snug hover:text-indigo-700 transition-colors">
                {item.data.titulo}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-2.5 sm:mb-3">
                {item.data.contenido.slice(0, 200)}...
              </p>

              <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-gray-100">
                <div className="flex gap-2">
                  {item.data.tema && (
                    <span className="text-[0.65rem] sm:text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                      {getTemaLabel(item.data.tema)}
                    </span>
                  )}
                </div>
                <span className="text-[0.65rem] sm:text-xs text-indigo-600 font-medium">Leer historia →</span>
              </div>
            </Link>
          )}
        </article>
      ))}

      {feedItems.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No hay publicaciones todavía</p>
        </div>
      )}
    </div>
  );
}
