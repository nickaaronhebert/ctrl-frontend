export interface OrgSubOrgs {
  id: string;
  name: string;
  email: string;
  invoiceFrequency: string;
}

export interface SubOrgResponse {
  data: OrgSubOrgs[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
