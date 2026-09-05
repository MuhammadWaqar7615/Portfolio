import mongoose from "mongoose";

const ThemeSettingsSchema = new mongoose.Schema(
  {
    fonts: {
      heading: { type: String, default: "Space Grotesk" },
      body: { type: String, default: "Inter" },
    },
    colors: {
      primary: { type: String, default: "#090A0F" },
      secondary: { type: String, default: "#FFFFFF" },
      accent: { type: String, default: "#38BDF8" },
      background: { type: String, default: "#090A0F" },
      text: { type: String, default: "#F8FAFC" },
      cardBg: { type: String, default: "#0C0E14" },
    },
    spacing: {
      containerPadding: { type: String, default: "2rem" },
      sectionGap: { type: String, default: "4rem" },
      cardPadding: { type: String, default: "1.5rem" },
    },
    borderRadius: { type: String, default: "0.5rem" },
    animations: {
      enabled: { type: Boolean, default: true },
      duration: { type: String, default: "0.6s" },
      delay: { type: String, default: "0.1s" },
    },
    logo: { type: String, default: null },
    customCSS: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.ThemeSettings || mongoose.model("ThemeSettings", ThemeSettingsSchema);
