'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { CartContext } from './cartContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext)

  return (
    <header className="bg-slate-950 text-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide hover:text-teal-400 transition"
        >
          MyShop
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm md:text-base">
          <Link href="/" className="hover:text-teal-400 transition">Home</Link>
          <Link href="/products" className="hover:text-teal-400 transition">All Products</Link>
          <Link href="/categories" className="hover:text-teal-400 transition">Categories</Link>
          <Link href="/cart" className="hover:text-teal-400 transition">Cart ({cart.length})</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 px-4">
          <Link href="/" className="block hover:text-teal-400 transition">Home</Link>
          <Link href="/products" className="block hover:text-teal-400 transition">All Products</Link>
          <Link href="/categories" className="block hover:text-teal-400 transition">Categories</Link>
          <Link href="/cart" className="block hover:text-teal-400 transition">Cart (0)</Link>
        </div>
      )}
    </header>
  );
}
