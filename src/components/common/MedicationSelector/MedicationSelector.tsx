import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MedicationCard } from "../MedicationCard/MedicationCard";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";

function MedicationSelector() {
  const {
    selectedVariants,
    searchQuery,
    setSearchQuery,
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
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search medications by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={handleSelectAll}
          className="px-6 bg-transparent"
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
