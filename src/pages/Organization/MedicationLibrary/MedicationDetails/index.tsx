import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import { useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MedDetails from "@/components/common/MedDetails/MedDetails";
import type { MedicationVariant } from "@/components/data-table/columns/medication-library";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import Pharmacies from "@/assets/mainlayouticons/Pharmacies";
import { useGetSingleMedicationCatalogueDetailsQuery } from "@/redux/services/medication";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { variantColumns } from "@/components/data-table/columns/variant-column";
import Medications from "@/assets/mainlayouticons/Medications";
import PharmacyResults from "@/components/common/PharmacyResults/PharmacyResults";
import { useGetPharmacyMedicinesQuery } from "@/redux/services/pharmacy";
import useAuthentication from "@/hooks/use-authentication";

type TabKey = "medicationDetails" | "medVariants" | "medPharmacies";

const menuItems = [
  {
    title: "Medication Details",
    scrollToId: "medicationDetails",
    icon: Medications,
  },
  {
    title: "Variants",
    scrollToId: "medVariants",
    icon: Pharmacies,
  },

  {
    title: "Pharmacies",
    scrollToId: "medPharmacies",
    icon: Pharmacies,
  },
];

const MedicationDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useAuthentication();

  const pathname = location.pathname.split("/").slice(0, 2).join("/");

  const { data: singleMedDetail, isLoading } =
    useGetSingleMedicationCatalogueDetailsQuery(id!, {
      skip: !id,
    });

  const { data: pharmacyMedicines } = useGetPharmacyMedicinesQuery({
    id,
    page: 1,
    perPage: 10,
    q: "",
  });

  const [activeTab, setActiveTab] = useState<TabKey>("medicationDetails");
  const variantColumn = useMemo(() => variantColumns(), []);

  const { table: variantTable } = useDataTable({
    data: singleMedDetail?.data?.productVariants || [],
    columns: variantColumn,
    pageCount: -1,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={50} />
      </div>
    );
  }

  return (
    <div className="mb-5">
      <div className="bg-lilac py-3 px-12 flex justify-between items-center ">
        <div>
          <Link
            to={`${pathname}/medications`}
            className="font-normal text-sm text text-muted-foreground"
          >
            {"<- Back to Medication Library"}
          </Link>

          <h1 className="text-2xl font-bold mt-1">
            Medication: {singleMedDetail?.data?.drugName}
          </h1>
        </div>
        {user?.role?.name === "Platform Admin" && pathname === "/admin" && (
          <Link
            to={`/admin/edit-medication/${id}`}
            className="bg-primary rounded-2xl text-white px-4 py-2 text-sm"
          >
            Edit Medication
          </Link>
        )}
      </div>
      <div className="flex gap-8 px-14 mt-6">
        <div
          className="w-lg  max-w-80
         rounded-[10px] shadow-[0px_2px_40px_0px_#00000014] h-fit"
        >
          <div className="p-3">
            <div className="flex gap-3.5 items-center ">
              <div className="w-[50px] h-[50px] flex justify-center items-center bg-secondary rounded-[8px]">
                <MedicationLibrary color="#5354ac" />
              </div>
              <div>
                <h4 className="text-base font-medium text-black">
                  {singleMedDetail?.data?.drugName}
                </h4>
                <div className="flex gap-2">
                  {singleMedDetail?.data?.productVariants.map(
                    (variant: MedicationVariant) => {
                      return (
                        <span
                          key={variant.id}
                          className="font-normal text-[12px] leading-[16px] text-slate"
                        >
                          {variant?.strength}
                        </span>
                      );
                    }
                  )}
                </div>
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
                  setActiveTab(item.scrollToId as TabKey);
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
        <div className="flex flex-col gap-3 w-full">
          <MedDetails
            drugName={singleMedDetail?.data?.drugName as string}
            isCompound={singleMedDetail?.data?.isCompound as boolean}
            compoundBaseDrug={singleMedDetail?.data?.compoundBaseDrug}
            category={singleMedDetail?.data?.category as string}
            variants={
              singleMedDetail?.data?.productVariants as MedicationVariant[]
            }
            form={singleMedDetail?.data?.dosageForm as string}
          />
          <div className="bg-white rounded-[15px]">
            <div className="flex items-center gap-2 p-3 mb-1">
              <MedicationLibrary color="black" />
              <h1 className="font-semibold text-[16px] leading-[22px] text-black">
                Variants
              </h1>
            </div>
            <div className="px-6 ">
              <div
                id="medVariants"
                className="mt-3.5 bg-white  shadow-[0px_2px_40px_0px_#00000014] pb-[12px] mb-[20px]"
              >
                <DataTable table={variantTable} />
              </div>
            </div>
          </div>

          <div className=" p-3">
            <p className="font-semibold text-[16px] leading-[22px] text-black">
              Pharmacy Availability
            </p>
          </div>
          <div
            id="medPharmacies"
            className="bg-white border border-card-border rounded-[15px]  shadow-[0px_2px_40px_0px_#00000014] pb-[12px]"
          >
            <PharmacyResults data={pharmacyMedicines} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationDetails;
