import { z } from "zod";

export const Carrier = {
  UPS: "UPS",
  FedEx: "FedEx",
  USPS: "USPS",
  DHL: "DHL",
  "Custom Carrier": "Custom Carrier",
} as const;

export const ServiceType = {
  Standard: "Standard",
  "2-Day": "2 Day",
  Overnight: "Overnight",
  Refrigerated: "Refrigerated",
  "Same-Day": "Same-Day",
  Custom: "Custom",
} as const;

export const SignatureType = {
  NONE: "NONE",
  ADULT: "ADULT",
  DIRECT: "DIRECT",
} as const;

export const serviceOptionsSchema = z.object({
  refrigerated: z.boolean(),
  hazmat: z.boolean(),
  weekendDelivery: z.boolean(),
  saturdayPickup: z.boolean(),
  holdAtLocation: z.boolean(),
  signatureRequired: z.boolean(),
  signatureType: z.nativeEnum(SignatureType),
  tempMonitor: z.boolean(),
  oversize: z.boolean(),
});

export const shippingSchema = z.object({
  name: z.string().min(1, { message: "Service name is required" }),
  carrier: z.nativeEnum(Carrier, {
    errorMap: () => ({ message: "Invalid carrier type" }),
  }),
  serviceType: z.nativeEnum(ServiceType, {
    errorMap: () => ({ message: "Invalid service type" }),
  }),
  price: z.coerce.number().positive("Price must be a positive"),
  carrierProductCode: z.string().min(1, { message: "Carrier Product code" }),
  deliveryWindow: z.string().min(1, {
    message: "Delivery window / SLA is required",
  }),
  serviceOptions: serviceOptionsSchema,
});

export type ShippingFormValues = z.infer<typeof shippingSchema>;
