import { CenteredRow } from "@/components/ui/centered-row";

import { useMultiStepForm } from "@/hooks/usemultistepForm";
import { Button } from "@/components/ui/button";
import InputElement from "@/components/Form/input-element";
import SelectElement from "@/components/Form/select-element";
import MultiSelectElement from "@/components/Form/multi-select-element";
// import { useFormContext } from "react-hook-form";

const frameworksList = [
  { value: "california", label: "California" },
  { value: "texas", label: "Texas" },
  { value: "new_york", label: "New York" },
  { value: "florida", label: "Florida" },
  { value: "illinois", label: "Illinois" },
  { value: "pennsylvania", label: "Pennsylvania" },
];

const medicalSpecialtyOptions = [
  { value: "generalPractice", label: "General Practice" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "internalMedicine", label: "Internal Medicine" },
  { value: "surgery", label: "Surgery" },
  { value: "psychiatry", label: "Psychiatry" },
  { value: "dermatology", label: "Dermatology" },
  { value: "orthopedics", label: "Orthopedics" },
];
export default function VerificationStepOne() {
  const { handleNext } = useMultiStepForm();
  // const form = useFormContext();
  return (
    <div>
      <div className="mb-10 flex flex-col items-center gap-1">
        <h2 className="font-semibold text-3xl text-center">
          Medical Credentials Verification
        </h2>
        <h4 className="text-muted-foreground text-center font-normal text-xl max-w-2xl">
          Please provide your medical credentials to verify your prescription
          authority.All information is encrypted and secure.
        </h4>
      </div>

      <div className="flex flex-col gap-4">
        <CenteredRow>
          <InputElement
            name="nationalProviderIdentifier"
            className="w-80"
            isRequired={true}
            label=" National Provider Identifier(NPI)"
            messageClassName="text-right"
          />
          <InputElement
            name="deaRegistrationNumber"
            className="w-80"
            label="DEA Registration Number"
            messageClassName="text-right"
          />
        </CenteredRow>

        <CenteredRow>
          <InputElement
            name="licenseNumber"
            className="w-80"
            label="License Number"
            messageClassName="text-right"
          />

          <SelectElement
            name="medicalSpecialty"
            options={medicalSpecialtyOptions}
            label="Medical Specialty"
            placeholder="Select your specialty"
            triggerClassName="w-full min-h-[50px]"
            className="w-80"
          />
        </CenteredRow>

        <div className="flex justify-center">
          <MultiSelectElement
            name="licenseStates"
            options={frameworksList}
            className="w-2xl"
            placeholder="Select License States"
            label="License States"
          />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Button
          onClick={handleNext}
          // disabled={!form.formState.errors.nationalProviderIdentifier}
          className="text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
        >
          Verify and Complete Registration
        </Button>
      </div>
    </div>
  );
}
