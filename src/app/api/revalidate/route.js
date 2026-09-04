import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path") || "/";

  const expectedSecret =
    process.env.REVALIDATION_SECRET || "revalidation_secret_portfolio_2026";

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid revalidation token" },
      { status: 401 }
    );
  }

  try {
    revalidatePath(path);
    return NextResponse.json({
      revalidated: true,
      path,
      now: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to revalidate path", error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  // Support both GET query and POST JSON body
  let secret;
  let path = "/";

  try {
    const body = await request.json();
    secret = body.secret;
    path = body.path || "/";
  } catch {
    const { searchParams } = new URL(request.url);
    secret = searchParams.get("secret");
    path = searchParams.get("path") || "/";
  }

  const expectedSecret =
    process.env.REVALIDATION_SECRET || "revalidation_secret_portfolio_2026";

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid revalidation token" },
      { status: 401 }
    );
  }

  try {
    revalidatePath(path);
    return NextResponse.json({
      revalidated: true,
      path,
      now: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to revalidate path", error: err.message },
      { status: 500 }
    );
  }
}
