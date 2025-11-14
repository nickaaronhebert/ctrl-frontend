import { z } from "zod";

export const medicationSchema = z.object({
  selectMedication: z.string().min(2, "Medication selection is required"),

  quantity: z.coerce
    .number({
      invalid_type_error: "Invalid Number",
    })
    .int("Invalid Number")
    .positive("Invalid Number"),

  daysSupply: z.coerce
    .number({
      invalid_type_error: "Invalid Number",
    })
    .int("Invalid Number")
    .min(0, "Invalid Number"),

  unit: z.string().min(1, "Unit is required"),
  clinicalDifference: z.string().optional(),
  sigInstructions: z
    .string()

    .min(2, "Instructions are required")
    .max(500, "Instructions too long"),
});

export const medicationsSchema = z.object({
  medications: z
    .array(medicationSchema)
    .min(1, "At least one medication must be added"),
});
