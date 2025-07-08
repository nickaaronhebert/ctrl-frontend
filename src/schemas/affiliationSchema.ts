import { z } from "zod";

export const affiliationSchema = z.object({
  affiliations: z.array(
    z.object({
      name: z.string(),
      status: z.enum(["Active", "Inactive"]),
    })
  ),
});

export type Affiliation = z.infer<typeof affiliationSchema>;
