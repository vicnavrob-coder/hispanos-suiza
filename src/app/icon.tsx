import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 32, height: 32 };

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "linear-gradient(135deg, #C8102E 0%, #9B1B30 100%)",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Cruz suiza sutil */}
        <div
          style={{
            position: "absolute",
            width: 6,
            height: 20,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 20,
            height: 6,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 1,
          }}
        />
        {/* HS */}
        <span
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: 800,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: -1,
          }}
        >
          HS
        </span>
      </div>
    ),
    { ...size }
  );
}
