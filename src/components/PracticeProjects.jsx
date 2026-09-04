export default function PracticeProjects() {
  const practiceItems = [
    {
      title: "WorkNexus",
      type: "Enterprise Resource Management",
      status: "Awaiting Production Deployment",
      statusColor: "text-amber-400 border-amber-400/20 bg-amber-400/5",
      description:
        "Comprehensive resource management platform optimizing internal organizational coordination, inventory tracking, and employee workflows.",
      techTags: ["React", "Express", "PostgreSQL"],
      codeLink: "https://github.com/MuhammadWaqar7615/",
      liveLink: null,
    },
    {
      title: "Instagram UI Architecture",
      type: "Interface Reproduction",
      status: "Archived Practice",
      statusColor: "text-gray-400 border-gray-400/20 bg-gray-400/5",
      description:
        "High-fidelity recreation of authentication flows and reactive layout patterns studying mobile-first responsive mechanics.",
      techTags: ["HTML5", "CSS3", "JavaScript"],
      codeLink: "https://github.com/MuhammadWaqar7615/instagram-clone",
      liveLink: "https://muhammadwaqar7615.github.io/instagram-clone",
    },
    {
      title: "Gmail Workspace Clone",
      type: "Layout Reproduction",
      status: "Archived Practice",
      statusColor: "text-gray-400 border-gray-400/20 bg-gray-400/5",
      description:
        "Detailed reproduction of the desktop email client layout examining multi-column viewport sizing and CSS positioning constraints.",
      techTags: ["HTML5", "CSS3"],
      codeLink: "https://github.com/MuhammadWaqar7615/Gmail_Clone",
      liveLink: "https://muhammadwaqar7615.github.io/Gmail_Clone/",
    },
    {
      title: "Bakery Storefront",
      type: "Catalog Template",
      status: "Archived Practice",
      statusColor: "text-gray-400 border-gray-400/20 bg-gray-400/5",
      description:
        "Responsive confectionery showcase demonstrating modular card components, CSS grid layouts, and clean typographic hierarchies.",
      techTags: ["HTML5", "CSS3", "JavaScript"],
      codeLink: "https://github.com/MuhammadWaqar7615/",
      liveLink: null,
    },
  ];

  return (
    <section
      id="practice-lab"
      aria-label="Practice projects and lab experiments"
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      <div className="editorial-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-6 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400">
              Secondary Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              Practice & Lab Work
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
            [ EXPERIMENTS · CLONES · IN-PROGRESS ]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practiceItems.map((item) => (
            <div
              key={item.title}
              className="border border-white/[0.06] bg-[#090A0F] p-6 flex flex-col justify-between hover:border-white/15 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                    {item.type}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border rounded-sm ${item.statusColor}`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.techTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-gray-400 bg-white/[0.03] border border-white/5 px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06] text-xs font-mono">
                {item.liveLink ? (
                  <a
                    href={item.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    Live Preview ↗
                  </a>
                ) : (
                  <span className="text-gray-400">Preview Offline</span>
                )}
                {item.codeLink && (
                  <a
                    href={item.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors ml-auto"
                  >
                    Source Code ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
