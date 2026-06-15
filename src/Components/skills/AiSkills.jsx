import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, memo, useMemo, useState, useEffect } from "react";


const specializations = [
  {
    title: "LLMs",
    description: "Architecting solutions using advanced Large Language Models to solve complex reasoning tasks and generate human-like text.",
    tools: [
      { name: "DeepSeek", svgUrl: "https://www.google.com/s2/favicons?domain=deepseek.com&sz=128", glow: "blue" },
      { name: "Claude AI", svgUrl: "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128", glow: "orange" },
      { name: "GPT-4o", svgUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/openai.svg", glow: "green" },
      { name: "Qwen", svgUrl: "/qwen-color.png", glow: "neutral" },
    ]
  },
  {
    title: "Prompting",
    description: "Mastering the art of precision instruction to extract maximum performance and accurate results from generative models.",
    tools: [
      { name: "ChatGPT", svgUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/openai.svg", glow: "teal" },
      { name: "Claude AI", svgUrl: "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128", glow: "orange" },
      { name: "Midjourney", svgUrl: "https://www.google.com/s2/favicons?domain=midjourney.com&sz=128", glow: "neutral" },
      { name: "Perplexity", svgUrl: "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128", glow: "teal" },
    ]
  },
  // {
  //   title: "Context Engineering",
  //   description: "Optimizing model attention by strategically managing RAG pipelines and relevant data injection for higher accuracy.",
  //   tools: [
  //     { name: "LangChain", svgUrl: "https://www.google.com/s2/favicons?domain=langchain.com&sz=128", glow: "green" },
  //     { name: "Pinecone", svgUrl: "https://www.google.com/s2/favicons?domain=pinecone.io&sz=128", glow: "blue" },
  //     { name: "LlamaIndex", svgUrl: "https://www.google.com/s2/favicons?domain=llamaindex.ai&sz=128", glow: "neutral" },
  //     { name: "ChromaDB", svgUrl: "https://www.google.com/s2/favicons?domain=trychroma.com&sz=128", glow: "orange" },
  //   ]
  // },
  {
    title: "Vibe Coding",
    description: "Embracing high-level intent-based development, using natural language to shape logic and accelerate delivery.",
    tools: [
      { name: "Blackbox AI", svgUrl: "https://www.google.com/s2/favicons?domain=blackbox.ai&sz=128", glow: "blue" },
      { name: "Codex AI", svgUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/openai.svg", glow: "green" },
      { name: "Lovable", svgUrl: "https://www.google.com/s2/favicons?domain=lovable.dev&sz=128", glow: "purple" },
      { name: "Gemini Agent", svgUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/googlegemini.svg", glow: "blue" },
    ]
  },
  {
    title: "Agents",
    description: "Building autonomous systems capable of executing multi-step workflows, tool use, and self-correction to achieve goals.",
    tools: [
      { name: "Lovable", svgUrl: "https://www.google.com/s2/favicons?domain=lovable.dev&sz=128", glow: "purple" },
      { name: "GitHub Copilot", svgUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/githubcopilot.svg", glow: "neutral" },
      { name: "OpenAI Codex", svgUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/openai.svg", glow: "green" },
      { name: "Gemini", svgUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/googlegemini.svg", glow: "blue" },
    ]
  }
];

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
      w-20 h-20 md:w-24 md:h-24
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
      className="w-10 h-10 md:w-12 md:h-12 object-contain relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
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

export default function AiSkills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % specializations.length);
    }, 3000); // Change specialization every 3 seconds
    return () => clearInterval(interval);
  }, []);


  return (
    <section
      id="AiSkills"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a] py-20 flex items-center"
    >
      {/* Geometric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl my-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Heading and Info */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="h-40 md:h-52">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                    AI{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                      {specializations[activeIndex].title}
                    </span>
                  </h2>
                  <p className="text-gray-400 text-base md:text-lg mt-6 max-w-lg lg:mx-0 mx-auto leading-relaxed">
                    {specializations[activeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-8 lg:mx-0 mx-auto" />
            
            <div className="h-32">
              <AnimatePresence mode="wait">
                <motion.ul
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 gap-4 mt-10"
                >
                  {specializations[activeIndex].tools.map((skill) => (
                    <li key={skill.name} className="flex items-center justify-center lg:justify-start gap-4 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.8)]" />
                      <span className="text-xl font-medium">{skill.name}</span>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Skill Cards Grid */}
        <div className="flex justify-center lg:justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-2 gap-4 md:gap-8 p-4 bg-white/[0.02] rounded-3xl border border-white/5 backdrop-blur-sm"
            >
              {specializations[activeIndex].tools.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}