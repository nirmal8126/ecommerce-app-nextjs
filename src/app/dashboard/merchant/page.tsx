"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MerchantDashboard() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600">
            Add new products to your store with details like name, price, category, and stock.
          </p>
          <Button onClick={() => router.push("/dashboard/merchant/products/add")}>
            Add Product
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600">View, edit, or remove your listed products.</p>
          <Button onClick={() => router.push("/dashboard/merchant/products")}>
            View Products
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600">Check all orders placed for your products.</p>
          <Button onClick={() => router.push("/dashboard/merchant/orders")}>
            View Orders
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
