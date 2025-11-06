import { z } from "zod";

export const pharmacyMetadataSchema = z.object({
  pharmacyDescriptor: z.string().min(1, "Pharmacy desriptor is required"),
  primaryPharmacyIdentifier: z
    .string()
    .min(1, "Primary pharmacy identifier is required"),
  secondaryPharmacyIdentifier: z.string().optional(),
  drugStrength: z.string().min(1, "Drug strength is required"),
  drugForm: z.string().min(1, "Drug Form is required"),
  scheduleCode: z.string().optional(),
  shippingClass: z.string().optional(),
});

export type PharmacyMetaDataFormValues = z.infer<typeof pharmacyMetadataSchema>;
