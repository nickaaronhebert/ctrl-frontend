import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import type { StripeCardElementOptions } from "@stripe/stripe-js";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useGetAttachPaymentMethodMutation } from "@/redux/services/stripe";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/redux/store";
import { prevStep, resetForm } from "@/redux/slices/sub-org";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

interface Props {
  clientSecret: string; // Pass this from backend
  hideCard: React.Dispatch<React.SetStateAction<boolean>>; // to hide card form on success
  entityType: "org" | "subOrg";
}

interface StripeWrapperProps {
  elementType: "number" | "expiry" | "cvc";
  placeholder?: string;
  className?: string; // optional extra classes for wrapper
  options?: StripeCardElementOptions; // custom style options
  onChange?: (event: any) => void; // handle Stripe change events
}

const StripeCardField: React.FC<StripeWrapperProps> = ({
  elementType,
  className = "",
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Map elementType to the actual Stripe element component
  const ElementComponent =
    elementType === "number"
      ? CardNumberElement
      : elementType === "expiry"
      ? CardExpiryElement
      : CardCvcElement;

  // Default style if not provided
  const defaultOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#1a1a1a",
        "::placeholder": { color: "#a0aec0" },
      },
      focus: {
        // Define your focus styles here
        color: "#32325d",
        boxShadow: "0 0 0 2px #5469d4",
        outline: "none",
      },
      invalid: { color: "#e53e3e" },
    },
  };
  // focus:ring-2 focus:ring-blue-500 focus:outline-none
  return (
    <div
      className={`w-full rounded-md p-4 border transition ${className} ${
        isFocused ? "ring-2 ring-blue-500 outline-none" : "border-card-border"
      }`}
    >
      <ElementComponent
        options={defaultOptions}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
      />
    </div>
  );
};

const CustomCardForm = ({ clientSecret, hideCard, entityType }: Props) => {
  const [triggerAttachPaymentMethod] = useGetAttachPaymentMethodMutation();
  const navigate = useNavigate();
  const subOrganization = useAppSelector((state) => state.subOrg.stepOne.id);
  console.log("Sub Organization", subOrganization);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const [defaultCardChecked, setDefaultCardChecked] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancelOrBack = () => {
    if (entityType === "subOrg") {
      dispatch(prevStep());
    }
    hideCard?.(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    // Validate inputs
    if (!cardholderName.trim() || !zip.trim()) {
      throw new Error("Please fill out all required fields");
      //   alert("Please fill out all required fields");
      //   return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      //   alert("Card element not found");
      setLoading(false);
      throw new Error("Please fill out all required fields");
    }

    try {
      // Confirm the SetupIntent with Stripe
      const { setupIntent, error } = await stripe.confirmCardSetup(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: cardholderName,
              address: { postal_code: zip },
            },
          },
        }
      );

      if (error) {
        throw error; // go to catch block
      }

      const paymentMethodId = setupIntent?.payment_method;
      if (!paymentMethodId || typeof paymentMethodId !== "string") {
        throw new Error("Failed to retrieve payment method ID");
      }

      const attachPaymentMethodPayload: {
        payment_method_id: string;
        isDefault: boolean;
        subOrganization?: string;
      } = {
        payment_method_id: paymentMethodId,
        isDefault: defaultCardChecked,
      };

      if (subOrganization) {
        attachPaymentMethodPayload.subOrganization = subOrganization;
      }

      // Attach payment method to backend
      const res = await triggerAttachPaymentMethod(
        attachPaymentMethodPayload
      ).unwrap();
      toast.success(res.data?.message || "Card Saved Successfully", {
        duration: 1500,
      });

      setCardholderName("");
      setZip("");
      setDefaultCardChecked(false);

      elements.getElement(CardNumberElement)?.clear();
      elements.getElement(CardExpiryElement)?.clear();
      elements.getElement(CardCvcElement)?.clear();

      dispatch(resetForm());
      if (entityType === "subOrg") {
        navigate("/org/sub-orgs");
      } else {
        hideCard(false);
      }
    } catch (err: any) {
      console.error("Error during card setup:", err);
      toast.error(err?.message || "Error during card setup. ", {
        duration: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-6">
      <h2 className="text-xl font-semibold">Credit Card Information</h2>

      {/* Cardholder Name */}
      <div>
        <label
          className="block text-sm font-semibold mb-1"
          htmlFor="card-holder-name"
        >
          Cardholder Name <span className="text-red-500">*</span>
        </label>
        <input
          id="card-holder-name"
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="John Smith"
          required
          className="w-full border border-card-border rounded-md p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Card Number */}

      <div className="">
        <label className="block text-sm font-semibold mb-1 border-none">
          <span className="mb-1">
            Credit Card Number <span className="text-red-500">*</span>
          </span>
          <StripeCardField elementType="number" placeholder="Card Number" />
        </label>
      </div>

      {/* Expiration Date + CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm  font-semibold mb-1">
            <span className="mb-1">
              Expiration Date (MM/YY) <span className="text-red-500">*</span>
            </span>

            <StripeCardField elementType="expiry" placeholder="MM/YY" />
          </label>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            <span className="mb-1">
              CVC / CVV <span className="text-red-500">*</span>
            </span>

            <StripeCardField elementType="cvc" placeholder="CVC" />
          </label>
        </div>
      </div>

      {/* Billing Zip Code */}
      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="zip-code">
          Billing Zip Code <span className="text-red-500">*</span>
        </label>
        <input
          id="zip-code"
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="60601"
          required
          className="w-full border border-card-border rounded-md p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <Label htmlFor="default-card">
          <Checkbox
            id="default-card"
            checked={defaultCardChecked}
            onCheckedChange={(value) => setDefaultCardChecked(value === true)}
          />
          <span> Use as a Default Card</span>
        </Label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end items-center gap-4">
        <Button
          variant={"transparent"}
          size={"xl"}
          onClick={handleCancelOrBack}
        >
          {entityType === "subOrg" ? "Back" : "Cancel"}
        </Button>
        <Button
          type="submit"
          disabled={!stripe || loading}
          variant={"ctrl"}
          size={"xl"}
        >
          {loading
            ? "Processing..."
            : entityType === "subOrg"
            ? "Create SubOrganization"
            : "Add Payment Method"}
        </Button>
      </div>
    </form>
  );
};

export default CustomCardForm;
