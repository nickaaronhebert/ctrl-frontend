import { z } from "zod";

export const EncounterProductOutput = {
  CTRL_ORDER_APPROVAL: "ctrl_order_approval",
  PDF_DOCUMENT: "pdf_document",
} as const;

export const EncounterProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  output: z.enum([
    EncounterProductOutput.CTRL_ORDER_APPROVAL,
    EncounterProductOutput.PDF_DOCUMENT,
  ]),
  isActive: z.boolean().optional(),
  telegraProductVariant: z
    .array(z.string())
    .nonempty("At least one product variant is required"),
});

export type EncounterProduct = z.infer<typeof EncounterProductSchema>;
export type EncounterProductOutputType =
  (typeof EncounterProductOutput)[keyof typeof EncounterProductOutput];
