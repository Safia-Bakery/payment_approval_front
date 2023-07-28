import { createSlice } from "@reduxjs/toolkit";
import { RootState, persistor } from "../rootConfig";
import { StatusRoles } from "utils/types";

interface State {
  token?: string;
  me?: { id: number; username: string; role: StatusRoles };
}

const initialState: State = {
  token: undefined,
  me: undefined,
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutHandler: state => {
      state.token = undefined;
      state.me = undefined;
      localStorage.removeItem("auth");
    },

    loginHandler: (state, { payload }) => {
      state.token = payload;
    },

    roleHandler: (state, { payload }) => {
      state.me = payload;
    },
  },
});

export const tokenSelector = (state: RootState) => state.auth.token;
export const roleSelector = (state: RootState) => state.auth.me;

export const { loginHandler, logoutHandler, roleHandler } = authReducer.actions;

export default authReducer.reducer;
