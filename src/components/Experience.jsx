export default function Experience({ experiences = [], content }) {
  const sectionHeaders = content?.sectionHeaders || {};
  const tagline = sectionHeaders.experienceTagline !== undefined ? sectionHeaders.experienceTagline : "Work History";
  const heading = sectionHeaders.experienceHeading !== undefined ? sectionHeaders.experienceHeading : "Professional Experience";

  const defaultExperiences = [
    {
      _id: "exp-1",
      duration: "2024 — Present",
      role: "Frontend Developer",
      company: "Bloggers Brackets",
      description:
        "Spearheading frontend development initiatives across multiple client portals. Architecting modular UI component systems using React, Tailwind CSS, and Framer Motion with rigorous cross-browser compatibility. Delivered 6+ production web applications with 99.8% crash-free sessions.",
    },
    {
      _id: "exp-2",
      duration: "2023",
      role: "Web Developer Intern",
      company: "Bloggers Brackets",
      description:
        "Engineered responsive interface modules, translated Figma wireframes into production React components, and handled client-side state management workflows. Assisted in reducing initial script asset footprints through code splitting.",
    },
  ];

  const listToDisplay = experiences.length > 0 ? experiences : defaultExperiences;

  return (
    <section
      id="experience"
      aria-label="Professional Experience"
      data-editable="background"
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      <div className="editorial-container">
        {(tagline?.trim() || heading?.trim()) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-6 gap-4">
            <div>
              {tagline?.trim() ? (
                <span
                  data-editable="content-sectionHeaders-experienceTagline"
                  className="text-xs font-mono uppercase tracking-[0.2em] text-accent cursor-pointer"
                  title="Click to edit experience tagline"
                >
                  {tagline}
                </span>
              ) : null}
              {heading?.trim() ? (
                <h2
                  data-editable="content-sectionHeaders-experienceHeading"
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-heading)] mt-2 cursor-pointer"
                  style={{ fontFamily: "var(--font-heading)" }}
                  title="Click to edit experience heading"
                >
                  {heading}
                </h2>
              ) : null}
            </div>
            <p className="text-xs font-mono uppercase tracking-widest opacity-60">
              [ 2+ YEARS PRODUCTION DELIVERY ]
            </p>
          </div>
        )}

        <div className="space-y-12">
          {listToDisplay.map((exp) => (
            <div
              key={exp._id || exp.role}
              data-editable="radius"
              className="border border-white/[0.08] bg-cardBg p-6 sm:p-10 transition-all duration-300 hover:border-white/20"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-3">
                  <span
                    data-editable="accent"
                    className="text-xs font-mono uppercase tracking-widest text-accent"
                  >
                    {exp.duration}
                  </span>
                  <p className="text-xs font-mono opacity-60 mt-1">
                    On-Site Delivery
                  </p>
                </div>

                <div className="lg:col-span-9 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3
                      data-editable="headingColor"
                      className="text-2xl font-bold text-[var(--color-heading)]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {exp.role}
                    </h3>
                    <span className="text-sm font-mono opacity-70">
                      @ {exp.company}
                    </span>
                  </div>

                  <p
                    data-editable="text"
                    className="text-sm text-[var(--color-text)] opacity-90 leading-relaxed font-light"
                  >
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
