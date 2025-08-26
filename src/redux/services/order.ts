import type { ICommonSearchQuery } from "@/types/requests/search";
import { baseApi } from ".";
import type {
  ICreateOrderResponse,
  IGetOrderById,
} from "@/types/responses/order";
import type { ICreateOrderRequest } from "@/types/requests/order";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllOrders: builder.query<any, ICommonSearchQuery>({
      query: ({ page, perPage, q, patient = "" }) => {
        return {
          url: `/order?page=${page}&limit=${perPage}&q=${q}&patient=${patient}`,
          method: "GET",
        };
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
    }),
  }),
});

export const {
  useViewAllOrdersQuery,
  useViewOrderByIdQuery,
  useCreateOrderMutation,
} = orderApi;

export default orderApi;
