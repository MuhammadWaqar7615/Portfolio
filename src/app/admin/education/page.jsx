"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminEducationPage() {
  const router = useRouter();
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    year: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchEducation();
  }, [router]);

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/education");
      const data = await res.json();
      setEducation(data.education || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setFormData({ degree: "", institution: "", year: "" });
    setEditingItem({ isNew: true });
    setStatusMessage("");
  };

  const handleEdit = (item) => {
    setFormData({
      degree: item.degree || "",
      institution: item.institution || "",
      year: item.year || "",
    });
    setEditingItem(item);
    setStatusMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    const isNew = editingItem?.isNew;
    const url = isNew ? "/api/education" : `/api/education/${editingItem._id}`;
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
        setStatusMessage(isNew ? "Education created & ISR triggered!" : "Education updated & ISR triggered!");
        setEditingItem(null);
        fetchEducation();
      } else {
        setStatusMessage("Error saving education entry");
      }
    } catch (err) {
      setStatusMessage("Error communicating with server");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this education entry?")) return;
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`/api/education/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setStatusMessage("Education entry deleted");
        fetchEducation();
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
            Education Management
          </h1>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-sky-400 cursor-pointer"
        >
          + Add Education
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
                {editingItem.isNew ? "New Education Entry" : "Edit Education"}
              </h2>
              <button onClick={() => setEditingItem(null)} className="text-xs font-mono text-gray-400">
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-gray-400 uppercase mb-1">Degree Title *</label>
                <input
                  type="text"
                  required
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 uppercase mb-1">Institution Name *</label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 uppercase mb-1">Year / Timeframe *</label>
                <input
                  type="text"
                  required
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-sky-400 cursor-pointer"
              >
                Save Education & Revalidate →
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            {loading ? (
              <div className="p-8 text-center text-gray-400 font-mono text-sm">Loading education...</div>
            ) : (
              education.map((item) => (
                <div
                  key={item._id}
                  className="border border-white/10 bg-[#0C0E14] p-6 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.degree}</h3>
                    <p className="text-xs font-mono text-sky-400">{item.institution} ({item.year})</p>
                  </div>
                  <div className="flex gap-2 font-mono text-xs">
                    <button onClick={() => handleEdit(item)} className="px-3 py-1.5 border border-white/20">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="px-3 py-1.5 border border-rose-500/30 text-rose-300">Delete</button>
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
