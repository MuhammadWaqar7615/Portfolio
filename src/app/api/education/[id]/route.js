import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "../../../../../lib/mongodb";
import Education from "../../../../../models/Education";
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
    const updated = await Education.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ message: "Education entry not found" }, { status: 404 });
    }

    revalidatePath("/");
    return NextResponse.json({ message: "Education updated", education: updated });
  } catch (err) {
    return NextResponse.json({ message: "Error updating education", error: err.message }, { status: 500 });
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

    const deleted = await Education.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ message: "Education entry not found" }, { status: 404 });
    }

    revalidatePath("/");
    return NextResponse.json({ message: "Education entry deleted" });
  } catch (err) {
    return NextResponse.json({ message: "Error deleting education", error: err.message }, { status: 500 });
  }
}
