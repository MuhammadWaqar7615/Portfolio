import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import SiteTheme, {
  ALLOWED_FONTS,
  HEX_COLOR_REGEX,
  DEFAULT_THEME,
} from "../../../../models/SiteTheme";
import { getAuthUser } from "../../../../lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await connectToDatabase();
    let theme = await SiteTheme.findOne({ status: "published" }).lean();
    if (!theme) {
      theme = await SiteTheme.findOne().sort({ updatedAt: -1 }).lean();
    }
    if (!theme) {
      theme = await SiteTheme.create(DEFAULT_THEME);
    }
    const parsed = JSON.parse(JSON.stringify(theme));
    const merged = {
      ...DEFAULT_THEME,
      ...parsed,
      presetId: parsed.presetId || "preset-1",
      colors: { ...DEFAULT_THEME.colors, ...(parsed.colors || {}) },
      lightColors: { ...DEFAULT_THEME.lightColors, ...(parsed.lightColors || {}) },
      content: {
        navbar: { ...DEFAULT_THEME.content.navbar, ...(parsed.content?.navbar || {}) },
        hero: { ...DEFAULT_THEME.content.hero, ...(parsed.content?.hero || {}) },
        about: { ...DEFAULT_THEME.content.about, ...(parsed.content?.about || {}) },
        sectionHeaders: { ...DEFAULT_THEME.content.sectionHeaders, ...(parsed.content?.sectionHeaders || {}) },
        goals: { ...DEFAULT_THEME.content.goals, ...(parsed.content?.goals || {}) },
        footer: { ...DEFAULT_THEME.content.footer, ...(parsed.content?.footer || {}) },
      },
    };
    return NextResponse.json({ theme: merged });
  } catch (err) {
    return NextResponse.json(
      { message: "Error fetching theme", error: err.message, theme: DEFAULT_THEME },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  return handlePublish(request);
}

export async function PUT(request) {
  return handlePublish(request);
}

async function handlePublish(request) {
  const user = getAuthUser(request);
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized: Admin access required" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const body = await request.json();

    // 1. Validate Colors
    const colors = body.colors || {};
    const requiredColors = ["primary", "accent", "background", "text", "headingColor"];
    for (const key of requiredColors) {
      const val = colors[key];
      if (!val || typeof val !== "string" || !HEX_COLOR_REGEX.test(val)) {
        return NextResponse.json(
          { message: `Invalid color value for '${key}'. Must be a valid hex color (e.g. #38BDF8 or #fff)` },
          { status: 400 }
        );
      }
    }

    // 1b. Validate Light Colors (if provided)
    let lightColors = body.lightColors;
    if (lightColors) {
      for (const key of ["primary", "accent", "background", "text", "headingColor"]) {
        const val = lightColors[key];
        if (val && (typeof val !== "string" || !HEX_COLOR_REGEX.test(val))) {
          return NextResponse.json(
            { message: `Invalid light color value for '${key}'. Must be a valid hex color` },
            { status: 400 }
          );
        }
      }
    }

    // 2. Validate Typography
    const typography = body.typography || {};
    if (!typography.headingFont || !ALLOWED_FONTS.includes(typography.headingFont)) {
      return NextResponse.json(
        { message: `Invalid heading font '${typography.headingFont}'. Must be in allowed fonts list.` },
        { status: 400 }
      );
    }
    if (!typography.bodyFont || !ALLOWED_FONTS.includes(typography.bodyFont)) {
      return NextResponse.json(
        { message: `Invalid body font '${typography.bodyFont}'. Must be in allowed fonts list.` },
        { status: 400 }
      );
    }

    // 3. Validate Radius
    const allowedRadii = ["sharp", "soft", "editorial", "rounded"];
    if (body.radius && !allowedRadii.includes(body.radius)) {
      return NextResponse.json(
        { message: `Invalid radius '${body.radius}'. Must be one of: ${allowedRadii.join(", ")}` },
        { status: 400 }
      );
    }

    // 4. Validate Spacing
    const allowedSpacing = ["compact", "cozy", "airy"];
    if (body.spacing && !allowedSpacing.includes(body.spacing)) {
      return NextResponse.json(
        { message: `Invalid spacing '${body.spacing}'. Must be one of: ${allowedSpacing.join(", ")}` },
        { status: 400 }
      );
    }

    // 5. Validate Sections & Non-Hidable Rules
    let sections = body.sections;
    if (sections) {
      if (!Array.isArray(sections)) {
        return NextResponse.json({ message: "Sections must be an array" }, { status: 400 });
      }
      for (const sec of sections) {
        if ((sec.sectionId === "hero" || sec.sectionId === "contact") && sec.visible === false) {
          return NextResponse.json(
            { message: `Validation Error: The '${sec.sectionId}' section cannot be hidden.` },
            { status: 400 }
          );
        }
      }
    } else {
      sections = DEFAULT_THEME.sections;
    }

    // 6. Manage History (last 5 published states)
    let currentTheme = await SiteTheme.findOne();
    let history = currentTheme?.history || [];

    if (currentTheme) {
      const historySnapshot = {
        presetId: currentTheme.presetId || "preset-1",
        colors: currentTheme.colors,
        lightColors: currentTheme.lightColors,
        content: currentTheme.content,
        typography: currentTheme.typography,
        radius: currentTheme.radius,
        spacing: currentTheme.spacing,
        sections: currentTheme.sections,
        publishedAt: currentTheme.updatedAt || new Date(),
      };
      history.push(historySnapshot);
      if (history.length > 5) {
        history = history.slice(-5);
      }
    }

    const updatePayload = {
      presetId: body.presetId || currentTheme?.presetId || "preset-1",
      status: "published",
      colors: {
        primary: colors.primary,
        accent: colors.accent,
        background: colors.background,
        text: colors.text,
        headingColor: colors.headingColor,
      },
      lightColors: lightColors || currentTheme?.lightColors || DEFAULT_THEME.lightColors,
      content: body.content || currentTheme?.content || DEFAULT_THEME.content,
      typography: {
        headingFont: typography.headingFont,
        bodyFont: typography.bodyFont,
      },
      radius: body.radius || "soft",
      spacing: body.spacing || "cozy",
      sections: sections,
      history: history,
      updatedAt: new Date(),
    };

    let theme;
    if (!currentTheme) {
      theme = new SiteTheme(updatePayload);
      await theme.save();
    } else {
      theme = await SiteTheme.findOneAndUpdate({}, updatePayload, {
        new: true,
        runValidators: true,
      });
    }

    revalidatePath("/", "layout");
    revalidatePath("/");

    return NextResponse.json({ message: "Theme published successfully", theme });
  } catch (err) {
    return NextResponse.json(
      { message: "Error saving theme", error: err.message },
      { status: 500 }
    );
  }
}
