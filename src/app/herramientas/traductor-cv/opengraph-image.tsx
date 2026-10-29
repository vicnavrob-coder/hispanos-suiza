import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: "linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 100%)",
        display: "flex",
        flexDirection: "column",
        padding: "60px 80px",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
      }}
    >
      {/* Accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "#2563EB" }} />

      {/* Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(37,99,235,0.15)",
          border: "1px solid rgba(37,99,235,0.3)",
          borderRadius: 20,
          padding: "8px 16px",
          marginBottom: 32,
          width: "fit-content",
        }}
      >
        <span style={{ fontSize: 20 }}>🇩🇪</span>
        <span style={{ color: "#60A5FA", fontSize: 14, fontWeight: 600 }}>PRIMER CV GRATIS</span>
      </div>

      {/* Title */}
      <div style={{ color: "white", fontSize: 52, fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
        Traductor de CV
      </div>
      <div style={{ color: "#2563EB", fontSize: 52, fontWeight: 900, lineHeight: 1.1, marginBottom: 28 }}>
        Español → Alemán
      </div>

      {/* Description */}
      <div style={{ color: "#9CA3AF", fontSize: 24, lineHeight: 1.5, marginBottom: 40, maxWidth: 800 }}>
        Convierte tu currículum en un Lebenslauf profesional adaptado al formato suizo. PDF o Word.
      </div>

      {/* Features */}
      <div style={{ display: "flex", gap: 24 }}>
        {[
          { icon: "📄", text: "Formato suizo" },
          { icon: "👨‍💼", text: "Revisado por expertos" },
          { icon: "✨", text: "1º CV gratis" },
        ].map((f) => (
          <div
            key={f.text}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "12px 20px",
            }}
          >
            <span style={{ fontSize: 22 }}>{f.icon}</span>
            <span style={{ color: "white", fontSize: 16, fontWeight: 500 }}>{f.text}</span>
          </div>
        ))}
      </div>

      {/* Logo */}
      <div style={{ position: "absolute", bottom: 60, right: 80, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 28 }}>🇨🇭</span>
        <span style={{ color: "white", fontSize: 20, fontWeight: 700 }}>HispanosEnSuiza</span>
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
