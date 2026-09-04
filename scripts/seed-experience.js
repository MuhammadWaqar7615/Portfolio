import connectToDatabase from "../lib/mongodb.js";
import Experience from "../models/Experience.js";

async function main() {
  await connectToDatabase();
  console.log("Connected to MongoDB");

  // Remove existing placeholder experiences
  await Experience.deleteMany({});

  const experiences = [
    {
      role: "Frontend Developer",
      company: "Bloggers Brackets",
      duration: "2024 — Present",
      description:
        "Spearheading frontend development initiatives across multiple client portals. Architecting modular UI component systems using React, Tailwind CSS, and Framer Motion with rigorous cross-browser compatibility. Delivered 6+ production web applications with 99.8% crash-free sessions.",
      order: 1,
    },
    {
      role: "Web Developer Intern",
      company: "Bloggers Brackets",
      duration: "2023",
      description:
        "Engineered responsive interface modules, translated Figma wireframes into production React components, and handled client-side state management workflows. Assisted in reducing initial script asset footprints through code splitting.",
      order: 2,
    },
  ];

  const result = await Experience.insertMany(experiences);
  console.log("Seeded experience entries:", result.length);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
