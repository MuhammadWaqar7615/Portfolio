export default function Hero({ content, presetId }) {
  const hero = content?.hero || {};
  const isPreset2 = presetId === "preset-2";
  const edition = hero.edition !== undefined ? hero.edition : (isPreset2 ? "HI, I'M" : "PORTFOLIO EDITION // 2026");
  const specialization = hero.specialization !== undefined ? hero.specialization : "SPECIALIZATION: FULL-STACK SYSTEMS";
  const location = hero.location !== undefined ? hero.location : (isPreset2 ? "Turning Ideas into Digital Solutions" : "BASED IN PAKISTAN — OPEN GLOBALLY");
  const roleTag = hero.roleTag !== undefined ? hero.roleTag : (isPreset2 ? "FULL STACK WEB DEVELOPER" : "Software Engineer & Interface Craftsman");
  const name = hero.name !== undefined ? hero.name : "Muhammad Waqar";
  const bio = hero.bio !== undefined ? hero.bio : (isPreset2 ? "I build modern, scalable and high-performance web applications that solve real problems and deliver great user experiences." : "I engineer resilient frontend architectures, intuitive user interfaces, and full-stack web applications with React, Next.js, and modern TypeScript. Bridging design precision with performance-driven engineering.");
  const buttonPrimary = hero.buttonPrimary !== undefined ? hero.buttonPrimary : (isPreset2 ? "View My Projects →" : "Explore Selected Work ↓");
  const buttonSecondary = hero.buttonSecondary !== undefined ? hero.buttonSecondary : (isPreset2 ? "Get In Touch" : "Initiate Conversation →");
  const currentFocus = hero.currentFocus !== undefined ? hero.currentFocus : "Next.js SSR/ISR, React Server Components, and Scalable Full-Stack Systems";
  const coreStack = hero.coreStack !== undefined ? hero.coreStack : "React, Next.js, Node.js, Express, MongoDB, Tailwind CSS";
  const philosophy = hero.philosophy !== undefined ? hero.philosophy : "Zero bloated abstractions. Semantic HTML, fast first-byte rendering, accessible UI patterns, and maintainable data models.";
  const status = hero.status !== undefined ? hero.status : "Active & Open to Opportunities";

  // Split name for artistic layout if two words
  const displayName = name || "Muhammad Waqar";
  const nameParts = displayName.trim().split(" ");
  const firstName = nameParts[0] || displayName;
  const restName = nameParts.slice(1).join(" ");

  // Editorial Preset 2 Layout (Matches reference image)
  if (isPreset2) {
    return (
      <section
        id="Homepage"
        aria-label="Hero introduction"
        data-editable="background"
        className="relative bg-[#151713] text-[#F4F0E8] pt-12 pb-16 border-b border-[#383A33] overflow-hidden"
      >
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              {edition?.trim() && (
                <span
                  data-editable="content-hero-edition"
                  className="text-xs uppercase tracking-[3px] text-[#B19B7D] font-medium"
                >
                  {edition}
                </span>
              )}

              {/* Editorial H1 */}
              <h1
                data-editable="content-hero-name"
                className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#F4F0E8] leading-[1.0] cursor-pointer"
                style={{ fontFamily: "var(--font-heading)" }}
                title="Click to edit name"
              >
                {firstName} <br />
                {restName && (
                  <span className="text-[#E8B58F]">
                    {restName}
                  </span>
                )}
              </h1>

              {/* Subtitle */}
              {roleTag?.trim() && (
                <span
                  data-editable="content-hero-roleTag"
                  className="text-xs sm:text-sm font-semibold tracking-[4px] uppercase text-[#D8B894]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {roleTag}
                </span>
              )}

              {/* Bio */}
              {bio?.trim() && (
                <p
                  data-editable="content-hero-bio"
                  className="text-base text-[#C5C4BC] leading-relaxed max-w-xl font-light"
                >
                  {bio}
                </p>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-5">
                {buttonPrimary?.trim() && (
                  <a
                    href="#featured-work"
                    data-editable="content-hero-buttonPrimary"
                    className="px-6 py-3 bg-[#E8B58F] text-[#151713] font-semibold text-xs rounded-full hover:brightness-105 transition-all shadow-sm"
                  >
                    {buttonPrimary}
                  </a>
                )}
                {buttonSecondary?.trim() && (
                  <a
                    href="#contact"
                    data-editable="content-hero-buttonSecondary"
                    className="px-6 py-3 border border-[#77766D] text-[#F2EEE5] hover:text-[#D8B894] hover:border-[#D8B894] transition-colors text-xs rounded-full"
                  >
                    {buttonSecondary}
                  </a>
                )}
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative rounded-[10px] overflow-hidden border border-[#383A33] shadow-2xl max-w-lg w-full">
                <img
                  src="/my-img.png"
                  alt="Muhammad Waqar at workspace"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bottom Social Strip */}
          <div className="mt-14 pt-6 border-t border-[#383A33] flex flex-wrap items-center justify-between gap-4 text-xs text-[#77766D]">
            <div className="flex items-center gap-5 text-[#C5C4BC]">
              <a href="https://github.com/MuhammadWaqar7615" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8B58F] transition-colors" aria-label="GitHub">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              </a>
              <a href="https://linkedin.com/in/muhammad-waqar-7615" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8B58F] transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" /></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8B58F] transition-colors" aria-label="X (Twitter)">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-10 h-[1px] bg-[#383A33]"></span>
              <span className="text-xs uppercase tracking-[2px] text-[#B19B7D] font-medium">
                {location || "Turning Ideas into Digital Solutions"}
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="Homepage"
      aria-label="Hero introduction"
      data-editable="background"
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center border-b border-white/[0.08] overflow-hidden py-24 sm:py-32"
    >
      {/* Ambient Radial Cyan Glow */}
      <div className="cyber-blur-glow top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* Availability Badge */}
        {status?.trim() && (
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#1fc3ff]/40 bg-[#1fc3ff]/10 text-[#1fc3ff] text-xs font-semibold mb-8 shadow-[0_0_15px_rgba(31,195,255,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1fc3ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1fc3ff]"></span>
            </span>
            <span
              data-editable="content-hero-status"
              className="cursor-pointer tracking-widest uppercase font-opensans"
              title="Click to edit status"
            >
              {status}
            </span>
          </div>
        )}

        {/* Role Tagline */}
        <span
          data-editable="content-hero-roleTag"
          className="text-xs sm:text-sm font-bold tracking-[4px] uppercase text-white/90 mb-3 font-opensans"
          title="Click to edit role tag"
        >
          {roleTag || "FULL STACK WEB DEVELOPER"}
        </span>

        {/* Giant Name in Fugaz One */}
        <h1
          data-editable="content-hero-name"
          className="font-fugaz text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#1fc3ff] leading-[1.02] tracking-tight my-2 drop-shadow-[0_0_28px_rgba(31,195,255,0.45)] cursor-pointer select-none"
          title="Click to edit name"
        >
          {name || "Muhammad Waqar"}
        </h1>

        {/* Specialization / Subtitle */}
        <p className="mt-3 text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-white/80 font-fugaz">
          {specialization || "TURNING IDEAS INTO DIGITAL SOLUTIONS"}
        </p>

        {/* Bio */}
        {bio?.trim() && (
          <p
            data-editable="content-hero-bio"
            className="mt-6 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal font-opensans cursor-pointer"
            title="Click to edit intro bio"
          >
            {bio}
          </p>
        )}

        {/* Floating Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          {buttonPrimary?.trim() && (
            <a
              href="#featured-work"
              data-editable="content-hero-buttonPrimary"
              className="cyber-floating-btn cyber-floating-btn-solid"
              title="Click to edit primary button"
            >
              <span>{buttonPrimary.replace(/[↓→]/g, "").trim()}</span>
              <span>↓</span>
            </a>
          )}
          {buttonSecondary?.trim() && (
            <a
              href="#contact"
              data-editable="content-hero-buttonSecondary"
              className="cyber-floating-btn"
              title="Click to edit secondary button"
            >
              <span>{buttonSecondary.replace(/[↓→]/g, "").trim()}</span>
              <span>→</span>
            </a>
          )}
        </div>

        {/* Core Stack Strip */}
        {coreStack?.trim() && (
          <div className="mt-14 pt-8 border-t border-white/[0.08] w-full flex flex-col items-center gap-3 text-xs">
            <span className="text-slate-400 font-semibold tracking-[3px] text-[11px] uppercase font-opensans">
              Core Technologies
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {coreStack.split(",").map((tech) => (
                <span
                  key={tech.trim()}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1fc3ff]/[0.06] border border-[#1fc3ff]/30 text-white hover:border-[#1fc3ff] hover:bg-[#1fc3ff]/[0.12] transition-all shadow-[0_0_10px_rgba(31,195,255,0.1)] font-opensans"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

