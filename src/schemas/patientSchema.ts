import { z } from "zod";

export const patientSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),

  medicationAllergies: z.array(z.string().min(1)).optional(),

  currentMedications: z.array(z.string().min(1)),

  diagnosedConditions: z.array(z.string().min(1)),

  vitalSigns: z.object({
    bloodPressure: z
      .string()
      .regex(/^\d{2,3}\/\d{2,3}$/, "Blood pressure must be in format ###/##"),
    heartRate: z
      .number({ invalid_type_error: "Heart rate must be a number" })
      .min(30, "Heart rate too low")
      .max(220, "Heart rate too high"),
    height: z
      .number({ invalid_type_error: "Height must be a number" })
      .positive("Height must be positive"),
    weight: z
      .number({ invalid_type_error: "Weight must be a number" })
      .positive("Weight must be positive"),
  }),
});
