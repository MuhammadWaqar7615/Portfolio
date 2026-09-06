import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import ThemeSettings from "../../../../models/ThemeSettings";
import { getAuthUser } from "../../../../lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await connectToDatabase();
    let theme = await ThemeSettings.findOne();
    if (!theme) {
      theme = await ThemeSettings.create({});
    }
    return NextResponse.json({ theme });
  } catch (err) {
    return NextResponse.json({ message: "Error fetching theme", error: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const user = getAuthUser(request);
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const body = await request.json();

    let theme = await ThemeSettings.findOne();
    if (!theme) {
      theme = new ThemeSettings(body);
      await theme.save();
    } else {
      theme = await ThemeSettings.findOneAndUpdate({}, body, { new: true, runValidators: true });
    }

    revalidatePath("/");
    
    return NextResponse.json({ message: "Theme updated successfully", theme });
  } catch (err) {
    return NextResponse.json({ message: "Error updating theme", error: err.message }, { status: 500 });
  }
}
