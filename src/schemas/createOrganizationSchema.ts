import { z } from "zod";
import { phoneNumberSchema } from "./createPatientSchema";

export const createOrganizationSchema = z.object({
  name: z.string().min(1, "Organization Name is required"),
  phoneNumber: phoneNumberSchema,
  email: z.string().email("Invalid email address"),
  //   status: z.string().min(1, "Status is required"),
});

export const createPharmacySchema = z.object({
  name: z.string().min(1, "Organization Name is required"),
  phoneNumber: phoneNumberSchema,
  email: z.string().email("Invalid email address"),
  allowedStates: z.array(z.string().min(1, "State is required.")).min(1, {
    message: "At least one state is required.",
  }),
});
