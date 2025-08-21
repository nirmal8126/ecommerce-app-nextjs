"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function MerchantLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (status === "loading") {
    return <p className="flex h-screen items-center justify-center">Loading...</p>;
  }

  if (!session || session.user.role !== "MERCHANT") {
    router.push("/auth/login");
    return null;
  }

  const menus = [
    { name: "Dashboard", href: "/dashboard/merchant" },
    { name: "Products", href: "/dashboard/merchant/products" },
    { name: "Orders", href: "/dashboard/merchant/orders" },
    { name: "Transactions", href: "/dashboard/merchant/transactions" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-2xl font-bold text-blue-600">Merchant</div>
        <nav className="mt-4 flex flex-col space-y-2">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className={`px-6 py-2 text-sm font-medium ${
                pathname === menu.href ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {menu.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
          <h1 className="text-xl font-semibold">Merchant Dashboard</h1>
          <button
            onClick={() => {
              document.cookie = "auth_token=; Max-Age=0; path=/;";
              router.push("/auth/login");
            }}
            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
