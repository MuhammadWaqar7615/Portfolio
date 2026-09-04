"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminExperiencePage() {
  const router = useRouter();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    role: "",
    company: "",
    duration: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchExperience();
  }, [router]);

  const fetchExperience = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/experience");
      const data = await res.json();
      setExperiences(data.experience || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setFormData({ role: "", company: "", duration: "", description: "" });
    setEditingItem({ isNew: true });
    setStatusMessage("");
  };

  const handleEdit = (item) => {
    setFormData({
      role: item.role || "",
      company: item.company || "",
      duration: item.duration || "",
      description: item.description || "",
    });
    setEditingItem(item);
    setStatusMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    const isNew = editingItem?.isNew;
    const url = isNew ? "/api/experience" : `/api/experience/${editingItem._id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatusMessage(isNew ? "Experience created & ISR triggered!" : "Experience updated & ISR triggered!");
        setEditingItem(null);
        fetchExperience();
      } else {
        setStatusMessage("Error saving experience");
      }
    } catch (err) {
      setStatusMessage("Error communicating with server");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this experience entry?")) return;
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`/api/experience/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setStatusMessage("Experience deleted");
        fetchExperience();
      }
    } catch (err) {
      setStatusMessage("Delete error");
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
            Experience Management
          </h1>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-sky-400 cursor-pointer"
        >
          + Add Experience
        </button>
      </header>

      <main className="editorial-container py-8 flex-1">
        {statusMessage && (
          <div className="mb-6 p-4 border border-sky-500/30 bg-sky-500/10 text-sky-300 text-xs font-mono">
            {statusMessage}
          </div>
        )}

        {editingItem ? (
          <div className="border border-white/10 bg-[#0C0E14] p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <h2 className="text-xl font-bold font-mono">
                {editingItem.isNew ? "New Experience Entry" : "Edit Experience"}
              </h2>
              <button onClick={() => setEditingItem(null)} className="text-xs font-mono text-gray-400">
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-gray-400 uppercase mb-1">Role Title *</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 uppercase mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 uppercase mb-1">Duration (e.g. Jan 2024 - Present) *</label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 uppercase mb-1">Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-sky-400 cursor-pointer"
              >
                Save Experience & Revalidate →
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            {loading ? (
              <div className="p-8 text-center text-gray-400 font-mono text-sm">Loading experience...</div>
            ) : (
              experiences.map((exp) => (
                <div
                  key={exp._id}
                  className="border border-white/10 bg-[#0C0E14] p-6 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">{exp.role} @ {exp.company}</h3>
                    <p className="text-xs font-mono text-sky-400">{exp.duration}</p>
                    <p className="text-xs text-gray-400 mt-1 font-light">{exp.description}</p>
                  </div>
                  <div className="flex gap-2 font-mono text-xs">
                    <button onClick={() => handleEdit(exp)} className="px-3 py-1.5 border border-white/20">Edit</button>
                    <button onClick={() => handleDelete(exp._id)} className="px-3 py-1.5 border border-rose-500/30 text-rose-300">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
