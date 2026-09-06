import { NextResponse } from "next/server";
import connectToDatabase from "../../../../../lib/mongodb";
import SiteTheme from "../../../../../models/SiteTheme";
import { getAuthUser } from "../../../../../lib/auth";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  const user = getAuthUser(request);
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized: Admin access required" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const body = await request.json();
    const { historyIndex } = body;

    if (typeof historyIndex !== "number" || historyIndex < 0) {
      return NextResponse.json({ message: "Invalid history index provided" }, { status: 400 });
    }

    const theme = await SiteTheme.findOne();
    if (!theme || !theme.history || theme.history.length === 0) {
      return NextResponse.json({ message: "No version history available for rollback" }, { status: 404 });
    }

    if (historyIndex >= theme.history.length) {
      return NextResponse.json({ message: "History index out of bounds" }, { status: 400 });
    }

    const targetSnapshot = theme.history[historyIndex];

    // Save current published state to history before rollback
    const currentSnapshot = {
      colors: theme.colors,
      lightColors: theme.lightColors,
      content: theme.content,
      typography: theme.typography,
      radius: theme.radius,
      spacing: theme.spacing,
      sections: theme.sections,
      publishedAt: theme.updatedAt || new Date(),
    };

    let updatedHistory = [...theme.history];
    updatedHistory.splice(historyIndex, 1); // remove the restored one from history
    updatedHistory.push(currentSnapshot);
    if (updatedHistory.length > 5) {
      updatedHistory = updatedHistory.slice(-5);
    }

    theme.status = "published";
    theme.colors = targetSnapshot.colors;
    if (targetSnapshot.lightColors) theme.lightColors = targetSnapshot.lightColors;
    if (targetSnapshot.content) theme.content = targetSnapshot.content;
    theme.typography = targetSnapshot.typography;
    theme.radius = targetSnapshot.radius;
    theme.spacing = targetSnapshot.spacing;
    theme.sections = targetSnapshot.sections;
    theme.history = updatedHistory;
    theme.updatedAt = new Date();

    await theme.save();

    revalidatePath("/", "layout");
    revalidatePath("/");

    return NextResponse.json({
      message: "Theme rolled back successfully",
      theme,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error during theme rollback", error: err.message },
      { status: 500 }
    );
  }
}
