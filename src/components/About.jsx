import CyberTitle from "./CyberTitle";
import ContentScrollFade from "./ContentScrollFade";

export default function About({ content, presetId }) {
  const about = content?.about || {};
  const isPreset2 = presetId === "preset-2";
  const tagline = about.tagline !== undefined ? about.tagline : (isPreset2 ? "About Me" : "Background & Philosophy");
  const heading = about.heading !== undefined ? about.heading : (isPreset2 ? "Get to know me better" : "Engineering with clarity and intention.");
  const p1 = about.paragraph1 !== undefined ? about.paragraph1 : (isPreset2 ? "I'm a frontend-focused Software Engineer at Bloggers Bracket with hands-on production experience building responsive React.js web applications, component architectures, and intuitive digital interfaces." : "I am a Full Stack Engineer dedicated to producing fast, accessible, and scalable web software. My focus centers on modern JavaScript, React, Next.js, and cloud-native database architectures.");
  const p2 = about.paragraph2 !== undefined ? about.paragraph2 : (isPreset2 ? "Comfortable owning UI features end-to-end across e-commerce, dashboard, and web platforms, with a focus on clean component patterns, state management, REST API integration, and pixel-accurate design." : "Rather than treating styling and backend as separate concerns, I engineer applications from database schema to pixel-perfect component rendering, ensuring every layer is maintainable, solo-operable, and crawlable by search engines.");

  const profileName = about.profileName || "Muhammad Waqar";
  const profileLocation = about.profileLocation || "Pakistan";
  const profileEmail = about.profileEmail || "muhammadwaqar7615@gmail.com";
  const profileExperience = about.profileExperience || (isPreset2 ? "2 Years Experience" : "2+ Years (Frontend Software Engineer)");

  // Editorial Preset 2 Layout (Matches ref img1)
  // Pixel-by-pixel Abhay Rana About section for Preset 2
  if (isPreset2) {
    return (
      <section
        id="about"
        aria-label="About and background"
        className="py-20 md:py-28 px-4 md:px-6 relative z-10"
      >
        <div className="mx-auto max-w-4xl">
          {/* Section Heading with red dot */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#fafafa]">
              {tagline.replace(" ────", "")}
              <span className="text-red-500">.</span>
            </h2>
            <p className="mt-3 text-lg text-[#a1a1aa]">{heading}</p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 items-center">
            {/* Left Column: Rounded Profile Container with Red/Orange Glow */}
            <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group shadow-2xl">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 blur-xl opacity-60 z-0 pointer-events-none" />
              <div className="relative z-10 w-full h-full">
                <img
                  src="/my-img.png"
                  alt="Muhammad Waqar"
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dot indicator matching reference */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  <span className="h-2 rounded-full transition-all duration-300 bg-white w-6" />
                  <span className="h-2 rounded-full transition-all duration-300 bg-white/40 w-2" />
                </div>
              </div>
            </div>

            {/* Right Column: Conversational Bio & 2x2 Metric Grid */}
            <div>
              <p className="text-[#a1a1aa] leading-relaxed text-base font-light">
                {p1}
              </p>
              {p2 && (
                <p className="text-[#a1a1aa] leading-relaxed text-base font-light mt-4">
                  {p2}
                </p>
              )}

              {/* 2x2 Bento Stat Grid */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="glass rounded-xl p-4 text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] border border-white/10">
                  <p className="text-2xl font-bold font-mono text-[#fafafa]">{about.stat1Value || "2+"}</p>
                  <p className="text-xs sm:text-sm text-[#a1a1aa]/70 mt-1">{about.stat1Label || "Years Experience"}</p>
                </div>

                <div className="glass rounded-xl p-4 text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] border border-white/10">
                  <p className="text-2xl font-bold font-mono text-[#fafafa]">{about.stat2Value || "6+"}</p>
                  <p className="text-xs sm:text-sm text-[#a1a1aa]/70 mt-1">{about.stat2Label || "Key Web Projects"}</p>
                </div>

                <div className="glass rounded-xl p-4 text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] border border-white/10">
                  <p className="text-2xl font-bold font-mono text-[#fafafa]">{about.stat3Value || "100%"}</p>
                  <p className="text-xs sm:text-sm text-[#a1a1aa]/70 mt-1">{about.stat3Label || "Pixel-Perfect UI"}</p>
                </div>

                <a
                  href="#projects"
                  className="glass rounded-xl p-4 text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] border border-white/10 group/card flex flex-col items-center justify-center cursor-pointer"
                >
                  <svg
                    className="w-6 h-6 text-red-400 group-hover/card:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  <p className="text-xs sm:text-sm text-[#a1a1aa]/70 mt-1 font-medium">{about.stat4Label || "Clean Code Architecture"}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section
      id="about"
      aria-label="About and background"
      data-editable="background"
      className="py-24 sm:py-32 border-b border-white/[0.08] relative"
    >
      <div className="editorial-container relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
          {/* Left Column: Sticky Title */}
          <div className="w-full lg:w-5/12 sticky top-16 lg:top-28 self-start z-30 bg-background/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none py-3 lg:py-0 border-b border-black/[0.06] dark:border-white/[0.08] lg:border-none transition-all">
            <CyberTitle
              title="ABOUT"
              subtitle="ME"
              subtext="Engineering with clarity, speed, and uncompromising attention to detail."
            />
            {/* Soft gradient dissolve for content scrolling under the sticky heading on mobile */}
            <div
              className="pointer-events-none absolute left-0 right-0 -bottom-10 h-10 bg-gradient-to-b from-background via-background/70 to-transparent lg:hidden"
              aria-hidden="true"
            />
            {/* Quick Stats Pill */}
            <div className="hidden lg:flex flex-col gap-3 pr-6">
              <div className="p-4 rounded-xl border border-[#1fc3ff]/20 bg-[#1fc3ff]/[0.04] backdrop-blur-md">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#1fc3ff] font-opensans block mb-1">
                  CURRENT FOCUS
                </span>
                <p className="text-xs text-slate-300 font-opensans leading-relaxed">
                  Next.js App Router, Scalable Full-Stack Systems, and Database Architectures
                </p>
              </div>
              <div className="p-4 rounded-xl border border-white/[0.06] bg-black/40 backdrop-blur-md">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 font-opensans block mb-1">
                  STATUS
                </span>
                <p className="text-xs text-slate-300 font-opensans leading-relaxed">
                  Available for Full-time Roles & High-Impact Engineering Projects
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Cyber Translucent Glass Card */}
          <ContentScrollFade className="lg:w-7/12">
            <div className="cyber-glow-card p-6 sm:p-10 space-y-6">
              {/* Heading */}
              <h3 className="text-xl sm:text-2xl font-bold text-white font-fugaz tracking-tight leading-snug">
                {heading || "Building quality web experiences with code and creativity."}
              </h3>

              {/* Bio Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-slate-300 font-opensans leading-relaxed font-normal">
                <p data-editable="content-about-paragraph1">
                  {p1 ||
                    "I'm a passionate Full Stack Web Developer who loves turning ideas into real, functional and user-friendly web applications. I enjoy working with modern technologies and constantly learning new skills to stay ahead."}
                </p>
                <p data-editable="content-about-paragraph2">
                  {p2 ||
                    "Rather than treating styling and backend as separate concerns, I engineer applications from database schema to pixel-perfect component rendering, ensuring every layer is maintainable, solo-operable, and crawlable by search engines."}
                </p>
              </div>

              {/* Engineering Highlights / Badges */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                {[
                  { label: "Clean Code Architecture", icon: "</>" },
                  { label: "60fps Micro-Interactions", icon: "⚡" },
                  { label: "Full-Stack Scalability", icon: "🌐" },
                  { label: "Zero Layout Shift", icon: "📐" },
                ].map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1fc3ff]/[0.08] border border-[#1fc3ff]/30 text-white font-opensans shadow-[0_0_10px_rgba(31,195,255,0.08)]"
                  >
                    <span className="text-[#1fc3ff] font-bold">{badge.icon}</span>
                    <span>{badge.label}</span>
                  </span>
                ))}
              </div>

              {/* Profile Details Grid */}
              <div className="pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl border border-white/[0.06] bg-black/40">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block font-opensans">
                    Name
                  </span>
                  <span className="text-sm font-semibold text-white font-opensans">
                    {profileName}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-white/[0.06] bg-black/40">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block font-opensans">
                    Location
                  </span>
                  <span className="text-sm font-semibold text-white font-opensans">
                    {profileLocation} (Open Globally)
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-white/[0.06] bg-black/40">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block font-opensans">
                    Email
                  </span>
                  <a
                    href={`mailto:${profileEmail}`}
                    className="text-sm font-semibold text-[#1fc3ff] hover:underline font-opensans truncate block"
                  >
                    {profileEmail}
                  </a>
                </div>
                <div className="p-3.5 rounded-xl border border-white/[0.06] bg-black/40">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block font-opensans">
                    Experience
                  </span>
                  <span className="text-sm font-semibold text-white font-opensans">
                    {profileExperience}
                  </span>
                </div>
              </div>

              {/* Bottom Action CTA */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="cyber-floating-btn cyber-floating-btn-solid text-xs"
                >
                  <span>Get In Touch</span>
                  <span>→</span>
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-floating-btn text-xs"
                >
                  <span>Download CV</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </ContentScrollFade>
        </div>
      </div>
    </section>
  );
}
