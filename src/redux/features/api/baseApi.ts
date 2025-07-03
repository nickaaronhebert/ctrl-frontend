import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_BASE_BACKEND_URL ||
      "http://192.168.0.102:6009/api/v1",
    prepareHeaders: (headers) => {
      const masterKey = import.meta.env.VITE_MASTER_KEY;
      if (masterKey) {
        headers.set("X-api-key", masterKey);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  reducerPath: "api",
  tagTypes: ["User", "Prescription", "Provider"],
});
