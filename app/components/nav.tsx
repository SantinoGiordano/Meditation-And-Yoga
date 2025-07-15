'use client'

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white mx-auto mt-4 w-[90%] max-w-4xl px-6 py-3 flex items-center justify-between md:justify-center ">
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center p-4 ">
        <Link href="/" className="text-gray-800  hover:text-blue-600 transition-colors duration-300">
          Home
        </Link>
        <Link href="/about" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
          About
        </Link>
        <Link href="/contact" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
          Contact
        </Link>
        <Link href="/products" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
          Products
        </Link>
      </div>

      {/* Mobile Hamburger aligned right */}
      <div className="md:hidden ml-auto">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-800 focus:outline-none">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 right-4 bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4 w-[80%] max-w-xs z-50">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
            Home
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
            About
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
            Contact
          </Link>
          <Link href="/products" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
            Products
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
