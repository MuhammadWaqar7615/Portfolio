export const metadata = {
  title: "Resume — Muhammad Waqar",
  description: "Curriculum Vitae and professional background of Muhammad Waqar.",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#090A0F] text-white flex flex-col">
      <header className="p-4 border-b border-white/10 flex items-center justify-between">
        <a
          href="/"
          className="text-sm font-mono text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Portfolio
        </a>
        <a
          href="/cv.pdf"
          download="Muhammad_Waqar_Resume.pdf"
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
        >
          Download PDF
        </a>
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
