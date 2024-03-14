import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UN_REGISTERED_URL, USER_VALID_ID } from "./constants";

export default function middleware(request: NextRequest) {
  const userId = request.cookies.get(USER_VALID_ID);

  if (userId) {
    const response = NextResponse.next();

    response.cookies.set(USER_VALID_ID, userId.value, {
      maxAge: 15 * 24 * 60 * 60, // Cookie有效期15天
      path: "/", // 在整个站点有效
      httpOnly: true, // 增加安全性，阻止JS访问此Cookie
    });

    return response;
  } else {
    return NextResponse.redirect(new URL(UN_REGISTERED_URL, request.url));
  }
}

export const config = {
  matcher: ["/"],
};
