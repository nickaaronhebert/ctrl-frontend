export interface IUpdateVariantSuppliesPayload {
  configId: string;
  supplies: {
    supply: string;
    overridePrice: number | null;
  }[];
}
