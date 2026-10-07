"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "../../../components/admin/AdminHeader";

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
    <div className="min-h-screen bg-[#0f1117] text-[#e2e5eb] flex flex-col font-sans antialiased selection:bg-[#252a3d]">
      <AdminHeader activePage="settings" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[#232736]">
          <div>
            <h1 className="text-xl font-medium tracking-tight text-white">
              Site Settings
            </h1>
            <p className="text-sm text-[#8b94a7] mt-1 font-normal">
              Configure global metadata, OpenGraph preview, and SEO tags.
            </p>
          </div>
        </div>
        {statusMessage && (
          <div className="p-3 rounded-lg border border-[#232736] bg-[#161822] text-[#8b94a7] text-xs">
            {statusMessage}
          </div>
        )}

        {loading ? (
          <div className="p-8 text-center text-[#8b94a7] text-sm">Loading settings...</div>
        ) : (
          <div className="border border-[#232736] bg-[#161822] rounded-xl p-6 sm:p-8 max-w-2xl mx-auto shadow-xl">
            <div className="border-b border-[#232736] pb-4 mb-6">
              <h2 className="text-base font-medium text-white">
                Global SEO Metadata Configuration
              </h2>
              <p className="text-sm text-[#8b94a7] mt-1 font-normal">
                Controls title tag, meta description, and social share cards across all routes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-[#8b94a7] font-medium text-xs">Global Page Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#8b94a7] font-medium text-xs">Meta Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors resize-y leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#8b94a7] font-medium text-xs">OpenGraph Image URL</label>
                <input
                  type="text"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  placeholder="https://muhammad-waqar.me/opengraph-image"
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#8b94a7] font-medium text-xs">Canonical URL Base</label>
                <input
                  type="text"
                  value={formData.canonicalUrl}
                  onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-2.5 bg-white text-[#0f1117] font-medium text-xs rounded-lg hover:bg-[#e2e5eb] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
