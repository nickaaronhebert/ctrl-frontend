import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { SupplyItem } from "@/schemas/supplySchema";
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
import InputElement from "@/components/Form/input-element";
import {
  supplyItemSchema,
  type SupplyFormValues,
} from "@/schemas/supplySchema";
import SelectElement from "@/components/Form/select-element";
import { QuantityType } from "@/schemas/supplySchema";
import { SupplyConfigMode } from "@/schemas/supplySchema";
import { useCreateSupplyMutation } from "@/redux/services/supplies";
import { useEditSupplyMutation } from "@/redux/services/supplies";
import { useEffect } from "react";

interface SupplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplyItemToEdit?: SupplyFormValues;
  isEditing?: boolean;
}

export default function AddSupply({
  open,
  onOpenChange,
  supplyItemToEdit,
  isEditing,
}: SupplyDialogProps) {
  const form = useForm<SupplyFormValues>({
    resolver: zodResolver(supplyItemSchema),
    defaultValues: {
      name: supplyItemToEdit?.name || "",
      itemType: supplyItemToEdit?.itemType || "CAPSULE",
      quantity: supplyItemToEdit?.quantity || 0,
      quantityType: supplyItemToEdit?.quantityType || "mg",
      price: supplyItemToEdit?.price || 0,
      defaultUnitCount: supplyItemToEdit?.defaultUnitCount || 1,
      sku: supplyItemToEdit?.sku || "",
      configMode: supplyItemToEdit?.configMode || "FIXED",
    },
  });

  console.log("form values", form.getValues());

  useEffect(() => {
    if (supplyItemToEdit) {
      form.reset({
        name: supplyItemToEdit.name || "",
        itemType: supplyItemToEdit.itemType || "CAPSULE",
        quantity: supplyItemToEdit.quantity || 0,
        quantityType: supplyItemToEdit.quantityType || "mg",
        price: supplyItemToEdit.price || 0,
        defaultUnitCount: supplyItemToEdit.defaultUnitCount || 1,
        sku: supplyItemToEdit.sku || "",
        configMode: supplyItemToEdit.configMode || "FIXED",
      });
    }
  }, [supplyItemToEdit, form]);

  const outputOptions = Object.values(SupplyItem).map((value) => ({
    label: value.toUpperCase(),
    value: value,
  }));

  const quantityOptions = Object.values(QuantityType).map((value) => ({
    label: value,
    value: value,
  }));

  const supplyConfigOptions = Object.values(SupplyConfigMode).map((value) => ({
    label: value.toUpperCase(),
    value: value,
  }));

  console.log("SupplyItemToEdit:>>", supplyItemToEdit);

  const [createSupply, { isLoading }] = useCreateSupplyMutation();
  const [editSupply, { isLoading: editLoading }] = useEditSupplyMutation();

  const onSubmit = async (data: SupplyFormValues) => {
    try {
      if (isEditing && supplyItemToEdit?.id) {
        await editSupply({
          supplyId: supplyItemToEdit.id,
          name: data?.name,
          itemType: data?.itemType,
          quantity: data?.quantity,
          quantityType: data?.quantityType,
          price: data?.price,
          sku: data?.sku,
          configMode: data?.configMode,
        }).unwrap();
        toast.success("Supply updated successfully", {
          duration: 1500,
        });
      } else {
        await createSupply({
          name: data?.name,
          itemType: data?.itemType,
          quantity: data?.quantity,
          quantityType: data?.quantityType,
          price: data?.price,
          sku: data?.sku,
          configMode: data?.configMode,
        })
          .unwrap()
          .then(() => {
            toast.success("Supply created successfully", {
              duration: 1500,
            });
          });
      }

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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-col gap-2 ">
          <DialogTitle className="text-xl font-semibold p-3 text-gray-900 border border-b-gray-300 border-t-0 border-l-0 border-r-0">
            {isEditing ? "Edit Supply" : "Add New Supply"}
          </DialogTitle>
          <DialogDescription className="p-3">
            Add a new item to your pharmacy supplies catalogue
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-6 p-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex gap-2 items-center ">
              <InputElement
                name="name"
                label="Supply Name"
                messageClassName="text-right"
                placeholder="Enter supply name"
                isRequired={true}
                inputClassName="border border-slate-300 placeholder:text-slate-400 w-[280px]"
              />
              <InputElement
                name="sku"
                label="SKU"
                messageClassName="text-right"
                placeholder="Enter SKU"
                isRequired={true}
                inputClassName="border border-slate-300 placeholder:text-slate-400 w-[280px]"
              />
            </div>
            <div className="flex gap-2 items-center">
              <InputElement
                name="price"
                type="number"
                label="Price ($)"
                messageClassName="text-right"
                placeholder="Enter catalogue name"
                isRequired={true}
                inputClassName="border border-slate-300 placeholder:text-slate-400 w-[280px]"
              />
              <InputElement
                name="quantity"
                type="number"
                label="Quantity"
                messageClassName="text-right"
                placeholder="Enter quantity"
                isRequired={true}
                inputClassName="border border-slate-300 placeholder:text-slate-400 w-[280px]"
              />
            </div>

            <div className="flex gap-2 items-center ">
              <SelectElement
                name={"quantityType"}
                options={quantityOptions ?? []}
                label="Quantity Type"
                isRequired={true}
                // defaultValue={quantityOptions[0]?.value}
                placeholder="Select quantity type"
                className="w-[280px] min-h-[56px] "
                triggerClassName="border border-slate-300 placeholder:text-slate-400"
                errorClassName="text-right"
              />
              <SelectElement
                name={"configMode"}
                options={supplyConfigOptions ?? []}
                label="Supply Config"
                isRequired={true}
                placeholder="Choose supply config option"
                className="w-[280px] min-h-[56px]"
                triggerClassName="border border-slate-300 "
                errorClassName="text-right"
              />
            </div>

            <div className="flex gap-2 items-center w-full">
              <SelectElement
                name={"itemType"}
                options={outputOptions ?? []}
                label="Select Output Value"
                isRequired={true}
                placeholder="Select an output value"
                className="w-full min-h-[56px] "
                triggerClassName="border border-slate-300 "
                errorClassName="text-right"
              />
            </div>

            <DialogFooter className="gap-2 pt-4">
              <div className="flex gap-3 items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="px-4 py-2 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() => console.log("Supply added")}
                  disabled={isLoading || editLoading}
                  className="px-4 py-2 bg-primary hover:bg-[#4243a0] text-white cursor-pointer"
                >
                  {isEditing ? "Edit Supply" : "Add Supply"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
