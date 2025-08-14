import { z } from "zod";

export const patientSchema = z.object({
  selectedPatient: z.string().min(2, "Patient details are required"),
  // firstName: z.string().min(1, "Full name is required"),
  // lastName: z.string().min(1, "Full name is required"),
  // phoneNumber: z
  //   .string()
  //   .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
  // email: z.string().email("Invalid email address"),
  // gender: z.enum(["Male", "Female", "Other"]),
  // dob: z.string().refine((date) => !isNaN(Date.parse(date)), {
  //   message: "Invalid date format",
  // }),

  medicationAllergies: z.array(z.string().min(1)),
  currentMedications: z.array(z.string().min(1)),

  diagnosedConditions: z.array(z.string().min(1)),

  vitalSigns: z.object({
    bloodPressure: z
      .string()
      .regex(/^\d{2,3}\/\d{2,3}$/, "Blood pressure must be in format ###/##"),
    heartRate: z.coerce
      .number({
        invalid_type_error: "Invalid Number",
      })
      .min(30, "Heart rate too low")
      .max(220, "Heart rate too high"),
    height: z.coerce
      .number({
        invalid_type_error: "Invalid Number",
      })
      .positive("Height must be positive"),
    weight: z.coerce
      .number({
        invalid_type_error: "Invalid Number",
      })
      .positive("Weight must be positive"),
  }),
});
