import type { ICommonSearchQuery } from "@/types/requests/search";
import { baseApi } from ".";
import type { InvoicesApiResponse } from "@/types/responses/invoice";

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query<InvoicesApiResponse, ICommonSearchQuery>({
      query: ({ page = 1, perPage = 10, q = "" }) => {
        return {
          url: `/invoice?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        };
      },
    }),
    getInvoiceById: builder.query({
      query: (id: string) => ({
        url: `/invoice/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetInvoicesQuery, useGetInvoiceByIdQuery } = invoiceApi;
