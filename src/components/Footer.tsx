export default function Footer() {
  return (
    <footer className="mt-12 bg-gray-800 py-6 text-center text-white">
      <p>© {new Date().getFullYear()} E-Shop. All rights reserved.</p>
      <p className="mt-2 text-sm text-gray-400">
        Built with Next.js, Prisma, Tailwind & shadcn/ui
      </p>
    </footer>
  );
}
