import Joi from "joi";
import validation from "./validation";

const createSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(500).required(),
  url: Joi.string().min(2).max(200).required(),
  alt: Joi.string().min(2).max(50).required(),
  level: Joi.string().min(2).max(20).required(),
  Ingredients: Joi.array().items(Joi.string().allow(null).allow("")).required(),
  steps: Joi.array().items(Joi.string().allow(null).allow("")).required(),
  category: Joi.string().min(2).max(50).required(),
});

const recipeValidation = (inputToCheck) =>
  validation(createSchema, inputToCheck);

export { recipeValidation };
