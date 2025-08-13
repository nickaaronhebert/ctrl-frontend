// src/defaults/orderFormDefaults.ts
import { z } from "zod";
import { completeOrderVerificationSchema } from "@/schemas/order-merge-schema";

export const orderFormDefaults: z.infer<
  typeof completeOrderVerificationSchema
> = {
  // Step 1: patientSchema
  fullName: "John Doe",
  phoneNumber: "9876543210",
  email: "john.doe@example.com",
  gender: "Male",
  dob: "1990-05-15",
  medicationAllergies: ["Penicillin", "Peanuts"],
  currentMedications: "Metformin, Lisinopril",
  diagnosedConditions: ["Type 2 Diabetes, Hypertension"],
  vitalSigns: {
    bloodPressure: "120/80",
    heartRate: 75,
    height: 175, // in cm
    weight: 72, // in kg
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
