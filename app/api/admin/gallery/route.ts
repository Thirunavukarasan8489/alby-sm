import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { GalleryItem } from "@/lib/models/GalleryItem";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { ADMIN_COOKIE_NAME, ADMIN_TOKEN_VALUE } from "../login/route";

async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return token === ADMIN_TOKEN_VALUE;
}

export async function POST(request: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized admin access" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const contentType = request.headers.get("content-type") || "";
    let title = "";
    let category = "piano";
    let caption = "";
    let imageUrl = "";
    let publicId = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      title = (formData.get("title") as string) || "";
      category = (formData.get("category") as string) || "piano";
      caption = (formData.get("caption") as string) || "";

      const file = formData.get("file") as File | null;
      const directImageUrl = formData.get("imageUrl") as string | null;

      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await uploadToCloudinary(buffer, "alby_sm_gallery");
        imageUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
      } else if (directImageUrl) {
        imageUrl = directImageUrl;
      } else {
        return NextResponse.json(
          { success: false, message: "Please select an image file to upload" },
          { status: 400 }
        );
      }
    } else {
      const body = await request.json();
      title = body.title || "";
      category = body.category || "piano";
      caption = body.caption || "";
      imageUrl = body.image || "";
      publicId = body.publicId || "";

      if (body.fileDataUri) {
        const uploadResult = await uploadToCloudinary(
          body.fileDataUri,
          "alby_sm_gallery"
        );
        imageUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
      }
    }

    if (!title.trim()) {
      return NextResponse.json(
        { success: false, message: "Photo title is required" },
        { status: 400 }
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: "Image upload failed or image URL missing" },
        { status: 400 }
      );
    }

    // Determine display tag
    const tagMap: Record<string, "Piano" | "Keyboard" | "Faculty" | "Events"> = {
      piano: "Piano",
      keyboard: "Keyboard",
      faculty: "Faculty",
      events: "Events",
    };
    const tag = tagMap[category.toLowerCase()] || "Piano";

    const newItem = await GalleryItem.create({
      title: title.trim(),
      category: category.toLowerCase() as any,
      tag,
      image: imageUrl,
      publicId,
      caption: caption.trim(),
      order: Date.now(),
    });

    // Revalidate frontend paths
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");

    return NextResponse.json(
      {
        success: true,
        message: "Gallery photo uploaded successfully!",
        item: newItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/gallery error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload gallery photo" },
      { status: 500 }
    );
  }
}
