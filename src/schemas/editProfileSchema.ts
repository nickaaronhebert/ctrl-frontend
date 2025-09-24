import { z } from "zod";
import { phoneNumberSchema } from "./createPatientSchema";

export const editProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: "First name is required.",
    })
    .min(2, {
      message: "First name must be at least 2 characters.",
    }),
  lastName: z
    .string()
    .min(1, {
      message: "Last name is required.",
    })
    .min(2, {
      message: "Last name must be at least 2 characters.",
    }),
  phoneNumber: phoneNumberSchema,
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  organizationName: z.string().min(1, {
    message: "Organization name is required.",
  }),
});

export type EditProfile = z.infer<typeof editProfileSchema>;
