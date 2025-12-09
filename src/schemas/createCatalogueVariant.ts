import { z } from "zod";

export const catalogueVariantSchema = z.object({
  name: z.string().min(1, "Catalogue variant name is required"),
  description: z.string().min(1, "Catalogue variant description is required"),
});

export type CatalogueVariantFormValues = z.infer<typeof catalogueVariantSchema>;
