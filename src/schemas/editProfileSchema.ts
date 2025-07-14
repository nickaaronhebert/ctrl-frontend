import { z } from "zod";

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
  phoneNumber: z
    .string()
    .min(1, {
      message: "Phone number is required.",
    })
    .regex(/^[+]?[1-9][\d]{0,15}$/, {
      message: "Please enter a valid phone number.",
    }),
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
});

export type EditProfile = z.infer<typeof editProfileSchema>;
