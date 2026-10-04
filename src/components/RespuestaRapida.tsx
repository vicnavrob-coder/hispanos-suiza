/**
 * RespuestaRapida — Caja de respuesta directa optimizada para Featured Snippets de Google.
 * Colócala justo antes del primer <h2> del artículo cuando el tema tiene una pregunta clara.
 * Google la muestra como "snippet destacado" en los resultados.
 */

type Props = {
  pregunta: string;
  respuesta: string;
};

export default function RespuestaRapida({ pregunta, respuesta }: Props) {
  return (
    <div
      className="rounded-xl border-l-4 p-5 mb-6"
      style={{ borderLeftColor: "#C8102E", background: "#FFF8F8" }}
      role="note"
      aria-label="Respuesta rápida"
    >
      <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#C8102E" }}>
        Respuesta rápida
      </p>
      <p className="font-semibold text-gray-800 text-sm mb-1">{pregunta}</p>
      <p className="text-gray-700 text-sm leading-relaxed">{respuesta}</p>
    </div>
  );
}
