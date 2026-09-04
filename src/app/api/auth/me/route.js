import { NextResponse } from "next/server";
import { getAuthUser } from "../../../../../lib/auth";

export async function GET(request) {
  const user = getAuthUser(request);
  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid or missing token" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user,
  });
}
