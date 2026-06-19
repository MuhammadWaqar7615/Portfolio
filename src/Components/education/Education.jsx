import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { HiCalendar, HiLocationMarker } from 'react-icons/hi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const educationData = [
  {
    id: 1,
    degree: "Graduation in Computer Science",
    duration: "2022 — 2026",
    institution: "Islamia University Bahawalpur",
    location: "Baghdad Campus",
    description:
      "Currently pursuing a Bachelor of Science in Computer Science. Focusing on core concepts like programming, algorithms, and data structures through hands-on collaborative projects.",
  },
  {
    id: 2,
    degree: "Intermediate of Computer Science",
    duration: "2021 — 2022",
    institution: "Iqra Army Public School And College",
    location: "Quetta Cantt",
    description:
      "Completed higher secondary education with a focus on Programming Languages, fostering academic growth and confidence through extracurricular engagement.",
  },
  {
    id: 3,
    degree: "Matriculation - Computer Science",
    duration: "2019 — 2020",
    institution: "Army Public School and College System",
    location: "Okara Cantt",
    description:
      "Gained a solid academic foundation, excelling in Computer Science while developing essential teamwork and leadership skills.",
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

// Reusable card component with Experience‑style glassmorphism
const EducationCard = ({ item }) => (
  <div className="group relative h-full p-5 md:p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-0.5 will-change-transform">
    <div className="relative z-10">
      {/* Duration & Location */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
          <HiCalendar className="w-3 h-3" />
          {item.duration}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-gray-400">
          <HiLocationMarker className="w-3 h-3" />
          {item.location}
        </span>
      </div>

      {/* Degree */}
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors duration-200">
        {item.degree}
      </h3>

      {/* Institution */}
      <p className="text-gray-300 text-sm font-medium mt-1">
        {item.institution}
      </p>

      {/* Description */}
      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mt-4 line-clamp-4 md:line-clamp-5">
        {item.description}
      </p>

      {/* Decorative line */}
      <div className="mt-5 flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent rounded-full" />
        <div className="w-1.5 h-1.5 rotate-45 border-r border-t border-purple-400/50" />
      </div>
    </div>
  </div>
);

const Education = () => {
  return (
    <section
      id="Education"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a] flex flex-col items-center justify-start pt-24 md:pt-32"
    >
      {/* Lightweight background (same as Experience) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="edu-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#edu-grid)" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="page-shell relative z-10 w-full pb-8 md:pb-12 will-change-transform">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Educational{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-3 max-w-2xl mx-auto">
            My academic foundation and continuous learning path
          </p>
        </motion.div>

        {/* Carousel (mobile) + Grid (desktop) */}
        <div className="relative">
          {/* Mobile: Auto‑infinite Swiper Carousel (identical to Experience) */}
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
              className="education-swiper"
              style={{ paddingBottom: "2rem" }}
            >
              {educationData.map((item) => (
                <SwiperSlide key={item.id}>
                  <EducationCard item={item} />
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
            className="hidden md:grid md:grid-cols-3 gap-5 md:gap-6 w-full"
          >
            {educationData.map((item, index) => (
              <motion.div key={item.id} variants={cardVariants}>
                <EducationCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Custom pagination styling (matches Experience's purple theme) */}
      <style jsx>{`
        .education-swiper .swiper-pagination-bullet {
          background: rgba(168, 85, 247, 0.5);
          opacity: 1;
        }
        .education-swiper .swiper-pagination-bullet-active {
          background: #a855f7;
        }
      `}</style>
    </section>
  );
};

export default Education;
