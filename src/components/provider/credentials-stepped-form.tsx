import { useState, createContext } from "react";
import { Progress } from "@/components/ui/progress";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import {
  completeMedicalVerificationSchema,
  medicalCredentialsVerificationSchema,
  termsAgreementSchema,
} from "@/schemas/medical-credentials-verification";
import VerificationStepOne from "./medical-credentials/verification-step1";
import VerificationStepTwo from "./medical-credentials/verification-step2";
import type { MultiStepFormContextProps } from "@/types/credential-verification";
import { ZodObject } from "zod";

type StepDefinition = {
  validationSchema: ZodObject<any>;
  component: React.ReactNode;
};
export const MultiStepFormContext =
  createContext<MultiStepFormContextProps | null>(null);

export const FormSteps: StepDefinition[] = [
  {
    validationSchema: medicalCredentialsVerificationSchema,
    component: <VerificationStepOne />,
  },
  {
    validationSchema: termsAgreementSchema,
    component: <VerificationStepTwo />,
  },
];

export default function ProviderSteppedForm() {
  const [step, setStep] = useState(0);
  const totalSteps = FormSteps.length;
  const form = useForm({
    resolver: zodResolver(FormSteps[step].validationSchema),
    mode: "onTouched",
    defaultValues: {
      nationalProviderIdentifier: "",
      deaRegistrationNumber: "",
      licenseNumber: "",
      medicalSpecialty: "",
      licenseStates: [],
      termsAndConditions: false,
    },
  });
  const handleNext = () => {
    const currentSchemas = FormSteps[step].validationSchema;
    const currentStepData = form.getValues();

    const currentValidation = currentSchemas.safeParse(currentStepData);
    if (currentValidation.success) {
      setStep(step + 1);
    } else {
      console.log("error");
    }
  };

  const onSubmit = async () => {
    const result = completeMedicalVerificationSchema.safeParse(
      form.getValues()
    );
    console.log("final Data", result);
  };
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const value: MultiStepFormContextProps = {
    currentStepIndex: step,
    isFirstStep: step === 0,
    isLastStep: step === totalSteps,
    handleNext,
    handleBack,
    onSubmit,
  };

  return (
    <MultiStepFormContext.Provider value={value}>
      <FormProvider {...form}>
        <div className="bg-background lg:px-40 py-20 px-10">
          <div className="[min-width:1440px]:px-64 px-10 py-12 bg-white min-h-[690px] rounded-4xl">
            <div className="flex justify-center">
              <Progress
                className="my-4 max-w-96"
                value={(step / totalSteps) * 100}
              />
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="my-10">
              {FormSteps[step].component}
            </form>
          </div>
        </div>
      </FormProvider>
    </MultiStepFormContext.Provider>
  );
}
