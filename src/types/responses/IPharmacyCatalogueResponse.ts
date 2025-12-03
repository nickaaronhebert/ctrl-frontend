export interface PharmacyCatalogue {
  name: string;
  description: string;
  createdAt: string;
  medications: number;
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
