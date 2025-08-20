import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Offers from "@/components/Offers";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";

type ProductCard = {
  id: number;
  name: string;
  price: number;
  image: string | null;
};

export default async function HomePage() {
  let categories: Category[] = [];
  let formattedProducts: ProductCard[] = [];

  try {
    categories = await prisma.category.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    });

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        images: true, // from schema
      },
      take: 8,
      orderBy: { createdAt: "desc" },
    });

    formattedProducts = products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.images, // alias to match FeaturedProducts props
    }));
  } catch (error) {
    console.error("DB fetch error:", error);
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <Hero />
        <Categories categories={categories} />
        <FeaturedProducts products={formattedProducts} />
        <Offers />
      </main>

      <Footer />
    </div>
  );
}
