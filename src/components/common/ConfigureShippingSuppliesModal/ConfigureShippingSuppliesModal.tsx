import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TwoColumnLayout from "./layout/TwoColumnLayout";
import VariantsSidebar from "./VariantSidebar";
import { ShippingConfiguration } from "./ShippingConfiguration";
import { useEffect, useMemo } from "react";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  configureShippingSchema,
  type ConfigureShippingFormValues,
} from "@/schemas/configureShippingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useViewShippingQuery } from "@/redux/services/shipping";
import type { ApiError } from "@/types/global/commonTypes";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useViewAllSuppliesQuery } from "@/redux/services/supplies";

interface CatalogueVariantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ConfigureShippingSuppliesModal({
  open,
  onOpenChange,
}: CatalogueVariantDialogProps) {
  const {
    configuredVariants,
    setVariantShippingSupplies,
    configuredVariantIds,
    setConfiguredVariantIds,
    variantShippingSupplies,
  } = useMedication();

  console.log("Configured Variant Ids: ", configuredVariantIds);

  const configuredVariant = useMemo(
    () =>
      configuredVariants?.filter((v) =>
        configuredVariantIds.includes(v.variantId)
      ),
    [configuredVariants, configuredVariantIds]
  );

  const form = useForm<ConfigureShippingFormValues>({
    resolver: zodResolver(configureShippingSchema),
    defaultValues: {
      shippingProfile: "",
      supplies: [],
    },
  });

  const { data, isLoading } = useViewShippingQuery({
    page: 1,
    perPage: 100,
    q: "",
  });

  const { data: suppliesData, isLoading: isSuppliesLoading } =
    useViewAllSuppliesQuery({
      page: 1,
      perPage: 100,
      q: "",
    });

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

  const suppliesOptions = useMemo(
    () =>
      suppliesData?.data?.map(({ id, name }) => ({
        label: name,
        value: id,
      })) ?? [],
    [suppliesData]
  );

  async function onSubmit(values: ConfigureShippingFormValues) {
    try {
      console.log("values", values);
      setVariantShippingSupplies((prev) => {
        const updated = { ...prev };
        configuredVariantIds.forEach((variantId) => {
          updated[variantId] = {
            shippingProfile: values.shippingProfile as string,
            supplies: values.supplies || [],
          };
        });

        return updated;
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

  useEffect(() => {
    if (!open) return;
    if (configuredVariantIds?.length === 0) return;
    const firstVariantId = configuredVariantIds[0];
    const config = variantShippingSupplies[firstVariantId];
    if (!config) {
      form.reset({
        shippingProfile: "",
        supplies: [],
      });
      return;
    }
    form.reset({
      shippingProfile: config.shippingProfile,
      supplies: config.supplies || [],
    });
  }, [open, form, configuredVariantIds, variantShippingSupplies]);

  if (isLoading || isSuppliesLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-y-auto gap-0 overflow-x-hidden">
        <DialogHeader className="flex flex-col gap-2 ">
          <DialogTitle className="text-xl font-semibold p-3 text-gray-900 border border-b-gray-300 border-t-0 border-l-0 border-r-0">
            Configure Shipping and Supplies
          </DialogTitle>
        </DialogHeader>
        <div className="h-[calc(90vh-64px)]">
          <TwoColumnLayout
            sidebar={
              <VariantsSidebar
                configuredVariantsIds={configuredVariantIds}
                onSelectionChange={setConfiguredVariantIds}
              />
            }
            content={
              <ShippingConfiguration
                configuredVariant={configuredVariant}
                form={form}
                shippingOptions={shippingOptions}
                suppliesOptions={suppliesOptions}
                onCancel={onCancel}
                onSubmit={onSubmit}
              />
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
