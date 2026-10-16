export default function manifest() {
  return {
    name: "Muhammad Waqar — Full Stack Engineer Portfolio",
    short_name: "Muhammad Waqar",
    description:
      "Portfolio of Muhammad Waqar, a Full Stack Web Engineer specializing in React, Next.js, JavaScript, and high-performance user interfaces.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#ef4444",
    icons: [
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/name_logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
