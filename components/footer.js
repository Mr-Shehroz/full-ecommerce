import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white px-4 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-teal-500">YourShop</h2>
          <p className="text-sm text-gray-400">
            Discover the best deals and stylish products delivered to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-200">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-teal-500">Home</Link></li>
            <li><Link href="/products" className="hover:text-teal-500">Shop</Link></li>
            <li><Link href="/categories" className="hover:text-teal-500">Categories</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-200">Subscribe</h3>
          <p className="text-sm text-gray-400 mb-3">
            Get updates on the latest products and offers.
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-md bg-slate-800 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-slate-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} YourShop. All rights reserved.
      </div>
    </footer>
  );
}
