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
  let isAdmin = false;

  if (authToken) {
    try {
      const parsedToken = JSON.parse(decodeURIComponent(authToken));
      isAuthenticated = parsedToken?.state?.isAuthenticated || false;
      isAdmin = parsedToken?.state?.isAdmin || false;
    } catch (error) {
      console.error("Error parsing auth token:", error);
    }
  }

  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/dashboard") && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuthenticated && isPublicPath && pathname === "/login") {
    return NextResponse.redirect(
      new URL(isAdmin ? "/dashboard" : "/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|images|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
