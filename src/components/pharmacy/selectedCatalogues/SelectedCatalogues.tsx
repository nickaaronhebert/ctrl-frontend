import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import type { ApiError } from "@/types/global/commonTypes";
import { useCreatePharmacyCatalogueVariantMutation } from "@/redux/services/pharmacy";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function SelectedCatalogues() {
  const { selectedVariants, catalogues, clearAll } = useMedication();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [prices, setPrices] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const plan = searchParams.get("plan");
  const [pharmacyIdentifiers, setPharmacyIdentifiers] = useState<
    Record<string, string>
  >({});

  const [createPharmacyCatalogueVariant, { isLoading }] =
    useCreatePharmacyCatalogueVariantMutation();

  // Group selected variants by medication
  const selectedCatalogues = catalogues.filter((catalogue) =>
    selectedVariants.some((variant) => variant.medicationId === catalogue._id)
  );

  const filteredCatalogues = selectedCatalogues.filter((catalogue) =>
    catalogue?.medicationCatalogue?.drugName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalVariants = selectedVariants.length;

  const pricedVariants = Object.keys(prices).filter(
    (key) => prices[key] && prices[key] !== "0.00"
  ).length;

  const handlePriceChange = (variantId: string, value: string) => {
    setPrices((prev) => ({ ...prev, [variantId]: value }));
  };

  const handlePharmacyIdentifierChange = (variantId: string, value: string) => {
    setPharmacyIdentifiers((prev) => ({ ...prev, [variantId]: value }));
  };

  const handleSaveCatalogue = async () => {
    const config = Object.entries(prices)
      .filter(([_, price]) => price && Number(price) > 0)
      .map(([variantId, price]) => ({
        pharmacyCatalogue: variantId,
        newPrice: Number(price),
        primaryPharmacyIdentifier: pharmacyIdentifiers[variantId] || "",
      }));

    const payload = { config };

    try {
      await createPharmacyCatalogueVariant({
        phmCatalogueVariantId: id,
        config,
      }).unwrap();
      clearAll();
      navigate("/pharmacy/medications/catalogues");
      toast.success("Medications added successfully", {
        duration: 1500,
      });
      console.log("payload", payload);
    } catch (error: unknown) {
      console.error("Profile update failed:", error);

      let message = "An unexpected error occurred";

      if (typeof error === "object" && error !== null && "data" in error) {
        const data = (error as ApiError).data;

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

  return (
    <div className="mb-5">
      <div className="bg-lilac py-3 px-12 flex justify-between mb-4">
        <div>
          <Link
            to={`/pharmacy/medications/all-catalogues/${id}?plan=${plan}`}
            className="font-normal text-sm text text-muted-foreground"
          >
            {"<- Back to Medications"}
          </Link>

          <h1 className="text-2xl font-bold mt-1">
            {plan?.charAt(0).toUpperCase() + "" + plan?.slice(1)} - Set
            Medication Price
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-normal text-[14px] leading-[18px] text-black">
            {pricedVariants} of {totalVariants} variants priced
          </span>
          <Button
            // disabled={
            //   pricedVariants !== totalVariants ||
            //   Object.values(prices).some(
            //     (price) => price === "0" || price === "0.00"
            //   )
            // }
            onClick={handleSaveCatalogue}
            className="bg-primary min-w-[110px] cursor-pointer min-h-[40px] rounded-[50px] hover:bg-primary text-white px-[20px] py-[5px]"
          >
            {isLoading ? <LoadingSpinner size={18} /> : "Save Catalogue"}
          </Button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        {selectedCatalogues?.length > 0 ? (
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
            <div className="text-right">
              <span className="font-normal text-[14px] leading-[18px] text-gray-400">
                Showing {filteredCatalogues.length} of{" "}
                {selectedCatalogues.length} medications
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[80vh] text-center">
            <p className="text-lg font-semibold text-gray-500">
              No medications selected yet. Please select some to get started.
            </p>
          </div>
        )}
        {/* Medications */}
        <div className="space-y-4">
          {filteredCatalogues.map((catalogue) => {
            const catalogueVariants = selectedVariants.filter(
              (v) => v.medicationId === catalogue._id
            );
            const medicationPricedCount = catalogueVariants?.filter(
              (v) => prices[v.variantId] && prices[v.variantId] !== "0.00"
            ).length;

            return (
              <div
                key={catalogue._id}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <MedicationLibrary color="#5354ac" />
                    <h3 className="text-lg font-medium text-gray-900">
                      {catalogue?.medicationCatalogue?.drugName}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {medicationPricedCount} / {catalogueVariants.length}{" "}
                    variants
                  </span>
                </div>

                <div className="space-y-0 rounded-[10px] border border-gray-200 overflow-hidden">
                  <div className="flex justify-between items-center bg-white py-[9px] px-4 border-b border-gray-200">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-1/4">
                      VARIANTS
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-1/4">
                      DEFAULT PRICE
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-1/4 ">
                      SKU(Unique Product Code)
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide ">
                      SET PRICE
                    </div>
                  </div>

                  {catalogueVariants?.map((variant: any) => {
                    console.log("variant", variant);
                    return (
                      <div
                        key={variant.variantId}
                        className="flex justify-between items-center py-3 px-4 bg-light-background border-b border-gray-200 last:border-b-0 gap-4"
                      >
                        <div className="text-gray-900 w-1/3">
                          <span className="mt-[100px]">
                            {variant?.variant?.productVariant?.name}
                          </span>
                        </div>

                        <div className="text-gray-900 w-1/3 ml-5">
                          <span className="mt-[100px]">
                            ${variant?.variant?.price}
                          </span>
                        </div>
                        <div className="w-1/3">
                          <Input
                            type="text"
                            placeholder="e.g., SKU-12345"
                            value={pharmacyIdentifiers[variant.variantId] || ""}
                            onChange={(e) =>
                              handlePharmacyIdentifierChange(
                                variant.variantId,
                                e.target.value
                              )
                            }
                            className="w-full h-10 rounded-md px-3 py-2 border-gray-300 bg-white"
                          />
                        </div>
                        <div className="relative ">
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
