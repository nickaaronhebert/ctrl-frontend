import type { PaginationMeta } from "./pagination";

export interface EncounteredProduct {
  telegraProductVariant: string[];
  name: string;
  description: string;
  output: "ctrl_order_approval" | "pdf_document";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IGetAllEncounteredProducts {
  data: EncounteredProduct[];
  meta: PaginationMeta;
  code: string;
}
