export default function FeaturedProjects({ projects = [], content, presetId }) {
  const sectionHeaders = content?.sectionHeaders || {};
  const isPreset2 = presetId === "preset-2";
  const tagline = sectionHeaders.projectsTagline !== undefined ? sectionHeaders.projectsTagline : (isPreset2 ? "MY PROJECTS ────" : "Curated Production Work");
  const heading = sectionHeaders.projectsHeading !== undefined ? sectionHeaders.projectsHeading : (isPreset2 ? "Some Things I've Built" : "Featured Projects");

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
    },
    {
      _id: "p2-2",
      title: "Craft & Lights E-commerce",
      shortDescription: "A modern e-commerce store with smooth UI and secure payments.",
      techTags: ["Next.js", "React", "Tailwind CSS"],
      coverImage: "/project_craft_lights.jpg",
      image: "/project_craft_lights.jpg",
      liveLink: "https://crafts-delights.vercel.app",
    },
    {
      _id: "p2-3",
      title: "CodiceSconto Clone",
      shortDescription: "A frontend clone of a popular coupon website built with modern technologies.",
      techTags: ["Next.js", "React", "Tailwind CSS"],
      coverImage: "/project_codicesconto.jpg",
      image: "/project_codicesconto.jpg",
      liveLink: "https://condice-sconto-clone.vercel.app/",
    },
  ];

  // Graceful fallback during offline development
  const displayProjects = isPreset2
    ? (projects.length >= 3 ? projects.slice(0, 3) : preset2Projects)
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
            <a
              href="#featured-work"
              className="text-xs font-medium text-[#191A17] hover:text-[#69745A] flex items-center gap-1 transition-colors cursor-pointer"
            >
              View All Projects →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayProjects.map((project, idx) => (
              <div
                key={project._id || idx}
                className="bg-[#FFFFFF] border border-[#D3CEC2] rounded-[10px] overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
              >
                {/* 16:9 Thumbnail Image */}
                <div className="relative aspect-[16/9] bg-[#ECE7DC] overflow-hidden border-b border-[#D3CEC2]">
                  <img
                    src={getProjectImage(project, idx)}
                    alt={formatTitle(project.title)}
                    className="w-full h-full object-cover filter saturate-[0.98] contrast-[1.02] hover:scale-105 transition-transform duration-500"
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
                  </div>

                  {/* Dot-separated tech labels */}
                  <div className="pt-4 border-t border-[#D3CEC2]/60 mt-4 text-[11px] font-medium text-[#77766D] tracking-wider uppercase">
                    {(project.techTags && project.techTags.length > 0
                      ? project.techTags.join(" · ")
                      : "React · Node.js · MongoDB · Stripe"
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
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      <div className="editorial-container">
        {/* Section Header */}
        {(tagline?.trim() || heading?.trim()) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-6 gap-4">
            <div>
              {tagline?.trim() ? (
                <span
                  data-editable="content-sectionHeaders-projectsTagline"
                  className="text-xs font-mono uppercase tracking-[0.2em] text-accent cursor-pointer"
                  title="Click to edit projects tagline"
                >
                  {tagline}
                </span>
              ) : null}
              {heading?.trim() ? (
                <h2
                  data-editable="content-sectionHeaders-projectsHeading"
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-heading)] mt-2 cursor-pointer"
                  style={{ fontFamily: "var(--font-heading)" }}
                  title="Click to edit projects heading"
                >
                  {heading}
                </h2>
              ) : null}
            </div>
            <p className="text-xs font-mono uppercase tracking-widest opacity-60">
              [ {String(displayProjects.length).padStart(2, "0")} SELECTED DEPLOYMENTS // LIVE ONLY ]
            </p>
          </div>
        )}

        {/* Project Items List — Editorial Asymmetric Layout */}
        <div className="space-y-16">
          {displayProjects.map((project, index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <article
                key={project._id || project.title}
                data-editable="radius"
                className="group relative border border-white/[0.08] hover:border-white/20 bg-cardBg p-6 sm:p-10 transition-all duration-300"
                style={{ borderRadius: "var(--radius-card)" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Number & Category */}
                  <div className="lg:col-span-3 flex flex-col justify-between h-full">
                    <span className="text-3xl sm:text-4xl font-mono font-bold opacity-40 group-hover:text-accent transition-colors">
                      {num}
                    </span>
                    <div className="mt-4 lg:mt-12">
                      <span className="text-[11px] font-mono uppercase tracking-widest opacity-60">
                        Domain
                      </span>
                      <p className="text-sm font-medium text-[var(--color-text)] mt-1">
                        {project.shortDescription || "Full-Stack Application"}
                      </p>
                    </div>
                  </div>

                  {/* Main Content: Title, Problem, Solution/Decisions, Outcome */}
                  <div className="lg:col-span-6 space-y-4">
                    <h3
                      data-editable="headingColor"
                      className="text-2xl sm:text-3xl font-bold text-[var(--color-heading)] tracking-tight"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {project.title}
                    </h3>

                    <div
                      data-editable="text"
                      className="space-y-2 text-sm text-[var(--color-text)] leading-relaxed font-light opacity-90"
                    >
                      <p>
                        <strong className="font-medium opacity-100">Problem:</strong>{" "}
                        {project.problem}
                      </p>
                      <p>
                        <strong className="font-medium opacity-100">Decisions:</strong>{" "}
                        {project.roleDecisions}
                      </p>
                      {project.outcome && (
                        <p>
                          <strong className="text-accent font-medium">Outcome:</strong>{" "}
                          {project.outcome}
                        </p>
                      )}
                    </div>

                    {/* Tech Tags */}
                    {project.techTags && project.techTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.techTags.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-text)] opacity-80 bg-white/[0.04] border border-white/10 px-2.5 py-1"
                            style={{ borderRadius: "calc(var(--radius-card) / 2)" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions: Demo & Code */}
                  <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end lg:justify-start pt-2">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-editable="accent"
                        className="w-full sm:w-auto lg:w-full text-center px-5 py-2.5 bg-accent text-background text-xs font-mono font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                        style={{ borderRadius: "var(--radius-btn, var(--radius-card))" }}
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto lg:w-full text-center px-5 py-2.5 border border-white/20 text-[var(--color-text)] text-xs font-mono uppercase tracking-wider hover:border-white transition-colors"
                        style={{ borderRadius: "var(--radius-btn, var(--radius-card))" }}
                      >
                        Source Code ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
