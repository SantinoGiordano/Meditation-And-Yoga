"use client";

import convertToSubcurrency from "@/lib/converSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "../components/CheckoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("Missing Stripe public key in environment variables");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function ItemArea() {
  const amount = 5.0;
  return (
    <>
      <main className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center py-12">
        Final Payment ${amount}
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </main>
    </>
  );
}
