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
        <div className="flex-1 bg-white bg-opacity-50 rounded-lg p-6 shadow-md border-l-4 border-red-500 max-h-50 max-w-350 m-10">
          <h3 className="text-2xl font-bold mb-4 text-red-500">Hello, Please Read</h3>
          <p className=" mb-4 text-sm leading-relaxed text-gray-700">
            if you have come to this part of the website just know that everything is in an unstable not finsihed state, nothing here is perminate nothing here works yet, everything is being worked on. the entire website is a work in progress, eveything site wide is subject ot change
          </p>
          
        </div>
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
