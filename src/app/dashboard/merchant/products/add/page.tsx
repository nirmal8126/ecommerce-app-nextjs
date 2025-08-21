"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    images: "",
    categoryId: "",
  });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        categoryId: parseInt(form.categoryId),
      }),
    });
    router.push("/dashboard/merchant/products");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">Add Product</h2>

      <div>
        <Label>Name</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <Label>Description</Label>
        <Input
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <div>
        <Label>Price</Label>
        <Input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
      </div>
      <div>
        <Label>Stock</Label>
        <Input
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
      </div>
      <div>
        <Label>Image URL</Label>
        <Input
          value={form.images}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
        />
      </div>
      <div>
        <Label>Category ID</Label>
        <Input
          type="number"
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        />
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
}
