import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "../../../../../lib/mongodb";
import Project from "../../../../../models/Project";
import { getAuthUser } from "../../../../../lib/auth";

export async function GET(request, { params }) {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ message: "Database unavailable" }, { status: 503 });
    }

    const project = await Project.findById(params.id).lean();
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (err) {
    return NextResponse.json({ message: "Error fetching project", error: err.message }, { status: 500 });
  }
}

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

    if (body.status && !["live", "in-progress", "archived"].includes(body.status)) {
      return NextResponse.json({ message: "Invalid status value" }, { status: 400 });
    }

    const updatedProject = await Project.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    // Automatic ISR Revalidation
    revalidatePath("/");

    return NextResponse.json({ message: "Project updated", project: updatedProject });
  } catch (err) {
    return NextResponse.json({ message: "Error updating project", error: err.message }, { status: 500 });
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

    const deleted = await Project.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    // Automatic ISR Revalidation
    revalidatePath("/");

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: "Error deleting project", error: err.message }, { status: 500 });
  }
}
