import { z } from "zod";
import { supplySchema } from "./supplyItemSchema";

export const configureShippingSchema = z.object({
  shippingProfile: z.string().optional(),
  supplies: z.array(supplySchema).optional(),
});

export type ConfigureShippingFormValues = z.infer<
  typeof configureShippingSchema
>;
