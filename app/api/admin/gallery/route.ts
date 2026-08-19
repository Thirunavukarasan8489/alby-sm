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
    let baseTitle = "";
    const uploadPayloads: { buffer: Buffer; filename: string }[] = [];
    const directUrls: string[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      baseTitle = (formData.get("title") as string) || "";

      // Extract all uploaded files (supports single or multiple file input)
      const rawFiles = formData.getAll("files");
      const singleFile = formData.get("file") as File | null;

      const fileList: File[] = [];
      if (rawFiles && rawFiles.length > 0) {
        rawFiles.forEach((f) => {
          if (f instanceof File && f.size > 0) fileList.push(f);
        });
      } else if (singleFile && singleFile instanceof File && singleFile.size > 0) {
        fileList.push(singleFile);
      }

      // Convert files to buffers
      for (const file of fileList) {
        const arrayBuffer = await file.arrayBuffer();
        uploadPayloads.push({
          buffer: Buffer.from(arrayBuffer),
          filename: file.name,
        });
      }
    } else {
      const body = await request.json();
      baseTitle = body.title || "";
      if (Array.isArray(body.images)) {
        directUrls.push(...body.images);
      } else if (body.image) {
        directUrls.push(body.image);
      }
    }

    const titleToUse = baseTitle.trim() || "Alby School of Music Gallery Photo";

    if (uploadPayloads.length === 0 && directUrls.length === 0) {
      return NextResponse.json(
        { success: false, message: "Please select at least one photo file to upload" },
        { status: 400 }
      );
    }

    const createdItems = [];

    // 1. Process file buffers & upload to Cloudinary in parallel
    if (uploadPayloads.length > 0) {
      const uploadPromises = uploadPayloads.map(async (payload, idx) => {
        const uploadResult = await uploadToCloudinary(payload.buffer, "alby_sm_gallery");
        return {
          title: titleToUse,
          image: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          order: Date.now() + idx,
        };
      });

      const itemsToCreate = await Promise.all(uploadPromises);
      const inserted = await GalleryItem.insertMany(itemsToCreate);
      createdItems.push(...inserted);
    }

    // 2. Process direct URLs if provided
    if (directUrls.length > 0) {
      const itemsToCreate = directUrls.map((url, idx) => ({
        title: titleToUse,
        image: url,
        publicId: "",
        order: Date.now() + idx,
      }));
      const inserted = await GalleryItem.insertMany(itemsToCreate);
      createdItems.push(...inserted);
    }

    // Revalidate frontend paths
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");

    return NextResponse.json(
      {
        success: true,
        message: `Successfully uploaded ${createdItems.length} photo(s) to Cloudinary!`,
        count: createdItems.length,
        items: createdItems,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/gallery error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload gallery photos" },
      { status: 500 }
    );
  }
}
