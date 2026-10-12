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
          { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
          { name: "TypeScript", icon: SiTypescript, color: "#007ACC" },
          { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
          { name: "CSS3 / SCSS", icon: SiCss3, color: "#1572B6" },
        ],
      },
      {
        category: "Frameworks & Libraries",
        items: [
          { name: "React.js", icon: SiReact, color: "#61DAFB" },
          { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", isMono: true },
          { name: "Node.js", icon: SiNodedotjs, color: "#68A063" },
          { name: "Express.js", icon: SiExpress, color: "#FFFFFF", isMono: true },
          { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        ],
      },
      {
        category: "Databases & Storage",
        items: [
          { name: "MongoDB", icon: SiMongodb, color: "#00ED64" },
          { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
          { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
        ],
      },
      {
        category: "Tools & DevOps",
        items: [
          { name: "Git", icon: SiGit, color: "#F05032" },
          { name: "GitHub", icon: SiGithub, color: "#FFFFFF", isMono: true },
          { name: "Vercel", icon: SiVercel, color: "#FFFFFF", isMono: true },
          { name: "Postman", icon: SiPostman, color: "#FF6C37" },
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
                        <span
                          className="text-lg group-hover/item:scale-110 transition-transform shrink-0 flex items-center justify-center"
                          style={item.isMono ? undefined : { color: item.color }}
                          data-brand-mono={item.isMono ? "true" : undefined}
                        >
                          <IconComponent
                            style={item.isMono ? undefined : { color: item.color }}
                            className={item.isMono ? "text-white [html.light_&]:text-slate-900" : ""}
                          />
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
    { name: "React.js", category: "Frontend", icon: SiReact, color: "#61DAFB", glowColor: "rgba(97, 219, 251, 0.65)" },
    { name: "Next.js", category: "Framework", icon: SiNextdotjs, color: "#FFFFFF", glowColor: "rgba(255, 255, 255, 0.45)", isMono: true },
    { name: "JavaScript", category: "Language", icon: SiJavascript, color: "#F7DF1E", glowColor: "rgba(247, 223, 30, 0.65)" },
    { name: "TypeScript", category: "Language", icon: SiTypescript, color: "#007ACC", glowColor: "rgba(0, 122, 204, 0.65)" },
    { name: "Tailwind CSS", category: "Styling", icon: SiTailwindcss, color: "#06B6D4", glowColor: "rgba(6, 182, 212, 0.7)" },
    { name: "Node.js", category: "Backend", icon: SiNodedotjs, color: "#68A063", glowColor: "rgba(104, 160, 99, 0.7)" },
    { name: "Express.js", category: "Backend", icon: SiExpress, color: "#FFFFFF", glowColor: "rgba(255, 255, 255, 0.4)", isMono: true },
    { name: "MongoDB", category: "Database", icon: SiMongodb, color: "#00ED64", glowColor: "rgba(0, 237, 100, 0.7)" },
    { name: "PostgreSQL", category: "Database", icon: SiPostgresql, color: "#4169E1", glowColor: "rgba(65, 105, 225, 0.65)" },
    { name: "Supabase", category: "Cloud DB", icon: SiSupabase, color: "#3ECF8E", glowColor: "rgba(62, 207, 142, 0.65)" },
    { name: "Git", category: "Version Control", icon: SiGit, color: "#F05032", glowColor: "rgba(240, 80, 50, 0.65)" },
    { name: "GitHub", category: "Collaboration", icon: SiGithub, color: "#FFFFFF", glowColor: "rgba(255, 255, 255, 0.45)", isMono: true },
    { name: "HTML5", category: "Markup", icon: SiHtml5, color: "#E34F26", glowColor: "rgba(227, 79, 38, 0.65)" },
    { name: "CSS3", category: "Styles", icon: SiCss3, color: "#1572B6", glowColor: "rgba(21, 114, 182, 0.65)" },
    { name: "Vercel", category: "Cloud Edge", icon: SiVercel, color: "#FFFFFF", glowColor: "rgba(255, 255, 255, 0.45)", isMono: true },
    { name: "Postman", category: "API Testing", icon: SiPostman, color: "#FF6C37", glowColor: "rgba(255, 108, 55, 0.65)" },
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
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-y-10 gap-x-4 sm:gap-x-6 justify-items-center pt-8 pb-4">
                {TECH_ITEMS.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="glow-box-parent cyber-glow-box-parent group"
                      aria-label={item.name}
                      style={{
                        "--clr": item.glowColor || item.color,
                        "--brand-color": item.color,
                      }}
                    >
                      <span className="glow-box-title cyber-glow-box-title">
                        {item.name}
                      </span>
                      <div className="cyber-glow-box">
                        <IconComponent
                          className={`w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-200 group-hover:scale-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] [html.light_&]:drop-shadow-none ${
                            item.isMono ? "text-slate-100 [html.light_&]:text-slate-900" : ""
                          }`}
                          style={item.isMono ? undefined : { color: item.color }}
                          data-brand-mono={item.isMono ? "true" : undefined}
                        />
                      </div>
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
