import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import SelectElement from "@/components/Form/select-element";
import { PlusIcon, Trash2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { ConfigureShippingFormValues } from "@/schemas/configureShippingSchema";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface ShippingConfigurationProps {
  configuredVariant: any[];
  form: UseFormReturn<ConfigureShippingFormValues>;
  shippingOptions: { label: string; value: string }[];
  suppliesOptions: { label: string; value: string }[];
  onCancel: () => void;
  onSubmit: (values: ConfigureShippingFormValues) => void;
}

export function ShippingConfiguration({
  configuredVariant,
  form,
  shippingOptions,
  suppliesOptions,
  onCancel,
  onSubmit,
}: ShippingConfigurationProps) {
  const isSingleVariant = configuredVariant?.length === 1;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "supplies",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full"
      >
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="flex gap-2 items-center px-[30px] py-[16px] bg-[#F7F1FD] border border-[#F7F1FD]">
            <div className="w-[50px] h-[50px] flex justify-center items-center bg-lilac rounded-[8px]">
              <MedicationLibrary />
            </div>
            <div className="text-sm font-medium text-primary">
              {isSingleVariant
                ? configuredVariant[0].variant.name
                : `${configuredVariant?.length} variants selected`}
              <p className="font-normal text-[12px] leading-[16px] text-gray-400">
                Configure shipping and supplies for this variant
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="py-1">
              <div className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="shippingProfile"
                  render={({ field }) => (
                    <SelectElement
                      {...field}
                      label="Shipping Class "
                      options={shippingOptions}
                      className="w-full min-h-[52px]"
                      labelClassName="text-lg font-semibold"
                      placeholder="Choose Shipping Class"
                      isRequired
                    />
                  )}
                />
                <h3 className="text-lg font-semibold">Supplies</h3>
                <div className="border border-card-border bg-[#F6F8F9] rounded-[12px] p-[12px]">
                  {fields.map((field, index) => (
                    <div key={field.id} className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          remove(index);
                        }}
                        className="absolute top-[-7px] z-50 right-4 flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                      <div className="w-full flex gap-2 items-center mt-4">
                        <FormField
                          control={form.control}
                          name={`supplies.${index}.supply`}
                          render={({ field }) => (
                            <SelectElement
                              {...field}
                              label="Supply Item"
                              options={suppliesOptions}
                              className="w-[400px] min-h-[52px]"
                              placeholder="Select Supply"
                              isRequired
                            />
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`supplies.${index}.supplyRequired`}
                          render={({ field }) => (
                            <SelectElement
                              {...field}
                              label="Requirement"
                              options={[
                                { label: "Required", value: "REQUIRED" },
                                { label: "Optional", value: "OPTIONAL" },
                              ]}
                              placeholder="Select requirement"
                              className="w-[400px] min-h-[52px]"
                              isRequired
                            />
                          )}
                        />
                      </div>
                      <div className="w-full flex gap-2 items-center">
                        <FormField
                          control={form.control}
                          name={`supplies.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem className="w-[400px] min-h-[52px]">
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(parseInt(e.target.value, 10))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="bg-[#F7F1FD] border flex justify-center items-center border-[#E8D9F5] px-[15px] py-[6px] text-[#47499A] font-medium text-[14px] leading-[18px] rounded-[8px] w-[400px] min-h-[52px] mb-2">
                          E.g. If product Variant Qty 5 × Supply Qty 1 = 5
                        </div>
                      </div>
                      <FormField
                        control={form.control}
                        name={`supplies.${index}.isOnePerOrder`}
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Only One Per Order</FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  {fields.length === 0 && (
                    <div className="bg-light-background border-card-border px-[20px] py-[40px] rounded-[12px] flex flex-col gap-4 justify-center items-center">
                      <p className="text-[14px] leading-[21px] text-[#63627F] font-normal">
                        No supplies configured. Click "Add Supply" to get
                        started.
                      </p>
                      <Button
                        type="button"
                        onClick={() =>
                          append({
                            supply: "",
                            supplyRequired: "REQUIRED",
                            quantity: 1,
                            isOnePerOrder: false,
                          })
                        }
                        className="rounded-[4px] px-[15px] py-[5px] flex gap-[2px] text-[#5456AD] bg-transparent items-center border border-dashed border-primary hover:bg-transparent"
                      >
                        <PlusIcon size={16} /> ADD SUPPLY
                      </Button>
                    </div>
                  )}
                  {fields.length > 0 && (
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={() =>
                          append({
                            supply: "",
                            supplyRequired: "REQUIRED",
                            quantity: 1,
                            isOnePerOrder: false,
                          })
                        }
                        className="flex gap-2 bg-transparent border border-dashed border-primary text-primary hover:bg-transparent"
                      >
                        <PlusIcon size={16} />
                        Add another supply
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 py-4 px-[10px] ">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="min-w-[150px] min-h-[52px] cursor-pointer rounded-[50px] border border-black px-[30px] py-[10px]"
          >
            Close
          </Button>
          <Button
            type="submit"
            // disabled={isLoading}
            className="min-w-[150px] cursor-pointer min-h-[52px] rounded-[50px] border border-primary px-[30px] py-[10px] bg-primary text-white"
          >
            Save Configurations
          </Button>
        </div>
      </form>
    </Form>
  );
}
