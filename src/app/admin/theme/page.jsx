"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ALLOWED_FONTS,
  DEFAULT_SECTIONS,
  DEFAULT_THEME,
  DEFAULT_LIGHT_COLORS,
  DEFAULT_CONTENT,
  THEME_PRESETS,
} from "../../../../lib/themeConstants";

function getLuminance(hex) {
  if (!hex || typeof hex !== "string") return 0;
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map((x) => x + x).join("");
  if (c.length !== 6) return 0;
  const num = parseInt(c, 16);
  const r = (num >> 16) / 255;
  const g = ((num >> 8) & 0xff) / 255;
  const b = (num & 0xff) / 255;

  const a = [r, g, b].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1, hex2) {
  try {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return ((brightest + 0.05) / (darkest + 0.05)).toFixed(2);
  } catch {
    return "4.50";
  }
}

export default function ThemeCustomizer() {
  const router = useRouter();
  const iframeRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [rollingBack, setRollingBack] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("info"); // info, success, error
  const [deviceView, setDeviceView] = useState("desktop"); // desktop, tablet, mobile
  const [previewMode, setPreviewMode] = useState("dark"); // dark, light
  const [activePalette, setActivePalette] = useState("dark"); // dark, light (in colors tab)
  const [activeTab, setActiveTab] = useState("content"); // content, colors, typography, layout, sections
  const [activeControl, setActiveControl] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [resetMenuOpen, setResetMenuOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [publishedTheme, setPublishedTheme] = useState(DEFAULT_THEME);
  const [historyList, setHistoryList] = useState([]);

  // Fetch initial theme from API
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchTheme();
  }, [router]);

  const fetchTheme = async () => {
    try {
      const res = await fetch("/api/theme");
      const data = await res.json();
      if (data.theme) {
        const loadedTheme = {
          ...DEFAULT_THEME,
          ...data.theme,
          presetId: data.theme.presetId || "preset-1",
          colors: { ...DEFAULT_THEME.colors, ...(data.theme.colors || {}) },
          lightColors: { ...DEFAULT_THEME.lightColors, ...(data.theme.lightColors || {}) },
          content: {
            navbar: { ...DEFAULT_CONTENT.navbar, ...(data.theme.content?.navbar || {}) },
            hero: { ...DEFAULT_CONTENT.hero, ...(data.theme.content?.hero || {}) },
            about: { ...DEFAULT_CONTENT.about, ...(data.theme.content?.about || {}) },
            sectionHeaders: { ...DEFAULT_CONTENT.sectionHeaders, ...(data.theme.content?.sectionHeaders || {}) },
            goals: { ...DEFAULT_CONTENT.goals, ...(data.theme.content?.goals || {}) },
            footer: { ...DEFAULT_CONTENT.footer, ...(data.theme.content?.footer || {}) },
          },
          typography: { ...DEFAULT_THEME.typography, ...(data.theme.typography || {}) },
          sections: data.theme.sections || DEFAULT_SECTIONS,
        };
        setTheme(loadedTheme);
        setPublishedTheme(loadedTheme);
        setHistoryList(data.theme.history || []);
      }
    } catch (err) {
      console.error("Error fetching theme:", err);
      setStatusMessage("Failed to load active theme.");
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  // Debounced transmission to iframe via postMessage with strict origin
  const debounceTimerRef = useRef(null);
  const transmitDraftToIframe = useCallback((draftTheme) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { type: "THEME_PREVIEW_UPDATE", theme: draftTheme },
          window.location.origin
        );
      }
    }, 60);
  }, []);

  // Update theme and trigger postMessage
  const updateTheme = (updater) => {
    setTheme((prev) => {
      const updated = typeof updater === "function" ? updater(prev) : updater;
      transmitDraftToIframe(updated);
      setHasUnsavedChanges(true);
      return updated;
    });
  };

  // Listen for iframe messages (SELECT_ELEMENT and IFRAME_READY)
  useEffect(() => {
    const handleParentMessage = (event) => {
      // Strict origin validation
      if (event.origin !== window.location.origin) {
        console.warn("[Admin] Rejected postMessage from untrusted origin:", event.origin);
        return;
      }

      if (event.data?.type === "SELECT_ELEMENT") {
        const fieldKey = event.data.fieldKey;
        setActiveControl(fieldKey);

        if (fieldKey.startsWith("content-")) {
          setActiveTab("content");
          setTimeout(() => {
            const inputEl = document.getElementById(fieldKey);
            if (inputEl) {
              inputEl.scrollIntoView({ behavior: "smooth", block: "center" });
              inputEl.focus();
            }
          }, 80);
        } else if (
          fieldKey === "headingColor" ||
          fieldKey === "text" ||
          fieldKey === "accent" ||
          fieldKey === "background" ||
          fieldKey === "primary" ||
          fieldKey === "cardBg"
        ) {
          setActiveTab("colors");
        } else if (fieldKey === "radius" || fieldKey === "spacing") {
          setActiveTab("layout");
        }
      } else if (event.data?.type === "IFRAME_READY") {
        // Iframe is ready, push initial theme and mode
        transmitDraftToIframe(theme);
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            { type: "THEME_MODE_UPDATE", mode: previewMode },
            window.location.origin
          );
        }
      }
    };

    window.addEventListener("message", handleParentMessage);
    return () => window.removeEventListener("message", handleParentMessage);
  }, [theme, transmitDraftToIframe, previewMode]);

  const handlePreviewModeChange = (mode) => {
    setPreviewMode(mode);
    setActivePalette(mode);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "THEME_MODE_UPDATE", mode },
        window.location.origin
      );
    }
  };

  const handlePaletteSelect = (palette) => {
    setActivePalette(palette);
    handlePreviewModeChange(palette);
  };

  const handleColorChange = (palette, key, val) => {
    const paletteKey = palette === "light" ? "lightColors" : "colors";
    updateTheme((prev) => ({
      ...prev,
      [paletteKey]: {
        ...(prev[paletteKey] || (palette === "light" ? DEFAULT_LIGHT_COLORS : DEFAULT_THEME.colors)),
        [key]: val,
      },
    }));
  };

  const handleContentChange = (section, field, val) => {
    updateTheme((prev) => {
      const currentContent = prev.content || DEFAULT_CONTENT;
      const currentSection = currentContent[section] || (DEFAULT_CONTENT[section] || {});
      return {
        ...prev,
        content: {
          ...currentContent,
          [section]: {
            ...currentSection,
            [field]: val,
          },
        },
      };
    });
  };

  const handleFontChange = (type, font) => {
    updateTheme((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        [type]: font,
      },
    }));
  };

  const handleRadiusChange = (radiusVal) => {
    updateTheme((prev) => ({
      ...prev,
      radius: radiusVal,
    }));
  };

  const handleSpacingChange = (spacingVal) => {
    updateTheme((prev) => ({
      ...prev,
      spacing: spacingVal,
    }));
  };

  const handleToggleSection = (sectionId) => {
    if (sectionId === "hero" || sectionId === "contact") return;
    updateTheme((prev) => ({
      ...prev,
      sections: (prev.sections || DEFAULT_SECTIONS).map((s) =>
        s.sectionId === sectionId ? { ...s, visible: !s.visible } : s
      ),
    }));
  };

  const handleMoveSection = (index, direction) => {
    updateTheme((prev) => {
      const list = [...(prev.sections || DEFAULT_SECTIONS)];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;
      return {
        ...prev,
        sections: list.map((item, idx) => ({ ...item, order: idx + 1 })),
      };
    });
  };

  // Publish theme to database
  const handlePublish = async () => {
    setPublishing(true);
    setStatusMessage("");
    const token = localStorage.getItem("admin_token");

    try {
      const res = await fetch("/api/theme", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(theme),
      });

      const json = await res.json();
      if (res.ok) {
        setStatusMessage("Theme and content published to live site successfully!");
        setStatusType("success");
        setHasUnsavedChanges(false);
        setPublishedTheme(theme);
        if (json.theme?.history) {
          setHistoryList(json.theme.history);
        }
      } else {
        setStatusMessage(json.message || "Failed to publish theme.");
        setStatusType("error");
      }
    } catch (err) {
      console.error(err);
      setStatusMessage("Network error publishing theme.");
      setStatusType("error");
    } finally {
      setPublishing(false);
    }
  };

  // Rollback to historical version
  const handleRollback = async (index) => {
    if (!confirm("Are you sure you want to revert to this previous published theme?")) return;
    setRollingBack(true);
    const token = localStorage.getItem("admin_token");

    try {
      const res = await fetch("/api/theme/rollback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ historyIndex: index }),
      });

      const json = await res.json();
      if (res.ok && json.theme) {
        setTheme(json.theme);
        setPublishedTheme(json.theme);
        setHistoryList(json.theme.history || []);
        transmitDraftToIframe(json.theme);
        setHasUnsavedChanges(false);
        setStatusMessage("Theme reverted successfully!");
        setStatusType("success");
      } else {
        setStatusMessage(json.message || "Rollback failed.");
        setStatusType("error");
      }
    } catch (err) {
      console.error(err);
      setStatusMessage("Network error during rollback.");
      setStatusType("error");
    } finally {
      setRollingBack(false);
    }
  };

  // Discard draft changes and revert to current published state
  const handleDiscardChanges = () => {
    if (!hasUnsavedChanges) return;
    if (!confirm("Discard all unsaved draft changes and revert to the published theme?")) return;
    setTheme(publishedTheme);
    transmitDraftToIframe(publishedTheme);
    setHasUnsavedChanges(false);
    setStatusMessage("Draft changes discarded. Reverted to published theme.");
    setStatusType("info");
    setResetMenuOpen(false);
  };

  // Switch Theme Preset
  const handleSelectPreset = (presetKey) => {
    const targetPreset = THEME_PRESETS[presetKey];
    if (!targetPreset) return;

    if (
      hasUnsavedChanges &&
      !confirm(
        `Switch to "${targetPreset.name}" preset? Any unpublished edits in the current draft will be replaced by ${targetPreset.name} defaults.`
      )
    ) {
      return;
    }

    const newTheme = {
      ...theme,
      presetId: targetPreset.id,
      colors: { ...targetPreset.colors },
      lightColors: { ...targetPreset.lightColors },
      typography: { ...targetPreset.typography },
      radius: targetPreset.radius,
      spacing: targetPreset.spacing,
      sections: targetPreset.sections ? [...targetPreset.sections] : theme.sections,
      content: JSON.parse(JSON.stringify(targetPreset.content)),
    };

    updateTheme(newTheme);
    setStatusMessage(`Loaded "${targetPreset.name}" preset.`);
    setStatusType("info");
  };

  // Reset entire theme to active preset defaults
  const handleResetToDefaults = () => {
    const activePreset = THEME_PRESETS[theme.presetId || "preset-1"] || THEME_PRESETS["preset-1"];
    if (
      !confirm(
        `Reset all settings to "${activePreset.name}" preset defaults? You can preview before clicking 'Publish Live'.`
      )
    )
      return;

    const resetTheme = {
      ...theme,
      presetId: activePreset.id,
      colors: { ...activePreset.colors },
      lightColors: { ...activePreset.lightColors },
      typography: { ...activePreset.typography },
      radius: activePreset.radius,
      spacing: activePreset.spacing,
      content: JSON.parse(JSON.stringify(activePreset.content)),
      sections: activePreset.sections ? [...activePreset.sections] : [...DEFAULT_SECTIONS],
    };

    setTheme(resetTheme);
    transmitDraftToIframe(resetTheme);
    setHasUnsavedChanges(true);
    setStatusMessage(`Theme reset to "${activePreset.name}" defaults (draft). Preview updated.`);
    setStatusType("info");
    setResetMenuOpen(false);
  };

  // Reset text/content to defaults
  const handleResetContent = () => {
    const activePreset = THEME_PRESETS[theme.presetId || "preset-1"] || THEME_PRESETS["preset-1"];
    updateTheme((prev) => ({
      ...prev,
      content: JSON.parse(JSON.stringify(activePreset.content)),
    }));
    setStatusMessage(`Portfolio text reset to "${activePreset.name}" defaults (draft).`);
    setStatusType("info");
  };

  const handleResetDarkColors = () => {
    const activePreset = THEME_PRESETS[theme.presetId || "preset-1"] || THEME_PRESETS["preset-1"];
    updateTheme((prev) => ({
      ...prev,
      colors: { ...activePreset.colors },
    }));
    setStatusMessage(`Dark theme colors reset to "${activePreset.name}" defaults.`);
    setStatusType("info");
    setResetMenuOpen(false);
  };

  const handleResetLightColors = () => {
    const activePreset = THEME_PRESETS[theme.presetId || "preset-1"] || THEME_PRESETS["preset-1"];
    updateTheme((prev) => ({
      ...prev,
      lightColors: { ...activePreset.lightColors },
    }));
    setStatusMessage(`White theme colors reset to "${activePreset.name}" defaults.`);
    setStatusType("info");
    setResetMenuOpen(false);
  };

  const handlePrincipleChange = (index, field, val) => {
    updateTheme((prev) => {
      const currentContent = prev.content || DEFAULT_CONTENT;
      const currentAbout = currentContent.about || DEFAULT_CONTENT.about;
      const currentPrinciples = [
        ...(Array.isArray(currentAbout.principles) && currentAbout.principles.length > 0
          ? currentAbout.principles
          : DEFAULT_CONTENT.about.principles),
      ];
      currentPrinciples[index] = {
        ...currentPrinciples[index],
        [field]: val,
      };
      return {
        ...prev,
        content: {
          ...currentContent,
          about: {
            ...currentAbout,
            principles: currentPrinciples,
          },
        },
      };
    });
  };

  // Reset typography only to active preset default
  const handleResetTypography = () => {
    const activePreset = THEME_PRESETS[theme.presetId || "preset-1"] || THEME_PRESETS["preset-1"];
    updateTheme((prev) => ({
      ...prev,
      typography: { ...activePreset.typography },
    }));
    setStatusMessage(`Typography reset to "${activePreset.name}" defaults.`);
    setStatusType("info");
    setResetMenuOpen(false);
  };

  // Reset layout (radius & spacing) to active preset default
  const handleResetLayout = () => {
    const activePreset = THEME_PRESETS[theme.presetId || "preset-1"] || THEME_PRESETS["preset-1"];
    updateTheme((prev) => ({
      ...prev,
      radius: activePreset.radius || DEFAULT_THEME.radius,
      spacing: activePreset.spacing || DEFAULT_THEME.spacing,
    }));
    setStatusMessage(`Radius and spacing reset to "${activePreset.name}" defaults.`);
    setStatusType("info");
    setResetMenuOpen(false);
  };

  // Reset sections order & visibility to default
  const handleResetSections = () => {
    updateTheme((prev) => ({
      ...prev,
      sections: [...DEFAULT_SECTIONS],
    }));
    setStatusMessage("Sections reset to default order and visibility.");
    setStatusType("info");
  };

  // Contrast Checks based on active palette
  const currentColors =
    activePalette === "light"
      ? theme.lightColors || DEFAULT_LIGHT_COLORS
      : theme.colors || DEFAULT_THEME.colors;
  const activePresetConfig = THEME_PRESETS[theme.presetId || "preset-1"] || THEME_PRESETS["preset-1"];
  const currentDefaults =
    activePalette === "light"
      ? (activePresetConfig.lightColors || DEFAULT_LIGHT_COLORS)
      : (activePresetConfig.colors || DEFAULT_THEME.colors);

  const textContrast = getContrastRatio(
    currentColors.text || "#334155",
    currentColors.background || "#F8FAFC"
  );
  const headingContrast = getContrastRatio(
    currentColors.headingColor || "#0F172A",
    currentColors.background || "#F8FAFC"
  );
  const hasTextContrastWarning = parseFloat(textContrast) < 4.5;
  const hasHeadingContrastWarning = parseFloat(headingContrast) < 3.0;

  // Resolved content with deep defaults
  const activeContentDefaults = activePresetConfig.content || DEFAULT_CONTENT;
  const resolvedContent = {
    navbar: { ...(activeContentDefaults.navbar || {}), ...(theme.content?.navbar || {}) },
    hero: { ...(activeContentDefaults.hero || {}), ...(theme.content?.hero || {}) },
    about: { ...(activeContentDefaults.about || {}), ...(theme.content?.about || {}) },
    sectionHeaders: { ...(activeContentDefaults.sectionHeaders || {}), ...(theme.content?.sectionHeaders || {}) },
    goals: { ...(activeContentDefaults.goals || {}), ...(theme.content?.goals || {}) },
    footer: { ...(activeContentDefaults.footer || {}), ...(theme.content?.footer || {}) },
  };

  const principles = Array.isArray(resolvedContent.about.principles) && resolvedContent.about.principles.length > 0
    ? resolvedContent.about.principles
    : (activeContentDefaults.about?.principles || DEFAULT_CONTENT.about.principles);

  if (loading) {
    return (
      <div className="p-8 text-white bg-[#090A0F] min-h-screen flex items-center justify-center font-mono text-sm">
        Loading live theme customizer...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090A0F] text-white flex flex-col font-sans overflow-hidden">
      {/* Top Studio Bar */}
      <header className="h-16 border-b border-white/10 bg-[#0C0E14] px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard"
            className="text-xs font-mono text-gray-400 hover:text-white transition-colors"
          >
            ← Dashboard
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <h1 className="text-sm font-bold font-mono uppercase tracking-wider text-white flex items-center gap-2">
            Theme & Content Studio
            {hasUnsavedChanges ? (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Draft (Unpublished)
              </span>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Published
              </span>
            )}
          </h1>
        </div>

        {/* Device & Mode Viewport Selectors */}
        <div className="hidden md:flex items-center gap-3">
          {/* Device Switcher */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded p-1 gap-1">
            <button
              onClick={() => setDeviceView("desktop")}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                deviceView === "desktop" ? "bg-white/15 text-white font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              Desktop
            </button>
            <button
              onClick={() => setDeviceView("tablet")}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                deviceView === "tablet" ? "bg-white/15 text-white font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              Tablet (768px)
            </button>
            <button
              onClick={() => setDeviceView("mobile")}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                deviceView === "mobile" ? "bg-white/15 text-white font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              Mobile (375px)
            </button>
          </div>

          {/* Theme Mode Switcher (Dark vs White/Light) */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded p-1 gap-1">
            <button
              type="button"
              onClick={() => handlePreviewModeChange("dark")}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
                previewMode === "dark"
                  ? "bg-white/20 text-white font-bold shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
              title="Preview Live Site in Dark Theme"
            >
              <span>🌙</span> Dark
            </button>
            <button
              type="button"
              onClick={() => handlePreviewModeChange("light")}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
                previewMode === "light"
                  ? "bg-sky-400 text-black font-bold shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
              title="Preview Live Site in White / Light Theme"
            >
              <span>☀️</span> White / Light
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Reset Theme Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setResetMenuOpen(!resetMenuOpen)}
              className="text-xs font-mono px-3 py-2 border border-white/10 hover:border-white/30 rounded text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer bg-white/5"
              title="Reset theme and content options"
            >
              <span>↺ Reset</span>
              <span className="text-[9px] opacity-60">▼</span>
            </button>

            {resetMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setResetMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-72 rounded-md shadow-2xl bg-[#11141C] border border-white/15 p-1.5 z-50 text-xs font-mono">
                  <button
                    type="button"
                    onClick={handleDiscardChanges}
                    disabled={!hasUnsavedChanges}
                    className="w-full text-left px-3 py-2 rounded hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed flex flex-col gap-0.5 text-gray-200 transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <span>↺</span> Discard Draft Changes
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Revert unsaved edits back to currently published live site
                    </span>
                  </button>

                  <div className="h-px bg-white/10 my-1" />

                  <button
                    type="button"
                    onClick={() => {
                      handleResetContent();
                      setResetMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded hover:bg-white/10 text-gray-200 transition-colors flex flex-col gap-0.5 cursor-pointer"
                  >
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <span>✍️</span> Reset Text / Copy Only
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Restore default copy for Hero, About, and Goals
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleResetLightColors();
                      setResetMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded hover:bg-white/10 text-gray-200 transition-colors flex flex-col gap-0.5 cursor-pointer"
                  >
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <span>☀️</span> Reset White Theme Colors
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Restore default light theme palette
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleResetDarkColors();
                      setResetMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded hover:bg-white/10 text-gray-200 transition-colors flex flex-col gap-0.5 cursor-pointer"
                  >
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <span>🌙</span> Reset Dark Theme Colors
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Restore default dark theme palette
                    </span>
                  </button>

                  <div className="h-px bg-white/10 my-1" />

                  <button
                    type="button"
                    onClick={handleResetToDefaults}
                    className="w-full text-left px-3 py-2 rounded hover:bg-rose-950/40 text-rose-300 transition-colors flex flex-col gap-0.5 cursor-pointer"
                  >
                    <span className="font-semibold flex items-center gap-1.5">
                      <span>⚙️</span> Restore Factory Defaults (All)
                    </span>
                    <span className="text-[10px] text-rose-400/70">
                      Reset all colors, copy, fonts, radius, and sections
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setHistoryOpen(!historyOpen)}
            className="text-xs font-mono px-3 py-2 border border-white/10 hover:border-white/30 rounded text-gray-300 hover:text-white transition-colors"
          >
            History ({historyList.length})
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-gray-400 hover:text-white transition-colors hidden sm:inline-block"
          >
            View Live Site ↗
          </a>
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="text-xs font-mono uppercase tracking-wider font-bold px-5 py-2 rounded bg-sky-400 hover:bg-sky-300 text-black transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-sky-500/10"
          >
            {publishing ? "Publishing..." : "Publish Live"}
          </button>
        </div>
      </header>

      {/* Contrast Warning Banner (Warn, Don't Block) */}
      {(hasTextContrastWarning || hasHeadingContrastWarning) && (
        <div className="bg-amber-950/80 border-b border-amber-500/30 px-6 py-2.5 flex items-center justify-between text-xs font-mono text-amber-200">
          <div className="flex items-center gap-2">
            <span>⚠️ Accessibility Notice ({activePalette.toUpperCase()} PALETTE):</span>
            {hasTextContrastWarning && (
              <span>Body text contrast is {textContrast}:1 (WCAG AA requires 4.5:1).</span>
            )}
            {hasHeadingContrastWarning && (
              <span>Heading contrast is {headingContrast}:1 (WCAG AA requires 3.0:1 for large text).</span>
            )}
            <span className="opacity-75">Publishing remains enabled.</span>
          </div>
          <button
            onClick={() => {}}
            className="text-[10px] uppercase underline opacity-75 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Status Toast Notification */}
      {statusMessage && (
        <div
          className={`px-6 py-2.5 text-xs font-mono flex items-center justify-between ${
            statusType === "success"
              ? "bg-emerald-950/80 text-emerald-200 border-b border-emerald-500/30"
              : statusType === "error"
              ? "bg-rose-950/80 text-rose-200 border-b border-rose-500/30"
              : "bg-blue-950/80 text-blue-200 border-b border-blue-500/30"
          }`}
        >
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage("")} className="opacity-75 hover:opacity-100">
            ✕
          </button>
        </div>
      )}

      {/* Main Split View Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Settings Panel */}
        <aside className="w-full md:w-[440px] lg:w-[480px] border-r border-white/10 bg-[#0A0C10] flex flex-col shrink-0 overflow-y-auto">
          {/* Active Element Quick Banner */}
          {activeControl && (
            <div className="bg-sky-950/60 border-b border-sky-500/30 px-6 py-2.5 flex items-center justify-between">
              <span className="text-xs font-mono text-sky-300 truncate pr-2">
                🎯 Selected from Live Site: <strong className="uppercase">{activeControl.replace("content-", "")}</strong>
              </span>
              <button
                onClick={() => setActiveControl(null)}
                className="text-[10px] text-gray-400 hover:text-white shrink-0"
              >
                Clear
              </button>
            </div>
          )}

          {/* Theme Preset Selector Bar */}
          <div className="p-4 border-b border-white/10 bg-black/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 font-bold flex items-center gap-1.5">
                <span>🎨</span> Choose Theme Preset
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300">
                Active: {(theme.presetId || "preset-1") === "preset-2" ? "Preset 2 (Warm Studio)" : "Preset 1 (Technical)"}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Preset 1 Card Button */}
              <button
                type="button"
                onClick={() => handleSelectPreset("preset-1")}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer relative ${
                  (theme.presetId || "preset-1") === "preset-1"
                    ? "border-sky-400 bg-sky-950/40 ring-1 ring-sky-400"
                    : "border-white/10 bg-black/30 hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white font-mono">⚡ Preset 1</span>
                  {(theme.presetId || "preset-1") === "preset-1" && (
                    <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                  )}
                </div>
                <div className="text-[11px] font-semibold text-sky-300">Technical Craftsman</div>
                <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                  Cyber / Engineering / Cyan Accent
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#090A0F] border border-white/20" title="Dark Bg" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8]" title="Cyan Accent" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F8FAFC]" title="Light Bg" />
                  <span className="text-[9px] font-mono text-gray-400 ml-1">Space Grotesk</span>
                </div>
              </button>

              {/* Preset 2 Card Button */}
              <button
                type="button"
                onClick={() => handleSelectPreset("preset-2")}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer relative ${
                  theme.presetId === "preset-2"
                    ? "border-amber-400 bg-amber-950/40 ring-1 ring-amber-400"
                    : "border-white/10 bg-black/30 hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white font-mono">🎨 Preset 2</span>
                  {theme.presetId === "preset-2" && (
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </div>
                <div className="text-[11px] font-semibold text-amber-300">Warm Studio / Earthy</div>
                <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                  DM Serif Display + Manrope · Charcoal & Ivory
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#151713] border border-white/20" title="Charcoal #151713" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F2EEE5] border border-black/20" title="Warm Ivory #F2EEE5" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#69745A]" title="Muted Olive #69745A" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E8B58F]" title="Warm Peach #E8B58F" />
                  <span className="text-[9px] font-serif italic text-amber-200 ml-1">DM Serif</span>
                </div>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 bg-black/30 sticky top-0 z-10 overflow-x-auto">
            {[
              { id: "content", label: "Text / Copy" },
              { id: "colors", label: "Colors" },
              { id: "typography", label: "Typography" },
              { id: "layout", label: "Layout" },
              { id: "sections", label: "Sections" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-2.5 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-sky-400 text-white font-bold bg-white/5"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Panel Tab Contents */}
          <div className="p-6 space-y-6 flex-1">
            {/* 1. TEXT / CONTENT TAB */}
            {activeTab === "content" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-mono text-gray-400">
                    Click any text in the preview to edit:
                  </span>
                  <button
                    type="button"
                    onClick={handleResetContent}
                    className="text-[10px] font-mono text-gray-400 hover:text-sky-300 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Reset all text content to defaults"
                  >
                    <span>↺</span> Reset Text
                  </button>
                </div>

                {/* Header & Navigation Bar Copy */}
                <div className="space-y-4 rounded border border-white/10 bg-black/20 p-4">
                  <div className="border-b border-white/10 pb-2 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                      Header & Navigation Bar
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">Top Header</span>
                  </div>

                  <p className="text-[11px] font-mono text-gray-400">
                    💡 Tip: Clear any field completely to remove it from the page.
                  </p>

                  {/* Brand Title & Initials */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      className={`space-y-1 p-2 rounded transition-all ${
                        activeControl === "content-navbar-brandTitle"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-navbar-brandTitle"
                        className="text-[11px] font-mono text-gray-300 block"
                      >
                        Brand Name / Title
                      </label>
                      <input
                        id="content-navbar-brandTitle"
                        type="text"
                        placeholder="Leave blank to remove"
                        value={resolvedContent.navbar.brandTitle ?? ""}
                        onChange={(e) => handleContentChange("navbar", "brandTitle", e.target.value)}
                        className="w-full bg-black border border-white/15 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>

                    <div
                      className={`space-y-1 p-2 rounded transition-all ${
                        activeControl === "content-navbar-brandInitials"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-navbar-brandInitials"
                        className="text-[11px] font-mono text-gray-300 block"
                      >
                        Brand Initials (Square Icon)
                      </label>
                      <input
                        id="content-navbar-brandInitials"
                        type="text"
                        placeholder="Leave blank to remove"
                        value={resolvedContent.navbar.brandInitials ?? ""}
                        onChange={(e) => handleContentChange("navbar", "brandInitials", e.target.value)}
                        className="w-full bg-black border border-white/15 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-sky-400 outline-none uppercase"
                      />
                    </div>
                  </div>

                  {/* Resume Button Text */}
                  <div
                    className={`space-y-1 p-2 rounded transition-all ${
                      activeControl === "content-navbar-resumeText"
                        ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                        : ""
                    }`}
                  >
                    <label
                      htmlFor="content-navbar-resumeText"
                      className="text-[11px] font-mono text-gray-300 block"
                    >
                      Resume Button Label
                    </label>
                    <input
                      id="content-navbar-resumeText"
                      type="text"
                      placeholder="Leave blank to remove button"
                      value={resolvedContent.navbar.resumeText ?? ""}
                      onChange={(e) => handleContentChange("navbar", "resumeText", e.target.value)}
                      className="w-full bg-black border border-white/15 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-sky-400 outline-none"
                    />
                  </div>

                  {/* Navigation Links */}
                  <div className="p-3 rounded border border-white/10 bg-black/40 space-y-3">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 font-semibold block">
                      Navigation Link Labels (Clear to hide from menu)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        className={`space-y-1 p-1.5 rounded transition-all ${
                          activeControl === "content-navbar-linkWork"
                            ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                            : ""
                        }`}
                      >
                        <label
                          htmlFor="content-navbar-linkWork"
                          className="text-[10px] font-mono text-gray-400 block"
                        >
                          Work Link
                        </label>
                        <input
                          id="content-navbar-linkWork"
                          type="text"
                          placeholder="Leave blank to hide"
                          value={resolvedContent.navbar.linkWork ?? ""}
                          onChange={(e) => handleContentChange("navbar", "linkWork", e.target.value)}
                          className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                        />
                      </div>

                      <div
                        className={`space-y-1 p-1.5 rounded transition-all ${
                          activeControl === "content-navbar-linkAbout"
                            ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                            : ""
                        }`}
                      >
                        <label
                          htmlFor="content-navbar-linkAbout"
                          className="text-[10px] font-mono text-gray-400 block"
                        >
                          About Link
                        </label>
                        <input
                          id="content-navbar-linkAbout"
                          type="text"
                          placeholder="Leave blank to hide"
                          value={resolvedContent.navbar.linkAbout ?? ""}
                          onChange={(e) => handleContentChange("navbar", "linkAbout", e.target.value)}
                          className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                        />
                      </div>

                      <div
                        className={`space-y-1 p-1.5 rounded transition-all ${
                          activeControl === "content-navbar-linkExperience"
                            ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                            : ""
                        }`}
                      >
                        <label
                          htmlFor="content-navbar-linkExperience"
                          className="text-[10px] font-mono text-gray-400 block"
                        >
                          Experience Link
                        </label>
                        <input
                          id="content-navbar-linkExperience"
                          type="text"
                          placeholder="Leave blank to hide"
                          value={resolvedContent.navbar.linkExperience ?? ""}
                          onChange={(e) => handleContentChange("navbar", "linkExperience", e.target.value)}
                          className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                        />
                      </div>

                      <div
                        className={`space-y-1 p-1.5 rounded transition-all ${
                          activeControl === "content-navbar-linkSkills"
                            ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                            : ""
                        }`}
                      >
                        <label
                          htmlFor="content-navbar-linkSkills"
                          className="text-[10px] font-mono text-gray-400 block"
                        >
                          Skills Link
                        </label>
                        <input
                          id="content-navbar-linkSkills"
                          type="text"
                          placeholder="Leave blank to hide"
                          value={resolvedContent.navbar.linkSkills ?? ""}
                          onChange={(e) => handleContentChange("navbar", "linkSkills", e.target.value)}
                          className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                        />
                      </div>

                      <div
                        className={`space-y-1 p-1.5 rounded transition-all ${
                          activeControl === "content-navbar-linkPractice"
                            ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                            : ""
                        }`}
                      >
                        <label
                          htmlFor="content-navbar-linkPractice"
                          className="text-[10px] font-mono text-gray-400 block"
                        >
                          Practice Lab Link
                        </label>
                        <input
                          id="content-navbar-linkPractice"
                          type="text"
                          placeholder="Leave blank to hide"
                          value={resolvedContent.navbar.linkPractice ?? ""}
                          onChange={(e) => handleContentChange("navbar", "linkPractice", e.target.value)}
                          className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                        />
                      </div>

                      <div
                        className={`space-y-1 p-1.5 rounded transition-all ${
                          activeControl === "content-navbar-linkContact"
                            ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                            : ""
                        }`}
                      >
                        <label
                          htmlFor="content-navbar-linkContact"
                          className="text-[10px] font-mono text-gray-400 block"
                        >
                          Contact Link
                        </label>
                        <input
                          id="content-navbar-linkContact"
                          type="text"
                          placeholder="Leave blank to hide"
                          value={resolvedContent.navbar.linkContact ?? ""}
                          onChange={(e) => handleContentChange("navbar", "linkContact", e.target.value)}
                          className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Section Copy */}
                <div className="space-y-4 rounded border border-white/10 bg-black/20 p-4">
                  <div className="border-b border-white/10 pb-2 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                      Hero Section Text
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">Above Fold</span>
                  </div>

                  {/* Editorial Index Header (Edition, Specialization, Location) */}
                  <div className="space-y-3 p-3 rounded border border-white/10 bg-black/40">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 font-semibold block">
                      Top Editorial Index Bar
                    </span>

                    {/* Edition */}
                    <div
                      className={`space-y-1 p-2 rounded transition-all ${
                        activeControl === "content-hero-edition"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-hero-edition"
                        className="text-[11px] font-mono text-gray-300 block"
                      >
                        Portfolio Edition Tag
                      </label>
                      <input
                        id="content-hero-edition"
                        type="text"
                        value={resolvedContent.hero.edition || ""}
                        onChange={(e) => handleContentChange("hero", "edition", e.target.value)}
                        className="w-full bg-black border border-white/15 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-sky-400 outline-none uppercase"
                      />
                    </div>

                    {/* Specialization */}
                    <div
                      className={`space-y-1 p-2 rounded transition-all ${
                        activeControl === "content-hero-specialization"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-hero-specialization"
                        className="text-[11px] font-mono text-gray-300 block"
                      >
                        Specialization Tag
                      </label>
                      <input
                        id="content-hero-specialization"
                        type="text"
                        value={resolvedContent.hero.specialization || ""}
                        onChange={(e) => handleContentChange("hero", "specialization", e.target.value)}
                        className="w-full bg-black border border-white/15 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-sky-400 outline-none uppercase"
                      />
                    </div>

                    {/* Location */}
                    <div
                      className={`space-y-1 p-2 rounded transition-all ${
                        activeControl === "content-hero-location"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-hero-location"
                        className="text-[11px] font-mono text-gray-300 block"
                      >
                        Location & Availability Tag
                      </label>
                      <input
                        id="content-hero-location"
                        type="text"
                        value={resolvedContent.hero.location || ""}
                        onChange={(e) => handleContentChange("hero", "location", e.target.value)}
                        className="w-full bg-black border border-white/15 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-sky-400 outline-none uppercase"
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <div
                    className={`space-y-1.5 p-2 rounded transition-all ${
                      activeControl === "content-hero-name"
                        ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                        : ""
                    }`}
                  >
                    <label
                      htmlFor="content-hero-name"
                      className="text-xs font-mono text-gray-300 flex items-center justify-between"
                    >
                      <span>Full Name (H1 Heading)</span>
                      <span className="text-[10px] text-gray-500">Semantic H1</span>
                    </label>
                    <input
                      id="content-hero-name"
                      type="text"
                      value={resolvedContent.hero.name}
                      onChange={(e) => handleContentChange("hero", "name", e.target.value)}
                      className="w-full bg-black border border-white/15 rounded px-3 py-2 text-xs font-mono text-white focus:border-sky-400 outline-none"
                    />
                  </div>

                  {/* Role Tag */}
                  <div
                    className={`space-y-1.5 p-2 rounded transition-all ${
                      activeControl === "content-hero-roleTag"
                        ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                        : ""
                    }`}
                  >
                    <label
                      htmlFor="content-hero-roleTag"
                      className="text-xs font-mono text-gray-300 block"
                    >
                      Role Tagline
                    </label>
                    <input
                      id="content-hero-roleTag"
                      type="text"
                      value={resolvedContent.hero.roleTag}
                      onChange={(e) => handleContentChange("hero", "roleTag", e.target.value)}
                      className="w-full bg-black border border-white/15 rounded px-3 py-2 text-xs font-mono text-white focus:border-sky-400 outline-none"
                    />
                  </div>

                  {/* Bio */}
                  <div
                    className={`space-y-1.5 p-2 rounded transition-all ${
                      activeControl === "content-hero-bio"
                        ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                        : ""
                    }`}
                  >
                    <label
                      htmlFor="content-hero-bio"
                      className="text-xs font-mono text-gray-300 block"
                    >
                      Hero Bio / Intro Paragraph
                    </label>
                    <textarea
                      id="content-hero-bio"
                      rows={3}
                      value={resolvedContent.hero.bio}
                      onChange={(e) => handleContentChange("hero", "bio", e.target.value)}
                      className="w-full bg-black border border-white/15 rounded px-3 py-2 text-xs font-mono text-white focus:border-sky-400 outline-none resize-y"
                    />
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className={`space-y-1 p-2 rounded transition-all ${
                        activeControl === "content-hero-buttonPrimary"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-hero-buttonPrimary"
                        className="text-[11px] font-mono text-gray-300 block"
                      >
                        Primary Button
                      </label>
                      <input
                        id="content-hero-buttonPrimary"
                        type="text"
                        value={resolvedContent.hero.buttonPrimary}
                        onChange={(e) => handleContentChange("hero", "buttonPrimary", e.target.value)}
                        className="w-full bg-black border border-white/15 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>

                    <div
                      className={`space-y-1 p-2 rounded transition-all ${
                        activeControl === "content-hero-buttonSecondary"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-hero-buttonSecondary"
                        className="text-[11px] font-mono text-gray-300 block"
                      >
                        Secondary Button
                      </label>
                      <input
                        id="content-hero-buttonSecondary"
                        type="text"
                        value={resolvedContent.hero.buttonSecondary}
                        onChange={(e) => handleContentChange("hero", "buttonSecondary", e.target.value)}
                        className="w-full bg-black border border-white/15 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>
                  </div>

                  {/* Side Panel Elements */}
                  <div className="space-y-3 pt-2 border-t border-white/10">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                      Hero Side Column Details
                    </span>

                    <div
                      className={`space-y-1 p-2 rounded transition-all ${
                        activeControl === "content-hero-currentFocus"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-hero-currentFocus"
                        className="text-[11px] font-mono text-gray-300 block"
                      >
                        Current Focus
                      </label>
                      <input
                        id="content-hero-currentFocus"
                        type="text"
                        value={resolvedContent.hero.currentFocus}
                        onChange={(e) => handleContentChange("hero", "currentFocus", e.target.value)}
                        className="w-full bg-black border border-white/15 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>

                    <div
                      className={`space-y-1 p-2 rounded transition-all ${
                        activeControl === "content-hero-coreStack"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-hero-coreStack"
                        className="text-[11px] font-mono text-gray-300 block"
                      >
                        Core Stack
                      </label>
                      <input
                        id="content-hero-coreStack"
                        type="text"
                        value={resolvedContent.hero.coreStack}
                        onChange={(e) => handleContentChange("hero", "coreStack", e.target.value)}
                        className="w-full bg-black border border-white/15 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>

                    <div
                      className={`space-y-1 p-2 rounded transition-all ${
                        activeControl === "content-hero-philosophy"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-hero-philosophy"
                        className="text-[11px] font-mono text-gray-300 block"
                      >
                        Engineering Philosophy
                      </label>
                      <textarea
                        id="content-hero-philosophy"
                        rows={2}
                        value={resolvedContent.hero.philosophy}
                        onChange={(e) => handleContentChange("hero", "philosophy", e.target.value)}
                        className="w-full bg-black border border-white/15 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-sky-400 outline-none resize-y"
                      />
                    </div>

                    <div
                      className={`space-y-1 p-2 rounded transition-all ${
                        activeControl === "content-hero-status"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-hero-status"
                        className="text-[11px] font-mono text-gray-300 block"
                      >
                        Availability Status
                      </label>
                      <input
                        id="content-hero-status"
                        type="text"
                        value={resolvedContent.hero.status}
                        onChange={(e) => handleContentChange("hero", "status", e.target.value)}
                        className="w-full bg-black border border-white/15 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* About Section Copy */}
                <div className="space-y-4 rounded border border-white/10 bg-black/20 p-4">
                  <div className="border-b border-white/10 pb-2 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                      About Section Text
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">Philosophy</span>
                  </div>

                  <div
                    className={`space-y-1.5 p-2 rounded transition-all ${
                      activeControl === "content-about-tagline"
                        ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                        : ""
                    }`}
                  >
                    <label
                      htmlFor="content-about-tagline"
                      className="text-xs font-mono text-gray-300 block"
                    >
                      About Tagline
                    </label>
                    <input
                      id="content-about-tagline"
                      type="text"
                      value={resolvedContent.about.tagline}
                      onChange={(e) => handleContentChange("about", "tagline", e.target.value)}
                      className="w-full bg-black border border-white/15 rounded px-3 py-2 text-xs font-mono text-white focus:border-sky-400 outline-none"
                    />
                  </div>

                  <div
                    className={`space-y-1.5 p-2 rounded transition-all ${
                      activeControl === "content-about-heading"
                        ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                        : ""
                    }`}
                  >
                    <label
                      htmlFor="content-about-heading"
                      className="text-xs font-mono text-gray-300 block"
                    >
                      About Section Heading
                    </label>
                    <input
                      id="content-about-heading"
                      type="text"
                      value={resolvedContent.about.heading}
                      onChange={(e) => handleContentChange("about", "heading", e.target.value)}
                      className="w-full bg-black border border-white/15 rounded px-3 py-2 text-xs font-mono text-white focus:border-sky-400 outline-none"
                    />
                  </div>

                  <div
                    className={`space-y-1.5 p-2 rounded transition-all ${
                      activeControl === "content-about-paragraph1"
                        ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                        : ""
                    }`}
                  >
                    <label
                      htmlFor="content-about-paragraph1"
                      className="text-xs font-mono text-gray-300 block"
                    >
                      Paragraph 1
                    </label>
                    <textarea
                      id="content-about-paragraph1"
                      rows={3}
                      value={resolvedContent.about.paragraph1}
                      onChange={(e) => handleContentChange("about", "paragraph1", e.target.value)}
                      className="w-full bg-black border border-white/15 rounded px-3 py-2 text-xs font-mono text-white focus:border-sky-400 outline-none resize-y"
                    />
                  </div>

                  <div
                    className={`space-y-1.5 p-2 rounded transition-all ${
                      activeControl === "content-about-paragraph2"
                        ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                        : ""
                    }`}
                  >
                    <label
                      htmlFor="content-about-paragraph2"
                      className="text-xs font-mono text-gray-300 block"
                    >
                      Paragraph 2
                    </label>
                    <textarea
                      id="content-about-paragraph2"
                      rows={3}
                      value={resolvedContent.about.paragraph2}
                      onChange={(e) => handleContentChange("about", "paragraph2", e.target.value)}
                      className="w-full bg-black border border-white/15 rounded px-3 py-2 text-xs font-mono text-white focus:border-sky-400 outline-none resize-y"
                    />
                  </div>

                  {/* Core Principles (3 Cards) */}
                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-semibold block">
                      Core Engineering Principles (3 Pillars)
                    </span>
                    {principles.map((p, idx) => (
                      <div key={idx} className="p-3 rounded border border-white/10 bg-black/40 space-y-2">
                        <span className="text-[10px] font-mono text-gray-400 uppercase">
                          Principle #{idx + 1}
                        </span>
                        <div
                          className={`space-y-1 p-1.5 rounded transition-all ${
                            activeControl === `content-about-principle-${idx}-label`
                              ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                              : ""
                          }`}
                        >
                          <label
                            htmlFor={`content-about-principle-${idx}-label`}
                            className="text-[10px] font-mono text-gray-400 block"
                          >
                            Label
                          </label>
                          <input
                            id={`content-about-principle-${idx}-label`}
                            type="text"
                            value={p.label || ""}
                            onChange={(e) => handlePrincipleChange(idx, "label", e.target.value)}
                            className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                          />
                        </div>
                        <div
                          className={`space-y-1 p-1.5 rounded transition-all ${
                            activeControl === `content-about-principle-${idx}-title`
                              ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                              : ""
                          }`}
                        >
                          <label
                            htmlFor={`content-about-principle-${idx}-title`}
                            className="text-[10px] font-mono text-gray-400 block"
                          >
                            Title
                          </label>
                          <input
                            id={`content-about-principle-${idx}-title`}
                            type="text"
                            value={p.title || ""}
                            onChange={(e) => handlePrincipleChange(idx, "title", e.target.value)}
                            className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                          />
                        </div>
                        <div
                          className={`space-y-1 p-1.5 rounded transition-all ${
                            activeControl === `content-about-principle-${idx}-description`
                              ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                              : ""
                          }`}
                        >
                          <label
                            htmlFor={`content-about-principle-${idx}-description`}
                            className="text-[10px] font-mono text-gray-400 block"
                          >
                            Description
                          </label>
                          <textarea
                            id={`content-about-principle-${idx}-description`}
                            rows={2}
                            value={p.description || ""}
                            onChange={(e) => handlePrincipleChange(idx, "description", e.target.value)}
                            className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none resize-y"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Goals & Trajectory Section Copy */}
                <div className="space-y-4 rounded border border-white/10 bg-black/20 p-4">
                  <div className="border-b border-white/10 pb-2 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                      Trajectory & Goals Text
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">Roadmap</span>
                  </div>

                  <div
                    className={`space-y-1.5 p-2 rounded transition-all ${
                      activeControl === "content-goals-tagline"
                        ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                        : ""
                    }`}
                  >
                    <label
                      htmlFor="content-goals-tagline"
                      className="text-xs font-mono text-gray-300 block"
                    >
                      Trajectory Tagline
                    </label>
                    <input
                      id="content-goals-tagline"
                      type="text"
                      value={resolvedContent.goals.tagline}
                      onChange={(e) => handleContentChange("goals", "tagline", e.target.value)}
                      className="w-full bg-black border border-white/15 rounded px-3 py-2 text-xs font-mono text-white focus:border-sky-400 outline-none"
                    />
                  </div>

                  <div
                    className={`space-y-1.5 p-2 rounded transition-all ${
                      activeControl === "content-goals-heading"
                        ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                        : ""
                    }`}
                  >
                    <label
                      htmlFor="content-goals-heading"
                      className="text-xs font-mono text-gray-300 block"
                    >
                      Trajectory Heading
                    </label>
                    <input
                      id="content-goals-heading"
                      type="text"
                      value={resolvedContent.goals.heading}
                      onChange={(e) => handleContentChange("goals", "heading", e.target.value)}
                      className="w-full bg-black border border-white/15 rounded px-3 py-2 text-xs font-mono text-white focus:border-sky-400 outline-none"
                    />
                  </div>

                  <div
                    className={`space-y-1.5 p-2 rounded transition-all ${
                      activeControl === "content-goals-paragraph1"
                        ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                        : ""
                    }`}
                  >
                    <label
                      htmlFor="content-goals-paragraph1"
                      className="text-xs font-mono text-gray-300 block"
                    >
                      Engineering Focus Description
                    </label>
                    <textarea
                      id="content-goals-paragraph1"
                      rows={3}
                      value={resolvedContent.goals.paragraph1}
                      onChange={(e) => handleContentChange("goals", "paragraph1", e.target.value)}
                      className="w-full bg-black border border-white/15 rounded px-3 py-2 text-xs font-mono text-white focus:border-sky-400 outline-none resize-y"
                    />
                  </div>

                  <div
                    className={`space-y-1.5 p-2 rounded transition-all ${
                      activeControl === "content-goals-commitment"
                        ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                        : ""
                    }`}
                  >
                    <label
                      htmlFor="content-goals-commitment"
                      className="text-xs font-mono text-gray-300 block"
                    >
                      Committed To Statement
                    </label>
                    <textarea
                      id="content-goals-commitment"
                      rows={2}
                      value={resolvedContent.goals.commitment}
                      onChange={(e) => handleContentChange("goals", "commitment", e.target.value)}
                      className="w-full bg-black border border-white/15 rounded px-3 py-2 text-xs font-mono text-white focus:border-sky-400 outline-none resize-y"
                    />
                  </div>
                </div>

                {/* Section Headers & Subheadings */}
                <div className="space-y-4 rounded border border-white/10 bg-black/20 p-4">
                  <div className="border-b border-white/10 pb-2 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                      Section Headers & Subheadings
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">Headers</span>
                  </div>

                  {/* Featured Projects */}
                  <div className="p-3 rounded border border-white/10 bg-black/40 space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold">
                      Featured Projects Section
                    </span>
                    <div
                      className={`space-y-1 p-1.5 rounded transition-all ${
                        activeControl === "content-sectionHeaders-projectsTagline"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-sectionHeaders-projectsTagline"
                        className="text-[10px] font-mono text-gray-400 block"
                      >
                        Tagline / Index
                      </label>
                      <input
                        id="content-sectionHeaders-projectsTagline"
                        type="text"
                        value={resolvedContent.sectionHeaders.projectsTagline || ""}
                        onChange={(e) =>
                          handleContentChange("sectionHeaders", "projectsTagline", e.target.value)
                        }
                        className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>
                    <div
                      className={`space-y-1 p-1.5 rounded transition-all ${
                        activeControl === "content-sectionHeaders-projectsHeading"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-sectionHeaders-projectsHeading"
                        className="text-[10px] font-mono text-gray-400 block"
                      >
                        Heading
                      </label>
                      <input
                        id="content-sectionHeaders-projectsHeading"
                        type="text"
                        value={resolvedContent.sectionHeaders.projectsHeading || ""}
                        onChange={(e) =>
                          handleContentChange("sectionHeaders", "projectsHeading", e.target.value)
                        }
                        className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>
                  </div>

                  {/* Professional Experience */}
                  <div className="p-3 rounded border border-white/10 bg-black/40 space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold">
                      Professional Experience Section
                    </span>
                    <div
                      className={`space-y-1 p-1.5 rounded transition-all ${
                        activeControl === "content-sectionHeaders-experienceTagline"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-sectionHeaders-experienceTagline"
                        className="text-[10px] font-mono text-gray-400 block"
                      >
                        Tagline / Index
                      </label>
                      <input
                        id="content-sectionHeaders-experienceTagline"
                        type="text"
                        value={resolvedContent.sectionHeaders.experienceTagline || ""}
                        onChange={(e) =>
                          handleContentChange("sectionHeaders", "experienceTagline", e.target.value)
                        }
                        className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>
                    <div
                      className={`space-y-1 p-1.5 rounded transition-all ${
                        activeControl === "content-sectionHeaders-experienceHeading"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-sectionHeaders-experienceHeading"
                        className="text-[10px] font-mono text-gray-400 block"
                      >
                        Heading
                      </label>
                      <input
                        id="content-sectionHeaders-experienceHeading"
                        type="text"
                        value={resolvedContent.sectionHeaders.experienceHeading || ""}
                        onChange={(e) =>
                          handleContentChange("sectionHeaders", "experienceHeading", e.target.value)
                        }
                        className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>
                  </div>

                  {/* Formal Education */}
                  <div className="p-3 rounded border border-white/10 bg-black/40 space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold">
                      Formal Education Section
                    </span>
                    <div
                      className={`space-y-1 p-1.5 rounded transition-all ${
                        activeControl === "content-sectionHeaders-educationTagline"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-sectionHeaders-educationTagline"
                        className="text-[10px] font-mono text-gray-400 block"
                      >
                        Tagline / Index
                      </label>
                      <input
                        id="content-sectionHeaders-educationTagline"
                        type="text"
                        value={resolvedContent.sectionHeaders.educationTagline || ""}
                        onChange={(e) =>
                          handleContentChange("sectionHeaders", "educationTagline", e.target.value)
                        }
                        className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>
                    <div
                      className={`space-y-1 p-1.5 rounded transition-all ${
                        activeControl === "content-sectionHeaders-educationHeading"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-sectionHeaders-educationHeading"
                        className="text-[10px] font-mono text-gray-400 block"
                      >
                        Heading
                      </label>
                      <input
                        id="content-sectionHeaders-educationHeading"
                        type="text"
                        value={resolvedContent.sectionHeaders.educationHeading || ""}
                        onChange={(e) =>
                          handleContentChange("sectionHeaders", "educationHeading", e.target.value)
                        }
                        className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>
                  </div>

                  {/* Skills / Technical Matrix */}
                  <div className="p-3 rounded border border-white/10 bg-black/40 space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold">
                      Technical Matrix / Skills Section
                    </span>
                    <div
                      className={`space-y-1 p-1.5 rounded transition-all ${
                        activeControl === "content-sectionHeaders-skillsTagline"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-sectionHeaders-skillsTagline"
                        className="text-[10px] font-mono text-gray-400 block"
                      >
                        Tagline / Index
                      </label>
                      <input
                        id="content-sectionHeaders-skillsTagline"
                        type="text"
                        value={resolvedContent.sectionHeaders.skillsTagline || ""}
                        onChange={(e) =>
                          handleContentChange("sectionHeaders", "skillsTagline", e.target.value)
                        }
                        className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>
                    <div
                      className={`space-y-1 p-1.5 rounded transition-all ${
                        activeControl === "content-sectionHeaders-skillsHeading"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-sectionHeaders-skillsHeading"
                        className="text-[10px] font-mono text-gray-400 block"
                      >
                        Heading
                      </label>
                      <input
                        id="content-sectionHeaders-skillsHeading"
                        type="text"
                        value={resolvedContent.sectionHeaders.skillsHeading || ""}
                        onChange={(e) =>
                          handleContentChange("sectionHeaders", "skillsHeading", e.target.value)
                        }
                        className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>
                  </div>

                  {/* Practice Lab */}
                  <div className="p-3 rounded border border-white/10 bg-black/40 space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold">
                      Practice Lab / Exploratory Section
                    </span>
                    <div
                      className={`space-y-1 p-1.5 rounded transition-all ${
                        activeControl === "content-sectionHeaders-practiceTagline"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-sectionHeaders-practiceTagline"
                        className="text-[10px] font-mono text-gray-400 block"
                      >
                        Tagline / Index
                      </label>
                      <input
                        id="content-sectionHeaders-practiceTagline"
                        type="text"
                        value={resolvedContent.sectionHeaders.practiceTagline || ""}
                        onChange={(e) =>
                          handleContentChange("sectionHeaders", "practiceTagline", e.target.value)
                        }
                        className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>
                    <div
                      className={`space-y-1 p-1.5 rounded transition-all ${
                        activeControl === "content-sectionHeaders-practiceHeading"
                          ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="content-sectionHeaders-practiceHeading"
                        className="text-[10px] font-mono text-gray-400 block"
                      >
                        Heading
                      </label>
                      <input
                        id="content-sectionHeaders-practiceHeading"
                        type="text"
                        value={resolvedContent.sectionHeaders.practiceHeading || ""}
                        onChange={(e) =>
                          handleContentChange("sectionHeaders", "practiceHeading", e.target.value)
                        }
                        className="w-full bg-black border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:border-sky-400 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Section Copy */}
                <div className="space-y-4 rounded border border-white/10 bg-black/20 p-4">
                  <div className="border-b border-white/10 pb-2 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                      Footer Text
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">Colophon</span>
                  </div>

                  <div
                    className={`space-y-1.5 p-2 rounded transition-all ${
                      activeControl === "content-footer-builtWithText"
                        ? "border border-sky-400 bg-sky-950/30 ring-1 ring-sky-400"
                        : ""
                    }`}
                  >
                    <label
                      htmlFor="content-footer-builtWithText"
                      className="text-xs font-mono text-gray-300 block"
                    >
                      Colophon / Built-With Tagline
                    </label>
                    <input
                      id="content-footer-builtWithText"
                      type="text"
                      value={resolvedContent.footer.builtWithText || ""}
                      onChange={(e) =>
                        handleContentChange("footer", "builtWithText", e.target.value)
                      }
                      className="w-full bg-black border border-white/15 rounded px-3 py-2 text-xs font-mono text-white focus:border-sky-400 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. COLORS TAB (DARK & WHITE/LIGHT PALETTES) */}
            {activeTab === "colors" && (
              <div className="space-y-5">
                {/* Palette Selector Toggle */}
                <div className="bg-black/40 border border-white/15 rounded-lg p-1.5 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handlePaletteSelect("dark")}
                    className={`flex-1 py-2 rounded text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      activePalette === "dark"
                        ? "bg-white/20 text-white font-bold shadow"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span>🌙</span> Dark Palette
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePaletteSelect("light")}
                    className={`flex-1 py-2 rounded text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      activePalette === "light"
                        ? "bg-sky-400 text-black font-bold shadow"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span>☀️</span> White / Light Palette
                  </button>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-mono text-gray-400">
                    Customizing{" "}
                    <strong className="text-white uppercase">
                      {activePalette === "light" ? "White / Light Theme" : "Dark Theme"}
                    </strong>
                  </span>
                  <button
                    type="button"
                    onClick={activePalette === "light" ? handleResetLightColors : handleResetDarkColors}
                    className="text-[10px] font-mono text-gray-400 hover:text-sky-300 transition-colors flex items-center gap-1 cursor-pointer"
                    title={`Reset ${activePalette} palette to defaults`}
                  >
                    <span>↺</span> Reset {activePalette === "light" ? "White" : "Dark"} Colors
                  </button>
                </div>

                {/* Site Background */}
                <div
                  className={`p-3 rounded border transition-all ${
                    activeControl === "background"
                      ? "border-sky-400 bg-sky-950/20 ring-1 ring-sky-400"
                      : "border-white/10 bg-black/20"
                  }`}
                >
                  <label className="text-xs font-mono uppercase text-gray-300 flex items-center justify-between mb-2">
                    <span>Site Background</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{currentColors.background}</span>
                      {currentColors.background?.toLowerCase() !== currentDefaults.background?.toLowerCase() && (
                        <button
                          type="button"
                          onClick={() => handleColorChange(activePalette, "background", currentDefaults.background)}
                          title="Reset background to default"
                          className="text-[10px] font-mono text-sky-400 hover:text-sky-300 cursor-pointer"
                        >
                          ↺ Default
                        </button>
                      )}
                    </div>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={currentColors.background || currentDefaults.background}
                      onChange={(e) => handleColorChange(activePalette, "background", e.target.value)}
                      className="h-10 w-14 rounded bg-transparent border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentColors.background || currentDefaults.background}
                      onChange={(e) => handleColorChange(activePalette, "background", e.target.value)}
                      className="flex-1 bg-black border border-white/10 rounded px-3 py-2 text-xs font-mono text-white uppercase"
                    />
                  </div>
                </div>

                {/* Card Background */}
                <div
                  className={`p-3 rounded border transition-all ${
                    activeControl === "cardBg"
                      ? "border-sky-400 bg-sky-950/20 ring-1 ring-sky-400"
                      : "border-white/10 bg-black/20"
                  }`}
                >
                  <label className="text-xs font-mono uppercase text-gray-300 flex items-center justify-between mb-2">
                    <span>Card & Module Surface</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{currentColors.cardBg || currentDefaults.cardBg || currentColors.background}</span>
                      {currentColors.cardBg && currentDefaults.cardBg && currentColors.cardBg.toLowerCase() !== currentDefaults.cardBg.toLowerCase() && (
                        <button
                          type="button"
                          onClick={() => handleColorChange(activePalette, "cardBg", currentDefaults.cardBg)}
                          title="Reset card background to default"
                          className="text-[10px] font-mono text-sky-400 hover:text-sky-300 cursor-pointer"
                        >
                          ↺ Default
                        </button>
                      )}
                    </div>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={currentColors.cardBg || currentDefaults.cardBg || currentColors.background}
                      onChange={(e) => handleColorChange(activePalette, "cardBg", e.target.value)}
                      className="h-10 w-14 rounded bg-transparent border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentColors.cardBg || currentDefaults.cardBg || currentColors.background}
                      onChange={(e) => handleColorChange(activePalette, "cardBg", e.target.value)}
                      className="flex-1 bg-black border border-white/10 rounded px-3 py-2 text-xs font-mono text-white uppercase"
                    />
                  </div>
                </div>

                {/* Heading Color */}
                <div
                  className={`p-3 rounded border transition-all ${
                    activeControl === "headingColor"
                      ? "border-sky-400 bg-sky-950/20 ring-1 ring-sky-400"
                      : "border-white/10 bg-black/20"
                  }`}
                >
                  <label className="text-xs font-mono uppercase text-gray-300 flex items-center justify-between mb-2">
                    <span>Heading & Title Color</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{currentColors.headingColor}</span>
                      {currentColors.headingColor?.toLowerCase() !== currentDefaults.headingColor?.toLowerCase() && (
                        <button
                          type="button"
                          onClick={() => handleColorChange(activePalette, "headingColor", currentDefaults.headingColor)}
                          title="Reset heading color to default"
                          className="text-[10px] font-mono text-sky-400 hover:text-sky-300 cursor-pointer"
                        >
                          ↺ Default
                        </button>
                      )}
                    </div>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={currentColors.headingColor || currentDefaults.headingColor}
                      onChange={(e) => handleColorChange(activePalette, "headingColor", e.target.value)}
                      className="h-10 w-14 rounded bg-transparent border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentColors.headingColor || currentDefaults.headingColor}
                      onChange={(e) => handleColorChange(activePalette, "headingColor", e.target.value)}
                      className="flex-1 bg-black border border-white/10 rounded px-3 py-2 text-xs font-mono text-white uppercase"
                    />
                  </div>
                  <p className="text-[11px] font-mono text-gray-500 mt-2">
                    Contrast against background: {headingContrast}:1
                  </p>
                </div>

                {/* Body Text */}
                <div
                  className={`p-3 rounded border transition-all ${
                    activeControl === "text"
                      ? "border-sky-400 bg-sky-950/20 ring-1 ring-sky-400"
                      : "border-white/10 bg-black/20"
                  }`}
                >
                  <label className="text-xs font-mono uppercase text-gray-300 flex items-center justify-between mb-2">
                    <span>Body Paragraph Text</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{currentColors.text}</span>
                      {currentColors.text?.toLowerCase() !== currentDefaults.text?.toLowerCase() && (
                        <button
                          type="button"
                          onClick={() => handleColorChange(activePalette, "text", currentDefaults.text)}
                          title="Reset text color to default"
                          className="text-[10px] font-mono text-sky-400 hover:text-sky-300 cursor-pointer"
                        >
                          ↺ Default
                        </button>
                      )}
                    </div>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={currentColors.text || currentDefaults.text}
                      onChange={(e) => handleColorChange(activePalette, "text", e.target.value)}
                      className="h-10 w-14 rounded bg-transparent border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentColors.text || currentDefaults.text}
                      onChange={(e) => handleColorChange(activePalette, "text", e.target.value)}
                      className="flex-1 bg-black border border-white/10 rounded px-3 py-2 text-xs font-mono text-white uppercase"
                    />
                  </div>
                  <p className="text-[11px] font-mono text-gray-500 mt-2">
                    Contrast against background: {textContrast}:1
                  </p>
                </div>

                {/* Accent Color */}
                <div
                  className={`p-3 rounded border transition-all ${
                    activeControl === "accent"
                      ? "border-sky-400 bg-sky-950/20 ring-1 ring-sky-400"
                      : "border-white/10 bg-black/20"
                  }`}
                >
                  <label className="text-xs font-mono uppercase text-gray-300 flex items-center justify-between mb-2">
                    <span>Accent & Highlights</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{currentColors.accent}</span>
                      {currentColors.accent?.toLowerCase() !== currentDefaults.accent?.toLowerCase() && (
                        <button
                          type="button"
                          onClick={() => handleColorChange(activePalette, "accent", currentDefaults.accent)}
                          title="Reset accent color to default"
                          className="text-[10px] font-mono text-sky-400 hover:text-sky-300 cursor-pointer"
                        >
                          ↺ Default
                        </button>
                      )}
                    </div>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={currentColors.accent || currentDefaults.accent}
                      onChange={(e) => handleColorChange(activePalette, "accent", e.target.value)}
                      className="h-10 w-14 rounded bg-transparent border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentColors.accent || currentDefaults.accent}
                      onChange={(e) => handleColorChange(activePalette, "accent", e.target.value)}
                      className="flex-1 bg-black border border-white/10 rounded px-3 py-2 text-xs font-mono text-white uppercase"
                    />
                  </div>
                </div>

                {/* Primary / Brand Color */}
                <div
                  className={`p-3 rounded border transition-all ${
                    activeControl === "primary"
                      ? "border-sky-400 bg-sky-950/20 ring-1 ring-sky-400"
                      : "border-white/10 bg-black/20"
                  }`}
                >
                  <label className="text-xs font-mono uppercase text-gray-300 flex items-center justify-between mb-2">
                    <span>Primary Brand</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{currentColors.primary}</span>
                      {currentColors.primary?.toLowerCase() !== currentDefaults.primary?.toLowerCase() && (
                        <button
                          type="button"
                          onClick={() => handleColorChange(activePalette, "primary", currentDefaults.primary)}
                          title="Reset primary color to default"
                          className="text-[10px] font-mono text-sky-400 hover:text-sky-300 cursor-pointer"
                        >
                          ↺ Default
                        </button>
                      )}
                    </div>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={currentColors.primary || currentDefaults.primary}
                      onChange={(e) => handleColorChange(activePalette, "primary", e.target.value)}
                      className="h-10 w-14 rounded bg-transparent border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentColors.primary || currentDefaults.primary}
                      onChange={(e) => handleColorChange(activePalette, "primary", e.target.value)}
                      className="flex-1 bg-black border border-white/10 rounded px-3 py-2 text-xs font-mono text-white uppercase"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. TYPOGRAPHY TAB */}
            {activeTab === "typography" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-mono text-gray-400">
                    Preloaded build-time Google Fonts:
                  </span>
                  <button
                    type="button"
                    onClick={handleResetTypography}
                    className="text-[10px] font-mono text-gray-400 hover:text-sky-300 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Reset typography to defaults"
                  >
                    <span>↺</span> Reset Fonts
                  </button>
                </div>

                {/* Heading Font */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-gray-300 block">
                    Heading Font-Family
                  </label>
                  <select
                    value={theme.typography?.headingFont || DEFAULT_THEME.typography.headingFont}
                    onChange={(e) => handleFontChange("headingFont", e.target.value)}
                    className="w-full bg-black border border-white/10 rounded px-3 py-2.5 text-xs font-mono text-white focus:border-sky-400 outline-none"
                  >
                    {ALLOWED_FONTS.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Body Font */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-gray-300 block">
                    Body Font-Family
                  </label>
                  <select
                    value={theme.typography?.bodyFont || DEFAULT_THEME.typography.bodyFont}
                    onChange={(e) => handleFontChange("bodyFont", e.target.value)}
                    className="w-full bg-black border border-white/10 rounded px-3 py-2.5 text-xs font-mono text-white focus:border-sky-400 outline-none"
                  >
                    {ALLOWED_FONTS.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* 4. RADIUS & SPACING TAB */}
            {activeTab === "layout" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-mono text-gray-400">
                    Radius & spacing tokens:
                  </span>
                  <button
                    type="button"
                    onClick={handleResetLayout}
                    className="text-[10px] font-mono text-gray-400 hover:text-sky-300 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Reset radius and spacing to defaults"
                  >
                    <span>↺</span> Reset Layout
                  </button>
                </div>

                {/* Border Radius */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase text-gray-300 block">
                    Card & Button Radius
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "sharp", label: "Sharp (0px)" },
                      { id: "soft", label: "Soft (4px)" },
                      { id: "rounded", label: "Rounded (12px)" },
                    ].map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleRadiusChange(r.id)}
                        className={`py-2.5 text-xs font-mono border rounded transition-colors ${
                          theme.radius === r.id
                            ? "border-sky-400 bg-sky-950/40 text-sky-300 font-bold"
                            : "border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spacing */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase text-gray-300 block">
                    Layout Spacing Density
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "compact", label: "Compact" },
                      { id: "cozy", label: "Cozy" },
                      { id: "airy", label: "Airy" },
                    ].map((sp) => (
                      <button
                        key={sp.id}
                        type="button"
                        onClick={() => handleSpacingChange(sp.id)}
                        className={`py-2.5 text-xs font-mono border rounded transition-colors ${
                          theme.spacing === sp.id
                            ? "border-sky-400 bg-sky-950/40 text-sky-300 font-bold"
                            : "border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. SECTIONS TAB */}
            {activeTab === "sections" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-mono text-gray-400">
                    Reorder and toggle sections:
                  </span>
                  <button
                    type="button"
                    onClick={handleResetSections}
                    className="text-[10px] font-mono text-gray-400 hover:text-sky-300 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Reset sections to default order and visibility"
                  >
                    <span>↺</span> Reset Sections
                  </button>
                </div>

                <div className="space-y-2">
                  {(theme.sections || DEFAULT_SECTIONS).map((sec, idx) => {
                    const isProtected = sec.sectionId === "hero" || sec.sectionId === "contact";
                    return (
                      <div
                        key={sec.sectionId}
                        className="flex items-center justify-between p-3 rounded border border-white/10 bg-black/20"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-gray-500 w-4">
                            {idx + 1}.
                          </span>
                          <span className="text-xs font-mono uppercase text-white font-medium">
                            {sec.sectionId}
                          </span>
                          {isProtected && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-gray-400">
                              Locked
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Reorder Buttons */}
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveSection(idx, -1)}
                            className="p-1 text-gray-400 hover:text-white disabled:opacity-20 text-xs"
                            title="Move Up"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            disabled={idx === (theme.sections?.length || DEFAULT_SECTIONS.length) - 1}
                            onClick={() => handleMoveSection(idx, 1)}
                            className="p-1 text-gray-400 hover:text-white disabled:opacity-20 text-xs"
                            title="Move Down"
                          >
                            ▼
                          </button>

                          {/* Visibility Toggle */}
                          <button
                            type="button"
                            disabled={isProtected}
                            onClick={() => handleToggleSection(sec.sectionId)}
                            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                              isProtected
                                ? "bg-white/5 text-gray-500 cursor-not-allowed"
                                : sec.visible !== false
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            }`}
                          >
                            {isProtected
                              ? "Required"
                              : sec.visible !== false
                              ? "Visible"
                              : "Hidden"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Right Iframe Preview Area */}
        <main className="flex-1 bg-[#050608] flex flex-col items-center justify-start p-4 md:p-6 overflow-hidden relative">
          {/* Iframe Frame Container */}
          <div
            className="w-full h-full rounded border border-white/15 bg-black shadow-2xl overflow-hidden transition-all duration-300 flex flex-col"
            style={{
              maxWidth:
                deviceView === "mobile"
                  ? "375px"
                  : deviceView === "tablet"
                  ? "768px"
                  : "100%",
            }}
          >
            {/* Fake Browser Address Header */}
            <div className="h-8 bg-[#12151C] border-b border-white/10 px-3 flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 max-w-sm mx-auto bg-black/40 rounded px-2.5 py-0.5 text-[10px] font-mono text-gray-400 text-center truncate">
                http://localhost:3000/?preview=true
              </div>
              <span className="text-[10px] font-mono text-sky-400">Click any text/color in site to edit</span>
            </div>

            {/* The Live Site Iframe */}
            <iframe
              ref={iframeRef}
              src="/?preview=true"
              title="Live Site Preview"
              className="w-full flex-1 border-none bg-black"
            />
          </div>

          {/* Rollback Version History Drawer */}
          {historyOpen && (
            <div className="absolute top-0 right-0 w-80 h-full bg-[#0E1118] border-l border-white/15 shadow-2xl p-6 flex flex-col z-20 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Version History (Last 5)
                </h3>
                <button
                  onClick={() => setHistoryOpen(false)}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {historyList.length === 0 ? (
                <p className="text-xs font-mono text-gray-500 mt-4">
                  No previous published versions available yet. Publish a theme to begin recording version history.
                </p>
              ) : (
                <div className="space-y-4">
                  {historyList.map((hist, i) => (
                    <div
                      key={i}
                      className="p-3 rounded border border-white/10 bg-black/40 space-y-2"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                        <span>Version #{i + 1}</span>
                        <span>
                          {hist.publishedAt
                            ? new Date(hist.publishedAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Recent"}
                        </span>
                      </div>

                      {/* Color Palette Mini Swatches */}
                      <div className="flex items-center gap-1.5">
                        {hist.colors && (
                          <>
                            <div
                              className="w-5 h-5 rounded border border-white/20"
                              style={{ backgroundColor: hist.colors.background }}
                              title={`Background: ${hist.colors.background}`}
                            />
                            <div
                              className="w-5 h-5 rounded border border-white/20"
                              style={{ backgroundColor: hist.colors.headingColor }}
                              title={`Headings: ${hist.colors.headingColor}`}
                            />
                            <div
                              className="w-5 h-5 rounded border border-white/20"
                              style={{ backgroundColor: hist.colors.accent }}
                              title={`Accent: ${hist.colors.accent}`}
                            />
                          </>
                        )}
                        <span className="text-[10px] font-mono text-gray-500 ml-1">
                          {hist.typography?.headingFont}
                        </span>
                      </div>

                      <button
                        onClick={() => handleRollback(i)}
                        disabled={rollingBack}
                        className="w-full mt-2 text-xs font-mono uppercase tracking-wider py-1.5 rounded border border-white/20 hover:border-sky-400 hover:text-sky-300 text-gray-300 transition-colors"
                      >
                        {rollingBack ? "Reverting..." : "Restore Version"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
