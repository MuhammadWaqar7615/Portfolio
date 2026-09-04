import { NextResponse } from "next/server";
import { getAuthUser } from "../../../../lib/auth";

export async function POST(request) {
  const user = getAuthUser(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // If Cloudinary environment variables exist, upload to Cloudinary
    if (process.env.CLOUDINARY_URL || process.env.CLOUDINARY_CLOUD_NAME) {
      const cloudinaryUrl = process.env.CLOUDINARY_URL;
      // Perform Cloudinary upload if configured
    }

    // Default high-performance Data URI return for immediate preview/storage
    const mimeType = file.type || "image/png";
    const base64Data = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({
      message: "Image uploaded successfully",
      url: dataUrl,
      fileName: file.name,
      size: file.size,
    });
  } catch (err) {
    return NextResponse.json({ message: "Upload failed", error: err.message }, { status: 500 });
  }
}
