export default function Footer({ content, presetId }) {
  const currentYear = new Date().getFullYear();
  const heroName = content?.hero?.name || "Muhammad Waqar";
  const footerData = content?.footer || {};
  const isPreset2 = presetId === "preset-2";
  const builtWithText = footerData.builtWithText !== undefined ? footerData.builtWithText : (isPreset2 ? `© ${currentYear} Muhammad Waqar. All rights reserved.` : "BUILT WITH NEXT.JS APP ROUTER · TAILWIND CSS · MONGOOSE");

  if (isPreset2) {
    return (
      <footer
        aria-label="Portfolio Footer"
        data-editable="background"
        className="py-12 bg-[#0a0a0a] border-t border-zinc-900 text-sm text-zinc-400 relative z-20"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="text-lg font-bold tracking-tight text-white">
              Muhammad<span className="text-red-500">.</span>
            </span>
            <span className="hidden sm:inline-block text-zinc-700">|</span>
            <p className="text-xs text-zinc-400 font-mono">
              © {currentYear} Muhammad Waqar. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-400 font-medium">
            <a
              href="https://github.com/MuhammadWaqar7615"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/muhammad-waqar-7615"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400 transition-colors"
            >
              Resume
            </a>
            <a
              href="#Homepage"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors ml-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800"
            >
              <span>Back to Top</span>
              <span className="text-red-500">↑</span>
            </a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      aria-label="Portfolio Footer"
      data-editable="background"
      className="py-12 bg-[#06090e]/90 border-t border-white/[0.08] relative z-10"
    >
      <div className="editorial-container flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-opensans text-slate-300">
        <div>
          <p className="font-fugaz text-white tracking-wider text-sm">
            © {currentYear} {heroName.toUpperCase()}. ALL RIGHTS RESERVED.
          </p>
          {builtWithText?.trim() ? (
            <p
              data-editable="content-footer-builtWithText"
              className="text-[11px] text-[#1fc3ff] mt-1 cursor-pointer font-opensans font-semibold"
              title="Click to edit footer subtext"
            >
              {builtWithText}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
          <a
            href="https://github.com/MuhammadWaqar7615"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1fc3ff] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/muhammad-waqar-7615"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1fc3ff] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1fc3ff] transition-colors"
          >
            Resume (PDF)
          </a>
          <a
            href="#Homepage"
            className="text-[#1fc3ff] hover:brightness-125 transition-all font-fugaz uppercase ml-2 flex items-center gap-1"
          >
            <span>↑ Back to Top</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
