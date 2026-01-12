import { z } from "zod";

export const supplySchema = z.object({
  supply: z.string().min(1, {
    message: "Supply item is required",
  }),
  supplyRequired: z.enum(["REQUIRED", "OPTIONAL"], {
    errorMap: () => ({
      message: "Supply requirement is required",
    }),
  }),

  quantity: z
    .number()
    .min(1, { message: "Supply quantity must be at least 1" }),
  isOnePerOrder: z.boolean(),
});
