export default function Goals() {
  return (
    <section
      id="goals"
      aria-label="Technical trajectory and engineering focus"
      className="py-16 sm:py-20 border-b border-white/[0.08]"
    >
      <div className="editorial-container">
        <div className="border border-white/[0.08] bg-[#0C0E14] p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-sky-400">
                Trajectory
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-2">
                Engineering Focus
              </h2>
            </div>
            <div className="lg:col-span-8 text-sm sm:text-base text-gray-300 leading-relaxed font-light space-y-3">
              <p>
                Currently deepening production capabilities in{" "}
                <strong className="text-white font-medium">Next.js App Router architectures</strong>,{" "}
                distributed Node/Express micro-APIs, and low-latency database indexing with MongoDB.
              </p>
              <p className="text-xs font-mono text-gray-400">
                COMMITTED TO: Strict semantic HTML5 · Zero CLS · Verified accessibility · Solo-maintainable architectures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
