import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "../../../../lib/mongodb";
import SiteMetadata from "../../../../models/SiteMetadata";
import { getAuthUser } from "../../../../lib/auth";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        metadata: {
          title: "Muhammad Waqar — Frontend & Full-Stack Engineer",
          description: "Portfolio of Muhammad Waqar, a Frontend & Full-Stack Engineer specializing in React, Next.js, TypeScript, and high-performance user interfaces.",
          ogImage: "https://muhammad-waqar.me/opengraph-image",
          canonicalUrl: "https://muhammad-waqar.me",
        },
      });
    }

    let metadata = await SiteMetadata.findOne().lean();
    if (!metadata) {
      metadata = await SiteMetadata.create({
        title: "Muhammad Waqar — Frontend & Full-Stack Engineer",
        description: "Portfolio of Muhammad Waqar, a Frontend & Full-Stack Engineer specializing in React, Next.js, TypeScript, and high-performance user interfaces.",
        ogImage: "https://muhammad-waqar.me/opengraph-image",
        canonicalUrl: "https://muhammad-waqar.me",
      });
    }

    return NextResponse.json({ metadata });
  } catch (err) {
    return NextResponse.json({ message: "Error fetching site metadata", error: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
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
    let metadata = await SiteMetadata.findOne();

    if (!metadata) {
      metadata = await SiteMetadata.create(body);
    } else {
      Object.assign(metadata, body);
      await metadata.save();
    }

    revalidatePath("/");
    revalidatePath("/resume");

    return NextResponse.json({ message: "Site metadata updated successfully", metadata });
  } catch (err) {
    return NextResponse.json({ message: "Error updating site metadata", error: err.message }, { status: 500 });
  }
}
