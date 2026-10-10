"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ContentScrollFade({
  children,
  className = "",
  isTop = false,
  isBottom = false,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isTop
      ? ["start start", "end start"]
      : isBottom
      ? ["start end", "center center"]
      : ["start end", "end start"],
  });

  // Top hero content: Starts at 1, smoothly fades out as scrolling down
  const topOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.85, 0.1]);

  // Bottom contact/final content: Smoothly fades in from bottom, stays fully visible once reached
  const bottomOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.15, 1, 1]);

  // Section content: Smoothly fades in as entering from bottom, stays full opacity in viewing area,
  // then smoothly fades out as it travels up towards the sticky heading / top
  const standardOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.58, 0.84],
    [0.15, 1, 1, 0.15]
  );

  const opacity = isTop
    ? topOpacity
    : isBottom
    ? bottomOpacity
    : standardOpacity;

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

