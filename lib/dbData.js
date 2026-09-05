import connectToDatabase from "./mongodb";
import Project from "../models/Project";
import Experience from "../models/Experience";
import Education from "../models/Education";
import Skill from "../models/Skill";

const initialProjects = [
  {
    title: "Crafts & Delights",
    shortDescription: "Artisanal E-Commerce & Gift Platform",
    problem:
      "Artisanal storefronts often struggle with sluggish catalog rendering and fragmented checkout paths that cause high bounce rates.",
    roleDecisions:
      "Engineered an optimized React client utilizing modular component architecture, memoized filtering states, and smooth Framer Motion interactions. Achieved fluid 60fps client navigation and reduced catalog interaction latency by 40%.",
    techTags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    liveLink: "https://crafts-delights.vercel.app",
    codeLink: "https://github.com/MuhammadWaqar7615/",
    status: "live",
    order: 1,
  },
  {
    title: "Retreat Bookings",
    shortDescription: "Hospitality & Scheduling Platform",
    problem:
      "Coordinating multi-property retreat reservations required real-time availability sync and date conflict prevention.",
    roleDecisions:
      "Developed full-stack reservation workflows with Node.js and MongoDB, incorporating robust query validation and clean React date-range state management. Prevented double-booking race conditions.",
    techTags: ["React", "Node.js", "Express", "MongoDB"],
    liveLink: "https://retreat-bookings.vercel.app",
    codeLink: "https://github.com/MuhammadWaqar7615/",
    status: "live",
    order: 2,
  },
  {
    title: "Ecommerce-store",
    shortDescription: "Modern Cloud Retail Experience",
    problem:
      "High inventory catalogs frequently suffer from layout shifts and latency during real-time product search and cart operations.",
    roleDecisions:
      "Implemented Supabase backend-as-a-service with optimistic UI updates in React, decoupled cart persistence, and debounced database searches. Zero cumulative layout shift (CLS < 0.02).",
    techTags: ["React", "Supabase", "Tailwind CSS"],
    liveLink: "https://irfan-alyy.github.io/Ecommerce-Store/",
    codeLink: "https://github.com/MuhammadWaqar7615/",
    status: "live",
    order: 3,
  },
  {
    title: "WorkNexus",
    shortDescription: "Enterprise Resource Management",
    problem:
      "Comprehensive resource management platform optimizing internal organizational coordination, inventory tracking, and employee workflows.",
    roleDecisions:
      "Architected PostgreSQL relational schemas and decoupled Express middleware for role-based access control.",
    techTags: ["React", "Express", "PostgreSQL"],
    liveLink: null,
    codeLink: "https://github.com/MuhammadWaqar7615/",
    status: "in-progress",
    order: 4,
  },
];

const initialExperiences = [
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

const initialEducation = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "The Islamia University of Bahawalpur",
    year: "2022 — 2026",
    order: 1,
  },
  {
    degree: "Intermediate in Computer Science (ICS)",
    institution: "Iqra Army Public School & College",
    year: "2021 — 2022",
    order: 2,
  },
  {
    degree: "Matriculation (Computer Science)",
    institution: "Army Public School and College System",
    year: "2019 — 2020",
    order: 3,
  },
];

const initialSkills = [
  { name: "React / Next.js", category: "Frontend", icon: "code", order: 1 },
  { name: "JavaScript (ES6+)", category: "Frontend", icon: "code", order: 2 },
  { name: "Tailwind CSS", category: "Frontend", icon: "code", order: 3 },
  { name: "Node.js / Express", category: "Backend", icon: "server", order: 4 },
  { name: "MongoDB / Mongoose", category: "Backend", icon: "database", order: 5 },
  { name: "PostgreSQL / Supabase", category: "Backend", icon: "database", order: 6 },
  { name: "Git / GitHub", category: "Languages & Tools", icon: "terminal", order: 7 },
  { name: "Vercel Deployment", category: "Languages & Tools", icon: "terminal", order: 8 },
];

export async function getPortfolioData() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return {
        projects: initialProjects,
        experiences: initialExperiences,
        education: initialEducation,
        skills: initialSkills,
      };
    }

    // Auto-seed if database collection is empty
    let projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();
    if (!projects || projects.length === 0) {
      await Project.insertMany(initialProjects);
      projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();
    }

    let experiences = await Experience.find({}).sort({ order: 1, createdAt: -1 }).lean();
    if (!experiences || experiences.length === 0) {
      await Experience.insertMany(initialExperiences);
      experiences = await Experience.find({}).sort({ order: 1, createdAt: -1 }).lean();
    }

    let education = await Education.find({}).sort({ order: 1, createdAt: -1 }).lean();
    if (!education || education.length === 0) {
      await Education.insertMany(initialEducation);
      education = await Education.find({}).sort({ order: 1, createdAt: -1 }).lean();
    }

    let skills = await Skill.find({}).sort({ order: 1 }).lean();
    if (!skills || skills.length === 0) {
      await Skill.insertMany(initialSkills);
      skills = await Skill.find({}).sort({ order: 1 }).lean();
    }

    return {
      projects: JSON.parse(JSON.stringify(projects)),
      experiences: JSON.parse(JSON.stringify(experiences)),
      education: JSON.parse(JSON.stringify(education)),
      skills: JSON.parse(JSON.stringify(skills)),
    };
  } catch (err) {
    console.error("Error fetching portfolio data from MongoDB:", err);
    return {
      projects: initialProjects,
      experiences: initialExperiences,
      education: initialEducation,
      skills: initialSkills,
    };
  }
}
