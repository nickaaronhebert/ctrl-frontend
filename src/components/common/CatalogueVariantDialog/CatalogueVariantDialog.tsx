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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputElement from "@/components/Form/input-element";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";
import {
  catalogueVariantSchema,
  type CatalogueVariantFormValues,
} from "@/schemas/createCatalogueVariant";
import { useCreateVariantMutation } from "@/redux/services/pharmacy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

interface CatalogueVariantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CatalogueVariantDialog({
  open,
  onOpenChange,
}: CatalogueVariantDialogProps) {
  const { setPharmacyCatalogueId } = useMedication();
  const [submitAction, setSubmitAction] = useState<"create" | "createAndAdd">(
    "create"
  );
  const navigate = useNavigate();
  const form = useForm<CatalogueVariantFormValues>({
    resolver: zodResolver(catalogueVariantSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [createCatalogueVariant] = useCreateVariantMutation();

  const onSubmit = async (data: CatalogueVariantFormValues) => {
    try {
      console.log(data);
      createCatalogueVariant(data)
        .unwrap()
        .then((res) => {
          toast.success("Catalogue Variant created successfully", {
            duration: 1500,
          });

          onOpenChange(false);
          form.reset();

          if (submitAction === "createAndAdd") {
            setPharmacyCatalogueId(res.data.id);
            navigate(`/pharmacy/medications/all-catalogues`);
          }
        });
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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto ">
        <DialogHeader className="flex flex-col gap-2 ">
          <DialogTitle className="text-xl font-semibold p-3 text-gray-900 border border-b-gray-300 border-t-0 border-l-0 border-r-0">
            Create New Catalogue
          </DialogTitle>
          <DialogDescription className="p-3">
            Set up a new medication pricing catalogue
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-6 p-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-0">
              <InputElement
                name="name"
                label="Catalogue Name"
                messageClassName="text-right"
                placeholder="Enter catalogue name"
                isRequired={true}
                inputClassName="border border-slate-300 placeholder:text-slate-400"
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter catalogue description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-2 pt-4">
              <div className="flex gap-3 items-center ">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="px-4 py-2"
                >
                  Cancel
                </Button>
                {/* <Button
                  type="submit"
                  onClick={() => setSubmitAction("create")}
                  disabled={form.formState.isSubmitting}
                  className="px-4 py-2 bg-primary hover:bg-[#4243a0] text-white"
                >
                  Create Catalogue
                </Button> */}
                <Button
                  onClick={() => setSubmitAction("createAndAdd")}
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="px-4 py-2 bg-primary hover:bg-[#4243a0] text-white cursor-pointer"
                >
                  Create & Add Medications
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
