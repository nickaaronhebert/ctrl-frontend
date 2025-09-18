import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import ZigZag from "@/assets/mainlayouticons/ZigZag";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import InvoiceOverviewCard from "@/components/common/Card/invoice-overview";
import InvoiceItemsCard from "@/components/common/Card/invoice-items";

import PaymentMethodDetails from "@/components/common/Card/card-details";
import CardSVG from "@/assets/icons/CardIcon";
import Invoices from "@/assets/icons/Invoices";
import DocumentSVG from "@/assets/icons/Document";
import { useGetPharmacyInvoicesDetailsQuery } from "@/redux/services/pharmacy";
import { useState } from "react";
import { formatDateMMDDYYYY } from "@/lib/utils";
const menuItems = [
  {
    title: "Invoice Information",
    scrollToId: "invoiceInformation",
    icon: ZigZag,
  },

  {
    title: "Medications",
    scrollToId: "medications",
    icon: Invoices,
  },
  {
    title: "Payment Information",
    scrollToId: "paymentInformation",
    icon: CardSVG,
  },
];

export default function ViewPharmacyInvoiceDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<
    "invoiceInformation" | "medications" | "paymentInformation"
  >("invoiceInformation");

  const {
    data: invoiceData,
    medicationDetails,
    invoiceDetails,
    isFetching,
  } = useGetPharmacyInvoicesDetailsQuery(id as string, {
    skip: !id,
    selectFromResult: ({ data, isLoading, isFetching, isError }) => {
      return {
        data: data?.data,

        invoiceDetails: {
          id: data?.data?.id ?? "",
          transmissionCode: data?.data?.transaction?.transmissionCode ?? "",
          totalAmount: data?.data?.transaction?.totalAmount ?? 0,
          createdAt: formatDateMMDDYYYY(data?.data?.createdAt ?? "") ?? "",
        },
        //         medicationDetails: data?.data?.lineItems.map((item) => ({
        //           variantId: item.productVariant.id,
        //           variantUnit: item.productVariant.quantityType,
        //           productName: item.productVariant.medicationCatalogue.drugName,
        //           qty: item.quantity,
        //           unitPrice: item.productVariantPrice,
        //         })),
        medicationDetails: data?.data?.transaction?.lineItems?.map((item) => ({
          variantId: item.productVariant.id,
          variantUnit: item.productVariant.quantityType,
          productName: item.productVariant.medicationCatalogue.drugName,
          qty: item.quantity,
          unitPrice: item.productVariantPrice,
          strength: item.productVariant.strength,
        })),
        isLoading: isLoading,
        isError: isError,
        isFetching: isFetching,
      };
    },
  });

  if (isFetching) return <LoadingSpinner />;

  return (
    <div className="mb-5">
      <div className="bg-lilac py-3 px-12">
        <Link
          to={"/pharmacy/invoices"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Invoices"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">Invoice:</h1>
      </div>

      <div className="flex gap-8 px-14 mt-6">
        <div
          className="w-lg  max-w-80
         rounded-[10px] shadow-[0px_2px_40px_0px_#00000014] h-fit"
        >
          <div className="p-3">
            <div className="flex gap-3.5 items-center ">
              <div className="w-[50px] h-[50px] flex justify-center items-center bg-lilac rounded-[8px]">
                <DocumentSVG />
              </div>
              <div>
                <h4 className="text-base font-medium text-black">
                  {invoiceData?.transaction?.transmissionCode}
                </h4>
                <h6 className="text-xs font-normal text-[#3E4D61]">
                  {formatDateMMDDYYYY(invoiceData?.createdAt ?? "")}
                </h6>
              </div>
            </div>
          </div>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.title}
                className={`flex justify-start items-center w-full rounded-none text-white text-sm p-5 font-medium cursor-pointer !h-14 ${
                  activeTab === item.scrollToId
                    ? "bg-primary"
                    : "bg-white text-black hover:bg-white"
                }
              
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
                <Icon
                  color={activeTab === item.scrollToId ? "#FFFFFF" : "#9AA2AC"}
                />
                {item.title}
              </Button>
            );
          })}
        </div>

        <div className="flex flex-col gap-5 w-full">
          <InvoiceOverviewCard invoice={invoiceDetails} />

          <InvoiceItemsCard
            invoiceItems={medicationDetails}
            totalAmount={invoiceData?.transaction?.totalAmount ?? ""}
            applicationFee={invoiceData?.transaction?.applicationFee ?? ""}
          />
          <PaymentMethodDetails
            cardInfo={""}
            transactionId={invoiceData?.stripeTransferId ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
