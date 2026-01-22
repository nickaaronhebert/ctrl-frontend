import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, type ComponentProps } from "react";
import { useViewTransmissionByIdQuery } from "@/redux/services/transmission";
import PharmacyCard from "@/components/common/Card/pharmacy";
import PrescriptionCard from "@/components/common/Card/prescription";
import TransmissionOverviewCard from "@/components/common/Card/transmission-overview";
import PatientCard from "@/components/common/Card/patient";
import Pharmacies from "@/assets/mainlayouticons/Pharmacies";
import ZigZag from "@/assets/mainlayouticons/ZigZag";
import Medications from "@/assets/mainlayouticons/Medications";
import SecondaryOverview from "@/assets/mainlayouticons/SecondaryOverview";
import Profile from "@/assets/icons/Profile";
import { useLazyTransmitTransmissionQuery } from "@/redux/services/transmission";
import { toast } from "sonner";

const PatientMenuIcon = (props: ComponentProps<typeof Profile>) => (
  <Profile width={30} height={30} {...props} />
);

const menuItems = [
  {
    title: "Overview",
    scrollToId: "transmissionOverview",
    icon: ZigZag,
  },
  {
    title: "Patient Information",
    scrollToId: "patientInformation",
    icon: PatientMenuIcon,
  },

  {
    title: "Pharmacy Information",
    scrollToId: "pharmacyInformation",
    icon: Pharmacies,
  },

  {
    title: "Prescription Information",
    scrollToId: "medicationInformation",
    icon: Medications,
  },
];

export default function TransmissionDetails() {
  const params = useParams();
  const statusColorMap: Record<string, string> = {
    created: "bg-background",
    pending: "bg-pending-secondary",
    queued: "bg-queued-secondary",
    transmitted: "bg-progress-secondary",
    failed: "bg-failed-secondary",
  };

  const [activeTab, setActiveTab] = useState<
    | "transmissionOverview"
    | "patientInformation"
    | "pharmacyInformation"
    | "medicationInformation"
  >("transmissionOverview");

  const {
    data,
    pharmacy,
    prescriptions,
    transmissionDetails,
    patient,
    order,
    externalOrderId,
    refetch,
  } = useViewTransmissionByIdQuery(params.id as string, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      data: data?.data,
      pharmacy: data?.data?.pharmacy,
      prescriptions: data?.data?.prescriptions,
      patient: data?.data?.patient ?? data?.data?.order?.patient,
      order: data?.data?.order,
      externalOrderId:
        data?.data?.order?.externalOrderId ?? data?.data?.externalOrderId,
      transmissionDetails: {
        amount: data?.data?.amount || 0,
        createdAt: data?.data?.createdAt || "-",
        status: data?.data?.status || "-",
        organization: data?.data?.organization || null,
        subOrganization: data?.data?.subOrganization || null,
        tracking: data?.data?.shippingDetails || null,
      },
      isLoading: isLoading,
      isError: isError,
    }),
  });

  const [transmit, { isLoading }] = useLazyTransmitTransmissionQuery();

  const status = data?.status?.toLowerCase();
  const bgColor = statusColorMap[status as string];

  const uniqueId = data?.foreignPharmacyOrderId ?? "-";

  const handleOrderTransmission = () => {
    if (!params.id) return;

    transmit(params.id)
      .unwrap()
      .then(() => {
        toast.success("Transmission transmitted successfully", {
          duration: 1500,
        });
        refetch();
      })
      .catch((err) => {
        console.error("Transmission failed:", err);
        toast.error(err?.data?.message ?? "Something went wrong", {
          duration: 3000,
        });
      });
  };

  return (
    <div className="mb-5">
      <div
        className={` ${bgColor} py-3 px-12 flex justify-between items-center`}
      >
        <div>
          <Link
            to={"/org/transmissions"}
            className="font-normal text-sm text text-muted-foreground"
          >
            {"<- Recent transmission volume and statistics"}
          </Link>

          <h1 className="text-2xl font-bold mt-1">
            Transmissions: {data?.transmissionId}{" "}
          </h1>
        </div>
        <div>
          {data?.order?.transmissionMethod === "manual" &&
            data?.status === "Queued" && (
              <Button
                disabled={isLoading}
                className="rounded-full cursor-pointer text-white p-5"
                onClick={handleOrderTransmission}
              >
                Transmit Transmission
              </Button>
            )}
        </div>
      </div>

      <div className="flex gap-8 px-14 mt-6">
        <div
          className="w-lg  max-w-80
                 rounded-[10px] shadow-[0px_2px_40px_0px_#00000014] h-fit"
        >
          <div className="p-3">
            <div className="flex gap-3.5 items-center ">
              <div className="w-[50px] h-[50px] flex justify-center items-center bg-lilac rounded-[8px]">
                <SecondaryOverview />
              </div>
              <div>
                <h4 className="text-base font-medium text-black">
                  {data?.transmissionId}
                </h4>
                <h6 className="text-xs font-normal text-[#3E4D61]">
                  {pharmacy?.name}
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
                  color={activeTab === item.scrollToId ? "#FFFFFF" : "#9AA2AC"}
                />

                {item.title}
              </Button>
            );
          })}
        </div>

        <div className="flex flex-col gap-5 w-full">
          {transmissionDetails && (
            <TransmissionOverviewCard
              transmission={transmissionDetails}
              uniqueId={uniqueId}
              externalOrderId={externalOrderId}
              id={params.id as string}
            />
          )}

          {patient && <PatientCard patient={patient} />}

          {pharmacy && <PharmacyCard pharmacy={pharmacy} />}

          <div
            className="bg-white rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
            id="medicationInformation"
          >
            <div className="flex items-center gap-2 p-5 border-b border-card-border">
              <Medications color="black" />
              <h2 className="text-base font-semibold ">Medications</h2>
            </div>
            {prescriptions && (
              <PrescriptionCard
                prescriptions={prescriptions}
                telegraProvider={order?.encounter?.telegraProvider}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
