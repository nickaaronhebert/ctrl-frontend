import type {
  PharmacyCatalogue,
  PharmacyProductVariant,
} from "@/types/responses/medication";
import VariantRow from "../VariantRow/VariantRow";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import { useDeletePharmacyCatalogueMutation } from "@/redux/services/pharmacy";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import {
  useMedication,
  type VariantShippingSuppliesConfig,
} from "@/context/ApplicationUser/MedicationContext";
import { useState } from "react";
import ConfigureShippingSuppliesModal from "../ConfigureShippingSuppliesModal/ConfigureShippingSuppliesModal";

interface MedicationProps {
  medication: PharmacyCatalogue;
}

export function MedicationRow({ medication }: MedicationProps) {
  const [open, setOpen] = useState<boolean>(false);
  const variantCount = medication.productVariant.length;
  const {
    setConfiguredVariants,
    setConfiguredVariantIds,
    setVariantShippingSupplies,
  } = useMedication();
  const [deletePharmacyCatalogue] = useDeletePharmacyCatalogueMutation();

  const handleDeleteVariant = async (variant: PharmacyProductVariant) => {
    try {
      await deletePharmacyCatalogue({ id: variant._id }).unwrap();
      toast.success("Catalogue deleted successfully", {
        duration: 1500,
      });
    } catch (error) {
      console.error("Failed to delete variant:", error);
      toast.success("Failed to delete catalogue", {
        duration: 1500,
      });
    }
  };

  const handleEditShippingSupplies = (medication: PharmacyCatalogue) => {
    const selectedVariantIds: string[] = [];
    const shippingSuppliesMap: Record<string, VariantShippingSuppliesConfig> =
      {};
    const configuredVariantsList: any[] = [];

    medication?.productVariant?.forEach((v) => {
      const variantId = v.productVariant?._id;

      configuredVariantsList.push({
        variantId,
        variant: v.productVariant,
        medication,
        medicationId: medication._id,
        variantCatalogueId: v._id,
      });
      selectedVariantIds.push(variantId);

      if (v.shippingProfile || (v.supplies && v.supplies.length > 0)) {
        shippingSuppliesMap[variantId] = {
          shippingProfile: (v.shippingProfile as any) ?? "",
          supplies: (v.supplies ?? []).map((s) => ({
            supply: s.supply?._id,
            quantity: s.quantity,
            supplyRequired: s.supplyRequired ? "REQUIRED" : "OPTIONAL",
            isOnePerOrder: s.isOnePerOrder ?? false,
          })),
        };
      }
    });
    setConfiguredVariants(configuredVariantsList);
    setConfiguredVariantIds(selectedVariantIds);
    setVariantShippingSupplies(shippingSuppliesMap);
    setOpen(true);
  };

  return (
    <>
      <div className="p-[10px] rounded-[15px] border border-card-border bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-[8px] p-[12px] w-[40px] h-[40px] bg-secondary flex justify-center items-center">
                <MedicationLibrary color="#5354ac" />
              </div>
              <h3 className="font-semibold text-[16px] leading-[22px] text-black">
                {medication.medicationCatalogue.drugName}
              </h3>
            </div>
            <span className="font-medium text-[14px] leading-[18px] text-black">
              {variantCount} variant{variantCount !== 1 ? "s" : ""}
            </span>
          </div>
          <Button
            variant={"outline"}
            className="border flex items-center gap-2 border-[#3E4D61] px-[10px] py-[5px] rounded-[4px] text-black cursor-pointer bg-transparent"
            onClick={() => handleEditShippingSupplies(medication)}
          >
            {" "}
            <SquarePen /> EDIT SHIPPING AND SUPPLIES
          </Button>
        </div>
        <div className="space-y-0 rounded-[10px] border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-12 bg-white py-[9px] px-4 border-b border-gray-200">
            <div className="col-span-12 md:col-span-3 text-xs font-medium text-gray-500 uppercase">
              VARIANTS
            </div>
            <div className="col-span-12 md:col-span-3 text-xs font-medium text-gray-500 uppercase">
              SKU(PRIMARY PHARMACY IDENTIFIER)
            </div>
            <div className="col-span-6 md:col-span-3 md:text-right text-xs font-medium text-gray-500 uppercase">
              DEFAULT PRICE
            </div>
            <div className="col-span-6 md:col-span-3 md:text-right text-xs font-medium text-gray-500 uppercase">
              ACTIONS
            </div>
          </div>

          <div className="border border-gray-200 overflow-hidden">
            {medication.productVariant.map(
              (variant: PharmacyProductVariant) => {
                return (
                  <VariantRow
                    key={variant._id}
                    variant={variant}
                    drugName={medication.medicationCatalogue.drugName}
                    onDelete={handleDeleteVariant}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
      {open && (
        <ConfigureShippingSuppliesModal
          open={open}
          onOpenChange={setOpen}
          isEditMode={true}
        />
      )}
    </>
  );
}
