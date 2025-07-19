"use client";

import React from "react";
import { sampleData } from "@/data/data";
import { useCartStore } from "@/app/store/store";

const Cart = () => {
  const { inCart, toggleInCart } = useCartStore();

  const cartItemIds = Object.entries(inCart)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, isIn]) => isIn)
    .map(([id]) => id);

  const cartItems = cartItemIds
    .map((id) => sampleData.find((item) => item.id === Number(id)))
    .filter((item): item is (typeof sampleData)[0] => !!item);

  if (cartItems.length === 0) {
    return (
      <div className=" bg-white flex items-center justify-center min-h-screen p-8 text-center text-gray-700">
        <div className="bg-red-500 text-2xl text-white p-5 rounded-lg shadow-lg">Your cart is empty.</div>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="">
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        <ul className="space-y-4">
          {cartItems.map(({ id, title, price }) => (
            <li
              key={id}
              className="flex justify-between items-center bg-white p-4 rounded shadow"
            >
              <span>{title}</span>
              <div className="flex items-center space-x-4">
                <span className="font-semibold">${price.toFixed(2)}</span>
                <button
                  onClick={() => toggleInCart(id.toString())}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-right font-bold text-xl">
          Total: ${totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Cart;
