import ThemeSwitch from "../../components/ThemeSwitch";

export const metadata = {
  title: "Resume & Professional Credentials — Muhammad Waqar",
  description:
    "Curriculum Vitae and verified technical background of Muhammad Waqar, Frontend & Full-Stack Engineer.",
  alternates: {
    canonical: "https://muhammad-waqar.me/resume",
  },
  openGraph: {
    title: "Resume & Credentials — Muhammad Waqar",
    description:
      "Curriculum Vitae and verified technical background of Muhammad Waqar, Frontend & Full-Stack Engineer.",
    url: "https://muhammad-waqar.me/resume",
    type: "profile",
    images: [
      {
        url: "https://muhammad-waqar.me/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Muhammad Waqar Resume & Credentials",
      },
    ],
  },
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <header className="p-4 border-b border-white/10 flex items-center justify-between">
        <a
          href="/"
          className="text-sm font-mono text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Portfolio
        </a>
        <div className="flex items-center gap-3">
          <ThemeSwitch />
          <a
            href="/cv.pdf"
            download="Muhammad_Waqar_Resume.pdf"
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
          >
            Download PDF
          </a>
        </div>
      </header>
      <main className="flex-1 w-full h-[calc(100vh-65px)]">
        <iframe
          src="/cv.pdf"
          title="Muhammad Waqar Resume"
          className="w-full h-full border-none"
        />
      </main>
    </div>
  );
}
