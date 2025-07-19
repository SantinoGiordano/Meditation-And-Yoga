"use client";

import React from "react";
import { useCartStore } from "../store/store";
import { sampleData } from "@/data/data";
import Link from "next/link";
import Image from "next/image";

const Cart = () => {
  const { inCart, toggleInCart, totalPrice, calculateTotalPrice } =
    useCartStore();

  // Memoize cart item IDs to avoid unnecessary recalculations
  const cartItemIds = React.useMemo(() => {
    return Object.entries(inCart)
      .filter(([_, isIn]) => isIn)
      .map(([id]) => id);
  }, [inCart]);

  // Memoize actual cart items based on sampleData
  const cartItems = React.useMemo(() => {
    return cartItemIds
      .map((id) => sampleData.find((item) => item.id === Number(id)))
      .filter((item): item is (typeof sampleData)[0] => !!item);
  }, [cartItemIds]);

  // Recalculate totalPrice whenever cartItems change
  React.useEffect(() => {
    calculateTotalPrice(cartItems);
  }, [cartItems, calculateTotalPrice]);

  // If no items in cart
  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-700 mb-4">Your cart is empty.</div>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Render cart
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Items</h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {cartItems.map(({ id, title, price }) => (
                <li key={id} className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {title}
                        </h3>
                        <p className="text-lg font-semibold text-gray-900">
                          ${price.toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => toggleInCart(id.toString())}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow p-6 sticky top-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-4">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/ItemArea"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
