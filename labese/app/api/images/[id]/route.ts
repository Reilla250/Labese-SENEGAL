import { NextRequest, NextResponse } from "next/server";
import { getImageFromDb } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const image = await getImageFromDb(id);

    if (!image) {
      return new NextResponse("Image not found", { status: 404 });
    }

    return new NextResponse(image.data, {
      status: 200,
      headers: {
        "Content-Type": image.mimeType,
        "Content-Disposition": `inline; filename="${image.name}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (e) {
    console.error("Failed to serve image:", e);
    return new NextResponse("Error serving image", { status: 500 });
  }
}
