export default function FeaturedProjects({ projects = [] }) {
  // Status Enforcer: Only live projects with a valid liveLink appear in Featured Projects
  const liveProjects = projects.filter(
    (p) => p.status === "live" && p.liveLink && p.liveLink.trim() !== ""
  );

  const displayProjects = liveProjects.length > 0 ? liveProjects : [
    {
      _id: "01",
      title: "Crafts & Delights",
      shortDescription: "Artisanal E-Commerce & Gift Platform",
      problem:
        "Artisanal storefronts often struggle with sluggish catalog rendering and fragmented checkout paths that cause high bounce rates.",
      roleDecisions:
        "Engineered an optimized React client utilizing modular component architecture, memoized filtering states, and smooth Framer Motion interactions.",
      outcome:
        "Achieved fluid 60fps client navigation and reduced catalog interaction latency by 40% across both desktop and mobile devices.",
      techTags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
      liveLink: "https://crafts-delights.vercel.app",
      codeLink: "https://github.com/MuhammadWaqar7615/",
    },
    {
      _id: "02",
      title: "Retreat Bookings",
      shortDescription: "Hospitality & Scheduling Platform",
      problem:
        "Coordinating multi-property retreat reservations required real-time availability sync and date conflict prevention.",
      roleDecisions:
        "Developed full-stack reservation workflows with Node.js and MongoDB, incorporating robust query validation and clean React date-range state management.",
      outcome:
        "Prevented double-booking race conditions and maintained sub-120ms API response times for property queries.",
      techTags: ["React", "Node.js", "Express", "MongoDB"],
      liveLink: "https://retreat-bookings.vercel.app",
      codeLink: "https://github.com/MuhammadWaqar7615/",
    },
    {
      _id: "03",
      title: "Ecommerce-store",
      shortDescription: "Modern Cloud Retail Experience",
      problem:
        "High inventory catalogs frequently suffer from layout shifts and latency during real-time product search and cart operations.",
      roleDecisions:
        "Implemented Supabase backend-as-a-service with optimistic UI updates in React, decoupled cart persistence, and debounced database searches.",
      outcome:
        "Eliminated layout shifts with zero cumulative layout shift (CLS < 0.02) and secured instant client-side cart transitions.",
      techTags: ["React", "Supabase", "Tailwind CSS"],
      liveLink: "https://irfan-alyy.github.io/Ecommerce-Store/",
      codeLink: "https://github.com/MuhammadWaqar7615/",
    },
  ];

  return (
    <section
      id="featured-work"
      aria-label="Selected Featured Projects"
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-6 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
              Curated Production Work
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
              Featured Projects
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
            [ {String(displayProjects.length).padStart(2, "0")} SELECTED DEPLOYMENTS // LIVE ONLY ]
          </p>
        </div>

        {/* Project Items List — Editorial Asymmetric Layout */}
        <div className="space-y-16">
          {displayProjects.map((project, index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <article
                key={project._id || project.title}
                className="group relative border border-white/[0.08] hover:border-white/20 bg-cardBg p-6 sm:p-10 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Number & Category */}
                  <div className="lg:col-span-3 flex flex-col justify-between h-full">
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-gray-500 group-hover:text-accent transition-colors">
                      {num}
                    </span>
                    <div className="mt-4 lg:mt-12">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400">
                        Domain
                      </span>
                      <p className="text-sm font-medium text-gray-200 mt-1">
                        {project.shortDescription || "Full-Stack Application"}
                      </p>
                    </div>
                  </div>

                  {/* Main Content: Title, Problem, Solution/Decisions, Outcome */}
                  <div className="lg:col-span-6 space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {project.title}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-300 leading-relaxed font-light">
                      <p>
                        <strong className="text-white font-medium">Problem:</strong>{" "}
                        {project.problem}
                      </p>
                      <p>
                        <strong className="text-white font-medium">Decisions:</strong>{" "}
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
                            className="text-[10px] font-mono uppercase tracking-wider text-gray-300 bg-white/[0.04] border border-white/10 px-2.5 py-1"
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
                        className="w-full sm:w-auto lg:w-full text-center px-5 py-2.5 bg-white text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-sky-400 transition-colors"
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto lg:w-full text-center px-5 py-2.5 border border-white/20 text-gray-300 text-xs font-mono uppercase tracking-wider hover:text-white hover:border-white transition-colors"
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

