"use client";

import { useEffect, useState } from "react";

export default function ViewportFadeMask({ presetId }) {
  const [scrollY, setScrollY] = useState(0);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      const nearBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 80;
      setIsNearBottom(nearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isPreset2 = presetId === "preset-2";
  const bgHex = isPreset2 ? "#0a0a0a" : "#06090e";

  // Top mask: hidden when resting at the very top (y < 20), smoothly appears when scrolled down
  const showTopMask = scrollY > 20;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      {/* Top Viewport Soft Fade (Dissolves content sliding under navbar) */}
      <div
        className={`fixed top-0 inset-x-0 h-24 md:h-28 transition-opacity duration-300 pointer-events-none ${
          showTopMask ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `linear-gradient(to bottom, ${bgHex} 15%, ${bgHex}d9 45%, ${bgHex}66 75%, transparent 100%)`,
        }}
      />

      {/* Bottom Viewport Soft Fade (Smoothly reveals content entering from bottom) */}
      <div
        className={`fixed bottom-0 inset-x-0 h-20 md:h-24 transition-opacity duration-300 pointer-events-none ${
          isNearBottom ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background: `linear-gradient(to top, ${bgHex} 15%, ${bgHex}d9 45%, ${bgHex}66 75%, transparent 100%)`,
        }}
      />
    </div>
  );
}
