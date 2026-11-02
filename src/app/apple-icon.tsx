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
          background: "#DC2626", // Rojo bandera suiza
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Cruz suiza blanca prominente */}
        <div
          style={{
            position: "absolute",
            width: 24,
            height: 100,
            background: "white",
            borderRadius: 3,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 100,
            height: 24,
            background: "white",
            borderRadius: 3,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
