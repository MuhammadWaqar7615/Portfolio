"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ projects: 0, liveProjects: 0, experience: 0, skills: 0 });
  const [activeTheme, setActiveTheme] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(() => {
        setAuthenticated(true);
        loadStats();
      })
      .catch(() => {
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  const loadStats = async () => {
    try {
      const pRes = await fetch("/api/projects");
      const pData = await pRes.json();
      const projects = pData.projects || [];

      const eRes = await fetch("/api/experience");
      const eData = await eRes.json();

      const sRes = await fetch("/api/skills");
      const sData = await sRes.json();

      const tRes = await fetch("/api/theme");
      const tData = await tRes.json();
      if (tData.theme) {
        setActiveTheme(tData.theme);
      }

      setStats({
        projects: projects.length,
        liveProjects: projects.filter((p) => p.status === "live").length,
        experience: (eData.experience || []).length,
        skills: (sData.skills || []).length,
      });
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090A0F] text-white flex items-center justify-center font-mono text-sm">
        Authenticating session...
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-[#090A0F] text-white flex flex-col font-sans">
      {/* Admin Top Header */}
      <header className="border-b border-white/10 bg-[#0C0E14] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-white text-black font-mono text-xs font-bold">
            MW
          </span>
          <div>
            <h1 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
              CMS Admin Panel
            </h1>
            <span className="text-[10px] font-mono text-emerald-400">● Session Active</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <Link href="/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
            View Live Site ↗
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Admin Grid */}
      <div className="flex-1 editorial-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="border border-white/10 bg-[#0C0E14] p-6">
            <span className="text-xs font-mono uppercase text-gray-400">Total Projects</span>
            <p className="text-3xl font-bold text-white mt-1 font-mono">{stats.projects}</p>
          </div>
          <div className="border border-white/10 bg-[#0C0E14] p-6">
            <span className="text-xs font-mono uppercase text-gray-400">Featured (Live)</span>
            <p className="text-3xl font-bold text-sky-400 mt-1 font-mono">{stats.liveProjects}</p>
          </div>
          <div className="border border-white/10 bg-[#0C0E14] p-6">
            <span className="text-xs font-mono uppercase text-gray-400">Experience Items</span>
            <p className="text-3xl font-bold text-white mt-1 font-mono">{stats.experience}</p>
          </div>
          <div className="border border-white/10 bg-[#0C0E14] p-6">
            <span className="text-xs font-mono uppercase text-gray-400">Skills Total</span>
            <p className="text-3xl font-bold text-white mt-1 font-mono">{stats.skills}</p>
          </div>
        </div>

        {/* Active Published Theme Status Banner */}
        {activeTheme && (
          <div className="border border-white/10 bg-[#0C0E14] p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {activeTheme.presetId === "preset-2" ? "🎨" : "⚡"}
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">
                  Active Published Theme Preset
                </span>
                <span className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  {activeTheme.presetId === "preset-2" ? "Preset 2: Warm Studio / Earthy Editorial" : "Preset 1: Technical Craftsman"}
                  <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-white/10 text-sky-300">
                    {activeTheme.typography?.headingFont} / {activeTheme.typography?.bodyFont}
                  </span>
                </span>
              </div>
            </div>
            <Link
              href="/admin/theme"
              className="px-4 py-2 rounded bg-sky-400 hover:bg-sky-300 text-black font-mono text-xs font-bold transition-colors shrink-0"
            >
              Open Theme Customizer →
            </Link>
          </div>
        )}

        {/* Admin Navigation Hub */}
        <div className="border-b border-white/10 pb-4 mb-8">
          <h2 className="text-xl font-bold tracking-tight text-white mb-4">Content Management Areas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs font-mono uppercase tracking-wider">
            <Link
              href="/admin/projects"
              className="border border-white/10 bg-[#0C0E14] p-4 text-center hover:border-sky-400 hover:text-sky-400 transition-all"
            >
              Manage Projects →
            </Link>
            <Link
              href="/admin/experience"
              className="border border-white/10 bg-[#0C0E14] p-4 text-center hover:border-sky-400 hover:text-sky-400 transition-all"
            >
              Manage Experience →
            </Link>
            <Link
              href="/admin/education"
              className="border border-white/10 bg-[#0C0E14] p-4 text-center hover:border-sky-400 hover:text-sky-400 transition-all"
            >
              Manage Education →
            </Link>
            <Link
              href="/admin/skills"
              className="border border-white/10 bg-[#0C0E14] p-4 text-center hover:border-sky-400 hover:text-sky-400 transition-all"
            >
              Manage Skills →
            </Link>
            <Link
              href="/admin/settings"
              className="border border-white/10 bg-[#0C0E14] p-4 text-center hover:border-sky-400 hover:text-sky-400 transition-all"
            >
              Site Settings →
            </Link>
            <Link
              href="/admin/theme"
              className="border border-white/10 bg-[#0C0E14] p-4 text-center hover:border-sky-400 hover:text-sky-400 transition-all"
            >
              Manage Theme →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
