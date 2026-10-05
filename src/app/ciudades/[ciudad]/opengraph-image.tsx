import { ImageResponse } from "next/og";
import { getCiudad } from "@/lib/ciudades";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COSTE_LABEL: Record<string, string> = {
  "muy-alto": "Coste muy alto",
  "alto": "Coste alto",
  "moderado": "Coste moderado",
};

export default async function OgImage({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params;
  const c = getCiudad(ciudad);

  if (!c) {
    return new ImageResponse(
      <div style={{ width: 1200, height: 630, background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "white", fontSize: 48 }}>HispanosEnSuiza</span>
      </div>,
      { width: 1200, height: 630 }
    );
  }

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        padding: "60px 72px",
        fontFamily: "Georgia, serif",
        position: "relative",
      }}
    >
      {/* Accent bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "#C8102E" }} />

      {/* Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <div style={{
          background: "#C8102E", color: "white", fontSize: 13, fontFamily: "system-ui, sans-serif",
          fontWeight: 700, padding: "6px 16px", borderRadius: 999, letterSpacing: "0.08em", textTransform: "uppercase",
        }}>
          🏙️ Guía de ciudad
        </div>
        <span style={{ color: "#6B7280", fontSize: 14, fontFamily: "system-ui, sans-serif" }}>
          {c.idioma} · {COSTE_LABEL[c.costeVida]}
        </span>
      </div>

      {/* Title */}
      <div style={{ color: "white", fontSize: 58, fontWeight: 900, lineHeight: 1.15, marginBottom: 16 }}>
        Vivir en {c.nombre}
      </div>
      <div style={{ color: "#C8102E", fontSize: 28, fontWeight: 700, fontFamily: "system-ui, sans-serif", marginBottom: 32 }}>
        Guía completa para hispanohablantes
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
        {[
          { label: "Alquiler estudio", value: c.alquilerEstudio },
          { label: "Salario medio", value: c.salarioMedio },
          { label: "Hispanohablantes", value: c.hispanohablantes },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12, padding: "16px 22px", display: "flex", flexDirection: "column", gap: 4,
          }}>
            <span style={{ color: "white", fontSize: 18, fontWeight: 800, fontFamily: "system-ui, sans-serif" }}>
              {stat.value}
            </span>
            <span style={{ color: "#6B7280", fontSize: 12, fontFamily: "system-ui, sans-serif" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%", background: "#C8102E",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
          }}>🇨🇭</div>
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 18, fontFamily: "system-ui, sans-serif" }}>HispanosEnSuiza</div>
            <div style={{ color: "#6B7280", fontSize: 13, fontFamily: "system-ui, sans-serif" }}>hispanosensuiza.ch</div>
          </div>
        </div>
        <div style={{ color: "#4B5563", fontSize: 14, fontFamily: "system-ui, sans-serif" }}>
          {c.canton}
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
