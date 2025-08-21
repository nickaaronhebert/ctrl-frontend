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
    }),
  }),
});

export const {
  useGetPatientDetailsQuery,
  useCreatePatientMutation,
  useGetPatientDetailsByIdQuery,
  useUpdatePatientMutation,
} = patientApi;
