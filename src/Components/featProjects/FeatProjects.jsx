import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

export default function FeaturedProj() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projects = [
    {
      title: "Crafts & Delights",
      description:
        "A beautifully crafted web application showcasing artisanal gifts and delightful treats, designed with a focus on elegant UI and smooth user interactions.",
      image: "",
      tech: ["React", "Tailwind", "Framer Motion"],
      github: "https://github.com/MuhammadWaqar7615/",
      demo: "https://crafts-delights.vercel.app",
    },
    {
      title: "Retreat Bookings",
      description:
        "A dynamic booking platform tailored for retreat management, enabling users to explore and reserve properties with an integrated scheduling system.",
      image: "",
      tech: ["React", "Node.js", "MongoDB"],
      github: null,
      demo: null,
    },
    {
      title: "WorkNexus",
      description:
        "A comprehensive Enterprise Resource Management (ERM) solution built to optimize internal business processes and facilitate seamless team coordination.",
      image: "",
      tech: ["React", "PostgreSQL", "Express"],
      github: "https://github.com/MuhammadWaqar7615/",
      demo: "Link will be available soon",
    },
    {
      title: "Ecommerce-store",
      description:
        "A scalable e-commerce solution featuring a modern product catalog, secure checkout flows, and a fully responsive design for a premium shopping experience.",
      image: "",
      tech: ["React", "Supabase", "Tailwind CSS"],
      demo: "https://irfan-alyy.github.io/Ecommerce-Store/",
    },
  ];

  // Reusable card component
  const ProjectCard = ({ project }) => (
    <div className="group relative flex flex-col rounded-2xl bg-[#111122] p-4 border border-white/5 transition-all duration-500 hover:border-purple-500/30 overflow-hidden h-full">
      {/* Animated Spotlight Background */}
      <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(168,85,247,0.1),transparent_40%)]" />

      <div className="mb-4 flex flex-wrap gap-2 relative z-10">
        {project.tech?.map((t) => (
          <span
            key={t}
            className="text-[8px] uppercase tracking-wider text-purple-300 font-bold bg-purple-500/5 px-2.5 py-0.5 rounded-full border border-purple-500/10"
          >
            {t}
          </span>
        ))}
      </div>

      <h4 className="text-lg font-bold text-white mb-1 group-hover:translate-x-1 transition-transform duration-300 relative z-10">
        {project.title}
      </h4>
      <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-1 relative z-10 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap items-center gap-4 mt-auto relative z-10 border-t border-white/5 pt-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Code
          </a>
        )}
        {project.demo &&
          (project.demo.startsWith("http") ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-widest"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Demo
            </a>
          ) : (
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
              {project.demo}
            </span>
          ))}
      </div>
    </div>
  );

  return (
    <section
      id="FeaturedProj"
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a1a] flex flex-col justify-center items-center pt-24 pb-12"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />

      <div className="page-shell relative mx-auto w-full">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-6"
        >
          <motion.div variants={childVariants} className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
              Featured{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
          </motion.div>

          {/* Mobile/Tablet: Auto‑play Infinite Carousel */}
          <div className="block md:hidden">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              className="projects-swiper"
              style={{ paddingBottom: "2rem" }}
            >
              {projects.map((project, idx) => (
                <SwiperSlide key={idx}>
                  <ProjectCard project={project} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop: Grid with staggered animations */}
          <motion.div
            variants={containerVariants}
          className="hidden md:grid md:grid-cols-2 gap-4 w-full"
          >
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={childVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Swiper Pagination Styling */}
      <style jsx>{`
        .projects-swiper .swiper-pagination-bullet {
          background: rgba(168, 85, 247, 0.5);
          opacity: 1;
        }
        .projects-swiper .swiper-pagination-bullet-active {
          background: #a855f7;
        }
      `}</style>
    </section>
  );
}
