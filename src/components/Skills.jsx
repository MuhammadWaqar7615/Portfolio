export default function Skills({ skills = [], content, presetId }) {
  const sectionHeaders = content?.sectionHeaders || {};
  const isPreset2 = presetId === "preset-2";
  const tagline = sectionHeaders.skillsTagline !== undefined ? sectionHeaders.skillsTagline : (isPreset2 ? "MY SKILLS ────" : "Capabilities");
  const heading = sectionHeaders.skillsHeading !== undefined ? sectionHeaders.skillsHeading : (isPreset2 ? "Technologies I Work With" : "Technical Matrix");

  // Preset 2 Editorial Layout (Matches ref img1)
  if (isPreset2) {
    return (
      <section
        id="skills"
        aria-label="Technologies and skills"
        className="py-20 sm:py-24 bg-[#151713] text-[#F4F0E8] border-b border-[#383A33]"
      >
        <div className="editorial-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              {tagline?.trim() && (
                <span
                  data-editable="content-sectionHeaders-skillsTagline"
                  className="text-xs font-semibold uppercase tracking-[3px] text-[#B19B7D] block mb-2 cursor-pointer"
                  title="Click to edit skills tagline"
                >
                  {tagline}
                </span>
              )}
              {heading?.trim() && (
                <h2
                  data-editable="content-sectionHeaders-skillsHeading"
                  className="text-3xl sm:text-4xl font-normal text-[#F4F0E8] tracking-tight cursor-pointer"
                  style={{ fontFamily: "var(--font-heading)" }}
                  title="Click to edit skills heading"
                >
                  {heading}
                </h2>
              )}
            </div>
            <p className="text-xs text-[#C5C4BC] max-w-sm">
              I work with modern technologies to build web applications from frontend to backend.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Frontend */}
            <div className="bg-[#181A15] border border-[#383A33] rounded-[10px] p-6 hover:border-[#69745A] transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#69745A]/25 flex items-center justify-center text-[#E8B58F]">
                  <span className="text-sm">⚛</span>
                </div>
                <h3 className="text-base font-medium text-[#F4F0E8]">Frontend</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-[#C5C4BC]">
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>React.js</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>JavaScript (ES6+)</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>HTML5 & CSS3</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>Tailwind CSS</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>SCSS</li>
              </ul>
            </div>

            {/* Card 2: Backend */}
            <div className="bg-[#181A15] border border-[#383A33] rounded-[10px] p-6 hover:border-[#69745A] transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#69745A]/25 flex items-center justify-center text-[#E8B58F]">
                  <span className="text-xs font-mono font-bold">JS</span>
                </div>
                <h3 className="text-base font-medium text-[#F4F0E8]">Backend</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-[#C5C4BC]">
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>Node.js</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>Express.js</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>REST APIs</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>JWT Authentication</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>Mongoose</li>
              </ul>
            </div>

            {/* Card 3: Database */}
            <div className="bg-[#181A15] border border-[#383A33] rounded-[10px] p-6 hover:border-[#69745A] transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#69745A]/25 flex items-center justify-center text-[#E8B58F]">
                  <span className="text-sm">🍃</span>
                </div>
                <h3 className="text-base font-medium text-[#F4F0E8]">Database</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-[#C5C4BC]">
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>MongoDB</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>MySQL (Basic)</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>Firebase (Basic)</li>
              </ul>
            </div>

            {/* Card 4: Tools & Others */}
            <div className="bg-[#181A15] border border-[#383A33] rounded-[10px] p-6 hover:border-[#69745A] transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#69745A]/25 flex items-center justify-center text-[#E8B58F]">
                  <span className="text-sm">🛠</span>
                </div>
                <h3 className="text-base font-medium text-[#F4F0E8]">Tools & Others</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-[#C5C4BC]">
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>Git & GitHub</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>VS Code</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>Vercel (Deployment)</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>Postman</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#69745A]"></span>Stripe (Payments)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no dynamic skills provided, use the fallback
  const fallbackCategories = [
    {
      category: "Frontend Engineering",
      description: "Component architecture, reactive state, and accessible UI",
      skills: [
        "React.js",
        "Next.js (App Router)",
        "JavaScript (ES6+)",
        "TypeScript",
        "Redux Toolkit",
        "HTML5 Semantic",
        "CSS3 / PostCSS",
      ],
    },
    {
      category: "Styling & Motion Systems",
      description: "Design systems, layout precision, and micro-interactions",
      skills: [
        "Tailwind CSS",
        "Framer Motion",
        "shadcn/ui",
        "Responsive Grid Layouts",
        "CSS Modules / SASS",
        "SVG Animation",
      ],
    },
    {
      category: "Backend & Data Layer",
      description: "API design, database modeling, and serverless computing",
      skills: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose ODM",
        "Next.js Route Handlers",
        "RESTful API Design",
        "JWT Authentication",
      ],
    },
    {
      category: "Toolchains & Deployment",
      description: "Version control, build performance, and cloud hosting",
      skills: [
        "Git / GitHub Workflows",
        "Vercel Edge Deployment",
        "REST Architecture",
        "Postman",
        "npm / package ecosystems",
      ],
    },
  ];

  let displayCategories = fallbackCategories;

  if (skills.length > 0) {
    // Group dynamic skills by category
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = {
          category: skill.category,
          description: "Core competencies and tools",
          skills: [],
        };
      }
      acc[skill.category].skills.push(skill.name);
      return acc;
    }, {});
    displayCategories = Object.values(grouped);
  }

  return (
    <section
      id="skills"
      aria-label="Technical skills and competencies"
      data-editable="background"
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      <div className="editorial-container">
        {(tagline?.trim() || heading?.trim()) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-6 gap-4">
            <div>
              {tagline?.trim() ? (
                <span
                  data-editable="content-sectionHeaders-skillsTagline"
                  className="text-xs font-mono uppercase tracking-[0.2em] text-accent cursor-pointer"
                  title="Click to edit skills tagline"
                >
                  {tagline}
                </span>
              ) : null}
              {heading?.trim() ? (
                <h2
                  data-editable="content-sectionHeaders-skillsHeading"
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-heading)] mt-2 cursor-pointer"
                  style={{ fontFamily: "var(--font-heading)" }}
                  title="Click to edit skills heading"
                >
                  {heading}
                </h2>
              ) : null}
            </div>
            <p className="text-xs font-mono uppercase tracking-widest opacity-60">
              [ FRONTEND · BACKEND · ARCHITECTURE ]
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayCategories.map((group) => (
            <div
              key={group.category}
              data-editable="radius"
              className="border border-white/[0.08] bg-cardBg p-6 sm:p-8 hover:border-white/20 transition-all duration-300"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <span
                data-editable="accent"
                className="text-xs font-mono uppercase tracking-widest text-accent"
              >
                {group.category}
              </span>
              <p
                data-editable="text"
                className="text-xs text-[var(--color-text)] opacity-70 font-light mt-1 mb-6"
              >
                {group.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono text-[var(--color-text)] opacity-85 bg-white/[0.04] border border-white/10 px-3 py-1.5 hover:border-accent hover:text-accent transition-colors"
                    style={{ borderRadius: "calc(var(--radius-card) / 2)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
