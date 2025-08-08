import type {
  IViewAllTransmissionsRequest,
  IViewAllTransmissionsResponse,
  IViewTransmissionByIdResponse,
} from "@/types/responses/transmission";
import { baseApi } from ".";

const transmissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllTransmissions: builder.query<
      IViewAllTransmissionsResponse,
      IViewAllTransmissionsRequest
    >({
      query: ({ page, perPage }) => {
        return {
          url: `/transmission?page=${page}&limit=${perPage}`,
          method: "GET",
        };
      },
    }),

    viewTransmissionById: builder.query<IViewTransmissionByIdResponse, string>({
      query: (id) => {
        return {
          url: `/transmission/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useViewAllTransmissionsQuery, useViewTransmissionByIdQuery } =
  transmissionApi;

export default transmissionApi;
