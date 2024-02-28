import Joi from "joi";
import validation from "./validation";

const createSchema = Joi.object({
  password: Joi.string().min(5).max(30).required(),
  email: Joi.string().min(5).max(255).required(),
});

const loginValidation = (inputToCheck) =>
  validation(createSchema, inputToCheck);

export { loginValidation };
