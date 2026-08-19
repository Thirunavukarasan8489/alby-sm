import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { Testimonial } from "@/lib/models/Testimonial";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { ADMIN_COOKIE_NAME, ADMIN_TOKEN_VALUE } from "../../admin/login/route";

async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return token === ADMIN_TOKEN_VALUE;
}

// PUT: Update an existing testimonial (Admin Only)
export async function PUT(
  request: Request,
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

    const existingTestimonial = await Testimonial.findById(id);
    if (!existingTestimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    const contentType = request.headers.get("content-type") || "";
    let name = existingTestimonial.name;
    let role = existingTestimonial.role;
    let instrument = existingTestimonial.instrument;
    let quote = existingTestimonial.quote;
    let rating = existingTestimonial.rating;
    let featured = existingTestimonial.featured;
    let order = existingTestimonial.order;
    let imageUrl = existingTestimonial.image || "";
    let publicId = existingTestimonial.publicId || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      if (formData.has("name")) name = (formData.get("name") as string) || name;
      if (formData.has("role")) role = (formData.get("role") as string) || role;
      if (formData.has("instrument")) instrument = (formData.get("instrument") as any) || instrument;
      if (formData.has("quote")) quote = (formData.get("quote") as string) || quote;
      if (formData.has("rating")) rating = Number(formData.get("rating")) || rating;
      if (formData.has("featured")) featured = formData.get("featured") !== "false";
      if (formData.has("order")) order = Number(formData.get("order")) || order;

      const file = formData.get("file") as File | null;
      if (file && file.size > 0) {
        // Destroy old Cloudinary asset if exists
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await uploadToCloudinary(buffer, "alby_sm_testimonials");
        imageUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
      }
    } else {
      const body = await request.json();
      if (body.name !== undefined) name = body.name;
      if (body.role !== undefined) role = body.role;
      if (body.instrument !== undefined) instrument = body.instrument;
      if (body.quote !== undefined) quote = body.quote;
      if (body.rating !== undefined) rating = Number(body.rating);
      if (body.featured !== undefined) featured = Boolean(body.featured);
      if (body.order !== undefined) order = Number(body.order);
      if (body.image !== undefined) imageUrl = body.image;
      if (body.publicId !== undefined) publicId = body.publicId;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        role: role.trim(),
        instrument: instrument as any,
        quote: quote.trim(),
        rating: Number(rating),
        featured: Boolean(featured),
        order: Number(order),
        image: imageUrl,
        publicId: publicId,
      },
      { new: true, runValidators: true }
    );

    revalidatePath("/");
    revalidatePath("/admin/testimonials");

    return NextResponse.json({
      success: true,
      message: "Testimonial updated successfully",
      testimonial: updatedTestimonial,
    });
  } catch (error) {
    console.error("PUT /api/testimonials/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a testimonial (Admin Only)
export async function DELETE(
  request: Request,
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

    const deletedItem = await Testimonial.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    // Destroy Cloudinary image asset if present
    if (deletedItem.publicId) {
      await deleteFromCloudinary(deletedItem.publicId);
    }

    revalidatePath("/");
    revalidatePath("/admin/testimonials");

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/testimonials/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
