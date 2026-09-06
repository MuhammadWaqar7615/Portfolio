export default function Goals({ content }) {
  const goals = content?.goals || {};
  const tagline = goals.tagline !== undefined ? goals.tagline : "Trajectory";
  const heading = goals.heading !== undefined ? goals.heading : "Engineering Trajectory & 2026 Focus";
  const paragraph1 = goals.paragraph1 !== undefined ? goals.paragraph1 : "Currently deepening production capabilities in Next.js App Router architectures, distributed Node/Express micro-APIs, and low-latency database indexing with MongoDB.";
  const commitment = goals.commitment !== undefined ? goals.commitment : "COMMITTED TO: Strict semantic HTML5 · Zero CLS · Verified accessibility · Solo-maintainable architectures.";

  const hasLeftCol = !!(tagline?.trim() || heading?.trim());
  const hasRightCol = !!(paragraph1?.trim() || commitment?.trim());

  if (!hasLeftCol && !hasRightCol) return null;

  return (
    <section
      id="goals"
      aria-label="Technical trajectory and engineering focus"
      data-editable="background"
      className="py-16 sm:py-20 border-b border-white/[0.08]"
    >
      <div className="editorial-container">
        <div
          data-editable="radius"
          className="border border-white/[0.08] bg-cardBg p-8 sm:p-12"
          style={{ borderRadius: "var(--radius-card)" }}
        >
          <div className={`grid grid-cols-1 ${hasLeftCol && hasRightCol ? "lg:grid-cols-12" : ""} gap-8 items-center`}>
            {hasLeftCol && (
              <div className={hasRightCol ? "lg:col-span-4" : "w-full"}>
                {tagline?.trim() ? (
                  <span
                    data-editable="content-goals-tagline"
                    className="text-xs font-mono uppercase tracking-[0.2em] text-accent cursor-pointer"
                    title="Click to edit goals tagline"
                  >
                    {tagline}
                  </span>
                ) : null}
                {heading?.trim() ? (
                  <h2
                    data-editable="content-goals-heading"
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-heading)] mt-2 cursor-pointer"
                    style={{ fontFamily: "var(--font-heading)" }}
                    title="Click to edit goals heading"
                  >
                    {heading}
                  </h2>
                ) : null}
              </div>
            )}
            {hasRightCol && (
              <div
                className={`${hasLeftCol ? "lg:col-span-8" : "w-full"} text-sm sm:text-base text-[var(--color-text)] opacity-90 leading-relaxed font-light space-y-3`}
              >
                {paragraph1?.trim() ? (
                  <p
                    data-editable="content-goals-paragraph1"
                    className="cursor-pointer"
                    title="Click to edit trajectory focus"
                  >
                    {paragraph1}
                  </p>
                ) : null}
                {commitment?.trim() ? (
                  <p
                    data-editable="content-goals-commitment"
                    className="text-xs font-mono opacity-65 cursor-pointer"
                    title="Click to edit engineering commitment"
                  >
                    {commitment}
                  </p>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
