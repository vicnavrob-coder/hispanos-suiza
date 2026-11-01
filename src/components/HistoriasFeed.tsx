"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { CIUDADES_SUIZA, TEMAS_HISTORIA, type HistoriaComunidad } from "@/lib/historias-comunidad";
import Link from "next/link";

interface HistoriasFeedProps {
  initialHistorias: HistoriaComunidad[];
}

export default function HistoriasFeed({ initialHistorias }: HistoriasFeedProps) {
  const { user, openModal } = useAuth();
  const [historias, setHistorias] = useState<HistoriaComunidad[]>(initialHistorias);
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
  const minChars = 200;
  const maxChars = 5000;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      openModal();
      return;
    }

    setError("");

    // Validaciones
    if (!form.titulo.trim()) {
      setError("Añade un título a tu historia");
      return;
    }
    if (charCount < minChars) {
      setError(`Tu historia debe tener al menos ${minChars} caracteres`);
      return;
    }
    if (charCount > maxChars) {
      setError(`Tu historia no puede superar ${maxChars} caracteres`);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/historias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          autorEmail: user.email,
          autorNombre: user.nombre,
          autorPais: user.pais,
          autorAvatar: user.picture,
          titulo: form.titulo.trim(),
          contenido: form.contenido.trim(),
          ciudadSuiza: form.ciudadSuiza || undefined,
          tema: form.tema || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        // Añadir la nueva historia al feed
        setHistorias((prev) => [data.historia, ...prev]);
        setForm({ titulo: "", contenido: "", ciudadSuiza: "", tema: "" });
        setIsExpanded(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.error ?? "Error al publicar");
      }
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const temaLabel = (value: string) =>
    TEMAS_HISTORIA.find((t) => t.value === value)?.label ?? value;

  return (
    <div>
      {/* Composer - Caja para escribir */}
      <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm">
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3">
            <span className="text-xl sm:text-2xl">🎉</span>
            <div>
              <p className="font-semibold text-green-800 text-sm sm:text-base">¡Historia publicada!</p>
              <p className="text-xs sm:text-sm text-green-600">Ya está visible para toda la comunidad</p>
            </div>
          </div>
        )}

        {!isExpanded ? (
          // Vista colapsada - Como Facebook "¿Qué estás pensando?"
          <div
            onClick={() => {
              if (!user) {
                openModal();
              } else {
                setIsExpanded(true);
              }
            }}
            className="flex items-center gap-2.5 sm:gap-4 cursor-pointer"
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0 overflow-hidden"
              style={{ background: user?.picture ? "transparent" : "#C8102E" }}
            >
              {user?.picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.picture} alt="" className="w-full h-full object-cover" />
              ) : (
                user?.nombre?.charAt(0).toUpperCase() ?? "?"
              )}
            </div>
            <div className="flex-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-200 rounded-full px-3.5 sm:px-5 py-2.5 sm:py-3 text-gray-500 text-xs sm:text-base transition-colors">
              {user ? "Comparte tu experiencia en Suiza..." : "Inicia sesión para compartir tu historia..."}
            </div>
          </div>
        ) : (
          // Vista expandida - Formulario completo
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-100">
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0 overflow-hidden"
                style={{ background: user?.picture ? "transparent" : "#C8102E" }}
              >
                {user?.picture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.picture} alt="" className="w-full h-full object-cover" />
                ) : (
                  user?.nombre?.charAt(0).toUpperCase() ?? "?"
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-xs sm:text-sm">{user?.nombre}</p>
                <p className="text-[0.65rem] sm:text-xs text-gray-400">Publicando en la comunidad</p>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="ml-auto w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 active:bg-gray-100 rounded-full text-xl"
              >
                ×
              </button>
            </div>

            {/* Título */}
            <input
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              placeholder="Título de tu historia (ej: Mi primer año en Zúrich)"
              maxLength={100}
              className="w-full px-0 py-2 text-base sm:text-lg font-semibold border-0 focus:outline-none focus:ring-0 placeholder-gray-400"
            />

            {/* Contenido */}
            <textarea
              name="contenido"
              value={form.contenido}
              onChange={handleChange}
              placeholder="Cuéntanos tu experiencia... ¿Cómo llegaste a Suiza? ¿Qué fue lo más difícil? ¿Qué consejos darías?"
              rows={5}
              className="w-full px-0 py-2 border-0 focus:outline-none focus:ring-0 placeholder-gray-400 resize-none text-sm sm:text-base"
            />

            {/* Contador de caracteres */}
            <div className="flex items-center justify-between text-[0.65rem] sm:text-xs text-gray-400 mb-3 sm:mb-4">
              <span className={charCount < minChars ? "text-amber-500" : ""}>
                {charCount}/{maxChars} caracteres {charCount < minChars && `(mín ${minChars})`}
              </span>
            </div>

            {/* Opciones */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-100">
              <select
                name="ciudadSuiza"
                value={form.ciudadSuiza}
                onChange={handleChange}
                className="text-xs sm:text-sm bg-gray-100 border-0 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 focus:ring-2 focus:ring-red-500 min-h-[36px]"
              >
                <option value="">📍 Ciudad (opcional)</option>
                {CIUDADES_SUIZA.map((ciudad) => (
                  <option key={ciudad} value={ciudad}>{ciudad}</option>
                ))}
              </select>

              <select
                name="tema"
                value={form.tema}
                onChange={handleChange}
                className="text-xs sm:text-sm bg-gray-100 border-0 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 focus:ring-2 focus:ring-red-500 min-h-[36px]"
              >
                <option value="">🏷️ Tema (opcional)</option>
                {TEMAS_HISTORIA.map((tema) => (
                  <option key={tema.value} value={tema.value}>{tema.label}</option>
                ))}
              </select>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 text-red-700 text-xs sm:text-sm rounded-lg px-3 sm:px-4 py-2 mb-3 sm:mb-4">
                {error}
              </div>
            )}

            {/* Botón publicar */}
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.65rem] sm:text-xs text-gray-400 hidden sm:block">
                Se publicará en la web y redes sociales
              </p>
              <button
                type="submit"
                disabled={isSubmitting || charCount < minChars}
                className="bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-gray-300 text-white font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-colors text-sm sm:text-base ml-auto min-h-[40px]"
              >
                {isSubmitting ? "Publicando..." : "Publicar"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Feed de historias */}
      <div className="space-y-3 sm:space-y-4">
        {historias.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">📝</div>
            <p className="text-gray-600 font-medium text-sm sm:text-base">Aún no hay historias de la comunidad</p>
            <p className="text-gray-400 text-xs sm:text-sm">¡Sé el primero en compartir tu experiencia!</p>
          </div>
        ) : (
          historias.map((historia) => (
            <article
              key={historia.id}
              className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 hover:shadow-md active:bg-gray-50 transition-all"
            >
              <Link href={`/historias-reales/${historia.slug}`} className="block">
                {/* Header */}
                <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                  <div
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0 overflow-hidden"
                    style={{ background: historia.autorAvatar ? "transparent" : "#C8102E" }}
                  >
                    {historia.autorAvatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={historia.autorAvatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      historia.autorNombre.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">{historia.autorNombre}</p>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[0.65rem] sm:text-xs text-gray-400 flex-wrap">
                      {historia.autorPais && <span>{historia.autorPais}</span>}
                      {historia.autorPais && historia.ciudadSuiza && <span>→</span>}
                      {historia.ciudadSuiza && <span>{historia.ciudadSuiza}</span>}
                      <span>·</span>
                      <span>
                        {new Date(historia.publishedAt).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1.5 sm:mb-2 hover:text-red-700 transition-colors leading-snug">
                  {historia.titulo}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                  {historia.contenido.length > 280
                    ? historia.contenido.slice(0, 280).trim() + "..."
                    : historia.contenido}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {historia.tema && (
                      <span className="text-[0.65rem] sm:text-xs bg-red-50 text-red-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                        {temaLabel(historia.tema)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-red-600 font-medium">
                    Leer más →
                  </span>
                </div>
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
