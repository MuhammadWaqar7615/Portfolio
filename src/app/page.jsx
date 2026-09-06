import HomeSectionsContainer from "../components/HomeSectionsContainer";
import { getPortfolioData, getSiteTheme } from "../../lib/dbData";
import { DEFAULT_THEME } from "../../models/SiteTheme";

// Incremental Static Regeneration (ISR) interval in seconds
export const revalidate = 3600;

export default async function HomePage() {
  const portfolioData = await getPortfolioData();
  const theme = (await getSiteTheme()) || DEFAULT_THEME;

  const projects = portfolioData?.projects || [];
  const experiences = portfolioData?.experiences || [];
  const educationData = portfolioData?.education || [];
  const skillsData = portfolioData?.skills || [];
  const initialSections = theme?.sections || DEFAULT_THEME.sections;

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
    <div className="flex min-h-screen flex-col bg-background text-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProjects) }}
      />
      <HomeSectionsContainer
        initialSections={initialSections}
        initialContent={theme?.content || DEFAULT_THEME.content}
        initialPresetId={theme?.presetId || "preset-1"}
        projects={projects}
        experiences={experiences}
        educationData={educationData}
        skillsData={skillsData}
      />
    </div>
  );
}
