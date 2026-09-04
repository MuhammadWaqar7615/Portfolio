import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

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

export const metadata = {
  metadataBase: new URL("https://muhammad-waqar.me"),
  title: {
    default: "Muhammad Waqar — Frontend & Full-Stack Engineer",
    template: "%s | Muhammad Waqar",
  },
  description:
    "Portfolio of Muhammad Waqar, a Frontend & Full-Stack Engineer specializing in React, Next.js, TypeScript, and high-performance user interfaces.",
  keywords: [
    "Muhammad Waqar",
    "Frontend Engineer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Muhammad Waqar", url: "https://muhammad-waqar.me" }],
  creator: "Muhammad Waqar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhammad-waqar.me",
    title: "Muhammad Waqar — Frontend & Full-Stack Engineer",
    description:
      "Crafting high-performance digital experiences, resilient web applications, and thoughtful user interfaces.",
    siteName: "Muhammad Waqar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Waqar — Frontend & Full-Stack Engineer",
    description:
      "Crafting high-performance digital experiences, resilient web applications, and thoughtful user interfaces.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Waqar",
    url: "https://muhammad-waqar.me",
    jobTitle: "Frontend & Full-Stack Engineer",
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Frontend Architecture",
    ],
    sameAs: [
      "https://github.com/MuhammadWaqar7615",
      "https://linkedin.com/in/muhammad-waqar-7615",
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#090A0F] text-[#F8FAFC] antialiased selection:bg-sky-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
