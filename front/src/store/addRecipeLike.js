import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedRecipe: [],
};

const recipeLikeSlice = createSlice({
  name: "likedRecipe",
  initialState,
  reducers: {
    addRecipeLike(state, action) {
      const {
        _id,
        name,
        description,
        url,
        alt,
        level,
        likes,
        steps,
        Ingredients,
      } = action.payload;
      const existingRecipeIndex = state.likedRecipe.findIndex(
        (recipe) => recipe._id === _id
      );

      if (likes && existingRecipeIndex === -1) {
        state.likedRecipe.push({
          _id,
          name,
          description,
          url,
          alt,
          level,
          likes,
          steps,
          Ingredients,
        });
      } else if (!likes && existingRecipeIndex !== -1) {
        state.likedRecipe.splice(existingRecipeIndex, 1);
      }
    },
    removeRecipeLike(state, action) {
      state.likedRecipe = state.likedRecipe.filter(
        (recipe) => recipe._id !== action.payload
      );
    },
  },
});

export const { addRecipeLike, removeRecipeLike } = recipeLikeSlice.actions;

export default recipeLikeSlice.reducer;
