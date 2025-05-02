import { useContext, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Connect from "@/lib/mongoose";
import Product from "@/models/product";
import { CartContext } from "@/components/cartContext";
import Image from "next/image";

export default function ProductPage({ product }) {
    const [mainImage, setMainImage] = useState(product?.images?.[0]);
      const {addProduct} = useContext(CartContext)
      function addFeaturedToCart() {
        addProduct(product._id)
    
      }

    if (!product) {
        return (
            <div>
                <Header />
                <div className="min-h-screen flex flex-col justify-center items-center">
                    <p className="text-xl font-semibold text-red-500">Product not found</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
                <div className="max-w-5xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left: Main Image and Thumbnails */}
                    <div>
                        <Image
                            src={mainImage}
                            alt={product.name}
                            width={100}
                            height={100}
                            className="w-full h-96 object-cover rounded-lg mb-4 border"
                        />
                        <div className="flex gap-4 flex-wrap">
                            {product.images.map((img, index) => (
                                <Image
                                    key={index}
                                    src={img}
                                    height={100}
                                    width={100}
                                    alt={`Thumbnail ${index}`}
                                    className={`w-20 h-20 object-cover rounded cursor-pointer border ${mainImage === img ? "ring-2 ring-blue-500" : ""
                                        }`}
                                    onClick={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl font-extrabold mb-4 text-gray-800 dark:text-white">
                            {product.name}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                            {product.description}
                        </p>
                        <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                            ${product.price}
                        </p>
                        {/* Add to Cart Button */}
                        <button
                        onClick={addFeaturedToCart}
                            className="mt-6 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Add to Cart
                        </button>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export async function getServerSideProps(context) {
    await Connect();

    const { id } = context.params;
    const productDoc = await Product.findById(id).lean();

    if (!productDoc) {
        return {
            props: { product: null },
        };
    }

    const product = JSON.parse(JSON.stringify(productDoc));

    return {
        props: { product },
    };
}
