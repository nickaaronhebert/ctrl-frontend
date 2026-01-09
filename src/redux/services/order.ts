import type { ICommonSearchQuery } from "@/types/requests/search";
import { baseApi } from ".";
import type {
  ICreateOrderResponse,
  IGetOrderById,
} from "@/types/responses/order";
import type { ICreateOrderRequest } from "@/types/requests/order";
import type { IViewAllOrderInterface } from "@/types/responses/IViewAllOrder";
import type { ITransmitOrderResponse } from "@/types/responses/ITransmitOrderResponse";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllOrders: builder.query<IViewAllOrderInterface, ICommonSearchQuery>({
      query: ({ page, perPage, q, patient = "", subOrganization = "" }) => {
        const subOrg = subOrganization
          ? `&subOrganization=${subOrganization}`
          : "";

        return {
          url: `/order?page=${page}&limit=${perPage}&q=${q}&patient=${patient}${subOrg}`,
          method: "GET",
        };
      },
      providesTags: (result) => {
        return result
          ? [
              ...result?.data?.map(({ id }) => ({
                type: "Orders" as const,
                id,
              })),
              { type: "Orders", id: "LIST" },
            ]
          : [{ type: "Orders", id: "LIST" }];
      },
    }),

    viewOrderById: builder.query<IGetOrderById, string>({
      query: (id) => {
        return {
          url: `/order/${id}`,
          method: "GET",
        };
      },
      providesTags: (_result, _error, id) => [{ type: "Orders", id }],
    }),

    createOrder: builder.mutation<ICreateOrderResponse, ICreateOrderRequest>({
      query: (body) => {
        return {
          url: `/order`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Orders", id: "LIST" }] : [],
    }),

    transmitOrder: builder.mutation<ITransmitOrderResponse, string>({
      query: (id) => {
        return {
          url: `/order/transmit/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: (result, _error, id) => {
        return result ? [{ type: "Orders", id: id }] : [];
      },
    }),
  }),
});

export const {
  useViewAllOrdersQuery,
  useViewOrderByIdQuery,
  useCreateOrderMutation,
  useTransmitOrderMutation,
} = orderApi;

export default orderApi;
