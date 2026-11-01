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
      <article className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
            style={{ background: "#FF6B6B" }}
          >
            {historia.nombre.charAt(0)}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
              <span className="font-medium text-gray-700">{historia.nombre}</span>
              <span>·</span>
              <span>{historia.origen} → {historia.ciudad}</span>
              <span>·</span>
              <span>{historia.trabajo}</span>
              <span>·</span>
              <span>{historia.anio}</span>
            </div>

            {/* Título/Resumen */}
            <h3 className="text-lg font-semibold text-gray-800 mb-3 leading-snug">
              {historia.resumen}
            </h3>

            {/* Extracto */}
            {variant === "full" && (
              <blockquote className="border-l-4 border-amber-400 pl-4 text-gray-600 italic mb-4">
                &ldquo;{historia.extracto}&rdquo;
              </blockquote>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {historia.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
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
    <article className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
      <Link href={`/historias-reales/${historia.slug}`} className="block">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 overflow-hidden"
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
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
              <span className="font-medium text-gray-700">{historia.autorNombre}</span>
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
            <h3 className="text-lg font-semibold text-gray-800 mb-3 leading-snug hover:text-red-700 transition-colors">
              {historia.titulo}
            </h3>

            {/* Preview del contenido */}
            {variant === "full" && (
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {preview}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {historia.tema && (
                  <span className="text-xs bg-red-50 text-red-700 px-2.5 py-1 rounded-full">
                    {historia.tema}
                  </span>
                )}
                {historia.ciudadSuiza && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {historia.ciudadSuiza}
                  </span>
                )}
              </div>

              <span className="text-sm text-red-600 font-medium">
                Leer más →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
