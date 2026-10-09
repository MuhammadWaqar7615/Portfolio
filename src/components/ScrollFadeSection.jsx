"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ScrollFadeSection({ children, sectionId, presetId }) {
  const ref = useRef(null);
  const isPreset2 = presetId === "preset-2";

  const isHero = sectionId === "hero";
  const isContact = sectionId === "contact";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isHero
      ? ["start start", "end start"]
      : isContact
      ? ["start end", "center center"]
      : ["start end", "end start"],
  });

  // Hero: Starts at opacity 1, smoothly fades out towards top as user scrolls down
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45, 0.85], [1, 0.9, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.85], [0, -35]);

  // Intermediate sections: Smoothly fade in from bottom, stay visible, fade out when scrolling past top
  const standardOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const standardY = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [35, 0, 0, -35]);

  // Contact: Smoothly fades in from bottom, remains fully visible at the base of the page
  const contactOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 1, 1]);
  const contactY = useTransform(scrollYProgress, [0, 0.35, 1], [35, 0, 0]);

  const opacity = isHero ? heroOpacity : isContact ? contactOpacity : standardOpacity;
  const y = isHero ? heroY : isContact ? contactY : standardY;

  // For Preset 1, render normally without transform to preserve cyber sticky headers
  if (!isPreset2) {
    return <div className="w-full relative">{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="w-full relative transition-opacity duration-150"
    >
      {children}
    </motion.div>
  );
}
