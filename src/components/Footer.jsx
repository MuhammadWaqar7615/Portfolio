export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Portfolio Footer"
      className="py-12 bg-[#06070A] border-t border-white/[0.08]"
    >
      <div className="editorial-container flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-gray-400">
        <div>
          <p>© {currentYear} MUHAMMAD WAQAR. ALL RIGHTS RESERVED.</p>
          <p className="text-[11px] text-gray-500 mt-1">
            BUILT WITH NEXT.JS APP ROUTER · TAILWIND CSS · MONGOOSE
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <a
            href="https://github.com/MuhammadWaqar7615"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/muhammad-waqar-7615"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Resume (PDF)
          </a>
          <a
            href="#Homepage"
            className="text-sky-400 hover:text-sky-300 transition-colors ml-4"
          >
            ↑ Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
}
