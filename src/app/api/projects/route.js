import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "../../../../lib/mongodb";
import Project from "../../../../models/Project";
import { getAuthUser } from "../../../../lib/auth";

// Public GET route: list all projects
export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      // Fallback seed data if DB not connected
      return NextResponse.json({
        projects: [
          {
            _id: "seed-1",
            title: "Crafts & Delights",
            shortDescription: "Artisanal e-commerce web platform",
            problem: "Artisanal storefronts struggle with sluggish catalog rendering.",
            roleDecisions: "Engineered modular React component architecture.",
            techTags: ["React", "Tailwind CSS", "Framer Motion"],
            liveLink: "https://crafts-delights.vercel.app",
            codeLink: "https://github.com/MuhammadWaqar7615/",
            status: "live",
          },
          {
            _id: "seed-2",
            title: "Retreat Bookings",
            shortDescription: "Hospitality reservation system",
            problem: "Coordinating multi-property retreat reservations required real-time availability.",
            roleDecisions: "Developed full-stack reservation workflows with Node.js and MongoDB.",
            techTags: ["React", "Node.js", "Express", "MongoDB"],
            liveLink: "https://retreat-bookings.vercel.app",
            codeLink: "https://github.com/MuhammadWaqar7615/",
            status: "live",
          },
          {
            _id: "seed-3",
            title: "Ecommerce-store",
            shortDescription: "Modern cloud retail experience",
            problem: "High inventory catalogs suffer from layout shifts during search.",
            roleDecisions: "Implemented Supabase backend with optimistic UI updates.",
            techTags: ["React", "Supabase", "Tailwind CSS"],
            liveLink: "https://irfan-alyy.github.io/Ecommerce-Store/",
            codeLink: "https://github.com/MuhammadWaqar7615/",
            status: "live",
          },
          {
            _id: "seed-4",
            title: "WorkNexus",
            shortDescription: "Enterprise Resource Management platform",
            problem: "Internal business processes required streamlined coordination.",
            roleDecisions: "Designed full-stack ERM system architecture.",
            techTags: ["React", "Express", "PostgreSQL"],
            liveLink: null,
            codeLink: "https://github.com/MuhammadWaqar7615/",
            status: "in-progress",
          },
        ],
      });
    }

    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ projects });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch projects", error: err.message }, { status: 500 });
  }
}

// Protected POST route: create project
export async function POST(request) {
  const user = getAuthUser(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ message: "Database connection unavailable" }, { status: 503 });
    }

    const body = await request.json();
    const { title, shortDescription, problem, roleDecisions, techTags, codeLink, liveLink, coverImage, status, order } = body;

    if (!title || !shortDescription || !problem || !roleDecisions) {
      return NextResponse.json({ message: "Missing required project fields" }, { status: 400 });
    }

    // Status Enforcer Rule: Must be one of live, in-progress, archived
    const validStatus = ["live", "in-progress", "archived"].includes(status) ? status : "live";

    const project = await Project.create({
      title,
      shortDescription,
      problem,
      roleDecisions,
      techTags: Array.isArray(techTags) ? techTags : [techTags].filter(Boolean),
      codeLink: codeLink || null,
      liveLink: liveLink || null,
      coverImage: coverImage || null,
      status: validStatus,
      order: typeof order === "number" ? order : 0,
    });

    // Automatic ISR Revalidation
    revalidatePath("/");

    return NextResponse.json({ message: "Project created successfully", project }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error creating project", error: err.message }, { status: 500 });
  }
}
