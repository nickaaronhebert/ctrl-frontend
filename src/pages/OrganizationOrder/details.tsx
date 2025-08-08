import CubeSVG from "@/assets/icons/Cube";
import OrderOverviewCard from "@/components/common/Card/order-overview";
import PatientCard from "@/components/common/Card/patient";
import TransmissionCard from "@/components/common/Card/transmission";
import { Button } from "@/components/ui/button";
import { useViewOrderByIdQuery } from "@/redux/services/order";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const menuItems = [
  {
    title: "Order Overview",
    scrollToId: "orderOverview",
  },
  {
    title: "Patient Information",
    scrollToId: "patientInformation",
  },

  {
    title: "Transmissions",
    scrollToId: "transmissionDetails",
  },
];

export default function ViewOrderDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<
    "patientInformation" | "transmissionDetails" | "orderOverview"
  >("orderOverview");

  const {
    data,
    transmissions,
    patient,
    transmissionsLength,
    medicationsLength,
    order,
  } = useViewOrderByIdQuery(id as string, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      data: data?.data,
      patient: data?.data?.patient,
      transmissions: data?.data?.transmissions,
      transmissionsLength: data?.data?.transmissions?.length,
      isLoading: isLoading,
      isError: isError,
      medicationsLength:
        data?.data?.transmissions?.reduce(
          (count, transmission) =>
            count + (transmission.prescriptions?.length || 0),
          0
        ) || 0,
      order: {
        amount: data?.data?.amount || "-",
        createdAt: data?.data?.createdAt || "-",
        status: data?.data?.status || "-",
      },
    }),
  });
  console.log("Order Details", data);
  console.log("Transmission", transmissions);

  if (!patient || !transmissions) {
    return <div>Loading............</div>;
  }

  return (
    <div className="mb-5">
      <div className="bg-lilac py-3 px-12">
        <Link
          to={"/org/orders"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Orders"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">Order: {data?.orderId} </h1>
      </div>

      <div className="flex gap-8 px-14 mt-6">
        <div
          className="w-lg  max-w-80
         rounded-[10px] shadow-[0px_2px_40px_0px_#00000014] h-fit"
        >
          <div className="p-3">
            <div className="flex gap-3.5 items-center ">
              <div className="w-[50px] h-[50px] flex justify-center items-center bg-lilac rounded-[8px]">
                <CubeSVG />
              </div>
              <div>
                <h4 className="text-base font-medium text-black">
                  {data?.orderId}
                </h4>
                <h6 className="text-xs font-normal text-[#3E4D61]">
                  {transmissionsLength} Transmission{" "}
                  {transmissionsLength! > 1 ? "s" : ""}
                </h6>
              </div>
            </div>
          </div>
          {menuItems.map((item, index) => (
            <Button
              key={item.title}
              className={`w-full rounded-none text-white text-sm p-5 font-medium cursor-pointer !h-14 ${
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
              {item.title}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-5 w-full">
          <OrderOverviewCard
            order={{ ...order, medicationCatalogueLength: medicationsLength }}
          />
          <PatientCard patient={patient} />
          <TransmissionCard transmissions={transmissions} />
        </div>
      </div>
    </div>
  );
}
