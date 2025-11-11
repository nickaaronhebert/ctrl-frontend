import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormField } from "@/components/ui/form";
import InputElement from "@/components/Form/input-element";
import { Button } from "@/components/ui/button";
import { useCreateEncounterProductMutation } from "@/redux/services/encounter";

import {
  EncounterProductSchema,
  type EncounterProduct,
} from "@/schemas/encounterProductSchema";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { EncounterProductOutput } from "@/schemas/encounterProductSchema";
import SelectElement from "@/components/Form/select-element";
import TagsInputElement from "@/components/Form/TagsInputElement";

export default function EncounteredForm() {
  const form = useForm<EncounterProduct>({
    resolver: zodResolver(EncounterProductSchema),
    defaultValues: {
      name: "",
      description: "",
      output: "ctrl_order_approval",
      telegraProductVariant: [],
      isActive: true,
    },
  });

  const [createEncounterProduct] = useCreateEncounterProductMutation();

  const onSubmit = (data: EncounterProduct) => {
    console.log("Form Data submitted ", data);

    createEncounterProduct(data)
      .unwrap()
      .then((response) => {
        console.log("Product created successfully:", response);
        form.reset();
        toast.success("Product created successfully!", { duration: 1500 });
      })
      .catch((error) => {
        console.error("Error creating product:", error);
        const message =
          error?.data?.message ||
          "Failed to create pharmacy catalogue. Please try again.";
        toast.error(message, { duration: 1500 });
      });
  };

  const outputOptions = Object.values(EncounterProductOutput).map((value) => ({
    label: value.replaceAll("_", " ").toUpperCase(),
    value: value,
  }));

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2 mt-6 items-center bg-white justify-center py-5 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <SelectElement
            name={"output"}
            options={outputOptions ?? []}
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
            width={"500"}
          />
        </div>

        <FormField
          name="isActive"
          control={form.control}
          render={({ field }) => (
            <div className="w-[1000px] space-y-2">
              <div className="flex items-center justify-between p-4 border border-slate-300 rounded-md bg-white">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive" className="text-base font-medium">
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

        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="px-4 py-4 bg-[#5354ac] hover:bg-[#4243a0] text-white cursor-pointer"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
