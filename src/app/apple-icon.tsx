import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 180, height: 180 };

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "linear-gradient(135deg, #C8102E 0%, #9B1B30 100%)",
          borderRadius: 32,
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
            width: 30,
            height: 100,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 100,
            height: 30,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 4,
          }}
        />
        {/* HS */}
        <span
          style={{
            color: "white",
            fontSize: 72,
            fontWeight: 800,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: -4,
          }}
        >
          HS
        </span>
      </div>
    ),
    { ...size }
  );
}
