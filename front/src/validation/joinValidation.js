import Joi from "joi";
import validation from "./validation";

const joinValidationCreate = Joi.object({
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  phone: Joi.string()
    .min(9)
    .max(15)
    .pattern(/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/)
    .required(),
  email: Joi.string().min(5).max(255).required(),
});

const joinValidation = (inputToCheck) =>
  validation(joinValidationCreate, inputToCheck);

export { joinValidation };
