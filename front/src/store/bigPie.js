import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import recipeLikeSlice from "./addRecipeLike";

const store = configureStore({
  reducer: {
    authSlice,
    recipeLikeSlice,
  },
});

export default store;
