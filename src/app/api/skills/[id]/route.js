import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "../../../../../lib/mongodb";
import Skill from "../../../../../models/Skill";
import { getAuthUser } from "../../../../../lib/auth";

export async function PUT(request, { params }) {
  const user = getAuthUser(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ message: "Database unavailable" }, { status: 503 });
    }

    const body = await request.json();
    const resolvedParams = await params;
    const updated = await Skill.findByIdAndUpdate(resolvedParams.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }

    revalidatePath("/");
    return NextResponse.json({ message: "Skill updated", skill: updated });
  } catch (err) {
    return NextResponse.json({ message: "Error updating skill", error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const user = getAuthUser(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ message: "Database unavailable" }, { status: 503 });
    }

    const resolvedParams = await params;
    const deleted = await Skill.findByIdAndDelete(resolvedParams.id);
    if (!deleted) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }

    revalidatePath("/");
    return NextResponse.json({ message: "Skill deleted" });
  } catch (err) {
    return NextResponse.json({ message: "Error deleting skill", error: err.message }, { status: 500 });
  }
}
