import { combineReducers } from "@reduxjs/toolkit";
import auth from "./authReducer";
import toggle from "./toggleReducer";

export default combineReducers({
  auth,
  toggle,
});
