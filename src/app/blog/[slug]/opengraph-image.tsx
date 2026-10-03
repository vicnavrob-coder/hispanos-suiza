import { ImageResponse } from "next/og";
import { getPost, categorias } from "@/lib/posts";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CATEGORY_COLORS: Record<string, string> = {
  emigrar:      "#C8102E",
  vivienda:     "#1d4ed8",
  trabajo:      "#C8102E",
  banca:        "#15803d",
  seguros:      "#7c3aed",
  "vida-diaria": "#b45309",
};

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return new ImageResponse(
      <div style={{ width: 1200, height: 630, background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "white", fontSize: 48 }}>HispanosEnSuiza</span>
      </div>,
      { width: 1200, height: 630 }
    );
  }

  const cat = categorias.find((c) => c.slug === post.categoria);
  const accentColor = CATEGORY_COLORS[post.categoria] ?? "#C8102E";
  const fecha = new Date(post.fecha).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

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
      {/* Accent bar top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: accentColor }} />

      {/* Category badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            background: accentColor,
            color: "white",
            fontSize: 14,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 700,
            padding: "6px 16px",
            borderRadius: 999,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {cat?.icono} {cat?.label ?? post.categoria}
        </div>
        <span style={{ color: "#6B7280", fontSize: 14, fontFamily: "system-ui, sans-serif" }}>
          {post.tiempoLectura} min de lectura
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          color: "white",
          fontSize: post.titulo.length > 60 ? 40 : 48,
          fontWeight: 900,
          lineHeight: 1.2,
          marginBottom: 24,
          flex: 1,
        }}
      >
        {post.titulo}
      </div>

      {/* Description */}
      <div
        style={{
          color: "#9CA3AF",
          fontSize: 20,
          fontFamily: "system-ui, sans-serif",
          lineHeight: 1.5,
          marginBottom: 40,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {post.descripcion}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: accentColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            🇨🇭
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 18, fontFamily: "system-ui, sans-serif" }}>
              HispanosEnSuiza
            </div>
            <div style={{ color: "#6B7280", fontSize: 13, fontFamily: "system-ui, sans-serif" }}>
              hispanosensuiza.com
            </div>
          </div>
        </div>
        <div style={{ color: "#4B5563", fontSize: 14, fontFamily: "system-ui, sans-serif" }}>
          {fecha}
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
