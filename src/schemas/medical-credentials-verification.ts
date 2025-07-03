import { z } from "zod";

export const medicalCredentialsVerificationSchema = z.object({
  nationalProviderIdentifier: z
    .string({
      required_error: "National Provider Id is required",
    })
    .trim()
    .min(2, { message: "ProviderId must be at least 2 characters." }),

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
  licenseStates: z.array(z.string()),
});

export const termsAgreementSchema = z.object({
  termsAndConditions: z.boolean().refine((val) => val, {
    message: "You must accept the terms and conditions.",
  }),
});

export const stepSchemas = [
  medicalCredentialsVerificationSchema,
  termsAgreementSchema,
];

export const completeMedicalVerificationSchema = stepSchemas.reduce(
  (acc, schema) => acc.merge(schema),
  z.object({})
);

export type CompleteMedicalVerificationSchemaType = z.infer<
  typeof completeMedicalVerificationSchema
>;
