"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorFollower({ presetId = "preset-1" }) {
  const containerRef = useRef(null);
  const headRef = useRef(null);
  const [visible, setVisible] = useState(true);

  const isPreset2 = presetId === "preset-2";

  useEffect(() => {
    // Only disable if user explicitly prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let mouse = { x: -100, y: -100 };
    let pos = { x: -100, y: -100 };
    let animationFrameId;

    if (isPreset2) {
      const head = headRef.current;
      if (!head) return;
      // Abhay Rana follower: Inner solid red dot + outer trailing ring
      let isHovered = false;

      const handleMouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        // Position inner red dot directly under cursor without lag
        if (head) {
          head.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
        }

        const target = e.target;
        const shouldHover = Boolean(
          target &&
            (target.closest("a") ||
              target.closest("button") ||
              target.closest("input") ||
              target.closest("textarea") ||
              target.closest("[role='button']") ||
              target.closest("[data-editable]") ||
              target.closest(".bento-card") ||
              target.closest(".cursor-pointer"))
        );

        if (shouldHover !== isHovered) {
          isHovered = shouldHover;
          const ring = container.querySelector(".cursor-ring");
          if (ring) {
            if (isHovered) {
              ring.classList.add("cursor-ring-active");
            } else {
              ring.classList.remove("cursor-ring-active");
            }
          }
        }
      };

      const handleMouseLeave = () => setVisible(false);
      const handleMouseEnter = () => setVisible(true);

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("mouseenter", handleMouseEnter);

      const ring = container.querySelector(".cursor-ring");

      const animate = () => {
        // Fluid spring interpolation for outer ring
        pos.x += (mouse.x - pos.x) * 0.22;
        pos.y += (mouse.y - pos.y) * 0.22;

        if (ring) {
          ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
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
      // Preset 1: 40-node trailing white cyber snake (exact algorithm from abdullah-portfolio-dev.vercel.app)
      const coords = { x: -100, y: -100 };
      const circles = container.querySelectorAll(".circle");

      circles.forEach((c) => {
        c.x = coords.x;
        c.y = coords.y;
      });

      let hasStarted = false;

      const onMouseMove = (e) => {
        if (!hasStarted) {
          hasStarted = true;
          circles.forEach((b) => {
            b.classList.remove("circle-hidden");
            b.x = e.clientX;
            b.y = e.clientY;
          });
        }
        coords.x = e.clientX;
        coords.y = e.clientY;
      };

      const onMouseLeave = () => {
        circles.forEach((b) => {
          b.classList.add("circle-hidden");
        });
      };

      const onMouseEnter = () => {
        circles.forEach((b) => {
          b.classList.remove("circle-hidden");
        });
      };

      const onHover = () => {
        circles.forEach((c) => {
          c.classList.add("circle-thin");
        });
      };

      const onLeave = () => {
        circles.forEach((c) => {
          c.classList.remove("circle-thin");
        });
      };

      const handleMouseOver = (e) => {
        const target = e.target;
        if (
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.closest("input") ||
            target.closest("textarea"))
        ) {
          onHover();
        }
      };

      const handleMouseOut = (e) => {
        const target = e.target;
        if (
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.closest("input") ||
            target.closest("textarea"))
        ) {
          onLeave();
        }
      };

      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("pointermove", onMouseMove, { passive: true });
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseover", handleMouseOver, { passive: true });
      document.addEventListener("mouseout", handleMouseOut, { passive: true });

      const animate = () => {
        let x = coords.x;
        let y = coords.y;

        circles.forEach(function (circle, index) {
          circle.style.left = x - 12 + "px";
          circle.style.top = y - 12 + "px";
          const scale = (circles.length - index) / circles.length;
          if ("scale" in circle.style) {
            circle.style.scale = scale;
            if (circle.style.transform) circle.style.transform = "";
          } else {
            circle.style.transform = `scale(${scale})`;
          }
          circle.x = x;
          circle.y = y;

          const nextCircle = circles[index + 1] || circles[0];
          let dx = (nextCircle.x - x) * 0.28;
          let dy = (nextCircle.y - y) * 0.28;
          const dist = Math.hypot(dx, dy);
          const maxStep = 9.0;
          if (dist > maxStep) {
            dx = (dx / dist) * maxStep;
            dy = (dy / dist) * maxStep;
          }
          x += dx;
          y += dy;
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("pointermove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mouseenter", onMouseEnter);
        document.removeEventListener("mouseover", handleMouseOver);
        document.removeEventListener("mouseout", handleMouseOut);
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
        {/* Outer Trailing Ring / Halo */}
        <div
          className="cursor-ring pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-red-500/60 bg-red-500/[0.08] shadow-[0_0_12px_rgba(239,68,68,0.25)] transition-[width,height,background-color,border-color] duration-200 ease-out"
          style={{ willChange: "transform" }}
        />

        {/* Inner Solid Red Dot under Cursor (matches abhayrana.com) */}
        <div
          ref={headRef}
          className="cursor-dot pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"
          style={{ willChange: "transform" }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 overflow-hidden hidden md:block"
      style={{ zIndex: 99999999 }}
      aria-hidden="true"
    >
      {Array.from({ length: 36 }).map((_, i) => (
        <div key={i} className="circle circle-hidden" />
      ))}
    </div>
  );
}
