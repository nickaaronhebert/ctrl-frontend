import { useFieldArray, useFormContext } from "react-hook-form";
import { useDebounce } from "@/hooks/use-debounce";
import { useState, useCallback } from "react";
import SelectElement from "@/components/Form/select-element";
import InputElement from "@/components/Form/input-element";
import TextAreaElement from "@/components/Form/textarea-elements";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetAllProductVariantsQuery } from "@/redux/services/medication";

interface MedicationFieldsProps {
  state?: string;
}

export function MedicationFields({ state = "" }: MedicationFieldsProps) {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "medications",
    control: form.control,
  });

  const [searchParams, setSearchParams] = useState("");
  const debounceSearchParams = useDebounce(searchParams, 400);

  const { data: medicationOptions } = useGetAllProductVariantsQuery(
    {
      page: 1,
      perPage: 100,
      q: debounceSearchParams,
      state: state,
    },
    {
      selectFromResult: ({ data }) => ({
        data:
          data?.data?.map((item) => ({
            value: `${item.id}`,
            label:
              item?.name ||
              `${item.medicationCatalogue.drugName} ${item.strength}`,
            unit: item.quantityType,
          })) ?? [],
      }),
    }
  );

  const handleMedicationChange = useCallback(
    (index: number) => (selectedValue: string) => {
      form.setValue(`medications.${index}.selectMedication`, selectedValue);
      const selectedMedication = medicationOptions.find(
        (option) => option.value === selectedValue
      );
      if (selectedMedication) {
        form.setValue(`medications.${index}.unit`, selectedMedication.unit);
        form.trigger(`medications.${index}.unit`);
      }
    },
    [form, medicationOptions]
  );

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="w-full">
        <div className="flex justify-between mb-3">
          <p className="text-lg font-semibold">Medications</p>
          <Button
            variant={"link"}
            className="cursor-pointer !hover:no-underline"
            onClick={() =>
              append({
                selectMedication: "",
                quantity: 1,
                sigInstructions: "",
                unit: "",
                daysSupply: 0,
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
                index > 0 ? "mt-10 border-t pt-4 border-card-border" : ""
              )}
            >
              <div className="flex gap-4">
                <SelectElement
                  name={`medications.${index}.selectMedication`}
                  options={medicationOptions}
                  label="Select Medication"
                  isRequired={true}
                  placeholder="Select a medication"
                  className="w-[270px] min-h-[56px]"
                  onChange={handleMedicationChange(index)}
                  onSearch={setSearchParams}
                  searchValue={searchParams}
                />

                <InputElement
                  name={`medications.${index}.quantity`}
                  type="number"
                  label="Quantity"
                  isRequired={true}
                  inputClassName="max-w-[120px]"
                  placeholder="30"
                />

                <InputElement
                  name={`medications.${index}.unit`}
                  label="Unit"
                  isRequired={true}
                  placeholder="Tablet"
                  inputClassName="max-w-[100px]"
                  disabled={true}
                />
              </div>

              <div className="flex gap-4 mt-2">
                <InputElement
                  name={`medications.${index}.daysSupply`}
                  type="number"
                  label="Days Supply"
                  isRequired={true}
                  inputClassName="w-[150px]"
                  placeholder="30"
                />

                <InputElement
                  name={`medications.${index}.clinicalDifference`}
                  type="text"
                  label="Clinical Difference"
                  isRequired={false}
                  inputClassName="w-[350px]"
                  placeholder=""
                />
              </div>

              <div className="mt-2">
                <TextAreaElement
                  messageClassName="text-right"
                  inputClassName="w-full"
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
  );
}
