import { z } from "zod";

export const phoneNumberSchema = z
  .string()
  .min(1, { message: "Phone number is required." })
  .refine(
    (val) => {
      // remove non-digit characters
      const digits = val.replace(/\D/g, "");
      return digits.length === 10;
    },
    {
      message: "Phone number must be 10 digits.",
    }
  );

const dobSchema = z
  .string()
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: "Date must be in MM/DD/YYYY format",
  })
  .refine(
    (val) => {
      const [month, day, year] = val.split("/").map(Number);
      const date = new Date(year, month - 1, day);

      // Check if date is real
      const isValidDate =
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;

      if (!isValidDate) return false;

      // Check that DOB is not in the future
      const today = new Date();
      return date <= today;
    },
    {
      message: "Invalid date!!",
    }
  );

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
  dob: dobSchema,
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: phoneNumberSchema,
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
