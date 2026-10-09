"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

function AmbientGlow() {
  const ref = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  const left1 = useTransform(smoothX, (v) => `${100 * v}%`);
  const top1 = useTransform(smoothY, (v) => `${100 * v}%`);
  const left2 = useTransform(smoothX, (v) => `${100 * v + 10}%`);
  const top2 = useTransform(smoothY, (v) => `${100 * v - 10}%`);

  useEffect(() => {
    const handleMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    const el = ref.current;
    if (el) el.addEventListener("mousemove", handleMove);
    return () => {
      if (el) el.removeEventListener("mousemove", handleMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(249,115,22,0.3) 40%, transparent 70%)",
          left: left1,
          top: top1,
          x: "-50%",
          y: "-50%",
        }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-15 blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.5) 0%, rgba(239,68,68,0.2) 50%, transparent 70%)",
          left: left2,
          top: top2,
          x: "-50%",
          y: "-50%",
        }}
      />
    </div>
  );
}

export default function Hero({ content, presetId }) {
  const hero = content?.hero || {};
  const isPreset2 = presetId === "preset-2";
  const [copied, setCopied] = useState(false);

  const edition = hero.edition !== undefined ? hero.edition : (isPreset2 ? "Hey, I'm" : "PORTFOLIO EDITION // 2026");
  const specialization = hero.specialization !== undefined ? hero.specialization : "SPECIALIZATION: FULL-STACK SYSTEMS";
  const roleTag = hero.roleTag !== undefined ? hero.roleTag : (isPreset2 ? "Full Stack Developer" : "Software Engineer & Interface Craftsman");
  const name = hero.name !== undefined ? hero.name : "Muhammad Waqar";
  const bio = hero.bio !== undefined ? hero.bio : "I build and craft digital experiences that deliver real impact";
  const buttonPrimary = hero.buttonPrimary !== undefined ? hero.buttonPrimary : "Let's Connect →";
  const buttonSecondary = hero.buttonSecondary !== undefined ? hero.buttonSecondary : "mwaqar7615@gmail.com";
  const coreStack = hero.coreStack !== undefined ? hero.coreStack : "React, Next.js, Node.js, Express, MongoDB, Tailwind CSS";
  const status = hero.status !== undefined ? hero.status : "Available for new opportunities";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mwaqar7615@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Pixel-by-pixel Abhay Rana Hero section for Preset 2
  if (isPreset2) {
    return (
      <section
        id="Homepage"
        aria-label="Hero introduction"
        className="relative flex min-h-screen items-center justify-center px-4 md:px-6 overflow-hidden bg-[#0a0a0a]"
      >
        {/* Dynamic Interactive Mouse-Parallax Glow */}
        <AmbientGlow />

        {/* Horizon Warm Sunset Glow at Bottom */}
        <div className="absolute inset-x-0 bottom-0 h-[40vh] hero-warm-glow pointer-events-none z-[1]" />

        {/* Centered Main Hero Content */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-lg text-[#a1a1aa]"
          >
            {edition}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-2 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#fafafa] leading-[1.1] select-none"
            style={{ textShadow: "0 0 60px rgba(239, 68, 68, 0.2)" }}
          >
            {name.toUpperCase()}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="mt-4 flex justify-center"
          >
            <span className="inline-flex items-center bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md shadow-red-500/25">
              {roleTag}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-xl sm:text-2xl text-[#a1a1aa] leading-relaxed max-w-2xl mx-auto"
          >
            I build and craft digital experiences{" "}
            <br className="hidden sm:block" />
            that deliver{" "}
            <span
              className="font-serif italic"
              style={{
                background: "linear-gradient(135deg, #ef4444, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              real impact
            </span>
          </motion.p>

          {/* Dual Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white text-sm font-medium shadow-lg shadow-red-500/25 transition-all duration-300 hover:bg-red-600 pulse-glow-btn"
            >
              <span>{buttonPrimary}</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 text-[#a1a1aa] text-sm hover:text-[#fafafa] active:scale-95 active:text-[#fafafa] transition-all cursor-pointer glass px-5 py-3 rounded-xl border border-white/10 hover:border-white/20"
              title="Click to copy email address"
            >
              <span>mwaqar7615@gmail.com</span>
              {copied ? (
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[#a1a1aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" strokeWidth="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" strokeWidth="2" />
                </svg>
              )}
              {copied && <span className="text-xs text-red-400 font-medium">Copied!</span>}
            </button>
          </motion.div>
        </div>

        {/* Bouncing Chevron Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <a
            href="#about"
            aria-label="Scroll to About section"
            className="text-[#a1a1aa] hover:text-[#fafafa] transition-colors scroll-indicator block p-2"
          >
            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id="Homepage"
      aria-label="Hero introduction"
      data-editable="background"
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center border-b border-white/[0.08] overflow-hidden py-24 sm:py-32"
    >
      {/* Ambient Radial Cyan Glow */}
      <div className="cyber-blur-glow top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* Availability Badge */}
        {status?.trim() && (
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#1fc3ff]/40 bg-[#1fc3ff]/10 text-[#1fc3ff] text-xs font-semibold mb-8 shadow-[0_0_15px_rgba(31,195,255,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1fc3ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1fc3ff]"></span>
            </span>
            <span
              data-editable="content-hero-status"
              className="cursor-pointer tracking-widest uppercase font-opensans"
              title="Click to edit status"
            >
              {status}
            </span>
          </div>
        )}

        {/* Role Tagline */}
        <span
          data-editable="content-hero-roleTag"
          className="text-xs sm:text-sm font-bold tracking-[4px] uppercase text-white/90 mb-3 font-opensans"
          title="Click to edit role tag"
        >
          {roleTag || "FULL STACK WEB DEVELOPER"}
        </span>

        {/* Giant Name in Fugaz One */}
        <h1
          data-editable="content-hero-name"
          className="font-fugaz text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#1fc3ff] leading-[1.02] tracking-tight my-2 drop-shadow-[0_0_28px_rgba(31,195,255,0.45)] cursor-pointer select-none"
          title="Click to edit name"
        >
          {name || "Muhammad Waqar"}
        </h1>

        {/* Specialization / Subtitle */}
        <p className="mt-3 text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-white/80 font-fugaz">
          {specialization || "TURNING IDEAS INTO DIGITAL SOLUTIONS"}
        </p>

        {/* Bio */}
        {bio?.trim() && (
          <p
            data-editable="content-hero-bio"
            className="mt-6 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal font-opensans cursor-pointer"
            title="Click to edit intro bio"
          >
            {bio}
          </p>
        )}

        {/* Floating Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          {buttonPrimary?.trim() && (
            <a
              href="#featured-work"
              data-editable="content-hero-buttonPrimary"
              className="cyber-floating-btn cyber-floating-btn-solid"
              title="Click to edit primary button"
            >
              <span>{buttonPrimary.replace(/[↓→]/g, "").trim()}</span>
              <span>↓</span>
            </a>
          )}
          {buttonSecondary?.trim() && (
            <a
              href="#contact"
              data-editable="content-hero-buttonSecondary"
              className="cyber-floating-btn"
              title="Click to edit secondary button"
            >
              <span>{buttonSecondary.replace(/[↓→]/g, "").trim()}</span>
              <span>→</span>
            </a>
          )}
        </div>

        {/* Core Stack Strip */}
        {coreStack?.trim() && (
          <div className="mt-14 pt-8 border-t border-white/[0.08] w-full flex flex-col items-center gap-3 text-xs">
            <span className="text-slate-400 font-semibold tracking-[3px] text-[11px] uppercase font-opensans">
              Core Technologies
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {coreStack.split(",").map((tech) => (
                <span
                  key={tech.trim()}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1fc3ff]/[0.06] border border-[#1fc3ff]/30 text-white hover:border-[#1fc3ff] hover:bg-[#1fc3ff]/[0.12] transition-all shadow-[0_0_10px_rgba(31,195,255,0.1)] font-opensans"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

