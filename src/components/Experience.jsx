import CyberTitle from "./CyberTitle";

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

  // Cyber Cyan Glowing Timeline Layout
  return (
    <section
      id="experience"
      aria-label="Professional Experience"
      data-editable="background"
      className="py-24 sm:py-32 border-b border-white/[0.08] relative overflow-hidden"
    >
      <div className="editorial-container relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
          {/* Left: Sticky Title */}
          <div className="lg:w-5/12 lg:sticky lg:top-28">
            <CyberTitle
              title="TIMELINE"
              subtext="Career history and production engineering journey."
            />
            <div className="hidden lg:block p-5 rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-md space-y-3 mr-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1fc3ff] font-opensans block">
                CAREER PHILOSOPHY
              </span>
              <p className="text-xs text-slate-300 font-opensans leading-relaxed">
                Focused on delivering end-to-end impact, maintaining code clarity, reducing bundle size, and ensuring stellar runtime performance.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-opensans">
                <span className="w-2 h-2 rounded-full bg-[#1fc3ff] animate-pulse"></span>
                <span>2+ Years Production Delivery</span>
              </div>
            </div>
          </div>

          {/* Right: Glowing Cyan Timeline */}
          <div className="lg:w-7/12 relative pl-6 sm:pl-8">
            {/* Continuous Vertical Glowing Line */}
            <div
              className="absolute top-4 bottom-4 left-2 sm:left-3 w-[2px] bg-gradient-to-b from-[#1fc3ff] via-[#1fc3ff]/60 to-[#1fc3ff]/20 shadow-[0_0_10px_#1fc3ff]"
              aria-hidden="true"
            />

            <div className="space-y-12">
              {listToDisplay.map((exp, idx) => (
                <div key={exp._id || idx} className="relative group">
                  {/* Glowing Node Checkpoint */}
                  <div
                    className="absolute -left-[27px] sm:-left-[31px] top-1.5 w-5 h-5 rounded-full border-2 border-[#1fc3ff] bg-[#06090e] shadow-[0_0_12px_#1fc3ff] transition-transform duration-300 group-hover:scale-125"
                    aria-hidden="true"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1fc3ff] m-auto mt-1" />
                  </div>

                  {/* Timeline Card */}
                  <div className="cyber-glow-card p-6 sm:p-8 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-[2px] text-[#1fc3ff] font-opensans block">
                          {exp.company}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white font-fugaz tracking-wide mt-1">
                          {exp.role}
                        </h3>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1fc3ff]/10 border border-[#1fc3ff]/40 text-[#1fc3ff] font-opensans shadow-[0_0_10px_rgba(31,195,255,0.15)]">
                        {exp.duration}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 font-opensans leading-relaxed font-normal">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
