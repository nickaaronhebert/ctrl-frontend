import { z } from "zod";

export const patientSchema = z.object({
  selectedPatient: z.any().optional(),
  address: z.string({ required_error: "Address is required" }),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().regex(/^\+?\d{10,15}$/, {
    message: "Phone number must be 10 to 15 digits, optionally starting with +",
  }),
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
