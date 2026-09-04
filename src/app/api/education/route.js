import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "../../../../lib/mongodb";
import Education from "../../../../models/Education";
import { getAuthUser } from "../../../../lib/auth";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        education: [
          {
            _id: "edu-1",
            degree: "Bachelor of Science in Computer Science",
            institution: "The Islamia University of Bahawalpur",
            year: "2022 — 2026",
          },
          {
            _id: "edu-2",
            degree: "Intermediate in Computer Science (ICS)",
            institution: "Iqra Army Public School & College",
            year: "2021 — 2022",
          },
          {
            _id: "edu-3",
            degree: "Matriculation (Computer Science)",
            institution: "Army Public School and College System",
            year: "2019 — 2020",
          },
        ],
      });
    }

    const education = await Education.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ education });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch education", error: err.message }, { status: 500 });
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
    const { degree, institution, year, order } = body;

    if (!degree || !institution || !year) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const item = await Education.create({
      degree,
      institution,
      year,
      order: typeof order === "number" ? order : 0,
    });

    revalidatePath("/");
    return NextResponse.json({ message: "Education created", education: item }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error creating education", error: err.message }, { status: 500 });
  }
}
