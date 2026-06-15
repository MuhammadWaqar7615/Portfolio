import { motion, useInView } from "framer-motion";
import { useRef, memo, useMemo } from "react";

const skillCategories = {
  "Frontend": [
    { name: "HTML5", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", glow: "orange" },
    { name: "CSS3", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", glow: "blue" },
    { name: "Bootstrap", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", glow: "purple" },
    { name: "Tailwind CSS", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", glow: "teal" },
    { name: "JavaScript", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", glow: "yellow" },
  ],
  "Frameworks": [
    { name: "React", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", glow: "blue" },
    { name: "Redux Toolkit", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", glow: "purple" },
    { name: "React Router", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactrouter/reactrouter-original.svg", glow: "red" },
    { name: "Material UI", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg", glow: "blue" },
    { name: "shadcn/ui", svgUrl: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4", glow: "neutral" },
    { name: "Chakra UI", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chakraui/chakraui-original.svg", glow: "teal" },
  ],
  "Animation": [
    { name: "Framer Motion", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg", glow: "purple" },
  ],
  "Backend": [
    { name: "Firebase", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", glow: "yellow" },
  ],
  "Tools": [
    { name: "Git", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", glow: "orange" },
    { name: "GitHub", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", glow: "neutral" },
    { name: "Linux", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", glow: "yellow" },
  ],
  "Deployment": [
    { name: "Vercel", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", glow: "neutral" },
    { name: "Netlify", svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg", glow: "teal" },
  ],
};

const glowColors = {
  blue: "shadow-blue-500/30 border-blue-500/30",
  green: "shadow-green-500/30 border-green-500/30",
  yellow: "shadow-yellow-500/30 border-yellow-500/30",
  orange: "shadow-orange-500/30 border-orange-500/30",
  purple: "shadow-purple-500/30 border-purple-500/30",
  teal: "shadow-teal-500/30 border-teal-500/30",
  red: "shadow-red-500/30 border-red-500/30",
  neutral: "shadow-white/20 border-white/20",
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3 }
  }
};

const SkillCard = memo(({ skill }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.1, y: -8 }}
    className={`
      group relative
      w-16 h-16 md:w-24 md:h-24
      flex items-center justify-center
      rounded-2xl
      bg-white/5 backdrop-blur-sm
      border border-white/10
      transition-all duration-300
      cursor-pointer
      hover:bg-white/10
      hover:shadow-lg hover:z-50 ${glowColors[skill.glow]}
    `}
  >
    {/* Angular corner accents */}
    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30 rounded-tl opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30 rounded-br opacity-0 group-hover:opacity-100 transition-opacity" />
    
    {/* SVG Logo */}
    <img
      src={skill.svgUrl}
      alt={skill.name}
      className="w-8 h-8 md:w-12 md:h-12 object-contain relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
      loading="lazy"
    />

    {/* Tooltip */}
    <div className="
      absolute -bottom-10 left-1/2 -translate-x-1/2
      px-3 py-1.5
      bg-black/90 backdrop-blur-md
      border border-white/20
      rounded-lg
      text-xs font-medium text-white
      opacity-0 group-hover:opacity-100
      transition-all duration-200
      pointer-events-none
      whitespace-nowrap
      z-[60]
      shadow-xl
    ">
      {skill.name}
    </div>

    {/* Glow effect */}
    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${skill.glow}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
  </motion.div>
));

SkillCard.displayName = 'SkillCard';

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const allSkills = useMemo(() => 
    Object.values(skillCategories).flat(), 
    []
  );

  return (
    <section
      id="Skills"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a] py-20 pt-24 md:pt-32 flex flex-col justify-start"
    >
      {/* Geometric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <svg className="absolute top-40 right-20 w-64 h-64 opacity-20" viewBox="0 0 200 200">
          <path d="M0,100 L200,100 M100,0 L100,200 M20,20 L180,180 M180,20 L20,180" stroke="url(#gradient)" strokeWidth="0.5" fill="none" />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Tech{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Stack
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-3 max-w-2xl mx-auto">
            Tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* All Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center items-center gap-3 md:gap-6"
        >
          {allSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </motion.div>

        {/* Geometric decorative elements */}
        <div className="mt-16 flex justify-center gap-4 opacity-30">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div className="w-2 h-2 rotate-45 bg-blue-500 rounded-sm" />
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </div>
      </div>
    </section>
  );
}