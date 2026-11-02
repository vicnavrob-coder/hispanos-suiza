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
          background: "#DC2626", // Rojo bandera suiza
          borderRadius: 6,
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
            width: 4,
            height: 18,
            background: "white",
            borderRadius: 0.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 18,
            height: 4,
            background: "white",
            borderRadius: 0.5,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
