"use client";

import { useEffect, useState } from "react";

export default function ThemeSwitch({ className = "" }) {
  const [mode, setMode] = useState("dark");
  const [mounted, setMounted] = useState(false);
  const [isPreset2, setIsPreset2] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkPreset = () => {
      const preset = document.documentElement.getAttribute("data-preset");
      setIsPreset2(preset === "preset-2");
    };
    checkPreset();

    const observer = new MutationObserver(checkPreset);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-preset"] });

    try {
      const isLight =
        document.documentElement.classList.contains("light") ||
        document.documentElement.getAttribute("data-theme") === "light";
      setMode(isLight ? "light" : "dark");
    } catch {
      setMode("dark");
    }

    // Listen for external theme mode changes (e.g. from customizer or other tabs)
    const handleStorage = (e) => {
      if (e.key === "theme_mode" && e.newValue) {
        applyTheme(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      observer.disconnect();
    };
  }, []);

  const applyTheme = (newMode) => {
    setMode(newMode);
    try {
      localStorage.setItem("theme_mode", newMode);
    } catch {}

    const root = document.documentElement;
    if (newMode === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      root.setAttribute("data-theme", "light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    }

    // Notify any listening components or iframes
    window.dispatchEvent(new CustomEvent("theme_mode_change", { detail: { mode: newMode } }));
  };

  const toggleTheme = () => {
    const nextMode = mode === "dark" ? "light" : "dark";
    applyTheme(nextMode);
  };

  if (!mounted || isPreset2) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`p-2 rounded border border-white/20 text-[var(--color-text)] hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer flex items-center justify-center ${className}`}
      style={{ borderRadius: "var(--radius-card, 4px)" }}
    >
      {mode === "dark" ? (
        <svg
          className="w-4 h-4 transition-transform duration-200 hover:rotate-45"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 transition-transform duration-200 hover:-rotate-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}
