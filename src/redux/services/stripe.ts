import { TAG_GET_CARDS } from "@/types/baseApiTags";
import { baseApi } from ".";
import type { IViewAllInvoices } from "@/types/responses/IViewOrganizationInvoices";
import type { ICommonSearchQuery } from "@/types/requests/search";
import type { IGetOrganizationInvoicesResponse } from "@/types/responses/IGetOrganizationInvoicesDetails";
import type { IPharmacyPayoutSetupResponse } from "@/types/responses/IPharmacyPayoutSetup";

export const stripeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSetupIntent: builder.query<any, void>({
      query: () => "/payment/setup-intent", // GET request
    }),

    getAttachPaymentMethod: builder.mutation<any, string>({
      query: (payment_id) => ({
        url: `/payment/attach-payment-method/${payment_id}`,
        method: "GET",
      }),
      invalidatesTags: [TAG_GET_CARDS],
    }),

    getAdminCards: builder.query<any, void>({
      query: () => "/payment/cards", // GET request
      providesTags: [TAG_GET_CARDS],
    }),

    getOrganizationInvoices: builder.query<
      IViewAllInvoices,
      ICommonSearchQuery
    >({
      query: ({ page, perPage, q }) =>
        `/transaction/transmissions?page=${page}&limit=${perPage}&q=${q}`, // GET request
    }),

    getOrganizationInvoiceById: builder.query<
      IGetOrganizationInvoicesResponse,
      string
    >({
      query: (id) => `/transaction/${id}`,
    }),

    payoutSetup: builder.query<IPharmacyPayoutSetupResponse, void>({
      query: () => `/payment/connect-stripe`,
    }),
  }),
});

export const {
  useGetSetupIntentQuery,
  useGetAttachPaymentMethodMutation,
  useGetOrganizationInvoicesQuery,
  useGetAdminCardsQuery,
  useGetOrganizationInvoiceByIdQuery,
  useLazyPayoutSetupQuery,
} = stripeApi;
