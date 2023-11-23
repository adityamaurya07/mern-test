import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authSlice from "./slices/authSlice";

const config = {
  key: "redux",
  version: 1,
  storage,
};
const slices = combineReducers({ authSlice });
const store = configureStore({
  reducer: persistReducer(config, slices),
  devTools: true,
});

export default store;
