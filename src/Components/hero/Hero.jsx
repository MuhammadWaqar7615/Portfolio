import { motion } from "framer-motion";

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
        <section id="Homepage" aria-label="Hero introduction section" className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a] flex flex-col">
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

            <div className="relative z-10 w-full h-full flex flex-col">
                <div className="flex-grow flex flex-col pt-20">
                    <div className="page-shell mx-auto flex w-full h-full flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">

                        {/* Left Column: Text + Buttons */}
                        <motion.div
                            variants={textVariants}
                            initial="initial"
                            animate="animate"
                            className="z-10 w-full text-center lg:w-1/2 lg:text-left flex flex-col justify-center"
                        >
                            <motion.h1 className="hidden text-lg font-semibold tracking-[0.2em] leading-none text-purple-300 sm:block md:text-xl lg:text-2xl">
                                MUHAMMAD WAQAR
                            </motion.h1>

                            <motion.h1 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight md:text-5xl lg:text-6xl xl:text-7xl">
                                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                                    Frontend &
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    AI Engineer
                                </span>
                            </motion.h1>

                            <motion.p className="mx-auto mt-4 md:mt-6 max-w-sm sm:max-w-md md:max-w-2xl text-sm sm:text-base md:text-lg text-gray-300">
                                I'm a frontend developer who builds responsive, user‑focused interfaces with React and modern JavaScript. Alongside that, I have a strong interest in AI and machine learning, which I explore as a separate area of expertise.
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
                                    aria-label="Scroll down to view my featured projects"
                                    onClick={() => scrollToSection("Contact")}
                                    className="interactive cursor-pointer rounded-full bg-white/10 px-6 sm:px-7 py-3 text-xs sm:text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:shadow-lg"
                                >
                                    Contact Me
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* Right Column: Code Style Card - Centered */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="hidden md:flex relative justify-center items-center lg:w-1/2 w-full"
                        >
                            {/* Code Card Container */}
                            <div className="relative w-full max-w-md">
                                {/* Glow effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-2xl blur-xl opacity-60" />
                                
                                {/* Main Code Card */}
                                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl">
                                    {/* Terminal Header */}
                                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                        </div>
                                        <div className="text-xs text-gray-400 font-mono">~/waqar</div>
                                        <div className="text-xs text-gray-500 font-mono">v1.0</div>
                                    </div>

                                    {/* Code Content */}
                                    <div className="p-5 font-mono text-sm leading-relaxed">
                                        <div className="space-y-1">
                                            <div>
                                                <span className="text-purple-400">const</span>
                                                <span className="text-blue-300"> developer</span>
                                                <span className="text-gray-300"> = {'{'}</span>
                                            </div>
                                            
                                            <div className="pl-4">
                                                <span className="text-purple-300">name</span>
                                                <span className="text-gray-300">: </span>
                                                <span className="text-green-400">'Muhammad Waqar'</span>
                                                <span className="text-gray-300">,</span>
                                            </div>
                                            
                                            <div className="pl-4">
                                                <span className="text-purple-300">role</span>
                                                <span className="text-gray-300">: </span>
                                                <span className="text-green-400">'Frontend & AI Engineer'</span>
                                                <span className="text-gray-300">,</span>
                                            </div>
                                            
                                            <div className="pl-4">
                                                <span className="text-purple-300">focus</span>
                                                <span className="text-gray-300">: [</span>
                                                <span className="text-green-400">'JavaScript'</span>
                                                <span className="text-gray-300">, </span>
                                                <span className="text-green-400">'React'</span>
                                                <span className="text-gray-300">,</span>
                                                <span className="text-green-400">'AI/ML'</span>
                                                <span className="text-gray-300">],</span>
                                            </div>
                                            
                                            <div className="pl-4">
                                                <span className="text-purple-300">stack</span>
                                                <span className="text-gray-300">: </span>
                                                <span className="text-green-400">'React'</span>
                                                <span className="text-gray-300">,</span>
                                            </div>
                                            
                                            <div className="pl-4">
                                                <span className="text-purple-300">location</span>
                                                <span className="text-gray-300">: </span>
                                                <span className="text-green-400">'Remote · On-Site'</span>
                                                <span className="text-gray-300">,</span>
                                            </div>
                                            
                                            <div className="pl-4">
                                                <span className="text-purple-300">status</span>
                                                <span className="text-gray-300">: </span>
                                                <span className="text-yellow-400">'available'</span>
                                                <span className="text-green-400 animate-pulse">●</span>
                                            </div>
                                            
                                            <div>
                                                <span className="text-gray-300">{'}'};</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Badge */}
                                    <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                            <span className="text-xs font-bold text-white">MW</span>
                                        </div>
                                        <div>
                                            <div className="text-xs font-medium text-gray-200">Muhammad Waqar</div>
                                            <div className="text-[10px] text-gray-400">Frontend & AI Engineer</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer z-20 hidden lg:block"
                    onClick={() => scrollToSection("FeaturedProj")}
                    animate={textVariants.scrollButton}
                >
                    <div className="flex flex-col items-center gap-2 text-gray-400/60 hover:text-purple-400 transition-colors">
                        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}