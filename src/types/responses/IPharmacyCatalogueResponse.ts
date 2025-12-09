export interface PharmacyCatalogue {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  medications: number;
  variants: number;
}

export interface PharmacyCatalogueResponse {
  data: PharmacyCatalogue[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  code: string;
}
