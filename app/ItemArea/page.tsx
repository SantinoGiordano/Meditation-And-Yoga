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
    <main className="min-h-screen bg-blue-400 md:bg-gradient-to-r md:from-blue-400 md:to-purple-400 flex flex-col items-center py-12">

      <div className="text-2xl text-center text-green-700 bg-white shadow-md rounded-lg px-6 py-4 mb-6 max-w-xs mx-auto">
        Final Payment: <span className="text-black">${totalPrice}</span>
      </div>

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
        <p className="text-white text-center mt-4">Add items to your cart to proceed with payment.</p>
      )}
    </main>
  );
}
