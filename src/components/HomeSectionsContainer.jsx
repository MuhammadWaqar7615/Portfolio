"use client";

import { useState } from "react";
import ThemePreviewListener from "./ThemePreviewListener";
import Hero from "./Hero";
import FeaturedProjects from "./FeaturedProjects";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import PracticeProjects from "./PracticeProjects";
import Goals from "./Goals";
import Contact from "./Contact";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { DEFAULT_THEME } from "../../lib/themeConstants";

export default function HomeSectionsContainer({
  initialSections,
  initialContent,
  initialPresetId,
  projects,
  experiences,
  educationData,
  skillsData,
}) {
  const [sections, setSections] = useState(initialSections || []);
  const [content, setContent] = useState(initialContent || DEFAULT_THEME.content);
  const [presetId, setPresetId] = useState(initialPresetId || "preset-1");

  const sectionComponentMap = {
    hero: <Hero key="hero" content={content} presetId={presetId} />,
    projects: <FeaturedProjects key="projects" projects={projects} content={content} presetId={presetId} />,
    about: <About key="about" content={content} presetId={presetId} />,
    experience: <Experience key="experience" experiences={experiences} content={content} presetId={presetId} />,
    education: <Education key="education" education={educationData} content={content} presetId={presetId} />,
    skills: <Skills key="skills" skills={skillsData} content={content} presetId={presetId} />,
    practice: <PracticeProjects key="practice" projects={projects} content={content} presetId={presetId} />,
    goals: <Goals key="goals" content={content} presetId={presetId} />,
    contact: <Contact key="contact" />,
  };

  // Sort by order ascending, filter visible: false (never filter hero or contact)
  const sortedSections = [...sections]
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .filter((s) => s.sectionId === "hero" || s.sectionId === "contact" || s.visible !== false);

  return (
    <>
      <ThemePreviewListener
        onSectionsChange={setSections}
        onContentChange={setContent}
        onPresetChange={setPresetId}
      />
      <Navbar content={content} presetId={presetId} />
      <main id="main-content" className="flex-1 w-full">
        {sortedSections.map((sec) => sectionComponentMap[sec.sectionId] || null)}
      </main>
      <Footer content={content} presetId={presetId} />
    </>
  );
}
