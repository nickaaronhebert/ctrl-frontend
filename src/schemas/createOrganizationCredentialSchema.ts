import { z } from "zod";

const headersSchema = z
  .string()
  .optional() // This makes the field optional
  .refine(
    (value) => {
      if (value) {
        // Only perform JSON validation if value is provided
        try {
          const parsed = JSON.parse(value); // Try to parse the string as JSON
          return parsed && typeof parsed === "object" && !Array.isArray(parsed);
        } catch (e) {
          return false; // If JSON parsing fails, return false
        }
      }
      return true; // If value is empty, it's considered valid
    },
    {
      message: "Invalid JSON format", // Custom error message
    }
  );

export const createOrganizationCredentialSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
});

export const basicAuthenticationSchema = z.object({
  baseApiUrl: z.string().min(1, "Base Api Url is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  headers: headersSchema,
});

export const basicTokenAuthenticationSchema = z.object({
  accessToken: z.string().min(1, "Access Token is required"),
  headers: headersSchema,
});
