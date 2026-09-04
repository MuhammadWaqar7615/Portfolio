import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "../../../../lib/mongodb";
import Skill from "../../../../models/Skill";
import { getAuthUser } from "../../../../lib/auth";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        skills: [
          { _id: "sk-1", name: "React.js", category: "Frontend", icon: "react" },
          { _id: "sk-2", name: "Next.js (App Router)", category: "Frontend", icon: "next" },
          { _id: "sk-3", name: "JavaScript (ES6+)", category: "Frontend", icon: "javascript" },
          { _id: "sk-4", name: "Node.js", category: "Backend", icon: "nodejs" },
          { _id: "sk-5", name: "MongoDB", category: "Backend", icon: "mongodb" },
        ],
      });
    }

    const skills = await Skill.find({}).sort({ category: 1, order: 1 }).lean();
    return NextResponse.json({ skills });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch skills", error: err.message }, { status: 500 });
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
    const { name, category, icon, order } = body;

    if (!name || !category || !icon) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const item = await Skill.create({
      name,
      category,
      icon,
      order: typeof order === "number" ? order : 0,
    });

    revalidatePath("/");
    return NextResponse.json({ message: "Skill created", skill: item }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error creating skill", error: err.message }, { status: 500 });
  }
}
