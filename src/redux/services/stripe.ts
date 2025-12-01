import { TAG_GET_CARDS, TAG_GET_SUB_ORGANIZATION } from "@/types/baseApiTags";
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

    getAttachPaymentMethod: builder.mutation<
      any,
      {
        isDefault: boolean;
        payment_method_id: string;
        subOrganization?: string;
      }
    >({
      query: (body) => ({
        url: `/payment/attach-payment-method`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_CARDS],
    }),

    getAdminCards: builder.query<any, { subOrganization?: string }>({
      query: ({ subOrganization }) => {
        const url = subOrganization
          ? `/payment/cards?subOrganization=${subOrganization}`
          : "/payment/cards";
        return { url };
      },
      providesTags: [TAG_GET_CARDS, TAG_GET_SUB_ORGANIZATION],
      keepUnusedDataFor: 0,
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
