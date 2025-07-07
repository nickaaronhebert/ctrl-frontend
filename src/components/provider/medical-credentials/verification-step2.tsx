import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { useMultiStepForm } from "@/hooks/usemultistepForm";
import { useEffect, useState } from "react";
import ConfirmDetails from "./confirm-details";

const personalInfo = [
  {
    label: "Full Name",
    name: "John Smith",
  },
  {
    label: "Email",
    name: "John@example.com",
  },
  {
    label: "Phone",
    name: "licenseNumber",
  },
];

const medicalCredentialsInfo = [
  {
    label: "National Provider Identifier(NPI)",
    value: "nationalProviderIdentifier",
  },
];

const medicalLicenses = [
  {
    label: "California",
    value: "CA-PH-001234",
  },
  {
    label: "Texas",
    value: "CA-PH-001234",
  },
];

const deaLicenses = [
  {
    label: "California",
    value: "F91234563",
  },
  {
    label: "Texas",
    value: "F32112332",
  },
];
export default function VerificationStepTwo() {
  const [isValid, setIsValid] = useState(false);

  const { onSubmit, handleBack } = useMultiStepForm();
  const { formState } = useFormContext();

  useEffect(() => {
    if (formState.errors.termsAndConditions) setIsValid(false);
    else {
      if (formState.isDirty) setIsValid(true);
    }
  }, [formState]);

  return (
    <div>
      <div className="flex justify-center gap-1">
        <h2 className="font-semibold text-3xl text-center">Review & Confirm</h2>
      </div>

      <div className="flex flex-col items-center">
        <div className="mt-6 rounded-xl  border-2 border-gray-200 w-[650px]">
          <h2 className="font-semibold text-2xl  bg-secondary p-4 rounded-tl-xl rounded-tr-xl ">
            Personal Information
          </h2>
          {personalInfo.map((info, index) => (
            <div className="px-4 " key={info.name}>
              <div
                key={info.name}
                className={cn(
                  "flex justify-between mb-2  pt-3.5 ",
                  index !== personalInfo.length - 1
                    ? "pb-4 border-b border-gray-200"
                    : ""
                )}
              >
                <span className="font-semibold text-muted-foreground text-base">
                  {info.label}:
                </span>
                <span className="text-primary-foreground font-semibold text-base">
                  {info.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl  border-2 border-gray-200 w-[650px]">
          <h2 className="font-semibold text-2xl  bg-secondary p-4 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
            Medical Credentials
            <span
              className="p-1 border-2 border-secondary-foreground text-sm w-14 rounded-[4px] text-center cursor-pointer"
              onClick={handleBack}
            >
              EDIT
            </span>
          </h2>

          <ConfirmDetails
            field={medicalCredentialsInfo}
            fieldClass="flex justify-between mb-2  pt-3.5"
            lastIndexClass=""
            indexClass="pb-4 border-b border-gray-200"
            labelClass="font-semibold text-muted-foreground text-base"
            valueClass="text-primary-foreground font-semibold text-base"
          />

          <h6 className="px-4 mb-1 mt-7 font-medium text-base">
            Medical License ({medicalLicenses.length})
          </h6>
          <ConfirmDetails
            field={medicalLicenses}
            fieldClass="flex justify-between  p-3.5 bg-light-background"
            labelClass="font-semibold text-muted-foreground text-base"
            valueClass="text-primary-foreground font-semibold text-base"
            lastIndexClass="border border-gray-200 border-t-0 mb-4"
            indexClass="border border-gray-200"
            indexRequired={true}
          />

          <h6 className="px-4 mb-1 mt-7 font-medium text-base">
            DEA Number ({deaLicenses.length})
          </h6>
          <ConfirmDetails
            field={deaLicenses}
            fieldClass="flex justify-between  p-3.5 bg-light-background"
            labelClass="font-semibold text-muted-foreground text-base"
            valueClass="text-primary-foreground font-semibold text-base"
            lastIndexClass="border border-gray-200 border-t-0 mb-4"
            indexClass="border border-gray-200"
            indexRequired={true}
          />

          {/* {medicalLicenses.map((info, index) => (
            <div className="px-4" key={index}>
              <div
                className={cn(
                  "flex justify-between  p-3.5 bg-light-background",
                  index !== medicalLicenses.length - 1
                    ? " border border-gray-200"
                    : "border border-gray-200 border-t-0 mb-4"
                )}
              >
                <span className="font-semibold text-muted-foreground text-base">
                  {`${index + 1}. ${info.state}`}
                </span>
                <span className="text-primary-foreground font-semibold text-base">
                  {info.licenseNumber}
                </span>
              </div>
            </div>
          ))} */}
        </div>

        <div className="my-6 w-[650px]">
          <FormField
            name="termsAndConditions"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="text-base font-semibold">
                    I agree to the CTRL Terms of Service, Privacy Policy, and
                    Provider Agreement
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end mt-6 w-[650px]">
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={!isValid}
            className="text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
          >
            Complete Registration
          </Button>
        </div>
      </div>
    </div>
  );
}
