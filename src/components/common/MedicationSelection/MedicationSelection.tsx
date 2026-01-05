import {
  type Medication,
  type Variant,
} from "@/pages/Organization/AccessControl/AccessDetail";
import { useState } from "react";
import { useGetLinkedCatalogueQuery } from "@/redux/services/medication";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";

type MedicationSelectionProps = {
  selectedMedication: Medication | null;
  setSelectedMedication: (med: Medication) => void;
  setSelectedVariant: (variant: Variant | null) => void;
  disabled: boolean;
};

export function MedicationSelection({
  selectedMedication,
  setSelectedMedication,
  setSelectedVariant,
  disabled,
}: MedicationSelectionProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 400);

  const { data, isError, isLoading } = useGetLinkedCatalogueQuery(
    {
      page: 1,
      perPage: 300,
      q: debouncedSearch,
    },
    {
      skip: !open,
    }
  );

  const medicationOptions = data?.data;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          disabled={disabled}
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedMedication ? selectedMedication?.name : "Select Medication"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <Command>
          <CommandInput
            placeholder="Search medication..."
            value={search}
            onValueChange={setSearch}
          />

          <CommandList>
            {isLoading && <CommandEmpty>Loading medications...</CommandEmpty>}

            {isError && <CommandEmpty>Failed to load medications</CommandEmpty>}

            {!isLoading && !isError && medicationOptions?.length === 0 && (
              <CommandEmpty>No medication found.</CommandEmpty>
            )}
            <CommandGroup>
              {medicationOptions?.map((med) => {
                const value = med.id.toString();

                return (
                  <CommandItem
                    key={value}
                    value={med.drugName}
                    onSelect={() => {
                      setSelectedMedication({
                        id: value,
                        name: med.drugName,
                      });
                      setSelectedVariant(null);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedMedication?.id === value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {med.drugName}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
