import { USER_VALID_ID } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.cookies.get(USER_VALID_ID);

  return NextResponse.json({ userId: userId?.value });
}

export async function POST(request: NextRequest, response: NextResponse) {
  const { userId } = await request.json();

  return new Response("ok", {
    status: 200,
    headers: {
      "Set-Cookie": `${USER_VALID_ID}=${userId}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 15}`,
    },
  });
}
