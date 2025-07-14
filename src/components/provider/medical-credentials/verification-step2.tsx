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
import PersonalDetail from "./personal-detail";

export default function VerificationStepTwo() {
  const [isValid, setIsValid] = useState(false);

  const { onSubmit, handleBack, fullName, email, phone, isLoading } =
    useMultiStepForm();

  const { formState } = useFormContext();
  const formData = localStorage.getItem("formData");
  const parsedData = formData ? JSON.parse(formData) : null;

  useEffect(() => {
    if (formState.errors.termsAndConditions) setIsValid(false);
    else {
      if (formState.dirtyFields.termsAndConditions) setIsValid(true);
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
          <PersonalDetail
            label="Full Name"
            value={fullName}
            containerClass="pb-4 border-b border-gray-200"
          />
          <PersonalDetail
            label="Email"
            value={email}
            containerClass="pb-4 border-b border-gray-200"
          />
          <PersonalDetail label="Phone" value={phone} />
        </div>

        {parsedData && (
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

            {parsedData.medicalLicense && (
              <>
                <h6 className="px-4 mb-1 mt-7 font-medium text-base">
                  Medical License ({parsedData.medicalLicense.length})
                </h6>
                <ConfirmDetails
                  field={parsedData.medicalLicense}
                  fieldClass="flex justify-between  p-3.5 bg-light-background"
                  labelClass="font-semibold text-muted-foreground text-base"
                  valueClass="text-primary-foreground font-semibold text-base"
                  lastIndexClass="border border-gray-200 border-t-0 mb-4"
                  indexClass="border border-gray-200"
                  indexRequired={true}
                />
              </>
            )}

            {parsedData.deaLicense && (
              <>
                <h6 className="px-4 mb-1 mt-7 font-medium text-base">
                  DEA Number ({parsedData.deaLicense.length})
                </h6>
                <ConfirmDetails
                  field={parsedData.deaLicense}
                  fieldClass="flex justify-between  p-3.5 bg-light-background"
                  labelClass="font-semibold text-muted-foreground text-base"
                  valueClass="text-primary-foreground font-semibold text-base"
                  lastIndexClass="border border-gray-200 border-t-0 mb-4"
                  indexClass="border border-gray-200"
                  indexRequired={true}
                />
              </>
            )}
          </div>
        )}

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
            disabled={!isValid || isLoading}
            className="text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
          >
            Complete Registration
          </Button>
        </div>
      </div>
    </div>
  );
}
