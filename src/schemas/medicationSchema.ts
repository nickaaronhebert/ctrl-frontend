import { z } from "zod";

const medicationSchema = z.object({
  selectMedication: z.string().min(1, "Medication selection is required"),

  quantity: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than zero"),

  unit: z.string().min(1, "Unit is required"),

  sigInstructions: z
    .string()
    .min(1, "Instructions are required")
    .max(500, "Instructions too long"),

  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be positive")
    .optional(),

  orderTotal: z
    .number({ invalid_type_error: "Order total must be a number" })
    .positive("Order total must be positive")
    .optional(),
});

export const medicationsSchema = z.object({
  medications: z
    .array(medicationSchema)
    .min(1, "At least one medication must be added"),
});
