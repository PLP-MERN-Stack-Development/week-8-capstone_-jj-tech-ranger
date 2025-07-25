import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /dashboard, /admin)
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const publicPaths = ["/login", "/register", "/"]

  // Check if the path is public
  const isPublicPath = publicPaths.includes(path)

  // Get the token from the request cookies or headers
  const token = request.cookies.get("token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

  // If it's a public path and user has token, redirect to appropriate dashboard
  if (isPublicPath && token) {
    try {
      // Decode the token to get user role (mock implementation)
      const decoded = JSON.parse(atob(token))

      // Redirect based on role
      switch (decoded.role) {
        case "admin":
          return NextResponse.redirect(new URL("/admin/dashboard", request.url))
        case "counselor":
          return NextResponse.redirect(new URL("/counselor", request.url))
        case "learner":
        default:
          return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      // If token is invalid, continue to public path
    }
  }

  // If it's a protected path and no token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If user has token, verify role-based access
  if (!isPublicPath && token) {
    try {
      const decoded = JSON.parse(atob(token))

      // Check role-based access
      if (path.startsWith("/admin") && decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }

      if (path.startsWith("/counselor") && decoded.role !== "counselor") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }

      // Learners trying to access admin or counselor routes
      if ((path.startsWith("/admin") || path.startsWith("/counselor")) && decoded.role === "learner") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      // If token is invalid, redirect to login
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
