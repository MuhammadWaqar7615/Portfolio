"use client";

import { useEffect, useRef, useState } from "react";

export default function CyberTitle({
  title,
  subtitle,
  primaryTitle,
  secondaryTitle,
  subtext,
  className = "",
  showProgress = false,
}) {
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
      const topOffset = isLg ? 112 : 64;
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

  // Compute primary and secondary headings
  let primary = primaryTitle;
  let secondary = secondaryTitle;

  if (!primary) {
    if (title && subtitle) {
      primary = title;
      secondary = subtitle;
    } else if (title) {
      const trimmed = title.trim();
      const upper = trimmed.toUpperCase();

      // Direct matches with original portfolio section headings
      if (upper === "ABOUT ME" || upper === "ABOUT") {
        primary = "ABOUT";
        secondary = "ME";
      } else if (
        upper === "TECH STACK" ||
        upper === "TECH SET" ||
        upper === "TECH" ||
        upper === "SKILLS"
      ) {
        primary = "TECH";
        secondary = "SET";
      } else if (upper === "FEATURED PROJECTS" || upper === "PROJECTS") {
        primary = "FEATURED";
        secondary = "PROJECTS";
      } else if (
        upper === "WORK EXPERIENCE" ||
        upper === "EXPERIENCE" ||
        upper === "TIMELINE"
      ) {
        primary = "WORK";
        secondary = "EXPERIENCE";
      } else if (
        upper === "FORMAL EDUCATION" ||
        upper === "EDUCATION" ||
        upper === "ACADEMICS"
      ) {
        primary = "ACADEMIC";
        secondary = "STUDIES";
      } else if (upper === "CONTACT" || upper === "GET IN TOUCH") {
        primary = "GET IN";
        secondary = "TOUCH";
      } else {
        const parts = trimmed.split(/\s+/);
        if (parts.length > 1) {
          primary = parts[0];
          secondary = parts.slice(1).join(" ");
        } else {
          primary = parts[0];
          secondary = "";
        }
      }
    }
  }

  if (!primary) return null;

  const isShortSecondary = secondary && secondary.length <= 4;

  return (
    <div
      ref={containerRef}
      className={`cyber-title-wrap mb-4 sm:mb-6 lg:mb-8 transition-all duration-300 ${
        isSticky ? "translate-x-1" : ""
      } ${className}`}
    >
      {/* Dual-Layer Title Matching Original Portfolio (.title, .primary-text, .secondary-text) */}
      <div className="title-container w-fit flex flex-col select-none">
        <p className="primary-text cyber-primary-title font-fugaz">{primary}</p>
        {secondary && (
          <p
            className={`secondary-text cyber-secondary-title font-fugaz ${
              isShortSecondary ? "secondary-text-large" : ""
            }`}
          >
            {secondary}
          </p>
        )}
      </div>

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
        <p className="mt-3 sm:mt-5 text-xs sm:text-sm font-opensans text-slate-300 max-w-lg tracking-wide uppercase font-medium leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
}
