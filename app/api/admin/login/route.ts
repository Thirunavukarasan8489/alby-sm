import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
export const ADMIN_COOKIE_NAME = "alby_admin_token";
export const ADMIN_TOKEN_VALUE = "authenticated_admin_session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || password.trim() !== ADMIN_PASSWORD.trim()) {
      return NextResponse.json(
        { success: false, message: "Invalid admin password" },
        { status: 401 },
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, ADMIN_TOKEN_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Admin authentication successful",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, message: "Server authentication error" },
      { status: 500 },
    );
  }
}
