"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "../../../components/admin/AdminHeader";

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
    <div className="min-h-screen bg-[#0f1117] text-[#e2e5eb] flex flex-col font-sans antialiased selection:bg-[#252a3d]">
      <AdminHeader activePage="experience" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[#232736]">
          <div>
            <h1 className="text-xl font-medium tracking-tight text-white">
              Experience
            </h1>
            <p className="text-sm text-[#8b94a7] mt-1 font-normal">
              Manage work history, company roles, duration, and achievements.
            </p>
          </div>

          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#0f1117] text-xs font-medium hover:bg-[#e2e5eb] transition-colors cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            + Add Experience
          </button>
        </div>
        {statusMessage && (
          <div className="p-3 rounded-lg border border-[#232736] bg-[#161822] text-[#8b94a7] text-xs">
            {statusMessage}
          </div>
        )}

        {editingItem ? (
          <div className="border border-[#232736] bg-[#161822] rounded-xl p-6 sm:p-8 max-w-2xl mx-auto shadow-xl">
            <div className="flex items-center justify-between border-b border-[#232736] pb-4 mb-6">
              <h2 className="text-base font-medium text-white">
                {editingItem.isNew ? "Create Experience Entry" : "Edit Experience"}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="text-xs text-[#8b94a7] hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-[#8b94a7] font-medium text-xs">Role Title *</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#8b94a7] font-medium text-xs">Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Acme Studio"
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#8b94a7] font-medium text-xs">Duration *</label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g. Jan 2024 - Present"
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#8b94a7] font-medium text-xs">Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Key responsibilities and achievements..."
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors resize-y leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-white text-[#0f1117] font-medium text-xs rounded-lg hover:bg-[#e2e5eb] transition-colors cursor-pointer"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-3">
            {loading ? (
              <div className="p-8 text-center text-[#8b94a7] text-sm">Loading experience...</div>
            ) : experiences.length === 0 ? (
              <div className="p-8 text-center text-[#8b94a7] text-sm">No experience entries found.</div>
            ) : (
              experiences.map((exp) => (
                <div
                  key={exp._id}
                  className="border border-[#232736] bg-[#161822] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#31374a] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-sm font-medium text-white tracking-tight">
                        {exp.role} <span className="text-[#8b94a7] font-normal">at</span> {exp.company}
                      </h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full border border-[#2b3044] bg-[#1c1f2e] text-[#8b94a7]">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-sm text-[#8b94a7] font-normal leading-relaxed">{exp.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="px-3.5 py-1.5 rounded-lg border border-[#2b3044] bg-[#1c1f2e] text-[#cbd5e1] hover:text-white hover:bg-[#25293d] text-xs transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="px-3.5 py-1.5 rounded-lg border border-[#2b3044] bg-[#1c1f2e] text-[#8b94a7] hover:text-rose-400 hover:border-rose-900/50 hover:bg-rose-950/20 text-xs transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
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
