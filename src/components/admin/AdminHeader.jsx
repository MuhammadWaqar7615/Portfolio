"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminHeader({ activePage }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
  };

  const navItems = [
    { label: "Overview", href: "/admin/dashboard", id: "dashboard" },
    { label: "Projects", href: "/admin/projects", id: "projects" },
    { label: "Experience", href: "/admin/experience", id: "experience" },
    { label: "Skills", href: "/admin/skills", id: "skills" },
    { label: "Education", href: "/admin/education", id: "education" },
    { label: "Themes", href: "/admin/theme", id: "themes" },
    { label: "Settings", href: "/admin/settings", id: "settings" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#1e2230] bg-[#0f1117]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <span className="w-7 h-7 rounded-lg bg-[#222738] text-white font-semibold text-xs flex items-center justify-center tracking-tight shadow-sm border border-[#2b3147]">
              MW
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white tracking-tight">
                Console
              </span>
              <span className="text-[11px] text-[#8b94a7] bg-[#161924] border border-[#262c3e] px-2 py-0.5 rounded-full">
                Admin
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                activePage === item.id ||
                pathname === item.href ||
                (item.id !== "dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    isActive
                      ? "bg-[#1e2333] text-white font-medium"
                      : "text-[#9ca3af] hover:text-white hover:bg-[#161924]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-2 text-[#9ca3af] text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Online</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#cbd5e1] hover:text-white bg-[#181c28] hover:bg-[#202536] border border-[#262c3e] transition-colors"
          >
            <span>View Site</span>
            <span className="text-[11px] opacity-70">↗</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="text-xs text-[#8b94a7] hover:text-white transition-colors cursor-pointer px-2 py-1"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Mobile Navigation Sub-bar */}
      <div className="md:hidden border-t border-[#1e2230] px-4 py-2 flex items-center gap-1 overflow-x-auto scrollbar-none">
        {navItems.map((item) => {
          const isActive =
            activePage === item.id ||
            pathname === item.href ||
            (item.id !== "dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-[#1e2333] text-white font-medium"
                  : "text-[#9ca3af] hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
