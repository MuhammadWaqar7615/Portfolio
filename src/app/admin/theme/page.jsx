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

    setActivating(true);
    setStatusMessage("");

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
        setStatusMessage(
          `Switched to ${THEME_PRESETS[presetId]?.name || presetId}.`
        );
      } else {
        setStatusMessage(data.message || "Failed to activate preset.");
      }
    } catch (err) {
      console.error("Error activating preset:", err);
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
      features: [
        { label: "Design Style", value: "High-Precision Dark" },
        { label: "Headings", value: "Space Grotesk" },
        { label: "Body Text", value: "Inter" },
        { label: "Accent", value: "Cyan Highlight" },
      ],
    },
    {
      ...THEME_PRESETS["preset-2"],
      key: "preset-2",
      tagline: "Theme 02",
      features: [
        { label: "Design Style", value: "Editorial Studio" },
        { label: "Headings", value: "DM Serif Display" },
        { label: "Body Text", value: "Manrope" },
        { label: "Accent", value: "Warm Sand / Peach" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1117] text-[#e2e5eb] flex flex-col font-sans antialiased selection:bg-[#252a3d]">
      <AdminHeader activePage="themes" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-8">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[#1e2230]">
          <div>
            <h1 className="text-xl font-medium text-white tracking-tight">
              Themes
            </h1>
            <p className="text-sm text-[#8b94a7] mt-0.5">
              Select your portfolio design style from the curated premade themes.
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

        {/* Feedback message */}
        {statusMessage && (
          <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs flex items-center justify-between">
            <span>✓ {statusMessage}</span>
            <button
              onClick={() => setStatusMessage("")}
              className="text-[#8b94a7] hover:text-white ml-4 text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {loading ? (
          <div className="p-16 text-center text-[#8b94a7] text-sm">
            Loading themes...
          </div>
        ) : (
          /* Premade Themes Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {presets.map((preset) => {
              const isActive = activePresetId === preset.key;

              return (
                <div
                  key={preset.key}
                  className={`rounded-xl border p-6 sm:p-7 flex flex-col justify-between transition-colors ${
                    isActive
                      ? "bg-[#181c28] border-white/30 ring-1 ring-white/10"
                      : "bg-[#161822] border-[#232736] hover:border-[#31374a]"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-medium text-[#8b94a7]">
                        {preset.tagline}
                      </span>
                      {isActive && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Active Live
                        </span>
                      )}
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-white tracking-tight">
                        {preset.name}
                      </h2>
                      <p className="text-sm text-[#9ca3af] mt-1.5 leading-relaxed">
                        {preset.description}
                      </p>
                    </div>

                    {/* Features list - Simple & Clean */}
                    <div className="space-y-2.5 pt-3 border-t border-[#232736] text-xs">
                      {preset.features.map((f, i) => (
                        <div key={i} className="flex justify-between items-center text-[#8b94a7]">
                          <span>{f.label}</span>
                          <span className="text-[#e2e5eb] font-medium">{f.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-5 mt-6 border-t border-[#232736] flex items-center justify-between">
                    <span className="text-xs text-[#8b94a7]">
                      {isActive ? "Currently in use" : "Ready to switch"}
                    </span>
                    <button
                      type="button"
                      disabled={isActive || activating}
                      onClick={() => handleActivatePreset(preset.key)}
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[#1e2333] text-[#8b94a7] cursor-default border border-[#2b3147]"
                          : activating
                          ? "bg-[#252a3c] text-[#8b94a7] cursor-wait"
                          : "bg-white text-[#0f1117] hover:bg-[#e2e5eb] active:scale-95 shadow-sm"
                      }`}
                    >
                      {isActive
                        ? "Active"
                        : activating
                        ? "Switching..."
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
