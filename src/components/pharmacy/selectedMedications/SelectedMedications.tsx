import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import { useBulkUpsertPharmacyCatalogueMutation } from "@/redux/services/pharmacy";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import type { ApiError } from "@/types/global/commonTypes";
import ConfigureShippingSuppliesModal from "@/components/common/ConfigureShippingSuppliesModal/ConfigureShippingSuppliesModal";

export default function SetDefaultPrices() {
  const {
    selectedVariants,
    medications,
    setConfiguredVariants,
    variantShippingSupplies,
    setVariantShippingSupplies,
  } = useMedication();
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  // const [pharmacyIdentifiers, setPharmacyIdentifiers] = useState<
  //   Record<string, string>
  // >({});
  const [bulkUpsertPharmacyCatalogue] =
    useBulkUpsertPharmacyCatalogueMutation();

  const selectedMedications = medications.filter((med) =>
    selectedVariants.some((variant) => variant.medicationId === med.id)
  );

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
      .map(([variantId, price]) => {
        const config = variantShippingSupplies[variantId];

        console.log("Config", config);

        return {
          productVariant: variantId,
          price: Number(price),
          transmissionMethod: "api",
          sku: "",
          metadata: {},

          ...(config?.shippingProfile && {
            shipping: {
              shippingProfile: config.shippingProfile,
            },
          }),

          ...(config?.supplies?.length > 0 && {
            supplies: config.supplies.map((s) => ({
              supply: s.supply,
              quantity: s.quantity,
              supplyRequired: s.supplyRequired === "REQUIRED",
              isOnePerOrder: s.isOnePerOrder,
            })),
          }),
        };
      });

    const payload = { items };

    try {
      await bulkUpsertPharmacyCatalogue(payload).unwrap();
      navigate("/pharmacy/medications/view-catalogue", {
        state: {
          pricedVariants: items.length,
        },
      });
      toast.success("Medication added successfully", {
        duration: 1500,
      });
      setVariantShippingSupplies({});
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
    <>
      <div className="mb-5">
        <div className="bg-lilac py-3 px-12 flex justify-between mb-4">
          <div>
            <Link
              to={"/pharmacy/medications/configure"}
              className="font-normal text-sm text text-muted-foreground"
            >
              {"<- Back to Medications"}
            </Link>

            <h1 className="text-2xl font-bold mt-1">Set Default Prices</h1>
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
              Save Catalogue
            </Button>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          {selectedMedications?.length > 0 ? (
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
                  Showing {filteredMedications.length} of{" "}
                  {selectedMedications.length} medications
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
            {filteredMedications.length === 0 ? (
              <div className="text-center py-20 text-gray-500 text-lg font-medium">
                No medications match your search.
              </div>
            ) : (
              filteredMedications.map((medication) => {
                const medicationVariants = selectedVariants.filter(
                  (v) => v.medicationId === medication.id
                );
                const medicationPricedCount = medicationVariants.filter(
                  (v) => prices[v.variantId] && prices[v.variantId] !== "0.00"
                ).length;

                console.log("Medication Variants", medicationVariants);

                return (
                  <div
                    key={medication.id}
                    className="bg-white rounded-lg border border-gray-200 "
                  >
                    <div className="flex items-center justify-between mb-4 px-6 pt-4">
                      <div className="flex items-center gap-3">
                        <MedicationLibrary color="#5354ac" />
                        <h3 className="text-lg font-medium text-gray-900">
                          {medication.drugName}
                        </h3>
                      </div>
                      <span className="text-sm text-gray-500">
                        {medicationPricedCount} / {medicationVariants?.length}{" "}
                        variants
                      </span>
                    </div>

                    <div className="space-y-0 rounded-[10px] border border-gray-200 overflow-hidden mx-6">
                      <div className="flex justify-between items-center bg-white py-[9px] px-4 border-b border-gray-200">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-1/2">
                          VARIANTS
                        </div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          DEFAULT PRICE
                        </div>
                      </div>

                      {medicationVariants.map((variant) => {
                        return (
                          <>
                            <div
                              key={variant.variantId}
                              className="flex justify-between items-center py-3 px-4 bg-light-background border-b border-gray-200 last:border-b-0 gap-4"
                            >
                              <div className="text-gray-900 w-1/2">
                                <span className="mt-[100px]">
                                  {variant?.variant?.name}
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
                          </>
                        );
                      })}
                    </div>

                    <div className="w-full h-[1px] bg-[#E6E6EB] mt-4 " />
                    <div className="flex justify-between items-center py-3 px-6 ">
                      <div>
                        <p className="text-[#000000] font-semibold text-[12px] mb-1 leading-[16px]">
                          Shipping and Supplies
                        </p>
                        <p className="text-[#63627F] font-medium text-[10px] ">
                          <span className="min-w-[6px] min-h-[6px] inline-block rounded-full mr-1 bg-[#FFA726] border border-none"></span>
                          {variantShippingSupplies &&
                          Object.keys(variantShippingSupplies).length > 0
                            ? "Configured"
                            : "Not configured"}
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          setOpen(true);
                          setConfiguredVariants(medicationVariants);
                        }}
                        className="px-[10px] py-[5px] text-[#000000] rounded-[4px] cursor-pointer"
                        variant={"outline"}
                      >
                        {variantShippingSupplies &&
                        Object.keys(variantShippingSupplies).length > 0
                          ? "RECONFIGURE"
                          : "CONFIGURE"}
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {open && (
        <ConfigureShippingSuppliesModal open={open} onOpenChange={setOpen} />
      )}
    </>
  );
}
