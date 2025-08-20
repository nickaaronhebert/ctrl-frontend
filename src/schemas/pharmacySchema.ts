import { z } from "zod";

export const providerPharmacySchema = z.object({
  selectProvider: z.string().min(1, "Provider selection is required"),
  selectPharmacy: z.string().min(1, "Pharmacy selection is required"),
});
