import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    return NextResponse.json({
      status: "online",
      database: conn ? "connected" : "not configured (provide MONGODB_URI)",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
