import CubeSVG from "@/assets/icons/Cube";
import Medications from "@/assets/mainlayouticons/Medications";
import SecondaryPatient from "@/assets/mainlayouticons/SecondaryPatient";
import ZigZag from "@/assets/mainlayouticons/ZigZag";
import OrderOverviewCard from "@/components/common/Card/order-overview";
import PatientCard from "@/components/common/Card/patient";
import TransmissionCard from "@/components/common/Card/transmission";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  // useTransmitOrderMutation,
  useViewOrderByIdQuery,
} from "@/redux/services/order";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { toast } from "sonner";

const menuItems = [
  {
    title: "Order Overview",
    scrollToId: "orderOverview",
    icon: ZigZag,
  },
  {
    title: "Patient Information",
    scrollToId: "patientInformation",
    icon: SecondaryPatient,
  },

  {
    title: "Transmissions",
    scrollToId: "transmissionDetails",
    icon: Medications,
  },
];

export default function ViewOrderDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<
    "patientInformation" | "transmissionDetails" | "orderOverview"
  >("orderOverview");

  // const [transmitOrder] = useTransmitOrderMutation();

  const {
    data,
    transmissions,
    patient,
    transmissionsLength,
    medicationsLength,
    order,
    encounter,
  } = useViewOrderByIdQuery(id as string, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      data: data?.data,
      patient: data?.data?.patient,
      transmissions: data?.data?.transmissions,
      transmissionsLength: data?.data?.transmissions?.length,
      encounter: data?.data?.encounter,
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

  // const handleOrderTransmission = async () => {
  //   await transmitOrder(id as string)
  //     .unwrap()
  //     .then((data) => {
  //       toast.success(data?.message || "Order Transmitted Successfully", {
  //         duration: 1500,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("error", err);
  //       toast.error(err?.data?.message ?? "Something went wrong", {
  //         duration: 3000,
  //       });
  //     });
  // };

  if (!patient || !transmissions) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mb-5">
      <div className="bg-lilac py-3 px-12 flex justify-between items-center">
        <div className="">
          <Link
            to={"/org/orders"}
            className="font-normal text-sm text text-muted-foreground"
          >
            {"<- Back to Orders"}
          </Link>

          <h1 className="text-2xl font-bold mt-1">Order: {data?.orderId} </h1>
        </div>
        {/* {data?.transmissionMethod === "manual" &&
          data?.status === "Transmittable" && (
            <Button
              className="rounded-full cursor-pointer text-white p-5"
              onClick={handleOrderTransmission}
            >
              Transmit Order
            </Button>
          )} */}
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
          <OrderOverviewCard
            order={{ ...order, medicationCatalogueLength: medicationsLength }}
          />
          <PatientCard patient={patient} />
          <TransmissionCard
            transmissions={transmissions}
            telegraProvider={encounter?.telegraProvider}
          />
        </div>
      </div>
    </div>
  );
}
