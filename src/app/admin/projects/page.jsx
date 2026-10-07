"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "../../../components/admin/AdminHeader";

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null); // null = list, object = editing/creating
  const [statusMessage, setStatusMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    problem: "",
    roleDecisions: "",
    techTags: "",
    codeLink: "",
    liveLinks: [{ label: "Live Site", url: "" }],
    coverImage: "",
    status: "live", // Default to live
    order: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchProjects();
  }, [router]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setFormData({
      title: "",
      shortDescription: "",
      problem: "",
      roleDecisions: "",
      techTags: "",
      codeLink: "",
      liveLinks: [{ label: "Live Site", url: "" }],
      coverImage: "",
      status: "live",
      order: 0,
    });
    setEditingProject({ isNew: true });
    setStatusMessage("");
  };

  const handleAddLiveLink = () => {
    setFormData((prev) => {
      const count = prev.liveLinks.length;
      const nextLabel = count === 1 ? "Admin Panel" : count === 2 ? "POS Portal" : "Live Demo";
      return {
        ...prev,
        liveLinks: [...prev.liveLinks, { label: nextLabel, url: "" }],
      };
    });
  };

  const handleUpdateLiveLink = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.liveLinks];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, liveLinks: updated };
    });
  };

  const handleRemoveLiveLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      liveLinks: prev.liveLinks.filter((_, i) => i !== index),
    }));
  };

  const handleEdit = (project) => {
    const initialLinks =
      Array.isArray(project.liveLinks) && project.liveLinks.length > 0
        ? project.liveLinks.map((l) => ({ label: l.label || "Live Demo", url: l.url || "" }))
        : project.liveLink
        ? [{ label: "Live Site", url: project.liveLink }]
        : [{ label: "Live Site", url: "" }];

    setFormData({
      title: project.title || "",
      shortDescription: project.shortDescription || "",
      problem: project.problem || "",
      roleDecisions: project.roleDecisions || "",
      techTags: Array.isArray(project.techTags) ? project.techTags.join(", ") : project.techTags || "",
      codeLink: project.codeLink || "",
      liveLinks: initialLinks,
      coverImage: project.coverImage || "",
      status: project.status || "live",
      order: project.order || 0,
    });
    setEditingProject(project);
    setStatusMessage("");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const token = localStorage.getItem("admin_token");
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      const json = await res.json();
      if (res.ok && json.url) {
        setFormData((prev) => ({ ...prev, coverImage: json.url }));
        setStatusMessage("Image uploaded successfully!");
      } else {
        setStatusMessage("Upload failed: " + (json.message || "Unknown error"));
      }
    } catch {
      setStatusMessage("Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");

    const cleanedLiveLinks = formData.liveLinks
      .map((l) => ({
        label: (l.label || "Live Demo").trim(),
        url: (l.url || "").trim(),
      }))
      .filter((l) => Boolean(l.url));

    const payload = {
      ...formData,
      liveLinks: cleanedLiveLinks,
      liveLink: cleanedLiveLinks.length > 0 ? cleanedLiveLinks[0].url : "",
      techTags:
        typeof formData.techTags === "string"
          ? formData.techTags.split(",").map((t) => t.trim()).filter(Boolean)
          : formData.techTags,
    };

    const isNew = editingProject?.isNew;
    const url = isNew ? "/api/projects" : `/api/projects/${editingProject._id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok) {
        setStatusMessage(isNew ? "Project created & ISR revalidated!" : "Project updated & ISR revalidated!");
        setEditingProject(null);
        fetchProjects();
      } else {
        setStatusMessage("Error: " + (json.message || "Operation failed"));
      }
    } catch {
      setStatusMessage("Network error saving project.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setStatusMessage("Project deleted & ISR revalidated!");
        fetchProjects();
      } else {
        setStatusMessage("Delete failed");
      }
    } catch {
      setStatusMessage("Error deleting project");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-[#e2e5eb] flex flex-col font-sans antialiased selection:bg-[#252a3d]">
      <AdminHeader activePage="projects" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[#1e2230]">
          <div>
            <h1 className="text-xl font-medium text-white tracking-tight">
              Projects
            </h1>
            <p className="text-sm text-[#8b94a7] mt-0.5">
              Manage showcase projects, live demos, and case study links.
            </p>
          </div>

          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#0f1117] text-xs font-medium hover:bg-[#e2e5eb] transition-colors cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            + Add Project
          </button>
        </div>
        {statusMessage && (
          <div className="p-3 rounded-xl border border-[#232736] bg-[#161822] text-[#e2e5eb] text-xs">
            {statusMessage}
          </div>
        )}

        {/* Editor Form Modal or Drawer */}
        {editingProject ? (
          <div className="border border-[#232736] bg-[#161822] rounded-xl p-6 sm:p-8 max-w-3xl mx-auto shadow-xl">
            <div className="flex items-center justify-between border-b border-[#232736] pb-4 mb-6">
              <h2 className="text-base font-semibold text-white">
                {editingProject.isNew ? "Create New Project" : `Edit Project: ${formData.title}`}
              </h2>
              <button
                onClick={() => setEditingProject(null)}
                className="text-xs text-[#8b94a7] hover:text-white transition-colors"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-[#cbd5e1] font-medium text-xs">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Modern Architecture Platform"
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#cbd5e1] font-medium text-xs">
                  Status Enforcer *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                >
                  <option value="live">Live (Eligible for Featured Showcase)</option>
                  <option value="in-progress">In-Progress (Practice Lab Routing)</option>
                  <option value="archived">Archived (De-emphasized Lab)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#cbd5e1] font-medium text-xs">
                  Short Description *
                </label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="A concise one-line summary of what this project accomplishes"
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#cbd5e1] font-medium text-xs">
                  Problem Statement *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  placeholder="The user/technical problem solved..."
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3 py-2 text-white text-sm focus:outline-none transition-colors resize-y"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#cbd5e1] font-medium text-xs">
                  Role & Technical Decisions *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.roleDecisions}
                  onChange={(e) => setFormData({ ...formData, roleDecisions: e.target.value })}
                  placeholder="Architectural choices, libraries picked, data modeling..."
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3 py-2 text-white text-sm focus:outline-none transition-colors resize-y"
                />
              </div>

              {/* Multi Live Links Section */}
              <div className="border border-[#232736] bg-[#12141c] p-4 rounded-xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="block text-white font-medium text-xs">
                      Live Deployment Links
                    </label>
                    <span className="text-xs text-[#8b94a7]">
                      Add multiple endpoints (e.g. Live Site, Admin Panel, POS Portal)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddLiveLink}
                    className="px-3 py-1.5 rounded-lg bg-[#1c1f2e] hover:bg-[#25293d] text-[#cbd5e1] hover:text-white text-xs border border-[#2b3044] transition-colors w-fit cursor-pointer"
                  >
                    + Add Link
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  {formData.liveLinks.map((link, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#161822] border border-[#232736] rounded-lg flex flex-col sm:flex-row gap-3 items-start sm:items-center"
                    >
                      {/* Label with quick presets */}
                      <div className="w-full sm:w-2/5 space-y-1.5">
                        <label className="text-[11px] text-[#8b94a7] block">
                          Link #{idx + 1} Label
                        </label>
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => handleUpdateLiveLink(idx, "label", e.target.value)}
                          placeholder="e.g. Live Site, Admin Panel"
                          className="w-full bg-[#0b0c10] border border-[#232736] rounded-md px-2.5 py-1.5 text-white text-xs focus:border-[#4f566b] focus:outline-none"
                        />
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {["Live Site", "Admin Panel", "POS Portal", "Client App"].map((presetLabel) => (
                            <button
                              key={presetLabel}
                              type="button"
                              onClick={() => handleUpdateLiveLink(idx, "label", presetLabel)}
                              className={`text-[10px] px-2 py-0.5 rounded transition-colors ${
                                link.label === presetLabel
                                  ? "bg-white text-[#0f1117] font-medium"
                                  : "bg-[#1c1f2e] text-[#8b94a7] hover:text-white border border-[#2b3044]"
                              }`}
                            >
                              {presetLabel}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* URL input */}
                      <div className="w-full sm:flex-1 space-y-1.5">
                        <label className="text-[11px] text-[#8b94a7] block">
                          URL (https://...)
                        </label>
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => handleUpdateLiveLink(idx, "url", e.target.value)}
                          placeholder="https://..."
                          className="w-full bg-[#0b0c10] border border-[#232736] rounded-md px-2.5 py-1.5 text-white text-xs focus:border-[#4f566b] focus:outline-none"
                        />
                      </div>

                      {/* Remove Button */}
                      {formData.liveLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveLiveLink(idx)}
                          className="mt-2 sm:mt-0 p-1.5 text-[#8b94a7] hover:text-rose-400 hover:bg-rose-950/20 rounded border border-transparent hover:border-rose-900/40 text-xs transition-colors self-end sm:self-center cursor-pointer"
                          title="Remove this link"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Source Code Repository Link */}
              <div className="space-y-1.5">
                <label className="block text-[#cbd5e1] font-medium text-xs">
                  Source Code Repository Link (GitHub)
                </label>
                <input
                  type="url"
                  value={formData.codeLink}
                  onChange={(e) => setFormData({ ...formData, codeLink: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#cbd5e1] font-medium text-xs">
                  Technology Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.techTags}
                  onChange={(e) => setFormData({ ...formData, techTags: e.target.value })}
                  placeholder="React, Next.js, Tailwind CSS"
                  className="w-full bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#cbd5e1] font-medium text-xs">
                  Cover Image URL / Upload
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 bg-[#0b0c10] border border-[#232736] focus:border-[#4f566b] rounded-lg px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                  />
                  <label className="px-4 py-2 bg-[#1c1f2e] hover:bg-[#25293d] text-[#cbd5e1] hover:text-white border border-[#2b3044] rounded-lg cursor-pointer text-xs font-medium transition-colors">
                    {uploading ? "Uploading..." : "Upload File"}
                    <input type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-white text-[#0f1117] font-medium text-xs rounded-lg hover:bg-[#e2e5eb] transition-colors cursor-pointer shadow-sm"
                >
                  Save Project & Trigger ISR →
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Project List */
          <div className="space-y-3">
            {loading ? (
              <div className="space-y-3 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-28 rounded-xl bg-[#161822] border border-[#232736]"></div>
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="p-12 text-center text-[#8b94a7] text-sm border border-[#232736] bg-[#161822] rounded-xl">
                No projects found in database.
              </div>
            ) : (
              projects.map((p) => (
                <div
                  key={p._id}
                  className="border border-[#232736] bg-[#161822] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#353c52] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 transition-all duration-200"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium border ${
                          p.status === "live"
                            ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
                            : "text-[#8b94a7] border-[#2b3044] bg-[#1c1f2e]"
                        }`}
                      >
                        {p.status}
                      </span>
                      <h3 className="text-sm font-semibold text-white tracking-tight">{p.title}</h3>
                    </div>
                    <p className="text-xs text-[#9ca3af] leading-relaxed">{p.shortDescription}</p>

                    {/* Quick view of links */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {p.liveLinks && p.liveLinks.length > 0 ? (
                        p.liveLinks.map((l, i) => (
                          <a
                            key={i}
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2.5 py-1 rounded-md border border-[#2b3044] text-[#cbd5e1] bg-[#1c1f2e] hover:text-white hover:bg-[#25293d] flex items-center gap-1 transition-all duration-150 active:scale-[0.98]"
                          >
                            <span>{l.label || "Live Demo"}</span>
                            <svg className="w-2.5 h-2.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ))
                      ) : p.liveLink ? (
                        <a
                          href={p.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2.5 py-1 rounded-md border border-[#2b3044] text-[#cbd5e1] bg-[#1c1f2e] hover:text-white hover:bg-[#25293d] flex items-center gap-1 transition-all duration-150 active:scale-[0.98]"
                        >
                          <span>Live Demo</span>
                          <svg className="w-2.5 h-2.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : null}
                      {p.codeLink && (
                        <a
                          href={p.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2.5 py-1 rounded-md border border-[#2b3044] text-[#8b94a7] hover:text-white bg-[#181b26] hover:bg-[#222736] flex items-center gap-1 transition-all duration-150 active:scale-[0.98]"
                        >
                          <span>GitHub</span>
                          <svg className="w-2.5 h-2.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3.5 py-1.5 rounded-lg border border-[#2b3044] bg-[#1c1f2e] text-[#cbd5e1] hover:text-white hover:bg-[#25293d] text-xs transition-all duration-150 active:scale-[0.98] cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
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
