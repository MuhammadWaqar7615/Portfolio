"use client";

import CyberTitle from "./CyberTitle";

export default function FeaturedProjects({ projects = [], content, presetId }) {
  const sectionHeaders = content?.sectionHeaders || {};
  const isPreset2 = presetId === "preset-2";
  const showAll = false;

  const tagline = sectionHeaders.projectsTagline !== undefined ? sectionHeaders.projectsTagline : (isPreset2 ? "Projects" : "Curated Production Work");
  const heading = sectionHeaders.projectsHeading !== undefined ? sectionHeaders.projectsHeading : (isPreset2 ? "Some of the things I've built" : "Featured Projects");

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
  // Pixel-by-pixel Abhay Rana Bento Projects Grid for Preset 2
  if (isPreset2) {
    return (
      <section
        id="projects"
        aria-label="Selected Projects"
        className="py-20 md:py-28 px-4 md:px-6 relative z-10"
      >
        <div className="mx-auto max-w-6xl">
          {/* Section Heading with red dot */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#fafafa]">
              {tagline.replace(" ────", "")}
              <span className="text-red-500">.</span>
            </h2>
            <p className="mt-3 text-lg text-[#a1a1aa]">{heading}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 1. Featured Hero Bento Card (Spans 2 columns) */}
            <div className="bento-card md:col-span-2 p-6 md:p-8 flex flex-col justify-between group hover:border-red-500/60 transition-all duration-300">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-mono font-semibold tracking-wider text-red-400 uppercase">
                      Featured Project
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://super-store-portal.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-all shadow-md shadow-red-500/20 cursor-pointer"
                    >
                      <span>Live Demo</span>
                      <span className="text-[11px]">↗</span>
                    </a>
                    <a
                      href="https://github.com/MuhammadWaqar7615/super_store"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/10 hover:border-white/20 text-[#a1a1aa] hover:text-[#fafafa] text-xs font-medium transition-all cursor-pointer"
                    >
                      <span>GitHub</span>
                      <span className="text-[11px]">↗</span>
                    </a>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#fafafa] mb-2 group-hover:text-red-400 transition-colors">
                  Super Store ERP / POS
                </h3>
                <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6 font-light">
                  A complete supermarket management system with point-of-sale checkout, inventory tracking, sales reporting, purchase management, and secure cashier session controls.
                </p>

                {/* 4-Cell Micro-Feature Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="glass rounded-xl p-3 border border-white/[0.06] flex items-start gap-2.5">
                    <span className="text-red-400 text-base">⚡</span>
                    <div>
                      <p className="text-xs font-semibold text-[#fafafa]">Sub-100ms POS</p>
                      <p className="text-[11px] text-[#a1a1aa]/70 leading-tight mt-0.5">Instant barcode lookup & zero-latency checkout</p>
                    </div>
                  </div>
                  <div className="glass rounded-xl p-3 border border-white/[0.06] flex items-start gap-2.5">
                    <span className="text-red-400 text-base">📦</span>
                    <div>
                      <p className="text-xs font-semibold text-[#fafafa]">Live Stock Engine</p>
                      <p className="text-[11px] text-[#a1a1aa]/70 leading-tight mt-0.5">Real-time ledger & low-inventory threshold alerts</p>
                    </div>
                  </div>
                  <div className="glass rounded-xl p-3 border border-white/[0.06] flex items-start gap-2.5">
                    <span className="text-red-400 text-base">📄</span>
                    <div>
                      <p className="text-xs font-semibold text-[#fafafa]">Instant PDF Export</p>
                      <p className="text-[11px] text-[#a1a1aa]/70 leading-tight mt-0.5">Thermal print receipt generation & tax invoices</p>
                    </div>
                  </div>
                  <div className="glass rounded-xl p-3 border border-white/[0.06] flex items-start gap-2.5">
                    <span className="text-red-400 text-base">🛡️</span>
                    <div>
                      <p className="text-xs font-semibold text-[#fafafa]">RBAC Security</p>
                      <p className="text-[11px] text-[#a1a1aa]/70 leading-tight mt-0.5">JWT permission hierarchy & cashier audit trails</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech stack tags */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.06]">
                {["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "REST API"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/10 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Crafts & Delights E-Commerce */}
            <div className="bento-card p-6 flex flex-col justify-between group hover:border-red-500/60 hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-medium text-zinc-400">E-Commerce</span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://crafts-delights.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-red-400 hover:text-red-300 font-semibold"
                    >
                      Demo ↗
                    </a>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#fafafa] mb-2 group-hover:text-red-400 transition-colors">
                  Crafts & Delights Store
                </h3>
                <p className="text-[#a1a1aa] text-xs leading-relaxed mb-4 font-light">
                  Artisanal e-commerce shopping experience with modular React architecture, client-side state caching, and responsive product catalog.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/[0.06]">
                {["Next.js", "React", "Tailwind CSS", "Vercel"].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/10 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Retreat Bookings */}
            <div className="bento-card p-6 flex flex-col justify-between group hover:border-red-500/60 hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-medium text-zinc-400">Full-Stack SaaS</span>
                  <a
                    href="https://retreat-bookings.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-red-400 hover:text-red-300 font-semibold"
                  >
                    Demo ↗
                  </a>
                </div>

                <h3 className="text-lg font-bold text-[#fafafa] mb-2 group-hover:text-red-400 transition-colors">
                  Retreat Bookings
                </h3>
                <p className="text-[#a1a1aa] text-xs leading-relaxed mb-4 font-light">
                  Hospitality reservation system with date collision locks, atomic MongoDB queries, and sub-120ms response times.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/[0.06]">
                {["Node.js", "Express", "MongoDB", "React"].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/10 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. CodiceSconto Clone */}
            <div className="bento-card p-6 flex flex-col justify-between group hover:border-red-500/60 hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-medium text-zinc-400">Coupon Aggregator</span>
                  <a
                    href="https://condice-sconto-clone.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-red-400 hover:text-red-300 font-semibold"
                  >
                    Demo ↗
                  </a>
                </div>

                <h3 className="text-lg font-bold text-[#fafafa] mb-2 group-hover:text-red-400 transition-colors">
                  CodiceSconto Platform
                </h3>
                <p className="text-[#a1a1aa] text-xs leading-relaxed mb-4 font-light">
                  High-traffic coupon and deals aggregator with instant category filtering, modal discount activations, and SEO metadata.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/[0.06]">
                {["Next.js", "React", "Tailwind CSS"].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/10 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Coming Soon Bento Card (Muted abhayrana style) */}
            <div className="bento-card p-6 flex flex-col justify-between opacity-45 cursor-not-allowed border-dashed border-white/20 select-none">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-medium text-zinc-500">In Development</span>
                  <span className="text-xs text-zinc-500 font-mono">Coming Soon</span>
                </div>

                <h3 className="text-lg font-bold text-[#fafafa] mb-2">
                  Next Gen SaaS Tool
                </h3>
                <p className="text-[#a1a1aa] text-xs leading-relaxed mb-4 font-light">
                  An upcoming AI-powered productivity cloud platform currently in private engineering preview.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/[0.06]">
                {["Next.js", "AI / LLM", "TypeScript", "???"].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/10 text-zinc-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
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
      className="py-24 sm:py-32 border-b border-white/[0.08] relative"
    >
      <div className="editorial-container relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
          {/* Left: Sticky Title */}
          <div className="lg:w-5/12 lg:sticky lg:top-28 lg:self-start">
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
