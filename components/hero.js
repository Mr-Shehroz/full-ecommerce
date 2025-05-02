import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./cartContext";

export default function HeroSection({ product }) {
  const {addProduct} = useContext(CartContext)
  function addFeaturedToCart() {
    addProduct(product._id)

  }



  return (
    <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
            {product.title}
          </h2>
          <p className="text-gray-300 text-lg">
            {product.description}
          </p>
          <div className="flex space-x-4">
            <Link
              href={`/products/${product._id}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-xl font-semibold transition"
            >
              Read More
            </Link>
            <button
              onClick={addFeaturedToCart}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <div className="w-full h-64 md:h-80 rounded-2xl flex items-center justify-center bg-slate-700 p-4">
            <Image
              src={product.images?.[0] || "/placeholder.jpg"}
              width={300}
              height={200}
              alt={product.title}
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
