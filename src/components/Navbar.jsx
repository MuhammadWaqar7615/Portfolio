"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar({ content, presetId, sections = [] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Homepage");
  const [hoveredSection, setHoveredSection] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

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
    { key: "linkHome", label: "Home", href: "#Homepage", sectionId: "Homepage", visible: true },
    { key: "linkAbout", label: navbar.linkAbout !== undefined ? navbar.linkAbout : "About", href: "#about", sectionId: "about", visible: isSectionVisible("about") },
    { key: "linkSkills", label: navbar.linkSkills !== undefined ? navbar.linkSkills : "Skills", href: "#skills", sectionId: "skills", visible: isSectionVisible("skills") },
    { key: "linkWork", label: navbar.linkWork !== undefined ? navbar.linkWork : "Projects", href: "#featured-work", sectionId: "featured-work", visible: isSectionVisible("projects") },
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

  // Dynamically calculate and animate the sliding underline indicator for Preset 2
  useEffect(() => {
    if (!isPreset2) return;

    const updateIndicator = () => {
      const targetId = hoveredSection || activeSection;
      const targetEl = linkRefs.current[targetId];
      const container = navContainerRef.current;

      if (targetEl && container) {
        const targetRect = targetEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setIndicatorStyle({
          left: targetRect.left - containerRect.left,
          width: targetRect.width,
          opacity: 1,
        });
      }
    };

    updateIndicator();
    const timer = setTimeout(updateIndicator, 60);
    window.addEventListener("resize", updateIndicator);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeSection, hoveredSection, visibleNavLinks, isPreset2]);

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
      className={`sticky top-0 z-50 w-full ${isPreset2 ? "bg-[#151713]/95 backdrop-blur-md border-b border-[#383A33]" : "bg-background/85 backdrop-blur-md border-b border-white/[0.08]"}`}
    >
      <nav
        aria-label="Main Navigation"
        className="editorial-container flex h-16 items-center justify-between"
      >
        {/* Brand Logo / Identity */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "Homepage", "#Homepage")}
          className="group flex items-center gap-3 text-sm font-semibold tracking-wider text-[var(--color-heading)]"
        >
          {brandInitials ? (
            <span
              data-editable="content-navbar-brandInitials"
              className={isPreset2
                ? "font-serif italic text-xl text-[#E8B58F] font-normal transition-transform duration-300 group-hover:scale-105 cursor-pointer pr-1"
                : "flex h-8 w-8 items-center justify-center rounded-sm bg-accent text-background font-mono text-xs font-bold transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              }
              title="Click to edit navbar brand initials"
            >
              {brandInitials}
            </span>
          ) : null}
          {brandTitle ? (
            <span
              data-editable="content-navbar-brandTitle"
              className={isPreset2
                ? "hidden sm:inline-block font-sans text-xs uppercase tracking-[3px] text-[#F2EEE5] font-medium opacity-90 group-hover:opacity-100 transition-opacity cursor-pointer"
                : "hidden sm:inline-block font-mono text-xs uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-accent"
              }
              title="Click to edit navbar brand title"
            >
              {brandTitle}
            </span>
          ) : null}
        </Link>

        {/* Desktop Nav Links */}
        <div
          ref={navContainerRef}
          onMouseLeave={() => setHoveredSection(null)}
          className={`relative hidden md:flex items-center gap-6 ${
            isPreset2
              ? "text-xs font-sans tracking-wide text-[#B8B7AF]"
              : "text-xs font-mono uppercase tracking-wider opacity-85"
          }`}
        >
          {/* Sliding animated underline indicator for Preset 2 */}
          {isPreset2 && (
            <span
              aria-hidden="true"
              className={`absolute bottom-0 h-[2px] bg-[#D8B894] transition-all duration-300 ease-out pointer-events-none rounded-full shadow-[0_0_8px_rgba(216,184,148,0.5)] ${
                indicatorStyle.opacity ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
              }}
            />
          )}

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
                    ? `py-2 cursor-pointer transition-colors duration-200 select-none ${
                        isActive || isHovered
                          ? "text-[#F2EEE5] font-medium"
                          : "text-[#B8B7AF] hover:text-[#F2EEE5]"
                      }`
                    : `py-1 cursor-pointer transition-all ${
                        isActive
                          ? "text-accent font-semibold"
                          : "hover:text-accent hover:opacity-100 opacity-80"
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
            <Link
              href="/resume"
              data-editable="content-navbar-resumeText"
              className={isPreset2
                ? "inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-1.5 text-xs text-[#F2EEE5] hover:border-[#E8B58F] hover:text-[#E8B58F] transition-all cursor-pointer"
                : "rounded border border-white/20 px-3 py-1.5 text-[var(--color-text)] hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
              }
              style={{ borderRadius: "var(--radius-btn, var(--radius-card))" }}
              title="Click to edit resume button text"
            >
              {isPreset2 && (
                <svg className="w-3.5 h-3.5 text-[#E8B58F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              )}
              {resumeText}
            </Link>
          ) : null}
          <Link
            href="/admin/dashboard"
            target="_blank"
            className={isPreset2
              ? "rounded-full border border-white/10 px-3 py-1.5 text-xs text-[#B8B7AF] hover:text-[#F2EEE5] hover:border-white/30 transition-all"
              : "rounded border border-white/20 px-3 py-1.5 text-[var(--color-text)] hover:border-white transition-all duration-200"
            }
            style={{ borderRadius: "var(--radius-btn, var(--radius-card))" }}
          >
            Admin ↗
          </Link>
        </div>

        {/* Mobile menu button & quick controls */}
        <div className="flex md:hidden items-center gap-2.5">
          {!isPreset2 && <ThemeSwitch className="p-1.5 text-xs" />}
          {resumeText ? (
            <Link
              href="/resume"
              className={isPreset2
                ? "rounded-full border border-white/20 px-3 py-1 text-xs text-[#F2EEE5] hover:border-[#E8B58F]"
                : "rounded border border-white/20 px-2.5 py-1 text-xs font-mono text-[var(--color-text)]"
              }
            >
              CV
            </Link>
          ) : null}
          <Link
            href="/admin/dashboard"
            target="_blank"
            className={isPreset2
              ? "rounded-full border border-white/10 px-2.5 py-1 text-xs text-[#B8B7AF] hover:text-[#F2EEE5]"
              : "rounded border border-white/20 px-2.5 py-1 text-xs font-mono text-[var(--color-text)]"
            }
          >
            Admin
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 opacity-70 hover:opacity-100 focus:outline-none"
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
        <div className={`md:hidden border-b ${isPreset2 ? "border-[#383A33] bg-[#151713] text-[#F2EEE5]" : "border-white/10 bg-cardBg"} px-6 py-5`}>
          <div className={`flex flex-col gap-4 text-sm ${isPreset2 ? "font-sans tracking-wide" : "font-mono tracking-wider"} opacity-90`}>
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
                      ? `py-2 transition-all flex items-center justify-between ${
                          isActive
                            ? "text-[#E8B58F] font-semibold pl-3 border-l-2 border-[#D8B894] bg-[#252820]/40 rounded-r"
                            : "text-[#B8B7AF] hover:text-[#F2EEE5] pl-3 border-l-2 border-transparent"
                        }`
                      : `py-1 transition-opacity ${
                          isActive
                            ? "text-accent font-semibold"
                            : "hover:opacity-100"
                        }`
                  }
                >
                  <span>{link.label}</span>
                  {isPreset2 && isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D8B894]" />
                  )}
                </a>
              );
            })}
            {!isPreset2 && (
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
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
