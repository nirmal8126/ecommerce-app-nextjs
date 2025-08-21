// src/app/api/products/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = (formData.get("description") as string) || "";
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string);
    const categoryId = parseInt(formData.get("categoryId") as string);
    const merchantId = parseInt(formData.get("merchantId") as string); // TODO: get from session
    const images = formData.getAll("images") as File[];

    // Ensure /public/uploads exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Save images
    const imagePaths: string[] = [];
    for (const file of images) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);

      imagePaths.push(`/uploads/${fileName}`);
    }

    // Save product to DB
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        categoryId,
        images: imagePaths.join(","), // CSV string, could normalize later
        merchantId,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Add product error:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
