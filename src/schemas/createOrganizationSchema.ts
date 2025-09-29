import { z } from "zod";
import { addressSchema, phoneNumberSchema } from "./createPatientSchema";

export const createOrganizationSchema = z.object({
  name: z.string().min(1, "Organization Name is required"),
  phoneNumber: phoneNumberSchema,
  email: z.string().email("Invalid email address"),
  address: addressSchema,
  //   status: z.string().min(1, "Status is required"),
});

export const createPharmacySchema = z.object({
  name: z.string().min(1, "Organization Name is required"),
  phoneNumber: phoneNumberSchema,
  email: z.string().email("Invalid email address"),
  address: addressSchema,
  allowedStates: z.array(z.string().min(1, "State is required.")).min(1, {
    message: "At least one state is required.",
  }),
});

export const inviteAdminSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  businessId: z.string().min(1, "Business Id is required"),
});
