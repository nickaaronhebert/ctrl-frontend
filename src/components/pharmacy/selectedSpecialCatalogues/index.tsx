import { Button } from "@/components/ui/button";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Box } from "lucide-react";
import { useCallback, useState } from "react";
import { Info } from "lucide-react";
import { useCreatePharmacyCatalogueVariantMutation } from "@/redux/services/pharmacy";
import ConfigureShipping from "./shippingDialog";
import ConfigureSuppliesDialog from "../configureSupplies";

export interface ProductVariant {
  catalogueId: string;
  variantId: string;
  variantName: string | undefined;
  variantStrength: string;
  defaultPrice: number;
  defaultSku: string;
  sku: string;
  price: number;
  supplies: {
    _id: string;
    name: string;
    price: string;
    quantity: number;
  }[];

  isSelected: boolean;
}

export interface Medication {
  id: string;
  drugName: string;
  copyApplied: boolean;
}
interface VariantListProps {
  defaultVariants: ProductVariant[];
  defaultMedications: Medication[];
}
function VariantList({
  defaultVariants,
  defaultMedications,
}: VariantListProps) {
  const { id } = useParams();
  const [createPharmacyCatalogueVariant] =
    useCreatePharmacyCatalogueVariantMutation();
  const [openShippingDialog, setOpenShippingDialog] = useState(false);
  const [variants, setVariants] = useState(defaultVariants);
  const [medications, setMedications] = useState(defaultMedications);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const navigate = useNavigate();
  const totalPricedVariants = variants?.reduce(
    (acc, cVal) => acc + (cVal.isSelected ? 1 : 0),
    0
  );

  const handleCopyConfiguration = useCallback((medication: Medication) => {
    setMedications((prev) =>
      prev.map((med) =>
        med.id === medication.id ? { ...med, copyApplied: true } : med
      )
    );

    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.catalogueId === medication.id
          ? {
              ...variant,
              price: variant.defaultPrice,
              sku: variant.defaultSku,
              isSelected: true,
            }
          : variant
      )
    );
  }, []);

  const handleVariantPriceChange = useCallback(
    (oldVariant: ProductVariant, price: number) => {
      setVariants((prevVariants) =>
        prevVariants.map((variant) =>
          variant.variantId === oldVariant.variantId
            ? {
                ...variant,
                price: price,
                isSelected: true,
              }
            : variant
        )
      );
    },
    []
  );

  const handleVariantSkuChange = useCallback(
    (oldVariant: ProductVariant, sku: string) => {
      setVariants((prevVariants) =>
        prevVariants.map((variant) =>
          variant.variantId === oldVariant.variantId
            ? {
                ...variant,
                sku: sku,
                isSelected: true,
              }
            : variant
        )
      );
    },
    []
  );

  const handleSaveCatalogue = async () => {
    const finalVariants = variants?.filter((variant) => variant.isSelected);
    const payload = finalVariants.map((item) => ({
      pharmacyCatalogue: item.variantId,
      newPrice: item.price,
      primaryPharmacyIdentifier: item?.sku,
      supplies: item?.supplies?.map((item) => ({
        supply: item._id,
        overridePrice: Number(item.price),
      })),
    }));

    try {
      await createPharmacyCatalogueVariant({
        phmCatalogueVariantId: id!,
        config: payload,
      }).unwrap();
      toast.success("Medications added successfully", {
        duration: 1500,
      });
      navigate("/pharmacy/medications/catalogues");
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong", {
        duration: 1500,
      });
    }
  };

  return (
    <div>
      <div className="bg-lilac py-3 px-12 flex justify-between mb-4">
        <div>
          <Link
            to={`/pharmacy/medications/configure-catalogues/${id}`}
            className="font-normal text-sm text text-muted-foreground"
          >
            {"<- Back to Medications"}
          </Link>

          <h1 className="text-2xl font-bold mt-1">Configure Catalogue</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-normal text-[14px] leading-[18px] text-black">
            {totalPricedVariants} of {variants?.length} variants priced
          </span>
          <Button
            // disabled={
            //   pricedVariants !== totalVariants ||
            //   Object.values(prices).some(
            //     (price) => price === "0" || price === "0.00"
            //   )
            // }
            // onClick={handleSaveCatalogue}
            onClick={handleSaveCatalogue}
            className="bg-primary min-w-[110px] cursor-pointer min-h-[40px] rounded-[50px] hover:bg-primary text-white px-[20px] py-[5px]"
          >
            Save Catalogue
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="max-w-[800px]">
          <div className="p-2 bg-blue-50 rounded-[4px] flex gap-1.5 items-center my-4">
            <Info stroke="#008CE3" size={14} />
            <p className="text-[#008CE3] font-semibold text-xs">
              Click "Copy Standard Configuration" on each product level to
              inherit supply settings from Standard Catalogue.
            </p>
          </div>

          <div className="p-3 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold">
                Catalogue-Level Shipping Prices
              </h4>
              <h6 className="text-xs font-normal text-[#3E4D61]">
                Override shipping prices once for each shipping class for this
                catalogue
              </h6>
            </div>
            <ConfigureShipping
              open={openShippingDialog}
              setOpen={setOpenShippingDialog}
            />
            {/* <Button variant={"ctrl"} className="!bg-black text-xs">
          Configure Price
        </Button> */}
          </div>

          <div className="space-y-4">
            {medications?.map((item) => {
              const isCopyConfigured = item?.copyApplied;
              const medicationVariants = variants?.filter(
                (variant) => variant?.catalogueId === item?.id
              );
              const pricedMedicationVariants = medicationVariants?.reduce(
                (acc, cVal) => acc + (cVal.isSelected ? 1 : 0),
                0
              );

              return (
                <>
                  <div
                    key={item?.id}
                    className="bg-white rounded-lg border border-gray-200 p-6"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center  mb-4 gap-3 ">
                        <div className="flex items-center   p-2 rounded-[8px] bg-lilac">
                          <MedicationLibrary color="#5354ac" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {item?.drugName}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {pricedMedicationVariants} /{" "}
                            {medicationVariants?.length} variants
                          </span>
                        </div>
                      </div>

                      {!isCopyConfigured && (
                        <span
                          className="cursor-pointer flex items-center gap-2 font-semibold text-[10px] border rounded-[4px] p-2"
                          onClick={() => handleCopyConfiguration(item)}
                        >
                          <Copy size={14} />
                          COPY STANDARD CONFIGURATION
                        </span>
                      )}

                      {isCopyConfigured && (
                        <span
                          className="cursor-pointer flex items-center gap-2 font-semibold text-[10px] border rounded-[4px] p-2"
                          onClick={() => setOpenDialogId(item.id)}
                        >
                          OVERRIDE SUPPLY PRICES
                        </span>
                      )}
                    </div>

                    <div className="space-y-0 rounded-[10px] border border-gray-200 overflow-hidden">
                      <div className="flex justify-between items-center bg-white py-[9px] px-4 border-b border-gray-200">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-[130px]">
                          VARIANTS
                        </div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-[110px]">
                          DEFAULT PRICE
                        </div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-[180px]">
                          SKU
                        </div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-[120px]">
                          SET PRICE
                        </div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-[80px]">
                          SUPPLIES
                        </div>
                      </div>
                      {medicationVariants?.map((item) => {
                        return (
                          <div
                            key={item?.variantId}
                            className="flex justify-between items-center py-3 px-4 bg-light-background border-b border-gray-200 last:border-b-0 gap-4"
                          >
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-[130px]">
                              {item?.variantName}
                            </div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-[110px]">
                              {item?.defaultPrice}
                            </div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-[180px]">
                              <Input
                                type="text"
                                placeholder="e.g., SKU-12345"
                                value={item?.sku}
                                onChange={(e) => {
                                  handleVariantSkuChange(item, e.target.value);
                                }}
                                className="w-full h-10 rounded-md px-3 py-2 border-gray-300 bg-white"
                              />
                            </div>
                            <div className="relative text-xs font-medium text-gray-500 uppercase tracking-wide w-[120px]">
                              <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-500">
                                $
                              </span>
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0"
                                value={item?.price}
                                onChange={(e) => {
                                  console.log("price", e.target.value);
                                  handleVariantPriceChange(
                                    item,
                                    Number(e.target.value)
                                  );
                                }}
                                //   onChange={(e) =>
                                //     handlePriceChange(
                                //       variant.variantId,
                                //       e.target.value
                                //     )
                                //   }
                                className="w-[115px] h-[38px] rounded-[6px] px-[12px] py-[10px] border-card-border bg-white text-right"
                              />
                            </div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-[80px] flex gap-1 items-center">
                              <Box stroke="#63627F" size={18} />
                              <span>-</span>
                              {isCopyConfigured && item?.supplies?.length > 0
                                ? item?.supplies?.length
                                : ""}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <ConfigureSuppliesDialog
                    openDialogId={openDialogId}
                    setOpenDialogId={setOpenDialogId}
                    medicationsData={item}
                    setVariants={setVariants}
                    variantsData={variants}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default function SelectedSpecialCatalogues() {
  const { selectedVariants, catalogues } = useMedication();

  const transformedProductVariants = selectedVariants?.map((item) => {
    return {
      catalogueId: item?.medicationId,
      variantId: item?.variant?._id,
      variantName: item?.variant?.productVariant?.name,
      variantStrength: item?.variant?.productVariant?.strength,
      defaultPrice: item?.variant?.price || 0,
      defaultSku: item?.variant?.sku || "",
      sku: "",
      price: 0,
      supplies: item?.variant?.supplies?.map((val) => {
        return {
          _id: val?.supply?._id,
          name: val?.supply?.name,
          price: val?.supply?.price,
          quantity: val?.supply?.quantity,
        };
      }),

      isSelected: false,
    };
  });

  const transformedCatalogues = catalogues
    ?.map((item) => {
      return {
        id: item?.medicationCatalogue?._id,
        drugName: item?.medicationCatalogue?.drugName,
        copyApplied: false,
      };
    })
    ?.filter((item) => {
      return transformedProductVariants?.find(
        (variant) => variant.catalogueId === item?.id
      );
    });

  return (
    <VariantList
      defaultVariants={transformedProductVariants}
      defaultMedications={transformedCatalogues}
    />
  );
}
