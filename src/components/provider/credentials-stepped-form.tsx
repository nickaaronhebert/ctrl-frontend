import { useState, createContext, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

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
  const [showMessage, setShowMessage] = useState(true);
  const navigate = useNavigate();
  const totalSteps = FormSteps.length;
  const safeStep = step < FormSteps.length ? step : FormSteps.length - 1;
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(FormSteps[safeStep].validationSchema),

    defaultValues: {
      nationalProviderIdentifier: "",
      medicalLicense: [
        {
          state: "",
          licenseNumber: "",
        },
      ],

      deaLicense: [
        {
          state: "",
          registrationNumber: "",
        },
      ],

      termsAndConditions: false,
    },
  });

  const handleNext = () => {
    console.log("handleNext called");
    const currentSchemas = FormSteps[safeStep].validationSchema;
    const currentStepData = form.getValues();

    const currentValidation = currentSchemas.safeParse(currentStepData);
    if (currentValidation.success) {
      setStep(step + 1);
    } else {
      console.log("error");
    }
  };

  const onSubmit = async () => {
    console.log("onsubmit called");
    const result = completeMedicalVerificationSchema.safeParse(
      form.getValues()
    );
    if (result.success) {
      setStep(totalSteps);
      navigate(ROUTES.PROVIDER_DASHBOARD);
    }
    console.log("final Data", result);
  };
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    setShowMessage(true);
    const timer = setTimeout(() => setShowMessage(false), 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const value: MultiStepFormContextProps = {
    currentStepIndex: step,
    isFirstStep: step === 0,
    isLastStep: step === totalSteps,
    handleNext,
    handleBack,
    onSubmit,
  };

  return showMessage ? (
    <div className="text-center text-lg font-semibold my-10 min-h-[650px] flex flex-col justify-center ">
      <p className="text-3xl text-secondary-foreground font-semibold text-center">
        Preparing your medical verification setup....
      </p>
      <p className="text-base text-muted-foreground font-normal text-center mt-2">
        Please wait while we load the next step to complete your provider
        profile.
      </p>
    </div>
  ) : (
    <MultiStepFormContext.Provider value={value}>
      <FormProvider {...form}>
        <div className="flex justify-center">
          <Progress className=" max-w-96" value={(step / totalSteps) * 100} />
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-5">
          {form.formState.isReady && FormSteps[safeStep].component}
        </form>
      </FormProvider>
    </MultiStepFormContext.Provider>
  );
}
