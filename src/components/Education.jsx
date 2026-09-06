export default function Education({ education = [], content }) {
  const sectionHeaders = content?.sectionHeaders || {};
  const tagline = sectionHeaders.educationTagline !== undefined ? sectionHeaders.educationTagline : "Academic Credentials";
  const heading = sectionHeaders.educationHeading !== undefined ? sectionHeaders.educationHeading : "Formal Education";

  const credentials = education.length > 0 ? education : [
    {
      year: "2022 — 2026",
      degree: "Bachelor of Science in Computer Science",
      institution: "The Islamia University of Bahawalpur",
      campus: "Baghdad Campus",
      details:
        "Focus on core computing disciplines: algorithmic complexity, distributed systems architecture, database management systems, and software engineering design patterns.",
    },
    {
      year: "2021 — 2022",
      degree: "Intermediate in Computer Science (ICS)",
      institution: "Iqra Army Public School & College",
      campus: "Quetta Cantt",
      details:
        "Higher secondary education emphasizing structured programming foundations, discrete mathematics, and analytical problem-solving.",
    },
    {
      year: "2019 — 2020",
      degree: "Matriculation (Computer Science)",
      institution: "Army Public School and College System",
      campus: "Okara Cantt",
      details:
        "Secondary academic foundation in mathematics, physics, and introductory computer principles.",
    },
  ];

  return (
    <section
      id="education"
      aria-label="Education and credentials"
      data-editable="background"
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      <div className="editorial-container">
        {(tagline?.trim() || heading?.trim()) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-6 gap-4">
            <div>
              {tagline?.trim() ? (
                <span
                  data-editable="content-sectionHeaders-educationTagline"
                  className="text-xs font-mono uppercase tracking-[0.2em] text-accent cursor-pointer"
                  title="Click to edit education tagline"
                >
                  {tagline}
                </span>
              ) : null}
              {heading?.trim() ? (
                <h2
                  data-editable="content-sectionHeaders-educationHeading"
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-heading)] mt-2 cursor-pointer"
                  style={{ fontFamily: "var(--font-heading)" }}
                  title="Click to edit education heading"
                >
                  {heading}
                </h2>
              ) : null}
            </div>
            <p className="text-xs font-mono uppercase tracking-widest opacity-60">
              [ FORMAL FOUNDATIONS ]
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {credentials.map((item) => (
            <div
              key={item._id || item.degree}
              data-editable="radius"
              className="border border-white/[0.08] bg-cardBg p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <div>
                <span
                  data-editable="accent"
                  className="text-xs font-mono uppercase tracking-widest text-accent"
                >
                  {item.year || item.period}
                </span>
                <h3
                  data-editable="headingColor"
                  className="text-xl font-bold text-[var(--color-heading)] mt-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.degree}
                </h3>
                <p className="text-sm font-mono opacity-60 mt-1">
                  {item.institution}
                </p>
                {item.campus && (
                  <p className="text-xs font-mono opacity-60">
                    {item.campus}
                  </p>
                )}
                {item.details && (
                  <p
                    data-editable="text"
                    className="text-sm text-[var(--color-text)] opacity-85 leading-relaxed font-light mt-4"
                  >
                    {item.details}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
