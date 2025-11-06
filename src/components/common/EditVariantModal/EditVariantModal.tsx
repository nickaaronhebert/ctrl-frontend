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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-4">
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
            <InputElement
              name="pharmacyDescriptor"
              className="w-full"
              label="Pharmacy Descriptor"
              isRequired={true}
              messageClassName="text-right"
              placeholder="Enter pharmacy descriptor"
              inputClassName="border border-[#9EA5AB]"
            />
            <InputElement
              name="primaryPharmacyIdentifier"
              className="w-full"
              label="Primary Pharmacy Identifier"
              isRequired={true}
              messageClassName="text-right"
              placeholder="Enter primary identifier"
              inputClassName="border border-[#9EA5AB]"
            />
            <InputElement
              name="secondaryPharmacyIdentifier"
              className="w-full"
              label="Secondary Pharmacy Identifier"
              isRequired={true}
              messageClassName="text-right"
              placeholder="Enter secondary identifier (optional)"
              inputClassName="border border-[#9EA5AB]"
            />
            <InputElement
              name="drugStrength"
              className="w-full"
              label="Drug Strength"
              isRequired={true}
              messageClassName="text-right"
              placeholder="Enter drug strength (e.g., 100 mg, 5 ml)"
              inputClassName="border border-[#9EA5AB]"
            />
            <InputElement
              name="drugForm"
              className="w-full"
              label="Drug Form"
              isRequired={true}
              messageClassName="text-right"
              placeholder="e.g. Capsule, Injection"
              inputClassName="border border-[#9EA5AB]"
            />
            <InputElement
              name="scheduleCode"
              className="w-full"
              label="Schedule Code"
              isRequired={true}
              messageClassName="text-right"
              placeholder="Enter schedule code (optional)"
              inputClassName="border border-[#9EA5AB]"
            />
            <InputElement
              name="shippingClass"
              className="w-full"
              label="Shipping Class"
              isRequired={true}
              messageClassName="text-right"
              placeholder="Enter shipping class (optional)"
              inputClassName="border border-[#9EA5AB]"
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
