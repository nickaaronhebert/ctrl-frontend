// orderSlice.ts
import type { Address } from "@/types/global/commonTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SELECT_MEDICATION {
  medications: {
    selectMedication: string;
    quantity: number;
    unit: string;
    sigInstructions: string;
    daysSupply: number;
  }[];
}

export interface PATIENT_DETAILS {
  selectedPatient?: any;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  dob: string;
  medicationAllergies?: string;
  currentMedications?: string;
  height: number;
  weight: number;
  address: Address[] | [];
  dispensingAddress: Address;
}

export interface SELECT_PROVIDER_PHARMACY {
  selectProvider: string;
  // selectPharmacy: string;
}

export interface SELECT_DISPENSING {
  // address: Address;
  transmissionMethod: "manual" | "auto";
}

export interface OrderState {
  currentStep: number;
  initialStep: PATIENT_DETAILS;
  stepOne: SELECT_MEDICATION;
  stepTwo: SELECT_PROVIDER_PHARMACY;
  stepThree: SELECT_DISPENSING;
}

const initialState: OrderState = {
  currentStep: 0,
  initialStep: {
    selectedPatient: undefined,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    dob: "",
    medicationAllergies: "",
    dispensingAddress: {
      address1: "",
      address2: "",
      city: "",
      zipcode: "",
      state: "",
      country: "",
      _id: "",
      isDefault: false,
    },
    address: [],
    height: 0,
    weight: 0,
  },
  stepOne: {
    medications: [
      {
        selectMedication: "",
        quantity: 0,
        unit: "",
        sigInstructions: "",
        daysSupply: 0,
      },
    ],
  },
  stepTwo: {
    selectProvider: "",
    // selectPharmacy: "",
  },
  stepThree: {
    // address: {
    //   address1: "",
    //   address2: "",
    //   city: "",
    //   state: "",
    //   zipcode: "",
    //   isDefault: false,
    //   country: "",
    //   _id: "",
    // },
    transmissionMethod: "manual",
  },
};

const orderSlice = createSlice({
  name: "create-order",
  initialState,
  reducers: {
    prevStep: (state) => {
      state.currentStep -= 1;
    },

    updateInitialStep: (state, action: PayloadAction<PATIENT_DETAILS>) => {
      state.initialStep = action.payload;
      state.currentStep += 1;
    },

    updateStepOne: (state, action: PayloadAction<SELECT_MEDICATION>) => {
      state.stepOne = action.payload;
      state.currentStep += 1;
    },
    updateStepTwo: (state, action: PayloadAction<SELECT_PROVIDER_PHARMACY>) => {
      state.stepTwo = action.payload;
      state.currentStep += 1;
    },
    updateStepThree: (state, action: PayloadAction<SELECT_DISPENSING>) => {
      state.stepThree = action.payload;
      state.currentStep += 1;
    },
    resetOrder: () => initialState,
  },
});

export const {
  prevStep,
  updateStepOne,
  updateStepTwo,
  updateInitialStep,
  updateStepThree,
  resetOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
