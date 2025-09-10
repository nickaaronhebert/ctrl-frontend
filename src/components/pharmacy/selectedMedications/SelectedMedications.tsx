import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import { useBulkUpsertPharmacyCatalogueMutation } from "@/redux/services/pharmacy";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function SetDefaultPrices() {
  const { selectedVariants, medications, prices, setPrices } = useMedication();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [bulkUpsertPharmacyCatalogue] =
    useBulkUpsertPharmacyCatalogueMutation();

  console.log("medications", medications);

  console.log("prices", prices);

  // Group selected variants by medication
  const selectedMedications = medications.filter((med) =>
    selectedVariants.some((variant) => variant.medicationId === med.id)
  );

  console.log("selectedMedications", selectedMedications);

  const filteredMedications = selectedMedications.filter((med) =>
    med.drugName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalVariants = selectedVariants.length;

  const pricedVariants = Object.keys(prices).filter(
    (key) => prices[key] && prices[key] !== "0.00"
  ).length;

  const handlePriceChange = (variantId: string, value: string) => {
    setPrices((prev) => ({ ...prev, [variantId]: value }));
  };

  const handleSaveCatalogue = async () => {
    const items = Object.entries(prices)
      .filter(([_, price]) => price && Number(price) > 0)
      .map(([variantId, price]) => ({
        productVariant: variantId,
        price: Number(price),
        transmissionMethod: "api",
        sku: "",
        metadata: {},
      }));

    const payload = { items };

    try {
      await bulkUpsertPharmacyCatalogue(payload).unwrap();
      navigate("/pharmacy/medications/success");
    } catch (error: unknown) {
      console.error("Profile update failed:", error);

      let message = "An unexpected error occurred";

      if (typeof error === "object" && error !== null && "data" in error) {
        const data = (error as any).data;

        if (Array.isArray(data?.message)) {
          message = data.message[0];
        } else if (typeof data?.message === "string") {
          message = data.message;
        }
      }

      toast.error(message, {
        duration: 1500,
      });
    }
  };

  console.log("selectedVariants", selectedVariants);

  return (
    <div className="mb-5">
      <div className="bg-lilac py-3 px-12 flex justify-between mb-4">
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            className="flex items-start justify-start gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Medications
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">
            Set Default Prices
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-normal text-[14px] leading-[18px] text-black">
            {pricedVariants} of {totalVariants} variants priced
          </span>
          <Button
            onClick={handleSaveCatalogue}
            className="bg-primary min-w-[110px] min-h-[40px] rounded-[50px] hover:bg-primary text-white px-[20px] py-[5px]"
          >
            Save Catalogue
          </Button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medications by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[380px] h-[44px] rounded-[6px] pl-10 pr-[15px] py-[12px] bg-white border-card-border "
            />
          </div>
          <div className="text-right ">
            <span className="font-normal  text-[14px] leading-[18px] text-gray-400">
              Showing {filteredMedications.length} of{" "}
              {selectedMedications.length} medications
            </span>
          </div>
        </div>

        {/* Medications */}
        <div className="space-y-4">
          {filteredMedications.map((medication) => {
            const medicationVariants = selectedVariants.filter(
              (v) => v.medicationId === medication.id
            );
            const medicationPricedCount = medicationVariants.filter(
              (v) => prices[v.variantId] && prices[v.variantId] !== "0.00"
            ).length;

            return (
              <div
                key={medication.id}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <MedicationLibrary color="#5354ac" />
                    <h3 className="text-lg font-medium text-gray-900">
                      {medication.drugName}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {medicationPricedCount} / {medicationVariants.length}{" "}
                    variants
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4  border border-slate-200 rounded-lg pt-4">
                  <div className="flex justify-between w-full gap-8 text-sm font-medium text-gray-500 px-[10px] uppercase tracking-wide">
                    <div>VARIANTS</div>
                    <div>DEFAULT PRICE</div>
                  </div>

                  {medicationVariants.map((variant) => {
                    console.log("variant", variant);
                    return (
                      <div
                        key={variant.variantId}
                        className="flex w-full justify-between gap-8 bg-slate-100 border border-slate-200 px-[15px] py-[5px]"
                      >
                        <div className="text-gray-900 w-1/2">
                          <span className="mt-[100px]">
                            {medication.drugName} {variant.variant.strength}
                          </span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0"
                            value={prices[variant.variantId] || ""}
                            onChange={(e) =>
                              handlePriceChange(
                                variant.variantId,
                                e.target.value
                              )
                            }
                            className="w-[115px] h-[38px] rounded-[6px] px-[12px] py-[10px] border-card-border bg-white text-right"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
