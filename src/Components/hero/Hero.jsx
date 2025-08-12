import './hero.scss'
import myImg from "../../assets/erasebg-transformed.png"
import profileImg from "../../assets/profile.png";
import { motion } from 'motion/react'

const textVariants = {
    initial: {
        x: -500,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.1
        },
    },
    scrollButton: {
        opacity: 0,
        y: 10,
        transition: {
            duration: 2,
            repeat: Infinity
        }
    }
};
const sliderVariants = {
    initial: {
        x: 0,
    },
    animate: {
        x: "-220%",
        transition: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 20,
        },
    },
};

export default function Hero() {
    return (
        <div className='hero'>
            <div className="wrapper h-screen md:px-[100px] flex items-center">
                <motion.div className="textContainer" variants={textVariants} initial="initial" animate="animate">
                    {/* Show image on mobile and text on larger screens */}
                    <motion.div className="sm:hidden mt-10 z-0 mb-6 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-[#3830B3] shadow-[0_0_30px_#3b82f6,inset_0_0_15px_#3830B3] overflow-hidden">
                        <img
                            src={profileImg}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Show name on larger screens */}
                    <motion.h2 className="hidden sm:block text-purple-600" variants={textVariants}>
                        MUHAMMAD WAQAR
                    </motion.h2>

                    <motion.h1 variants={textVariants}>Junior Web Developer</motion.h1>
                    <motion.div variants={textVariants} className="buttons flex">
                        <motion.a href="#Projects" variants={textVariants} className='leading-10 mx-3 px-3 rounded-lg cursor-pointer border border-gray-400 text-gray-400 z-20 hover:border-white hover:text-white transition-all'>See My Projects</motion.a>
                        <motion.a href="#Contact" variants={textVariants} className='leading-10 mx-3 px-3 rounded-lg cursor-pointer text-black bg-gray-300 z-20 hover:bg-white transition-all'>Contact me</motion.a>
                    </motion.div>
                    <motion.img variants={textVariants} animate="scrollButton" src="/scroll.png" alt="" />
                    <motion.div className="slideTextContainer cursor-default" variants={sliderVariants} initial="initial" animate="animate">
                        Junior Web Developer
                    </motion.div>
                </motion.div>
            </div>

            <div className="imageContainer">
                <img src={myImg} alt="" />
            </div>
        </div>
    )
}
