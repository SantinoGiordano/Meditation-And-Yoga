"use client";

import { useEffect } from "react";
import convertToSubcurrency from "@/lib/converSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "../components/CheckoutPage";
import { useCartStore } from "../store/store";
import { sampleData } from "@/data/data";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("Missing Stripe public key in environment variables");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function ItemArea() {
  const totalPrice = useCartStore((state) => state.totalPrice);
  const calculateTotalPrice = useCartStore((state) => state.calculateTotalPrice);

  useEffect(() => {
    calculateTotalPrice(sampleData);
  }, []);

  const isValidAmount = totalPrice > 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex flex-col items-center justify-center py-16 px-4">
      {/* Card Container */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] max-w-xl w-full p-8 border border-white/40">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Checkout Summary
        </h1>

        {/* Final Payment Display */}
        <div className="bg-white rounded-xl shadow-inner p-6 text-center mb-6 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Final Payment</h2>
          <span className="text-4xl font-bold text-black">${totalPrice.toFixed(2)}</span>
        </div>

        {/* Stripe Payment */}
        {isValidAmount ? (
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(totalPrice),
              currency: "usd",
            }}
          >
            <CheckoutPage totalPrice={totalPrice} />
          </Elements>
        ) : (
          <p className="text-center text-red-600 font-medium mt-4">
            Add items to your cart to proceed with payment.
          </p>
        )}
      </div>
    </main>
  );
}
