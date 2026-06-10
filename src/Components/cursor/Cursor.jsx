import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

function Cursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const circleTargetX = useTransform(cursorX, (v) => v);
  const circleTargetY = useTransform(cursorY, (v) => v);

  const circleX = useSpring(circleTargetX, { stiffness: 250, damping: 26, mass: 0.7 });
  const circleY = useSpring(circleTargetY, { stiffness: 250, damping: 26, mass: 0.7 });

  useEffect(() => {
    cursorX.set(window.innerWidth / 2);
    cursorY.set(window.innerHeight / 2);

    const updatePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", updatePosition, { passive: true });
    return () => window.removeEventListener("mousemove", updatePosition);
  }, [cursorX, cursorY]);

  return (
    <>
      <style>{`
        * { cursor: none; }
        a, button, input, textarea, select, [role="button"] { cursor: none; }
      `}</style>

      <motion.div
        className="fixed z-[10000] pointer-events-none will-change-transform hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          left: 0,
          top: 0,
        }}
        transition={{ duration: 0 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="-3 -10 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ 
            transform: "rotate(45deg) scaleX(1.6)", 
            transformOrigin: "0 0" 
          }}
        >
          <defs>
            <linearGradient id="silverBent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#E8E8F2" />
              <stop offset="100%" stopColor="#C0C0D0" />
            </linearGradient>
            <filter id="bentGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Scaled-down polygon (original shape, ~75% size) */}
          <polygon
            points="0,0 12,-7.5 9,0 12,7.5"
            fill="url(#silverBent)"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="0.6"
            strokeLinejoin="round"
            filter="url(#bentGlow)"
          />
        </svg>
      </motion.div>

      {/* Smaller trailing circle */}
      <motion.div
        className="fixed z-[999] w-6 h-6 rounded-full border border-white/70 pointer-events-none will-change-transform shadow-[0_0_10px_rgba(255,255,255,0.4)] backdrop-blur-sm hidden md:block"
        style={{ x: circleX, y: circleY }}
      />
    </>
  );
}

export default Cursor;