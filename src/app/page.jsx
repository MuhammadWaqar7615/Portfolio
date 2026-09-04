import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProjects from "../components/FeaturedProjects";
import About from "../components/About";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Skills from "../components/Skills";
import PracticeProjects from "../components/PracticeProjects";
import Goals from "../components/Goals";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { getPortfolioData } from "../../lib/dbData";

// Incremental Static Regeneration (ISR) interval in seconds
export const revalidate = 3600;

export default async function HomePage() {
  const portfolioData = await getPortfolioData();
  const projects = portfolioData?.projects || [];


  const jsonLdProjects = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        "name": "Crafts & Delights",
        "description":
          "Artisanal e-commerce web platform engineered with modular React component architecture and optimized client state.",
        "programmingLanguage": "JavaScript",
        "runtimePlatform": "React / Next.js",
        "codeRepository": "https://github.com/MuhammadWaqar7615/",
        "url": "https://crafts-delights.vercel.app",
        "author": {
          "@type": "Person",
          "name": "Muhammad Waqar",
        },
      },
      {
        "@type": "SoftwareSourceCode",
        "name": "Retreat Bookings",
        "description":
          "Hospitality reservation system built with Node.js, Express, and MongoDB preventing booking race conditions with sub-120ms queries.",
        "programmingLanguage": "JavaScript",
        "runtimePlatform": "Node.js / Express / MongoDB",
        "url": "https://retreat-bookings.vercel.app",
        "author": {
          "@type": "Person",
          "name": "Muhammad Waqar",
        },
      },
      {
        "@type": "SoftwareSourceCode",
        "name": "Ecommerce-store",
        "description":
          "Scalable retail catalog with optimistic cart states and zero layout shift using React, Supabase, and Tailwind CSS.",
        "programmingLanguage": "JavaScript",
        "runtimePlatform": "React / Supabase",
        "codeRepository": "https://github.com/MuhammadWaqar7615/",
        "url": "https://irfan-alyy.github.io/Ecommerce-Store/",
        "author": {
          "@type": "Person",
          "name": "Muhammad Waqar",
        },
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#090A0F] text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProjects) }}
      />
      <Navbar />
      <main id="main-content" className="flex-1 w-full">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Featured Projects (Immediately follows Hero) */}
        <FeaturedProjects projects={projects} />

        {/* Section 3: About & Engineering Principles */}
        <About />

        {/* Section 4: Experience */}
        <Experience />

        {/* Section 5: Education */}
        <Education />

        {/* Section 6: Technical Skills */}
        <Skills />

        {/* Section 7: Practice & Lab (De-emphasized clones/tutorials) */}
        <PracticeProjects projects={projects} />

        {/* Section 8: Strategic Vision & Goals (Compressed) */}
        <Goals />

        {/* Section 9: Contact */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

