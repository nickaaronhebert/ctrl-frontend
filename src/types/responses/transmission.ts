export type ProductVariants = {
  strength: string;
  quantityType: string;
  containerQuantity: number;
  medicationCatalogue: {
    drugName: string;
    dosageForm: string;
  };
};

export type TransmissionData = {
  _id: string;
  pharmacy: {
    name: string;
    address: string;
  };
  status: string;
  productVariants: ProductVariants[];
};

export type PaginationMeta = {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
};

export interface IViewAllTransmissionsResponse {
  data: TransmissionData[];
  meta: PaginationMeta;
}

export interface IViewAllTransmissionsRequest {
  page: number;
  perPage: number;
}
