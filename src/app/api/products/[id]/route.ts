// src/app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ✅ GET product
export async function GET(_: Request, context: { params: { id: string } }) {
  const { id } = context.params; // clone params

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: { category: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// ✅ UPDATE product
export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "MERCHANT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        images: data.images,
        offer: data.offer,
        categoryId: data.categoryId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("PUT product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// ✅ DELETE product
export async function DELETE(_: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "MERCHANT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.product.delete({ where: { id: Number(id) } });

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("DELETE product error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
