import { createSlice } from "@reduxjs/toolkit";

import { authApi } from "@/redux/services/authApi";
import type { RootState } from "@/redux/reducers";
import { providerApi } from "@/redux/services/provider";
import type { Provider } from "@/types/global/commonTypes";
export const AUTH_TOKEN = "auth_token";
export const PROVIDER_KEY = "provider";

const persistedToken =
  localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN);

const providerToken =
  localStorage.getItem(PROVIDER_KEY) || sessionStorage.getItem(PROVIDER_KEY);

interface AuthState {
  token: string | null;
  provider: Provider | null;
}

const initialState: AuthState = {
  token: persistedToken ? JSON.parse(persistedToken) : null,
  provider: providerToken ? JSON.parse(providerToken) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(AUTH_TOKEN);
    },
  },
  extraReducers(builder) {
    // builder.addMatcher(
    //   authApi.endpoints.login.matchFulfilled,

    //   (state, { payload }) => {
    //     if (payload?.data.access_token) {
    //       state.token = payload?.data.access_token;

    //       sessionStorage.setItem(
    //         AUTH_TOKEN,
    //         JSON.stringify(payload?.data.access_token)
    //       );
    //       localStorage.setItem(
    //         AUTH_TOKEN,
    //         JSON.stringify(payload?.data.access_token)
    //       );
    //     } else {
    //       state.token = null;
    //       state.token = "";

    //       localStorage.removeItem(AUTH_TOKEN);
    //       sessionStorage.removeItem(AUTH_TOKEN);
    //     }
    //   }
    // );
    builder.addMatcher(
      authApi.endpoints.verifyOtp.matchFulfilled,
      (state, { payload }) => {
        const token = payload?.data?.access_token;
        if (token) {
          state.token = token;
          sessionStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
          localStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
        } else {
          state.token = null;
          sessionStorage.removeItem(AUTH_TOKEN);
          localStorage.removeItem(AUTH_TOKEN);
        }
      }
    ),
      builder.addMatcher(
        providerApi.endpoints.acceptProviderInvitation.matchFulfilled,
        (state, { payload }) => {
          if (payload?.data.token) {
            state.token = payload?.data.token;

            sessionStorage.removeItem("provider_token");
            localStorage.removeItem("provider_token");
            sessionStorage.removeItem("provider");
            localStorage.removeItem("provider");
            sessionStorage.setItem(
              "auth_token",
              JSON.stringify(payload?.data.token)
            );
            localStorage.setItem(
              "auth_token",
              JSON.stringify(payload?.data.token)
            );
          } else {
            localStorage.removeItem("auth_token");
            sessionStorage.removeItem("auth_token");
          }
        }
      );
    builder.addMatcher(
      providerApi.endpoints.acceptProviderInvitation.matchRejected,
      (_, { payload }) => {
        if (payload?.data) {
        } else {
          console.error(`something went wrong`);
        }
        console.error(payload, "error");
      }
    );
    builder.addMatcher(
      providerApi.endpoints.verifyProviderInvitation.matchFulfilled,
      (state, { payload }) => {
        if (payload?.data) {
          state.provider = payload?.data;

          sessionStorage.setItem(PROVIDER_KEY, JSON.stringify(payload?.data));
          localStorage.setItem(PROVIDER_KEY, JSON.stringify(payload?.data));
        } else {
          state.provider = null;

          sessionStorage.removeItem(PROVIDER_KEY);

          localStorage.removeItem(PROVIDER_KEY);
        }
      }
    );
    builder.addMatcher(
      providerApi.endpoints.verifyProviderInvitation.matchRejected,
      (_, { payload }) => {
        if (payload?.data) {
        } else {
          console.error(`something went wrong`);
        }
        console.error(payload, "error");
      }
    );
  },
});

export const selectIsLoggedIn = (state: RootState) => !!state.auth.token;
export const selectProvider = (state: RootState) => state.auth.provider;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
