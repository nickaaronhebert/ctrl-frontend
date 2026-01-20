export interface CatalogueShippingDetails {
  name: string;
  id: string;
  description: string;
  services: {
    price: number;
  };
}

export interface IViewCatalogueShippingResponse {
  message: string;
  code: string;
  data: CatalogueShippingDetails[];
}
