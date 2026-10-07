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

    setSwitchingTheme(true);
    setThemeFeedback("");

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
      if (res.ok) {
        setActivePresetId(presetId);
        setThemeFeedback(
          `Theme switched to ${THEME_PRESETS[presetId]?.name || presetId}.`
        );
      } else {
        setThemeFeedback(data.message || "Failed to switch theme.");
      }
    } catch (err) {
      console.error("Theme switch error:", err);
      setThemeFeedback("Error communicating with theme API.");
    } finally {
      setSwitchingTheme(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1117] text-[#8b94a7] flex items-center justify-center text-sm">
        Authenticating...
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-[#0f1117] text-[#e2e5eb] flex flex-col font-sans antialiased selection:bg-[#252a3d]">
      <AdminHeader activePage="dashboard" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[#1e2230]">
          <div>
            <h1 className="text-xl font-medium text-white tracking-tight">
              Overview
            </h1>
            <p className="text-sm text-[#8b94a7] mt-0.5">
              Portfolio metrics, production collections, and visual themes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#cbd5e1] hover:text-white bg-[#181c28] hover:bg-[#202536] border border-[#262c3e] transition-colors"
            >
              <span>View Site</span>
              <span className="text-[11px] opacity-70">↗</span>
            </Link>
          </div>
        </div>

        {/* Minimal Metrics */}
        <section aria-label="Portfolio Metrics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl border border-[#232736] bg-[#161822] hover:border-[#31374a] transition-colors">
              <span className="text-xs font-medium text-[#8b94a7] block">
                Total Projects
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-semibold text-white tracking-tight">
                  {stats.projects}
                </span>
                <span className="text-xs text-[#8b94a7]">
                  {stats.liveProjects} live
                </span>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-[#232736] bg-[#161822] hover:border-[#31374a] transition-colors">
              <span className="text-xs font-medium text-[#8b94a7] block">
                Work Experience
              </span>
              <span className="text-2xl font-semibold text-white tracking-tight block mt-2">
                {stats.experience}
              </span>
            </div>

            <div className="p-5 rounded-xl border border-[#232736] bg-[#161822] hover:border-[#31374a] transition-colors">
              <span className="text-xs font-medium text-[#8b94a7] block">
                Technical Skills
              </span>
              <span className="text-2xl font-semibold text-white tracking-tight block mt-2">
                {stats.skills}
              </span>
            </div>

            <div className="p-5 rounded-xl border border-[#232736] bg-[#161822] hover:border-[#31374a] transition-colors">
              <span className="text-xs font-medium text-[#8b94a7] block">
                Education Entries
              </span>
              <span className="text-2xl font-semibold text-white tracking-tight block mt-2">
                {stats.education}
              </span>
            </div>
          </div>
        </section>

        {/* Dedicated THEMES Section - Clean & Soothing */}
        <section id="themes" aria-label="Themes Section" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h2 className="text-base font-medium text-white tracking-tight">
                Themes
              </h2>
              <p className="text-sm text-[#8b94a7]">
                Switch between curated portfolio design presets with a single click.
              </p>
            </div>

            {themeFeedback && (
              <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
                ✓ {themeFeedback}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Theme 1: Technical Craftsman */}
            <div
              className={`rounded-xl border p-6 flex flex-col justify-between transition-colors ${
                activePresetId === "preset-1"
                  ? "bg-[#181c28] border-white/30 ring-1 ring-white/10"
                  : "bg-[#161822] border-[#232736] hover:border-[#31374a]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-medium text-[#8b94a7]">
                    Theme 01
                  </span>
                  {activePresetId === "preset-1" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Active Live
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-white tracking-tight">
                  {THEME_PRESETS["preset-1"].name}
                </h3>
                <p className="text-sm text-[#9ca3af] mt-1.5 leading-relaxed">
                  High-precision engineering portfolio with dark background, Space Grotesk headings, and crisp geometric structure.
                </p>

                <div className="mt-4 pt-4 border-t border-[#232736] flex items-center justify-between text-xs text-[#8b94a7]">
                  <span>Typography</span>
                  <span className="text-white font-medium">Space Grotesk + Inter</span>
                </div>
              </div>

              <div className="pt-5 mt-4">
                <button
                  type="button"
                  disabled={activePresetId === "preset-1" || switchingTheme}
                  onClick={() => handleActivateTheme("preset-1")}
                  className={`w-full py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activePresetId === "preset-1"
                      ? "bg-[#1e2333] text-[#8b94a7] cursor-default border border-[#2b3147]"
                      : switchingTheme
                      ? "bg-[#252a3c] text-[#8b94a7] cursor-wait"
                      : "bg-white text-[#0f1117] hover:bg-[#e2e5eb] active:scale-95 shadow-sm"
                  }`}
                >
                  {activePresetId === "preset-1"
                    ? "Currently Active"
                    : switchingTheme
                    ? "Activating..."
                    : "Activate Theme"}
                </button>
              </div>
            </div>

            {/* Theme 2: Warm Studio / Earthy Editorial */}
            <div
              className={`rounded-xl border p-6 flex flex-col justify-between transition-colors ${
                activePresetId === "preset-2"
                  ? "bg-[#181c28] border-white/30 ring-1 ring-white/10"
                  : "bg-[#161822] border-[#232736] hover:border-[#31374a]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-medium text-[#8b94a7]">
                    Theme 02
                  </span>
                  {activePresetId === "preset-2" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Active Live
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-white tracking-tight">
                  {THEME_PRESETS["preset-2"].name}
                </h3>
                <p className="text-sm text-[#9ca3af] mt-1.5 leading-relaxed">
                  Editorial studio developer portfolio with Charcoal (#151713) palette, photo hero, and classic DM Serif Display typography.
                </p>

                <div className="mt-4 pt-4 border-t border-[#232736] flex items-center justify-between text-xs text-[#8b94a7]">
                  <span>Typography</span>
                  <span className="text-white font-medium">DM Serif Display + Manrope</span>
                </div>
              </div>

              <div className="pt-5 mt-4">
                <button
                  type="button"
                  disabled={activePresetId === "preset-2" || switchingTheme}
                  onClick={() => handleActivateTheme("preset-2")}
                  className={`w-full py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activePresetId === "preset-2"
                      ? "bg-[#1e2333] text-[#8b94a7] cursor-default border border-[#2b3147]"
                      : switchingTheme
                      ? "bg-[#252a3c] text-[#8b94a7] cursor-wait"
                      : "bg-white text-[#0f1117] hover:bg-[#e2e5eb] active:scale-95 shadow-sm"
                  }`}
                >
                  {activePresetId === "preset-2"
                    ? "Currently Active"
                    : switchingTheme
                    ? "Activating..."
                    : "Activate Theme"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Collections Grid */}
        <section aria-label="Collections Hub" className="space-y-4">
          <div>
            <h2 className="text-base font-medium text-white tracking-tight">
              Collections
            </h2>
            <p className="text-sm text-[#8b94a7]">
              Manage portfolio content records, credentials, and settings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/projects"
              className="p-5 rounded-xl border border-[#232736] bg-[#161822] hover:bg-[#1a1c28] hover:border-[#31374a] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white group-hover:text-white">
                  Projects
                </span>
                <span className="text-xs text-[#8b94a7] bg-[#1e2333] px-2 py-0.5 rounded-md">
                  {stats.projects}
                </span>
              </div>
              <p className="text-xs text-[#8b94a7] mt-2 leading-relaxed">
                Manage live showcase projects, URLs, and technologies.
              </p>
            </Link>

            <Link
              href="/admin/experience"
              className="p-5 rounded-xl border border-[#232736] bg-[#161822] hover:bg-[#1a1c28] hover:border-[#31374a] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white group-hover:text-white">
                  Experience
                </span>
                <span className="text-xs text-[#8b94a7] bg-[#1e2333] px-2 py-0.5 rounded-md">
                  {stats.experience}
                </span>
              </div>
              <p className="text-xs text-[#8b94a7] mt-2 leading-relaxed">
                Career timeline entries, roles, and impact metrics.
              </p>
            </Link>

            <Link
              href="/admin/skills"
              className="p-5 rounded-xl border border-[#232736] bg-[#161822] hover:bg-[#1a1c28] hover:border-[#31374a] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white group-hover:text-white">
                  Skills
                </span>
                <span className="text-xs text-[#8b94a7] bg-[#1e2333] px-2 py-0.5 rounded-md">
                  {stats.skills}
                </span>
              </div>
              <p className="text-xs text-[#8b94a7] mt-2 leading-relaxed">
                Technical competencies, categories, and tags.
              </p>
            </Link>

            <Link
              href="/admin/education"
              className="p-5 rounded-xl border border-[#232736] bg-[#161822] hover:bg-[#1a1c28] hover:border-[#31374a] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white group-hover:text-white">
                  Education
                </span>
                <span className="text-xs text-[#8b94a7] bg-[#1e2333] px-2 py-0.5 rounded-md">
                  {stats.education}
                </span>
              </div>
              <p className="text-xs text-[#8b94a7] mt-2 leading-relaxed">
                Academic credentials and university background.
              </p>
            </Link>

            <Link
              href="/admin/settings"
              className="p-5 rounded-xl border border-[#232736] bg-[#161822] hover:bg-[#1a1c28] hover:border-[#31374a] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white group-hover:text-white">
                  Settings
                </span>
                <span className="text-xs text-[#8b94a7] bg-[#1e2333] px-2 py-0.5 rounded-md">
                  SEO
                </span>
              </div>
              <p className="text-xs text-[#8b94a7] mt-2 leading-relaxed">
                Global page title, meta description, and OpenGraph tags.
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
