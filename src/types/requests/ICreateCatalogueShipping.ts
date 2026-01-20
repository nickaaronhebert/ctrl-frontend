export interface ICreateCatalogueShippingRequest {
  items: {
    shippingProfile: string;
    price: number;
  }[];

  phmCatalogueVariantId: string;
}
