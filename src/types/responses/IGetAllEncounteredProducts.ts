import type { PaginationMeta } from "./pagination";

export interface EncounteredProduct {
  telegraProductVariant: string[];
  name: string;
  description: string;
  output: string;
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
