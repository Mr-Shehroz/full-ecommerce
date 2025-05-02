import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/cartContext";
import Footer from "@/components/footer";
import Header from "@/components/header";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function Cart() {
    const { cart, setCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [customerDetails, setCustomerDetails] = useState({
        name: "",
        email: "",
        country: "",
        city: "",
        postalCode: "",
        streetAddress: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCheckout, setIsCheckout] = useState(false); // State to toggle between cart and checkout form
    const router = useRouter();

    // Fetch products from API (this could be from your server)
    useEffect(() => {
        if (cart.length > 0) {
            axios.post('/api/cart', { ids: cart })
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        } else {
            setProducts([]); // Clear products if cart is empty
        }
    }, [cart]);

    // Handle changes in customer details form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Calculate total price of products in the cart
    const calculateTotal = () => {
        return products.reduce((total, product) => {
            const quantity = cart.filter(item => item === product._id).length;
            return total + (product.price * quantity);
        }, 0);
    };

    // Handle increase and decrease of quantity
    const increaseQuantity = (id) => {
        setCart([...cart, id]);
    };

    // Decrease quantity of a product by 1
    function decreaseQuantity(id) {
        setCart(prevCart => {
            // Remove just one instance of the product
            const updatedCart = prevCart.filter((item, index) => item !== id || prevCart.indexOf(item) !== index);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }

    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item !== id);
        setCart(updatedCart);
    };

    async function GoToPayment(e) {
        e.preventDefault();
        const { name, email, country, city, postalCode, streetAddress } = customerDetails;
        const res = await axios.post('/api/checkout', {
            name,
            email,
            country,
            city,
            postalCode,
            streetAddress,
            cart,
        });
        if (res.data.url) {
            window.location = res.data.url;
        }
    }

    // Check if the current URL includes the success path
    useEffect(() => {
        if (window.location.href.includes('success')) {
            alert('Payment successful! Thank you for your order.');
            
            // Clear cart from state and localStorage
            setCart([]);  // Clear cart from context
            localStorage.removeItem('cart');  // Clear cart from localStorage

            // Redirect to the cart page or homepage after success
            router.push('/');
        }
    }, [router, setCart]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-8 text-center">🛒 Your Cart</h1>

                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-gray-500 text-xl mb-4">Your cart is empty.</p>
                        <Link href="/" className="text-blue-600 hover:underline">
                            ← Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {/* Cart Items */}
                        {products.map((product) => {
                            const productQuantity = cart.filter(item => item === product._id).length;
                            return (
                                <div key={product._id} className="flex items-center justify-between p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <Image height={100} width={100} src={product.images[0]} alt={product.title} className="w-20 h-20 object-cover rounded-md" />
                                        <div>
                                            <p className="text-lg font-medium text-gray-800">{product.title}</p>
                                            <p className="text-gray-500">${product.price}</p>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => decreaseQuantity(product._id)}
                                                    className="bg-gray-200 p-2 rounded-md"
                                                    disabled={productQuantity === 1}
                                                >
                                                    -
                                                </button>
                                                <span>{productQuantity}</span>
                                                <button
                                                    onClick={() => increaseQuantity(product._id)}
                                                    className="bg-gray-200 p-2 rounded-md"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(product._id)}
                                        className="text-red-500 hover:text-red-700 font-semibold"
                                    >
                                        Remove
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="mt-8 flex justify-between items-center">
                    <p className="text-2xl font-semibold">Total: ${calculateTotal().toFixed(2)}</p>
                    <button
                        onClick={() => setIsCheckout(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold"
                    >
                        Proceed to Checkout
                    </button>
                </div>

                {/* Checkout Form */}
                {isCheckout && (
                    <div className="mt-12 p-6 border rounded-lg shadow-sm">
                        <h2 className="text-3xl font-semibold mb-6 text-center">Checkout</h2>
                        <form className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={customerDetails.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* Email Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={customerDetails.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* Country */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={customerDetails.country}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={customerDetails.city}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* Postal Code */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={customerDetails.postalCode}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* Street Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Street Address</label>
                                <input
                                    type="text"
                                    name="streetAddress"
                                    value={customerDetails.streetAddress}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <input type="hidden" name="products" value={cart.join(',')} />

                            <button
                                type="submit"
                                onClick={GoToPayment}
                                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Processing..." : "Complete Order"}
                            </button>
                        </form>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
