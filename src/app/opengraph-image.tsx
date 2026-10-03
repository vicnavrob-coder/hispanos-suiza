import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STATS = [
  { value: "142.000", label: "hispanohablantes" },
  { value: "CHF 6.500", label: "salario medio" },
  { value: "98%", label: "satisfacción" },
  { value: "100%", label: "gratis" },
];

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        padding: "72px 80px",
        fontFamily: "Georgia, serif",
        position: "relative",
      }}
    >
      {/* Accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: "#C8102E" }} />

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
        <span style={{ fontSize: 36 }}>🇨🇭</span>
        <span style={{ color: "white", fontSize: 28, fontWeight: 900 }}>HispanosEnSuiza</span>
      </div>

      {/* Main headline */}
      <div style={{ color: "white", fontSize: 56, fontWeight: 900, lineHeight: 1.15, marginBottom: 20 }}>
        La guía real para
      </div>
      <div style={{ color: "#C8102E", fontSize: 56, fontWeight: 900, lineHeight: 1.15, marginBottom: 28 }}>
        vivir en Suiza
      </div>
      <div
        style={{
          color: "#9CA3AF",
          fontSize: 22,
          fontFamily: "system-ui, sans-serif",
          lineHeight: 1.5,
          marginBottom: 48,
          maxWidth: 700,
        }}
      >
        Información verificada, experiencias reales y herramientas gratuitas para hispanohablantes.
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 32 }}>
        {STATS.map((stat) => (
          <div
            key={stat.value}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: "16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span style={{ color: "white", fontSize: 22, fontWeight: 800, fontFamily: "system-ui, sans-serif" }}>
              {stat.value}
            </span>
            <span style={{ color: "#6B7280", fontSize: 13, fontFamily: "system-ui, sans-serif" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
