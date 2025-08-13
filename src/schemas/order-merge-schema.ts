import { z } from "zod";
import { patientSchema } from "./patientSchema";
import { providerPharmacySchema } from "./pharmacySchema";
import { medicationsSchema } from "./medicationSchema";
import { dispensingSchema } from "./dispensingSchema";

export const stepSchemas = [
  patientSchema,
  providerPharmacySchema,
  medicationsSchema,
  dispensingSchema,
];

export const completeOrderVerificationSchema = stepSchemas.reduce(
  (acc, schema) => acc.merge(schema),
  z.object({})
);

export type CompleteOrderVerificationSchema = z.infer<
  typeof completeOrderVerificationSchema
>;
