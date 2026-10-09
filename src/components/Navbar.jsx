"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar({ content, presetId, sections = [] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Homepage");
  const [hoveredSection, setHoveredSection] = useState(null);

  const navContainerRef = useRef(null);
  const linkRefs = useRef({});
  const isManualScroll = useRef(false);
  const manualScrollTimeout = useRef(null);

  const isPreset2 = presetId === "preset-2";

  const heroName = content?.hero?.name || "Muhammad Waqar";
  const nameParts = heroName.trim().split(" ");
  const defaultInitials = nameParts.length > 1
    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    : heroName.slice(0, 2).toUpperCase();

  const navbar = content?.navbar || {};
  const brandTitle = navbar.brandTitle !== undefined ? navbar.brandTitle : (isPreset2 ? "MUHAMMAD WAQAR" : heroName);
  const brandInitials = navbar.brandInitials !== undefined ? navbar.brandInitials : defaultInitials;
  const resumeText = navbar.resumeText !== undefined ? navbar.resumeText : (isPreset2 ? "Download CV" : "Resume ↗");

  const isSectionVisible = (id) => {
    if (!sections || !Array.isArray(sections) || sections.length === 0) return true;
    const s = sections.find((sec) => sec.sectionId === id);
    return s ? s.visible !== false : true;
  };

  const allNavLinks = isPreset2 ? [
    { key: "linkHome", label: navbar.linkHome !== undefined ? navbar.linkHome : "Home", href: "#Homepage", sectionId: "Homepage", visible: true },
    { key: "linkAbout", label: navbar.linkAbout !== undefined ? navbar.linkAbout : "About", href: "#about", sectionId: "about", visible: isSectionVisible("about") },
    { key: "linkWork", label: navbar.linkWork !== undefined ? navbar.linkWork : "Projects", href: "#projects", sectionId: "projects", visible: isSectionVisible("projects") },
    { key: "linkSkills", label: navbar.linkSkills !== undefined ? navbar.linkSkills : "Skills", href: "#skills", sectionId: "skills", visible: isSectionVisible("skills") },
    { key: "linkExperience", label: navbar.linkExperience !== undefined && navbar.linkExperience !== "" ? navbar.linkExperience : "Experience", href: "#experience", sectionId: "experience", visible: isSectionVisible("experience") },
    { key: "linkContact", label: navbar.linkContact !== undefined ? navbar.linkContact : "Contact", href: "#contact", sectionId: "contact", visible: isSectionVisible("contact") },
  ] : [
    { key: "linkWork", label: navbar.linkWork !== undefined ? navbar.linkWork : "Selected Work", href: "#featured-work", sectionId: "featured-work", visible: isSectionVisible("projects") },
    { key: "linkAbout", label: navbar.linkAbout !== undefined ? navbar.linkAbout : "About", href: "#about", sectionId: "about", visible: isSectionVisible("about") },
    { key: "linkExperience", label: navbar.linkExperience !== undefined ? navbar.linkExperience : "Experience", href: "#experience", sectionId: "experience", visible: isSectionVisible("experience") },
    { key: "linkSkills", label: navbar.linkSkills !== undefined ? navbar.linkSkills : "Skills", href: "#skills", sectionId: "skills", visible: isSectionVisible("skills") },
    { key: "linkPractice", label: navbar.linkPractice !== undefined ? navbar.linkPractice : "Practice Lab", href: "#practice-lab", sectionId: "practice-lab", visible: isSectionVisible("practice") },
    { key: "linkContact", label: navbar.linkContact !== undefined ? navbar.linkContact : "Contact", href: "#contact", sectionId: "contact", visible: isSectionVisible("contact") },
  ];

  // Filter out any nav link that the user explicitly removed (empty string) or hidden in sections
  const visibleNavLinks = allNavLinks.filter((l) => l.visible !== false && l.label && l.label.trim() !== "");

  // Smooth click scroll handler with manual scroll lock
  const handleNavClick = (e, sectionId, href) => {
    e.preventDefault();
    setActiveSection(sectionId);
    setHoveredSection(null);

    isManualScroll.current = true;
    if (manualScrollTimeout.current) clearTimeout(manualScrollTimeout.current);
    manualScrollTimeout.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);

    const target = document.getElementById(sectionId);
    if (target) {
      const navEl = document.getElementById("navbar");
      const navHeight = navEl ? navEl.offsetHeight : 64;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth",
      });
      window.history.replaceState(null, "", href);
    } else {
      window.location.hash = href;
    }
  };

  // Robust scrollspy tracking active section during natural scrolling
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (isManualScroll.current) return;

      const navEl = document.getElementById("navbar");
      const navHeight = navEl ? navEl.offsetHeight : 64;

      // 1. If at top of the page, activate the first link (Home)
      if (window.scrollY < 120) {
        if (visibleNavLinks[0]?.sectionId) {
          setActiveSection(visibleNavLinks[0].sectionId);
        }
        return;
      }

      // 2. If scrolled near bottom of page, activate the last link (Contact)
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;
      if (isBottom) {
        const lastLink = visibleNavLinks[visibleNavLinks.length - 1];
        if (lastLink?.sectionId) {
          setActiveSection(lastLink.sectionId);
          return;
        }
      }

      // 3. Find which section is currently centered / in view (trigger line 160px below navbar)
      const scrollTrigger = window.scrollY + navHeight + 160;

      for (let i = visibleNavLinks.length - 1; i >= 0; i--) {
        const link = visibleNavLinks[i];
        const el = document.getElementById(link.sectionId);
        if (!el) continue;

        const elTop = el.getBoundingClientRect().top + window.scrollY;
        if (scrollTrigger >= elTop) {
          setActiveSection(link.sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (manualScrollTimeout.current) clearTimeout(manualScrollTimeout.current);
    };
  }, [visibleNavLinks]);

  return (
    <header
      id="navbar"
      data-editable="background"
      className={
        isPreset2
          ? "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[850px] transition-all"
          : "sticky top-0 z-50 w-full bg-background/85 backdrop-blur-md border-b border-white/[0.08]"
      }
    >
      <nav
        aria-label="Main Navigation"
        className={
          isPreset2
            ? "flex h-13 md:h-14 items-center justify-between rounded-full bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/80 px-4 sm:px-6 shadow-2xl"
            : "editorial-container flex h-16 items-center justify-between"
        }
      >
        {/* Brand Logo / Identity */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "Homepage", "#Homepage")}
          className="group flex items-center gap-2 text-sm font-bold tracking-tight text-[#fafafa]"
        >
          {isPreset2 ? (
            <span className="font-extrabold text-base tracking-tight text-white flex items-center">
              Muhammad<span className="text-red-500 font-extrabold">.</span>
            </span>
          ) : (
            <>
              {brandInitials ? (
                <span
                  data-editable="content-navbar-brandInitials"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1fc3ff]/15 border border-[#1fc3ff]/50 text-[#1fc3ff] font-fugaz text-xs font-bold transition-transform duration-300 group-hover:scale-105 cursor-pointer shadow-[0_0_10px_rgba(31,195,255,0.25)]"
                  title="Click to edit navbar brand initials"
                >
                  {brandInitials}
                </span>
              ) : null}
              {brandTitle ? (
                <span
                  data-editable="content-navbar-brandTitle"
                  className="hidden sm:inline-block font-fugaz text-xs uppercase tracking-[0.15em] text-white opacity-90 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-[#1fc3ff]"
                  title="Click to edit navbar brand title"
                >
                  {brandTitle}
                </span>
              ) : null}
            </>
          )}
        </Link>

        {/* Desktop Nav Links */}
        <div
          ref={navContainerRef}
          onMouseLeave={() => setHoveredSection(null)}
          className={`relative hidden md:flex items-center ${isPreset2
              ? "gap-1 sm:gap-1.5 md:gap-2 text-sm text-zinc-400 font-medium"
              : "gap-5 text-xs font-opensans uppercase tracking-wider text-slate-300"
            }`}
        >
          {visibleNavLinks.map((link) => {
            const isActive = activeSection === link.sectionId;
            const isHovered = hoveredSection === link.sectionId;
            return (
              <a
                key={link.key}
                ref={(el) => {
                  if (el) linkRefs.current[link.sectionId] = el;
                }}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.sectionId, link.href)}
                onMouseEnter={() => setHoveredSection(link.sectionId)}
                data-editable={`content-navbar-${link.key}`}
                className={
                  isPreset2
                    ? `px-3.5 py-1.5 rounded-xl cursor-pointer transition-all duration-200 text-xs sm:text-sm font-medium ${isActive
                        ? "text-white bg-[#2b1013] border border-red-600/40 shadow-[0_0_14px_rgba(239,68,68,0.2)]"
                        : isHovered
                        ? "text-white bg-white/[0.04]"
                        : "text-zinc-400 hover:text-white"
                      }`
                    : `py-1 cursor-pointer transition-all ${isActive
                        ? "text-[#1fc3ff] font-bold drop-shadow-[0_0_8px_#1fc3ff]"
                        : "hover:text-[#1fc3ff] hover:opacity-100 opacity-80"
                      }`
                }
                title={`Click to edit ${link.label} link`}
              >
                {link.label}
              </a>
            );
          })}
          {!isPreset2 && <ThemeSwitch />}
          {resumeText ? (
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-editable="content-navbar-resumeText"
              className={
                isPreset2
                  ? "px-3 py-1.5 text-xs sm:text-sm font-medium text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                  : "cyber-floating-btn !py-1.5 !px-4 !text-xs ml-2"
              }
              title="Open Resume in new tab"
            >
              {resumeText}
            </a>
          ) : null}
          <Link
            href="/admin/dashboard"
            target="_blank"
            className={
              isPreset2
                ? "text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors px-1.5 py-1"
                : "rounded border border-white/20 px-3 py-1.5 text-[var(--color-text)] hover:border-white transition-all duration-200"
            }
          >
            Admin ↗
          </Link>
        </div>

        {/* Mobile menu button & quick controls */}
        <div className="flex md:hidden items-center gap-2">
          {!isPreset2 && <ThemeSwitch className="p-1.5 text-xs" />}
          {resumeText ? (
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Resume in new tab"
              className={
                isPreset2
                  ? "rounded-xl border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/20"
                  : "rounded border border-white/20 px-2.5 py-1 text-xs font-mono text-[var(--color-text)]"
              }
            >
              Resume
            </a>
          ) : null}
          <Link
            href="/admin/dashboard"
            target="_blank"
            className={
              isPreset2
                ? "rounded-xl border border-white/10 px-2.5 py-1 text-xs text-zinc-400 hover:text-white"
                : "rounded border border-white/20 px-2.5 py-1 text-xs font-mono text-[var(--color-text)]"
            }
          >
            Admin
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-white opacity-80 hover:opacity-100 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden ${isPreset2
              ? "mt-2 rounded-2xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-xl text-[#fafafa] px-5 py-4 shadow-2xl"
              : "border-b border-white/10 bg-cardBg px-6 py-5"
            }`}
        >
          <div
            className={`flex flex-col gap-3 text-sm ${isPreset2 ? "font-sans" : "font-mono tracking-wider"
              } opacity-90`}
          >
            {visibleNavLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.sectionId, link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={
                    isPreset2
                      ? `py-2 transition-all flex items-center justify-between px-3 rounded-xl ${isActive
                        ? "text-white font-semibold bg-[#2b1013] border border-red-600/40 shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                        : "text-zinc-400 hover:text-white"
                      }`
                      : `py-1 transition-opacity ${isActive
                        ? "text-accent font-semibold"
                        : "hover:opacity-100"
                      }`
                  }
                >
                  <span>{link.label}</span>
                  {isPreset2 && isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  )}
                </a>
              );
            })}
            {resumeText && (
              <div className="pt-2 border-t border-white/10">
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-2 text-xs font-semibold ${isPreset2
                      ? "text-red-400 hover:text-white"
                      : "text-accent hover:opacity-80"
                    }`}
                >
                  <span>{resumeText}</span>
                  <span>↗</span>
                </a>
              </div>
            )}
            {!isPreset2 && (
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-gray-400">Mode:</span>
                <ThemeSwitch />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
