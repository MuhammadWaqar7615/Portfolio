import CyberTitle from "./CyberTitle";
import ContentScrollFade from "./ContentScrollFade";

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

  // Pixel-by-pixel Abhay Rana Experience Timeline for Preset 2
  if (isPreset2) {
    return (
      <section
        id="experience"
        aria-label="Professional Experience"
        className="py-20 md:py-28 px-4 md:px-6 relative z-10"
      >
        <div className="mx-auto max-w-4xl">
          {/* Section Heading with red dot */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#fafafa]">
              {tagline.replace(" ────", "")}
              <span className="text-red-500">.</span>
            </h2>
            <p className="mt-3 text-lg text-[#a1a1aa]">{heading}</p>
          </div>

          {/* Connected Vertical Timeline */}
          <div className="relative pl-6 md:pl-10 space-y-12">
            {/* Continuous Vertical Glowing Line */}
            <div className="absolute left-[7px] md:left-[11px] top-3 bottom-3 w-[2px] timeline-line pointer-events-none" />

            {listToDisplay.map((exp, idx) => (
              <div key={exp._id || idx} className="relative group">
                {/* Glowing Circular Milestone Dot */}
                <div className="absolute -left-[24px] md:-left-[40px] top-1.5 h-4 w-4 rounded-full border-2 border-red-500 bg-[#0a0a0a] timeline-dot z-10" />

                <div className="bento-card p-6 md:p-8 hover:border-red-500/50 hover:shadow-[0_0_35px_rgba(239,68,68,0.12)] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold text-[#fafafa] group-hover:text-red-400 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium text-red-400 bg-red-500/10 border border-red-500/20 w-fit">
                      {exp.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <span className="font-semibold text-red-400">{exp.company}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-400 text-xs">Full-time Engineering</span>
                  </div>

                  <p className="text-sm text-[#a1a1aa] leading-relaxed font-light mb-5">
                    {exp.description}
                  </p>

                  {/* Bullet achievements with red dots */}
                  <ul className="space-y-2 text-xs text-[#a1a1aa]/90 font-light mb-6">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                      <span>Architected modular React and Next.js interfaces with optimal client caching.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                      <span>Maintained 99.8% crash-free sessions across live production client portals.</span>
                    </li>
                  </ul>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.06]">
                    {["React.js", "Next.js", "Tailwind CSS", "JavaScript (ES6+)", "REST APIs"].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/10 text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
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
      className="py-24 sm:py-32 border-b border-white/[0.08] relative"
    >
      <div className="editorial-container relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
          {/* Left: Sticky Title */}
          <div className="w-full lg:w-5/12 sticky top-16 lg:top-28 self-start z-30 bg-background/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none py-3 lg:py-0 border-b border-black/[0.06] dark:border-white/[0.08] lg:border-none transition-all">
            <CyberTitle
              title="TIMELINE"
              subtext="Career history and production engineering journey."
            />
            {/* Soft gradient dissolve for content scrolling under the sticky heading on mobile */}
            <div
              className="pointer-events-none absolute left-0 right-0 -bottom-10 h-10 bg-gradient-to-b from-background via-background/70 to-transparent lg:hidden"
              aria-hidden="true"
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
                <ContentScrollFade key={exp._id || idx}>
                  <div className="relative group">
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
                </ContentScrollFade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
