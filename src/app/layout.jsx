import "./globals.css";
import connectToDatabase from "../../lib/mongodb";
import SiteMetadata from "../../models/SiteMetadata";
import { getSiteTheme } from "../../lib/dbData";
import {
  RADIUS_MAP,
  SPACING_MAP,
  DEFAULT_THEME,
  FONT_VARIABLE_MAP,
} from "../../models/SiteTheme";
import {
  Inter,
  Space_Grotesk,
  Playfair_Display,
  Merriweather,
  Roboto,
  Open_Sans,
  Lato,
  Montserrat,
  Poppins,
  Nunito,
  Raleway,
  DM_Sans,
  Outfit,
  Plus_Jakarta_Sans,
  DM_Serif_Display,
  Manrope,
} from "next/font/google";

const fontInter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fontSpaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const fontPlayfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair-display", display: "swap" });
const fontDmSerifDisplay = DM_Serif_Display({ weight: ["400"], subsets: ["latin"], variable: "--font-dm-serif-display", display: "swap" });
const fontManrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const fontMerriweather = Merriweather({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-merriweather", display: "swap" });
const fontRoboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-roboto", display: "swap" });
const fontOpenSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans", display: "swap" });
const fontLato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-lato", display: "swap" });
const fontMontserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
const fontPoppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-poppins", display: "swap" });
const fontNunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });
const fontRaleway = Raleway({ subsets: ["latin"], variable: "--font-raleway", display: "swap" });
const fontDmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const fontOutfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const fontPlusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta-sans", display: "swap" });

const ALL_FONT_VARIABLES = [
  fontInter.variable,
  fontSpaceGrotesk.variable,
  fontPlayfairDisplay.variable,
  fontDmSerifDisplay.variable,
  fontManrope.variable,
  fontMerriweather.variable,
  fontRoboto.variable,
  fontOpenSans.variable,
  fontLato.variable,
  fontMontserrat.variable,
  fontPoppins.variable,
  fontNunito.variable,
  fontRaleway.variable,
  fontDmSans.variable,
  fontOutfit.variable,
  fontPlusJakartaSans.variable,
].join(" ");

export async function generateMetadata() {
  let siteData = null;
  try {
    const conn = await connectToDatabase();
    if (conn) {
      siteData = await SiteMetadata.findOne().lean();
    }
  } catch (err) {
    console.warn("MongoDB SiteMetadata query skipped, using curated defaults:", err.message);
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://muhammad-waqar.me");

  const title =
    siteData?.title || "Muhammad Waqar — Full Stack Engineer";
  const description =
    siteData?.description ||
    "Portfolio of Muhammad Waqar, a Full Stack Web Engineer specializing in React, Next.js, JavaScript, and high-performance user interfaces.";
  const ogImage =
    siteData?.ogImage || `${baseUrl}/opengraph-image`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: "%s | Muhammad Waqar",
    },
    description,
    keywords: [
      "Muhammad Waqar",
      "Frontend Developer",
      "React Developer",
      "Next.js Developer",
      "Full-Stack Developer",
      "Frontend Engineer",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "UI Developer",
      "Responsive Design",
      "Web Development",
      "Web Architecture",
      "React Portfolio",
      "Portfolio",
    ],
    authors: [{ name: "Muhammad Waqar", url: baseUrl }],
    creator: "Muhammad Waqar",
    icons: {
      icon: [
        { url: "/name_logo.png", type: "image/png" },
        { url: "/favicon.png", type: "image/png" },
        { url: "/favicon.ico" },
      ],
      apple: [{ url: "/name_logo.png", type: "image/png" }],
    },
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: baseUrl,
      title,
      description,
      siteName: "Muhammad Waqar Portfolio",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Muhammad Waqar — Full Stack Engineer",
        },
        {
          url: `${baseUrl}/preview_image.png`,
          width: 1200,
          height: 630,
          alt: "Muhammad Waqar Full Stack Engineer Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage, `${baseUrl}/preview_image.png`],
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
    verification: {
      google: "pNQklktQuBHgyP0elkyVJWaus8v1GGh-akwDE3JhQd4",
    },
    appleWebApp: {
      capable: true,
      title: "Muhammad Waqar Portfolio",
      statusBarStyle: "black-translucent",
    },
    formatDetection: {
      telephone: false,
    },
  };
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090A0F" },
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://muhammad-waqar.me");

  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Waqar",
    url: baseUrl,
    image: `${baseUrl}/preview_image.png`,
    logo: `${baseUrl}/name_logo.png`,
    description:
      "Portfolio of Muhammad Waqar, a Full Stack Web Engineer specializing in React, Next.js, JavaScript, and high-performance user interfaces.",
    jobTitle: "Full Stack Web Engineer",
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

  const theme = (await getSiteTheme()) || DEFAULT_THEME;
  const radiusPx = RADIUS_MAP[theme?.radius] || (theme?.presetId === "preset-2" ? "10px" : "4px");
  const radiusBtn = theme?.radius === "editorial" || theme?.radius === "rounded" || theme?.presetId === "preset-2" ? "999px" : radiusPx;
  const spacingSettings = SPACING_MAP[theme?.spacing] || SPACING_MAP.cozy;
  const headingFontVar = FONT_VARIABLE_MAP[theme?.typography?.headingFont] || (theme?.presetId === "preset-2" ? FONT_VARIABLE_MAP["DM Serif Display"] : FONT_VARIABLE_MAP["Space Grotesk"]);
  const bodyFontVar = FONT_VARIABLE_MAP[theme?.typography?.bodyFont] || (theme?.presetId === "preset-2" ? FONT_VARIABLE_MAP["Manrope"] : FONT_VARIABLE_MAP["Inter"]);

  return (
    <html lang="en" data-preset={theme?.presetId || "preset-1"} suppressHydrationWarning className={`dark ${ALL_FONT_VARIABLES}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedMode = localStorage.getItem('theme_mode');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var mode = savedMode ? savedMode : (prefersDark ? 'dark' : 'light');
                  if (mode === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <style
          id="theme-styles"
          dangerouslySetInnerHTML={{
            __html: `
            :root {
              --font-heading: ${headingFontVar};
              --font-body: ${bodyFontVar};
              --color-primary: ${theme?.colors?.primary || "#090A0F"};
              --color-accent: ${theme?.colors?.accent || "#38BDF8"};
              --color-highlight: ${theme?.colors?.highlight || "#E8B58F"};
              --color-olive: ${theme?.colors?.olive || "#69745A"};
              --color-muted: ${theme?.colors?.muted || "#77766D"};
              --color-deepDark: ${theme?.colors?.deepDark || "#0D0F0D"};
              --color-warmIvory: ${theme?.colors?.warmIvory || "#F2EEE5"};
              --color-background: ${theme?.colors?.background || "#090A0F"};
              --color-text: ${theme?.colors?.text || "#F8FAFC"};
              --color-heading: ${theme?.colors?.headingColor || "#FFFFFF"};
              --color-cardBg: ${theme?.colors?.cardBg || theme?.colors?.background || "#0C0E14"};
              --radius-card: ${radiusPx};
              --radius-btn: ${radiusBtn};
              --spacing-container: ${spacingSettings.container};
              --spacing-section: ${spacingSettings.section};
              --spacing-card: ${spacingSettings.card};
            }

            html.light, [data-theme="light"] {
              --color-primary: ${theme?.lightColors?.primary || "#FFFFFF"};
              --color-accent: ${theme?.lightColors?.accent || "#0284C7"};
              --color-highlight: ${theme?.lightColors?.highlight || "#E8B58F"};
              --color-olive: ${theme?.lightColors?.olive || "#69745A"};
              --color-muted: ${theme?.lightColors?.muted || "#77766D"};
              --color-background: ${theme?.lightColors?.background || "#F8FAFC"};
              --color-text: ${theme?.lightColors?.text || "#334155"};
              --color-heading: ${theme?.lightColors?.headingColor || "#0F172A"};
              --color-cardBg: ${theme?.lightColors?.cardBg || "#FFFFFF"};
            }
          `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body
        className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] antialiased selection:bg-[var(--color-accent)] selection:text-[var(--color-background)]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
      </body>
    </html>
  );
}
