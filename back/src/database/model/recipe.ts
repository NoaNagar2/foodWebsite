import mongoose from "mongoose";
import { recipeSchema } from "../schema/recipeSchema";

const Recipe = mongoose.model("Recipe", recipeSchema);

export { Recipe };
