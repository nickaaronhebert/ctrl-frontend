import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
// import { useFormContext } from "react-hook-form";
import { useMultiStepForm } from "@/hooks/usemultistepForm";

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
    name: "nationalProviderIdentifier",
  },
  {
    label: "DEA Registration Number",
    name: "deaRegistrationNumber",
  },
  {
    label: "License Number",
    name: "licenseNumber",
  },
  {
    label: "Medical Specialty",
    name: "medicalSpecialty",
  },
];
export default function VerificationStepTwo() {
  const { onSubmit, handleBack } = useMultiStepForm();
  // const form = useFormContext();

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

          {medicalCredentialsInfo.map((info, index) => (
            <div className="px-4" key={info.name}>
              <div
                className={cn(
                  "flex justify-between mb-2  pt-3.5 ",
                  index !== medicalCredentialsInfo.length - 1
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
            // disabled={form.getValues("termsAndConditions") === false}
            className="text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
          >
            Complete Registration
          </Button>
        </div>
      </div>
    </div>
  );
}
