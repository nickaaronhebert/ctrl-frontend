import InsertIconSVG from "@/assets/icons/Insert";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import StripeTest from "@/pages/Organization/Settings/StripeAccount/CardSetup";
import { useGetAdminCardsQuery } from "@/redux/services/stripe";
import type { CardDetails } from "@/types/global/commonTypes";
import { useState } from "react";

interface CardProps {
  last4: string;
  cardholder: string;
  expiry: string;
  zip: string;
  isDefault?: boolean;
}

const CreditCard: React.FC<CardProps> = ({
  last4,
  cardholder,
  expiry,
  zip,
  isDefault = false,
}) => {
  return (
    <div className="w-full rounded-lg border border-card-border p-4  bg-light-background">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-lg font-semibold">Credit Card Number</p>
          <p className="text-[18px] font-medium text-slate flex gap-[12px] tracking-widest">
            <span>****</span>
            <span>****</span>
            <span>****</span>
            <span>{last4}</span>
          </p>
        </div>
        {isDefault && (
          <span className="rounded-[4px] border border-alert  p-1.5 text-[10px] text-alert font-semibold">
            Default Card
          </span>
        )}
      </div>

      {/* Card Details */}
      <div className="grid grid-cols-2 gap-y-3.5 text-sm">
        <div className="space-y-1">
          <p className="text-sm font-medium">Cardholder Name</p>
          <p className="text-sm font-normal text-[#3E4D61]">{cardholder}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Expiration Date</p>
          <p className="text-sm font-normal text-[#3E4D61]">{expiry}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">CVC/CVV</p>
          <p className="text-sm font-normal text-[#3E4D61]">***</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Billing ZIP Code</p>
          <p className="text-sm font-normal text-[#3E4D61]">{zip}</p>
        </div>
      </div>
    </div>
  );
};

export default function OrgStripeAccount() {
  const [addNewCard, setAddNewCard] = useState(false);
  const { data, isFetching } = useGetAdminCardsQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => {
      return {
        data: data?.data,
        isFetching: isFetching,
      };
    },
  });
  console.log("Admin Cards Data:", data);
  return (
    <div className="w-full flex justify-center py-8">
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <div className="w-xl ">
          <div className="flex items-center justify-between w-full">
            <p className="text-[20px] font-semibold ">Payment Method</p>
            <Button
              type="button"
              className="min-h-[28px] min-w-[70px] rounded-sm text-white bg-black cursor-pointer"
              onClick={() => setAddNewCard(!addNewCard)}
            >
              <InsertIconSVG />
              ADD ANOTHER CARD
            </Button>
          </div>

          <div className="my-3 space-y-5">
            {data?.map((item: CardDetails) => {
              return (
                <CreditCard
                  key={item.id}
                  last4={item.last4}
                  cardholder={item.cardHolderName}
                  expiry={`${item.expiryMonth}/${item.expiryYear}`}
                  zip={item.zipCode}
                  isDefault={item.isDefault}
                />
              );
            })}
          </div>

          <div className="mt-6">
            {addNewCard && <StripeTest hideCard={setAddNewCard} />}
          </div>
        </div>
      )}
    </div>
  );
}
