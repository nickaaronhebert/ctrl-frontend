import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle } from "lucide-react";
// import { pharmacies } from "@/constants";
import Globe from "@/assets/icons/Globe";
import { useLazyGetBulkPharmaciesQuery } from "@/redux/services/access-control";
import { type Variant } from "@/pages/Organization/AccessControl/AccessDetail";
import type { Pharmacy } from "@/types/global/commonTypes";
import { MultiSelect } from "@/components/ui/multi-select";
import { useCreateAccessControlMutation } from "@/redux/services/access-control";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type BulkAssignmentProps = {
  selectedPharmacy: string | null;
  setSelectedPharmacy: (id: string | null) => void;
  selectedVariant: Variant | null;
};

export function BulkAssignment({
  selectedPharmacy,
  selectedVariant,
  setSelectedPharmacy,
}: BulkAssignmentProps) {
  const totalStates = 50;
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [triggerGetPharmacies, { data: bulkPharmacyData }] =
    useLazyGetBulkPharmaciesQuery();

  const [createAccessControl] = useCreateAccessControlMutation();

  const selectedPharmacyData = bulkPharmacyData?.data?.find(
    (pharmacy: Pharmacy) => pharmacy.id === selectedPharmacy
  );

  const allowedStates = selectedPharmacyData?.allowedStates || [];

  const unavailableStates = totalStates - allowedStates.length;

  const handleStateChange = (selected: string[]) => {
    setSelectedStates(selected);
  };

  const handleApplyToAll = () => {
    if (!selectedVariant?.id) {
      console.error("No product variant selected");
      return;
    }
    const payload = {
      productVariant: selectedVariant.id,
      defaultPharmacy: selectedStates?.reduce((acc: any, state: any) => {
        acc[state] = selectedPharmacy;
        return acc;
      }, {}),
    };

    // API call below //
    createAccessControl(payload)
      .unwrap()
      .then(() => {
        toast.success("Bulk Assignment Successful", {
          duration: 1500,
        });
        // setSelectedPharmacy(null); // Reset pharmacy selection
        // setSelectedStates([]); // Reset selected states
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.data?.message ?? "Something went wrong", {
          duration: 1500,
        });
      });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="min-w-4 min-h-4 rounded-full flex items-center justify-center">
            <Globe />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Bulk Assignment
          </h2>
        </div>
        <p className="text-sm text-gray-600 ml-6">
          Apply one pharmacy to multiple states
        </p>
      </div>

      {/* Select and Button Row */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-1/2">
          <Select
            value={selectedPharmacy || ""}
            onValueChange={setSelectedPharmacy}
            onOpenChange={(isOpen) => {
              if (isOpen && selectedVariant?.id) {
                triggerGetPharmacies(selectedVariant?.id || "")
                  .unwrap()
                  .then(() => {
                    // console.log("Pharmacy data:", res);
                  })
                  .catch((error) => {
                    console.error("Error fetching pharmacies:", error);
                  });
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Pharmacy" />
            </SelectTrigger>
            <SelectContent>
              {bulkPharmacyData?.data?.map((pharmacy: any) => {
                return (
                  <SelectItem key={pharmacy.id} value={pharmacy.id}>
                    {pharmacy.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="w-1/2">
          <MultiSelect
            className="w-full min-h-[40px] border-input"
            options={allowedStates.map((state: any) => ({
              value: state,
              label: state,
            }))}
            value={selectedStates}
            onValueChange={handleStateChange}
            placeholder="Select States"
          />
        </div>
        <Button
          onClick={handleApplyToAll}
          disabled={allowedStates.length === 0}
          className="bg-primary text-white px-6"
        >
          Apply to All
        </Button>
      </div>
      {selectedPharmacy && (
        <div
          className={cn(
            "grid gap-6 bg-light-background p-3",
            selectedStates.length > 0 ? "grid-cols-3" : "grid-cols-2"
          )}
        >
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-[12px] leading-[16px] text-[#1aa263]">
                {allowedStates?.length}{" "}
                {allowedStates?.length === 1 ? "state" : "states"} available
              </p>
              <p className="font-normal text-[12px] leading-[16px] text-[#1aa263]">
                Will be assigned automatically
              </p>
            </div>
          </div>
          {selectedStates.length > 0 && (
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-[12px] leading-[16px] text-blue-600">
                  {selectedStates.length}{" "}
                  {selectedStates.length === 1 ? "state" : "states"} selected
                </p>
                <p className="font-normal text-[12px] leading-[16px] text-blue-600">
                  Chosen by user
                </p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-[12px] leading-[16px] text-[#d56f01]">
                {unavailableStates}{" "}
                {unavailableStates === 1 ? "state" : "states"} unavailable
              </p>
              <p className="font-normal text-[12px] leading-[16px] text-[#d56f01]">
                Require manual assignment
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
