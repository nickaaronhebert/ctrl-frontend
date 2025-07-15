import { z } from "zod";

export const affiliationSchema = z.object({
  affiliations: z.array(
    z.object({
      _id: z.string(),
      isAffiliationActive: z.boolean(),
      business: z.object({
        name: z.string(),
      }),
      // status: z.boolean(),
    })
  ),
});

export type AffiliationForm = z.infer<typeof affiliationSchema>;
