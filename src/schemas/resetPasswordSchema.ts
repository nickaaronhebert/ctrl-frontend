// schemas/authSchema.ts
import { z } from "zod";
import { strongPassword } from "@/lib/utils";

export const passwordSchema = z
  .object({
    password: strongPassword,
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;
