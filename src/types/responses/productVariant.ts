export interface IGetAllProductVariantsResponse {
  data: {
    medicationCatalogue: {
      drugName: string;
      dosageForm: string;
    };
    name?: string;
    strength: string;
    quantityType: string;
    containerQuantity: number;
    id: string;
  }[];
}
