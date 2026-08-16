import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { Testimonial } from "@/lib/models/Testimonial";
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
    const body = await request.json();
    const { name, role, instrument, quote, rating, featured, order } = body;

    await connectToDatabase();

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        ...(name && { name: name.trim() }),
        ...(role && { role: role.trim() }),
        ...(instrument && { instrument }),
        ...(quote && { quote: quote.trim() }),
        ...(rating !== undefined && { rating: Number(rating) }),
        ...(featured !== undefined && { featured: Boolean(featured) }),
        ...(order !== undefined && { order: Number(order) }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedTestimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

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
