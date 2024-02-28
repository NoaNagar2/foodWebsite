import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: undefined,
  isAdmin: false,
  _id: "",
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.userData = action.payload;
      state.isAdmin = action.payload.isAdmin || false;
      state.id = action.payload._id;
      console.log(action);
    },
    loginUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
