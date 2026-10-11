import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Malik Halimeh, Full-Stack Developer";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#14151c",
        color: "#f4f3ef",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#9a9ca6",
        }}
      >
        <span>malikhalimeh · full-stack developer</span>
        <span>Saida, Lebanon</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          {profile.tagline}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: "#b9bbc4",
            maxWidth: 980,
          }}
        >
          {profile.summary}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 24,
          color: "#5ad39a",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            background: "#5ad39a",
          }}
        />
        <span>{profile.availability.label}</span>
      </div>
    </div>,
    { ...size },
  );
}
