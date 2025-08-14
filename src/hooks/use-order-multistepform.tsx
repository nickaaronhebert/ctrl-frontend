// hooks/useOrderMultiStepForm.ts

import { MultiStepFormContext } from "@/components/provider/create-order-stepperV2";
import { useContext } from "react";

export const useOrderMultiStepForm = () => {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error(
      "useOrderMultiStepForm must be used within OrderMultiStepForm.Provider"
    );
  }
  return context;
};
