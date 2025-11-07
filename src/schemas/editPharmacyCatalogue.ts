import { z } from "zod";

export const pharmacyMetadataSchema = z.object({
  pharmacyDescriptor: z.string(),
  primaryPharmacyIdentifier: z.string(),
  secondaryPharmacyIdentifier: z.string().optional(),
  drugStrength: z.string(),
  drugForm: z.string(),
  scheduleCode: z.string().optional(),
  shippingClass: z.string().optional(),
});

export type PharmacyMetaDataFormValues = z.infer<typeof pharmacyMetadataSchema>;
