import { createSlice } from "@reduxjs/toolkit";

import { authApi } from "@/redux/services/authApi";
import type { RootState } from "@/redux/reducers";
export const AUTH_TOKEN = "auth_token";

const persistedToken =
  localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN);

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: persistedToken ? JSON.parse(persistedToken) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      sessionStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(AUTH_TOKEN);
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        if (payload?.data.access_token) {
          state.token = payload?.data.access_token;

          sessionStorage.setItem(
            AUTH_TOKEN,
            JSON.stringify(payload?.data.access_token)
          );
          localStorage.setItem(
            AUTH_TOKEN,
            JSON.stringify(payload?.data.access_token)
          );
        } else {
          state.token = null;
          state.token = "";

          localStorage.removeItem(AUTH_TOKEN);
          sessionStorage.removeItem(AUTH_TOKEN);
        }
      }
    );
  },
});

export const selectIsLoggedIn = (state: RootState) => !!state.auth.token;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
