import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Muhammad Waqar — Frontend & Full-Stack Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OGImage() {
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
        {/* Subtle grid border frame */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            pointerEvents: "none",
          }}
        />

        {/* Top Header */}
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
            Portfolio Edition // 2026
          </div>
        </div>

        {/* Center Main Typography */}
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
            Software Engineer & Interface Craftsman
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
            Specializing in React, Next.js App Router, MERN architectures, and
            performance-optimized user interfaces.
          </div>
        </div>

        {/* Bottom Footer Stack */}
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
            <span>·</span>
            <span>Tailwind CSS</span>
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
