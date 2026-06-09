import { motion } from "framer-motion";
import myImg from "../../assets/craiyon_011253_image.png";
import profileImg from "../../assets/craiyon_011253_image.png";

const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
    scrollButton: {
        y: [0, 10, 0],
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
    },
};

const floatingOrbs = [
    { top: '10%', left: '5%', delay: 0, duration: 8, size: 'w-64 h-64' },
    { top: '60%', right: '10%', delay: 2, duration: 10, size: 'w-72 h-72' },
    { bottom: '20%', left: '15%', delay: 4, duration: 12, size: 'w-56 h-56' },
];

export default function Hero() {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div id="Homepage" className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a]">
            {/* Background Design Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Radial gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
                
                {/* Floating orbs with blur */}
                {floatingOrbs.map((orb, idx) => (
                    <motion.div
                        key={idx}
                        className={`absolute ${orb.size} rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 blur-3xl`}
                        style={{
                            top: orb.top,
                            left: orb.left,
                            right: orb.right,
                            bottom: orb.bottom,
                        }}
                        animate={{
                            x: [0, 30, 0],
                            y: [0, -30, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: orb.duration,
                            delay: orb.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Geometric accent lines */}
                <svg className="absolute top-20 right-10 w-32 h-32 md:w-48 md:h-48 opacity-20" viewBox="0 0 200 200">
                    <path d="M20,100 L180,100 M100,20 L100,180" stroke="url(#heroGradient)" strokeWidth="1" fill="none" />
                    <circle cx="100" cy="100" r="80" stroke="url(#heroGradient)" strokeWidth="0.5" fill="none" />
                    <defs>
                        <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                    </defs>
                </svg>

                <svg className="absolute bottom-32 left-10 w-24 h-24 md:w-40 md:h-40 opacity-20" viewBox="0 0 200 200">
                    <polygon points="100,20 180,180 20,180" stroke="url(#heroGradient)" strokeWidth="1" fill="none" />
                </svg>
            </div>

            <div className="relative pt-20 md:pt-24 pb-12 md:pb-20">
                <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24">
                    <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-8 lg:flex-row lg:items-start lg:gap-12">

                        {/* Left Column: Text + Buttons + Scroll Icon */}
                        <motion.div
                            variants={textVariants}
                            initial="initial"
                            animate="animate"
                            className="z-10 w-full text-center lg:w-1/2 lg:text-left mt-12 md:mt-20"
                        >
                            {/* Mobile Profile Image */}
                            <div className="mb-6 inline-block h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border-2 border-purple-500/40 bg-gradient-to-br from-purple-600/30 to-blue-600/30 shadow-xl backdrop-blur-sm sm:hidden">
                                <img src={profileImg} alt="Muhammad Waqar" className="h-full w-full object-cover" loading="eager" />
                            </div>

                            <motion.h2 className="hidden text-lg font-semibold tracking-[0.2em] leading-none text-purple-300 sm:block md:text-xl lg:text-2xl">
                                MUHAMMAD WAQAR
                            </motion.h2>

                            <motion.h1 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight md:text-5xl lg:text-6xl xl:text-7xl">
                                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                                    Junior Web
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    Developer
                                </span>
                            </motion.h1>

                            <motion.p className="mx-auto mt-4 md:mt-6 max-w-sm sm:max-w-md text-sm sm:text-base md:text-lg text-gray-300 lg:mx-0">
                                I'm a passionate Computer Science student and front-end developer who loves creating beautiful, responsive web experiences. Currently focused on React.js and the modern JavaScript ecosystem.
                            </motion.p>

                            <motion.div className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
                                <button
                                    onClick={() => scrollToSection("FeaturedProj")}
                                    className="group interactive cursor-pointer relative overflow-hidden rounded-full border border-purple-500/60 bg-transparent px-6 sm:px-7 py-3 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30"
                                >
                                    <span className="relative z-10">View Projects</span>
                                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-purple-600 to-blue-600 transition-transform duration-300 group-hover:translate-x-0" />
                                </button>
                                <button
                                    onClick={() => scrollToSection("Contact")}
                                    className="interactive cursor-pointer rounded-full bg-white/10 px-6 sm:px-7 py-3 text-xs sm:text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:shadow-lg"
                                >
                                    Contact Me
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* Right Column: Hero Image with subtle static glow */}
                        <div className="relative flex justify-center lg:w-1/2 lg:self-end w-full max-w-sm sm:max-w-md md:max-w-lg">
                            {/* Static soft glow */}
                            <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-2xl md:blur-3xl" />
                            <div className="w-full -mt-4 lg:-mt-6 relative">
                                <img
                                    src={myImg}
                                    alt="Hero illustration"
                                    className="w-full h-auto object-contain drop-shadow-2xl"
                                    loading="eager"
                                    fetchPriority="high"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="mt-12 md:mt-16 cursor-pointer"
                        onClick={() => scrollToSection("About")}
                        animate={textVariants.scrollButton}
                    >
                        <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                            <span className="text-xs sm:text-sm">Scroll Down</span>
                            <svg
                                className="w-5 h-5 sm:w-6 sm:h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}