import { motion } from "motion/react";
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

export default function Hero() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

      <div className="relative pt-20 md:pt-24 pb-12">
        <div className="flex flex-col items-center justify-center px-6 md:px-12 lg:px-24">
          <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-8 lg:flex-row lg:items-start lg:gap-12">
            
            {/* Left Column: Text + Buttons + Scroll Icon */}
            <motion.div
              variants={textVariants}
              initial="initial"
              animate="animate"
              className="z-10 w-full text-center lg:w-1/2 lg:text-left mt-10"
            >
              {/* Mobile Profile Image */}
              <div className="mb-6 inline-block h-24 w-24 overflow-hidden rounded-full border-2 border-purple-500/40 bg-gradient-to-br from-purple-600/30 to-blue-600/30 shadow-xl backdrop-blur-sm sm:hidden">
                <img src={profileImg} alt="Muhammad Waqar" className="h-full w-full object-cover" loading="eager" />
              </div>

              <motion.h2 className="hidden text-xl font-semibold tracking-[0.2em] text-purple-300 sm:block md:text-2xl">
                MUHAMMAD WAQAR
              </motion.h2>

              <motion.h1 className="mt-3 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Junior Web
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Developer
                </span>
              </motion.h1>

              <motion.p className="mx-auto mt-6 max-w-md text-gray-300 md:text-lg lg:mx-0">
                Crafting modern, responsive, and interactive web experiences with React & Tailwind CSS.
              </motion.p>

              <motion.div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <button
                  onClick={() => scrollToSection("Projects")}
                  className="group interactive relative overflow-hidden rounded-full border border-purple-500/60 bg-transparent px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30"
                >
                  <span className="relative z-10">View Projects</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-purple-600 to-blue-600 transition-transform duration-300 group-hover:translate-x-0" />
                </button>
                <button
                  onClick={() => scrollToSection("Contact")}
                  className="interactive rounded-full bg-white/10 px-7 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:shadow-lg"
                >
                  Contact Me
                </button>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                variants={textVariants}
                animate="scrollButton"
                className="mt-12 flex flex-col items-center gap-2 lg:items-start"
              >
                <div className="h-10 w-6 rounded-full border-2 border-gray-400 p-1.5">
                  <div className="mx-auto h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                </div>
                <span className="text-xs tracking-wider text-gray-400">SCROLL DOWN</span>
              </motion.div>
            </motion.div>

            {/* Right Column: Hero Image with subtle static glow */}
            <div className="relative flex justify-center lg:w-1/2 lg:self-end">
              {/* Static soft glow – no heavy animation, fits dark theme */}
              <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-2xl" />
              <div className="w-full max-w-md md:max-w-lg lg:max-w-xl -mt-4 lg:-mt-6 relative">
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
        </div>
      </div>
    </div>
  );
}