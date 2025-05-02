import Connect from "@/lib/mongoose";
import Category from "@/models/category";
import Product from "@/models/product";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useContext } from "react";
import { CartContext } from "@/components/cartContext";

export default function CategoryProductsPage({ category, products }) {
    const { addProduct } = useContext(CartContext);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
            <Header />

            <main className="flex-grow py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link
                        href="/categories"
                        className="text-blue-600 hover:underline mb-6 inline-block text-sm"
                    >
                        ← Back to Categories
                    </Link>

                    <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">
                        {category.categoryName}
                    </h1>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                                >
                                    {product.images?.length > 0 && (
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-t-xl"
                                            />
                                        </div>
                                    )}

                                    <div className="p-5 flex flex-col flex-grow">
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                                            {product.title}
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                                            {product.description}
                                        </p>
                                        <p className="text-md font-medium text-green-600 dark:text-green-400 mb-4">
                                            ${product.price}
                                        </p>

                                        <div className="mt-auto flex flex-col gap-2">
                                            <Link
                                                href={`/products/${product._id}`}
                                                className="text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
                                            >
                                                View Details
                                            </Link>

                                            <button
                                                onClick={() => addProduct(product._id)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-300">
                            No products found in this category.
                        </p>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export async function getServerSideProps(context) {
    await Connect();
    const { id } = context.params;

    const category = await Category.findById(id).lean();
    if (!category) return { notFound: true };

    const products = await Product.find({ category: id }).lean();

    return {
        props: {
            category: JSON.parse(JSON.stringify(category)),
            products: JSON.parse(JSON.stringify(products)),
        },
    };
}
