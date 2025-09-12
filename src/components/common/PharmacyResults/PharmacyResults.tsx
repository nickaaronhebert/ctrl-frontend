import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDataTable } from "@/hooks/use-data-table";
import { useMemo } from "react";
import { pharmacyVariantColumns } from "@/components/data-table/columns/pharmacy-columns";
import { DataTable } from "@/components/data-table/data-table";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import type { PharmacyResultsProps } from "@/types/responses/pharmacy";

export default function PharmacyResults({ data }: PharmacyResultsProps) {
  const variantColumns = useMemo(() => pharmacyVariantColumns(), []);

  return (
    <div>
      <Accordion className="mb-2" type="single" collapsible>
        {data?.data?.map((pharmacy) => {
          const { table: variantTable } = useDataTable({
            data: pharmacy.productvariants || [],
            columns: variantColumns,
            pageCount: -1,
          });
          return (
            <AccordionItem
              value={`pharmacy-${pharmacy.id}`}
              className="border border-b-card-border border-t-0 border-l-0 border-r-0"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline ">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-[50px] h-[50px] flex justify-center items-center bg-secondary rounded-[8px]">
                      <MedicationLibrary color="#5354ac" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">
                        {pharmacy.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                        <span>{pharmacy.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[12px] leading-[16px] mt-1">
                      {pharmacy.productvariants?.length} variants
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-10">
                {pharmacy.productvariants.length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <DataTable table={variantTable} />
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Click to view variants and pricing information
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
