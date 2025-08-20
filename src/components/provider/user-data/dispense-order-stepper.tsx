import { zodResolver } from "@hookform/resolvers/zod";

import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { defineStepper } from "@stepperize/react";
import TextAreaElement from "@/components/Form/textarea-elements";
import { medicationsSchema } from "@/schemas/medicationSchema";
import SelectElement from "@/components/Form/select-element";
import InputElement from "@/components/Form/input-element";
import { cn } from "@/lib/utils";
import { providerPharmacySchema } from "@/schemas/pharmacySchema";

type MedicationFormValues = z.infer<typeof medicationsSchema>;
// type ProviderPharmacyFormValues = z.infer<typeof providerPharmacySchema>;
const { useStepper, steps, utils } = defineStepper(
  { id: "medication", label: "Medication", schema: medicationsSchema },
  {
    id: "providerPharmacy",
    label: "Select Provider & Pharmacy",
    schema: providerPharmacySchema,
  },
  { id: "complete", label: "Complete", schema: z.object({}) }
);

function DispenseOrder() {
  const stepper = useStepper();
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(stepper.current.schema),
    defaultValues: {
      medications: [
        { selectMedication: "", quantity: 1, sigInstructions: "", unit: "" },
      ],
      selectProvider: "",
      selectPharmacy: "",
    },
  });

  const onSubmit = (values: z.infer<typeof stepper.current.schema>) => {
    console.log(`Form values for step ${stepper.current.id}:`, values);
    if (stepper.isLast) {
      console.log("all values", form.getValues());
      stepper.reset();
      form.reset();
    } else {
      stepper.next();
    }
  };

  const currentIndex = utils.getIndex(stepper.current.id);
  console.log("currentIndex", currentIndex);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6    ">
        {/* <div className="flex justify-between">
          <h2 className="text-lg font-medium">Checkout</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Step {currentIndex + 1} of {steps.length}
            </span>
          </div>
        </div> */}
        {/* <nav aria-label="Checkout Steps" className="group my-4">
          <ol
            className="flex items-center justify-between gap-2"
            aria-orientation="horizontal"
          >
            {stepper.all.map((step, index, array) => (
              <React.Fragment key={step.id}>
                <li className="flex items-center gap-4 flex-shrink-0">
                  <Button
                    type="button"
                    role="tab"
                    variant={index <= currentIndex ? "default" : "secondary"}
                    aria-current={
                      stepper.current.id === step.id ? "step" : undefined
                    }
                    aria-posinset={index + 1}
                    aria-setsize={steps.length}
                    aria-selected={stepper.current.id === step.id}
                    className="flex size-10 items-center justify-center rounded-full"
                    onClick={async () => {
                      const valid = await form.trigger();
                      //must be validated
                      if (!valid) return;
                      //can't skip steps forwards but can go back anywhere if validated
                      if (index - currentIndex > 1) return;
                      stepper.goTo(step.id);
                    }}
                  >
                    {index + 1}
                  </Button>
                  <span className="text-sm font-medium">{step.label}</span>
                </li>
                {index < array.length - 1 && (
                  <Separator
                    className={`flex-1 ${
                      index < currentIndex ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </ol>
        </nav> */}
        {/* <div className="flex gap-10">
          {stepper.all.map((step, index, array) => {
            console.log("*****", step);
            return (
              <div className="flex gap-2">
                <span>{index + 1}.</span>
                <span>{step.label}</span>
              </div>
            );
          })}
        </div> */}
        <div className="space-y-4">
          {stepper.switch({
            medication: () => <SelectMedication />,
            providerPharmacy: () => <SelectProviderPharmacy />,
            complete: () => <CompleteComponent />,
          })}
          {/* {!stepper.isLast ? (
            <div className="flex justify-end gap-4">
              <Button
                variant="secondary"
                onClick={stepper.prev}
                disabled={stepper.isFirst}
              >
                Back
              </Button>
              <Button type="submit">
                {stepper.isLast ? "Complete" : "Next"}
              </Button>
            </div>
          ) : (
            <Button onClick={stepper.reset}>Reset</Button>
          )} */}
        </div>
      </form>
    </Form>
  );
}

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

const providerOptions = [
  {
    label: "Dr. Emily Johnson",
    value: "9867564534",
  },
  {
    label: "Dr Tony Stark",
    value: "657845495",
  },
  {
    label: "Dr. John Snow",
    value: "5432134567",
  },
  {
    label: "Dr. Rob Stark",
    value: "7865678987",
  },
];

const pharmacyOptions = [
  { label: "HealthFirst Pharmacy", value: "healthfirst_pharmacy" },
  { label: "WellCare Pharmacy", value: "wellcare_pharmacy" },
  { label: "MediTrust Pharmacy", value: "meditrust_pharmacy" },
  { label: "CarePlus Pharmacy", value: "careplus_pharmacy" },
  { label: "PharmaZone", value: "pharmazone" },
  { label: "GoodHealth Pharmacy", value: "goodhealth_pharmacy" },
  { label: "LifeLine Pharmacy", value: "lifeline_pharmacy" },
  { label: "QuickMeds", value: "quickmeds" },
  { label: "WellnessRx", value: "wellnessrx" },
  { label: "TrustMed Pharmacy", value: "trustmed_pharmacy" },
];

function SelectMedication() {
  const stepper = useStepper();
  console.log("1111111", stepper.current.id);
  const { control, getValues, setValue, trigger } =
    useFormContext<MedicationFormValues>();
  console.log("form values ", getValues());

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
                    className="w-[270px] min-h-[56px]"
                    onChange={handleMedicationChange(index)}
                  />

                  <InputElement
                    name={`medications.${index}.quantity`}
                    type="number"
                    label="Quantity"
                    isRequired={true}
                    inputClassName="max-w-[100px]"
                  />

                  <InputElement
                    name={`medications.${index}.unit`}
                    label="Unit"
                    isRequired={true}
                    inputClassName="max-w-[125px]"
                    disabled={true}
                  />
                </div>
                <div className="mt-2">
                  <TextAreaElement
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
      <div>
        {!stepper.isLast ? (
          <div className="flex justify-between gap-4">
            <div>
              <Button
                type="button"
                variant="secondary"
                onClick={stepper.prev}
                disabled={stepper.isFirst}
                className="rounded-full min-h-[48px] min-w-[130px] text-[14px] cursor-pointer"
              >
                Back
              </Button>
            </div>
            <Button
              type="submit"
              className="rounded-full min-h-[48px] min-w-[130px] text-[14px] font-semibold text-white"
            >
              {stepper.isLast ? "Complete" : "Next"}
            </Button>
          </div>
        ) : (
          <Button onClick={stepper.reset}>Reset</Button>
        )}
      </div>
    </div>
  );
}

function SelectProviderPharmacy() {
  const stepper = useStepper();
  console.log("222222222", stepper.current.id);
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className=" min-w-[550px] max-w-[550px]">
          <p className="text-[20px] font-semibold">
            Select Provider & Pharmacy
          </p>

          <div className="mt-3.5">
            <SelectElement
              name="selectProvider"
              options={providerOptions}
              label="Select Provider"
              isRequired={true}
              className="w-[500px] min-h-[56px]"
              placeholder="Select the option"
            />

            <SelectElement
              name="selectPharmacy"
              options={pharmacyOptions}
              label="Select Pharmacy"
              isRequired={true}
              className="w-[500px] min-h-[56px]"
              placeholder="Select the option"
            />
          </div>
        </div>
      </div>
      <div>
        {!stepper.isLast ? (
          <div className="flex justify-between gap-4">
            <div>
              <Button
                variant="secondary"
                type="button"
                onClick={() => stepper.goTo("medication")}
                className="rounded-full min-h-[48px] min-w-[130px] text-[14px]"
              >
                Back
              </Button>
            </div>
            <Button
              type="submit"
              className="rounded-full min-h-[48px] min-w-[130px] text-[14px] font-semibold text-white"
            >
              {stepper.isLast ? "Complete" : "Next"}
            </Button>
          </div>
        ) : (
          <Button onClick={stepper.reset}>Reset</Button>
        )}
      </div>
    </div>
  );
}

function CompleteComponent() {
  return <div className="text-center">Thank you! Your order is complete.</div>;
}

export default DispenseOrder;
