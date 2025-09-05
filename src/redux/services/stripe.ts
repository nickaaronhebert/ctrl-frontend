import { TAG_GET_CARDS } from "@/types/baseApiTags";
import { baseApi } from ".";

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
  }),
});

export const {
  useGetSetupIntentQuery,
  useGetAttachPaymentMethodMutation,

  useGetAdminCardsQuery,
} = stripeApi;
