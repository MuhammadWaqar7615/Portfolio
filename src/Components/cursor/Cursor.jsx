import { useEffect } from "react";
import { motion, useMotionValue } from "motion/react";

function Cursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    x.set(window.innerWidth / 2);
    y.set(window.innerHeight / 2);

    const updatePosition = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", updatePosition, { passive: true });
    return () => window.removeEventListener("mousemove", updatePosition);
  }, [x, y]);

  return (
    <motion.div
      className="fixed z-[999] w-6 h-6 rounded-full border border-white pointer-events-none will-change-transform shadow-[0_0_12px_rgba(255,255,255,0.4)] backdrop-blur-sm hidden md:block"
      style={{ x, y }}
      transition={{
        type: "spring",
        stiffness: 300,   // lower = more fluid, less twitchy
        damping: 28,      // prevents oscillation
        mass: 0.6         // lighter = quicker response but still smooth
      }}
    />
  );
}

export default Cursor;