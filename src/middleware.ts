// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Not logged in at all
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Merchant-only routes
    if (
      req.nextUrl.pathname.startsWith("/dashboard/merchant") &&
      token.role !== "MERCHANT"
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // User-only routes
    if (
      req.nextUrl.pathname.startsWith("/dashboard/user") &&
      token.role !== "USER"
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // ✅ Allow request if checks passed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // block if not logged in
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*", // protect all dashboard routes
    "/api/products/:path*",
  ],
};
