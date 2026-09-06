export default function Hero() {
  return (
    <section
      id="Homepage"
      aria-label="Hero introduction"
      className="relative min-h-[90vh] flex flex-col justify-center border-b border-white/[0.08] editorial-noise overflow-hidden py-16 sm:py-24"
    >
      <div className="editorial-container relative z-10 w-full">
        {/* Top Editorial Index Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 mb-8 text-xs font-mono uppercase tracking-[0.2em] text-gray-400">
          <span>PORTFOLIO EDITION // 2026</span>
          <span>SPECIALIZATION: FRONTEND & FULL-STACK SYSTEMS</span>
          <span>BASED IN PAKISTAN — OPEN GLOBALLY</span>
        </div>

        {/* Asymmetric Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Editorial Column (Span 8) */}
          <div className="lg:col-span-8 flex flex-col">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-accent uppercase mb-3">
              Software Engineer & Interface Craftsman
            </span>

            {/* Exactly ONE Semantic H1 for the page */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]">
              Muhammad <br />
              <span className="italic font-serif font-normal text-gray-300">
                Waqar
              </span>
            </h1>

            <p className="mt-8 text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl font-light">
              I engineer resilient frontend architectures, intuitive user interfaces,
              and full-stack web applications with React, Next.js, and modern TypeScript.
              Bridging design precision with performance-driven engineering.
            </p>

            {/* Direct Action Anchors */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#featured-work"
                className="px-7 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-sky-400 hover:text-black transition-all duration-200"
              >
                Explore Selected Work ↓
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white hover:bg-white/5 transition-all duration-200"
              >
                Initiate Conversation →
              </a>
            </div>
          </div>

          {/* Editorial Side Panel (Span 4) — Replaces the fake terminal widget */}
          <div className="lg:col-span-4 flex flex-col border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-8 lg:pt-0 lg:pl-10 space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-gray-500">
                Current Focus
              </span>
              <p className="text-sm text-gray-200 font-medium">
                Next.js SSR/ISR, React Server Components, and Scalable Full-Stack Systems
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-gray-500">
                Core Stack
              </span>
              <p className="text-sm text-gray-200 font-medium">
                React, Next.js, Node.js, Express, MongoDB, Tailwind CSS
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-gray-500">
                Engineering Philosophy
              </span>
              <p className="text-sm text-gray-400 leading-relaxed text-xs">
                Zero bloated abstractions. Semantic HTML, fast first-byte rendering, accessible UI patterns, and maintainable data models.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-gray-400">
              <span>Status</span>
              <span className="text-emerald-400 font-medium">Active & Open to Opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
