"use client";

import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const containerRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const container = containerRef.current;
    const head = headRef.current;
    if (!container || !head) return;

    const COUNT = 32;
    const points = Array.from({ length: COUNT }, () => ({ x: -100, y: -100 }));
    let mouse = { x: -100, y: -100 };
    let isHovering = false;
    let animationFrameId;

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
      // Node 0 chases mouse with spring factor
      points[0].x += (mouse.x - points[0].x) * 0.45;
      points[0].y += (mouse.y - points[0].y) * 0.45;

      // Trailing nodes chase previous node
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
  }, []);

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
