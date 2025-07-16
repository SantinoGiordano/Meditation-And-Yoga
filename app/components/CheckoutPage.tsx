"use client";

import convertToSubcurrency from "@/lib/converSubcurrency";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);


  const handleSubmit = async (event:React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const {error: submitError} = await elements.submit()

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement />}

        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
        <button>Pay</button>
      </form>
    </>
  );
};

export default CheckoutPage;
