import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CubeSVG from "@/assets/icons/Cube";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import ZigZag from "@/assets/icons/ZigZag";
import Profile from "@/assets/icons/Profile";
import Invoices from "@/assets/icons/Invoices";
import SecondaryMedication from "@/assets/icons/SecondaryMedication";
import PharmacyOverviewCard from "@/components/common/Card/pharmacy-overview";
import PatientCard from "@/components/common/Card/patient";
import ProviderCard from "@/components/common/Card/provider";
import PrescriptionCard from "@/components/common/Card/prescription";
import { useViewPharmacyTransmissionByIdQuery } from "@/redux/services/transmission";

const menuItems = [
  {
    title: "Overview",
    scrollToId: "transmissionOverview",
    icon: ZigZag,
  },

  {
    title: "Patient Information",
    scrollToId: "patientInformation",
    icon: Profile,
  },

  // {
  //   title: "Affiliate Information",
  //   scrollToId: "medicationInformation",
  //   icon: Profile,
  // },
  {
    title: "Provider Information",
    scrollToId: "providerInformation",
    icon: Profile,
  },
  {
    title: "Medications",
    scrollToId: "medicationInformation",
    icon: SecondaryMedication,
  },
  {
    title: "Transactions",
    scrollToId: "transactionInformation",
    icon: Invoices,
  },
];

export default function PharmacyTransmissionDetails() {
  const { id } = useParams();
  // console.log("singlePharmacyTransmission", singlePharmacyTransmission);

  // const statusColorMap: Record<string, string> = {
  //   created: "bg-background",
  //   pending: "bg-pending-secondary",
  //   queued: "bg-queued-secondary",
  //   transmitted: "bg-progress-secondary",
  //   failed: "bg-failed-secondary",
  // };

  const { data, prescriptions } = useViewPharmacyTransmissionByIdQuery(
    id as string,
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        prescriptions: data?.data?.prescriptions,
        transmissionDetails: {
          amount: data?.data?.amount || 0,
          createdAt: data?.data?.createdAt || "-",
          status: data?.data?.status || "-",
        },
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const [activeTab, setActiveTab] = useState<
    "transmissionOverview" | "pharmacyInformation" | "medicationInformation"
  >("transmissionOverview");

  console.log("Single Pharmacy transmissionnn", data);

  return (
    <div className="mb-5">
      <div className={` py-3 px-12`}>
        <Link
          to={"/pharmacy/transmissions"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Transmission"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">
          Transmissions: {data?.transmissionId}
        </h1>
      </div>

      <div className="flex gap-8 px-14 mt-6">
        <div
          className="w-lg max-w-80
                 rounded-[10px] shadow-[0px_2px_40px_0px_#00000014] h-fit"
        >
          <div className="p-3">
            <div className="flex gap-3.5 items-center ">
              <div className="w-[50px] h-[50px] flex justify-center items-center bg-lilac rounded-[8px]">
                <CubeSVG />
              </div>
              <div>
                <h4 className="text-base font-medium text-black">
                  {data?.transmissionId}
                </h4>
                <h6 className="text-xs font-normal text-[#3E4D61]">
                  {data?.prescriptions?.length}
                  Prescriptions
                </h6>
              </div>
            </div>
          </div>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.title}
                className={`flex justify-start items-center w-full rounded-none  text-white text-sm  font-medium cursor-pointer h-14 ${
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
                  width={30}
                  height={30}
                  color={activeTab === item.scrollToId ? "#FFFFFF" : "#9AA2AC"}
                />

                {item.title}
              </Button>
            );
          })}
        </div>

        <div className="flex flex-col gap-5 w-full">
          {data && <PharmacyOverviewCard transmission={data} />}

          {data && <PatientCard patient={data?.patient} />}

          {data?.prescriptions?.map((prescription, idx) => (
            <ProviderCard key={idx} provider={prescription.provider} />
          ))}

          <div
            className="bg-white rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
            id="medicationInformation"
          >
            <div className="flex items-center gap-2 p-5 border-b border-card-border">
              <MedicationLibrary color="black" width={30} height={30} />
              <h2 className="text-base font-semibold ">Medications</h2>
            </div>
            {prescriptions && (
              <PrescriptionCard prescriptions={prescriptions || []} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
