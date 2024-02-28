import { Schema } from "mongoose";
import { IRecipe } from "../../@types/recipe";

const recipeSchema = new Schema<IRecipe>({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 100,
  },
  description: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 500,
  },
  url: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 200,
  },
  alt: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  level: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 20,
  },
  Ingredients: [
    {
      type: String,
    },
  ],
  steps: [
    {
      type: String,
    },
  ],
  category: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  likes: [
    {
      type: String,
    },
  ],
});

export { recipeSchema };
