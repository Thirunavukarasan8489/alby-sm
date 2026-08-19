import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { GalleryItem } from "@/lib/models/GalleryItem";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { ADMIN_COOKIE_NAME, ADMIN_TOKEN_VALUE } from "../../login/route";

async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return token === ADMIN_TOKEN_VALUE;
}

// PUT: Update gallery photo details
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
    await connectToDatabase();

    const existingItem = await GalleryItem.findById(id);
    if (!existingItem) {
      return NextResponse.json(
        { success: false, message: "Gallery item not found" },
        { status: 404 }
      );
    }

    const contentType = request.headers.get("content-type") || "";
    let title = existingItem.title;
    let category = existingItem.category;
    let caption = existingItem.caption;
    let imageUrl = existingItem.image;
    let publicId = existingItem.publicId;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      title = (formData.get("title") as string) || title;
      category = ((formData.get("category") as string) || category) as any;
      caption = (formData.get("caption") as string) || caption;

      const file = formData.get("file") as File | null;
      if (file && file.size > 0) {
        // Destroy old asset if publicId exists
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await uploadToCloudinary(buffer, "alby_sm_gallery");
        imageUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
      }
    } else {
      const body = await request.json();
      title = body.title || title;
      category = body.category || category;
      caption = body.caption !== undefined ? body.caption : caption;

      if (body.fileDataUri) {
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }
        const uploadResult = await uploadToCloudinary(
          body.fileDataUri,
          "alby_sm_gallery"
        );
        imageUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
      }
    }

    const tagMap: Record<string, "Piano" | "Keyboard" | "Faculty" | "Events"> = {
      piano: "Piano",
      keyboard: "Keyboard",
      faculty: "Faculty",
      events: "Events",
    };
    const tag = tagMap[category.toLowerCase()] || "Piano";

    const updatedItem = await GalleryItem.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        category: category.toLowerCase() as any,
        tag,
        image: imageUrl,
        publicId,
        caption: caption ? caption.trim() : "",
      },
      { new: true }
    );

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");

    return NextResponse.json({
      success: true,
      message: "Gallery photo updated successfully!",
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
