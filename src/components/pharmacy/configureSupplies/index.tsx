import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  //   DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  //   DialogTrigger,
} from "@/components/ui/dialog";
import type { Medication, ProductVariant } from "../selectedSpecialCatalogues";
import { Input } from "@/components/ui/input";
import { useCallback } from "react";

interface ConfigureSuppliesDialogProps {
  openDialogId: string | null;
  setOpenDialogId: React.Dispatch<React.SetStateAction<string | null>>;
  variantsData: ProductVariant[];
  medicationsData: Medication;
  setVariants: React.Dispatch<React.SetStateAction<ProductVariant[]>>;
}
export default function ConfigureSuppliesDialog({
  openDialogId,
  setOpenDialogId,
  variantsData,
  medicationsData,
  setVariants,
}: ConfigureSuppliesDialogProps) {
  const selectedVariants = variantsData?.filter(
    (variant) => variant.catalogueId === medicationsData.id
  );

  const handleVariantChange = useCallback(
    (variant: ProductVariant, supplyId: string, price: string) => {
      const newVariantSupplies = variant?.supplies?.map((supply) =>
        supply._id === supplyId
          ? {
              ...supply,
              price,
            }
          : supply
      );

      setVariants((prevVariants) =>
        prevVariants.map((item) =>
          item.variantId === variant.variantId
            ? {
                ...item,
                supplies: [...newVariantSupplies],
              }
            : item
        )
      );
    },
    []
  );

  return (
    <Dialog
      open={openDialogId === medicationsData.id}
      onOpenChange={(open) => setOpenDialogId(open ? medicationsData.id : null)}
    >
      <DialogContent className="min-w-[600px] bg-white">
        <DialogHeader className="!border-b-[1px] p-1">
          <DialogTitle className="text-[20px] font-semibold p-2">
            Custom Supply Prices
          </DialogTitle>
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription> */}
        </DialogHeader>
        <div className="p-4 space-y-3">
          {selectedVariants?.map((item) => {
            return (
              <div>
                <h3 className="font-semibold text-base my-1 pl-1">
                  {item.variantName}
                </h3>
                <div className="space-y-0 rounded-[10px] border border-gray-200 overflow-hidden">
                  <div className="flex justify-between items-center bg-white py-[9px] px-4 border-b border-gray-200">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide ">
                      SUPPLIES
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide ">
                      SET PRICE
                    </div>
                  </div>
                </div>
                {item?.supplies?.map((supply) => {
                  return (
                    <div
                      key={supply._id}
                      className="flex justify-between items-center py-3 px-4 bg-light-background border-b border-gray-200 last:border-b-0 gap-4"
                    >
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-[200px]">
                        {supply.name || "-"}
                      </div>

                      <div className="text-xs font-medium text-gray-500 uppercase w-[150px] tracking-wide">
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0"
                          value={supply.price}
                          onChange={(e) => {
                            handleVariantChange(
                              item,
                              supply._id,
                              e.target.value
                            );
                          }}
                          className="w-full h-[38px] rounded-[6px] px-[12px] py-[10px] border-card-border bg-white text-right"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <DialogFooter className="p-4 border-t mt-4">
          <Button
            variant={"outline"}
            className="min-w-[150px] rounded-full min-h-[45px]"
            onClick={() => setOpenDialogId(null)}
          >
            Cancel
          </Button>

          {/* <Button
            variant={"ctrl"}
            className="min-w-[150px] rounded-full text-sm min-h-[45px]"
            // disabled={catalogueItems.length === 0}
            // onClick={handleSaveCatalogue}
          >
            Apply Prices
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
