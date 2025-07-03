// src/api/authApi.ts
import { baseApi } from "./baseApi";
import {
  type LoginRequest,
  type SSOProviderOnboardRequest,
  type RequestPasswordResetRequest,
  type ResetPasswordRequest,
} from "@/types/requests";
import {
  type LoginResponse,
  type SSOProviderOnboardResponse,
  type LogoutResponse,
  type RequestPasswordResetResponse,
  type ResetPasswordResponse,
} from "@/types/responses";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ username, password }) => {
        const basicAuthHeader = `Basic ${btoa(`${username}:${password}`)}`;

        return {
          url: "/auth/login",
          method: "POST",
          headers: {
            Authorization: basicAuthHeader,
          },
          body: {},
        };
      },
    }),

    ssoProviderOnboard: builder.mutation<
      SSOProviderOnboardResponse,
      SSOProviderOnboardRequest
    >({
      query: (body) => ({
        url: "/auth/sso-provider-onboard",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    requestPasswordReset: builder.mutation<
      RequestPasswordResetResponse,
      RequestPasswordResetRequest
    >({
      query: (body) => ({
        url: "/auth/request-password-reset",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useSsoProviderOnboardMutation,
  useLogoutMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
} = authApi;
