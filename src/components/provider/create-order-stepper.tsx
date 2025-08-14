import { useState, createContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type { MultiStepFormContextProps } from "@/types/credential-verification";
import { ZodObject } from "zod";
import useAuthentication from "@/hooks/use-authentication";
import { patientSchema } from "@/schemas/patientSchema";
import PatientDetails from "@/components/organization/PatientDetails";
import { medicationsSchema } from "@/schemas/medicationSchema";
import AddMedication from "@/components/organization/AddMedication";
import { providerPharmacySchema } from "@/schemas/pharmacySchema";
import PharmacySelection from "@/components/organization/PharmacySelection";
import { dispensingSchema } from "@/schemas/dispensingSchema";
import { completeOrderVerificationSchema } from "@/schemas/order-merge-schema";
import Dispensing from "@/components/organization/Dispensing";
import { orderFormDefaults } from "@/schemas/order-form-defaults";
import SelectMedication from "./create-order/select-medication";
import SelectProviderPharmacy from "./create-order/select-provider-pharmacy";

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
  // {
  //   validationSchema: medicationsSchema,
  //   component: <AddMedication />,
  // },
  // {
  //   validationSchema: providerPharmacySchema,
  //   component: <PharmacySelection />,
  // },
  {
    validationSchema: dispensingSchema,
    component: <Dispensing />,
  },
];

const CreateOrderForm = () => {
  const [step, setStep] = useState(0);
  const totalSteps = FormSteps.length;
  const safeStep = step < FormSteps.length ? step : FormSteps.length - 1;
  const { user } = useAuthentication();

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(FormSteps[safeStep].validationSchema),
    defaultValues: orderFormDefaults,
  });

  const handleNext = () => {
    const currentSchemas = FormSteps[safeStep].validationSchema;
    const currentStepData = form.getValues();
    console.log("currentStepData", currentStepData);
    localStorage.setItem("formData", JSON.stringify(currentStepData));
    const currentValidation = currentSchemas.safeParse(currentStepData);
    console.log("currentValidation", currentValidation);
    if (currentValidation.success) {
      setStep(step + 1);
    } else {
      console.error("Validation errors:", currentValidation.error.format());
      // Or for a cleaner array of messages:
      console.error(
        currentValidation.error.errors.map(
          (err) => `${err.path.join(".")}: ${err.message}`
        )
      );
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
          {form.formState.isReady && FormSteps[safeStep].component}
        </form>
      </FormProvider>
    </MultiStepFormContext.Provider>
  );
};

export default CreateOrderForm;
