import { useEffect, useRef } from "react";

function Cursor() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef([]);
  const particlesRef = useRef([]);
  const sparklesRef = useRef([]);
  const rafRef = useRef(null);
  const themeRef = useRef("dark");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;

    // FIX: Handle High DPI screens so it doesn't look tiny/blurry
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    // Theme detection
    const detectTheme = () => {
      const root = document.documentElement;
      if (
        root.classList.contains("dark") ||
        root.getAttribute("data-theme") === "dark" ||
        root.classList.contains("theme-dark")
      ) {
        themeRef.current = "dark";
      } else if (
        root.classList.contains("light") ||
        root.getAttribute("data-theme") === "light" ||
        root.classList.contains("theme-light")
      ) {
        themeRef.current = "light";
      } else {
        themeRef.current = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
    };

    detectTheme();

    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => detectTheme();
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    let lastX = 0;
    let lastY = 0;
    let isFirstMove = true;

    const onMouseMove = (e) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      
      mouseRef.current = { x: currentX, y: currentY };

      if (!isFirstMove) {
        const dx = currentX - lastX;
        const dy = currentY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const maxGap = 1.0; 
        const steps = Math.ceil(distance / maxGap);
        
        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          trailRef.current.push({
            x: lastX + dx * t,
            y: lastY + dy * t,
            age: 0,
            maxAge: 15, // INCREASED: Trail thori lambi hogi (pehle 6 tha)
            size: 12,   // INCREASED: Trail kafi moti hogi (pehle 6 tha)
          });
        }
      } else {
        isFirstMove = false;
      }
      
      lastX = currentX;
      lastY = currentY;

      if (Math.random() > 0.85) {
        sparklesRef.current.push({
          x: currentX + (Math.random() - 0.5) * 12,
          y: currentY + (Math.random() - 0.5) * 12,
          life: 1,
          decay: 0.05 + Math.random() * 0.03,
          size: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const onClick = (e) => {
      const isDark = themeRef.current === "dark";
      for (let i = 0; i < 25; i++) {
        const angle = (Math.PI * 2 * i) / 25;
        const speed = Math.random() * 5 + 2;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.02 + Math.random() * 0.02,
          size: Math.random() * 3 + 1.5,
          color: isDark
            ? `hsl(${Math.random() * 60 + 200}, 100%, 70%)`
            : `hsl(${Math.random() * 60 + 220}, 80%, 50%)`,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const isDark = themeRef.current === "dark";

      const cursorColor = isDark ? "255, 255, 255" : "30, 30, 30";
      const trailColor = isDark ? "255, 255, 255" : "30, 30, 30";
      const glowColor = isDark ? "168, 85, 247" : "99, 102, 241";
      const sparkleColor = isDark ? "255, 255, 255" : "30, 30, 30";

      const trail = trailRef.current;

      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        p.age++;

        const progress = p.age / p.maxAge;
        
        let size = p.size;
        let alpha = 1;

        if (progress > 0.4) {
          const fadeProgress = (progress - 0.4) / 0.6;
          size = p.size * (1 - fadeProgress);
          alpha = 1 - fadeProgress;
        }

        if (size > 0.1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${trailColor}, ${alpha})`;
          ctx.fill();
        }
      }

      trailRef.current = trail.filter((p) => p.age < p.maxAge);

      // Draw sparkles
      const sparkles = sparklesRef.current;
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.life -= s.decay;

        if (s.life > 0) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${sparkleColor}, ${s.life})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${sparkleColor}, ${s.life})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      sparklesRef.current = sparkles.filter((s) => s.life > 0);

      // Draw main cursor
      const cursorSize = 14; // INCREASED: Cursor ab bara hai (pehle 8 tha)
      const cursorAlpha = 1;

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, cursorSize * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${glowColor}, ${cursorAlpha * 0.2})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, cursorSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${cursorColor}, ${cursorAlpha})`;
      ctx.shadowBlur = 15;
      ctx.shadowColor = `rgba(${cursorColor}, 0.6)`;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(
        mouse.x - cursorSize * 0.3,
        mouse.y - cursorSize * 0.3,
        cursorSize * 0.4,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(${cursorColor}, ${cursorAlpha * 0.5})`;
      ctx.fill();

      // Draw explosion particles
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.vx *= 0.98;
        p.life -= p.decay;

        if (p.life > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${p.life * 80})`);
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      particlesRef.current = particles.filter((p) => p.life > 0);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ cursor: "none" }}
    />
  );
}

export default Cursor;