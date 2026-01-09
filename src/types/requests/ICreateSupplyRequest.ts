export interface ICreateSupplyRequest {
  name: string;
  itemType:
    | "INJECTABLE"
    | "CAPSULE"
    | "TABLET"
    | "SPRAY"
    | "CREAM"
    | "GEL"
    | "SOLUTION"
    | "PAD"
    | "OTHER";
  quantity: number;
  quantityType: "mg" | "each" | "ml" | "unit";
  price: number;
  sku: string;
  configMode: "FIXED" | "CONFIGURABLE";
}

export interface IEditSupplyRequest extends ICreateSupplyRequest {
  supplyId: string;
}
