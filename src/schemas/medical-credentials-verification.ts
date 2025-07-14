import { z } from "zod";

export const medicalCredentialsVerificationSchema = z.object({
  nationalProviderIdentifier: z
    .string({
      required_error: "National Provider Id is required",
    })
    .trim()
    .min(2, { message: "ProviderId must be at least 2 characters." }),

  medicalLicense: z.array(
    z.object({
      state: z
        .string({ required_error: "State is required" })
        .min(2, { message: "State is required" }),
      licenseNumber: z
        .string({ required_error: "License Number is required" })
        .min(2, { message: "License Number is required" }),
    })
  ),

  deaLicense: z.array(
    z.object({
      state: z
        .string({ required_error: "State is required" })
        .min(2, { message: "State is required" }),
      registrationNumber: z
        .string({ required_error: "License Number is required" })
        .min(2, { message: "License Number is required" }),
    })
  ),
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

export const addMedicalLicenseSchema = z.object({
  medicalLicense: z.array(
    z.object({
      state: z
        .string({ required_error: "State is required" })
        .min(2, { message: "State is required" }),
      licenseNumber: z
        .string({ required_error: "License Number is required" })
        .min(2, { message: "License Number is required" }),
    })
  ),

  deaLicense: z.array(
    z.object({
      state: z
        .string({ required_error: "State is required" })
        .min(2, { message: "State is required" }),
      registrationNumber: z
        .string({ required_error: "License Number is required" })
        .min(2, { message: "License Number is required" }),
    })
  ),
});

export type CompleteMedicalVerificationSchemaType = z.infer<
  typeof completeMedicalVerificationSchema
>;
