import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, ADMIN_TOKEN_VALUE } from "../login/route";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  const authenticated = token === ADMIN_TOKEN_VALUE;

  return NextResponse.json({ authenticated });
}
