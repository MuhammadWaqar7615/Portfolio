import { motion } from "framer-motion";

const experiences = [
  {
    title: "Junior Web Developer",
    company: "Bloggers Brackets",
    location: "Remote",
    duration: "Jan 2024 - Present",
    description:
      "Leading front-end initiatives and implementing complex user interfaces. Collaborating with cross-functional teams to deliver high-quality web solutions using React, Tailwind CSS, and Framer Motion. Focused on creating scalable, responsive components for diverse client needs.",
    type: "Full-time Job",
  },
  {
    title: "Web Developer Intern",
    company: "Bloggers Brackets",
    location: "Remote",
    duration: "July 2023 - Dec 2023",
    description:
      "Assisted in building responsive web pages and reusable UI components. Gained hands-on experience with React lifecycle methods, state management, and modern CSS frameworks while ensuring cross-browser compatibility across multiple projects.",
    type: "Internship",
  },
];

// Animation variants for cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

// Simple SVG Icons
const BriefcaseIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 10h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M8 14h.01"></path>
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export default function Experience() {
  return (
    <section
      id="Experience"
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a] flex items-center justify-center"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px]" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="exp-grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#exp-grid)" />
          </svg>
        </div>

        {/* Floating dots */}
        <div className="absolute inset-0">
          <div className="absolute top-[15%] left-[10%] w-1 h-1 bg-purple-400/40 rounded-full" />
          <div className="absolute top-[70%] left-[85%] w-1.5 h-1.5 bg-blue-400/40 rounded-full" />
          <div className="absolute top-[40%] left-[92%] w-1 h-1 bg-purple-400/30 rounded-full" />
          <div className="absolute top-[85%] left-[20%] w-1 h-1 bg-blue-400/30 rounded-full" />
        </div>
      </div>

      {/* Main content container - perfectly centered & fits 100vh */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 h-full flex flex-col justify-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-3"
          >
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-xs font-medium text-purple-300 tracking-wide">
                Professional Journey
              </span>
            </div>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            Work{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            My professional growth at Bloggers Brackets, from intern to
            full-time developer
          </p>
        </motion.div>

        {/* Cards Grid - using staggered children */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex-1 flex items-center justify-center min-h-0"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 w-full max-w-5xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="h-full"
              >
                <div className="group relative h-full p-5 md:p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1">
                  {/* Animated gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-500 pointer-events-none" />

                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Header: Type Badge + Duration */}
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        <BriefcaseIcon />
                        {exp.type}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                        <CalendarIcon />
                        {exp.duration}
                      </span>
                    </div>

                    {/* Title & Company */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <BuildingIcon />
                      <p className="text-gray-300 text-sm font-medium">
                        {exp.company}
                      </p>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <MapPinIcon />
                      <p className="text-gray-500 text-xs">{exp.location}</p>
                    </div>

                    {/* Description with line clamp for safety */}
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-4 md:line-clamp-5">
                      {exp.description}
                    </p>

                    {/* Decorative accent line */}
                    <div className="mt-5 flex items-center gap-2">
                      <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent rounded-full" />
                      <div className="w-1.5 h-1.5 rotate-45 border-r border-t border-purple-400/50" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Optional subtle footer spacing for balance */}
        <div className="h-4 md:h-6" />
      </div>
    </section>
  );
}