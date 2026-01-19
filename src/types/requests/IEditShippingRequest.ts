export interface EditShipping {
  pharmacyCatalogue: string;
  shipping: {
    shippingProfile: string;
  };
  supplies?: {
    supply: string;
    quantity: number;
    supplyRequired: boolean;
    isOnePerOrder: boolean;
  }[];
}

export interface IEditShippingRequest {
  items: EditShipping[];
}
