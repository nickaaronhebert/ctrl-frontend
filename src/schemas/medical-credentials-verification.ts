import { z } from "zod";

export const medicalVerificationStep1 = z.object({
  nationalProviderIdentifier: z
    .string({
      required_error: "National Provider Id is required",
    })
    .trim(),

  deaRegistrationNumber: z
    .string({
      required_error: "DEA Registration Number is required",
    })
    .trim(),

  licenseNumber: z.string({
    required_error: "License Number is required",
  }),

  medicalSpecialty: z.string({
    required_error: "Medical Specialty is required",
  }),

  licenseStates: z.object({
    state: z
      .array(z.string().min(1))
      .min(1)
      .nonempty("Please select at least one framework."),
  }),
});

export const medicalVerificationStep2 = z.object({
  termsAndConditions: z.boolean().refine((val) => val, {
    message: "You must accept the terms and conditions.",
  }),
});

export const completeMedicalVerificationSchema = medicalVerificationStep1.merge(
  medicalVerificationStep2
);

export type CombinedCheckoutType = z.infer<
  typeof completeMedicalVerificationSchema
>;
