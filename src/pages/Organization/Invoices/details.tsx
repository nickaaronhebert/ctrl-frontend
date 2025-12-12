// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { useGetOrganizationInvoiceByIdQuery } from "@/redux/services/stripe";
// import { Link, useParams } from "react-router-dom";
// import ZigZag from "@/assets/mainlayouticons/ZigZag";
// import { LoadingSpinner } from "@/components/ui/loading-spinner";
// import InvoiceOverviewCard from "@/components/common/Card/invoice-overview";
// import InvoiceItemsCard from "@/components/common/Card/invoice-items";
// import PharmacyCard from "@/components/common/Card/pharmacy";
// import PaymentMethodDetails from "@/components/common/Card/card-details";

// import CardSVG from "@/assets/icons/CardIcon";
// import Pharmacies from "@/assets/mainlayouticons/Pharmacies";
// import Invoices from "@/assets/icons/Invoices";
// import DocumentSVG from "@/assets/icons/Document";
// import { formatDateMMDDYYYY } from "@/lib/utils";

// type ScrollID =
//   | "invoiceInformation"
//   | "pharmacyInformation"
//   | "medications"
//   | "paymentInformation";
// const menuItems = [
//   {
//     title: "Invoice Information",
//     scrollToId: "invoiceInformation",
//     icon: ZigZag,
//   },
//   {
//     title: "Pharmacy Information",
//     scrollToId: "pharmacyInformation",
//     icon: Pharmacies,
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

// export default function ViewInvoiceDetails() {
//   const { id } = useParams();
//   const [activeTab, setActiveTab] = useState<
//     | "invoiceInformation"
//     | "pharmacyInformation"
//     | "medications"
//     | "paymentInformation"
//   >("invoiceInformation");

//   const {
//     data,
//     invoiceDetails,
//     medicationDetails,

//     pharmacyDetails,
//     isFetching,
//   } = useGetOrganizationInvoiceByIdQuery(id as string, {
//     selectFromResult: ({ data, isLoading, isFetching, isError }) => {
//       const { id, createdAt, transmissionCode, totalAmount, pharmacy } =
//         data?.data || {};
//       return {
//         data: data?.data,
//         invoiceDetails: {
//           id: id ?? "",
//           transmissionCode: transmissionCode ?? "",
//           totalAmount: totalAmount ?? 0,
//           createdAt: formatDateMMDDYYYY(createdAt ?? "") ?? "",
//         },

//         pharmacyDetails: {
//           name: pharmacy?.name ?? "",
//           email: pharmacy?.email ?? "",
//           address: pharmacy?.address,
//           phoneNumber: pharmacy?.phoneNumber ?? "",
//           id: pharmacy?.id ?? "",
//         },

//         medicationDetails: data?.data?.lineItems.map((item) => ({
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
//           to={"/org/transactions"}
//           className="font-normal text-sm text text-muted-foreground"
//         >
//           {"<- Back to Invoices"}
//         </Link>

//         <h1 className="text-2xl font-bold mt-1">
//           Invoice: {data?.transmissionCode}{" "}
//         </h1>
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
//                   {data?.transmissionCode}
//                 </h4>
//                 <h6 className="text-xs font-normal text-[#3E4D61]">
//                   {formatDateMMDDYYYY(data?.createdAt ?? "")}
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
//                   setActiveTab(item.scrollToId as ScrollID);
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
//           <PharmacyCard pharmacy={pharmacyDetails} />
//           <InvoiceItemsCard
//             invoiceItems={medicationDetails}
//             totalAmount={invoiceDetails.totalAmount}
//             applicationFee={data?.applicationFee ?? ""}
//           />
//           <PaymentMethodDetails
//             cardInfo={data?.card?.last4 ?? ""}
//             transactionId={data?.paymentIntent ?? ""}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

//////////////////// v1 code above ///////////////////

//////////////// v2 code below //////////////////

import { Link, useParams } from "react-router-dom";
import { type InvoiceDetail } from "@/types/responses/invoice";
import { useGetInvoiceByIdQuery } from "@/redux/services/invoice";
import InvoiceDetailsCard from "@/components/common/Card/invoice-detail-card";
import { TotalAmountCard } from "@/components/common/Card/total-amount-card";
import { DataTable } from "@/components/data-table/data-table";
import { useMemo } from "react";
import { useGetAdminCardsQuery } from "@/redux/services/stripe";
import { useDataTable } from "@/hooks/use-data-table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { organizationInvoiceColumns } from "@/components/data-table/columns/organization-invoices";

export default function ViewInvoiceDetails() {
  const { id } = useParams();
  const {
    data: invoiceData,
    isLoading: isInvoiceLoading,
    refetch,
  } = useGetInvoiceByIdQuery(id as string);

  const { data: userCards } = useGetAdminCardsQuery(
    invoiceData?.data?.subOrganization
      ? { subOrganization: invoiceData.data?.subOrganization }
      : {},
    {
      selectFromResult: ({ data, isFetching }) => {
        return {
          data: data?.data,
          isFetching: isFetching,
        };
      },
    }
  );

  const columns = useMemo(() => organizationInvoiceColumns(), []);

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
          to={"/org/transactions"}
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
            organizationDetails: "Pharmacy Details",
            period: "Period",
          }}
          screenType="organization"
        />
        <TotalAmountCard
          data={invoiceData?.data as InvoiceDetail}
          screenType="organization"
          cards={userCards}
          refetch={refetch}
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
