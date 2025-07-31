import SuccessBadge from "@/components/TransmissionBadge/success";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useState } from "react";
const medicationData = [
  {
    name: "Metformin HCl Extended Release 500mg",
    variantName: "Glucophage XR",
    dispensingQty: "30 tablets",
    containerQty: "1",
    containerQtyType: "unite",
    sig: "Take 1 tablet by mouth twice daily with meals",
  },
  {
    name: "Enoxaparin Sodium 40mg/0.4mL",
    variantName: "Lovenox",
    dispensingQty: "10 tablets",
    containerQty: "1",
    containerQtyType: "unite",
    sig: "Take 1 tablet by mouth twice daily with meals",
  },
];

const menuItems = [
  {
    title: "Overview",
    scrollToId: "overview",
  },
  {
    title: "Provider Information",
    scrollToId: "providerInformation",
  },
  {
    title: "Pharmacy Information",
    scrollToId: "pharmacyInformation",
  },
  {
    title: "Transaction",
    scrollToId: "transaction",
  },
  {
    title: "Medication Information",
    scrollToId: "medicationInformation",
  },
];

export default function TransmissionDetails() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "providerInformation"
    | "pharmacyInformation"
    | "transaction"
    | "medicationInformation"
  >("overview");

  return (
    <div className="mb-5">
      <div className=" bg-[#E6FAF5] py-3 px-12">
        <Link
          to={"/org/transmissions"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Recent transmission volume and statistics"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">Transmissions: {params.id} </h1>
      </div>

      <div className="flex gap-8 px-14 mt-6">
        <div className="w-lg  max-w-[260px] rounded-[10px] shadow-[0px_2px_40px_0px_#00000014] h-fit">
          {menuItems.map((item, index) => (
            <Button
              key={item.title}
              className={`w-full rounded-none text-white text-sm p-5 font-medium cursor-pointer h-14 ${
                activeTab === item.scrollToId
                  ? "bg-primary"
                  : "bg-white text-black hover:bg-white"
              }
              ${index === 0 ? "rounded-tl-[10px] rounded-tr-[10px]" : ""}
              ${
                index === menuItems.length - 1
                  ? "rounded-bl-[10px] rounded-br-[10px]"
                  : ""
              }
              `}
              onClick={() => {
                setActiveTab(item.scrollToId as any);
                document.getElementById(item.scrollToId)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {item.title}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-5 w-full">
          <div
            className="bg-white  rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
            id="overview"
          >
            <h2 className="text-base font-semibold p-5 border-b border-card-border">
              Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-7 p-5">
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-normal text-muted-foreground">
                  Status
                </h4>
                <SuccessBadge />
              </div>
              <div>
                <h4 className="text-sm font-normal text-muted-foreground">
                  Total Amount
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  $264.00
                </span>
              </div>
              <div>
                <h4 className="text-sm font-normal text-muted-foreground">
                  Submitted
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  1/15/2024, 8:02:15 PM
                </span>
              </div>
              <div>
                <h4 className="text-sm font-normal text-muted-foreground">
                  Completed
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  1/15/2024, 8:05:22 PM
                </span>
              </div>
            </div>
          </div>

          <div
            className="bg-white   rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
            id="providerInformation"
          >
            <h2 className="text-base font-semibold p-5 border-b border-card-border">
              Provider Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-7 p-5">
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-normal text-muted-foreground">
                  Provider Name
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  Dr. Sarah Johnson
                </span>
              </div>
              <div>
                <h4 className="text-sm font-normal text-muted-foreground">
                  NPI
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  1234567890
                </span>
              </div>
              <div>
                <h4 className="text-sm font-normal text-muted-foreground">
                  DEA Registration Number
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  BS1234567
                </span>
              </div>
              <div>
                <h4 className="text-sm font-normal text-muted-foreground">
                  State License Number
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  CA-1234-4578
                </span>
              </div>
            </div>
          </div>

          <div
            className="bg-white   rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
            id="pharmacyInformation"
          >
            <h2 className="text-base font-semibold p-5 border-b border-card-border">
              Pharmacy Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-7 p-5">
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-normal text-muted-foreground">
                  Pharmacy Name
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  CVS Pharmacy
                </span>
              </div>
              <div>
                <h4 className="text-sm font-normal text-muted-foreground">
                  Address
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  123 Main St, Los Angeles, CA
                </span>
              </div>
              <div>
                <h4 className="text-sm font-normal text-muted-foreground">
                  Transmission Method
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  API
                </span>
              </div>
            </div>
          </div>

          <div
            className="bg-white   rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
            id="medicationInformation"
          >
            <h2 className="text-base font-semibold p-5 border-b border-card-border">
              Medication Information
            </h2>
            <div className="p-5 flex flex-col gap-5">
              {medicationData.map((medication, index) => (
                <div className="bg-white   rounded-[10px]" key={index}>
                  <h2 className="text-base font-semibold p-5 border-b border-card-border bg-[#F6F8F9]">
                    {medication.name}
                  </h2>
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-7 p-5 border-b last:border-b-0"
                  >
                    <div>
                      <h4 className="text-sm font-normal text-muted-foreground">
                        Variant Name
                      </h4>
                      <span className="text-sm font-medium text-primary-foreground">
                        {medication.variantName}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-normal text-muted-foreground">
                        Dispensing Quantity
                      </h4>
                      <span className="text-sm font-medium text-primary-foreground">
                        {medication.dispensingQty}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-normal text-muted-foreground">
                        Container Quantity
                      </h4>
                      <span className="text-sm font-medium text-primary-foreground">
                        {medication.containerQty} {medication.containerQtyType}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-normal text-muted-foreground">
                        Sig
                      </h4>
                      <span className="text-sm font-medium text-primary-foreground">
                        {medication.sig}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-white   rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
            id="transaction"
          >
            <h2 className="text-base font-semibold p-5 border-b border-card-border">
              Transaction
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-7 p-5">
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-normal text-muted-foreground">
                  Transaction ID
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  {params.id}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-normal text-muted-foreground">
                  Payment Status
                </h4>
                <SuccessBadge title="Completed" />
                {/* <span className="text-sm font-medium text-primary-foreground">
                Completed
              </span> */}
              </div>
              <div>
                <h4 className="text-sm font-normal text-muted-foreground">
                  Payment Method
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  Mastercard ****5678
                </span>
              </div>
              <div>
                <h4 className="text-sm font-normal text-muted-foreground">
                  Payment Processor
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  Stripe Connect
                </span>
              </div>
              <div>
                <h4 className="text-sm font-normal text-muted-foreground">
                  Processed At
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  1/15/2024, 8:05:22 PM
                </span>
              </div>
              <div>
                <h4 className="text-sm font-normal text-muted-foreground">
                  Subtotal
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  $240.00
                </span>
              </div>
              <div>
                <h4 className="text-sm font-normal text-muted-foreground">
                  Processing Fee
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  $20.00
                </span>
              </div>
              <div>
                <h4 className="text-sm font-normal text-muted-foreground">
                  Total Amount
                </h4>
                <span className="text-sm font-medium text-primary-foreground">
                  $260.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
