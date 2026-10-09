"use client";

import { useState } from "react";
import CyberTitle from "./CyberTitle";

export default function FeaturedProjects({ projects = [], content, presetId }) {
  const sectionHeaders = content?.sectionHeaders || {};
  const isPreset2 = presetId === "preset-2";
  const [showAll, setShowAll] = useState(false);

  const tagline = sectionHeaders.projectsTagline !== undefined ? sectionHeaders.projectsTagline : (isPreset2 ? "MY PROJECTS ────" : "Curated Production Work");
  const heading = sectionHeaders.projectsHeading !== undefined ? sectionHeaders.projectsHeading : (isPreset2 ? "Some Things I've Built" : "Featured Projects");

  // Helper to resolve all live links for a project
  const getProjectLiveLinks = (project) => {
    if (Array.isArray(project.liveLinks) && project.liveLinks.length > 0) {
      return project.liveLinks.filter((l) => Boolean(l && l.url));
    }
    if (project.liveLink) {
      return [{ label: "Live Site Demo", url: project.liveLink }];
    }
    return [];
  };

  // Helper to format project titles to clean title case
  const formatTitle = (title) => {
    if (!title) return "";
    const lower = title.toLowerCase();
    if (lower.includes("erp") || lower.includes("super store")) return "Super Store ERP / POS";
    if (lower.includes("condice") || lower.includes("sconto")) return "CodiceSconto Clone";
    if (lower.includes("craft") || lower.includes("delight")) return "Craft & Lights E-commerce";
    if (lower.includes("retreat")) return "Retreat Bookings";
    return title;
  };

  // Helper to resolve the topic-relevant image
  const getProjectImage = (project, idx) => {
    if (project.coverImage) return project.coverImage;
    if (project.image) return project.image;
    const title = (project.title || "").toLowerCase();
    if (title.includes("erp") || title.includes("super store") || title.includes("pos")) return "/project_superstore_erp.jpg";
    if (title.includes("craft") || title.includes("light") || title.includes("delight") || title.includes("ecommerce")) return "/project_craft_lights.jpg";
    if (title.includes("sconto") || title.includes("coupon") || title.includes("condice")) return "/project_codicesconto.jpg";
    if (title.includes("retreat") || title.includes("booking")) return "/project_retreat_bookings.jpg";

    const fallbackList = [
      "/project_superstore_erp.jpg",
      "/project_craft_lights.jpg",
      "/project_codicesconto.jpg",
      "/project_retreat_bookings.jpg",
    ];
    return fallbackList[idx % fallbackList.length];
  };

  // Editorial Preset 2 display projects (Matches ref img1)
  const preset2Projects = [
    {
      _id: "p2-1",
      title: "Super Store ERP / POS",
      shortDescription: "A complete supermarket management system with POS, inventory, sales, purchases and more.",
      techTags: ["React", "Node.js", "MongoDB", "Stripe"],
      coverImage: "/project_superstore_erp.jpg",
      image: "/project_superstore_erp.jpg",
      liveLink: "https://super-store-portal.vercel.app/",
      liveLinks: [
        { label: "Live Site", url: "https://super-store-portal.vercel.app/" },
        { label: "Admin Panel", url: "https://super-store-portal.vercel.app/admin" },
      ],
      codeLink: "https://github.com/MuhammadWaqar7615/super_store",
    },
    {
      _id: "p2-2",
      title: "Craft & Lights E-commerce",
      shortDescription: "A modern e-commerce store with smooth UI and secure payments.",
      techTags: ["Next.js", "React", "Tailwind CSS"],
      coverImage: "/project_craft_lights.jpg",
      image: "/project_craft_lights.jpg",
      liveLink: "https://crafts-delights.vercel.app",
      liveLinks: [{ label: "Live Site", url: "https://crafts-delights.vercel.app" }],
      codeLink: "https://github.com/MuhammadWaqar7615/",
    },
    {
      _id: "p2-3",
      title: "CodiceSconto Clone",
      shortDescription: "A frontend clone of a popular coupon website built with modern technologies.",
      techTags: ["Next.js", "React", "Tailwind CSS"],
      coverImage: "/project_codicesconto.jpg",
      image: "/project_codicesconto.jpg",
      liveLink: "https://condice-sconto-clone.vercel.app/",
      liveLinks: [{ label: "Live Site", url: "https://condice-sconto-clone.vercel.app/" }],
      codeLink: "https://github.com/MuhammadWaqar7615/condiceSconto-site-clone",
    },
  ];

  const allAvailableProjects = projects && projects.length >= 3 ? projects : preset2Projects;
  // Graceful fallback during offline development
  const displayProjects = isPreset2
    ? (showAll ? allAvailableProjects : allAvailableProjects.slice(0, 3))
    : (projects.length > 0 ? projects : [
      {
        _id: "demo-1",
        title: "Crafts & Delights",
        shortDescription: "Artisanal E-Commerce & Gift Platform",
        problem: "Sluggish client catalog rendering and fragmented checkout workflows causing dropoffs.",
        roleDecisions: "Engineered a modular React client architecture with memoized filter pipelines and Framer Motion transitions.",
        outcome: "60fps interactions, reduced latency by 40%, zero layout shift.",
        techTags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
        liveLink: "https://crafts-delights.vercel.app",
        codeLink: "https://github.com/MuhammadWaqar7615/",
      },
      {
        _id: "demo-2",
        title: "Retreat Bookings",
        shortDescription: "Hospitality & Scheduling Platform",
        problem: "Coordinating multi-property retreat reservations with race conditions during peak bookings.",
        roleDecisions: "Developed atomic MongoDB update queries and clean date-range state validation.",
        outcome: "Eliminated double-bookings, sustained sub-120ms query response times.",
        techTags: ["React", "Node.js", "Express", "MongoDB"],
        liveLink: "https://retreat-bookings.vercel.app",
        codeLink: "https://github.com/MuhammadWaqar7615/",
      },
    ]);

  // Preset 2 Editorial Grid Layout (Matches ref img1)
  if (isPreset2) {
    return (
      <section
        id="featured-work"
        aria-label="Selected Projects"
        className="py-20 sm:py-24 bg-[#F2EEE5] text-[#191A17] border-b border-[#D3CEC2]"
      >
        <div className="editorial-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#D3CEC2] pb-5 gap-4">
            <div>
              {tagline?.trim() && (
                <span
                  data-editable="content-sectionHeaders-projectsTagline"
                  className="text-xs font-semibold uppercase tracking-[3px] text-[#B19B7D] block mb-2 cursor-pointer"
                  title="Click to edit projects tagline"
                >
                  {tagline}
                </span>
              )}
              {heading?.trim() && (
                <h2
                  data-editable="content-sectionHeaders-projectsHeading"
                  className="text-3xl sm:text-4xl font-normal tracking-tight text-[#191A17] cursor-pointer"
                  style={{ fontFamily: "var(--font-heading)" }}
                  title="Click to edit projects heading"
                >
                  {heading}
                </h2>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="text-xs font-semibold text-[#191A17] hover:text-[#69745A] bg-[#ECE7DC] hover:bg-[#E0DACB] border border-[#D3CEC2] px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <span>{showAll ? "Show Top 3 Only ↑" : `View All Projects (${allAvailableProjects.length}) →`}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayProjects.map((project, idx) => (
              <div
                key={project._id || idx}
                className="bg-[#FFFFFF] border border-[#D3CEC2] rounded-[10px] overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow group"
              >
                {/* 16:9 Thumbnail Image */}
                <div className="relative aspect-[16/9] bg-[#ECE7DC] overflow-hidden border-b border-[#D3CEC2]">
                  <img
                    src={getProjectImage(project, idx)}
                    alt={formatTitle(project.title)}
                    className="w-full h-full object-cover filter saturate-[0.98] contrast-[1.02] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-base font-bold text-[#191A17] mb-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {formatTitle(project.title)}
                    </h3>
                    <p className="text-xs text-[#68675F] leading-relaxed line-clamp-3">
                      {project.shortDescription || project.problem || "Full-stack web application engineered for high-intent workflows."}
                    </p>

                    {/* Dot-separated tech labels */}
                    <div className="mt-3 text-[10px] font-medium text-[#77766D] tracking-wider uppercase truncate">
                      {(project.techTags && project.techTags.length > 0
                        ? project.techTags.slice(0, 4).join(" · ")
                        : "React · Node.js · MongoDB · Stripe"
                      )}
                    </div>
                  </div>

                  {/* Action Buttons: Live Site Demo(s) & Dedicated GitHub Button */}
                  <div className="pt-4 border-t border-[#D3CEC2]/60 mt-4 flex flex-wrap items-center gap-2">
                    {/* Live Demo Buttons */}
                    {getProjectLiveLinks(project).map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200 shadow-sm cursor-pointer active:scale-95 ${lIdx === 0
                            ? "bg-[#191A17] text-white hover:bg-[#69745A]"
                            : "bg-[#ECE7DC] text-[#191A17] border border-[#D3CEC2] hover:bg-[#E0DACB] hover:border-[#191A17]"
                          }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${lIdx === 0 ? "bg-emerald-400" : "bg-[#B19B7D]"}`}></span>
                        <span>{link.label || (lIdx === 0 ? "Live Site Demo" : "Live Demo")}</span>
                        <span className="text-[10px] opacity-80">↗</span>
                      </a>
                    ))}

                    {/* Dedicated GitHub Button */}
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#FFFFFF] border border-[#D3CEC2] text-[#191A17] hover:border-[#191A17] hover:bg-[#F2EEE5] transition-all duration-200 shadow-sm cursor-pointer active:scale-95"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span>GitHub</span>
                        <span className="text-[10px] opacity-70">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="featured-work"
      aria-label="Selected Featured Projects"
      data-editable="background"
      className="py-24 sm:py-32 border-b border-white/[0.08] relative overflow-hidden"
    >
      <div className="editorial-container relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
          {/* Left: Sticky Title */}
          <div className="lg:w-5/12 lg:sticky lg:top-28">
            <CyberTitle
              title="PROJECTS"
              subtext="Production web systems and applications built with modern stacks."
            />
            <div className="hidden lg:block p-5 rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-md space-y-3 mr-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1fc3ff] font-opensans block">
                ENGINEERING METRICS
              </span>
              <p className="text-xs text-slate-300 font-opensans leading-relaxed">
                Every project is engineered with strict semantic markup, sub-second interaction latency, responsive fluidity, and modular component hierarchy.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-opensans">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>{displayProjects.length} Verified Production Builds</span>
              </div>
            </div>
          </div>

          {/* Right: Grid of Cyber Project Cards */}
          <div className="lg:w-7/12 space-y-8">
            {displayProjects.map((project, idx) => {
              const liveLinks = getProjectLiveLinks(project);
              return (
                <div
                  key={project._id || idx}
                  className="cyber-glow-card overflow-hidden group transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Thumbnail / Image Banner */}
                  <div className="relative aspect-[16/9] w-full bg-black/60 overflow-hidden border-b border-white/[0.08]">
                    <img
                      src={getProjectImage(project, idx)}
                      alt={formatTitle(project.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f19] via-transparent to-transparent opacity-80" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black/70 border border-[#1fc3ff]/50 text-[#1fc3ff] backdrop-blur-md font-opensans">
                      Project 0{idx + 1}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-fugaz tracking-wide group-hover:text-[#1fc3ff] transition-colors">
                      {formatTitle(project.title)}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 font-opensans leading-relaxed">
                      {project.shortDescription || project.problem || "High-intent full-stack application built with modern architecture."}
                    </p>

                    {/* Tech Badges */}
                    {project.techTags && project.techTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.techTags.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-semibold text-slate-200 bg-[#1fc3ff]/[0.08] border border-[#1fc3ff]/30 px-3 py-1 rounded-full font-opensans"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
                      {liveLinks.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cyber-floating-btn cyber-floating-btn-solid text-xs py-2 px-4"
                        >
                          <span>{link.label || "Live Demo"}</span>
                          <span>↗</span>
                        </a>
                      ))}
                      {project.codeLink && (
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cyber-floating-btn text-xs py-2 px-4"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          <span>GitHub</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
