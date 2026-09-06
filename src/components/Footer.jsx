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
        className="py-10 bg-[#0D0F0D] border-t border-[#383A33] text-xs text-[#77766D]"
      >
        <div className="editorial-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif italic text-lg text-[#E8B58F]">MW</span>
            <span className="hidden sm:inline-block text-[#F2EEE5] text-xs font-medium tracking-wider">Muhammad Waqar</span>
          </div>
          <p className="text-xs text-[#77766D]">
            {builtWithText}
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer
      aria-label="Portfolio Footer"
      data-editable="background"
      className="py-12 bg-cardBg border-t border-white/[0.08]"
    >
      <div className="editorial-container flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-[var(--color-text)] opacity-70">
        <div>
          <p>© {currentYear} {heroName.toUpperCase()}. ALL RIGHTS RESERVED.</p>
          {builtWithText?.trim() ? (
            <p
              data-editable="content-footer-builtWithText"
              className="text-[11px] opacity-60 mt-1 cursor-pointer hover:text-accent transition-colors"
              title="Click to edit footer subtext"
            >
              {builtWithText}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-6 text-xs">
          <a
            href="https://github.com/MuhammadWaqar7615"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 transition-opacity"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/muhammad-waqar-7615"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 transition-opacity"
          >
            LinkedIn
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 transition-opacity"
          >
            Resume (PDF)
          </a>
          <a
            href="#Homepage"
            data-editable="accent"
            className="text-accent hover:opacity-80 transition-opacity ml-4"
          >
            ↑ Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
}
