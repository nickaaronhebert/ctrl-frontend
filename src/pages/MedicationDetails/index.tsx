import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyMedicationData } from "@/constants";
import { Button } from "@/components/ui/button";
import MedDetails from "@/components/common/MedDetails/MedDetails";
import type { MedicationVariant } from "@/components/data-table/columns/medication-library";
import MedVariants from "@/components/common/MedVariants/MedVariants";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { pharmacyColumns } from "@/components/data-table/columns/medication-library-pharmacy";
import { useDataTable } from "@/hooks/use-data-table";
import { dummyPharmacies } from "@/constants";
import Pharmacies from "@/assets/icons/Pharmacies";

const menuItems = [
  {
    title: "Medication Details",
    scrollToId: "medicationDetails",
    icon: MedicationLibrary,
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
  const [activeTab, setActiveTab] = useState<
    "medicationDetails" | "variants" | "pharmacies"
  >("medicationDetails");
  const singleMedItem = dummyMedicationData.find((item) => item.id === id);
  const columns = useMemo(() => pharmacyColumns(), []);

  const { table } = useDataTable({
    data: dummyPharmacies || [],
    columns,
    pageCount: -1,
  });

  return (
    <div className="mb-5">
      <div className="bg-lilac py-3 px-12">
        <Link
          to={"/org/medications"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Medication Library"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">
          Medication: {singleMedItem?.drugName}{" "}
        </h1>
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
                  {singleMedItem?.drugName}
                </h4>
                <div className="flex gap-2">
                  {singleMedItem?.variants.map((variant: MedicationVariant) => {
                    return (
                      <span className="font-normal text-[12px] leading-[16px] text-slate">
                        {variant?.strength}
                      </span>
                    );
                  })}
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
          <MedDetails
            drugName={singleMedItem?.drugName as string}
            compound={singleMedItem?.compound as string}
            category={singleMedItem?.category as string}
            variants={singleMedItem?.variants as MedicationVariant[]}
            form={singleMedItem?.form as string}
            instructions={singleMedItem?.instructions as string}
            administrationNotes={singleMedItem?.administrationNotes as string}
          />
          <MedVariants variants={singleMedItem?.variants} />

          <div className="bg-white rounded-[15px]">
            <div className="flex items-center gap-2 p-3">
              <Pharmacies color="black" />
              <p className="font-semibold text-[16px] leading-[22px] text-black">
                Pharmacies (5)
              </p>
            </div>

            <hr className="mt-1 border-t-1 border-card-border" />

            <div className="p-6">
              <div
                id="medPharmacies"
                className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px]"
              >
                <DataTable table={table} />
                <DataTablePagination table={table} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationDetails;
