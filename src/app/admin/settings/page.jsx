"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ogImage: "",
    canonicalUrl: "https://muhammad-waqar.me",
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchSettings();
  }, [router]);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/site-metadata");
      const data = await res.json();
      if (data.metadata) {
        setFormData({
          title: data.metadata.title || "",
          description: data.metadata.description || "",
          ogImage: data.metadata.ogImage || "",
          canonicalUrl: data.metadata.canonicalUrl || "https://muhammad-waqar.me",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage("");

    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch("/api/site-metadata", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (res.ok) {
        setStatusMessage("Site Settings updated & ISR cache purged!");
      } else {
        setStatusMessage("Error: " + (json.message || "Failed to update"));
      }
    } catch (err) {
      setStatusMessage("Error communicating with server");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-white flex flex-col font-sans">
      <header className="border-b border-white/10 bg-[#0C0E14] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-xs font-mono text-gray-400 hover:text-white">
            ← Dashboard
          </Link>
          <h1 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
            Site Metadata & Global Settings
          </h1>
        </div>
      </header>

      <main className="editorial-container py-8 flex-1">
        {statusMessage && (
          <div className="mb-6 p-4 border border-sky-500/30 bg-sky-500/10 text-sky-300 text-xs font-mono">
            {statusMessage}
          </div>
        )}

        {loading ? (
          <div className="p-8 text-center text-gray-400 font-mono text-sm">Loading settings...</div>
        ) : (
          <div className="border border-white/10 bg-[#0C0E14] p-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold font-mono border-b border-white/10 pb-4 mb-6">
              Global SEO Metadata Configuration
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-gray-400 uppercase mb-1">Global Page Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 uppercase mb-1">Meta Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 uppercase mb-1">OpenGraph Image URL</label>
                <input
                  type="text"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  placeholder="https://muhammad-waqar.me/opengraph-image"
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 uppercase mb-1">Canonical URL Base</label>
                <input
                  type="text"
                  value={formData.canonicalUrl}
                  onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-sky-400 cursor-pointer disabled:opacity-50"
              >
                {saving ? "Saving & Revalidating..." : "Save Settings & Revalidate All Routes →"}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
