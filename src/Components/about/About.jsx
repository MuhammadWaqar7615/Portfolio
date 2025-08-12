import "./about.scss";
import { useState } from "react";
import { motion } from "framer-motion";
import profileImg from "../../assets/profile.png";

const containerVariants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.3,
    },
  },
};

const childVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export default function About() {
  const [isInView, setIsInView] = useState(false);

  return (
    <div className="about flex flex-col w-full justify-start items-center min-h-screen px-4 md:px-10 lg:px-20 py-10">
      {/* Profile Image */}
      <div className="z-0 mb-6 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-[5px] bg-[#3830B3] shadow-[0_0_30px_#3b82f6,inset_0_0_15px_#3830B3]">
        <img
          src={profileImg}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border-4 border-white scale-x-[-1] -rotate-3"
        />
      </div>

      {/* Animated Text Content */}
      <motion.div
        className="w-full max-w-4xl flex flex-col justify-center items-start text-center sm:text-left"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        onViewportEnter={() => {
          setIsInView(true);
        }}
        onViewportLeave={() => {
          setIsInView(false);
        }}
      >
        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl font-extrabold w-full mb-2"
          variants={childVariants}
        >
          Hi, I'm Muhammad Waqar
        </motion.h1>

        <motion.h2
          className="text-lg sm:text-xl md:text-2xl font-medium w-full mb-4"
          variants={childVariants}
        >
          Junior Web Developer
        </motion.h2>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-gray-400 w-full mb-4"
          variants={childVariants}
        >
          I’m a Computer Science student at Islamia University Bahawalpur with a strong foundation in programming languages like C, C++, and Java, and hands-on experience in web development using HTML, CSS, Bootstrap, Tailwind CSS, JavaScript, and React.js. I’ve built dynamic, user-friendly applications, including customizable themes with Redux Persist, and collaborated with backend developers on real-time e-commerce projects.
        </motion.p>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-gray-400 w-full mb-4"
          variants={childVariants}
        >
          I’m passionate about learning new technologies and enjoy building responsive and scalable software solutions. Currently, I’m working on a real-time chatting application to deepen my understanding of full-stack development.
        </motion.p>

      </motion.div>
    </div>
  );
}
