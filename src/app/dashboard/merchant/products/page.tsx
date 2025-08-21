"use client";

import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductsPage() {
  const { data: products, mutate } = useSWR("/api/products", fetcher);
  const router = useRouter();

  if (!products) return <p>Loading...</p>;

  async function handleDelete(id: number) {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    mutate(); // refresh
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Products</h2>
        <Button onClick={() => router.push("/dashboard/merchant/products/add")}>
          Add Product
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p: any) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>${p.price}</TableCell>
              <TableCell>{p.stock}</TableCell>
              <TableCell>{p.category?.name}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="outline"
                  className="mr-2"
                  onClick={() =>
                    router.push(`/dashboard/merchant/products/${p.id}/edit`)
                  }
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
