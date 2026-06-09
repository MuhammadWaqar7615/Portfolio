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
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Heading and Description */}
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Practice <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base mt-4 max-w-2xl mx-auto">
          Exploring diverse domains through detailed application clones and experimental UI/UX challenges.
        </p>
      </motion.div>

      {/* Swiper Container */}
      <div className="relative w-full h-80 max-w-6xl mx-auto">
        <button
          className={`swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-700 hover:text-black transition ${
            activeIndex === 0 ? 'opacity-30 pointer-events-none' : ''
          }`}
        >
          {/* <ion-icon name="arrow-back-outline" size="large" /> */}
        </button>

        <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-700 hover:text-black transition">
          {/* <ion-icon name="arrow-forward-outline" size="large" /> */}
        </button>

        <Swiper
          ref={swiperRef}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={false}
          initialSlide={2}
          slidesPerView={4}
          onSlideChange={handleSlideChange}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
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
          className="pt-12 pb-32 practice-swiper"
          breakpoints={{
            320: {
              slidesPerView: 1,
              coverflowEffect: {
                depth: 50,
                modifier: 1.5,
              },
            },
            640: {
              slidesPerView: 4,
              coverflowEffect: {
                depth: 80,
                modifier: 2,
              },
            },
            1024: {
              slidesPerView: 4,
              coverflowEffect: {
                depth: 100,
                modifier: 2.5,
              },
            },
          }}
        >
          {slides.map((Component, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center h-auto"
            >
              <div className="w-full max-w-[320px] mx-auto">{Component}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}