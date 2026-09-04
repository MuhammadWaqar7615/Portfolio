export default function About() {
  const principles = [
    {
      label: "PRINCIPLE // 01",
      title: "Resilient Architecture",
      description:
        "Building UI systems that degrade gracefully, handle network latencies with optimistic updates, and isolate failure states through defensive typing and error boundaries.",
    },
    {
      label: "PRINCIPLE // 02",
      title: "Performance by Default",
      description:
        "Prioritizing Core Web Vitals targets from first build: zero layout shift (CLS < 0.1), minimal interaction latency (INP < 200ms), and lightweight asset budgets.",
    },
    {
      label: "PRINCIPLE // 03",
      title: "Full-Stack Integration",
      description:
        "Bridging frontend interactivity with performant backend pipelines—authoring clean MongoDB schemas, Next.js serverless route handlers, and secure token authorization.",
    },
  ];

  return (
    <section
      id="about"
      aria-label="About and engineering principles"
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Section Heading & Bio */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-sky-400">
              Background & Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Engineering with clarity and intention.
            </h2>
            <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              <p>
                I am a Frontend & Full-Stack Engineer dedicated to producing fast, accessible,
                and scalable web software. My focus centers on modern JavaScript, React, Next.js,
                and cloud-native database architectures.
              </p>
              <p>
                Rather than treating styling and backend as separate concerns, I engineer
                applications from database schema to pixel-perfect component rendering, ensuring
                every layer is maintainable, solo-operable, and crawlable by search engines.
              </p>
            </div>
          </div>

          {/* Core Principles Grid */}
          <div className="lg:col-span-7 space-y-6">
            {principles.map((p) => (
              <div
                key={p.label}
                className="border border-white/[0.08] bg-[#0C0E14] p-6 sm:p-8"
              >
                <span className="text-[11px] font-mono tracking-widest text-sky-400">
                  {p.label}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
