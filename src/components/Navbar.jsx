"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Selected Work", href: "#featured-work" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Practice Lab", href: "#practice-lab" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#090A0F]/85 backdrop-blur-md border-b border-white/[0.08]">
      <nav
        aria-label="Main Navigation"
        className="editorial-container flex h-16 items-center justify-between"
      >
        {/* Brand Logo / Identity */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-semibold tracking-wider text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-white text-black font-mono text-xs font-bold transition-transform duration-300 group-hover:scale-105">
            MW
          </span>
          <span className="hidden sm:inline-block font-mono text-xs uppercase tracking-[0.2em] text-gray-300 group-hover:text-white transition-colors">
            Muhammad Waqar
          </span>
        </Link>

        {/* Availability Pill */}
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for Frontend & Full-Stack roles</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-gray-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
          <Link
            href="/resume"
            className="rounded border border-white/20 px-3 py-1.5 text-white hover:bg-white hover:text-black transition-all duration-200"
          >
            Resume ↗
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/resume"
            className="rounded border border-white/20 px-2.5 py-1 text-xs font-mono text-white"
          >
            CV
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white focus:outline-none"
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
        <div className="md:hidden border-b border-white/10 bg-[#0C0E14] px-6 py-5">
          <div className="flex flex-col gap-4 text-sm font-mono tracking-wider text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
