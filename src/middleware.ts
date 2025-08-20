import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Example: Only allow merchants to access /dashboard/merchant
    if (
      req.nextUrl.pathname.startsWith("/dashboard/merchant") &&
      req.nextauth.token?.role !== "MERCHANT"
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Example: Only allow normal users to access /dashboard/user
    if (
      req.nextUrl.pathname.startsWith("/dashboard/user") &&
      req.nextauth.token?.role !== "USER"
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // block all routes if not logged in
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*", // protect all /dashboard routes
  ],
};
