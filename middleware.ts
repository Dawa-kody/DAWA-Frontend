import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isExclude =
    pathname.startsWith("/Signin") ||
    pathname.startsWith("/Signup") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/icon/") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico";

  if (isExclude) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get("refreshToken")?.value;
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/Signin", request.url));
  }

  return NextResponse.next();
}