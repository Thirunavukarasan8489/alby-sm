import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import { ContactSubmission } from "@/lib/models/ContactSubmission";
import { ADMIN_COOKIE_NAME, ADMIN_TOKEN_VALUE } from "../login/route";

async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return token === ADMIN_TOKEN_VALUE;
}

export async function GET() {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized admin access" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const leads = await ContactSubmission.find({})
      .sort({ createdAt: -1 })
      .lean();

    const metrics = {
      total: leads.length,
      newCount: leads.filter((l) => l.status === "new").length,
      contactedCount: leads.filter((l) => l.status === "contacted").length,
      enrolledCount: leads.filter((l) => l.status === "enrolled").length,
      archivedCount: leads.filter((l) => l.status === "archived").length,
    };

    return NextResponse.json({
      success: true,
      metrics,
      leads,
    });
  } catch (error) {
    console.error("GET /api/admin/leads error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
