import Image from "next/image";
import Link from "next/link";
import { CartContext } from "./cartContext";
import { useContext } from "react";

export default function BestSelling({ products = [] }) {
  const { addProduct } = useContext(CartContext)
  return (
    <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">
          Best Selling Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="relative w-full h-56 rounded-t-2xl overflow-hidden">
                <Image
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {product.title}
                </h3>
                <p className="text-teal-500 font-bold text-xl">${product.price}</p>
                <div className="flex justify-between pt-2">
                  <Link
                    href={`/product/${product._id}`}
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-5 py-2 rounded-xl text-sm font-medium transition"
                  >
                    Read More
                  </Link>
                  <button
                    onClick={() => addProduct(product._id)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
