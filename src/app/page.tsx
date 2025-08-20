import Header from "@/components/Header";

export default function HomePage() {
  return (
    <div>
      <Header />
      <main className="flex flex-col items-center justify-center py-16">
        <h1 className="mb-4 text-4xl font-bold">Welcome to E-Shop</h1>
        <p className="mb-6 text-lg text-gray-600">
          Your one-stop shop for amazing products 🚀
        </p>
      </main>
    </div>
  );
}
