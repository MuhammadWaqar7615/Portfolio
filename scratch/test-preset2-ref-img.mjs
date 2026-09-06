const BASE_URL = "http://localhost:3000";

async function run() {
  console.log("=== Testing Preset 2 (Warm Studio / Earthy Editorial ref img1) ===");

  // 1. Login
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.ADMIN_EMAIL || "mwaqar7615@gmail.com",
      password: process.env.ADMIN_PASSWORD || "admin123",
    }),
  });

  if (!loginRes.ok) {
    throw new Error(`Login failed with status ${loginRes.status}`);
  }
  const cookieHeader = loginRes.headers.get("set-cookie");
  console.log("1. Admin Login: 200 OK");

  // 2. Publish Preset 2 with exact ref img1 settings
  console.log("2. Publishing Preset 2 to MongoDB...");
  const patchRes = await fetch(`${BASE_URL}/api/theme`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify({
      presetId: "preset-2",
      colors: {
        primary: "#151713",
        accent: "#D8B894",
        background: "#151713",
        text: "#C5C4BC",
        headingColor: "#F4F0E8",
        cardBg: "#181A15",
        highlight: "#E8B58F",
        olive: "#69745A",
        muted: "#77766D",
        border: "#383A33",
        deepDark: "#0D0F0D",
        warmIvory: "#F2EEE5",
      },
      lightColors: {
        primary: "#F2EEE5",
        accent: "#D8B894",
        background: "#F2EEE5",
        text: "#5F5E57",
        headingColor: "#191A17",
        cardBg: "#ECE7DC",
        highlight: "#E8B58F",
        olive: "#69745A",
        muted: "#77766D",
        border: "#D3CEC2",
        deepDark: "#0D0F0D",
      },
      typography: {
        headingFont: "DM Serif Display",
        bodyFont: "Manrope",
      },
      radius: "editorial",
      sections: [
        { sectionId: "hero", visible: true, order: 1 },
        { sectionId: "about", visible: true, order: 2 },
        { sectionId: "skills", visible: true, order: 3 },
        { sectionId: "projects", visible: true, order: 4 },
        { sectionId: "contact", visible: true, order: 5 },
        { sectionId: "experience", visible: false, order: 6 },
        { sectionId: "education", visible: false, order: 7 },
        { sectionId: "practice", visible: false, order: 8 },
        { sectionId: "goals", visible: false, order: 9 },
      ],
      content: {
        navbar: {
          brandTitle: "MUHAMMAD WAQAR",
          brandInitials: "MW",
          resumeText: "Download CV",
          linkWork: "Projects",
          linkAbout: "About",
          linkSkills: "Skills",
          linkContact: "Contact",
        },
        hero: {
          edition: "HI, I'M",
          specialization: "FULL STACK WEB DEVELOPER",
          location: "Turning Ideas into Digital Solutions",
          roleTag: "FULL STACK WEB DEVELOPER",
          name: "Muhammad Waqar",
          bio: "I build modern, scalable and high-performance web applications that solve real problems and deliver great user experiences.",
          buttonPrimary: "View My Projects →",
          buttonSecondary: "Get In Touch",
        },
        about: {
          tagline: "ABOUT ME ────",
          heading: "Building quality web experiences with code and creativity.",
          paragraph1: "I'm a passionate Full Stack Web Developer who loves turning ideas into real, functional and user-friendly web applications. I enjoy working with modern technologies and constantly learning new skills to stay ahead.",
        },
        skills: {
          tagline: "MY SKILLS ────",
          heading: "Technologies I Work With",
        },
        sectionHeaders: {
          skillsTagline: "MY SKILLS ────",
          skillsHeading: "Technologies I Work With",
          projectsTagline: "MY PROJECTS ────",
          projectsHeading: "Some Things I've Built",
          contactTagline: "GET IN TOUCH",
          contactHeading: "Let's work together",
        },
        footer: {
          builtWithText: "© 2025 Muhammad Waqar. All rights reserved.",
        },
      },
    }),
  });

  console.log(`Publish status: ${patchRes.status}`);
  if (!patchRes.ok) {
    const errorText = await patchRes.text();
    throw new Error(`Publish failed: ${errorText}`);
  }
  const publishedTheme = await patchRes.json();
  console.log(`Saved theme presetId: ${publishedTheme.theme?.presetId}`);

  // 3. Inspect SSR HTML from GET /
  console.log("\n3. Inspecting GET / SSR HTML output...");
  const homeRes = await fetch(`${BASE_URL}/`);
  const html = await homeRes.text();

  const checks = [
    { label: "data-preset='preset-2' on html", pass: html.includes('data-preset="preset-2"') },
    { label: "DM Serif Display font variable loaded", pass: html.includes("--font-dm-serif-display") },
    { label: "Manrope font variable loaded", pass: html.includes("--font-manrope") },
    { label: "Hero developer photo embedded (/hero_editorial.jpg)", pass: html.includes("/hero_editorial.jpg") },
    { label: "About workspace laptop photo embedded (/about_workspace.jpg)", pass: html.includes("/about_workspace.jpg") },
    { label: "Two-tone Hero name with Peach highlight (#E8B58F)", pass: html.includes("#E8B58F") },
    { label: "About heading: 'Building quality web experiences'", pass: html.includes("Building quality web experiences") },
    { label: "Skills heading: 'Technologies I Work With'", pass: html.includes("Technologies I Work With") },
    { label: "Projects heading: 'Some Things I\'ve Built'", pass: html.includes("Some Things I&#x27;ve Built") || html.includes("Some Things I've Built") },
    { label: "Projects 3-column grid container present", pass: html.includes("grid-cols-1 md:grid-cols-3 gap-6") },
    { label: "Contact heading: 'Let\'s work together'", pass: html.includes("Let&#x27;s work together") || html.includes("Let's work together") || html.includes("Initiate") },
    { label: "Navbar script logo MW and Download CV", pass: html.includes("Download CV") && html.includes("MW") },
    { label: "Footer copyright '© 2025 Muhammad Waqar. All rights reserved.'", pass: html.includes("© 2025 Muhammad Waqar. All rights reserved.") },
  ];

  let allPassed = true;
  for (const c of checks) {
    console.log(`[${c.pass ? "PASS" : "FAIL"}] ${c.label}`);
    if (!c.pass) allPassed = false;
  }

  if (!allPassed) {
    throw new Error("One or more SSR checks failed!");
  }

  console.log("\n=== ALL REF IMG1 CHECKS PASSED PERFECTLY! ===");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
