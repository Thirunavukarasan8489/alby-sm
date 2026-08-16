import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import { ContactSubmission } from "@/lib/models/ContactSubmission";
import { ADMIN_COOKIE_NAME, ADMIN_TOKEN_VALUE } from "../../login/route";

async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return token === ADMIN_TOKEN_VALUE;
}

// PUT: Update lead status ("new" | "contacted" | "enrolled" | "archived")
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
    const { status } = body;

    const validStatuses = ["new", "contacted", "enrolled", "archived"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status value provided" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updatedLead = await ContactSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLead) {
      return NextResponse.json(
        { success: false, message: "Lead submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Lead status updated to ${status}`,
      lead: updatedLead,
    });
  } catch (error) {
    console.error("PUT /api/admin/leads/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update lead status" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a lead submission
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

    const deletedLead = await ContactSubmission.findByIdAndDelete(id);

    if (!deletedLead) {
      return NextResponse.json(
        { success: false, message: "Lead submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/admin/leads/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
