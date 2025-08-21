import { Input } from "@/components/ui/input";
import type { Medication, Variant } from "@/pages/AccessDetail";
import { Search } from "lucide-react";
import type { ChangeEvent } from "react";

type MedicationVariantProps = {
  selectedMedication: Medication | null;
  selectedVariant: Variant | null;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};
const DefaultPharmacy = ({
  selectedMedication,
  selectedVariant,
  searchQuery,
  setSearchQuery,
}: MedicationVariantProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 pt-4">
      <div className="flex justify-between items-start px-6">
        <div>
          <p className="font-semibold text-[18px] leading-[26px] text-black mb-3">
            {selectedMedication && selectedMedication?.name} -{" "}
            {selectedVariant?.strength}
          </p>
          <p className="font-normal text-[14px] leading-[16px] text-slate">
            Individual state assignments
          </p>
        </div>
        <div>
          <span className="py-[4px] px-[8px] rounded-[5px] bg-light-background font-normal text-[14px] leading-[16px] ">
            0 / 50 configured
          </span>
        </div>
      </div>
      <div className="px-6">
        <div className="mt-4 relative">
          <Input
            type="text"
            placeholder="Search State"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
      </div>
      <div className="h-[2px] bg-gray-200 w-full my-5" />

      {/* States component below */}
    </div>
  );
};

export default DefaultPharmacy;
