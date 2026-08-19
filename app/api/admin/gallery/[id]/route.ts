import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { GalleryItem } from "@/lib/models/GalleryItem";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { ADMIN_COOKIE_NAME, ADMIN_TOKEN_VALUE } from "../../login/route";

async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return token === ADMIN_TOKEN_VALUE;
}

// PUT: Update photo title / alt text
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized admin access" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { title } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, message: "Photo title / alt text is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updatedItem = await GalleryItem.findByIdAndUpdate(
      id,
      { title: title.trim() },
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json(
        { success: false, message: "Gallery item not found" },
        { status: 404 }
      );
    }

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");

    return NextResponse.json({
      success: true,
      message: "Photo title updated successfully!",
      item: updatedItem,
    });
  } catch (error) {
    console.error("PUT /api/admin/gallery/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update gallery photo" },
      { status: 500 }
    );
  }
}

// DELETE: Remove photo from MongoDB and destroy Cloudinary asset
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized admin access" },
        { status: 401 }
      );
    }

    const { id } = await params;
    await connectToDatabase();

    const item = await GalleryItem.findById(id);
    if (!item) {
      return NextResponse.json(
        { success: false, message: "Gallery item not found" },
        { status: 404 }
      );
    }

    // Destroy Cloudinary asset if publicId exists
    if (item.publicId) {
      await deleteFromCloudinary(item.publicId);
    }

    await GalleryItem.findByIdAndDelete(id);

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");

    return NextResponse.json({
      success: true,
      message: "Gallery photo deleted successfully!",
    });
  } catch (error) {
    console.error("DELETE /api/admin/gallery/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete gallery photo" },
      { status: 500 }
    );
  }
}
