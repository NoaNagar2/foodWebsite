import Joi from "joi";
import validation from "./validation";

const createSchema = Joi.object({
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  password: Joi.string().min(5).max(30).required(),
  email: Joi.string().min(5).max(255).required(),
  phone: Joi.string()
    .min(9)
    .max(15)
    .pattern(/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/)
    .required(),
});

const registerValidation = (inputToCheck) =>
  validation(createSchema, inputToCheck);

export { registerValidation };
