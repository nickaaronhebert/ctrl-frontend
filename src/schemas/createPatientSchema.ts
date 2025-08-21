import { z } from "zod";

export const createPatientFormSchema = z.object({
  firstName: z
    .string()
    .min(3, {
      message: "First name must be at least 3 characters.",
    })
    .max(20, {
      message: "First name must be less than 20 characters.",
    }),
  lastName: z
    .string()
    .min(3, {
      message: "Last name must be at least 3 characters.",
    })
    .max(20, {
      message: "Last name must be less than 20 characters.",
    }),
  dob: z.string().regex(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/, {
    message: "Date of birth must be in MM/DD/YYYY format.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z.string().min(1, {
    message: "Phone number is required.",
  }),
  address: z.string().min(3, {
    message: "Invalid Address.",
  }),
  medicationAllergies: z.string().optional(),
  currentMedications: z.string().optional(),
  height: z.coerce
    .number({
      invalid_type_error: "Invalid Number",
    })
    .int("Invalid Number")
    .positive("Invalid Number"),
  weight: z.coerce
    .number({
      invalid_type_error: "Invalid Number",
    })
    .int("Invalid Number")
    .positive("Invalid Number"),
});
