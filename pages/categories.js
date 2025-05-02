// pages/categories.js

import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Connect from "@/lib/mongoose";
import Category from "@/models/category";

export default function CategoriesPage({ categories }) {
    return (
        <div>
            <Head>
                <title>Categories | YourSite</title>
                <meta name="description" content="Browse all product categories" />
            </Head>

            <Header />

            <main className="min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
                <div className="max-w-5xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden p-6">
                    <h1 className="text-4xl font-extrabold mb-6 text-gray-800 dark:text-white">
                        Categories
                    </h1>

                    {categories.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map((category) => (
                                <Link
                                    key={category._id}
                                    href={`/categories/${category._id}`}
                                    className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 transition-shadow hover:shadow-xl hover:bg-gray-300 dark:hover:bg-gray-600 block"
                                >
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                        {category.categoryName}
                                    </h2>
                                    {/* Optional: Add category description or icon here */}
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-300">No categories found.</p>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export async function getServerSideProps() {
    await Connect();
    const categories = await Category.find().lean();

    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
        },
    };
}
