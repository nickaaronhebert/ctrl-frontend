import { Input } from "@/components/ui/input";
import type {
  Medication,
  Variant,
} from "@/pages/Organization/AccessControl/AccessDetail";
import { Search } from "lucide-react";
import { useState, type ChangeEvent, useEffect } from "react";
import US_STATES from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLazyGetPharmacyByStateQuery } from "@/redux/services/access-control";
import { useCreateAccessControlMutation } from "@/redux/services/access-control";
import type { Pharmacy } from "@/types/global/commonTypes";
import type { SingleAccessResponse } from "@/types/responses/access-control";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type MedicationVariantProps = {
  selectedMedication: Medication | null;
  selectedVariant: Variant | null;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  data: SingleAccessResponse;
  configuredStates: Record<string, string>;
  setConfiguredStates: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
};

const DefaultPharmacy = ({
  selectedVariant,
  selectedMedication,
  searchQuery,
  setSearchQuery,
  data,
  configuredStates,
  setConfiguredStates,
}: MedicationVariantProps) => {
  const [fullPharmacies, setFullPharmacies] = useState<{
    [stateName: string]: Pharmacy | undefined;
  }>({});

  const [pharmaciesByState, setPharmaciesByState] = useState<
    Record<string, Pharmacy[]>
  >({});

  const [openState, setOpenState] = useState<string | null>(null);
  const [createAccessControl] = useCreateAccessControlMutation();
  const [trigger, { isLoading }] = useLazyGetPharmacyByStateQuery();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (data?.data?.defaultPharmacy) {
      const fullPharmacies = Object.fromEntries(
        Object.entries(data?.data?.defaultPharmacy).map(([state, pharmacy]) => [
          state,
          pharmacy,
        ])
      );
      setFullPharmacies(fullPharmacies);
      const pharmaciesWithIdsOnly = Object.fromEntries(
        Object.entries(data?.data?.defaultPharmacy).map(([state, pharmacy]) => [
          state,
          pharmacy.id,
        ])
      );
      setConfiguredStates(pharmaciesWithIdsOnly);
    } else {
      setFullPharmacies({});
      setConfiguredStates({});
    }
  }, [data?.data?.defaultPharmacy, selectedVariant?.id]);

  const filteredStates = US_STATES.filter(
    (state) =>
      state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      state.shortCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (
    state: { name: string; shortCode: string },
    id: string
  ) => {
    if (!selectedVariant) return;

    setConfiguredStates((prev) => {
      const updated = {
        ...prev,
        [state.name]: id,
      };

      setFullPharmacies((prevFullPharmacies) => ({
        ...prevFullPharmacies,
        [state.name]: pharmaciesByState[state.shortCode].find(
          (pharmacy: Pharmacy) => pharmacy.id === id
        ),
      }));

      createAccessControl({
        productVariant: selectedVariant.id,
        defaultPharmacy: updated,
      })
        .unwrap()
        .then(() => {
          toast.success("Access Control Created Successfully", {
            duration: 1500,
          });
        })
        .catch((err) => {
          console.error("Error creating access control", err);
        });

      return updated;
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 pt-4">
      <div className="flex justify-between items-start px-6">
        <div>
          <p className="font-semibold text-[18px] leading-[26px] text-black mb-3">
            {`${selectedMedication?.name} - ${selectedVariant?.strength}`}
          </p>
          <p className="font-normal text-[14px] leading-[16px] text-slate">
            Individual state assignments
          </p>
        </div>
        <div>
          <span className="py-[4px] px-[8px] rounded-[5px] bg-light-background font-normal text-[14px] leading-[16px]">
            {Object.keys(configuredStates || {}).length} / 50 configured
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

      <div className="px-6">
        <div className="grid grid-cols-2 gap-4 items-start">
          {filteredStates.map((state) => {
            const isAssigned = configuredStates[state?.name];
            return (
              <div
                key={state.shortCode}
                className={cn(
                  "rounded-lg p-4 border border-card-border flex flex-col",
                  {
                    "bg-progress-secondary border border-progress":
                      configuredStates[state?.name],
                    "bg-light-background": !configuredStates[state?.name],
                  }
                )}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-[14px] text-black leading-[18px] ">
                    {state.name} ({state.shortCode})
                  </h3>
                  <span
                    className={cn(
                      "py-[4px] px-[8px] rounded-[5px] text-[12px] font-medium leading-[12px]",
                      {
                        "bg-progress-secondary text-progress border border-progress":
                          isAssigned,
                        "bg-light-background text-muted-foreground border border-muted-foreground":
                          !isAssigned,
                      }
                    )}
                  >
                    {isAssigned ? "Assigned" : "Not Configured"}
                  </span>
                </div>

                <Select
                  value={configuredStates[state.name] || ""}
                  onValueChange={(value) => {
                    if (value && pharmaciesByState[state.shortCode]) {
                      handleSelect(state, value);
                    }
                  }}
                  onOpenChange={(isOpen) => {
                    if (isOpen && selectedVariant?.id) {
                      setOpenState(state.shortCode);
                      trigger({
                        productVariantId: selectedVariant?.id,
                        stateName: state.name,
                      })
                        .unwrap()
                        .then((res) => {
                          setPharmaciesByState((prev) => ({
                            ...prev,
                            [state.shortCode]: res.data,
                          }));
                        });
                    }
                  }}
                >
                  <SelectTrigger className="w-full bg-white border-gray-300">
                    <SelectValue placeholder="Select a pharmacy">
                      {configuredStates[state.name]
                        ? fullPharmacies[state.name]?.name ||
                          "Select a pharmacy"
                        : "Select a pharmacy"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {isLoading && openState === state.shortCode && (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    )}

                    {!isLoading &&
                      openState === state.shortCode &&
                      pharmaciesByState[state.shortCode]?.length === 0 && (
                        <SelectItem value="no-pharmacy" disabled>
                          No pharmacy for fulfillment
                        </SelectItem>
                      )}

                    {(pharmaciesByState[state.shortCode] || []).map(
                      (pharmacy: Pharmacy) => {
                        return (
                          <SelectItem key={pharmacy.id} value={pharmacy.id}>
                            {pharmacy.name}
                          </SelectItem>
                        );
                      }
                    )}
                  </SelectContent>
                </Select>
                <div className="mt-2 flex items-center">
                  {configuredStates[state.name] &&
                  fullPharmacies[state.name] ? (
                    <p className="text-sm text-green-700 font-medium">
                      {fullPharmacies[state.name]?.name} – Default Pharmacy
                      configured
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DefaultPharmacy;
