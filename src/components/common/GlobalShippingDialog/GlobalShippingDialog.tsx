import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import type { ApiError } from "@/types/global/commonTypes";
import SelectElement from "@/components/Form/select-element";
import { toast } from "sonner";
import { useViewShippingQuery } from "@/redux/services/shipping";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  globalShippingSchema,
  SHIPMENT_OPTIONS,
  type GlobalShippingFormValues,
} from "@/schemas/globalshippingschema";
import { useConfigureShippingDetailsMutation } from "@/redux/services/shipping";
import { useMemo } from "react";

interface GlobalShippingDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function GlobalShippingDialog({
  open,
  onOpenChange,
}: GlobalShippingDialogProps) {
  const [configureShipping, { isLoading: shippingLoading }] =
    useConfigureShippingDetailsMutation();
  const form = useForm<GlobalShippingFormValues>({
    resolver: zodResolver(globalShippingSchema),
    defaultValues: {
      defaultShippingProfile: "",
      shippingStrategy: "MULTIPLE_SHIPMENTS",
    },
  });

  const { data, isLoading } = useViewShippingQuery({
    page: 1,
    perPage: 100,
    q: "",
  });

  async function onSubmit(values: GlobalShippingFormValues) {
    try {
      await configureShipping({
        defaultShippingProfile: values.defaultShippingProfile,
        shippingStrategy: values.shippingStrategy,
      }).unwrap();

      toast.success("Shipping Configured successfully", {
        duration: 1500,
      });

      onOpenChange?.(false);
      form.reset();
    } catch (error: unknown) {
      console.error("Error", error);

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
  }

  function onCancel() {
    form.reset();
    onOpenChange?.(false);
  }

  const shippingOptions = useMemo(
    () =>
      data?.data?.map(({ id, name }) => ({
        label: name,
        value: id,
      })) ?? [],
    [data]
  );
  1;

  const shippingOps = [
    {
      value: SHIPMENT_OPTIONS.LEAST_EXPENSIVE,
      label: "Use the least expensive shipping class",
    },
    {
      value: SHIPMENT_OPTIONS.MOST_EXPENSIVE,
      label: "Use the most expensive shipping class",
    },
    { value: SHIPMENT_OPTIONS.MULTIPLE_SHIPMENTS, label: "Multiple shipments" },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <LoadingSpinner />
      </div>
    );
  }

  const shippingStrategy = form.watch("shippingStrategy");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[630px] rounded-[15px] max-h-[800px] py-3 overflow-y-auto">
        <DialogHeader className="flex flex-col  py-[16px] justify-between items-start">
          <DialogTitle className="text-lg px-[20px] font-medium  w-full">
            Global Shipping Settings
          </DialogTitle>
          <div className="border border-gray-200 w-full"></div>
          <DialogDescription className="px-[20px]">
            Configure pharmacy-wide defaults for shipping behaviour
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="defaultShippingProfile"
                  render={({ field }) => (
                    <SelectElement
                      {...field}
                      label="Default Shipping Class"
                      description="This will be used if no shipping class is specified at the product variant level"
                      options={shippingOptions}
                      className="w-full min-h-[52px]"
                      placeholder="Choose Shipping Class"
                      isRequired
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="shippingStrategy"
                  render={({ field }) => (
                    <SelectElement
                      {...field}
                      label="Multiple Shipping Class Behaviour"
                      description="When a transmission has products with different shipping classes, how should shipping be calculated?"
                      options={shippingOps}
                      className="w-full min-h-[52px]"
                      placeholder="Shipping Options"
                      isRequired
                    />
                  )}
                />
                {shippingStrategy === SHIPMENT_OPTIONS.MULTIPLE_SHIPMENTS ? (
                  <div className="p-[14px] rounded-[10px] gap-4 bg-[#F1EDF5] flex flex-col">
                    <h3 className="font-bold text-[14px] leading-[20px] text-primary">
                      Multiple Shipments
                    </h3>
                    <p className="text-primary text-[12px] leading-[16px] font-normal">
                      Each unique shipping class will create a separate shipment
                      with its own tracking number and shipping charge. Customer
                      will receive multiple packages.
                    </p>
                  </div>
                ) : shippingStrategy === SHIPMENT_OPTIONS.MOST_EXPENSIVE ? (
                  <div className="p-[14px] rounded-[10px] gap-4 bg-[#E6FAF5] flex flex-col">
                    <h3 className="font-bold text-[14px] leading-[20px] text-[#1AA061]">
                      Use the most expensive shipping class
                    </h3>
                    <p className="text-[12px] leading-[16px] font-normal text-[#1AA061]">
                      You have selected the most expensive shipping strategy.
                      Shipping will always use the most costly shipping class.
                    </p>
                  </div>
                ) : (
                  <div className="p-[14px] rounded-[10px] gap-4 bg-[#FFF6E5] flex flex-col">
                    <h3 className="font-bold text-[14px] leading-[20px] text-[#D56E01]">
                      Use with caution
                    </h3>
                    <p className="text-[12px] leading-[16px] font-normal text-[#D56E01]">
                      All items will ship using the lowest-cost service. This
                      may not be suitable for medications requiring special
                      handling (refrigeration, etc.).
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="min-w-[150px] min-h-[52px] cursor-pointer rounded-[50px] border border-black px-[30px] py-[10px]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={shippingLoading}
                  className="min-w-[150px] cursor-pointer min-h-[52px] rounded-[50px] border border-primary px-[30px] py-[10px] bg-primary text-white"
                >
                  Save Settings
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
