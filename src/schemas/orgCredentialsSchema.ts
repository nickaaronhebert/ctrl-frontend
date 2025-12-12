import { z } from "zod";

export const orgCredentialSchema = z
  .object({
    platformType: z.enum(["basic", "token"]),
    apiBaseUrl: z.string().min(1, {
      message: "API base url is required",
    }),
    username: z.string().optional(),
    password: z.string().optional(),
    accessToken: z.string().optional(),
    headers: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.platformType === "basic") {
      if (!data.apiBaseUrl || data.apiBaseUrl.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "API Base URL is required for basic authentication",
          path: ["apiBaseUrl"],
        });
      }
      if (!data.username || data.username.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Username is required for basic authentication",
          path: ["username"],
        });
      }
      if (!data.password || data.password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Password must be at least 8 characters for basic authentication",
          path: ["password"],
        });
      }
    }
    if (data.platformType === "token") {
      if (!data.apiBaseUrl || data.apiBaseUrl.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "API Base URL is required for token authentication",
          path: ["apiBaseUrl"],
        });
      }
    }
  });

export type OrgCredential = z.infer<typeof orgCredentialSchema>;
