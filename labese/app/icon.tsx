import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1f6b4c",
          borderRadius: 6,
          color: "white",
          fontSize: 20,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
        }}
      >
        L
      </div>
    ),
    { ...size }
  );
}
