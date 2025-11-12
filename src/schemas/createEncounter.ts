import { z } from "zod";
// import { medicationSchema } from "./medicationSchema";

export const createOrgEncounterSchema = z.object({
  patientId: z.string().min(1, "Patient ID is required"),
  serviceId: z.string().min(1, "Service ID is required"),
  patient: z.string().min(1, "Patient is required"),
  service: z.string().min(1, "Service is required"),

  // medications: z.array(medicationSchema).optional(),
  // selectProvider: z.string().optional(),
  // subOrganization: z.string().optional(),
});
// .superRefine((data, ctx) => {
//   const servicesRequiringCtrlOrder = ["Aesthetic GFE"];

//   if (servicesRequiringCtrlOrder.includes(data.service)) {
//     if (!data.medications || data.medications.length === 0) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "At least one medication must be added",
//         path: ["medications"],
//       });
//     }

//     if (!data.selectProvider || data.selectProvider.trim() === "") {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Provider selection is required",
//         path: ["selectProvider"],
//       });
//     }
//   }
// });
