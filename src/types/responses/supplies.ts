export interface Supply {
  id: string;
  name: string;
  sku: string;
  price: number;
}

export interface SupplyResponse {
  data: Supply[];
  meta?: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
