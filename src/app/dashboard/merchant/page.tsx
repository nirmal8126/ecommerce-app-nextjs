"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MerchantDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p className="flex h-screen items-center justify-center">Loading...</p>;
  }

  if (!session || session.user.role !== "MERCHANT") {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-6 text-3xl font-bold">Merchant Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Card: Add Product */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">
              Add new products to your store with details like name, price, category,
              and stock.
            </p>
            <Button onClick={() => router.push("/dashboard/merchant/products/add")}>
              Add Product
            </Button>
          </CardContent>
        </Card>

        {/* Card: Manage Products */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">
              View, edit, or remove your listed products.
            </p>
            <Button onClick={() => router.push("/dashboard/merchant/products")}>
              View Products
            </Button>
          </CardContent>
        </Card>

        {/* Card: View Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">
              Check all orders placed for your products and update their status.
            </p>
            <Button className="cursor-pointer" onClick={() => router.push("/dashboard/merchant/orders")}>
              View Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
