export default function About({ content, presetId }) {
  const about = content?.about || {};
  const isPreset2 = presetId === "preset-2";
  const tagline = about.tagline !== undefined ? about.tagline : (isPreset2 ? "ABOUT ME ────" : "Background & Philosophy");
  const heading = about.heading !== undefined ? about.heading : (isPreset2 ? "Building quality web experiences with code and creativity." : "Engineering with clarity and intention.");
  const p1 = about.paragraph1 !== undefined ? about.paragraph1 : (isPreset2 ? "I'm a passionate Full Stack Web Developer who loves turning ideas into real, functional and user-friendly web applications. I enjoy working with modern technologies and constantly learning new skills to stay ahead." : "I am a Frontend & Full-Stack Engineer dedicated to producing fast, accessible, and scalable web software. My focus centers on modern JavaScript, React, Next.js, and cloud-native database architectures.");
  const p2 = about.paragraph2 !== undefined ? about.paragraph2 : "Rather than treating styling and backend as separate concerns, I engineer applications from database schema to pixel-perfect component rendering, ensuring every layer is maintainable, solo-operable, and crawlable by search engines.";

  // Editorial Preset 2 Layout (Matches ref img1)
  if (isPreset2) {
    return (
      <section
        id="about"
        aria-label="About and background"
        className="py-20 sm:py-24 bg-[#F2EEE5] text-[#191A17] border-b border-[#D3CEC2]"
      >
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Heading, Bio & Badges */}
            <div className="lg:col-span-5 space-y-6">
              {tagline?.trim() && (
                <span
                  data-editable="content-about-tagline"
                  className="text-xs font-semibold uppercase tracking-[3px] text-[#B19B7D] block cursor-pointer"
                  title="Click to edit about tagline"
                >
                  {tagline}
                </span>
              )}
              {heading?.trim() && (
                <h2
                  data-editable="content-about-heading"
                  className="text-3xl sm:text-4xl font-normal tracking-tight text-[#191A17] leading-[1.15] cursor-pointer"
                  style={{ fontFamily: "var(--font-heading)" }}
                  title="Click to edit about heading"
                >
                  {heading}
                </h2>
              )}
              {p1?.trim() && (
                <p
                  data-editable="content-about-paragraph1"
                  className="text-sm text-[#5F5E57] leading-relaxed cursor-pointer"
                  title="Click to edit about paragraph"
                >
                  {p1}
                </p>
              )}
              {/* Badges row */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8E2D6] border border-[#D3CEC2] text-xs font-medium text-[#191A17]">
                  <span className="text-[#69745A] font-mono font-bold">&lt;/&gt;</span> Clean Code
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8E2D6] border border-[#D3CEC2] text-xs font-medium text-[#191A17]">
                  <span>💡</span> Problem Solver
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8E2D6] border border-[#D3CEC2] text-xs font-medium text-[#191A17]">
                  <span>👥</span> Team Player
                </span>
              </div>
            </div>

            {/* Middle Column: Workspace Laptop Photo */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="rounded-[10px] overflow-hidden border border-[#D3CEC2] shadow-md w-full max-w-sm">
                <img
                  src="/about_workspace.jpg"
                  alt="Developer workspace with laptop and notebook"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Column: Profile Details Card */}
            <div className="lg:col-span-3">
              <div className="bg-[#ECE7DC] border border-[#D3CEC2] rounded-[10px] p-6 space-y-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D8B894]/20 flex items-center justify-center text-[#69745A] flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#77766D] uppercase tracking-wider block">Name</span>
                    <span className="text-sm font-medium text-[#191A17]">Muhammad Waqar</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D8B894]/20 flex items-center justify-center text-[#69745A] flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#77766D] uppercase tracking-wider block">Location</span>
                    <span className="text-sm font-medium text-[#191A17]">Pakistan</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D8B894]/20 flex items-center justify-center text-[#69745A] flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#77766D] uppercase tracking-wider block">Email</span>
                    <a href="mailto:muhammadwaqar7615@gmail.com" className="text-sm font-medium text-[#191A17] hover:text-[#69745A] break-all">
                      muhammadwaqar7615@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D8B894]/20 flex items-center justify-center text-[#69745A] flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#77766D] uppercase tracking-wider block">Experience</span>
                    <span className="text-sm font-medium text-[#191A17]">1+ Year (Freelance / Personal Projects)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const rawPrinciples = about.principles && Array.isArray(about.principles) && about.principles.length > 0
    ? about.principles
    : [
        {
          label: "PRINCIPLE 01 // ARCHITECTURE",
          title: "Resilient & Scalable Systems",
          description:
            "Building modular, decoupled component systems and clean data flows that grow effortlessly with product complexity without accumulating technical debt.",
        },
        {
          label: "PRINCIPLE 02 // PERFORMANCE",
          title: "Sub-Second Latency & Zero FOUC",
          description:
            "Prioritizing Core Web Vitals, server-side caching, aggressive font optimization, and minimal layout shifts to deliver immediate user responsiveness.",
        },
        {
          label: "PRINCIPLE 03 // CRAFTSMANSHIP",
          title: "Pixel Precision & Ergonomics",
          description:
            "Designing accessible, responsive interfaces with strict adherence to typographic scale, contrast ratios, and purposeful micro-interactions.",
        },
      ];

  const hasPrinciples = rawPrinciples.some(p => p.label?.trim() || p.title?.trim() || p.description?.trim());

  return (
    <section
      id="about"
      aria-label="About and engineering principles"
      data-editable="background"
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      <div className="editorial-container">
        <div className={`grid grid-cols-1 ${hasPrinciples ? "lg:grid-cols-12" : ""} gap-12 items-start`}>
          {/* Section Heading & Bio */}
          <div className={`${hasPrinciples ? "lg:col-span-5" : "w-full"} space-y-6`}>
            {tagline?.trim() ? (
              <span
                data-editable="content-about-tagline"
                className="text-xs font-mono uppercase tracking-[0.2em] text-accent cursor-pointer"
                title="Click to edit about tagline"
              >
                {tagline}
              </span>
            ) : null}

            {heading?.trim() ? (
              <h2
                data-editable="content-about-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-heading)] cursor-pointer"
                style={{ fontFamily: "var(--font-heading)" }}
                title="Click to edit about heading"
              >
                {heading}
              </h2>
            ) : null}

            {(p1?.trim() || p2?.trim()) && (
              <div
                className="space-y-4 text-[var(--color-text)] text-sm sm:text-base leading-relaxed font-light opacity-90"
              >
                {p1?.trim() ? (
                  <p
                    data-editable="content-about-paragraph1"
                    className="cursor-pointer"
                    title="Click to edit paragraph 1"
                  >
                    {p1}
                  </p>
                ) : null}
                {p2?.trim() ? (
                  <p
                    data-editable="content-about-paragraph2"
                    className="cursor-pointer"
                    title="Click to edit paragraph 2"
                  >
                    {p2}
                  </p>
                ) : null}
              </div>
            )}
          </div>

          {/* Core Principles Grid */}
          {hasPrinciples && (
            <div className="lg:col-span-7 space-y-6">
              {rawPrinciples.map((p, idx) => {
                if (!p.label?.trim() && !p.title?.trim() && !p.description?.trim()) return null;
                return (
                  <div
                    key={p.label || idx}
                    data-editable="radius"
                    className="border border-white/[0.08] bg-cardBg p-6 sm:p-8"
                    style={{ borderRadius: "var(--radius-card)" }}
                  >
                    {p.label?.trim() ? (
                      <span
                        data-editable={`content-about-principle-${idx}-label`}
                        className="text-[11px] font-mono tracking-widest text-accent cursor-pointer"
                        title="Click to edit principle label"
                      >
                        {p.label}
                      </span>
                    ) : null}
                    {p.title?.trim() ? (
                      <h3
                        data-editable={`content-about-principle-${idx}-title`}
                        className="text-xl font-bold text-[var(--color-heading)] mt-1 mb-2 cursor-pointer"
                        style={{ fontFamily: "var(--font-heading)" }}
                        title="Click to edit principle title"
                      >
                        {p.title}
                      </h3>
                    ) : null}
                    {p.description?.trim() ? (
                      <p
                        data-editable={`content-about-principle-${idx}-description`}
                        className="text-sm text-[var(--color-text)] opacity-75 leading-relaxed font-light cursor-pointer"
                        title="Click to edit principle description"
                      >
                        {p.description}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
