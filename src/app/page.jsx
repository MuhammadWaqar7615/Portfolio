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

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#090A0F] text-[#F8FAFC]">
      <Navbar />
      <main id="main-content" className="flex-1 w-full">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Featured Projects (Immediately follows Hero) */}
        <FeaturedProjects />

        {/* Section 3: About & Engineering Principles */}
        <About />

        {/* Section 4: Experience */}
        <Experience />

        {/* Section 5: Education */}
        <Education />

        {/* Section 6: Technical Skills */}
        <Skills />

        {/* Section 7: Practice & Lab (De-emphasized clones/tutorials) */}
        <PracticeProjects />

        {/* Section 8: Strategic Vision & Goals (Compressed) */}
        <Goals />

        {/* Section 9: Contact */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
