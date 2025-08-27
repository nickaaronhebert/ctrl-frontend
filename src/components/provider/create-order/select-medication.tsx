import InputElement from "@/components/Form/input-element";
import SelectElement from "@/components/Form/select-element";
import TextAreaElement from "@/components/Form/textarea-elements";
import { Button } from "@/components/ui/button";
import { useOrderMultiStepForm } from "@/hooks/use-order-multistepform";

import { cn } from "@/lib/utils";
import type { medicationsSchema } from "@/schemas/medicationSchema";
import { useFieldArray, useFormContext } from "react-hook-form";
import type z from "zod";

type MedicationFormValues = z.infer<typeof medicationsSchema>;

const medicationOptions = [
  {
    value: "aspirin",
    label: "Aspirin",
    unit: "vial",
    amount: "100",
  },
  {
    value: "citrazin",
    label: "Citrazin",
    unit: "mg",
    amount: "600",
  },
  {
    value: "amoxicilin",
    label: "Amoxicilin",
    unit: "mg",
    amount: "140",
  },
];
export default function SelectMedication() {
  const { handleNext, handleBack } = useOrderMultiStepForm();
  const { control, setValue, trigger } = useFormContext<MedicationFormValues>();

  const { fields, append, remove } = useFieldArray({
    name: "medications",
    control: control,
  });

  const handleMedicationChange = (index: number) => (selectedValue: string) => {
    // Update the form field first
    setValue(`medications.${index}.selectMedication`, selectedValue);

    // Then update the unit field
    const selectedMedication = medicationOptions.find(
      (option) => option.value === selectedValue
    );

    if (selectedMedication) {
      setValue(`medications.${index}.unit`, selectedMedication.unit);
      trigger(`medications.${index}.unit`);
    }
  };

  return (
    <div>
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
      <div className="flex justify-between mt-10 border-t border-card-border pt-10">
        <Button
          variant={"outline"}
          onClick={handleBack}
          className="rounded-full min-h-[48px] min-w-[130px] text-[14px] font-semibold "
        >
          Back
        </Button>

        <Button
          onClick={handleNext}
          className="rounded-full min-h-[48px] min-w-[130px] text-[14px] font-semibold text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
