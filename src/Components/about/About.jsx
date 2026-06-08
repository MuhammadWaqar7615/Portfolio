import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profileImg from "../../assets/profile.png";

const containerVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, staggerChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="About"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a] py-20"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
          {/* Profile Image with Glow */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-2xl opacity-70" />
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-purple-500/40 bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-1 shadow-2xl shadow-purple-500/20 md:h-48 md:w-48">
              <img
                src={profileImg}
                alt="Muhammad Waqar"
                className="h-full w-full rounded-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text Content */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-1 space-y-5 text-center md:text-left"
          >
            <motion.h1
              variants={childVariants}
              className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Muhammad Waqar
              </span>
            </motion.h1>

            <motion.h2
              variants={childVariants}
              className="text-xl font-medium text-purple-300 md:text-2xl"
            >
              Junior Web Developer
            </motion.h2>

            <motion.div
              variants={childVariants}
              className="space-y-4 text-gray-300 md:text-lg"
            >
              <p>
                I’m a Computer Science student at Islamia University Bahawalpur
                with a strong foundation in C, C++, and Java, and hands‑on
                experience in modern web development (HTML, CSS, Bootstrap,
                Tailwind CSS, JavaScript, React.js). I’ve built dynamic,
                user‑friendly applications including customizable themes with
                Redux Persist, and collaborated on real‑time e‑commerce
                projects.
              </p>
              <p>
                I’m passionate about learning new technologies and enjoy
                building responsive, scalable software solutions. Currently,
                I’m working on a real‑time chatting application to deepen my
                full‑stack skills.
              </p>
            </motion.div>

            {/* Optional: Quick stats or skills chips */}
            <motion.div
              variants={childVariants}
              className="flex flex-wrap justify-center gap-3 pt-4 md:justify-start"
            >
              {["React", "Tailwind", "JavaScript", "Redux", "Node.js", "MongoDB"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all hover:bg-purple-500/20 hover:text-white"
                  >
                    {skill}
                  </span>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}