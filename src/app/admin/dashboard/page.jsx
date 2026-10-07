"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "../../../components/admin/AdminHeader";
import { THEME_PRESETS } from "../../../../lib/themeConstants";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projects: 0,
    liveProjects: 0,
    experience: 0,
    skills: 0,
    education: 0,
  });
  const [activePresetId, setActivePresetId] = useState("preset-2");
  const [switchingTheme, setSwitchingTheme] = useState(false);
  const [themeFeedback, setThemeFeedback] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(() => {
        setAuthenticated(true);
        loadDashboardData();
      })
      .catch(() => {
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  const loadDashboardData = async () => {
    try {
      const [pRes, eRes, sRes, edRes, tRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/experience"),
        fetch("/api/skills"),
        fetch("/api/education"),
        fetch("/api/theme"),
      ]);

      const [pData, eData, sData, edData, tData] = await Promise.all([
        pRes.json(),
        eRes.json(),
        sRes.json(),
        edRes.json(),
        tRes.json(),
      ]);

      const projects = pData.projects || [];
      setStats({
        projects: projects.length,
        liveProjects: projects.filter((p) => p.status === "live").length,
        experience: (eData.experience || []).length,
        skills: (sData.skills || []).length,
        education: (edData.education || []).length,
      });

      if (tData.theme?.presetId) {
        setActivePresetId(tData.theme.presetId);
      } else if (tData.activePresetId) {
        setActivePresetId(tData.activePresetId);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
  };

  const handleActivateTheme = async (presetId) => {
    if (presetId === activePresetId) return;

    const previousPreset = activePresetId;
    // Optimistic instantaneous UI update
    setActivePresetId(presetId);
    setThemeFeedback(`Switched to ${THEME_PRESETS[presetId]?.name || presetId}.`);
    setSwitchingTheme(true);

    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch("/api/theme", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ presetId }),
      });

      const data = await res.json();
      if (!res.ok) {
        // Rollback on failure
        setActivePresetId(previousPreset);
        setThemeFeedback(data.message || "Failed to switch theme.");
      }
    } catch (err) {
      console.error("Theme switch error:", err);
      setActivePresetId(previousPreset);
      setThemeFeedback("Error communicating with theme API.");
    } finally {
      setSwitchingTheme(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text-main)] flex flex-col font-sans antialiased transition-colors duration-200">
        <AdminHeader activePage="dashboard" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-10 animate-pulse">
          <div className="flex justify-between items-center pb-6 border-b border-[var(--admin-border-subtle)]">
            <div className="space-y-2">
              <div className="h-6 w-32 bg-[var(--admin-surface-hover)] rounded-lg"></div>
              <div className="h-4 w-64 bg-[var(--admin-surface)] rounded-lg"></div>
            </div>
            <div className="h-8 w-24 bg-[var(--admin-surface-hover)] rounded-lg"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 rounded-xl bg-[var(--admin-surface)] border border-[var(--admin-border)]"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-[var(--admin-surface)] border border-[var(--admin-border)]"></div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text-main)] flex flex-col font-sans antialiased selection:bg-[#252a3d] transition-colors duration-200">
      <AdminHeader activePage="dashboard" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[var(--admin-border-subtle)]">
          <div>
            <h1 className="text-xl font-medium text-[var(--admin-text-heading)] tracking-tight">
              Overview
            </h1>
            <p className="text-sm text-[var(--admin-text-muted)] mt-0.5">
              Portfolio metrics, production collections, and visual themes.
            </p>
          </div>

          <div className="flex items-center gap-3">
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
          </div>
        </div>

        {/* Minimal Metrics */}
        <section aria-label="Portfolio Metrics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] hover:border-[var(--admin-border-hover)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--admin-text-muted)]">
                  Total Projects
                </span>
                <svg className="w-4 h-4 text-[var(--admin-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-semibold text-[var(--admin-text-heading)] tracking-tight">
                  {stats.projects}
                </span>
                <span className="text-xs text-[var(--admin-text-muted)]">
                  {stats.liveProjects} live
                </span>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] hover:border-[var(--admin-border-hover)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--admin-text-muted)]">
                  Work Experience
                </span>
                <svg className="w-4 h-4 text-[var(--admin-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl font-semibold text-[var(--admin-text-heading)] tracking-tight block mt-2">
                {stats.experience}
              </span>
            </div>

            <div className="p-5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] hover:border-[var(--admin-border-hover)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--admin-text-muted)]">
                  Technical Skills
                </span>
                <svg className="w-4 h-4 text-[var(--admin-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="text-2xl font-semibold text-[var(--admin-text-heading)] tracking-tight block mt-2">
                {stats.skills}
              </span>
            </div>

            <div className="p-5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] hover:border-[var(--admin-border-hover)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--admin-text-muted)]">
                  Education Entries
                </span>
                <svg className="w-4 h-4 text-[var(--admin-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5" />
                </svg>
              </div>
              <span className="text-2xl font-semibold text-[var(--admin-text-heading)] tracking-tight block mt-2">
                {stats.education}
              </span>
            </div>
          </div>
        </section>

        {/* Dedicated THEMES Section - Instant, Smooth & Clean */}
        <section id="themes" aria-label="Themes Section" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h2 className="text-base font-medium text-[var(--admin-text-heading)] tracking-tight">
                Themes
              </h2>
              <p className="text-sm text-[var(--admin-text-muted)]">
                Switch between curated portfolio design presets with a single click.
              </p>
            </div>

            {themeFeedback && (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg transition-all animate-fade-in">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {themeFeedback}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Theme 1: Technical Craftsman */}
            <div
              className={`rounded-xl border p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                activePresetId === "preset-1"
                  ? "bg-[var(--admin-surface-hover)] border-[var(--admin-text-heading)]/40 ring-1 ring-[var(--admin-text-heading)]/10"
                  : "bg-[var(--admin-surface)] border-[var(--admin-border)] hover:border-[var(--admin-border-hover)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span className="text-xs font-medium text-[var(--admin-text-muted)]">
                      Theme 01
                    </span>
                  </div>
                  {activePresetId === "preset-1" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Active Live
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-[var(--admin-text-heading)] tracking-tight">
                  {THEME_PRESETS["preset-1"].name}
                </h3>
                <p className="text-sm text-[var(--admin-text-muted)] mt-1.5 leading-relaxed">
                  High-precision engineering portfolio with dark background, Space Grotesk headings, and crisp geometric structure.
                </p>

                <div className="mt-4 pt-4 border-t border-[var(--admin-border)] flex items-center justify-between text-xs text-[var(--admin-text-muted)]">
                  <span>Typography</span>
                  <span className="text-[var(--admin-text-heading)] font-medium">Space Grotesk + Inter</span>
                </div>
              </div>

              <div className="pt-5 mt-4">
                <button
                  type="button"
                  disabled={activePresetId === "preset-1" || switchingTheme}
                  onClick={() => handleActivateTheme("preset-1")}
                  className={`w-full py-2.5 rounded-lg text-xs font-medium transition-all duration-150 active:scale-[0.98] cursor-pointer ${
                    activePresetId === "preset-1"
                      ? "bg-[var(--admin-surface-active)] text-[var(--admin-text-muted)] cursor-default border border-[var(--admin-border)]"
                      : "bg-[var(--admin-btn-primary-bg)] text-[var(--admin-btn-primary-text)] hover:bg-[var(--admin-btn-primary-hover)] shadow-sm"
                  }`}
                >
                  {activePresetId === "preset-1"
                    ? "Currently Active"
                    : "Activate Theme"}
                </button>
              </div>
            </div>

            {/* Theme 2: Warm Studio / Earthy Editorial */}
            <div
              className={`rounded-xl border p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                activePresetId === "preset-2"
                  ? "bg-[var(--admin-surface-hover)] border-[var(--admin-text-heading)]/40 ring-1 ring-[var(--admin-text-heading)]/10"
                  : "bg-[var(--admin-surface)] border-[var(--admin-border)] hover:border-[var(--admin-border-hover)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="text-xs font-medium text-[var(--admin-text-muted)]">
                      Theme 02
                    </span>
                  </div>
                  {activePresetId === "preset-2" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Active Live
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-[var(--admin-text-heading)] tracking-tight">
                  {THEME_PRESETS["preset-2"].name}
                </h3>
                <p className="text-sm text-[var(--admin-text-muted)] mt-1.5 leading-relaxed">
                  Editorial studio developer portfolio with Charcoal (#151713) palette, photo hero, and classic DM Serif Display typography.
                </p>

                <div className="mt-4 pt-4 border-t border-[var(--admin-border)] flex items-center justify-between text-xs text-[var(--admin-text-muted)]">
                  <span>Typography</span>
                  <span className="text-[var(--admin-text-heading)] font-medium">DM Serif Display + Manrope</span>
                </div>
              </div>

              <div className="pt-5 mt-4">
                <button
                  type="button"
                  disabled={activePresetId === "preset-2" || switchingTheme}
                  onClick={() => handleActivateTheme("preset-2")}
                  className={`w-full py-2.5 rounded-lg text-xs font-medium transition-all duration-150 active:scale-[0.98] cursor-pointer ${
                    activePresetId === "preset-2"
                      ? "bg-[var(--admin-surface-active)] text-[var(--admin-text-muted)] cursor-default border border-[var(--admin-border)]"
                      : "bg-[var(--admin-btn-primary-bg)] text-[var(--admin-btn-primary-text)] hover:bg-[var(--admin-btn-primary-hover)] shadow-sm"
                  }`}
                >
                  {activePresetId === "preset-2"
                    ? "Currently Active"
                    : "Activate Theme"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Collections Grid */}
        <section aria-label="Collections Hub" className="space-y-4">
          <div>
            <h2 className="text-base font-medium text-[var(--admin-text-heading)] tracking-tight">
              Collections
            </h2>
            <p className="text-sm text-[var(--admin-text-muted)]">
              Manage portfolio content records, credentials, and settings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/projects"
              className="p-5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] hover:bg-[var(--admin-surface-hover)] hover:border-[var(--admin-border-hover)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--admin-text-heading)]">
                  Projects
                </span>
                <span className="text-xs text-[var(--admin-tag-text)] bg-[var(--admin-tag-bg)] px-2 py-0.5 rounded-md font-medium">
                  {stats.projects}
                </span>
              </div>
              <p className="text-xs text-[var(--admin-text-muted)] mt-2 leading-relaxed">
                Manage live showcase projects, URLs, and technologies.
              </p>
            </Link>

            <Link
              href="/admin/experience"
              className="p-5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] hover:bg-[var(--admin-surface-hover)] hover:border-[var(--admin-border-hover)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--admin-text-heading)]">
                  Experience
                </span>
                <span className="text-xs text-[var(--admin-tag-text)] bg-[var(--admin-tag-bg)] px-2 py-0.5 rounded-md font-medium">
                  {stats.experience}
                </span>
              </div>
              <p className="text-xs text-[var(--admin-text-muted)] mt-2 leading-relaxed">
                Career timeline entries, roles, and impact metrics.
              </p>
            </Link>

            <Link
              href="/admin/skills"
              className="p-5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] hover:bg-[var(--admin-surface-hover)] hover:border-[var(--admin-border-hover)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--admin-text-heading)]">
                  Skills
                </span>
                <span className="text-xs text-[var(--admin-tag-text)] bg-[var(--admin-tag-bg)] px-2 py-0.5 rounded-md font-medium">
                  {stats.skills}
                </span>
              </div>
              <p className="text-xs text-[var(--admin-text-muted)] mt-2 leading-relaxed">
                Technical competencies, categories, and tags.
              </p>
            </Link>

            <Link
              href="/admin/education"
              className="p-5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] hover:bg-[var(--admin-surface-hover)] hover:border-[var(--admin-border-hover)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--admin-text-heading)]">
                  Education
                </span>
                <span className="text-xs text-[var(--admin-tag-text)] bg-[var(--admin-tag-bg)] px-2 py-0.5 rounded-md font-medium">
                  {stats.education}
                </span>
              </div>
              <p className="text-xs text-[var(--admin-text-muted)] mt-2 leading-relaxed">
                Academic credentials and university background.
              </p>
            </Link>

            <Link
              href="/admin/settings"
              className="p-5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] hover:bg-[var(--admin-surface-hover)] hover:border-[var(--admin-border-hover)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--admin-text-heading)]">
                  Settings
                </span>
                <span className="text-xs text-[var(--admin-tag-text)] bg-[var(--admin-tag-bg)] px-2 py-0.5 rounded-md font-medium">
                  SEO
                </span>
              </div>
              <p className="text-xs text-[var(--admin-text-muted)] mt-2 leading-relaxed">
                Global page title, meta description, and OpenGraph tags.
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
