export default function Skills() {
  const skillCategories = [
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
        "Git & GitHub",
        "Vercel Deployment",
        "Linux CLI",
        "Vite & Webpack",
        "Postman",
        "npm / package ecosystems",
      ],
    },
  ];

  return (
    <section
      id="skills"
      aria-label="Technical skills and competencies"
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      <div className="editorial-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-6 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-sky-400">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
              Technical Matrix
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
            [ FRONTEND · BACKEND · ARCHITECTURE ]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((group) => (
            <div
              key={group.category}
              className="border border-white/[0.08] bg-[#0C0E14] p-6 sm:p-8 hover:border-white/20 transition-all duration-300"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
                {group.category}
              </span>
              <p className="text-xs text-gray-400 font-light mt-1 mb-6">
                {group.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono text-gray-200 bg-white/[0.04] border border-white/10 px-3 py-1.5 hover:border-sky-400/40 hover:text-white transition-colors"
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
