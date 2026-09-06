"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar({ content, presetId }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const allNavLinks = isPreset2 ? [
    { key: "linkHome", label: "Home", href: "#Homepage", active: true },
    { key: "linkAbout", label: navbar.linkAbout !== undefined ? navbar.linkAbout : "About", href: "#about" },
    { key: "linkWork", label: navbar.linkWork !== undefined ? navbar.linkWork : "Projects", href: "#featured-work" },
    { key: "linkSkills", label: navbar.linkSkills !== undefined ? navbar.linkSkills : "Skills", href: "#skills" },
    { key: "linkContact", label: navbar.linkContact !== undefined ? navbar.linkContact : "Contact", href: "#contact" },
  ] : [
    { key: "linkWork", label: navbar.linkWork !== undefined ? navbar.linkWork : "Selected Work", href: "#featured-work" },
    { key: "linkAbout", label: navbar.linkAbout !== undefined ? navbar.linkAbout : "About", href: "#about" },
    { key: "linkExperience", label: navbar.linkExperience !== undefined ? navbar.linkExperience : "Experience", href: "#experience" },
    { key: "linkSkills", label: navbar.linkSkills !== undefined ? navbar.linkSkills : "Skills", href: "#skills" },
    { key: "linkPractice", label: navbar.linkPractice !== undefined ? navbar.linkPractice : "Practice Lab", href: "#practice-lab" },
    { key: "linkContact", label: navbar.linkContact !== undefined ? navbar.linkContact : "Contact", href: "#contact" },
  ];

  // Filter out any nav link that the user explicitly removed (empty string)
  const visibleNavLinks = allNavLinks.filter((l) => l.label && l.label.trim() !== "");

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
        <div className={`hidden md:flex items-center gap-6 ${isPreset2 ? "text-xs font-sans tracking-wide text-[#B8B7AF]" : "text-xs font-mono uppercase tracking-wider opacity-85"}`}>
          {visibleNavLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              data-editable={`content-navbar-${link.key}`}
              className={isPreset2 && link.active
                ? "relative text-[#F2EEE5] font-medium py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#D8B894]"
                : "hover:text-[#F2EEE5] hover:opacity-100 transition-all py-1 cursor-pointer"
              }
              title={`Click to edit ${link.label} link`}
            >
              {link.label}
            </a>
          ))}
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
            {visibleNavLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={isPreset2 && link.active
                  ? "text-[#E8B58F] font-semibold py-1 transition-opacity"
                  : "hover:opacity-100 py-1 transition-opacity"
                }
              >
                {link.label}
              </a>
            ))}
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
