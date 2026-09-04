import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "../../../../lib/mongodb";
import Experience from "../../../../models/Experience";
import { getAuthUser } from "../../../../lib/auth";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        experience: [
          {
            _id: "exp-1",
            role: "Frontend Developer",
            company: "Bloggers Brackets",
            duration: "2024 — Present",
            description: "Leading frontend development initiatives across multiple client portals.",
          },
          {
            _id: "exp-2",
            role: "Web Developer Intern",
            company: "Bloggers Brackets",
            duration: "2023",
            description: "Engineered responsive interface modules and component workflows.",
          },
        ],
      });
    }

    const experience = await Experience.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ experience });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch experience", error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
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
    const { role, company, duration, description, order } = body;

    if (!role || !company || !duration || !description) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const item = await Experience.create({
      role,
      company,
      duration,
      description,
      order: typeof order === "number" ? order : 0,
    });

    revalidatePath("/");
    return NextResponse.json({ message: "Experience created", experience: item }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error creating experience", error: err.message }, { status: 500 });
  }
}
