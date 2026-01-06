import { z } from "zod";

export const SupplyItem = {
  INJECTABLE: "INJECTABLE",
  CAPSULE: "CAPSULE",
  TABLET: "TABLET",
  SPRAY: "SPRAY",
  CREAM: "CREAM",
  GEL: "GEL",
  SOLUTION: "SOLUTION",
  PAD: "PAD",
  OTHER: "OTHER",
} as const;

export const QuantityType = {
  MG: "mg",
  EACH: "each",
  ML: "ml",
  UNIT: "unit",
} as const;

export const SupplyConfigMode = {
  FIXED: "FIXED",
  CONFIGURABLE: "CONFIGURABLE",
} as const;

export const supplyItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name must not be empty"),
  itemType: z.nativeEnum(SupplyItem, {
    errorMap: () => ({ message: "Invalid item type" }),
  }),
  quantity: z.coerce.number().positive("Quantity must be a positive number"),
  quantityType: z.nativeEnum(QuantityType, {
    errorMap: () => ({ message: "Invalid quantity type" }),
  }),
  price: z.coerce.number().positive("Price must be a positive"),
  defaultUnitCount: z
    .number()
    .positive("Default unit count must be a positive number"),
  sku: z.string().min(1, "SKU must not be empty"),
  configMode: z.nativeEnum(SupplyConfigMode, {
    errorMap: () => ({ message: "Invalid configuration mode" }),
  }),
});

export type SupplyFormValues = z.infer<typeof supplyItemSchema>;
