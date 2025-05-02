import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./cartContext";

export default function NewProducts({ products = [] }) {
  const { addProduct } = useContext(CartContext)

  return (
    <section className="py-16 px-4 bg-slate-100 dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white">
          New Arrivals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative w-full h-56">
                <Image
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.title}
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {product.title}
                </h3>
                <p className="text-teal-500 font-bold text-xl">${product.price}</p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 pt-3">
                  <Link
                    href={"/products/" + product._id}
                    className="bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-900 dark:text-white px-4 py-2 rounded-xl text-sm font-medium transition"
                  >
                    Read More
                  </Link>
                  <button
                    onClick={() => addProduct(product._id)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition">
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
