import Link from "next/link";
import type { HistoriaComunidad } from "@/lib/historias-comunidad";

interface HistoriaCardProps {
  historia: HistoriaComunidad | LegacyHistoria;
  variant?: "full" | "compact";
}

// Para las historias hardcodeadas existentes
interface LegacyHistoria {
  nombre: string;
  origen: string;
  ciudad: string;
  trabajo: string;
  anio: string;
  resumen: string;
  extracto: string;
  tags: string[];
}

function isLegacyHistoria(h: HistoriaComunidad | LegacyHistoria): h is LegacyHistoria {
  return "anio" in h && "extracto" in h;
}

export default function HistoriaCard({ historia, variant = "full" }: HistoriaCardProps) {
  if (isLegacyHistoria(historia)) {
    // Renderizar historia hardcodeada (formato antiguo)
    return (
      <article className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 hover:shadow-lg active:bg-gray-50 transition-all">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Avatar */}
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0"
            style={{ background: "#FF6B6B" }}
          >
            {historia.nombre.charAt(0)}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[0.65rem] sm:text-sm text-gray-500 mb-1.5 sm:mb-2">
              <span className="font-medium text-gray-700">{historia.nombre}</span>
              <span>·</span>
              <span className="truncate">{historia.origen} → {historia.ciudad}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">{historia.trabajo}</span>
              <span>·</span>
              <span>{historia.anio}</span>
            </div>

            {/* Título/Resumen */}
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 leading-snug">
              {historia.resumen}
            </h3>

            {/* Extracto */}
            {variant === "full" && (
              <blockquote className="border-l-4 border-amber-400 pl-3 sm:pl-4 text-gray-600 italic mb-3 sm:mb-4 text-xs sm:text-base">
                &ldquo;{historia.extracto}&rdquo;
              </blockquote>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {historia.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.65rem] sm:text-xs bg-gray-100 text-gray-600 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Renderizar historia de la comunidad (formato nuevo)
  const fecha = new Date(historia.publishedAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Generar preview del contenido (primeros 200 chars)
  const preview =
    historia.contenido.length > 200
      ? historia.contenido.slice(0, 200).trim() + "..."
      : historia.contenido;

  return (
    <article className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 hover:shadow-lg active:bg-gray-50 transition-all">
      <Link href={`/historias-reales/${historia.slug}`} className="block">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Avatar */}
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0 overflow-hidden"
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

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[0.65rem] sm:text-sm text-gray-500 mb-1.5 sm:mb-2">
              <span className="font-medium text-gray-700 truncate">{historia.autorNombre}</span>
              {historia.autorPais && (
                <>
                  <span>·</span>
                  <span>{historia.autorPais}</span>
                </>
              )}
              {historia.ciudadSuiza && (
                <>
                  <span>→</span>
                  <span>{historia.ciudadSuiza}</span>
                </>
              )}
              <span>·</span>
              <span>{fecha}</span>
            </div>

            {/* Título */}
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 leading-snug hover:text-red-700 transition-colors">
              {historia.titulo}
            </h3>

            {/* Preview del contenido */}
            {variant === "full" && (
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                {preview}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {historia.tema && (
                  <span className="text-[0.65rem] sm:text-xs bg-red-50 text-red-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                    {historia.tema}
                  </span>
                )}
                {historia.ciudadSuiza && (
                  <span className="text-[0.65rem] sm:text-xs bg-gray-100 text-gray-600 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                    {historia.ciudadSuiza}
                  </span>
                )}
              </div>

              <span className="text-xs sm:text-sm text-red-600 font-medium flex-shrink-0">
                Leer más →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
