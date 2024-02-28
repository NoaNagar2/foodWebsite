import authSlice from "./authSlice";
import recipeLikeSlice from "./addRecipeLike";
import { combineReducers } from "redux";

const storeCombine = combineReducers({
  authSlice,
  recipeLikeSlice,
});

export default storeCombine;
