"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("admin_token", data.token);
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (_err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-[#e2e5eb] flex flex-col justify-between p-4 sm:p-6 font-sans antialiased selection:bg-[#252a3d]">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#8b94a7] hover:text-white transition-all duration-150 active:scale-[0.98]"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Portfolio</span>
        </Link>
      </div>

      <div className="w-full max-w-sm mx-auto my-auto">
        <div className="rounded-2xl border border-[#232736] bg-[#161822] p-8 shadow-2xl space-y-6 transition-all duration-200">
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-lg bg-white text-[#0f1117] font-semibold text-xs flex items-center justify-center tracking-tight mb-4 shadow-sm">
              MW
            </div>
            <h1 className="text-lg font-medium tracking-tight text-white">
              Admin Access
            </h1>
            <p className="text-sm text-[#8b94a7] font-normal">
              Enter credentials to authenticate into the portfolio console.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg border border-rose-900/40 bg-rose-950/20 text-rose-300 text-xs transition-all animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="block text-[#8b94a7] font-medium text-xs">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mwaqar7615@gmail.com"
                className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#8b94a7] font-medium text-xs">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-white hover:bg-[#e2e5eb] text-[#0f1117] font-medium text-xs tracking-tight transition-all duration-150 active:scale-[0.98] disabled:opacity-50 mt-2 cursor-pointer shadow-sm"
            >
              {loading ? "Authenticating..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-xs text-[#5a6275] py-2">
        Portfolio Console · Muhammad Waqar
      </div>
    </div>
  );
}
