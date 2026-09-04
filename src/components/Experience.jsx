export default function Experience({ experiences = [] }) {
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
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      <div className="editorial-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-6 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-sky-400">
              Work History
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
              Professional Experience
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
            [ 2+ YEARS PRODUCTION DELIVERY ]
          </p>
        </div>

        <div className="space-y-12">
          {listToDisplay.map((exp) => (
            <div
              key={exp._id || exp.role}
              className="border border-white/[0.08] bg-[#0C0E14] p-6 sm:p-10 transition-all duration-300 hover:border-white/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
                    {exp.duration}
                  </span>
                  <p className="text-xs font-mono text-gray-400 mt-1">
                    On-Site Delivery
                  </p>
                </div>

                <div className="lg:col-span-9 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-2xl font-bold text-white">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-mono text-gray-400">
                      @ {exp.company}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed font-light">
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

