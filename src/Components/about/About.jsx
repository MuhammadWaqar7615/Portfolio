import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const cardVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cards = [
    {
        label: "VISION",
        title: "Pixel-perfect, production-ready UI",
        description:
            "I build responsive React interfaces and own UI features end-to-end — from component architecture to animated experiences.",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ),
        glow: "from-blue-500/20 to-cyan-500/20",
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-400",
    },
    {
        label: "EXPERTISE",
        title: "React · Javascript · Tailwind · Framer Motion",
        description:
            "Production experience with React.js, Redux, REST APIs, and animated UIs. Skilled at debugging race conditions and role-based flows.",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        glow: "from-purple-500/20 to-pink-500/20",
        iconBg: "bg-purple-500/10",
        iconColor: "text-purple-400",
    },
    {
        label: "PASSION",
        title: "AI & Machine Learning — always learning",
        description:
            "Beyond frontend, I'm passionate about AI and ML. I use ChatGPT, Claude, and GitHub Copilot daily to bridge UIs with intelligent systems.",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        glow: "from-green-500/20 to-emerald-500/20",
        iconBg: "bg-green-500/10",
        iconColor: "text-green-400",
    },
];

// Reusable card component
const Card = ({ card }) => (
    <div className="group relative h-full rounded-2xl bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-xl border border-white/[0.08] p-5 md:p-6 lg:p-8 flex flex-col hover:border-white/[0.15] transition-all duration-300 overflow-hidden">
        {/* Card glow */}
        <div className={`absolute -inset-[1px] bg-gradient-to-br ${card.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="relative z-10 flex flex-col h-full">
            {/* Icon */}
            <div className={`w-10 h-10 md:w-11 md:h-11 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center mb-4 md:mb-5`}>
                {card.icon}
            </div>

            {/* Label */}
            <span className="text-[10px] tracking-[0.25em] uppercase text-gray-500 font-medium mb-2 md:mb-3">
                {card.label}
            </span>

            {/* Title */}
            <h3 className="text-sm md:text-base lg:text-lg font-semibold text-white mb-2 md:mb-3 leading-snug">
                {card.title}
            </h3>

            {/* Description - Hidden on mobile, visible on desktop */}
            <p className="hidden md:block text-sm text-gray-400 leading-relaxed flex-grow">
                {card.description}
            </p>
        </div>
    </div>
);

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section
            id="About"
            aria-label="About me section"
            className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a] flex flex-col"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Radial gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/15 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.07]">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="aboutGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#aboutGrid)" />
                    </svg>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-16 md:py-20 lg:py-24">
                <div className="max-w-7xl mx-auto w-full" ref={ref}>
                    {/* ABOUT ME Label */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3 mb-6 md:mb-8"
                    >
                        <div className="w-8 h-[1px] bg-purple-400/60" />
                        <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-purple-300/80 font-medium">
                            About Me
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                    >
                        <span className="text-white">Frontend First.</span>{" "}
                        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Always Learning.
                        </span>
                    </motion.h2>

                    {/* Intro Paragraph */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xs sm:text-sm md:text-base text-gray-300/90 leading-relaxed max-w-7xl mb-0"
                    >
                        Frontend-focused Software Engineer with hands-on production experience building responsive React.js applications — from component architecture and state management to REST API integration and animated, accessible UI. Currently working at{" "}
                        <span className="text-purple-300 font-medium">Bloggers Bracket</span>, I own UI features end-to-end across e-commerce, marketplace, and booking-platform codebases. I'm pursuing my{" "}
                        <span className="text-blue-300 font-medium">BS in Computer Science</span> at Islamia University Bahawalpur, and beyond engineering, I bring a deep passion for{" "}
                        <span className="text-cyan-300 font-medium">AI and Machine Learning</span> — constantly learning, experimenting, and exploring how intelligent systems can elevate user experiences.
                    </motion.p>

                    {/* Mobile: Auto-play Infinite Carousel */}
                    <div className="block md:hidden">
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={16}
                            slidesPerView={1}
                            centeredSlides={true}
                            loop={true}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            className="about-swiper"
                            style={{ paddingBottom: "2rem" }}
                        >
                            {cards.map((card, idx) => (
                                <SwiperSlide key={idx}>
                                    <Card card={card} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Desktop: Grid with staggered animations */}
                    <motion.div
                        variants={cardVariants}
                        initial="initial"
                        animate={isInView ? "animate" : "initial"}
                        className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mt-12"
                    >
                        {cards.map((card, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                transition={{ duration: 0.6, delay: 0.1 * idx }}
                            >
                                <Card card={card} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Custom Swiper Pagination Styling */}
            <style jsx>{`
                .about-swiper .swiper-pagination-bullet {
                    background: rgba(168, 85, 247, 0.5);
                    opacity: 1;
                }
                .about-swiper .swiper-pagination-bullet-active {
                    background: #a855f7;
                }
            `}</style>
        </section>
    );
}