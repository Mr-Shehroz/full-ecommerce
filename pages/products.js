import Header from "@/components/header";
import Footer from "@/components/footer";
import Connect from "@/lib/mongoose";
import Product from "@/models/product";
import Link from "next/link";
import Image from "next/image";

export default function ProductsPage({ products }) {
    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-6">
                <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
                    Our Products
                </h1>
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                            >
                                <Image
                                    src={product.images?.[0]}
                                    height={100}
                                    width={100}
                                    alt={product.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        {product.name}
                                    </h2>
                                    <p className="text-blue-600 dark:text-blue-400 text-lg font-bold mt-2">
                                        ${product.price}
                                    </p>
                                    <Link
                                        href={`/products/${product._id}`}
                                        className="inline-block mt-4 w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-lg text-gray-600 dark:text-gray-300 col-span-full">
                            No products available.
                        </p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export async function getServerSideProps() {
    await Connect();
    const Products = await Product.find().lean();
    return {
        props: {
            products: JSON.parse(JSON.stringify(Products)),
        },
    };
}
