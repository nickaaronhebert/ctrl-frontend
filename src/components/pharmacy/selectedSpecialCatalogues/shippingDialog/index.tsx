import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  //   DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  useCreateCatalogueShippingDetailsMutation,
  useViewCatalogueShippingDetailsQuery,
} from "@/redux/services/shipping";
import type { CatalogueShippingDetails } from "@/types/responses/IViewCatalogueShipping";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface ShippingItems {
  shippingProfile: string;
  price: number;
}

interface ConfigureShippingProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ConfigureShipping({
  open,
  setOpen,
}: ConfigureShippingProps) {
  const { id } = useParams();
  const { data } = useViewCatalogueShippingDetailsQuery();
  const [createCatalogueShipping] = useCreateCatalogueShippingDetailsMutation();
  const [catalogueItems, setCatalogueItems] = useState<ShippingItems[]>([]);

  const handleShippingPriceChange = useCallback(
    (
      item: CatalogueShippingDetails,
      price: number,
      action: "ADD" | "UPDATE"
    ) => {
      if (action === "ADD") {
        setCatalogueItems((prevCatalogueItems) => [
          ...prevCatalogueItems,
          { shippingProfile: item.id, price: price },
        ]);
      } else {
        setCatalogueItems((prevCatalogueItems) =>
          prevCatalogueItems.map((catalogueItem) =>
            catalogueItem.shippingProfile === item.id
              ? {
                  ...catalogueItem,
                  price: price,
                }
              : catalogueItem
          )
        );
      }
    },
    []
  );

  const handleSaveCatalogue = async () => {
    try {
      await createCatalogueShipping({
        items: catalogueItems,
        phmCatalogueVariantId: id!,
      }).unwrap();
      toast.success("Shipping Prices added successfully", {
        duration: 1500,
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        duration: 1500,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-black text-white py-2 px-4  text-sm font-semibold rounded-full">
        {/* <Button variant={"ctrl"} className="!bg-black text-xs"> */}
        Configure Price
        {/* </Button> */}
      </DialogTrigger>
      <DialogContent className="min-w-[600px] bg-white">
        <DialogHeader className="!border-b-[1px] p-1">
          <DialogTitle className="text-[20px] font-semibold p-2">
            Override Catalogue-Level Shipping Prices
          </DialogTitle>
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription> */}
        </DialogHeader>
        <div className="p-4">
          <div className="space-y-0 rounded-[10px] border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center bg-white py-[9px] px-4 border-b border-gray-200">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-[200px]">
                VARIANTS
              </div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-[115px] mr-[15px]">
                DEFAULT PRICE
              </div>
              <div className="text-xs font-medium text-gray-500 uppercase w-[150px] tracking-wide">
                SET PRICE
              </div>
            </div>
            {data?.data?.map((item) => {
              const shippingDetails = catalogueItems.filter(
                (val) => val.shippingProfile === item.id
              )?.[0];
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-3 px-4 bg-light-background border-b border-gray-200 last:border-b-0 gap-4"
                >
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-[200px]">
                    {item?.name || "-"}
                  </div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide w-[115px] mr-[15px]">
                    {item?.services?.price || 0}
                  </div>
                  <div className="text-xs font-medium text-gray-500 uppercase w-[150px] tracking-wide">
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0"
                      value={
                        shippingDetails?.price || item?.services?.price || ""
                      }
                      onChange={
                        (e) => {
                          const action = shippingDetails ? "UPDATE" : "ADD";
                          handleShippingPriceChange(
                            item,
                            Number(e.target.value),
                            action
                          );
                        }

                        // handlePriceChange(
                        //   variant.variantId,
                        //   e.target.value
                        // )
                      }
                      className="w-full h-[38px] rounded-[6px] px-[12px] py-[10px] border-card-border bg-white text-right"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <DialogFooter className="p-4 border-t mt-4">
          <Button
            variant={"outline"}
            className="min-w-[150px] rounded-full min-h-[45px]"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant={"ctrl"}
            className="min-w-[150px] rounded-full text-sm min-h-[45px]"
            disabled={catalogueItems.length === 0}
            onClick={handleSaveCatalogue}
          >
            Apply Prices
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
