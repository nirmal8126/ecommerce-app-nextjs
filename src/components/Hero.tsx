export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-center text-white">
      <h1 className="mb-4 text-5xl font-extrabold">
        Welcome to <span className="text-yellow-300">E-Shop</span>
      </h1>
      <p className="mb-6 text-lg">
        Your one-stop shop for electronics, fashion, and more 🚀
      </p>
      <div className="space-x-4">
        <a
          href="/search"
          className="rounded-md bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-500"
        >
          Shop Now
        </a>
        <a
          href="/offers"
          className="rounded-md border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black"
        >
          View Offers
        </a>
      </div>
    </section>
  );
}
