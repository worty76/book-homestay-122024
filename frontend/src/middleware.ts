import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/",
];

const protectedPaths = ["/dashboard", "/profile", "/settings", "/bookings"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const authToken = request.cookies.get("auth-storage")?.value;

  let isAuthenticated = false;

  if (authToken) {
    try {
      const parsedToken = JSON.parse(decodeURIComponent(authToken));
      isAuthenticated = parsedToken?.state?.isAuthenticated || false;
    } catch (error) {
      console.error("Error parsing auth token:", error);
    }
  }

  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isPublicPath && pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|images|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
