import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { medicationsSchema } from "@/schemas/medicationSchema";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SelectElement from "@/components/Form/select-element";
import InputElement from "@/components/Form/input-element";
import TextAreaElement from "@/components/Form/textarea-elements";
import { useAppDispatch } from "@/redux/store";
import {
  updateStepOne,
  prevStep,
  type SELECT_MEDICATION,
} from "@/redux/slices/create-order";
import { useGetAllProductVariantsQuery } from "@/redux/services/medication";
import { useCallback, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export default function SelectProductVariant({
  productVariant,
}: {
  productVariant: SELECT_MEDICATION;
}) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useState("");
  const debounceSearchParams = useDebounce(searchParams, 400);
  const { data: medicationOptions } = useGetAllProductVariantsQuery(
    {
      page: 1,
      perPage: 100,
      q: debounceSearchParams,
    },
    {
      selectFromResult: ({ data }) => ({
        data:
          data?.data?.map((item) => ({
            value: `${item.id}/${item.medicationCatalogue.drugName} ${item.strength} `,
            label: `${item.medicationCatalogue.drugName} ${item.strength}`,
            unit: item.quantityType,
          })) ?? [],
      }),
    }
  );

  const form = useForm<z.infer<typeof medicationsSchema>>({
    resolver: zodResolver(medicationsSchema),
    defaultValues: {
      medications: productVariant.medications,
    },
  });

  async function onSubmit(values: z.infer<typeof medicationsSchema>) {
    dispatch(updateStepOne(values));
  }

  const { fields, append, remove } = useFieldArray({
    name: "medications",
    control: form.control,
  });

  const handleMedicationChange = (index: number) => (selectedValue: string) => {
    // Update the form field first
    form.setValue(`medications.${index}.selectMedication`, selectedValue);

    // Then update the unit field
    const selectedMedication = medicationOptions.find(
      (option) => option.value === selectedValue
    );

    if (selectedMedication) {
      form.setValue(`medications.${index}.unit`, selectedMedication.unit);
      form.trigger(`medications.${index}.unit`);
    }
  };

  const handleSearchParams = useCallback((value: string) => {
    setSearchParams(value);
  }, []);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex flex-col items-center">
            <div className=" min-w-[550px] max-w-[550px]">
              <div className=" flex justify-between mb-3">
                <p className="text-[20px] font-semibold">Select Medication</p>
                <Button
                  variant={"link"}
                  className="cursor-pointer !hover:no-underline"
                  onClick={() =>
                    append({
                      selectMedication: "",
                      quantity: 1,
                      sigInstructions: "",
                      unit: "",
                    })
                  }
                >
                  <span className="underline">Add Medication</span>
                </Button>
              </div>
              {fields.map((field, index) => {
                return (
                  <div
                    key={field.id}
                    className={cn(
                      index > 0 ? "mt-2.5 border-t pt-4 border-card-border" : ""
                    )}
                  >
                    <div className=" flex gap-4">
                      <SelectElement
                        name={`medications.${index}.selectMedication`}
                        options={medicationOptions}
                        label="Select Medication"
                        isRequired={true}
                        placeholder="Select a medication"
                        className="w-[270px] min-h-[56px]"
                        onChange={handleMedicationChange(index)}
                        onSearch={handleSearchParams}
                        searchValue={searchParams}
                      />

                      <InputElement
                        name={`medications.${index}.quantity`}
                        type="number"
                        label="Quantity"
                        isRequired={true}
                        inputClassName="max-w-[100px]"
                        placeholder="30"
                      />

                      <InputElement
                        name={`medications.${index}.unit`}
                        label="Unit"
                        isRequired={true}
                        placeholder="Tablet"
                        inputClassName="max-w-[125px]"
                        disabled={true}
                      />
                    </div>
                    <div className="mt-2">
                      <TextAreaElement
                        placeholder="Eg. Take 1 tablet by mouth twice daily with meals"
                        name={`medications.${index}.sigInstructions`}
                        isRequired={true}
                        label="Sig (Instructions)"
                      />
                      {index > 0 && (
                        <div className="flex justify-end">
                          <span
                            className="text-xs font-normal text-[#E31010] underline underline-offset-2 cursor-pointer"
                            onClick={() => remove(index)}
                          >
                            Delete
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between mt-10 border-t border-card-border border-dashed pt-10">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => dispatch(prevStep())}
              className="rounded-full min-h-[48px] min-w-[130px] text-[14px] font-semibold cursor-pointer "
            >
              Back
            </Button>

            <Button
              type="submit"
              className="rounded-full min-h-[48px] min-w-[130px] text-[14px] font-semibold text-white cursor-pointer"
              disabled={!form.formState.isValid}
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
