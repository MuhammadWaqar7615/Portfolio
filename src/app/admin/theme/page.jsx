"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "../../../components/admin/AdminHeader";
import { THEME_PRESETS } from "../../../../lib/themeConstants";

export default function AdminThemesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activating, setActivating] = useState(false);
  const [activePresetId, setActivePresetId] = useState("preset-2");
  const [statusMessage, setStatusMessage] = useState("");
  const [adminMode, setAdminMode] = useState("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("admin_theme_mode") || "dark";
      setAdminMode(saved);
    } catch (_e) {}

    const handleThemeChange = (e) => {
      if (e.detail?.mode) setAdminMode(e.detail.mode);
    };
    window.addEventListener("admin_theme_change", handleThemeChange);
    return () => window.removeEventListener("admin_theme_change", handleThemeChange);
  }, []);

  const handleSetAdminMode = (newMode) => {
    setAdminMode(newMode);
    try {
      localStorage.setItem("admin_theme_mode", newMode);
      localStorage.setItem("theme_mode", newMode === "bright" ? "light" : "dark");
    } catch (_e) {}
    document.documentElement.setAttribute("data-admin-theme", newMode);
    window.dispatchEvent(new CustomEvent("admin_theme_change", { detail: { mode: newMode } }));
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchActiveTheme();
  }, [router]);

  const fetchActiveTheme = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/theme");
      const data = await res.json();
      if (data.theme?.presetId) {
        setActivePresetId(data.theme.presetId);
      } else if (data.activePresetId) {
        setActivePresetId(data.activePresetId);
      }
    } catch (err) {
      console.error("Failed to fetch active theme:", err);
      setStatusMessage("Failed to load active theme status from server.");
    } finally {
      setLoading(false);
    }
  };

  const handleActivatePreset = async (presetId) => {
    if (presetId === activePresetId) return;

    const previousPreset = activePresetId;
    // Optimistic instantaneous UI update
    setActivePresetId(presetId);
    setStatusMessage(`Switched to ${THEME_PRESETS[presetId]?.name || presetId}.`);
    setActivating(true);

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
        setStatusMessage(data.message || "Failed to activate preset.");
      }
    } catch (err) {
      console.error("Error activating preset:", err);
      setActivePresetId(previousPreset);
      setStatusMessage("Network error: Could not connect to theme API.");
    } finally {
      setActivating(false);
    }
  };

  const presets = [
    {
      ...THEME_PRESETS["preset-1"],
      key: "preset-1",
      tagline: "Theme 01",
      accentColor: "bg-cyan-400",
      features: [
        { label: "Design Style", value: "Ultra-Minimalist" },
        { label: "Headings", value: "Space Grotesk" },
        { label: "Body Text", value: "Inter" },
        { label: "Accent Tone", value: "Sky Blue Highlight" },
      ],
    },
    {
      ...THEME_PRESETS["preset-2"],
      key: "preset-2",
      tagline: "Theme 02",
      accentColor: "bg-amber-500",
      features: [
        { label: "Design Style", value: "Editorial Studio" },
        { label: "Headings", value: "DM Serif Display" },
        { label: "Body Text", value: "Manrope" },
        { label: "Accent Tone", value: "Warm Sand / Peach" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text-main)] flex flex-col font-sans antialiased selection:bg-[#252a3d] transition-colors duration-200">
      <AdminHeader activePage="themes" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-8">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[var(--admin-border-subtle)]">
          <div>
            <h1 className="text-xl font-medium text-[var(--admin-text-heading)] tracking-tight">
              Themes
            </h1>
            <p className="text-sm text-[var(--admin-text-muted)] mt-0.5">
              Select your portfolio design style from the curated premade themes with built-in Dark & Bright modes.
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

        {/* Feedback message */}
        {statusMessage && (
          <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-xs flex items-center justify-between transition-all animate-fade-in">
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>{statusMessage}</span>
            </div>
            <button
              onClick={() => setStatusMessage("")}
              className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-heading)] ml-4 text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Color Mode Switcher Card */}
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 sm:p-6 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-text-muted)]">
                  Appearance Mode
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--admin-surface-active)] text-[var(--admin-text-main)] border border-[var(--admin-border)]">
                  {adminMode === "bright" ? "Bright Active" : "Dark Active"}
                </span>
              </div>
              <p className="text-xs text-[var(--admin-text-muted)] mt-1">
                Toggle between deep slate Dark Mode and clean minimalist Bright Mode.
              </p>
            </div>

            {/* Segmented Toggle */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[var(--admin-surface-active)] border border-[var(--admin-border)] shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => handleSetAdminMode("dark")}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                  adminMode === "dark"
                    ? "bg-[var(--admin-surface)] text-[var(--admin-text-heading)] shadow-sm border border-[var(--admin-border)]"
                    : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text-heading)]"
                }`}
              >
                <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span>Dark Mode</span>
              </button>
              <button
                type="button"
                onClick={() => handleSetAdminMode("bright")}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                  adminMode === "bright"
                    ? "bg-[var(--admin-surface)] text-[var(--admin-text-heading)] shadow-sm border border-[var(--admin-border)]"
                    : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text-heading)]"
                }`}
              >
                <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Bright Mode</span>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-72 rounded-xl bg-[var(--admin-surface)] border border-[var(--admin-border)]"></div>
            ))}
          </div>
        ) : (
          /* Premade Themes Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {presets.map((preset) => {
              const isActive = activePresetId === preset.key;

              return (
                <div
                  key={preset.key}
                  className={`rounded-xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                    isActive
                      ? "bg-[var(--admin-surface-hover)] border-[var(--admin-text-heading)]/40 ring-1 ring-[var(--admin-text-heading)]/10"
                      : "bg-[var(--admin-surface)] border-[var(--admin-border)] hover:border-[var(--admin-border-hover)]"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${preset.accentColor}`}></span>
                        <span className="text-xs font-medium text-[var(--admin-text-muted)]">
                          {preset.tagline}
                        </span>
                      </div>
                      {isActive && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Active Live
                        </span>
                      )}
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-[var(--admin-text-heading)] tracking-tight">
                        {preset.name}
                      </h2>
                      <p className="text-sm text-[var(--admin-text-muted)] mt-1.5 leading-relaxed">
                        {preset.description}
                      </p>
                    </div>

                    {/* Features list - Simple & Clean */}
                    <div className="space-y-2.5 pt-3 border-t border-[var(--admin-border)] text-xs">
                      {preset.features.map((f, i) => (
                        <div key={i} className="flex justify-between items-center text-[var(--admin-text-muted)]">
                          <span>{f.label}</span>
                          <span className="text-[var(--admin-text-heading)] font-medium">{f.value}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center text-[var(--admin-text-muted)]">
                        <span>Color Schemes</span>
                        <span className="text-[var(--admin-text-heading)] font-medium">Dark & Bright Modes</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-5 mt-6 border-t border-[var(--admin-border)] flex items-center justify-between">
                    <span className="text-xs text-[var(--admin-text-muted)]">
                      {isActive ? "Currently in use" : "Ready to switch"}
                    </span>
                    <button
                      type="button"
                      disabled={isActive || activating}
                      onClick={() => handleActivatePreset(preset.key)}
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-150 active:scale-[0.98] cursor-pointer ${
                        isActive
                          ? "bg-[var(--admin-surface-active)] text-[var(--admin-text-muted)] cursor-default border border-[var(--admin-border)]"
                          : "bg-[var(--admin-btn-primary-bg)] text-[var(--admin-btn-primary-text)] hover:bg-[var(--admin-btn-primary-hover)] shadow-sm"
                      }`}
                    >
                      {isActive
                        ? "Active"
                        : "Activate Theme"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
