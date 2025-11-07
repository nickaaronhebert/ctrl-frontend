import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  pharmacyMetadataSchema,
  type PharmacyMetaDataFormValues,
} from "@/schemas/editPharmacyCatalogue";
import { useEditPharmacyCatalogueMutation } from "@/redux/services/pharmacy";
import type { PharmacyProductVariant } from "@/types/responses/medication";
import InputElement from "@/components/Form/input-element";

interface EditVariantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: PharmacyProductVariant;
}

export default function EditVariantModal({
  open,
  onOpenChange,
  variant,
}: EditVariantModalProps) {
  const form = useForm<PharmacyMetaDataFormValues>({
    resolver: zodResolver(pharmacyMetadataSchema),
    defaultValues: {
      pharmacyDescriptor: variant?.pharmacyDescriptor || "",
      primaryPharmacyIdentifier: variant?.primaryPharmacyIdentifier || "",
      secondaryPharmacyIdentifier: variant?.secondaryPharmacyIdentifier || "",
      drugStrength: variant?.drugStrength || "",
      drugForm: variant?.drugForm || "",
      scheduleCode: variant?.scheduleCode || "",
      shippingClass: variant?.shippingClass || "",
    },
  });
  const [updatePharmacyCatalogue] = useEditPharmacyCatalogueMutation();

  const onSubmit = async (data: PharmacyMetaDataFormValues) => {
    try {
      await updatePharmacyCatalogue({
        id: variant?._id,
        pharmacyDescriptor: data?.pharmacyDescriptor,
        primaryPharmacyIdentifier: data?.primaryPharmacyIdentifier,
        secondaryPharmacyIdentifier: data?.secondaryPharmacyIdentifier,
        drugStrength: data?.drugStrength,
        drugForm: data?.drugForm,
        scheduleCode: data?.scheduleCode,
        shippingClass: data?.shippingClass,
      }).unwrap();
      toast.success("Pharmacy catalogue updated successfully", {
        duration: 1500,
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error updating variant:", error);
      const err = error as { data?: { message?: string } };
      const message =
        err?.data?.message ||
        "Failed to update pharmacy catalogue. Please try again.";
      toast.error(message, {
        duration: 1500,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-5">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Pharmacy Product Metadata
          </DialogTitle>
          <DialogDescription className="sr-only">
            Edit the metadata information for the selected pharmacy product
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputElement
                name="pharmacyDescriptor"
                label="Pharmacy Descriptor"
                messageClassName="text-right"
                placeholder="Enter pharmacy descriptor"
                inputClassName="border border-slate-300 placeholder:text-slate-400"
              />
              <InputElement
                name="primaryPharmacyIdentifier"
                label="SKU(Primary Pharmacy Identifier)"
                messageClassName="text-right"
                placeholder="Enter primary identifier"
                inputClassName="border border-slate-300 placeholder:text-slate-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputElement
                name="secondaryPharmacyIdentifier"
                label="Secondary Pharmacy Identifier"
                messageClassName="text-right"
                placeholder="Enter secondary identifier"
                inputClassName="border border-slate-300 placeholder:text-slate-400 "
              />
              <InputElement
                name="drugStrength"
                label="Drug Strength"
                messageClassName="text-right"
                placeholder="Enter drug strength (e.g., 100 mg, 5 ml)"
                inputClassName="border border-slate-300 placeholder:text-slate-400 "
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputElement
                name="drugForm"
                label="Drug Form"
                messageClassName="text-right"
                placeholder="e.g. Capsule, Injection"
                inputClassName="border border-slate-300 placeholder:text-slate-400 "
              />
              <InputElement
                name="scheduleCode"
                label="Schedule Code"
                messageClassName="text-right"
                placeholder="Enter schedule code"
                inputClassName="border border-slate-300 placeholder:text-slate-400"
              />
            </div>
            <InputElement
              name="shippingClass"
              label="Shipping Class"
              messageClassName="text-right"
              placeholder="Enter shipping class"
              inputClassName="border border-slate-300 placeholder:text-slate-400 "
            />

            <DialogFooter className="gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="px-4 py-2 bg-[#5354ac] hover:bg-[#4243a0] text-white"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
