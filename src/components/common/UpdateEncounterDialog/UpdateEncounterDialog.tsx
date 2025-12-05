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
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputElement from "@/components/Form/input-element";
import {
  updateEncounterProductSchema,
  type UpdateEncounterProduct,
} from "@/schemas/updateEncounterProductSchema";
import type { EncounterProduct } from "@/components/data-table/columns/encounter";
import TagsInputElement from "@/components/Form/TagsInputElement";
import SelectElement from "@/components/Form/select-element";
import { EncounterProductOutput } from "@/schemas/encounterProductSchema";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUpdateEncounteredProductMutation } from "@/redux/services/encounter";

interface UpdateEncounterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProduct: EncounterProduct;
}

export default function UpdateEncounterDialog({
  open,
  onOpenChange,
  selectedProduct,
}: UpdateEncounterModalProps) {
  const form = useForm<UpdateEncounterProduct>({
    resolver: zodResolver(updateEncounterProductSchema),
    defaultValues: {
      name: selectedProduct?.name || "",
      description: selectedProduct?.description || "",
      output: selectedProduct?.output || "",
      telegraProductVariant: selectedProduct?.telegraProductVariant || "",
      isActive: selectedProduct?.isActive,
    },
  });

  const [updateEncounteredProduct] = useUpdateEncounteredProductMutation();

  const onSubmit = async (data: UpdateEncounterProduct) => {
    try {
      await updateEncounteredProduct({
        productId: selectedProduct?.id,
        ...data,
      }).unwrap();
      toast.success("Product Updated successfully", { duration: 1500 });
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

  const outputOptions = Object.values(EncounterProductOutput).map((value) => ({
    label: value.replaceAll("_", " ").toUpperCase(),
    value: value,
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-5 min-w-[1100px]">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <InputElement
                name="name"
                label="Name"
                messageClassName="text-right"
                placeholder="Enter name"
                className="w-[500px]"
                inputClassName="border border-slate-300 placeholder:text-slate-400"
              />
              <InputElement
                name="description"
                label="Description"
                messageClassName="text-right"
                placeholder="Enter description"
                className="w-[500px]"
                inputClassName="border border-slate-300 placeholder:text-slate-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <SelectElement
                name={"output"}
                options={outputOptions ?? []}
                defaultValue={selectedProduct?.output}
                label="Select Output Value"
                isRequired={true}
                placeholder="Select an output value"
                className="w-[500px] min-h-[56px] "
                triggerClassName="border border-slate-300"
                errorClassName="text-right"
              />
              <TagsInputElement
                name="telegraProductVariant"
                label="Telegra Product Variants"
                placeholder="Type variant and press Enter"
                isRequired={false}
                type="text"
                width={"500px"}
              />
            </div>
            <FormField
              name="isActive"
              control={form.control}
              render={({ field }) => (
                <div className="w-[1030px] space-y-2">
                  <div className="flex items-center justify-between p-4 border border-slate-300 rounded-md bg-white">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="isActive"
                        className="text-base font-medium"
                      >
                        Status
                      </Label>
                    </div>
                    <Switch
                      id="isActive"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </div>
              )}
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
                className="px-4 py-2 bg-[#5354ac] hover:bg-[#4243a0] text-white cursor-pointer"
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
