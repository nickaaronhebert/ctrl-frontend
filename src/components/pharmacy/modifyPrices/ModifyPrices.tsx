import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import { useBulkUpsertPharmacyCatalogueMutation } from "@/redux/services/pharmacy";
import { toast } from "sonner";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { ApiError } from "@/types/global/commonTypes";
import { useGetPharmacyCatalogueQuery } from "@/redux/services/pharmacy";
import { PaginationWithLinks } from "@/components/common/PaginationLink/PaginationLink";
import type {
  PharmacyCatalogue,
  PharmacyProductVariant,
} from "@/types/responses/medication";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function ModifyPrices() {
  const { prices, setPrices } = useMedication();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "10", 10);
  const [searchTerm, setSearchTerm] = useState("");
  const [pharmacyIdentifiers, setPharmacyIdentifiers] = useState<
    Record<string, string>
  >({});

  const {
    data: allMedications,
    error,
    isLoading,
    isFetching,
  } = useGetPharmacyCatalogueQuery({
    page,
    perPage,
  });
  const [bulkUpsertPharmacyCatalogue] =
    useBulkUpsertPharmacyCatalogueMutation();

  const allMedicationVariants = allMedications?.data ?? [];

  const totalVariants = allMedicationVariants.reduce(
    (acc: number, med: PharmacyCatalogue) => acc + med.productVariant.length,
    0
  );

  const pricedVariants = allMedicationVariants.reduce(
    (acc: number, med: PharmacyCatalogue) => {
      return (
        acc +
        med.productVariant.filter(
          (variant: PharmacyProductVariant) =>
            prices[variant.productVariant._id] &&
            prices[variant.productVariant._id] !== "0.00"
        ).length
      );
    },
    0
  );

  const handlePriceChange = (variantId: string, value: string) => {
    setPrices((prev) => ({ ...prev, [variantId]: value }));
  };

  const handleIdentifierChange = (variantId: string, value: string) => {
    setPharmacyIdentifiers((prev) => ({ ...prev, [variantId]: value }));
  };

  useEffect(() => {
    if (allMedications?.data) {
      const initialPrices: Record<string, string> = {};
      const initialIdentifiers: Record<string, string> = {};
      allMedications.data.forEach((medication: PharmacyCatalogue) => {
        medication.productVariant.forEach((variant: PharmacyProductVariant) => {
          if (!(variant.productVariant._id in prices)) {
            initialPrices[variant.productVariant._id] =
              variant.price.toString();
          }
          if (variant?.pharmacyIdentifier) {
            initialIdentifiers[variant?.productVariant?._id] =
              variant?.pharmacyIdentifier;
          }
        });
      });
      if (Object.keys(initialPrices).length > 0) {
        setPrices((prevPrices) => ({ ...prevPrices, ...initialPrices }));
      }
      if (Object.keys(initialIdentifiers).length > 0) {
        setPharmacyIdentifiers((prev) => ({ ...prev, ...initialIdentifiers }));
      }
    }
  }, [allMedications, page]);

  const handleSaveCatalogue = async () => {
    const items = Object.entries(prices)
      .filter(([_, price]) => price && Number(price) > 0)
      .map(([variantId, price]) => ({
        productVariant: variantId,
        price: Number(price),
        transmissionMethod: "api",
        sku: "",
        pharmacyIdentifier: pharmacyIdentifiers[variantId] || "",
        metadata: {},
      }));

    const payload = { items };

    try {
      await bulkUpsertPharmacyCatalogue(payload).unwrap();
      navigate("/pharmacy/medications/view-catalogue", {
        state: {
          pricedVariants: items.length,
        },
      });
      toast.success("Prices updated successfully", {
        duration: 1500,
      });
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

  const filteredMedications = allMedicationVariants.filter(
    (med: PharmacyCatalogue) =>
      med.medicationCatalogue?.drugName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div>Error loading pharmacy catalogue.</div>;
  }

  return (
    <div className="mb-5">
      <div className="bg-lilac py-3 px-12 flex justify-between mb-4">
        <div>
          <Link
            to={"/pharmacy/medications/configure"}
            className="font-normal text-sm text text-muted-foreground"
          >
            {"<- Back to Medications"}
          </Link>

          <h1 className="text-2xl font-bold mt-1">Modify Prices</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-normal text-[14px] leading-[18px] text-black">
            {pricedVariants} of {totalVariants} variants priced
          </span>
          <Button
            disabled={
              pricedVariants !== totalVariants ||
              Object.values(prices).some(
                (price) => price === "0" || price === "0.00"
              )
            }
            onClick={handleSaveCatalogue}
            className="bg-primary min-w-[110px] cursor-pointer min-h-[40px] rounded-[50px] hover:bg-primary text-white px-[20px] py-[5px]"
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
              {filteredMedications.length} medications
            </span>
          </div>
        </div>

        {/* Medications */}
        <div className="space-y-4">
          {filteredMedications.map((medication: PharmacyCatalogue) => {
            const medicationVariants = medication.productVariant ?? [];
            return (
              <div
                key={medication._id}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <MedicationLibrary color="#5354ac" />
                    <h3 className="text-lg font-medium text-gray-900">
                      {medication.medicationCatalogue?.drugName}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {medication?.productVariant?.length} /{" "}
                    {medicationVariants.length} variants
                  </span>
                </div>

                <div className="space-y-0 rounded-[10px] border border-gray-200 overflow-hidden">
                  <div className="flex justify-between items-center bg-white py-[9px] px-4 border-b border-gray-200">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-1/2">
                      VARIANTS
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase w-1/3 ">
                      PHARMACY IDENTIFIER
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      DEFAULT PRICE
                    </div>
                  </div>

                  {medicationVariants.map((variant: PharmacyProductVariant) => {
                    return (
                      <div
                        key={variant._id}
                        className="flex justify-between items-center py-3 px-4 bg-light-background border-b border-gray-200 last:border-b-0"
                      >
                        <div className="text-gray-900 w-1/2">
                          <span className="mt-[100px]">
                            {/* {medication?.medicationCatalogue?.drugName}{" "} */}
                            {variant?.productVariant?.strength}
                          </span>
                        </div>
                        <div className="w-1/3">
                          <Input
                            type="text"
                            placeholder="e.g., SKU-12345"
                            value={
                              pharmacyIdentifiers[
                                variant?.productVariant?._id
                              ] || ""
                            }
                            onChange={(e) => {
                              handleIdentifierChange(
                                variant?.productVariant?._id,
                                e.target.value
                              );
                            }}
                            className="w-full h-10 rounded-md px-3 py-2 border-gray-300 bg-white"
                          />
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
                            value={prices[variant.productVariant?._id] || ""}
                            onChange={(e) => {
                              handlePriceChange(
                                variant.productVariant?._id,
                                e.target.value
                              );
                            }}
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
        <div className="mt-3">
          <PaginationWithLinks
            page={page}
            pageSize={perPage}
            totalCount={allMedications?.meta?.itemCount}
          />
        </div>
      </div>
    </div>
  );
}
