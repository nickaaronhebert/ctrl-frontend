import { z } from "zod";

export const SHIPMENT_OPTIONS = {
  LEAST_EXPENSIVE: "LEAST_EXPENSIVE",
  MOST_EXPENSIVE: "MOST_EXPENSIVE",
  MULTIPLE_SHIPMENTS: "MULTIPLE_SHIPMENTS",
} as const;

export const globalShippingSchema = z.object({
  defaultShippingProfile: z
    .string()
    .min(1, { message: "Shipping class is required" }),
  shippingStrategy: z.nativeEnum(SHIPMENT_OPTIONS, {
    errorMap: () => ({ message: "Invalid shipment option" }),
  }),
});

export type GlobalShippingFormValues = z.infer<typeof globalShippingSchema>;
