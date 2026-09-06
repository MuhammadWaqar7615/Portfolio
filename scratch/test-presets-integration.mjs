const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("=== Testing Dual Preset Theme Integration ===");

  // 1. Check GET /api/theme
  console.log("\n1. Testing GET /api/theme...");
  const themeRes = await fetch(`${BASE_URL}/api/theme`);
  if (!themeRes.ok) {
    throw new Error(`GET /api/theme failed with status ${themeRes.status}`);
  }
  const currentTheme = await themeRes.json();
  console.log(`Current active presetId: ${currentTheme.presetId || "preset-1"}`);

  // 2. Admin Login
  console.log("\n2. Admin Login to obtain JWT cookie...");
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      password: process.env.ADMIN_PASSWORD || "admin123456",
    }),
  });

  const cookieHeader = loginRes.headers.get("set-cookie");
  console.log(`Login status: ${loginRes.status}, Cookie received: ${Boolean(cookieHeader)}`);

  if (!cookieHeader) {
    console.warn("Could not retrieve cookie with default test credentials. Testing read routes & presets directly.");
  }

  // 3. Test GET /admin/dashboard
  console.log("\n3. Testing GET /admin/dashboard...");
  const dashRes = await fetch(`${BASE_URL}/admin/dashboard`, {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });
  console.log(`Dashboard response status: ${dashRes.status}`);
  if (dashRes.status !== 200 && dashRes.status !== 307) {
    throw new Error(`Unexpected dashboard status: ${dashRes.status}`);
  }

  // 4. Test GET /admin/theme
  console.log("\n4. Testing GET /admin/theme...");
  const adminThemeRes = await fetch(`${BASE_URL}/admin/theme`, {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });
  console.log(`Admin theme response status: ${adminThemeRes.status}`);
  if (adminThemeRes.status !== 200 && adminThemeRes.status !== 307) {
    throw new Error(`Unexpected admin theme status: ${adminThemeRes.status}`);
  }

  // 5. Test GET / SSR page
  console.log("\n5. Testing GET / SSR HTML response...");
  const homeRes = await fetch(`${BASE_URL}/`);
  if (homeRes.status !== 200) {
    throw new Error(`GET / failed with status ${homeRes.status}`);
  }
  const homeHtml = await homeRes.text();
  console.log(`Homepage loaded successfully (${homeHtml.length} bytes)`);

  // Verify preset CSS variables are injected
  const hasRadiusBtn = homeHtml.includes("--radius-btn");
  console.log(`Homepage contains --radius-btn: ${hasRadiusBtn}`);
  if (!hasRadiusBtn) {
    throw new Error("Homepage missing --radius-btn CSS variable");
  }

  // 6. Test PATCH /api/theme if authenticated
  if (cookieHeader) {
    console.log("\n6. Testing PATCH /api/theme with Preset 2 (Warm Studio)...");
    const patchRes = await fetch(`${BASE_URL}/api/theme`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify({
        presetId: "preset-2",
        colors: {
          primary: "#131410",
          accent: "#E5C287",
          background: "#131410",
          cardBg: "#1C1D18",
          text: "#E8E4DC",
          headingColor: "#FFFDF8",
        },
        lightColors: {
          primary: "#F5F1EB",
          accent: "#A87B2E",
          background: "#F5F1EB",
          cardBg: "#FFFFFF",
          text: "#2C2A26",
          headingColor: "#161513",
        },
        typography: {
          headingFont: "Playfair Display",
          bodyFont: "Plus Jakarta Sans",
        },
        radius: "rounded",
        content: {
          hero: {
            name: "Muhammad Waqar",
            bio: "I build modern, scalable and high-performance web applications that solve real problems and deliver great user experiences.",
            buttonPrimary: "View My Projects →",
            buttonSecondary: "Get In Touch",
          },
        },
      }),
    });

    console.log(`PATCH response status: ${patchRes.status}`);
    const patchText = await patchRes.text();
    let patchJson;
    try {
      patchJson = JSON.parse(patchText);
    } catch {
      patchJson = { raw: patchText };
    }
    const savedTheme = patchJson.theme || patchJson;
    console.log(`PATCH result presetId: ${savedTheme.presetId}`);
    if (savedTheme.presetId !== "preset-2") {
      throw new Error(`Expected presetId to be 'preset-2', got: ${savedTheme.presetId}`);
    }

    // 7. Re-check SSR HTML for Preset 2 content & styles
    console.log("\n7. Re-checking GET / for Preset 2 (Warm Studio) SSR rendering...");
    const p2HomeRes = await fetch(`${BASE_URL}/`);
    const p2Html = await p2HomeRes.text();

    const containsPlayfair = p2Html.includes("Playfair Display") || p2Html.includes("var(--font-heading)");
    const containsChampagne = p2Html.includes("#E5C287") || p2Html.includes("#e5c287");
    const containsBio = p2Html.includes("I build modern, scalable and high-performance web applications");
    const containsWorksBtn = p2Html.includes("View My Projects");

    console.log(`- Contains Playfair heading font: ${containsPlayfair}`);
    console.log(`- Contains Champagne Gold accent: ${containsChampagne}`);
    console.log(`- Contains Warm Studio bio copy: ${containsBio}`);
    console.log(`- Contains 'View My Projects' button: ${containsWorksBtn}`);

    if (!containsBio || !containsWorksBtn) {
      throw new Error("SSR HTML did not render Preset 2 content correctly!");
    }

    // 8. Test Switching Back to Preset 1
    console.log("\n8. Testing Switch back to Preset 1 (Technical Craftsman)...");
    const patch1Res = await fetch(`${BASE_URL}/api/theme`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify({
        presetId: "preset-1",
        colors: {
          primary: "#090A0F",
          accent: "#38BDF8",
          background: "#090A0F",
          cardBg: "#0C0E14",
          text: "#F8FAFC",
          headingColor: "#FFFFFF",
        },
        lightColors: {
          primary: "#FFFFFF",
          accent: "#0284C7",
          background: "#F8FAFC",
          cardBg: "#FFFFFF",
          text: "#334155",
          headingColor: "#0F172A",
        },
        typography: {
          headingFont: "Space Grotesk",
          bodyFont: "Inter",
        },
        radius: "soft",
        content: {
          hero: {
            name: "Muhammad Waqar",
            bio: "Full Stack Engineer specializing in scalable web systems, distributed architectures, and modern product engineering.",
            buttonPrimary: "Selected Work ↘",
            buttonSecondary: "Get in Touch",
          },
        },
      }),
    });

    console.log(`PATCH back to preset-1 status: ${patch1Res.status}`);
    const patch1Json = await patch1Res.json();
    const savedTheme1 = patch1Json.theme || patch1Json;
    if (savedTheme1.presetId !== "preset-1") {
      throw new Error(`Expected presetId to be 'preset-1', got: ${savedTheme1.presetId}`);
    }

    const p1HomeRes = await fetch(`${BASE_URL}/`);
    const p1Html = await p1HomeRes.text();
    const containsP1Cyan = p1Html.includes("#38BDF8") || p1Html.includes("#38bdf8");
    console.log(`- Preset 1 Cyan accent restored in SSR: ${containsP1Cyan}`);

    console.log("\n=== ALL INTEGRATION TESTS PASSED SUCCESSFULLY! ===");
  } else {
    console.log("\n=== READ/SSR TESTS PASSED! ===");
  }
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
