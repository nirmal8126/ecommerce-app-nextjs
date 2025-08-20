"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        🛍️ E-Shop
      </Link>

      {/* Menu */}
      <nav className="flex items-center gap-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link href="/search" className="hover:text-blue-600">
          Search
        </Link>
        <Link href="/cart" className="hover:text-blue-600">
          Cart
        </Link>

        {/* Auth / Dashboard links */}
        {!user && (
          <>
            <Link href="/auth/login" className="hover:text-blue-600">
              Login
            </Link>
            <Link href="/auth/signup" className="hover:text-blue-600">
              Signup
            </Link>
          </>
        )}

        {user && user.role === "MERCHANT" && (
          <Link href="/dashboard/merchant" className="hover:text-blue-600">
            Dashboard
          </Link>
        )}

        {user && user.role === "USER" && (
          <Link href="/dashboard/user" className="hover:text-blue-600">
            My Account
          </Link>
        )}

        {user && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </Button>
        )}
      </nav>
    </header>
  );
}
