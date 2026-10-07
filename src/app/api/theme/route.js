import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import SiteTheme from "../../../../models/SiteTheme";
import { THEME_PRESETS, DEFAULT_THEME } from "../../../../lib/themeConstants";
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
    const activePresetId = parsed.presetId === "preset-1" ? "preset-1" : "preset-2";
    const preset = THEME_PRESETS[activePresetId] || THEME_PRESETS["preset-2"];

    const merged = {
      ...preset,
      ...parsed,
      presetId: activePresetId,
      colors: { ...preset.colors, ...(parsed.colors || {}) },
      lightColors: { ...preset.lightColors, ...(parsed.lightColors || {}) },
      content: {
        navbar: { ...preset.content.navbar, ...(parsed.content?.navbar || {}) },
        hero: { ...preset.content.hero, ...(parsed.content?.hero || {}) },
        about: { ...preset.content.about, ...(parsed.content?.about || {}) },
        sectionHeaders: { ...preset.content.sectionHeaders, ...(parsed.content?.sectionHeaders || {}) },
        goals: { ...preset.content.goals, ...(parsed.content?.goals || {}) },
        footer: { ...preset.content.footer, ...(parsed.content?.footer || {}) },
      },
    };

    return NextResponse.json({
      theme: merged,
      activePresetId,
      presets: [
        {
          id: "preset-1",
          name: THEME_PRESETS["preset-1"].name,
          subtitle: THEME_PRESETS["preset-1"].subtitle,
          description: THEME_PRESETS["preset-1"].description,
          badge: THEME_PRESETS["preset-1"].badge,
          typography: THEME_PRESETS["preset-1"].typography,
          colors: THEME_PRESETS["preset-1"].colors,
        },
        {
          id: "preset-2",
          name: THEME_PRESETS["preset-2"].name,
          subtitle: THEME_PRESETS["preset-2"].subtitle,
          description: THEME_PRESETS["preset-2"].description,
          badge: THEME_PRESETS["preset-2"].badge,
          typography: THEME_PRESETS["preset-2"].typography,
          colors: THEME_PRESETS["preset-2"].colors,
        },
      ],
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error fetching theme", error: err.message, theme: DEFAULT_THEME },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  return handleSetPreset(request);
}

export async function PUT(request) {
  return handleSetPreset(request);
}

async function handleSetPreset(request) {
  const user = getAuthUser(request);
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized: Admin access required" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const body = await request.json();
    const { presetId } = body;

    if (!presetId || (presetId !== "preset-1" && presetId !== "preset-2")) {
      return NextResponse.json(
        { message: "Invalid preset selected. Choose 'preset-1' or 'preset-2'." },
        { status: 400 }
      );
    }

    const preset = THEME_PRESETS[presetId];
    if (!preset) {
      return NextResponse.json({ message: "Preset configuration not found." }, { status: 404 });
    }

    // Replace theme with pure premade preset configuration
    const updatePayload = {
      presetId: preset.id,
      status: "published",
      colors: { ...preset.colors },
      lightColors: { ...preset.lightColors },
      content: { ...preset.content },
      typography: { ...preset.typography },
      radius: preset.radius,
      spacing: preset.spacing,
      sections: [...preset.sections],
      updatedAt: new Date(),
    };

    let theme = await SiteTheme.findOneAndUpdate({}, updatePayload, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    revalidatePath("/", "layout");
    revalidatePath("/");

    return NextResponse.json({
      message: `Theme preset successfully changed to: ${preset.name}`,
      activePresetId: preset.id,
      theme,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error saving theme preset", error: err.message },
      { status: 500 }
    );
  }
}
