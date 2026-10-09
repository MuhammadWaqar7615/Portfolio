import CyberTitle from "./CyberTitle";
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
      className="py-24 sm:py-32 border-b border-white/[0.08] relative overflow-hidden"
    >
      <div className="editorial-container relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
          {/* Left: Sticky Dual-Layer Title */}
          <div className="lg:w-5/12 lg:sticky lg:top-28">
            <CyberTitle
              title="TECH STACK"
              subtext="Modern technologies and architectures I leverage to engineer high-velocity, scalable web systems."
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
          </div>
        </div>
      </div>
    </section>
  );
}
