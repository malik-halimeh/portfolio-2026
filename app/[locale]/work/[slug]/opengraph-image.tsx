import { ImageResponse } from "next/og";
import { workBySlug } from "@/data/work";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Case study by Malik Halimeh";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = workBySlug[slug];
  const name = item?.name ?? "Work";
  const outcome = item?.outcome ?? "";
  const stack = item?.stack.slice(0, 5).join("  ·  ") ?? "";
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#08182a",
        backgroundImage:
          "radial-gradient(circle at 92% 8%, rgba(255,140,60,0.28), transparent 45%), radial-gradient(circle at 0% 0%, rgba(75,219,160,0.18), transparent 45%)",
        color: "#f8f3e9",
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
        <span>Case study · Malik Halimeh</span>
        <span style={{ color: "#ffac5e" }}>{name}</span>
      </div>
      <div
        style={{
          fontSize: 60,
          fontWeight: 800,
          letterSpacing: -2.5,
          lineHeight: 1.05,
          maxWidth: 1040,
        }}
      >
        {outcome}
      </div>
      <div style={{ fontSize: 24, color: "#9a9ca6" }}>{stack}</div>
    </div>,
    { ...size },
  );
}
