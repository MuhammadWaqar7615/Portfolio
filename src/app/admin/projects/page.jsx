"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div className="min-h-screen bg-[#090A0F] text-white flex flex-col font-sans">
      <header className="border-b border-white/10 bg-[#0C0E14] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-xs font-mono text-gray-400 hover:text-white">
            ← Dashboard
          </Link>
          <h1 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
            Project Content Management
          </h1>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-sky-400 cursor-pointer"
        >
          + Add New Project
        </button>
      </header>

      <main className="editorial-container py-8 flex-1">
        {statusMessage && (
          <div className="mb-6 p-4 border border-sky-500/30 bg-sky-500/10 text-sky-300 text-xs font-mono">
            {statusMessage}
          </div>
        )}

        {/* Editor Form Modal or Drawer */}
        {editingProject ? (
          <div className="border border-white/10 bg-[#0C0E14] p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <h2 className="text-xl font-bold font-mono">
                {editingProject.isNew ? "Create New Project" : `Edit Project: ${formData.title}`}
              </h2>
              <button
                onClick={() => setEditingProject(null)}
                className="text-xs font-mono text-gray-400 hover:text-white"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-gray-400 uppercase mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 uppercase mb-1">Status Enforcer (Mandatory Rule) *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm focus:border-sky-400"
                >
                  <option value="live">live (Eligible for Featured if live link exists)</option>
                  <option value="in-progress">in-progress (Automated routing to Practice Lab)</option>
                  <option value="archived">archived (De-emphasized Practice Lab)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 uppercase mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 uppercase mb-1">Problem Statement *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 uppercase mb-1">Role & Technical Decisions *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.roleDecisions}
                  onChange={(e) => setFormData({ ...formData, roleDecisions: e.target.value })}
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              {/* Multi Live Links Section */}
              <div className="border border-white/10 bg-[#07080C] p-4 rounded-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="block text-gray-200 uppercase font-bold text-xs tracking-wider">
                      Project Live Deployment Links
                    </label>
                    <span className="text-[11px] text-gray-400">
                      Add multiple links for projects (e.g. Live Site, Admin Panel, POS Portal, Customer App)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddLiveLink}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 border border-white/20 transition-colors w-fit"
                  >
                    <span>+ Add Demo Link</span>
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  {formData.liveLinks.map((link, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#090A0F] border border-white/10 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
                    >
                      {/* Label with quick presets */}
                      <div className="w-full sm:w-2/5 space-y-1">
                        <label className="text-[10px] uppercase text-gray-400 font-mono block">
                          Link #{idx + 1} Label
                        </label>
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => handleUpdateLiveLink(idx, "label", e.target.value)}
                          placeholder="e.g. Live Site, Admin Panel"
                          className="w-full bg-[#0C0E14] border border-white/10 p-2.5 text-white text-xs"
                        />
                        <div className="flex flex-wrap gap-1 pt-1">
                          {["Live Site", "Admin Panel", "POS Portal", "Client App"].map((presetLabel) => (
                            <button
                              key={presetLabel}
                              type="button"
                              onClick={() => handleUpdateLiveLink(idx, "label", presetLabel)}
                              className={`text-[9px] px-1.5 py-0.5 rounded transition-colors ${
                                link.label === presetLabel
                                  ? "bg-sky-500/30 text-sky-300 border border-sky-500/50"
                                  : "bg-white/5 text-gray-400 hover:text-white border border-transparent"
                              }`}
                            >
                              {presetLabel}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* URL input */}
                      <div className="w-full sm:flex-1 space-y-1">
                        <label className="text-[10px] uppercase text-gray-400 font-mono block">
                          URL (https://...)
                        </label>
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => handleUpdateLiveLink(idx, "url", e.target.value)}
                          placeholder="https://..."
                          className="w-full bg-[#0C0E14] border border-white/10 p-2.5 text-white text-xs font-mono"
                        />
                      </div>

                      {/* Remove Button */}
                      {formData.liveLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveLiveLink(idx)}
                          className="mt-2 sm:mt-0 px-2.5 py-2 text-rose-400 hover:text-white hover:bg-rose-500/20 border border-rose-500/20 text-xs transition-colors self-end sm:self-center cursor-pointer"
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
              <div>
                <label className="block text-gray-400 uppercase mb-1">
                  Source Code Repository Link (GitHub)
                </label>
                <input
                  type="url"
                  value={formData.codeLink}
                  onChange={(e) => setFormData({ ...formData, codeLink: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-400 uppercase mb-1">Technology Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.techTags}
                  onChange={(e) => setFormData({ ...formData, techTags: e.target.value })}
                  placeholder="React, Next.js, Tailwind CSS"
                  className="w-full bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 uppercase mb-1">Cover Image URL / Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 bg-[#090A0F] border border-white/10 p-3 text-white text-sm"
                  />
                  <label className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white cursor-pointer uppercase text-xs">
                    {uploading ? "Uploading..." : "Upload File"}
                    <input type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-sky-400 cursor-pointer"
                >
                  Save Project & Trigger ISR →
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Project List */
          <div className="space-y-4">
            {loading ? (
              <div className="p-8 text-center text-gray-400 font-mono text-sm">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="p-8 text-center text-gray-400 font-mono text-sm">No projects found in database.</div>
            ) : (
              projects.map((p) => (
                <div
                  key={p._id}
                  className="border border-white/10 bg-[#0C0E14] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 border ${
                          p.status === "live"
                            ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
                            : "text-amber-400 border-amber-400/30 bg-amber-400/10"
                        }`}
                      >
                        {p.status}
                      </span>
                      <h3 className="text-lg font-bold text-white">{p.title}</h3>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 font-light">{p.shortDescription}</p>

                    {/* Quick view of links */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {p.liveLinks && p.liveLinks.length > 0 ? (
                        p.liveLinks.map((l, i) => (
                          <a
                            key={i}
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-mono px-2 py-0.5 border border-sky-500/30 text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 flex items-center gap-1 transition-colors"
                          >
                            <span>{l.label || "Live Demo"}</span>
                            <span>↗</span>
                          </a>
                        ))
                      ) : p.liveLink ? (
                        <a
                          href={p.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono px-2 py-0.5 border border-sky-500/30 text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 flex items-center gap-1 transition-colors"
                        >
                          <span>Live Demo</span>
                          <span>↗</span>
                        </a>
                      ) : null}
                      {p.codeLink && (
                        <a
                          href={p.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono px-2 py-0.5 border border-white/20 text-gray-300 hover:text-white bg-white/5 flex items-center gap-1 transition-colors"
                        >
                          <span>GitHub</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3 py-1.5 border border-white/20 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-3 py-1.5 border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
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
