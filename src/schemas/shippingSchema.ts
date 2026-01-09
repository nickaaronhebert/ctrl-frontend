import { z } from "zod";

export const Carrier = {
  UPS: "UPS",
  FedEx: "FEDEX",
  USPS: "USPS",
  OTHER: "OTHER",
} as const;

export const ServiceType = {
  STANDARD: "STANDARD",
  TWO_DAY: "TWO_DAY",
  OVERNIGHT: "OVERNIGHT",
  SAME_DAY: "SAME_DAY",
  REFRIGERATED: "REFRIGERATED",
  CUSTOM: "CUSTOM",
} as const;

// export const SignatureType = {
//   NONE: "NONE",
//   ADULT: "ADULT",
//   DIRECT: "DIRECT",
// } as const;

export const serviceOptionsSchema = z.object({
  refrigerated: z.boolean(),
  hazmat: z.boolean(),
  weekendDelivery: z.boolean(),
  saturdayPickup: z.boolean(),
  holdAtLocation: z.boolean(),
  signatureRequired: z.boolean(),
  signatureType: z.string(),
  tempMonitor: z.boolean(),
  oversize: z.boolean(),
  overweight: z.boolean(),
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
