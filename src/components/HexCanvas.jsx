"use client";

import { useEffect, useRef } from "react";

export default function HexCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const r = 38; // Hexagon radius
    const dy = Math.sqrt(3) * r; // Row spacing
    const dx = 1.5 * r; // Col spacing
    const mouseRadius = 260; // Influence radius

    let mouse = { x: -1000, y: -1000, active: false };

    // Hexagon grid points
    let hexes = [];

    const initHexes = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      hexes = [];

      const cols = Math.ceil(width / dx) + 2;
      const rows = Math.ceil(height / dy) + 2;

      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const cx = col * dx;
          const cy = row * dy + (col % 2 !== 0 ? dy / 2 : 0);
          hexes.push({
            cx,
            cy,
            intensity: 0,
          });
        }
      }
    };

    initHexes();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    const handleResize = () => {
      initHexes();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    const drawHex = (cx, cy, intensity) => {
      ctx.beginPath();
      for (let j = 0; j < 6; j++) {
        const a = (Math.PI / 3) * j - Math.PI / 6;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      if (intensity > 0.01) {
        const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, r);
        grad.addColorStop(0, `rgba(31, 195, 255, ${intensity * 0.38})`);
        grad.addColorStop(1, `rgba(31, 195, 255, ${intensity * 0.03})`);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = `rgba(31, 195, 255, ${0.08 + intensity * 0.8})`;
        ctx.lineWidth = 1.3;
      } else {
        ctx.strokeStyle = "rgba(31, 195, 255, 0.05)";
        ctx.lineWidth = 0.8;
      }
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < hexes.length; i++) {
        const hex = hexes[i];

        if (mouse.active) {
          const dist = Math.hypot(hex.cx - mouse.x, hex.cy - mouse.y);
          if (dist < mouseRadius) {
            const target = (1 - dist / mouseRadius) * 1.1;
            if (target > hex.intensity) {
              hex.intensity = target;
            }
          }
        }

        // Exponential decay
        hex.intensity *= 0.93;
        if (hex.intensity < 0.005) {
          hex.intensity = 0;
        }

        drawHex(hex.cx, hex.cy, hex.intensity);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}
