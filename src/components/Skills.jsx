import CyberTitle from "./CyberTitle";
import ContentScrollFade from "./ContentScrollFade";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiSupabase,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiHtml5,
  SiCss3,
  SiVercel,
  SiPostman,
} from "react-icons/si";

export default function Skills({ skills: _skills = [], content, presetId }) {
  const sectionHeaders = content?.sectionHeaders || {};
  const isPreset2 = presetId === "preset-2";
  const tagline = sectionHeaders.skillsTagline !== undefined ? sectionHeaders.skillsTagline : (isPreset2 ? "Skills" : "Capabilities");
  const heading = sectionHeaders.skillsHeading !== undefined ? sectionHeaders.skillsHeading : (isPreset2 ? "Technologies and tools I use to build products" : "Technical Matrix");

  // Preset 2 Editorial Layout (Matches ref img1)
  // Pixel-by-pixel Abhay Rana Skills Layout for Preset 2
  if (isPreset2) {
    const skillClusters = [
      {
        category: "Languages",
        items: [
          { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
          { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
          { name: "HTML5", icon: SiHtml5, color: "#e34f26" },
          { name: "CSS3 / SCSS", icon: SiCss3, color: "#1572b6" },
        ],
      },
      {
        category: "Frameworks & Libraries",
        items: [
          { name: "React.js", icon: SiReact, color: "#61dafb" },
          { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
          { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
          { name: "Express.js", icon: SiExpress, color: "#ffffff" },
          { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
        ],
      },
      {
        category: "Databases & Storage",
        items: [
          { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
          { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
          { name: "Supabase", icon: SiSupabase, color: "#3ecf8e" },
        ],
      },
      {
        category: "Tools & DevOps",
        items: [
          { name: "Git", icon: SiGit, color: "#f05032" },
          { name: "GitHub", icon: SiGithub, color: "#ffffff" },
          { name: "Vercel", icon: SiVercel, color: "#ffffff" },
          { name: "Postman", icon: SiPostman, color: "#ff6c37" },
        ],
      },
    ];

    return (
      <section
        id="skills"
        aria-label="Technologies and skills"
        className="py-20 md:py-28 px-4 md:px-6 relative z-10"
      >
        <div className="mx-auto max-w-6xl">
          {/* Section Heading with red dot */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#fafafa]">
              {tagline.replace(" ────", "")}
              <span className="text-red-500">.</span>
            </h2>
            <p className="mt-3 text-lg text-[#a1a1aa]">{heading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillClusters.map((cluster) => (
              <div
                key={cluster.category}
                className="bento-card p-6 md:p-8 hover:border-red-500/50 hover:shadow-[0_0_35px_rgba(239,68,68,0.12)] transition-all duration-300"
              >
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-white/[0.06]">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <h3 className="text-lg font-bold text-[#fafafa] tracking-tight">
                    {cluster.category}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {cluster.items.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="glass rounded-xl p-3 border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all flex items-center gap-3 group/item cursor-default"
                      >
                        <span className="text-lg text-zinc-300 group-hover/item:scale-110 transition-transform">
                          <IconComponent />
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-[#fafafa] group-hover/item:text-red-400 transition-colors">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const TECH_ITEMS = [
    { name: "React.js", category: "Frontend", icon: SiReact },
    { name: "Next.js", category: "Framework", icon: SiNextdotjs },
    { name: "JavaScript", category: "Language", icon: SiJavascript },
    { name: "TypeScript", category: "Language", icon: SiTypescript },
    { name: "Tailwind CSS", category: "Styling", icon: SiTailwindcss },
    { name: "Node.js", category: "Backend", icon: SiNodedotjs },
    { name: "Express.js", category: "Backend", icon: SiExpress },
    { name: "MongoDB", category: "Database", icon: SiMongodb },
    { name: "PostgreSQL", category: "Database", icon: SiPostgresql },
    { name: "Supabase", category: "Cloud DB", icon: SiSupabase },
    { name: "Git", category: "Version Control", icon: SiGit },
    { name: "GitHub", category: "Collaboration", icon: SiGithub },
    { name: "HTML5", category: "Markup", icon: SiHtml5 },
    { name: "CSS3", category: "Styles", icon: SiCss3 },
    { name: "Vercel", category: "Cloud Edge", icon: SiVercel },
    { name: "Postman", category: "API Testing", icon: SiPostman },
  ];

  const categories = [
    { title: "Frontend Architecture", items: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"] },
    { title: "Backend & Databases", items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Supabase"] },
    { title: "DevOps & Tooling", items: ["Git", "GitHub", "Vercel", "Postman"] },
  ];

  return (
    <section
      id="skills"
      aria-label="Technical skills and competencies"
      data-editable="background"
      className="py-24 sm:py-32 border-b border-white/[0.08] relative"
    >
      <div className="editorial-container relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
          {/* Left: Sticky Dual-Layer Title */}
          <div className="w-full lg:w-5/12 sticky top-16 lg:top-28 self-start z-30 bg-background/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none py-3 lg:py-0 border-b border-black/[0.06] dark:border-white/[0.08] lg:border-none transition-all">
            <CyberTitle
              title="TECH STACK"
              subtext="Modern technologies and architectures I leverage to engineer high-velocity, scalable web systems."
            />
            {/* Soft gradient dissolve for content scrolling under the sticky heading on mobile */}
            <div
              className="pointer-events-none absolute left-0 right-0 -bottom-10 h-10 bg-gradient-to-b from-background via-background/70 to-transparent lg:hidden"
              aria-hidden="true"
            />
            <div className="space-y-4 hidden lg:block pr-6">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-white/[0.06] bg-black/40 backdrop-blur-md"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1fc3ff] font-opensans mb-2">
                    {cat.title}
                  </h4>
                  <p className="text-xs text-slate-300 font-opensans leading-relaxed">
                    {cat.items.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Glow Box Grid */}
          <div className="lg:w-7/12">
            <ContentScrollFade>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
                {TECH_ITEMS.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="cyber-glow-box group"
                      title={item.name}
                    >
                      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:text-[#1fc3ff] transition-colors duration-200" />
                      <span className="cyber-glow-box-title">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </ContentScrollFade>
          </div>
        </div>
      </div>
    </section>
  );
}
