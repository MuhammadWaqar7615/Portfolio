import mongoose from "mongoose";

import {
  ALLOWED_FONTS,
  HEX_COLOR_REGEX,
  FONT_VARIABLE_MAP,
  RADIUS_MAP,
  SPACING_MAP,
  DEFAULT_SECTIONS,
  DEFAULT_THEME,
} from "../lib/themeConstants.js";

export {
  ALLOWED_FONTS,
  HEX_COLOR_REGEX,
  FONT_VARIABLE_MAP,
  RADIUS_MAP,
  SPACING_MAP,
  DEFAULT_SECTIONS,
  DEFAULT_THEME,
};

const SectionItemSchema = new mongoose.Schema(
  {
    sectionId: { type: String, required: true },
    visible: { type: Boolean, default: true },
    order: { type: Number, required: true },
  },
  { _id: false }
);

const ThemeColorsSchema = new mongoose.Schema(
  {
    primary: {
      type: String,
      required: true,
      match: [HEX_COLOR_REGEX, "Invalid primary hex color"],
      default: "#090A0F",
    },
    accent: {
      type: String,
      required: true,
      match: [HEX_COLOR_REGEX, "Invalid accent hex color"],
      default: "#38BDF8",
    },
    background: {
      type: String,
      required: true,
      match: [HEX_COLOR_REGEX, "Invalid background hex color"],
      default: "#090A0F",
    },
    text: {
      type: String,
      required: true,
      match: [HEX_COLOR_REGEX, "Invalid text hex color"],
      default: "#F8FAFC",
    },
    headingColor: {
      type: String,
      required: true,
      match: [HEX_COLOR_REGEX, "Invalid heading hex color"],
      default: "#FFFFFF",
    },
    cardBg: {
      type: String,
      match: [HEX_COLOR_REGEX, "Invalid card background hex color"],
      default: "#0C0E14",
    },
  },
  { _id: false }
);

const ThemeTypographySchema = new mongoose.Schema(
  {
    headingFont: {
      type: String,
      enum: ALLOWED_FONTS,
      default: "Space Grotesk",
      required: true,
    },
    bodyFont: {
      type: String,
      enum: ALLOWED_FONTS,
      default: "Inter",
      required: true,
    },
  },
  { _id: false }
);

const ThemeHistoryItemSchema = new mongoose.Schema(
  {
    presetId: { type: String, default: "preset-1" },
    colors: ThemeColorsSchema,
    lightColors: ThemeColorsSchema,
    content: mongoose.Schema.Types.Mixed,
    typography: ThemeTypographySchema,
    radius: {
      type: String,
      enum: ["sharp", "soft", "editorial", "rounded"],
      default: "soft",
    },
    spacing: {
      type: String,
      enum: ["compact", "cozy", "airy"],
      default: "cozy",
    },
    sections: [SectionItemSchema],
    publishedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const SiteThemeSchema = new mongoose.Schema(
  {
    presetId: {
      type: String,
      default: "preset-1",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
      required: true,
    },
    colors: {
      type: ThemeColorsSchema,
      default: () => ({ ...DEFAULT_THEME.colors }),
      required: true,
    },
    lightColors: {
      type: ThemeColorsSchema,
      default: () => ({ ...DEFAULT_THEME.lightColors }),
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({ ...DEFAULT_THEME.content }),
    },
    typography: {
      type: ThemeTypographySchema,
      default: () => ({ ...DEFAULT_THEME.typography }),
      required: true,
    },
    radius: {
      type: String,
      enum: ["sharp", "soft", "editorial", "rounded"],
      default: "soft",
      required: true,
    },
    spacing: {
      type: String,
      enum: ["compact", "cozy", "airy"],
      default: "cozy",
      required: true,
    },
    sections: {
      type: [SectionItemSchema],
      default: () => [...DEFAULT_SECTIONS],
      required: true,
    },
    history: {
      type: [ThemeHistoryItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.SiteTheme) {
  delete mongoose.models.SiteTheme;
}

export default mongoose.model("SiteTheme", SiteThemeSchema);
