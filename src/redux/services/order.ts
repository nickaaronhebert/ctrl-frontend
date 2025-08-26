import type { ICommonSearchQuery } from "@/types/requests/search";
import { baseApi } from ".";
import type {
  ICreateOrderResponse,
  IGetOrderById,
} from "@/types/responses/order";
import type { ICreateOrderRequest } from "@/types/requests/order";
import type { IViewAllOrderInterface } from "@/types/responses/IViewAllOrder";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllOrders: builder.query<IViewAllOrderInterface, ICommonSearchQuery>({
      query: ({ page, perPage, q, patient = "" }) => {
        return {
          url: `/order?page=${page}&limit=${perPage}&q=${q}&patient=${patient}`,
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
  }),
});

export const {
  useViewAllOrdersQuery,
  useViewOrderByIdQuery,
  useCreateOrderMutation,
} = orderApi;

export default orderApi;
