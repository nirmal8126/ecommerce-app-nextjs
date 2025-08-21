// src/schemas/product.ts
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0, "Price must be positive"),
  stock: z.coerce.number().int().min(0, "Stock must be positive"),
  categoryId: z.coerce.number().int().min(1, "Category is required"),
  images: z.instanceof(FileList).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
