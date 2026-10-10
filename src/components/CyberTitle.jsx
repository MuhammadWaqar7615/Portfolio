"use client";

import { useEffect, useRef, useState } from "react";

export default function CyberTitle({ title, subtext, className = "", showProgress = true }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const section = el.closest("section");
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const isLg = window.innerWidth >= 1024;
      const topOffset = isLg ? 112 : 64; // 112px (top-28) on desktop, 64px (top-16) on mobile
      const sectionHeight = rect.height;
      const scrollableDist = sectionHeight - window.innerHeight + topOffset;

      if (rect.top <= topOffset + 10 && rect.bottom >= topOffset + 140) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      if (scrollableDist > 0) {
        const scrolled = topOffset - rect.top;
        const p = Math.max(0, Math.min(1, scrolled / scrollableDist));
        setProgress(p);
      } else {
        setProgress(rect.top <= topOffset ? 1 : 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (!title) return null;

  return (
    <div
      ref={containerRef}
      className={`cyber-title-wrap mb-3 sm:mb-4 lg:mb-8 transition-all duration-300 ${isSticky ? "translate-x-1" : ""} ${className}`}
    >
      {/* Sticky Active Section Indicator */}
      {showProgress && (
        <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
          <span
            className={`inline-block w-2 h-2 rounded-full transition-all duration-300 ${
              isSticky
                ? "bg-[#1fc3ff] shadow-[0_0_12px_#1fc3ff] scale-125"
                : "bg-slate-600 opacity-60"
            }`}
          />
          <span
            className={`text-[10px] font-bold tracking-[3px] uppercase font-opensans transition-colors duration-300 ${
              isSticky ? "text-[#1fc3ff]" : "text-slate-400"
            }`}
          >
            {isSticky ? "ACTIVE SECTION" : "SECTION"}
          </span>
        </div>
      )}

      <span className="cyber-primary-title font-fugaz">{title}</span>
      <span className="cyber-secondary-title font-fugaz">
        {title}
      </span>

      {/* Dynamic Cyber Cyan Sticky Progress Indicator Bar */}
      {showProgress && (
        <div
          className="w-32 sm:w-36 h-[3px] bg-white/[0.08] rounded-full mt-4 sm:mt-5 overflow-hidden relative"
          title="Section Scroll Progress"
        >
          <div
            className="h-full bg-gradient-to-r from-[#1fc3ff] via-[#00e1ff] to-[#38bdf8] shadow-[0_0_12px_#1fc3ff] transition-all duration-75 ease-out rounded-full"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      )}

      {subtext && (
        <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm font-opensans text-slate-300 max-w-lg tracking-wide uppercase font-medium leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
}
