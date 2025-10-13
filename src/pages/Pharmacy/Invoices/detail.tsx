// import { Button } from "@/components/ui/button";
// import { Link, useParams } from "react-router-dom";
// import ZigZag from "@/assets/mainlayouticons/ZigZag";
// import { LoadingSpinner } from "@/components/ui/loading-spinner";
// import InvoiceOverviewCard from "@/components/common/Card/invoice-overview";
// import InvoiceItemsCard from "@/components/common/Card/invoice-items";

// import PaymentMethodDetails from "@/components/common/Card/card-details";
// import CardSVG from "@/assets/icons/CardIcon";
// import Invoices from "@/assets/icons/Invoices";
// import DocumentSVG from "@/assets/icons/Document";
// import { useGetPharmacyInvoicesDetailsQuery } from "@/redux/services/pharmacy";
// import { useState } from "react";
// import { formatDateMMDDYYYY } from "@/lib/utils";
// const menuItems = [
//   {
//     title: "Invoice Information",
//     scrollToId: "invoiceInformation",
//     icon: ZigZag,
//   },

//   {
//     title: "Medications",
//     scrollToId: "medications",
//     icon: Invoices,
//   },
//   {
//     title: "Payment Information",
//     scrollToId: "paymentInformation",
//     icon: CardSVG,
//   },
// ];

// export default function ViewPharmacyInvoiceDetails() {
//   const { id } = useParams();
//   const [activeTab, setActiveTab] = useState<
//     "invoiceInformation" | "medications" | "paymentInformation"
//   >("invoiceInformation");

//   const {
//     data: invoiceData,
//     medicationDetails,
//     invoiceDetails,
//     isFetching,
//   } = useGetPharmacyInvoicesDetailsQuery(id as string, {
//     skip: !id,
//     selectFromResult: ({ data, isLoading, isFetching, isError }) => {
//       return {
//         data: data?.data,

//         invoiceDetails: {
//           id: data?.data?.id ?? "",
//           transmissionCode: data?.data?.transaction?.transmissionCode ?? "",
//           totalAmount: data?.data?.transaction?.totalAmount ?? 0,
//           createdAt: formatDateMMDDYYYY(data?.data?.createdAt ?? "") ?? "",
//         },
//         medicationDetails: data?.data?.transaction?.lineItems?.map((item) => ({
//           variantId: item.productVariant.id,
//           variantUnit: item.productVariant.quantityType,
//           productName: item.productVariant.medicationCatalogue.drugName,
//           qty: item.quantity,
//           unitPrice: item.productVariantPrice,
//           strength: item.productVariant.strength,
//         })),
//         isLoading: isLoading,
//         isError: isError,
//         isFetching: isFetching,
//       };
//     },
//   });

//   if (isFetching)
//     return (
//       <div className="h-[100vh] flex justify-center items-center">
//         <LoadingSpinner />
//       </div>
//     );

//   return (
//     <div className="mb-5">
//       <div className="bg-lilac py-3 px-12">
//         <Link
//           to={"/pharmacy/invoices"}
//           className="font-normal text-sm text text-muted-foreground"
//         >
//           {"<- Back to Invoices"}
//         </Link>

//         <h1 className="text-2xl font-bold mt-1">Invoice: </h1>
//       </div>

//       <div className="flex gap-8 px-14 mt-6">
//         <div
//           className="w-lg  max-w-80
//          rounded-[10px] shadow-[0px_2px_40px_0px_#00000014] h-fit"
//         >
//           <div className="p-3">
//             <div className="flex gap-3.5 items-center ">
//               <div className="w-[50px] h-[50px] flex justify-center items-center bg-lilac rounded-[8px]">
//                 <DocumentSVG />
//               </div>
//               <div>
//                 <h4 className="text-base font-medium text-black">
//                   {invoiceData?.transaction?.transmissionCode}
//                 </h4>
//                 <h6 className="text-xs font-normal text-[#3E4D61]">
//                   {formatDateMMDDYYYY(invoiceData?.createdAt ?? "")}
//                 </h6>
//               </div>
//             </div>
//           </div>
//           {menuItems.map((item, index) => {
//             const Icon = item.icon;
//             return (
//               <Button
//                 key={item.title}
//                 className={`flex justify-start items-center w-full rounded-none text-white text-sm p-5 font-medium cursor-pointer !h-14 ${
//                   activeTab === item.scrollToId
//                     ? "bg-primary"
//                     : "bg-white text-black hover:bg-white"
//                 }

//               ${
//                 index === menuItems.length - 1
//                   ? "rounded-bl-[10px] rounded-br-[10px]"
//                   : ""
//               }
//               `}
//                 onClick={() => {
//                   setActiveTab(item.scrollToId as any);
//                   document.getElementById(item.scrollToId)?.scrollIntoView({
//                     behavior: "smooth",
//                   });
//                 }}
//               >
//                 <Icon
//                   color={activeTab === item.scrollToId ? "#FFFFFF" : "#9AA2AC"}
//                 />
//                 {item.title}
//               </Button>
//             );
//           })}
//         </div>

//         <div className="flex flex-col gap-5 w-full">
//           <InvoiceOverviewCard invoice={invoiceDetails} />

//           <InvoiceItemsCard
//             invoiceItems={medicationDetails}
//             totalAmount={invoiceData?.transaction?.totalAmount ?? ""}
//             applicationFee={invoiceData?.transaction?.applicationFee ?? ""}
//           />
//           <PaymentMethodDetails
//             cardInfo={""}
//             transactionId={invoiceData?.stripeTransferId ?? ""}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
//////////////// v1 code above ////////////////

////////// v2 code below //////////
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/data-table/data-table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
// import { formatDateMMDDYYYY } from "@/lib/utils";
import InvoiceDetailsCard from "@/components/common/Card/invoice-detail-card";
import { TotalAmountCard } from "@/components/common/Card/total-amount-card";
import { useDataTable } from "@/hooks/use-data-table";
import { useMemo } from "react";
import { pharmacyInvoiceColumns } from "@/components/data-table/columns/pharmacy-invoices";
import { type InvoiceDetail } from "@/types/responses/invoice";
import { useGetInvoiceByIdQuery } from "@/redux/services/invoice";

export default function ViewPharmacyInvoiceDetails() {
  const { id } = useParams();
  const { data: invoiceData, isLoading: isInvoiceLoading } =
    useGetInvoiceByIdQuery(id as string);

  console.log("dataaa>>>>", invoiceData);
  const columns = useMemo(() => pharmacyInvoiceColumns(), []);

  const { table } = useDataTable({
    data: invoiceData?.data?.transactions || [],
    columns,
    pageCount: -1,
  });

  if (isInvoiceLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mb-5">
      <div className="bg-lilac py-3 px-12">
        <Link
          to={"/pharmacy/invoices"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Invoices"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">
          Invoice: {invoiceData?.data?.invoiceId}
        </h1>
      </div>

      <div className="grid grid-cols-1 mt-10 gap-4 md:grid-cols-2">
        <InvoiceDetailsCard
          data={invoiceData?.data as InvoiceDetail}
          labels={{
            invoiceId: "Invoice ID",
            organizationDetails: "Organization Details",
            period: "Period",
          }}
          screenType="pharmacy"
        />
        <TotalAmountCard
          data={invoiceData?.data as InvoiceDetail}
          screenType="pharmacy"
        />
      </div>

      {/* Transaction table */}
      <div className="mt-4.5">
        <h1 className="font-semibold mb-3 text-[16px] leading-[22px] text-black">
          All Transactions
        </h1>
        <div className=" bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px]">
          <DataTable table={table} />
        </div>
      </div>
    </div>
  );
}
