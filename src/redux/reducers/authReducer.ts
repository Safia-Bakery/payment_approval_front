import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";

interface State {
  token?: string;
  role?: string;
}

const initialState: State = {
  token: undefined,
  role: undefined,
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutHandler: state => {
      state.token = "";
      state.role = undefined;
    },

    loginHandler: (state, { payload }) => {
      state.token = payload;
    },

    roleHandler: (state, { payload }) => {
      state.role = payload;
    },
  },
});

export const tokenSelector = (state: RootState) => state.auth.token;
export const roleSelector = (state: RootState) => state.auth.role;

export const { loginHandler, logoutHandler, roleHandler } = authReducer.actions;

export default authReducer.reducer;
