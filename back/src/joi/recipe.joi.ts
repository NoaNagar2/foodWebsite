import Joi, { allow, alt } from "joi";
import { IRecipe } from "../@types/recipe";
import { url } from "inspector";

const schema = Joi.object<IRecipe>({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(500).required(),
  url: Joi.string().min(2).max(1000).required(),
  alt: Joi.string().min(2).max(50).required(),
  level: Joi.string().min(2).max(20).required(),
  Ingredients: Joi.array().items(Joi.string().allow(null).allow("")).required(),
  steps: Joi.array().items(Joi.string().allow(null).allow("")).required(),
  category: Joi.string().min(2).max(50).required(),
});

export { schema as joiRecipeSchema };
