import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Medication } from "@/pages/AccessDetail";
import { useGetMedicationCatalogueQuery } from "@/redux/services/medication";
import { useState } from "react";
type MedicationSelectionProps = {
  selectedMedication: Medication | null;
  setSelectedMedication: (med: Medication) => void;
};

export function MedicationSelection({
  selectedMedication,
  setSelectedMedication,
}: MedicationSelectionProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isError, isLoading } = useGetMedicationCatalogueQuery(
    {
      page: 1,
      perPage: 100,
      q: "",
    },
    {
      skip: !open,
    }
  );

  const medicationOptions = data?.data;

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      onValueChange={(value) => {
        const selected = medicationOptions?.find(
          (m) => m.id.toString() === value
        );
        if (selected) {
          setSelectedMedication({
            id: selected?.id.toString(),
            name: selected?.drugName,
          });
        }
      }}
      value={selectedMedication?.id ?? ""}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Medication" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Available Medications</SelectLabel>

          {isLoading && <div>Loading</div>}

          {isError && <div>Error loading medications</div>}

          {medicationOptions?.map((med) => (
            <SelectItem key={med.id} value={med.id.toString()}>
              {med.drugName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
