import Link from "next/link";
import Image from "next/image";

// Local image map based on category name (adjust names as needed)
const categoryImageMap = {
  "T-Shirt": "/tshirt.jpg",
  "Pant": "/pant.jpg",
  "Laptop": "/laptop.jpg",
  "Electronics": "/electronics.jpg",
  // Add more as needed
};

export default function FeaturedCategories({ categories = [] }) {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const imagePath = categoryImageMap[category.categoryName] || "/images/categories/default.jpg";

            return (
              <Link
                key={category._id}
                href={`/category/${category._id}`}
                className="group rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 hover:shadow-lg transition"
              >
                {/* Image from public folder */}
                <div className="relative w-full h-48">
                  <Image
                    src={imagePath}
                    alt={category.categoryName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Title */}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {category.categoryName}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
