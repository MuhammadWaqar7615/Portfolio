export default function Education({ education = [] }) {
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
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      <div className="editorial-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-6 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-sky-400">
              Academic Credentials
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
              Education
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
            [ FORMAL FOUNDATIONS ]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {credentials.map((item) => (
            <div
              key={item._id || item.degree}
              className="border border-white/[0.08] bg-[#0C0E14] p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300"
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
                  {item.year || item.period}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">
                  {item.degree}
                </h3>
                <p className="text-sm font-mono text-gray-400 mt-1">
                  {item.institution}
                </p>
                {item.campus && (
                  <p className="text-xs font-mono text-gray-400">
                    {item.campus}
                  </p>
                )}
                {item.details && (
                  <p className="text-sm text-gray-300 leading-relaxed font-light mt-4">
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
