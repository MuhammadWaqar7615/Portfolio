"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorFollower({ presetId = "preset-1" }) {
  const containerRef = useRef(null);
  const headRef = useRef(null);
  const [visible, setVisible] = useState(true);

  const isPreset2 = presetId === "preset-2";

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(false);
      return;
    }

    const container = containerRef.current;
    const head = headRef.current;
    if (!container || !head) return;

    let mouse = { x: -100, y: -100 };
    let pos = { x: -100, y: -100 };
    let animationFrameId;

    if (isPreset2) {
      // Single smooth screen-blended crimson halo (Abhay Rana follower)
      const handleMouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };

      const handleMouseLeave = () => setVisible(false);
      const handleMouseEnter = () => setVisible(true);

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("mouseenter", handleMouseEnter);

      const animate = () => {
        // Fluid spring interpolation: pos smoothly approaches mouse
        pos.x += (mouse.x - pos.x) * 0.35;
        pos.y += (mouse.y - pos.y) * 0.35;

        if (head) {
          head.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
        document.removeEventListener("mouseenter", handleMouseEnter);
        cancelAnimationFrame(animationFrameId);
      };
    } else {
      // Preset 1: 32-node trailing cyber snake
      const COUNT = 32;
      const points = Array.from({ length: COUNT }, () => ({ x: -100, y: -100 }));
      let isHovering = false;

      const handleMouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        const target = e.target;
        const shouldHover = Boolean(
          target &&
            (target.closest("a") ||
              target.closest("button") ||
              target.closest("input") ||
              target.closest("textarea") ||
              target.closest(".cyber-glow-box") ||
              target.closest(".cyber-floating-btn") ||
              target.closest("[data-editable]") ||
              target.getAttribute("role") === "button")
        );

        if (shouldHover !== isHovering) {
          isHovering = shouldHover;
          if (isHovering) {
            head.classList.add("cursor-hover-active");
          } else {
            head.classList.remove("cursor-hover-active");
          }
        }
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      const nodes = Array.from(container.children);

      const animate = () => {
        points[0].x += (mouse.x - points[0].x) * 0.45;
        points[0].y += (mouse.y - points[0].y) * 0.45;

        for (let i = 1; i < COUNT; i++) {
          points[i].x += (points[i - 1].x - points[i].x) * 0.45;
          points[i].y += (points[i - 1].y - points[i].y) * 0.45;
        }

        for (let i = 0; i < nodes.length; i++) {
          const el = nodes[i];
          const pt = points[i];
          if (el && pt) {
            el.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0)`;
          }
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [isPreset2]);

  if (!visible) return null;

  if (isPreset2) {
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block"
        aria-hidden="true"
      >
        <div
          ref={headRef}
          className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, rgba(239, 68, 68, 0) 70%)",
            mixBlendMode: "screen",
            willChange: "transform",
          }}
        />
      </div>
    );
  }

  const COUNT = 32;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden hidden md:block"
      aria-hidden="true"
    >
      {/* Head Node (index 0) */}
      <div
        ref={headRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full w-5 h-5 bg-[#1fc3ff] shadow-[0_0_12px_#1fc3ff] transition-[width,height,background-color,border] duration-150 ease-out pointer-events-none"
        style={{ willChange: "transform" }}
      />

      {/* Trailing Snake Nodes */}
      {Array.from({ length: COUNT - 1 }).map((_, i) => {
        const idx = i + 1;
        const scale = (COUNT - idx) / COUNT;
        const size = Math.max(3, 16 * scale);
        const opacity = Math.max(0.12, scale * 0.85);

        return (
          <div
            key={idx}
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1fc3ff] pointer-events-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              boxShadow: idx < 6 ? "0 0 6px #1fc3ff" : "none",
              willChange: "transform",
            }}
          />
        );
      })}
    </div>
  );
}
