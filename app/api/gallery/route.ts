import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { GalleryItem } from "@/lib/models/GalleryItem";

export async function GET() {
  try {
    await connectToDatabase();

    const items = await GalleryItem.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      items: items || [],
    });
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}
