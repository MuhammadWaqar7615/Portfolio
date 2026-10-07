"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "../../../components/admin/AdminHeader";

export default function AdminSkillsPage() {
  const router = useRouter();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    icon: "code",
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchSkills();
  }, [router]);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      setSkills(data.skills || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setFormData({ name: "", category: "Frontend", icon: "code" });
    setEditingItem({ isNew: true });
    setStatusMessage("");
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name || "",
      category: item.category || "Frontend",
      icon: item.icon || "code",
    });
    setEditingItem(item);
    setStatusMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    const isNew = editingItem?.isNew;
    const url = isNew ? "/api/skills" : `/api/skills/${editingItem._id}`;
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
        setStatusMessage(isNew ? "Skill created & ISR triggered!" : "Skill updated & ISR triggered!");
        setEditingItem(null);
        fetchSkills();
      } else {
        setStatusMessage("Error saving skill");
      }
    } catch (err) {
      setStatusMessage("Error communicating with server");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this skill entry?")) return;
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setStatusMessage("Skill deleted");
        fetchSkills();
      }
    } catch (err) {
      setStatusMessage("Delete error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-[#e2e5eb] flex flex-col font-sans antialiased selection:bg-[#252a3d]">
      <AdminHeader activePage="skills" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[#232736]">
          <div>
            <h1 className="text-xl font-medium tracking-tight text-white">
              Skills
            </h1>
            <p className="text-sm text-[#8b94a7] mt-1 font-normal">
              Manage technical proficiencies, categories, and icon mappings.
            </p>
          </div>

          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#0f1117] text-xs font-medium hover:bg-[#e2e5eb] transition-colors cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            + Add Skill
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
                {editingItem.isNew ? "Create Skill Entry" : "Edit Skill"}
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
                <label className="block text-[#8b94a7] font-medium text-xs">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Next.js"
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#8b94a7] font-medium text-xs">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                >
                  <option value="Frontend">Frontend Engineering</option>
                  <option value="Backend">Backend & Data Layer</option>
                  <option value="Languages & Tools">Styling & Motion Systems</option>
                  <option value="AI & Data">Toolchains & Deployment</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#8b94a7] font-medium text-xs">Icon Key / Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g. react, nextjs, typescript"
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-white text-[#0f1117] font-medium text-xs rounded-lg hover:bg-[#e2e5eb] transition-colors cursor-pointer"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-3">
            {loading ? (
              <div className="space-y-3 animate-pulse">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 rounded-xl bg-[#161822] border border-[#232736]"></div>
                ))}
              </div>
            ) : skills.length === 0 ? (
              <div className="p-12 text-center text-[#8b94a7] text-sm border border-[#232736] bg-[#161822] rounded-xl">
                No skills found in database.
              </div>
            ) : (
              skills.map((item) => (
                <div
                  key={item._id}
                  className="border border-[#232736] bg-[#161822] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#353c52] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 transition-all duration-200"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-sm font-medium text-white tracking-tight">{item.name}</h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full border border-[#2b3044] bg-[#1c1f2e] text-[#8b94a7]">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#8b94a7]">Icon: {item.icon}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3.5 py-1.5 rounded-lg border border-[#2b3044] bg-[#1c1f2e] text-[#cbd5e1] hover:text-white hover:bg-[#25293d] text-xs transition-all duration-150 active:scale-[0.98] cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3.5 py-1.5 rounded-lg border border-[#2b3044] bg-[#1c1f2e] text-[#8b94a7] hover:text-rose-400 hover:border-rose-900/50 hover:bg-rose-950/20 text-xs transition-all duration-150 active:scale-[0.98] cursor-pointer"
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
