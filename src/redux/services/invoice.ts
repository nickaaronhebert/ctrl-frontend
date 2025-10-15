import type { ICommonSearchQuery } from "@/types/requests/search";
import { baseApi } from ".";
import type { InvoicesApiResponse } from "@/types/responses/invoice";
import { TAG_GET_INVOICES } from "@/types/baseApiTags";

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query<InvoicesApiResponse, ICommonSearchQuery>({
      query: ({ page = 1, perPage = 10, q = "" }) => {
        return {
          url: `/invoice?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        };
      },
      providesTags: [TAG_GET_INVOICES],
    }),
    getInvoiceById: builder.query({
      query: (id: string) => ({
        url: `/invoice/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_GET_INVOICES],
    }),
    getPharmaciesByOrg: builder.query({
      query: () => ({
        url: `/organization/pharmacies`,
        method: "GET",
      }),
    }),
    getOrganizations: builder.query({
      query: () => ({
        url: `/pharmacy/organizations`,
        method: "GET",
      }),
    }),

    // pay invoice //
    payInvoice: builder.mutation({
      query: (body) => {
        return {
          url: `/invoice/pay`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [TAG_GET_INVOICES],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useGetPharmaciesByOrgQuery,
  useGetOrganizationsQuery,
  usePayInvoiceMutation,
} = invoiceApi;
