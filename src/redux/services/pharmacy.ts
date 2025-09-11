import type { PharmacyInvoiceResponse } from "@/types/responses/invoices";
import { TAG_GET_USER_PROFILE } from "@/types/baseApiTags";
import { baseApi } from ".";
import type { IGetPharmacyInvoicesDetailsResponse } from "@/types/responses/IGetPharmacyInvoicesDetail";

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

    getPharmacyInvoicesDetails: builder.query<
      IGetPharmacyInvoicesDetailsResponse,
      string
    >({
      query: (id) => ({
        url: `/transaction/pharmacy-transfers/${id}`,
        method: "GET",
      }),
    }),

    bulkUpsertPharmacyCatalogue: builder.mutation<any, any>({
      query: (body) => ({
        url: `/pharmacy-catalogue/bulk-upsert`,
        method: "POST",
        body,
      }),
    }),

    setActiveStates: builder.mutation<
      any,
      { allowedStates: string[]; id: string }
    >({
      query: ({ allowedStates, id }) => ({
        url: `/business/${id}/pharmacy/states`,
        method: "PUT",
        body: {
          allowedStates,
        },
      }),
      invalidatesTags: [TAG_GET_USER_PROFILE],
    }),
  }),
});

export const {
  useVerifyPharmacyInvitationMutation,
  useAcceptPharmacyInvitationMutation,
  useGetPharmacyInvoicesQuery,
  useGetPharmacyInvoicesDetailsQuery,
  useBulkUpsertPharmacyCatalogueMutation,
  useSetActiveStatesMutation,
} = pharmacyApi;
