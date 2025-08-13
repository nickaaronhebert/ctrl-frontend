import { z } from "zod";

export const dispensingSchema = z.object({
  dispenseMethod: z.enum(["Ship to patient", "Pickup from office"], {
    required_error: "Dispense method is required",
  }),
  patientAddress: z.object({
    type: z.enum(["Default Address", "Office Address"], {
      required_error: "Address type is required",
    }),
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().regex(/^\d{5}(?:-\d{4})?$/, "Invalid ZIP code format"),
    country: z.string().min(1, "Country is required"),
  }),
});
