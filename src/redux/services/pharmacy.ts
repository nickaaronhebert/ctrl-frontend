import type { PharmacyInvoiceResponse } from "@/types/responses/invoices";
import { baseApi } from ".";

export const pharmacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyPharmacyInvitation: builder.mutation<any, any>({
      query: (body) => ({
        url: `/invitation/verify-invitation`,
        method: "POST",
        body,
      }),
    }),

    acceptPharmacyInvitation: builder.mutation<any, any>({
      query: (body) => ({
        url: `/invitation/accept-pharmacy-invitation`,
        method: "POST",
        body,
      }),
    }),
    // Pharmacy invoices get all //
    getPharmacyInvoices: builder.query<
      PharmacyInvoiceResponse,
      { page: number; perPage: number }
    >({
      query: ({ page, perPage }) => ({
        url: `/transaction/pharmacy-transfers?page=${page}&limit=${perPage}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useVerifyPharmacyInvitationMutation,
  useAcceptPharmacyInvitationMutation,
  useGetPharmacyInvoicesQuery,
} = pharmacyApi;
