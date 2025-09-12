import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import type { PharmacyResultsProps } from "@/types/responses/pharmacy";
import { PharmacyVariantTable } from "../PharmacyVariantTable/PharmacyVariantTable";

export default function PharmacyResults({ data }: PharmacyResultsProps) {
  return (
    <div>
      <Accordion className="mb-2" type="single" collapsible>
        {data?.data?.map((pharmacy) => {
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
                      {pharmacy.productvariants?.length}{" "}
                      {pharmacy.productvariants?.length === 1
                        ? "variant"
                        : "variants"}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-10">
                {pharmacy.productvariants.length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <PharmacyVariantTable variants={pharmacy.productvariants} />
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
