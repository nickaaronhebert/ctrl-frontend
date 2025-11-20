import { z } from "zod";

export const createWebhookSchema = z
  .object({
    name: z.string().min(1, "Webhook Name is required"),
    targetUrl: z.string().min(1, "Target Url is required"),
    authenticationType: z.string().min(1, "Authentication Type is required"),
    userName: z.string().optional(),
    password: z.string().optional(),
    header: z.string().optional(),

    subOrganization: z.string().min(1, "Sub-Organization is"),
  })
  .superRefine((data, ctx) => {
    if (data.authenticationType === "basic_auth") {
      if (!data.userName || data.userName.trim().length == 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Username is required",
          path: ["userName"],
        });
      }

      if (!data.password || data.password.trim().length == 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required",
          path: ["password"],
        });
      }
    }

    if (data.authenticationType === "header_auth") {
      // Required check
      if (!data.header || data.header.trim() === "") {
        ctx.addIssue({
          path: ["header"],
          code: z.ZodIssueCode.custom,
          message: "Header is required for Header Authentication",
        });
        return;
      }

      // JSON validation
      try {
        const parsed = JSON.parse(data.header);

        if (
          typeof parsed !== "object" ||
          parsed === null ||
          Array.isArray(parsed)
        ) {
          ctx.addIssue({
            path: ["header"],
            code: z.ZodIssueCode.custom,
            message: "Headers must be a valid JSON object",
          });
          return;
        }
      } catch (e) {
        ctx.addIssue({
          path: ["header"],
          code: z.ZodIssueCode.custom,
          message: "Invalid JSON format",
        });
      }
    }
  });
