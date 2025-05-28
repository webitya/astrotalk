import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/astrologer/dashboard", "/chat", "/payment", "/booking"]
  const astrologerRoutes = ["/astrologer/dashboard"]
  const userRoutes = ["/dashboard", "/chat", "/payment", "/booking"]

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute) {
    const token =
      request.cookies.get("auth-token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")

      // Allow superkey access to everything
      if (decoded.isSuperkey) {
        return NextResponse.next()
      }

      // Check role-based access
      if (astrologerRoutes.some((route) => pathname.startsWith(route)) && decoded.role !== "astrologer") {
        return NextResponse.redirect(new URL("/auth/astrologer-login", request.url))
      }

      if (userRoutes.some((route) => pathname.startsWith(route)) && decoded.role !== "user") {
        return NextResponse.redirect(new URL("/auth/login", request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/astrologer/:path*", "/chat/:path*", "/payment/:path*", "/booking/:path*"],
}
