"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "../../../components/admin/AdminHeader";

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
    <div className="min-h-screen bg-[#0f1117] text-[#e2e5eb] flex flex-col font-sans antialiased selection:bg-[#252a3d]">
      <AdminHeader activePage="education" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[#232736]">
          <div>
            <h1 className="text-xl font-medium tracking-tight text-white">
              Education
            </h1>
            <p className="text-sm text-[#8b94a7] mt-1 font-normal">
              Manage degrees, academic credentials, and university details.
            </p>
          </div>

          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#0f1117] text-xs font-medium hover:bg-[#e2e5eb] transition-colors cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            + Add Education
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
                {editingItem.isNew ? "Create Education Entry" : "Edit Education"}
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
                <label className="block text-[#8b94a7] font-medium text-xs">Degree Title *</label>
                <input
                  type="text"
                  required
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="e.g. BS Computer Science"
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#8b94a7] font-medium text-xs">Institution Name *</label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="e.g. University of California"
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#8b94a7] font-medium text-xs">Year / Timeframe *</label>
                <input
                  type="text"
                  required
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="e.g. 2020 - 2024"
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-white text-[#0f1117] font-medium text-xs rounded-lg hover:bg-[#e2e5eb] transition-colors cursor-pointer"
                >
                  Save Education
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-3">
            {loading ? (
              <div className="p-8 text-center text-[#8b94a7] text-sm">Loading education...</div>
            ) : (
              education.map((item) => (
                <div
                  key={item._id}
                  className="border border-[#232736] bg-[#161822] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#31374a] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-sm font-medium text-white tracking-tight">{item.degree}</h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full border border-[#2b3044] bg-[#1c1f2e] text-[#8b94a7]">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-sm text-[#8b94a7] font-normal">{item.institution}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3.5 py-1.5 rounded-lg border border-[#2b3044] bg-[#1c1f2e] text-[#cbd5e1] hover:text-white hover:bg-[#25293d] text-xs transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
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
