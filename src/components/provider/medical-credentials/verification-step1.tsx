import { CenteredRow } from "@/components/ui/centered-row";

import { useMultiStepForm } from "@/hooks/usemultistepForm";
import { Button } from "@/components/ui/button";
import InputElement from "@/components/Form/input-element";
import SelectElement from "@/components/Form/select-element";
import { useFieldArray, useFormContext } from "react-hook-form";
import ClearSVG from "@/assets/icons/Clear";
import { cn } from "@/lib/utils";
import InsertIconSVG from "@/assets/icons/Insert";
import { Link } from "react-router-dom";
import { STEPPER_FORM } from "@/constants/routes";

export const stateOptions = [
  { value: "alabama", label: "Alabama" },
  { value: "alaska", label: "Alaska" },
  { value: "arizona", label: "Arizona" },
  { value: "arkansas", label: "Arkansas" },
  { value: "california", label: "California" },
  { value: "colorado", label: "Colorado" },
  { value: "connecticut", label: "Connecticut" },
  { value: "delaware", label: "Delaware" },
  { value: "florida", label: "Florida" },
  { value: "georgia", label: "Georgia" },
  { value: "hawaii", label: "Hawaii" },
  { value: "idaho", label: "Idaho" },
  { value: "illinois", label: "Illinois" },
  { value: "indiana", label: "Indiana" },
  { value: "iowa", label: "Iowa" },
  { value: "kansas", label: "Kansas" },
  { value: "kentucky", label: "Kentucky" },
  { value: "louisiana", label: "Louisiana" },
  { value: "maine", label: "Maine" },
  { value: "maryland", label: "Maryland" },
  { value: "massachusetts", label: "Massachusetts" },
  { value: "michigan", label: "Michigan" },
  { value: "minnesota", label: "Minnesota" },
  { value: "mississippi", label: "Mississippi" },
  { value: "missouri", label: "Missouri" },
  { value: "montana", label: "Montana" },
  { value: "nebraska", label: "Nebraska" },
  { value: "nevada", label: "Nevada" },
  { value: "newHampshire", label: "New Hampshire" },
  { value: "newJersey", label: "New Jersey" },
  { value: "newMexico", label: "New Mexico" },
  { value: "newYork", label: "New York" },
  { value: "northCarolina", label: "North Carolina" },
  { value: "northDakota", label: "North Dakota" },
  { value: "ohio", label: "Ohio" },
  { value: "oklahoma", label: "Oklahoma" },
  { value: "oregon", label: "Oregon" },
  { value: "pennsylvania", label: "Pennsylvania" },
  { value: "rhodeIsland", label: "Rhode Island" },
  { value: "southCarolina", label: "South Carolina" },
  { value: "southDakota", label: "South Dakota" },
  { value: "tennessee", label: "Tennessee" },
  { value: "texas", label: "Texas" },
  { value: "utah", label: "Utah" },
  { value: "vermont", label: "Vermont" },
  { value: "virginia", label: "Virginia" },
  { value: "washington", label: "Washington" },
  { value: "westVirginia", label: "West Virginia" },
  { value: "wisconsin", label: "Wisconsin" },
  { value: "wyoming", label: "Wyoming" },
];

export default function VerificationStepOne() {
  const { handleNext, slug } = useMultiStepForm();
  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "medicalLicense",
    control: form.control,
  });

  const {
    fields: deaFields,
    append: deaAppend,
    remove: deaRemove,
  } = useFieldArray({
    name: "deaLicense",
    control: form.control,
  });

  return (
    <div>
      <div className="mb-10 flex flex-col items-center gap-1">
        {slug === STEPPER_FORM.ONBOARDING && (
          <h2 className="font-semibold text-3xl text-center">
            Medical Credentials Verification
          </h2>
        )}

        <h4 className="text-muted-foreground text-center font-normal text-xl max-w-2xl">
          The verification process takes just a few minutes and your information
          is encrypted and secure.
        </h4>
      </div>

      <div className="flex flex-col gap-4">
        <CenteredRow>
          <InputElement
            name="nationalProviderIdentifier"
            className="w-[600px]"
            isRequired={true}
            label=" National Provider Identifier(NPI)"
            messageClassName="text-right"
            placeholder="Enter 10-digit NPI number"
            inputClassName="bg-disabled  border border-border"
            disabled={true}
          />
        </CenteredRow>

        <div className="flex flex-col items-center">
          <div className="flex justify-between items-center w-[600px] pb-2">
            <h6 className="font-semibold text-base">Medical License</h6>
            <Button
              type="button"
              className="min-h-[28px] min-w-[70px] rounded-sm text-white bg-black"
              onClick={() =>
                append({
                  state: "",
                  licenseNumber: "",
                })
              }
            >
              <InsertIconSVG />
              ADD LICENSE
            </Button>
          </div>
          <div className=" flex flex-col gap-2">
            {fields.map((field, index) => {
              return (
                <div
                  className="bg-secondary relative flex w-[600px] rounded-[5px] p-5 border border-border-secondary  gap-[20px]"
                  key={field.id}
                >
                  <SelectElement
                    name={`medicalLicense.${index}.state`}
                    options={stateOptions}
                    label="State"
                    placeholder="Select State"
                    triggerClassName="w-full min-h-[50px]"
                    className="w-[270px]"
                  />

                  <InputElement
                    name={`medicalLicense.${index}.licenseNumber`}
                    className="w-[270px]"
                    label="License Number"
                    messageClassName="text-right"
                    placeholder="Enter license number"
                    inputClassName="bg-white"
                  />

                  <button
                    className={cn(
                      "absolute right-2.5 top-2.5 cursor-pointer",
                      index === 0 && "hidden"
                    )}
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <ClearSVG />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex justify-between items-center w-[600px] pb-2">
            <h6 className="font-semibold text-base">DEA Number</h6>
            <Button
              type="button"
              className="min-h-[28px] min-w-[70px] rounded-sm text-white bg-black"
              onClick={() =>
                deaAppend({
                  state: "",
                  registrationNumber: "",
                })
              }
            >
              <InsertIconSVG />
              ADD NUMBER
            </Button>
          </div>
          <div className=" flex flex-col gap-2">
            {deaFields.map((field, index) => {
              return (
                <div
                  className="bg-secondary relative flex w-[600px] rounded-[5px] p-5 border border-border-secondary  gap-[20px]"
                  key={field.id}
                >
                  <SelectElement
                    name={`deaLicense.${index}.state`}
                    options={stateOptions}
                    label="State"
                    placeholder="Select State"
                    triggerClassName="w-full min-h-[50px]"
                    className="w-[270px]"
                  />

                  <InputElement
                    name={`deaLicense.${index}.registrationNumber`}
                    className="w-[270px]"
                    label="License Number"
                    messageClassName="text-right"
                    placeholder="Enter license number"
                    inputClassName="bg-white"
                  />

                  <button
                    className={cn(
                      "absolute right-2.5 top-2.5 cursor-pointer",
                      index === 0 && "hidden"
                    )}
                    type="button"
                    onClick={() => deaRemove(index)}
                  >
                    <ClearSVG />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 items-center gap-2.5 ">
        <Button
          onClick={handleNext}
          disabled={!form.formState.isValid}
          className="cursor-pointer text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
        >
          Verify and Complete Registration
        </Button>
        {slug === STEPPER_FORM.ONBOARDING && (
          <Link
            to={"/skip-verification"}
            className="flex items-center min-w-[150px] py-2.5 px-7 rounded-full bg-white text-black font-semibold text-base min-h-[52px] border border-black hover:!bg-transparent cursor-pointer"
          >
            Skip for now
          </Link>
        )}
      </div>
    </div>
  );
}
