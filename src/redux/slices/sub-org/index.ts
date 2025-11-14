import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Address {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  isDefault: boolean;
  //   _id: string;
}

export interface SubOrganizationDetails {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: Address;
}

export interface BillingDetails {
  cardholderName: string;
  creditCardNumber: string;
  expirationDate: string;
  cvc: string;
  billingZipCode: string;
}

export interface CreateSubOrganizationState {
  currentStep: number;
  stepOne: SubOrganizationDetails;
  stepTwo: BillingDetails;
  isDirectToStepTwo: boolean;
}

const initialState: CreateSubOrganizationState = {
  currentStep: 0,
  stepOne: {
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      isDefault: false,
    },
  },
  stepTwo: {
    cardholderName: "",
    creditCardNumber: "", // This should eventually store the tokenized card info from Stripe.
    expirationDate: "",
    cvc: "",
    billingZipCode: "",
  },
  isDirectToStepTwo: false,
};

const createSubOrganizationSlice = createSlice({
  name: "create-sub-organization",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },

    prevStep: (state) => {
      state.currentStep -= 1;
    },

    updateStepOne: (state, action: PayloadAction<SubOrganizationDetails>) => {
      state.stepOne = action.payload;
      state.currentStep += 1;
    },
    updateStepTwo: (state, action: PayloadAction<BillingDetails>) => {
      state.stepTwo = action.payload;
      state.currentStep += 1;
    },
    setSubOrgId: (state, action: PayloadAction<string>) => {
      state.stepOne.id = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    // setDirectToStepTwo: (state, action: PayloadAction<boolean>) => {
    //   state.isDirectToStepTwo = action.payload;
    //   if (action.payload) {
    //     state.currentStep = 1;
    //   }
    // },
    resetForm: () => initialState,
  },
});

export const {
  nextStep,
  prevStep,
  updateStepOne,
  updateStepTwo,
  resetForm,
  setSubOrgId,
  // setDirectToStepTwo,
  setCurrentStep,
} = createSubOrganizationSlice.actions;

export default createSubOrganizationSlice.reducer;
