// src/defaults/orderFormDefaults.ts
import { z } from "zod";
import { completeOrderVerificationSchema } from "@/schemas/order-merge-schema";

export const orderFormDefaults: z.infer<
  typeof completeOrderVerificationSchema
> = {
  // Step 1: patientSchema
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  gender: "",
  dob: "",
  medicationAllergies: [""],
  currentMedications: [""],
  diagnosedConditions: [""],
  vitalSigns: {
    bloodPressure: "120/80",
    heartRate: 75,
    height: 175,
    weight: 72,
  },
  // Step 2: medicationsSchema
  medications: [
    {
      selectMedication: "",
      quantity: 0,
      unit: "",
      sigInstructions: "",
      price: undefined,
      orderTotal: undefined,
    },
  ],

  // Step 3: providerPharmacySchema
  selectProvider: "",
  selectPharmacy: "",

  // Step 4: dispensingSchema
  dispenseMethod: "Ship to patient",
  patientAddress: {
    type: "Default Address",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  },
};
