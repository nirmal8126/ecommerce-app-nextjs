export default function Offers() {
  return (
    <section className="bg-yellow-100 py-12 text-center">
      <h2 className="mb-4 text-3xl font-bold">Special Offers 🎉</h2>
      <p className="mb-6 text-gray-700">
        Get up to <span className="font-bold text-red-600">50% OFF</span> on
        selected items this week!
      </p>
      <a
        href="/offers"
        className="rounded-md bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
      >
        Grab Deals
      </a>
    </section>
  );
}
