import type { ICommonSearchQuery } from "@/types/requests/search";
import { baseApi } from ".";
import type {
  ICreatePatientApiResponse,
  IGetPatientDetailsByIdResponse,
  PatientApiResponse,
} from "@/types/responses/patient";
import type {
  ICreatePatientRequest,
  IUpdatePatientRequest,
} from "@/types/requests/patient";

const patientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatientDetails: builder.query<PatientApiResponse, ICommonSearchQuery>({
      query: ({ page, perPage, q }) => {
        return {
          url: `/patient?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        };
      },
      providesTags: (result) => {
        return result
          ? [
              ...result?.data?.map(({ id }) => ({
                type: "Patients" as const,
                id,
              })),
              { type: "Patients", id: "LIST" },
            ]
          : [{ type: "Patients", id: "LIST" }];
      },
    }),

    getPatientDetailsById: builder.query<
      IGetPatientDetailsByIdResponse,
      string
    >({
      query: (id) => {
        return {
          url: `/patient/${id}`,
          method: "GET",
        };
      },
      providesTags: (_result, _error, id) => [{ type: "Patients", id }],
    }),

    createPatient: builder.mutation<
      ICreatePatientApiResponse,
      ICreatePatientRequest
    >({
      query: (body) => ({
        url: "/patient",
        method: "POST",
        body,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Patients", id: "LIST" }] : [],
    }),

    updatePatient: builder.mutation<
      ICreatePatientApiResponse,
      IUpdatePatientRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/patient/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, _error, arg) =>
        result ? [{ type: "Patients", id: arg.id }] : [],
    }),
    connectStripe: builder.query({
      query: () => "/payment/connect-stripe",
    }),
  }),
});

export const {
  useGetPatientDetailsQuery,
  useCreatePatientMutation,
  useGetPatientDetailsByIdQuery,
  useUpdatePatientMutation,
  useLazyConnectStripeQuery,
} = patientApi;
