import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';

import GmailClone from './projName/GmailClone';
import TransactionSite from './projName/TransactionSite';
import EcommerceSite from './projName/EcommerceSite';
import BakerySite from './projName/BakerySite';
import InstagramClone from './projName/InstagramClone';

const variants = {
    initial: {
        y: 50,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1,
        },
    },
};

export default function PracticeProjects() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    <EcommerceSite />,
    <BakerySite />,
    <TransactionSite />,
    <GmailClone />,
    <InstagramClone />,
  ];

  const handleSlideChange = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      setActiveIndex(swiper.realIndex);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a] flex flex-col items-center justify-start pt-24 md:pt-32 pb-10">
      {/* Background Design Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="projects-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#projects-grid)" />
          </svg>
        </div>
      </div>

      <div className="page-shell relative z-10 w-full h-full flex flex-col items-center">
        {/* Heading and Description */}
        <motion.div
          variants={variants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-2 md:mb-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
            Practice <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
          </h2>
        </motion.div>

        {/* Swiper Container */}
        <div className="relative w-full flex-1 max-h-[700px] flex items-center">
          <button
            className={`swiper-button-prev absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white transition-colors ${
              activeIndex === 0 ? 'opacity-30 pointer-events-none' : ''
            }`}
          >
            {/* <ion-icon name="arrow-back-outline" size="large" /> */}
          </button>

          <button className="swiper-button-next absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white transition-colors">
            {/* <ion-icon name="arrow-forward-outline" size="large" /> */}
          </button>

          <Swiper
            ref={swiperRef}
            effect="coverflow"
            grabCursor={false}
            centeredSlides={true}
            loop={false}
            initialSlide={2}
            slidesPerView={4}
            onSlideChange={handleSlideChange}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="w-full pt-0 pb-32 practice-swiper"
            breakpoints={{
              320: {
                slidesPerView: 1,
                coverflowEffect: {
                  depth: 50,
                  modifier: 1.5,
                  slideShadows: false,
                },
              },
              640: {
              slidesPerView: 2.5,
                coverflowEffect: {
                depth: 100,
                  modifier: 2,
                  slideShadows: false,
                },
              },
              1024: {
                slidesPerView: 4,
                coverflowEffect: {
                  depth: 100,
                  modifier: 2.5,
                  slideShadows: false,
                },
              },
            }}
          >
            {slides.map((Component, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center h-auto"
              >
                <div className="w-full max-w-[350px] mx-auto pt-4 pb-12">{Component}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
