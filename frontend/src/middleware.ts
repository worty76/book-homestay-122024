import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define paths that are publicly accessible
const publicPaths = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/",
];

// Define paths that should be protected (require authentication)
const protectedPaths = ["/dashboard", "/profile", "/settings", "/bookings"];

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl;

  // Check if path is protected
  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // Check if path is public
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // Get the auth token from the cookies
  const authToken = request.cookies.get("auth-storage")?.value;

  // Parse the token to check if the user is authenticated
  let isAuthenticated = false;

  if (authToken) {
    try {
      const parsedToken = JSON.parse(decodeURIComponent(authToken));
      isAuthenticated = parsedToken?.state?.isAuthenticated || false;
    } catch (error) {
      console.error("Error parsing auth token:", error);
    }
  }

  // If it's a protected path and user is not authenticated, redirect to login
  if (isProtectedPath && !isAuthenticated) {
    // Create the URL to redirect to
    const loginUrl = new URL("/login", request.url);
    // Add the "from" search parameter so we can redirect back after login
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access login page, redirect to dashboard
  if (isAuthenticated && isPublicPath && pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (/api/*)
     * - static files (/_next/*, /images/*, /favicon.ico, etc.)
     */
    "/((?!api|_next|images|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
