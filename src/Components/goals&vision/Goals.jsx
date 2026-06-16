import React from 'react';
import { motion } from 'framer-motion';
import { HiLightningBolt, HiFlag, HiGlobeAlt } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const goalsData = [
  {
    id: 1,
    title: "Professional Excellence",
    icon: <HiFlag className="w-6 h-6" />,
    description: "Deepening my expertise in the MERN stack and exploring modern cloud architectures to build robust, production-grade applications that scale globally.",
  },
  {
    id: 2,
    title: "AI Integration",
    icon: <HiLightningBolt className="w-6 h-6" />,
    description: "Integrating advanced AI capabilities like LLMs and autonomous agents into web applications to create smarter, more intuitive, and predictive user experiences.",
  },
  {
    id: 3,
    title: "Global Impact",
    icon: <HiGlobeAlt className="w-6 h-6" />,
    description: "Contributing to impactful open-source projects and collaborating with international teams to solve real-world problems through innovative technology.",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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

const GoalCard = ({ item }) => (
  <div className="group relative h-full p-4 md:p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-0.5 will-change-transform">
    <div className="relative z-10">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 mb-4 md:mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
        {React.cloneElement(item.icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
      </div>
      <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-purple-300 transition-colors">
        {item.title}
      </h3>
      <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
        {item.description}
      </p>
      <div className="mt-6 md:mt-8 flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent rounded-full" />
        <div className="w-1.5 h-1.5 rotate-45 border-r border-t border-purple-400/50" />
      </div>
    </div>
  </div>
);

const Goals = () => {
  return (
    <section
      id="Goals"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a] flex flex-col items-center justify-start pt-24 md:pt-32"
    >
      {/* Background patterns matching Education/Experience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="goals-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#goals-grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-8 md:pb-12 will-change-transform">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Goals &{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Visions
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="block md:hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              className="goals-swiper"
              style={{ paddingBottom: "2rem" }}
            >
              {goalsData.map((item) => (
                <SwiperSlide key={item.id}>
                  <GoalCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="hidden md:grid md:grid-cols-3 gap-5 md:gap-6 w-full max-w-5xl mx-auto"
          >
            {goalsData.map((item) => (
              <motion.div key={item.id} variants={cardVariants}>
                <GoalCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 md:mt-20 p-6 md:p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm text-center"
        >
           <p className="text-purple-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Core Philosophy</p>
           <h3 className="text-lg md:text-3xl font-light text-white italic leading-tight">
             "To bridge the gap between human intuition and machine intelligence through seamless, high-performance web experiences."
           </h3>
        </motion.div>
      </div>

      <style jsx>{`
        .goals-swiper .swiper-pagination-bullet { background: rgba(168, 85, 247, 0.5); opacity: 1; }
        .goals-swiper .swiper-pagination-bullet-active { background: #a855f7; }
      `}</style>
    </section>
  );
};

export default Goals;