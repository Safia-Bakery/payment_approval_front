import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";

interface State {
  token?: string;
}

const initialState: State = {
  token: undefined,
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutHandler: state => {
      state.token = "";
    },

    loginHandler: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const tokenSelector = (state: RootState) => state.auth.token;

export const { loginHandler, logoutHandler } = authReducer.actions;

export default authReducer.reducer;
