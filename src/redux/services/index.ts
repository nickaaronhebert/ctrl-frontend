import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../reducers";
import { TAG_GET_PATIENTS, TAG_GET_USER_PROFILE } from "@/types/baseApiTags";

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: [TAG_GET_USER_PROFILE, TAG_GET_PATIENTS],
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_BASE_BACKEND_URL ||
      "http://192.168.0.102:6009/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const masterKey = import.meta.env.VITE_MASTER_KEY;
      const token = (getState() as RootState).auth.token;
      if (masterKey) {
        headers.set("X-api-key", masterKey);
      }

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("ngrok-skip-browser-warning", "123");
      return headers;
    },
  }),
  endpoints: () => ({}),
});
