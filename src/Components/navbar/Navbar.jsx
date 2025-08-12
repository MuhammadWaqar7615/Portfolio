import './navbar.scss'
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { motion } from "framer-motion"
import { RiInstagramFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { FaFileDownload } from 'react-icons/fa';

export default function Navbar() {
  return (
    <div className='navbar box-border'>
      <div className="wrapper flex justify-between items-center pt-[18px] md:pt-[30px] px-8 md:px-[100px]">
        <motion.span
          className='cursor-default ml-11'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Muhammad Waqar
        </motion.span>

        <div className='download-icon'>
          <a href="/resume" className="my-5 flex">
            <FaFileDownload className='text-[#D3D3D3] text-xl cursor-pointer hover:text-white transition-all duration-150' />
            Download
          </a>
        </div>

        {/* Desktop social links (hidden on mobile) */}
        <motion.div
          className="social flex gap-4 items-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/resume" className='border border-white leading-10 px-5 rounded-lg hover:bg-white hover:text-black transition-all duration-150'>Download CV</Link>
          <a href="https://www.instagram.com/itx_awaara1/">
            <RiInstagramFill className='text-[#D3D3D3] text-xl cursor-pointer hover:text-white transition-all duration-150' />
          </a>
          <a href="https://www.linkedin.com/in/muhammad-waqar-profile1265">
            <BsLinkedin className='text-[#D3D3D3] text-xl cursor-pointer hover:text-white transition-all duration-150' />
          </a>
          <a href="https://github.com/MuhammadWaqar7615">
            <BsGithub className='text-[#D3D3D3] text-xl cursor-pointer hover:text-white transition-all duration-150' />
          </a>
        </motion.div>
      </div>
    </div>
  );
}