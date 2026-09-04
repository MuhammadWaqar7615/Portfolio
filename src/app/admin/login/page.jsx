"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-white/10 bg-[#0C0E14] p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
          <div className="flex h-8 w-8 items-center justify-center bg-white text-black font-mono text-xs font-bold">
            MW
          </div>
          <div>
            <h1 className="text-lg font-bold font-mono tracking-wider">CMS ADMIN AUTH</h1>
            <p className="text-xs font-mono text-gray-400">Portfolio Management Dashboard</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-mono">
            ✕ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-gray-400 uppercase tracking-widest mb-1">
              Admin Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mwaqar7615@gmail.com"
              className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm focus:border-sky-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 uppercase tracking-widest mb-1">
              Secret Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm focus:border-sky-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-sky-400 transition-colors disabled:opacity-50 mt-2 cursor-pointer"
          >
            {loading ? "Authenticating..." : "Authorize Dashboard →"}
          </button>
        </form>
      </div>
    </div>
  );
}
