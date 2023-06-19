import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";

interface State {
  token?: string;
  phone: string;
}

const initialState: State = {
  token: undefined,
  phone: "",
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutHandler: state => {
      state.token = "";
      state.phone = "";
    },

    loginHandler: (state, { payload }) => {
      state.token = payload;
    },

    phoneReducer: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export const authSelector = (state: RootState) => state.auth;
export const tokenSelector = (state: RootState) => state.auth?.token;

export const { loginHandler, logoutHandler, phoneReducer } = authReducer.actions;

export default authReducer.reducer;
