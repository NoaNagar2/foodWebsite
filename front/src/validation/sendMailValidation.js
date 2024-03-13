import Joi from "joi";
import validation from "./validation";

const createSchema = Joi.object({
  subject: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(1500).required(),
});

const sendMailValidation = (inputToCheck) =>
  validation(createSchema, inputToCheck);

export { sendMailValidation };
