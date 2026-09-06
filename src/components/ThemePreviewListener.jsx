"use client";

import { useEffect } from "react";
import { RADIUS_MAP, SPACING_MAP, FONT_VARIABLE_MAP } from "../../lib/themeConstants";

export default function ThemePreviewListener({ onSectionsChange, onContentChange, onPresetChange }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const isPreview = urlParams.get("preview") === "true";
    if (!isPreview) return;

    document.body.classList.add("is-preview-mode");

    const handleMessage = (event) => {
      // Strict origin validation
      if (event.origin !== window.location.origin) {
        console.warn("[ThemePreviewListener] Rejected postMessage from untrusted origin:", event.origin);
        return;
      }

      if (event.data?.type === "THEME_MODE_UPDATE") {
        const mode = event.data.mode;
        const root = document.documentElement;
        if (mode === "light") {
          root.classList.remove("dark");
          root.classList.add("light");
          root.setAttribute("data-theme", "light");
        } else {
          root.classList.remove("light");
          root.classList.add("dark");
          root.setAttribute("data-theme", "dark");
        }
        try {
          localStorage.setItem("theme_mode", mode);
        } catch {}
        return;
      }

      if (event.data?.type === "THEME_PREVIEW_UPDATE") {
        const theme = event.data.theme;
        if (!theme) return;

        const root = document.documentElement;

        // Clear any old inline styles so stylesheet rules apply cleanly across light/dark
        root.style.removeProperty("--color-primary");
        root.style.removeProperty("--color-accent");
        root.style.removeProperty("--color-background");
        root.style.removeProperty("--color-text");
        root.style.removeProperty("--color-heading");
        root.style.removeProperty("--color-cardBg");

        // Dynamic preview styles injected in head
        let dynamicStyle = document.getElementById("preview-theme-styles");
        if (!dynamicStyle) {
          dynamicStyle = document.createElement("style");
          dynamicStyle.id = "preview-theme-styles";
          document.head.appendChild(dynamicStyle);
        }

        root.setAttribute("data-preset", theme.presetId || "preset-1");

        const headingVar = theme.typography?.headingFont
          ? (FONT_VARIABLE_MAP[theme.typography.headingFont] || (theme.presetId === "preset-2" ? FONT_VARIABLE_MAP["DM Serif Display"] : "var(--font-space-grotesk), sans-serif"))
          : "";
        const bodyVar = theme.typography?.bodyFont
          ? (FONT_VARIABLE_MAP[theme.typography.bodyFont] || (theme.presetId === "preset-2" ? FONT_VARIABLE_MAP["Manrope"] : "var(--font-inter), sans-serif"))
          : "";
        const radiusPx = theme.radius && RADIUS_MAP[theme.radius] ? RADIUS_MAP[theme.radius] : (theme.presetId === "preset-2" ? "10px" : "");
        const radiusBtn = theme.radius === "editorial" || theme.radius === "rounded" || theme.presetId === "preset-2" ? "999px" : radiusPx;
        const spacingObj = theme.spacing && SPACING_MAP[theme.spacing] ? SPACING_MAP[theme.spacing] : null;

        dynamicStyle.innerHTML = `
          :root {
            ${theme.colors?.primary ? `--color-primary: ${theme.colors.primary};` : ""}
            ${theme.colors?.accent ? `--color-accent: ${theme.colors.accent};` : ""}
            ${theme.colors?.highlight ? `--color-highlight: ${theme.colors.highlight};` : ""}
            ${theme.colors?.olive ? `--color-olive: ${theme.colors.olive};` : ""}
            ${theme.colors?.muted ? `--color-muted: ${theme.colors.muted};` : ""}
            ${theme.colors?.deepDark ? `--color-deepDark: ${theme.colors.deepDark};` : ""}
            ${theme.colors?.warmIvory ? `--color-warmIvory: ${theme.colors.warmIvory};` : ""}
            ${theme.colors?.background ? `--color-background: ${theme.colors.background};` : ""}
            ${theme.colors?.text ? `--color-text: ${theme.colors.text};` : ""}
            ${theme.colors?.headingColor ? `--color-heading: ${theme.colors.headingColor};` : ""}
            ${theme.colors?.cardBg ? `--color-cardBg: ${theme.colors.cardBg};` : ""}
            ${headingVar ? `--font-heading: ${headingVar};` : ""}
            ${bodyVar ? `--font-body: ${bodyVar};` : ""}
            ${radiusPx ? `--radius-card: ${radiusPx};` : ""}
            ${radiusBtn ? `--radius-btn: ${radiusBtn};` : ""}
            ${spacingObj ? `
              --spacing-container: ${spacingObj.container};
              --spacing-section: ${spacingObj.section};
              --spacing-card: ${spacingObj.card};
            ` : ""}
          }
          html.light, [data-theme="light"] {
            ${theme.lightColors?.primary ? `--color-primary: ${theme.lightColors.primary};` : ""}
            ${theme.lightColors?.accent ? `--color-accent: ${theme.lightColors.accent};` : ""}
            ${theme.lightColors?.highlight ? `--color-highlight: ${theme.lightColors.highlight};` : ""}
            ${theme.lightColors?.olive ? `--color-olive: ${theme.lightColors.olive};` : ""}
            ${theme.lightColors?.muted ? `--color-muted: ${theme.lightColors.muted};` : ""}
            ${theme.lightColors?.background ? `--color-background: ${theme.lightColors.background};` : ""}
            ${theme.lightColors?.text ? `--color-text: ${theme.lightColors.text};` : ""}
            ${theme.lightColors?.headingColor ? `--color-heading: ${theme.lightColors.headingColor};` : ""}
            ${theme.lightColors?.cardBg ? `--color-cardBg: ${theme.lightColors.cardBg};` : ""}
          }
        `;

        if (bodyVar) {
          document.body.style.fontFamily = bodyVar;
        }

        // Live Content updates
        if (theme.content && onContentChange) {
          onContentChange(theme.content);
        }

        // Sections
        if (theme.sections && onSectionsChange) {
          onSectionsChange(theme.sections);
        }

        // Preset ID
        if (theme.presetId && onPresetChange) {
          onPresetChange(theme.presetId);
        }
      }
    };

    const handleClick = (e) => {
      const target = e.target.closest("[data-editable]");
      if (!target) return;

      e.preventDefault();
      e.stopPropagation();

      const fieldKey = target.getAttribute("data-editable");

      // Visual feedback in iframe
      document.querySelectorAll(".is-selected-field").forEach((el) => {
        el.classList.remove("is-selected-field");
      });
      target.classList.add("is-selected-field");

      // Notify parent panel with strict origin
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          { type: "SELECT_ELEMENT", fieldKey },
          window.location.origin
        );
      }
    };

    window.addEventListener("message", handleMessage);
    document.addEventListener("click", handleClick, true);

    // Notify parent that iframe is ready to receive initial theme state
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "IFRAME_READY" }, window.location.origin);
    }

    return () => {
      document.body.classList.remove("is-preview-mode");
      window.removeEventListener("message", handleMessage);
      document.removeEventListener("click", handleClick, true);
    };
  }, [onSectionsChange, onContentChange]);

  return null;
}
