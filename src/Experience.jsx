import { motion } from "framer-motion";
import { HiBriefcase, HiCalendar, HiOfficeBuilding, HiLocationMarker } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const experiences = [
  {
    title: "AI Frontend Developer",
    company: "Bloggers Brackets",
    location: "On-Site",
    duration: "Jan 2024 - Present",
    description:
      "Leading front-end initiatives and implementing complex user interfaces. Collaborating with cross-functional teams to deliver high-quality web solutions using React, Tailwind CSS, and Framer Motion. Focused on creating scalable, responsive components for diverse client needs.",
    type: "Full-time Job",
  },
  {
    title: "AI-Assisted Web Developer Intern",
    company: "Bloggers Brackets",
    location: "On-Site",
    duration: "July 2023 - Dec 2023",
    description:
      "Assisted in building responsive web pages and reusable UI components using AI-assisted coding practices. Gained hands-on experience with React lifecycle methods, state management, and modern CSS frameworks while ensuring cross-browser compatibility.",
    type: "Internship",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Experience() {
  return (
    <section
      id="Experience"
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a] flex flex-col items-center justify-start pt-24 md:pt-32"
    >
      {/* Lightweight background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="exp-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#exp-grid)" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-8 md:pb-12 will-change-transform">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            {/* AI-Driven{" "} */}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-3 max-w-2xl mx-auto">
            My professional growth at Bloggers Brackets, from intern to full-time developer
          </p>
        </motion.div>

        {/* Carousel (mobile) + Grid (desktop) */}
        <div className="relative">
          {/* Mobile: Auto‑infinite Swiper Carousel */}
          <div className="block md:hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
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
              className="experience-swiper"
              style={{ paddingBottom: "2rem" }}
            >
              {experiences.map((exp, index) => (
                <SwiperSlide key={index}>
                  <ExperienceCard exp={exp} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop: Grid with staggered animations */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="hidden md:grid md:grid-cols-2 gap-5 md:gap-6 w-full max-w-5xl mx-auto"
          >
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={cardVariants}>
                <ExperienceCard exp={exp} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Custom pagination styling */}
      <style jsx>{`
        .experience-swiper .swiper-pagination-bullet {
          background: rgba(168, 85, 247, 0.5);
          opacity: 1;
        }
        .experience-swiper .swiper-pagination-bullet-active {
          background: #a855f7;
        }
      `}</style>
    </section>
  );
}

// Reusable Card Component (unchanged)
const ExperienceCard = ({ exp }) => (
  <div className="group relative h-full p-5 md:p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-0.5 will-change-transform">
    <div className="relative z-10">
      {/* Badge & Date */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
          <HiBriefcase className="w-3 h-3" />
          {exp.type}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-gray-400">
          <HiCalendar className="w-3 h-3" />
          {exp.duration}
        </span>
      </div>

      {/* Title & Company */}
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors duration-200">
        {exp.title}
      </h3>
      <div className="flex items-center gap-2 mb-3">
        <HiOfficeBuilding className="w-3.5 h-3.5 text-gray-400" />
        <p className="text-gray-300 text-sm font-medium">{exp.company}</p>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 mb-4">
        <HiLocationMarker className="w-3 h-3 text-gray-500" />
        <p className="text-gray-500 text-xs">{exp.location}</p>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-4 md:line-clamp-5">
        {exp.description}
      </p>

      {/* Decorative line */}
      <div className="mt-5 flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent rounded-full" />
        <div className="w-1.5 h-1.5 rotate-45 border-r border-t border-purple-400/50" />
      </div>
    </div>
  </div>
);