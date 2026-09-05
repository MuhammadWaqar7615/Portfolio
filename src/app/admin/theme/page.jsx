"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const GOOGLE_FONTS = [
  "Inter", "Space Grotesk", "Playfair Display", "Merriweather", 
  "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", 
  "Nunito", "Raleway", "DM Sans", "Outfit", "Plus Jakarta Sans"
];

export default function ThemeCustomizer() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [theme, setTheme] = useState({
    fonts: { heading: "Space Grotesk", body: "Inter" },
    colors: {
      primary: "#090A0F",
      secondary: "#FFFFFF",
      accent: "#38BDF8",
      background: "#090A0F",
      text: "#F8FAFC",
      cardBg: "#0C0E14",
    },
    spacing: { containerPadding: "2rem", sectionGap: "4rem", cardPadding: "1.5rem" },
    borderRadius: "0.5rem",
    animations: { enabled: true, duration: "0.6s", delay: "0.1s" },
    logo: "",
    customCSS: "",
  });

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
        setTheme((prev) => ({
          ...prev,
          ...data.theme,
          fonts: { ...prev.fonts, ...data.theme.fonts },
          colors: { ...prev.colors, ...data.theme.colors },
          spacing: { ...prev.spacing, ...data.theme.spacing },
          animations: { ...prev.animations, ...data.theme.animations },
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section, key, value) => {
    setTheme((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSimpleChange = (key, value) => {
    setTheme((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const token = localStorage.getItem("admin_token");
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      const json = await res.json();
      if (res.ok && json.url) {
        handleSimpleChange("logo", json.url);
        setStatusMessage("Logo uploaded successfully!");
      } else {
        setStatusMessage("Upload failed: " + (json.message || "Unknown"));
      }
    } catch (err) {
      setStatusMessage("Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage("");
    const token = localStorage.getItem("admin_token");

    try {
      const res = await fetch("/api/theme", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(theme),
      });

      if (res.ok) {
        setStatusMessage("Theme saved & ISR cache purged! Live site is updated.");
      } else {
        setStatusMessage("Error saving theme");
      }
    } catch (err) {
      setStatusMessage("Network error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-white bg-[#090A0F] min-h-screen">Loading theme settings...</div>;

  const fontUrl = `https://fonts.googleapis.com/css2?family=${theme.fonts.heading.replace(/ /g, "+")}:wght@400;500;600;700&family=${theme.fonts.body.replace(/ /g, "+")}:wght@400;500;600;700&display=swap`;

  return (
    <div className="min-h-screen bg-[#090A0F] text-white flex flex-col font-sans">
      <header className="border-b border-white/10 bg-[#0C0E14] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-xs font-mono text-gray-400 hover:text-white">
            ← Dashboard
          </Link>
          <h1 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
            Theme & Styling Customization
          </h1>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <Link href="/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
            View Live Site ↗
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-sky-400 cursor-pointer disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving..." : "Save Theme"}
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Panel: Controls */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto border-r border-white/10" style={{ maxHeight: "calc(100vh - 64px)" }}>
          {statusMessage && (
            <div className="mb-6 p-4 border border-sky-500/30 bg-sky-500/10 text-sky-300 text-xs font-mono">
              {statusMessage}
            </div>
          )}

          <div className="space-y-8 font-mono text-xs">
            {/* Typography */}
            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase border-b border-white/10 pb-2">1. Typography</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Heading Font</label>
                  <select value={theme.fonts.heading} onChange={(e) => handleChange("fonts", "heading", e.target.value)} className="w-full bg-[#0C0E14] border border-white/10 p-2 text-white outline-none focus:border-sky-400">
                    {GOOGLE_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Body Font</label>
                  <select value={theme.fonts.body} onChange={(e) => handleChange("fonts", "body", e.target.value)} className="w-full bg-[#0C0E14] border border-white/10 p-2 text-white outline-none focus:border-sky-400">
                    {GOOGLE_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
            </section>

            {/* Colors */}
            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase border-b border-white/10 pb-2">2. Colors</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "primary", label: "Primary" },
                  { key: "secondary", label: "Secondary" },
                  { key: "accent", label: "Accent" },
                  { key: "background", label: "Background" },
                  { key: "text", label: "Text" },
                  { key: "cardBg", label: "Card Background" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-gray-400 mb-1">{label}</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={theme.colors[key]} onChange={(e) => handleChange("colors", key, e.target.value)} className="w-8 h-8 cursor-pointer bg-transparent border-0 p-0 rounded" />
                      <input type="text" value={theme.colors[key]} onChange={(e) => handleChange("colors", key, e.target.value)} className="flex-1 bg-[#0C0E14] border border-white/10 p-2 text-white outline-none focus:border-sky-400 uppercase" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Spacing & Borders */}
            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase border-b border-white/10 pb-2">3. Spacing & Borders</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Container Padding</label>
                  <input type="text" value={theme.spacing.containerPadding} onChange={(e) => handleChange("spacing", "containerPadding", e.target.value)} className="w-full bg-[#0C0E14] border border-white/10 p-2 text-white outline-none focus:border-sky-400" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Section Gap</label>
                  <input type="text" value={theme.spacing.sectionGap} onChange={(e) => handleChange("spacing", "sectionGap", e.target.value)} className="w-full bg-[#0C0E14] border border-white/10 p-2 text-white outline-none focus:border-sky-400" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Card Padding</label>
                  <input type="text" value={theme.spacing.cardPadding} onChange={(e) => handleChange("spacing", "cardPadding", e.target.value)} className="w-full bg-[#0C0E14] border border-white/10 p-2 text-white outline-none focus:border-sky-400" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Border Radius</label>
                  <input type="text" value={theme.borderRadius} onChange={(e) => handleSimpleChange("borderRadius", e.target.value)} className="w-full bg-[#0C0E14] border border-white/10 p-2 text-white outline-none focus:border-sky-400" />
                </div>
              </div>
            </section>

            {/* Animations */}
            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase border-b border-white/10 pb-2">4. Animations</h2>
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="flex items-center gap-2 mt-4">
                  <input type="checkbox" id="animEnabled" checked={theme.animations.enabled} onChange={(e) => handleChange("animations", "enabled", e.target.checked)} className="w-4 h-4 accent-sky-500 cursor-pointer" />
                  <label htmlFor="animEnabled" className="text-white cursor-pointer">Enable Animations</label>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Duration</label>
                  <input type="text" value={theme.animations.duration} onChange={(e) => handleChange("animations", "duration", e.target.value)} className="w-full bg-[#0C0E14] border border-white/10 p-2 text-white outline-none focus:border-sky-400" />
                </div>
              </div>
            </section>

            {/* Advanced & Logo */}
            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase border-b border-white/10 pb-2">5. Advanced & Logo</h2>
              
              <div>
                <label className="block text-gray-400 mb-1">Custom Logo URL (optional)</label>
                <div className="flex gap-2">
                  <input type="text" value={theme.logo} onChange={(e) => handleSimpleChange("logo", e.target.value)} placeholder="https://..." className="flex-1 bg-[#0C0E14] border border-white/10 p-2 text-white outline-none focus:border-sky-400" />
                  <label className="px-3 py-2 bg-white/10 hover:bg-white/20 cursor-pointer transition-colors border border-white/10 text-center">
                    {uploading ? "..." : "Upload"}
                    <input type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Custom CSS</label>
                <textarea rows={4} value={theme.customCSS} onChange={(e) => handleSimpleChange("customCSS", e.target.value)} className="w-full bg-[#0C0E14] border border-white/10 p-2 text-white outline-none focus:border-sky-400" placeholder=".hero-title { letter-spacing: -0.05em; }" />
              </div>
            </section>

          </div>
        </div>

        {/* Right Panel: Live Preview */}
        <div className="w-full md:w-1/2 relative bg-black overflow-y-auto" style={{ maxHeight: "calc(100vh - 64px)" }}>
          <link href={fontUrl} rel="stylesheet" />
          
          <div className="p-4 sticky top-0 bg-black/80 backdrop-blur border-b border-white/10 z-10 flex justify-between items-center">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">Live Preview</span>
          </div>

          <div 
            className={`w-full min-h-[500px] transition-colors duration-300 ${!theme.animations.enabled ? "disable-animations" : ""}`}
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              fontFamily: `'${theme.fonts.body}', sans-serif`,
            }}
          >
            <style dangerouslySetInnerHTML={{ __html: theme.customCSS }} />
            
            <div style={{ padding: theme.spacing.containerPadding }}>
              
              {/* Fake Hero */}
              <div style={{ marginBottom: theme.spacing.sectionGap }}>
                {theme.logo && <img src={theme.logo} alt="Logo" className="h-12 mb-8 object-contain" />}
                
                <h1 style={{ fontFamily: `'${theme.fonts.heading}', sans-serif` }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                  Design System Preview
                </h1>
                <p className="text-lg opacity-80 max-w-2xl leading-relaxed">
                  This preview area updates in real-time. Change typography, colors, spacing, and animations in the left panel to craft your unique brand identity.
                </p>
                <div className="mt-8 flex gap-4">
                  <button 
                    className="px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-1"
                    style={{ 
                      backgroundColor: theme.colors.accent, 
                      color: theme.colors.background,
                      borderRadius: theme.borderRadius
                    }}
                  >
                    Primary Action
                  </button>
                  <button 
                    className="px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 border"
                    style={{ 
                      borderColor: theme.colors.accent,
                      color: theme.colors.accent,
                      borderRadius: theme.borderRadius
                    }}
                  >
                    Secondary
                  </button>
                </div>
              </div>

              {/* Fake Card Component */}
              <div 
                className="border transition-all hover:-translate-y-2 group"
                style={{
                  backgroundColor: theme.colors.cardBg,
                  borderColor: theme.colors.secondary,
                  padding: theme.spacing.cardPadding,
                  borderRadius: theme.borderRadius,
                  transitionDuration: theme.animations.duration,
                  transitionDelay: theme.animations.delay
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 style={{ fontFamily: `'${theme.fonts.heading}', sans-serif` }} className="text-xl md:text-2xl font-bold">Featured Component</h3>
                  <span style={{ color: theme.colors.accent }} className="font-mono text-xs border px-2 py-1" style={{ borderColor: theme.colors.accent, color: theme.colors.accent, borderRadius: theme.borderRadius }}>
                    LIVE
                  </span>
                </div>
                <p className="opacity-70 text-sm mb-6 leading-relaxed">
                  Notice how this card automatically inherits the background color, padding, and border radius you set in the panel. The layout stays consistent while your brand shines through.
                </p>
                <div className="h-2 w-full bg-black/20 rounded overflow-hidden">
                  <div className="h-full w-2/3" style={{ backgroundColor: theme.colors.accent }}></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
