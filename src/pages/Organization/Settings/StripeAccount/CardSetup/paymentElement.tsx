import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const PaymentElementForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setMessage("Stripe.js has not loaded yet.");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url:
          "http://192.168.0.102:6009/api/v1/payment/stripe-return-url", // Replace with your redirect page
      },
    });

    if (error) {
      setMessage(error.message || "Payment failed.");
    } else {
      setMessage("Success! You will be redirected shortly.");
    }

    setLoading(false);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <PaymentElement
          options={{
            defaultValues: {
              billingDetails: {
                name: "",
                address: { country: "US" },
              },
            },
            fields: {
              billingDetails: {
                address: {
                  country: "never", // hides the country field
                },
              },
            },
            wallets: {
              applePay: "never",
              googlePay: "never",
              link: "never", // 👈 disable Link completely
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-3 rounded-md text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Save"}
        </button>
      </form>
      {message && <div className="mt-4 text-sm text-red-600">{message}</div>}
    </div>
  );
};

export default PaymentElementForm;
