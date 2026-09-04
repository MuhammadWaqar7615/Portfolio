import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import connectToDatabase from "../../lib/mongodb";
import SiteMetadata from "../../models/SiteMetadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export async function generateMetadata() {
  let siteData = null;
  try {
    const conn = await connectToDatabase();
    if (conn) {
      siteData = await SiteMetadata.findOne().lean();
    }
  } catch (err) {
    // Graceful fallback during offline builds or before MongoDB Atlas is populated
    console.warn("MongoDB SiteMetadata query skipped, using curated defaults:", err.message);
  }

  const title =
    siteData?.title || "Muhammad Waqar — Frontend & Full-Stack Engineer";
  const description =
    siteData?.description ||
    "Portfolio of Muhammad Waqar, a Frontend & Full-Stack Engineer specializing in React, Next.js, TypeScript, and high-performance user interfaces.";
  const ogImage =
    siteData?.ogImage || "https://muhammad-waqar.me/opengraph-image";

  return {
    metadataBase: new URL("https://muhammad-waqar.me"),
    title: {
      default: title,
      template: "%s | Muhammad Waqar",
    },
    description,
    keywords: [
      "Muhammad Waqar",
      "Frontend Engineer",
      "Full-Stack Developer",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Web Architecture",
      "Portfolio",
    ],
    authors: [{ name: "Muhammad Waqar", url: "https://muhammad-waqar.me" }],
    creator: "Muhammad Waqar",
    alternates: {
      canonical: "https://muhammad-waqar.me",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://muhammad-waqar.me",
      title,
      description,
      siteName: "Muhammad Waqar Portfolio",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Muhammad Waqar — Frontend & Full-Stack Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function RootLayout({ children }) {
  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Waqar",
    url: "https://muhammad-waqar.me",
    jobTitle: "Frontend & Full-Stack Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Bloggers Brackets",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "The Islamia University of Bahawalpur",
    },
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Frontend Architecture",
      "Web Performance & Core Web Vitals",
    ],
    sameAs: [
      "https://github.com/MuhammadWaqar7615",
      "https://linkedin.com/in/muhammad-waqar-7615",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "mwaqar7615@gmail.com",
      telephone: "+923115119984",
      contactType: "professional",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body className="min-h-screen bg-[#090A0F] text-[#F8FAFC] antialiased selection:bg-sky-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
