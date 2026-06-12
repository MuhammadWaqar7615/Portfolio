import './sidebar.scss'
import { motion } from "motion/react"
import { useState } from 'react'
import Links from './toggleBtns/links/Links.jsx'
import ToggleBtns from './toggleBtns/ToggleBtns.jsx'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { RiInstagramFill } from "react-icons/ri"

const variants = {
  open: {
    clipPath: "circle(1200px at 50px 50px)",
    transition: {
      type: "spring",
      stiffness: 20,
    }
  },
  closed: {
    clipPath: "circle(20px at 50px 50px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 100,
      dampness: 100,
    }
  }
}

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.div className='sidebar' animate={open ? "open" : "closed"}>
      <motion.div className="bg relative" variants={variants}>
        <Links />

        {/* Social Links - visible only on small screens */}
        <div className="mobile-socials sm:hidden absolute bottom-6 left-6 flex gap-4">
          <a href="https://www.instagram.com/itx_awaara1/" target="_blank" rel="noopener noreferrer">
            <RiInstagramFill className='text-[#D3D3D3] text-2xl hover:text-white transition-all duration-150' />
          </a>
          <a href="https://www.linkedin.com/in/muhammad-waqar-profile1265" target="_blank" rel="noopener noreferrer">
            <BsLinkedin className='text-[#D3D3D3] text-2xl hover:text-white transition-all duration-150' />
          </a>
          <a href="https://github.com/MuhammadWaqar7615" target="_blank" rel="noopener noreferrer">
            <BsGithub className='text-[#D3D3D3] text-2xl hover:text-white transition-all duration-150' />
          </a>
        </div>
      </motion.div>

      <ToggleBtns setOpen={setOpen} />
    </motion.div>
  )
}
