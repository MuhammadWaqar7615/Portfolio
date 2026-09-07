export default function Experience({ experiences = [], content, presetId }) {
  const sectionHeaders = content?.sectionHeaders || {};
  const isPreset2 = presetId === "preset-2";

  const tagline = sectionHeaders.experienceTagline !== undefined
    ? sectionHeaders.experienceTagline
    : (isPreset2 ? "CAREER PATH ────" : "Work History");

  const heading = sectionHeaders.experienceHeading !== undefined
    ? sectionHeaders.experienceHeading
    : "Professional Experience";

  const defaultExperiences = [
    {
      _id: "exp-1",
      duration: "2025 — 2026",
      role: "Frontend Developer",
      company: "Bloggers Brackets",
      description:
        "Spearheading frontend development initiatives across multiple client portals. Architecting modular UI component systems using React, Tailwind CSS, and Framer Motion with rigorous cross-browser compatibility. Delivered 6+ production web applications with 99.8% crash-free sessions.",
    },
    {
      _id: "exp-2",
      duration: "2025",
      role: "Web Developer Intern",
      company: "Bloggers Brackets",
      description:
        "Engineered responsive interface modules, translated Figma wireframes into production React components, and handled client-side state management workflows. Assisted in reducing initial script asset footprints through code splitting.",
    },
  ];

  const listToDisplay = experiences.length > 0 ? experiences : defaultExperiences;

  // Editorial Preset 2 Layout (Warm Studio / Earthy Editorial)
  if (isPreset2) {
    return (
      <section
        id="experience"
        aria-label="Professional Experience"
        className="py-20 sm:py-24 bg-[#151713] text-[#F4F0E8] border-b border-[#383A33]"
      >
        <div className="editorial-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#383A33] pb-5 gap-4">
            <div>
              {tagline?.trim() && (
                <span
                  data-editable="content-sectionHeaders-experienceTagline"
                  className="text-xs font-semibold uppercase tracking-[3px] text-[#B19B7D] block mb-2 cursor-pointer"
                  title="Click to edit experience tagline"
                >
                  {tagline}
                </span>
              )}
              {heading?.trim() && (
                <h2
                  data-editable="content-sectionHeaders-experienceHeading"
                  className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#F4F0E8] tracking-tight cursor-pointer leading-[1.15]"
                  style={{ fontFamily: "var(--font-heading)" }}
                  title="Click to edit experience heading"
                >
                  {heading}
                </h2>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#69745A]"></span>
              <p className="text-xs font-mono uppercase tracking-widest text-[#B8B7AF]">
                [ 2+ YEARS PRODUCTION DELIVERY ]
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {listToDisplay.map((exp, idx) => (
              <div
                key={exp._id || `${exp.role}-${idx}`}
                className="group relative bg-[#181A15] border border-[#383A33] hover:border-[#69745A] rounded-[14px] p-6 sm:p-8 transition-all duration-300 shadow-md shadow-black/10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Duration badge, Company & Mode */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#252820] border border-[#383C2F] text-xs font-mono font-medium text-[#D8B894]">
                        <svg className="w-3.5 h-3.5 text-[#E8B58F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.duration}
                      </span>
                      {idx === 0 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#69745A]/20 border border-[#69745A]/40 text-[10px] font-semibold uppercase tracking-wider text-[#A3B18A]">
                          Recent
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold text-[#8E8D84] uppercase tracking-wider block">
                        Company
                      </span>
                      <span className="text-base font-medium text-[#E8B58F] mt-0.5 block">
                        {exp.company}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#8E8D84]">
                      <svg className="w-3.5 h-3.5 text-[#69745A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>On-Site Delivery</span>
                    </div>
                  </div>

                  {/* Right Column: Role Title & Description */}
                  <div className="lg:col-span-8 space-y-3">
                    <h3
                      className="text-2xl sm:text-[26px] font-normal text-[#F4F0E8] tracking-tight group-hover:text-[#E8B58F] transition-colors"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {exp.role}
                    </h3>

                    <p className="text-sm sm:text-base text-[#C5C4BC] leading-relaxed font-light">
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

  // Default Preset 1 Layout
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
