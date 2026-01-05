export interface ICreateSupplyRequest {
  name: string;
  itemType:
    | "Injectable"
    | "Capsule"
    | "Tablet"
    | "Spray"
    | "Cream"
    | "Gel"
    | "Solution"
    | "PAD"
    | "OTHER";
  quantity: number;
  quantityType: "mg" | "each" | "ml" | "unit";
  price: number;
  sku: string;
  configMode: "FIXED" | "CONFIGURABLE";
}
