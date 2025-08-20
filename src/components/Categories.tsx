interface CategoryProps {
  categories: {
    id: number;
    name: string;
    image: string | null;
  }[];
}

export default function Categories({ categories }: CategoryProps) {
  return (
    <section className="container mx-auto py-12">
      <h2 className="mb-6 text-2xl font-bold">Shop by Category</h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="cursor-pointer rounded-lg bg-white shadow hover:shadow-lg"
          >
            <img
              src={cat.image || "/images/placeholder.jpg"}
              alt={cat.name}
              className="h-40 w-full rounded-t-lg object-cover"
            />
            <p className="p-4 text-center font-semibold">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
