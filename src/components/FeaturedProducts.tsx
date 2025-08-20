interface ProductProps {
  products: {
    id: number;
    name: string;
    price: number;
    image: string | null;
  }[];
}

export default function FeaturedProducts({ products }: ProductProps) {
  return (
    <section className="container mx-auto py-12">
      <h2 className="mb-6 text-2xl font-bold">Featured Products</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="rounded-lg bg-white p-4 shadow hover:shadow-lg"
          >
            <img
              src={p.image || "/images/placeholder.jpg"}
              alt={p.name}
              className="h-40 w-full rounded-md object-cover"
            />
            <h3 className="mt-2 font-semibold">{p.name}</h3>
            <p className="text-blue-600">${p.price.toFixed(2)}</p>
            <button className="mt-3 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
