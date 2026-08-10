import { ImageResponse } from "next/og";
import { getSiteData } from "@/lib/db";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const site = await getSiteData();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#10243e",
          color: "white",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            color: "#d9a441",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontFamily: "monospace",
            display: "flex",
          }}
        >
          Dakar, Senegal
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 20, display: "flex" }}>
          {site.name}
        </div>
        <div style={{ fontSize: 32, color: "#d9a441", marginTop: 14, display: "flex" }}>
          {site.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
