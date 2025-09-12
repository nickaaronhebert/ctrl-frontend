import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MedicationCard } from "../MedicationCard/MedicationCard";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";
import type { useSearchParams } from "react-router-dom";

function MedicationSelector({
  searchParam,
  setSearchParams,
}: {
  searchParam: string;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
}) {
  const {
    selectedVariants,
    searchQuery,
    selectAll,
    clearAll,
    getFilteredMedications,
  } = useMedication();

  const filteredMedications = getFilteredMedications();
  const hasSelections = selectedVariants.length > 0;

  const handleSelectAll = () => {
    if (hasSelections) {
      clearAll();
    } else {
      selectAll();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search medications by name"
            value={searchParam}
            onChange={(e) => {
              const query = e.target.value;
              setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                if (query) {
                  newParams.set("q", query);
                } else {
                  newParams.delete("q");
                }
                return newParams;
              });
            }}
            className="w-[380px] h-[44px] rounded-[6px] pl-10 pr-[15px] py-[12px] bg-white border-card-border "
          />
        </div>
        <Button
          variant="outline"
          onClick={handleSelectAll}
          className="w-[110px] h-[40px] rounded-[50px] border border-primary px-[20px] py-[5px] text-primary hover:text-primary"
        >
          {hasSelections ? "Clear All" : "Select All"}
        </Button>
      </div>

      {/* Medications List */}
      <div className="space-y-4">
        {filteredMedications.map((medication) => (
          <MedicationCard key={medication.id} medication={medication} />
        ))}
      </div>

      {filteredMedications.length === 0 && searchQuery && (
        <div className="text-center py-8 text-muted-foreground">
          No medications found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}

export default MedicationSelector;
