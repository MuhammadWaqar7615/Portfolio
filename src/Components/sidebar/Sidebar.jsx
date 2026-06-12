import { motion } from "motion/react";
import Links from './toggleBtns/links/Links.jsx';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { RiInstagramFill } from "react-icons/ri";

const variants = {
  open: {
    clipPath: "circle(1200px at 50px 50px)",
    transition: { type: "spring", stiffness: 20 },
  },
  closed: {
    clipPath: "circle(0px at 50px 50px)",
    transition: { delay: 0.5, type: "spring", stiffness: 100, damping: 100 },
  },
};

export default function Sidebar({ isOpen }) {
  return (
    <motion.div
      className="fixed top-0 left-0 z-[999] md:hidden"
      animate={isOpen ? "open" : "closed"}
    >
      <motion.div
        className="fixed top-0 left-0 bottom-0 w-full md:w-[300px] bg-white flex justify-center"
        variants={variants}
      >
        <div className="absolute w-fit h-full flex flex-col items-center justify-center gap-5">
          <Links />
        </div>
        <div className="absolute bottom-6 left-6 flex gap-4 sm:hidden">
          <a href="https://www.instagram.com/itx_awaara1/" target="_blank">
            <RiInstagramFill className="text-[#D3D3D3] text-2xl hover:text-black transition" />
          </a>
          <a href="https://www.linkedin.com/in/muhammad-waqar-profile1265" target="_blank">
            <BsLinkedin className="text-[#D3D3D3] text-2xl hover:text-black transition" />
          </a>
          <a href="https://github.com/MuhammadWaqar7615" target="_blank">
            <BsGithub className="text-[#D3D3D3] text-2xl hover:text-black transition" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}