import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "../../../../../lib/mongodb";
import Experience from "../../../../../models/Experience";
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
    const updated = await Experience.findByIdAndUpdate(resolvedParams.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ message: "Experience entry not found" }, { status: 404 });
    }

    revalidatePath("/");
    return NextResponse.json({ message: "Experience updated", experience: updated });
  } catch (err) {
    return NextResponse.json({ message: "Error updating experience", error: err.message }, { status: 500 });
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
    const deleted = await Experience.findByIdAndDelete(resolvedParams.id);
    if (!deleted) {
      return NextResponse.json({ message: "Experience entry not found" }, { status: 404 });
    }

    revalidatePath("/");
    return NextResponse.json({ message: "Experience entry deleted" });
  } catch (err) {
    return NextResponse.json({ message: "Error deleting experience", error: err.message }, { status: 500 });
  }
}
