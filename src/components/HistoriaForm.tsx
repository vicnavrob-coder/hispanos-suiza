"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { CIUDADES_SUIZA, TEMAS_HISTORIA } from "@/lib/historias-comunidad";

type State = "idle" | "loading" | "preview" | "success" | "error";

interface FormData {
  titulo: string;
  contenido: string;
  ciudadSuiza: string;
  tema: string;
  aceptaTerminos: boolean;
}

export default function HistoriaForm() {
  const { user } = useAuth();
  const [state, setState] = useState<State>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [publishedSlug, setPublishedSlug] = useState("");

  const [form, setForm] = useState<FormData>({
    titulo: "",
    contenido: "",
    ciudadSuiza: "",
    tema: "",
    aceptaTerminos: false,
  });

  const charCount = form.contenido.length;
  const minChars = 200;
  const maxChars = 5000;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handlePreview = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (!form.titulo.trim()) {
      setError("El título es obligatorio");
      return;
    }
    if (form.titulo.length > 100) {
      setError("El título no puede superar 100 caracteres");
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
    if (!form.aceptaTerminos) {
      setError("Debes aceptar los términos para publicar");
      return;
    }

    setState("preview");
  };

  const handleSubmit = async () => {
    if (!user) return;

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
          titulo: form.titulo.trim(),
          contenido: form.contenido.trim(),
          ciudadSuiza: form.ciudadSuiza || undefined,
          tema: form.tema || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setState("success");
        setPublishedSlug(data.historia?.slug ?? "");
      } else {
        setIsSubmitting(false);
        setError(data.error ?? "Error al publicar la historia");
      }
    } catch {
      setIsSubmitting(false);
      setError("Error de red. Inténtalo de nuevo.");
    }
  };

  // Usuario no logueado
  if (!user) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">🔐</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Inicia sesión para compartir tu historia
        </h3>
        <p className="text-gray-600 mb-6">
          Necesitas una cuenta para publicar tu historia en la comunidad.
        </p>
        <a
          href="/login"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Iniciar sesión con Google
        </a>
      </div>
    );
  }

  // Historia publicada
  if (state === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          ¡Historia publicada!
        </h3>
        <p className="text-green-700 mb-6">
          Tu historia ya está visible en la comunidad. Gracias por compartir tu experiencia.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {publishedSlug && (
            <a
              href={`/historias-reales/${publishedSlug}`}
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Ver mi historia →
            </a>
          )}
          <a
            href="/historias-reales"
            className="inline-block bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-full border border-gray-200 transition-colors"
          >
            Ver todas las historias
          </a>
        </div>
      </div>
    );
  }

  // Vista previa
  if (state === "preview") {
    const temaLabel = TEMAS_HISTORIA.find((t) => t.value === form.tema)?.label;

    return (
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="bg-amber-50 border-b border-amber-100 px-6 py-4">
          <h3 className="font-bold text-amber-800">Vista previa de tu historia</h3>
          <p className="text-amber-700 text-sm">Revisa que todo esté correcto antes de publicar</p>
        </div>

        <div className="p-6">
          {/* Preview card */}
          <article className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 overflow-hidden"
                style={{ background: user.picture ? "transparent" : "#C8102E" }}
              >
                {user.picture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.picture}
                    alt={user.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user.nombre.charAt(0).toUpperCase()
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
                  <span className="font-medium text-gray-700">{user.nombre}</span>
                  {user.pais && (
                    <>
                      <span>·</span>
                      <span>{user.pais}</span>
                    </>
                  )}
                  {form.ciudadSuiza && (
                    <>
                      <span>→</span>
                      <span>{form.ciudadSuiza}</span>
                    </>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {form.titulo}
                </h3>

                <p className="text-gray-600 text-sm mb-4 whitespace-pre-wrap">
                  {form.contenido.length > 300
                    ? form.contenido.slice(0, 300) + "..."
                    : form.contenido}
                </p>

                <div className="flex flex-wrap gap-2">
                  {temaLabel && (
                    <span className="text-xs bg-red-50 text-red-700 px-2.5 py-1 rounded-full">
                      {temaLabel}
                    </span>
                  )}
                  {form.ciudadSuiza && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      {form.ciudadSuiza}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </article>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setState("idle")}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full transition-colors"
            >
              ← Editar
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Publicando..." : "Publicar historia"}
            </button>
          </div>

          {error && (
            <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
          )}
        </div>
      </div>
    );
  }

  // Formulario
  return (
    <form onSubmit={handlePreview} className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 overflow-hidden"
          style={{ background: user.picture ? "transparent" : "#C8102E" }}
        >
          {user.picture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.picture} alt={user.nombre} className="w-full h-full object-cover" />
          ) : (
            user.nombre.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{user.nombre}</p>
          <p className="text-sm text-gray-500">Compartiendo una historia</p>
        </div>
      </div>

      {/* Título */}
      <div className="mb-4">
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
          Título de tu historia *
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          maxLength={100}
          placeholder="Ej: Mi primer año en Zúrich"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-400 mt-1">{form.titulo.length}/100 caracteres</p>
      </div>

      {/* Contenido */}
      <div className="mb-4">
        <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 mb-1">
          Tu historia *
        </label>
        <textarea
          id="contenido"
          name="contenido"
          value={form.contenido}
          onChange={handleChange}
          rows={10}
          placeholder="Cuéntanos tu experiencia en Suiza. ¿Cómo llegaste? ¿Qué ha sido lo más difícil? ¿Qué consejos darías a otros?"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
        />
        <p className={`text-xs mt-1 ${charCount < minChars ? "text-amber-600" : charCount > maxChars ? "text-red-600" : "text-gray-400"}`}>
          {charCount}/{maxChars} caracteres (mínimo {minChars})
        </p>
      </div>

      {/* Ciudad y Tema en grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="ciudadSuiza" className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad en Suiza (opcional)
          </label>
          <select
            id="ciudadSuiza"
            name="ciudadSuiza"
            value={form.ciudadSuiza}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
          >
            <option value="">Selecciona una ciudad</option>
            {CIUDADES_SUIZA.map((ciudad) => (
              <option key={ciudad} value={ciudad}>
                {ciudad}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tema" className="block text-sm font-medium text-gray-700 mb-1">
            Tema (opcional)
          </label>
          <select
            id="tema"
            name="tema"
            value={form.tema}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
          >
            <option value="">Selecciona un tema</option>
            {TEMAS_HISTORIA.map((tema) => (
              <option key={tema.value} value={tema.value}>
                {tema.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Términos */}
      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="aceptaTerminos"
            checked={form.aceptaTerminos}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <span className="text-sm text-gray-600">
            Acepto que mi historia se publique en HispanosEnSuiza.ch y se comparta en nuestras redes sociales (Facebook e Instagram) para inspirar a otros hispanohablantes.
          </span>
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors disabled:opacity-60"
      >
        Vista previa →
      </button>

      <p className="text-xs text-gray-400 text-center mt-4">
        Solo puedes publicar una historia cada 24 horas
      </p>
    </form>
  );
}
