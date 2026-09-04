import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Muhammad Waqar — Frontend & Full-Stack Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#090A0F",
          color: "#F8FAFC",
          padding: "64px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              MW
            </div>
            <span
              style={{
                fontSize: "16px",
                letterSpacing: "0.2em",
                color: "#94A3B8",
                textTransform: "uppercase",
              }}
            >
              muhammad-waqar.me
            </span>
          </div>

          <div
            style={{
              display: "flex",
              padding: "6px 16px",
              borderRadius: "9999px",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              backgroundColor: "rgba(56, 189, 248, 0.1)",
              color: "#38BDF8",
              fontSize: "14px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Portfolio // 2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "20px",
              color: "#38BDF8",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Frontend & Full-Stack Engineer
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#FFFFFF",
            }}
          >
            Muhammad Waqar
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#94A3B8",
              maxWidth: "880px",
              lineHeight: 1.4,
            }}
          >
            Crafting high-performance digital experiences, resilient web
            applications, and thoughtful user interfaces.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "24px", color: "#CBD5E1", fontSize: "16px" }}>
            <span>Next.js</span>
            <span>·</span>
            <span>React</span>
            <span>·</span>
            <span>Node.js</span>
            <span>·</span>
            <span>MongoDB</span>
          </div>
          <div style={{ color: "#34D399", fontSize: "14px", letterSpacing: "0.1em" }}>
            ● Open for Opportunities
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
