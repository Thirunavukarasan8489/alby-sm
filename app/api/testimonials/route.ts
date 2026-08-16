import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { Testimonial } from "@/lib/models/Testimonial";
import { TESTIMONIALS as INITIAL_TESTIMONIALS } from "@/lib/constants";
import { ADMIN_COOKIE_NAME, ADMIN_TOKEN_VALUE } from "../admin/login/route";

// Helper to check admin authentication
async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return token === ADMIN_TOKEN_VALUE;
}

// GET: Fetch all testimonials (Public)
export async function GET() {
  try {
    await connectToDatabase();

    let testimonials = await Testimonial.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();

    // Auto-seed initial testimonials if DB is empty
    if (!testimonials || testimonials.length === 0) {
      const seedItems = INITIAL_TESTIMONIALS.map((item: any, idx) => ({
        name: item.author,
        role: item.role,
        instrument: item.instrument || "Piano",
        quote: item.quote,
        rating: item.rating || 5,
        featured: true,
        order: idx,
      }));

      await Testimonial.insertMany(seedItems);
      testimonials = await Testimonial.find({})
        .sort({ order: 1, createdAt: -1 })
        .lean();
    }

    return NextResponse.json({
      success: true,
      testimonials,
    });
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST: Create a new testimonial (Admin Only)
export async function POST(request: Request) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized admin access" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, role, instrument, quote, rating, featured, order } = body;

    if (!name || !role || !quote) {
      return NextResponse.json(
        { success: false, message: "Name, role, and quote are required fields" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newTestimonial = await Testimonial.create({
      name: name.trim(),
      role: role.trim(),
      instrument: instrument || "Piano",
      quote: quote.trim(),
      rating: Number(rating) || 5,
      featured: featured !== undefined ? Boolean(featured) : true,
      order: Number(order) || 0,
    });

    // Revalidate paths so Next.js static pages update automatically
    revalidatePath("/");
    revalidatePath("/admin/testimonials");

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial created successfully",
        testimonial: newTestimonial,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
