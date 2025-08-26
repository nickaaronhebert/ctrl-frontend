import { Link } from "react-router-dom";
import SelectProductVariant from "./medication";
import { useAppSelector } from "@/hooks/useAppSelector";
import SelectProviderPharmacy from "./provider-pharmacy";
import SelectPatient from "./patient";
import ReviewOrderDetails from "./review";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const CreateOrderPage = () => {
  const order = useAppSelector((state) => state.order);
  console.log("orders", order);
  return (
    <>
      <div className="bg-lilac py-3 px-12">
        <Link
          to={"/org/orders"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Orders"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">Create Order </h1>
      </div>
      <div
        className="mt-10  rounded-[15px] max-w-[1000px] mx-auto p-6 bg-white "
        style={{
          boxShadow: "0px 8px 10px 0px hsla(0, 0%, 0%, 0.08)",
        }}
      >
        <div className="pt-2.5 pb-2.5 px-5 flex gap-2.5 justify-center border-b border-card-border border-dashed mb-10">
          <p
            className={cn(
              "text-base font-semibold flex gap-3",
              order.currentStep >= 0 ? "text-primary" : "text-[#63627F]"
            )}
          >
            <span>1.</span>
            <span>Patient Details</span>
          </p>
          <ChevronRight />
          <p
            className={cn(
              "text-base font-semibold flex gap-3",
              order.currentStep >= 1 ? "text-primary" : "text-[#63627F]"
            )}
          >
            <span>2.</span>
            <span>Select Medications</span>
          </p>
          <ChevronRight />
          <p
            className={cn(
              "text-base font-semibold flex gap-3",
              order.currentStep >= 2 ? "text-primary" : "text-[#63627F]"
            )}
          >
            <span>3.</span>
            <span>Select Provider & Pharmacy</span>
          </p>
          <ChevronRight />
          <p
            className={cn(
              "text-base font-semibold flex gap-3",
              order.currentStep >= 3 ? "text-primary" : "text-[#63627F]"
            )}
          >
            <span>4.</span>
            <span>Select Dispensing</span>
          </p>
        </div>

        {order.currentStep === 0 && (
          <SelectPatient patient={order.initialStep} />
        )}
        {order.currentStep === 1 && (
          <SelectProductVariant productVariant={order.stepOne} />
        )}
        {order.currentStep === 2 && (
          <SelectProviderPharmacy providerPharmacy={order.stepTwo} />
        )}
        {order.currentStep === 3 && <ReviewOrderDetails order={order} />}
      </div>
    </>
  );
};

export default CreateOrderPage;
