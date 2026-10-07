"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminHeader({ activePage }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminMode, setAdminMode] = useState("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("admin_theme_mode") || "dark";
      setAdminMode(saved);
      document.documentElement.setAttribute("data-admin-theme", saved);
    } catch (_e) {}
  }, []);

  const toggleAdminMode = () => {
    const next = adminMode === "dark" ? "bright" : "dark";
    setAdminMode(next);
    try {
      localStorage.setItem("admin_theme_mode", next);
    } catch (_e) {}
    document.documentElement.setAttribute("data-admin-theme", next);
    window.dispatchEvent(new CustomEvent("admin_theme_change", { detail: { mode: next } }));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
  };

  const navItems = [
    { label: "Overview", href: "/admin/dashboard", id: "dashboard" },
    { label: "Projects", href: "/admin/projects", id: "projects" },
    { label: "Experience", href: "/admin/experience", id: "experience" },
    { label: "Skills", href: "/admin/skills", id: "skills" },
    { label: "Education", href: "/admin/education", id: "education" },
    { label: "Themes", href: "/admin/theme", id: "themes" },
    { label: "Settings", href: "/admin/settings", id: "settings" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--admin-border-subtle)] bg-[var(--admin-header-bg)] backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2.5 transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
          >
            <span className="w-7 h-7 rounded-lg bg-[var(--admin-surface-hover)] text-[var(--admin-text-heading)] font-semibold text-xs flex items-center justify-center tracking-tight shadow-sm border border-[var(--admin-border)]">
              MW
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[var(--admin-text-heading)] tracking-tight">
                Console
              </span>
              <span className="text-[11px] text-[var(--admin-text-muted)] bg-[var(--admin-surface)] border border-[var(--admin-border)] px-2 py-0.5 rounded-full font-normal">
                Admin
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                activePage === item.id ||
                pathname === item.href ||
                (item.id !== "dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-150 ${
                    isActive
                      ? "bg-[var(--admin-surface-active)] text-[var(--admin-text-heading)] font-medium shadow-sm"
                      : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text-heading)] hover:bg-[var(--admin-surface-hover)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 text-xs">
          <div className="hidden sm:flex items-center gap-2 text-[var(--admin-text-muted)] text-xs mr-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Online</span>
          </div>

          {/* Bright / Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleAdminMode}
            aria-label={adminMode === "dark" ? "Switch to Bright mode" : "Switch to Dark mode"}
            title={adminMode === "dark" ? "Switch to Bright mode" : "Switch to Dark mode"}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-[var(--admin-border)] bg-[var(--admin-surface)] text-[var(--admin-text-main)] hover:text-[var(--admin-text-heading)] hover:border-[var(--admin-border-hover)] transition-all duration-150 active:scale-[0.98] cursor-pointer shadow-sm"
          >
            {adminMode === "dark" ? (
              <>
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="hidden sm:inline">Bright</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--admin-text-main)] hover:text-[var(--admin-text-heading)] bg-[var(--admin-surface-hover)] border border-[var(--admin-border)] transition-all duration-150 active:scale-[0.98]"
          >
            <span>View Site</span>
            <svg
              className="w-3 h-3 text-[var(--admin-text-muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="text-xs text-[var(--admin-text-muted)] hover:text-[var(--admin-text-heading)] hover:bg-[var(--admin-surface-hover)] transition-all duration-150 cursor-pointer px-2.5 py-1.5 rounded-lg active:scale-[0.98]"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Mobile Navigation Sub-bar */}
      <div className="md:hidden border-t border-[var(--admin-border-subtle)] px-4 py-2 flex items-center gap-1 overflow-x-auto scrollbar-none">
        {navItems.map((item) => {
          const isActive =
            activePage === item.id ||
            pathname === item.href ||
            (item.id !== "dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-all duration-150 ${
                isActive
                  ? "bg-[var(--admin-surface-active)] text-[var(--admin-text-heading)] font-medium shadow-sm"
                  : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text-heading)] hover:bg-[var(--admin-surface-hover)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
