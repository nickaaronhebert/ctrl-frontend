import { useState, createContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type { MultiStepFormContextProps } from "@/types/credential-verification";
import { ZodObject } from "zod";
import useAuthentication from "@/hooks/use-authentication";

import { medicationsSchema } from "@/schemas/medicationSchema";

import { providerPharmacySchema } from "@/schemas/pharmacySchema";

import { completeOrderVerificationSchema } from "@/schemas/order-merge-schema";
import SelectMedication from "./create-order/select-medication";
import SelectProviderPharmacy from "./create-order/select-provider-pharmacy";
import { dispensingSchema } from "@/schemas/dispensingSchema";
import Dispensing from "../organization/Dispensing";
import PatientDetails from "./create-order/patient-details";
import { patientSchema } from "@/schemas/patientSchema";

type StepDefinition = {
  validationSchema: ZodObject<any>;
  component: React.ReactNode;
};

export const MultiStepFormContext =
  createContext<MultiStepFormContextProps | null>(null);

export const FormSteps: StepDefinition[] = [
  {
    validationSchema: patientSchema,
    component: <PatientDetails />,
  },
  {
    validationSchema: medicationsSchema,
    component: <SelectMedication />,
  },
  {
    validationSchema: providerPharmacySchema,
    component: <SelectProviderPharmacy />,
  },
  {
    validationSchema: dispensingSchema,
    component: <Dispensing />,
  },
];

const CreateOrderFormV2 = () => {
  const [step, setStep] = useState(0);
  const totalSteps = FormSteps.length;
  const safeStep = step < FormSteps.length ? step : FormSteps.length - 1;
  const { user } = useAuthentication();

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(FormSteps[safeStep].validationSchema),
    defaultValues: {
      medications: [
        { selectMedication: "", quantity: 1, sigInstructions: "", unit: "" },
      ],
      selectProvider: "",
      selectPharmacy: "",
    },
  });

  const handleNext = () => {
    const currentSchemas = FormSteps[safeStep].validationSchema;
    const currentStepData = form.getValues();

    const currentValidation = currentSchemas.safeParse(currentStepData);
    console.log("currentValidation", currentValidation);
    if (currentValidation.success) {
      setStep(step + 1);
    } else {
      console.log("error");
    }
  };

  const onSubmit = async () => {
    const result = completeOrderVerificationSchema.safeParse(form.getValues());

    if (result.success) {
      setStep(totalSteps);

      const payload = result.data;
      console.log("Final Payload:", payload);

      // API call here...
    } else {
      console.log("Validation errors:", result.error.format());
    }
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
    fullName: `${user?.firstName} ${user?.lastName}`,
    email: user?.email || "",
    phone: user?.phoneNumber || "",
  };

  return (
    <MultiStepFormContext.Provider value={value}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-5">
          {FormSteps[safeStep].component}
        </form>
      </FormProvider>
    </MultiStepFormContext.Provider>
  );
};

export default CreateOrderFormV2;
