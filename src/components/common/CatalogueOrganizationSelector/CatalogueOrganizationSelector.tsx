import Catalogue from "@/assets/icons/Catalogue";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { PharmacyCatalogueResponse } from "@/types/responses/IPharmacyCatalogueResponse";

interface CatalogueOrganizationSelector {
  selectedPlan: string;
  setSelectedPlan: (value: string) => void;
  data: PharmacyCatalogueResponse;
}

export function CatalogueOrganizationSelector({
  selectedPlan,
  setSelectedPlan,
  data,
}: CatalogueOrganizationSelector) {
  const handleCheckboxChange = (id: string) => {
    if (selectedPlan === id) {
      setSelectedPlan("");
    } else {
      setSelectedPlan(id);
    }
  };

  return (
    <div className="px-5">
      <div className="bg-[#E5F3FC] rounded-[10px] p-[14px] h-[60px] text-[#008CE3] leading-[16px]  text-[13px] font-normal mb-4">
        If you don't assign a catalogue, the Default Catalogue will be
        automatically assigned.
      </div>
      <div className="space-y-2 max-h-[200px] overflow-y-scroll">
        {data?.data
          ?.filter((option) => option.name !== "Standard Catalogue")
          .map((option) => {
            return (
              <div
                key={option.id}
                onClick={() => handleCheckboxChange(option.id)}
                className={`flex justify-between p-4 rounded-xl border cursor-pointer transition-all
              ${
                selectedPlan === option.id
                  ? "border-primary bg-blue-50"
                  : "border-gray-200 bg-white"
              }
            `}
              >
                <div className="space-y-1 flex gap-2">
                  <Catalogue />
                  <div className="flex flex-col gap-2 ">
                    <Label
                      htmlFor={option.id}
                      className="text-sm font-semibold"
                    >
                      {option.name}
                    </Label>
                    <p className="text-xs text-gray-500 ">
                      {option?.medications} medications with {option?.variants}{" "}
                      variants
                    </p>
                  </div>
                </div>

                {/* <RadioGroupItem id={option.id} value={option.id} /> */}
                <Checkbox
                  id={option.id}
                  checked={selectedPlan === option.id}
                  onCheckedChange={() => handleCheckboxChange(option.id)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
