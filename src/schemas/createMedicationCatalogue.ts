import { z } from "zod";

const activeIngredientsSchema = z.object({
  name: z.string().min(1, "Ingredient Name is required"),
  // strength: z.string().min(1, "Strength is required"),
  // quantity: z.coerce
  //   .number({
  //     invalid_type_error: "Invalid Number",
  //   })
  //   .int("Invalid Number")
  //   .positive("Invalid Number"),
  // unit: z.string().min(1, "Unit is required"),
});

const variantSchema = z.object({
  strength: z.string().min(1, "Strength is required"),
  quantityType: z.string().min(1, "Quantity Type is required"),
  containerQuantity: z.coerce
    .number({
      invalid_type_error: "Invalid Number",
    })
    .int("Invalid Number")
    .positive("Invalid Number"),
});

const editVariantSchema = z.object({
  strength: z.string().min(1, "Strength is required"),
  quantityType: z.string().min(1, "Quantity Type is required"),
  containerQuantity: z.coerce
    .number({
      invalid_type_error: "Invalid Number",
    })
    .int("Invalid Number")
    .positive("Invalid Number"),
  id: z.string().optional(),
});

export const createMedicationCatalogueSchema = z.object({
  isCompound: z.boolean({
    required_error: "isCompound is required",
    invalid_type_error: "isCompound must be a boolean",
  }),
  activeIngredients: z
    .array(activeIngredientsSchema)
    .min(1, "At least one ingredient is required"),

  variants: z.array(variantSchema).min(1, "At least one variant is required"),
  drugName: z.string().min(1, "DrugName is required"),
  category: z.string().min(1, "Category is required"),
  // condition: z.string().min(1, "Condition is required"),
  dosageForm: z.string().min(1, "DosageForm is required"),
  route: z.string().min(1, "Route is required"),
  // availableQuantities: z
  //   .array(z.string().min(1, "Quantity is required"))
  //   .min(1, "At least one quantity is required"),
  tags: z.array(z.string().min(1, "State is required.")).optional(),
  indications: z.array(z.string().min(1, "State is required.")).optional(),
});

export const editMedicationCatalogueSchema = z.object({
  isCompound: z.boolean({
    required_error: "isCompound is required",
    invalid_type_error: "isCompound must be a boolean",
  }),
  activeIngredients: z
    .array(activeIngredientsSchema)
    .min(1, "At least one ingredient is required"),

  variants: z
    .array(editVariantSchema)
    .min(1, "At least one variant is required"),
  drugName: z.string().min(1, "DrugName is required"),
  category: z.string().min(1, "Category is required"),
  // condition: z.string().min(1, "Condition is required"),
  dosageForm: z.string().min(1, "DosageForm is required"),
  route: z.string().min(1, "Route is required"),
  // availableQuantities: z
  //   .array(z.string().min(1, "Quantity is required"))
  //   .min(1, "At least one quantity is required"),
  tags: z.array(z.string().min(1, "State is required.")).optional(),
  indications: z.array(z.string().min(1, "State is required.")).optional(),
});
