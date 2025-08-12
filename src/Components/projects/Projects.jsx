import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'motion/react';

import GmailClone from './projName/GmailClone';
import TransactionSite from './projName/TransactionSite';
import EcommerceSite from './projName/EcommerceSite';
import BakerySite from './projName/BakerySite';
import InstagramClone from './projName/InstagramClone';

const variants = {
    initial: {
        y: 500,
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

export default function Projects() {
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
    <section className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div className="relative w-full max-w-6xl mx-auto" variants={variants} initial="initial" whileInView="animate" viewport={{ once: true }}>

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
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="pt-10"
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
              className="flex justify-center items-center"
            >
              <div className="w-[300px] mx-auto sm:mx-0">{Component}</div>
            </SwiperSlide>
          ))}

        </Swiper>
      </motion.div>
    </section>
  );
}
