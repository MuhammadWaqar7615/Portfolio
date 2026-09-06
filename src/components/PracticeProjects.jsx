export default function PracticeProjects({ projects = [], content }) {
  const sectionHeaders = content?.sectionHeaders || {};
  const tagline = sectionHeaders.practiceTagline !== undefined ? sectionHeaders.practiceTagline : "Secondary Showcase";
  const heading = sectionHeaders.practiceHeading !== undefined ? sectionHeaders.practiceHeading : "Practice & Lab Work";
  const fallbackItems = [
    {
      title: "Ecommerce-store",
      type: "Modern Retail Application",
      status: "Live & Deployed",
      statusColor: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
      description:
        "Modern cloud retail interface featuring Supabase backend integration, dynamic cart state management, and real-time catalog search.",
      techTags: ["React", "Supabase", "Tailwind CSS"],
      liveLink: "https://irfan-alyy.github.io/Ecommerce-Store/",
      codeLink: "https://github.com/MuhammadWaqar7615/",
    },
    {
      title: "WorkNexus",
      type: "Enterprise Resource Management",
      status: "In Progress",
      statusColor: "text-amber-400 border-amber-400/20 bg-amber-400/5",
      description:
        "Comprehensive resource management platform optimizing internal organizational coordination, inventory tracking, and employee workflows.",
      techTags: ["React", "Express", "PostgreSQL"],
      liveLink: null,
      codeLink: "https://github.com/MuhammadWaqar7615/",
    },
  ];

  const itemsToDisplay = projects.length > 0 ? projects.slice(2) : fallbackItems;

  return (
    <section
      id="practice-lab"
      aria-label="Practice and lab projects"
      data-editable="background"
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      <div className="editorial-container">
        {(tagline?.trim() || heading?.trim()) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-6 gap-4">
            <div>
              {tagline?.trim() ? (
                <span
                  data-editable="content-sectionHeaders-practiceTagline"
                  className="text-xs font-mono uppercase tracking-[0.2em] text-accent cursor-pointer"
                  title="Click to edit practice tagline"
                >
                  {tagline}
                </span>
              ) : null}
              {heading?.trim() ? (
                <h2
                  data-editable="content-sectionHeaders-practiceHeading"
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-heading)] mt-2 cursor-pointer"
                  style={{ fontFamily: "var(--font-heading)" }}
                  title="Click to edit practice heading"
                >
                  {heading}
                </h2>
              ) : null}
            </div>
            <p className="text-xs font-mono uppercase tracking-widest opacity-60">
              [ EXPERIMENTS · CLONES · IN-PROGRESS ]
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {itemsToDisplay.map((item) => (
            <div
              key={item.title}
              data-editable="radius"
              className="border border-white/[0.06] bg-cardBg p-6 flex flex-col justify-between hover:border-white/15 transition-colors"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider opacity-60">
                    {item.type || "Application"}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border rounded-sm ${item.statusColor || "text-emerald-400 border-emerald-400/20 bg-emerald-400/5"}`}
                  >
                    {item.status || "Deployed"}
                  </span>
                </div>

                <h3
                  data-editable="headingColor"
                  className="text-xl font-bold text-[var(--color-heading)] mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </h3>
                <p
                  data-editable="text"
                  className="text-xs text-[var(--color-text)] opacity-80 leading-relaxed font-light mb-4"
                >
                  {item.description}
                </p>

                {item.techTags && item.techTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.techTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono opacity-70 bg-white/[0.03] border border-white/5 px-2 py-0.5"
                        style={{ borderRadius: "calc(var(--radius-card) / 2)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06] text-xs font-mono">
                {item.liveLink ? (
                  <a
                    href={item.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-editable="accent"
                    className="text-accent hover:opacity-80 transition-opacity"
                  >
                    Live Preview ↗
                  </a>
                ) : (
                  <span className="opacity-50">Preview Offline</span>
                )}
                {item.codeLink && (
                  <a
                    href={item.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity ml-auto"
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
