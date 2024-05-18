import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import alertReducer from "./alert-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
  },
});

export default store;
