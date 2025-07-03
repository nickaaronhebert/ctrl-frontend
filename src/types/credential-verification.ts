import type { CompleteMedicalVerificationSchemaType } from "@/schemas/medical-credentials-verification";

export interface MultiStepFormContextProps {
  currentStepIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  handleNext: () => void;
  handleBack: () => void;
  onSubmit: (data: CompleteMedicalVerificationSchemaType) => void;
}
