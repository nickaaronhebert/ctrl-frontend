import { z } from "zod";
import { phoneNumberSchema } from "./createPatientSchema";

const minLengthErrorMessage = "Minimum 8 characters required.";
const maxLengthErrorMessage = "Maximum 20 characters.";
const uppercaseErrorMessage =
  "Password should have at least one uppercase letter.";
const lowercaseErrorMessage =
  "Password should have at least one lowercase letter.";
const numberErrorMessage = "Password should have at least one number.";
const specialCharacterErrorMessage =
  "Password should have at least one special character.";
export const passwordMismatchErrorMessage = "Passwords should match.";

export const passwordSchema = z
  .string()
  .min(8, { message: minLengthErrorMessage })
  .max(20, { message: maxLengthErrorMessage })
  .refine((password) => /[A-Z]/.test(password), {
    message: uppercaseErrorMessage,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: lowercaseErrorMessage,
  })
  .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: specialCharacterErrorMessage,
  });

export const registerProviderFormSchema = z
  .object({
    phoneNumber: phoneNumberSchema,
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
    email: z.string().email({ message: "Invalid email address." }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: passwordMismatchErrorMessage,
    path: ["confirmPassword"],
  });
