import { z } from "zod";
import { addressSchema, phoneNumberSchema } from "./createPatientSchema";

export const patientSchema = z.object({
  selectedPatient: z.any().optional(),
  address: addressSchema,

  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: phoneNumberSchema,

  email: z.string().email("Invalid email address"),
  gender: z.string({ required_error: "Gender is required" }),
  dob: z
    .string()
    // .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
  medicationAllergies: z.string().optional(),
  currentMedications: z.string().optional(),
  height: z.number().positive("Height must be positive"),
  weight: z.number().positive("Weight must be positive"),
});
