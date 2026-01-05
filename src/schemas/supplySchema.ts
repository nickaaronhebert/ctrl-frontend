import { z } from "zod";

export const SupplyItem = {
  INJECTABLE: "Injectable",
  CAPSULE: "Capsule",
  TABLET: "Tablet",
  SPRAY: "Spray",
  CREAM: "Cream",
  GEL: "Gel",
  SOLUTION: "Solution",
  PAD: "PAD",
  OTHER: "OTHER",
};

export const QuantityType = {
  MG: "mg",
  EACH: "each",
  ML: "ml",
  UNIT: "unit",
};

export const SupplyConfigMode = {
  FIXED: "FIXED",
  CONFIGURABLE: "CONFIGURABLE",
};
export const supplyItemSchema = z.object({
  name: z.string().min(1, "Name must not be empty"),
  itemType: z.nativeEnum(SupplyItem, {
    errorMap: () => ({ message: "Invalid item type" }),
  }),
  quantity: z.number().positive("Quantity must be a positive number"),
  quantityType: z.nativeEnum(QuantityType, {
    errorMap: () => ({ message: "Invalid quantity type" }),
  }),
  price: z.number().positive("Price must be a positive number"),
  defaultUnitCount: z
    .number()
    .positive("Default unit count must be a positive number"),
  sku: z.string().min(1, "SKU must not be empty"),
  configMode: z.nativeEnum(SupplyConfigMode, {
    errorMap: () => ({ message: "Invalid configuration mode" }),
  }),
});

export type SupplyFormValues = z.infer<typeof supplyItemSchema>;
