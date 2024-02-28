import Joi from "joi";
import validation from "./validation";

const createSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  subtitle: Joi.string().min(0).max(200),
  url: Joi.string().min(2).max(200).required(),
  alt: Joi.string().min(2).max(50).required(),
  address: Joi.string().min(2).max(200).required(),
  date: Joi.string()
    .pattern(/(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}/)
    .min(6)
    .max(12)
    .required(),
  time: Joi.string()
    .pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .min(5)
    .max(5)
    .required(),
});

const workshopValidate = (inputToCheck) =>
  validation(createSchema, inputToCheck);

export { workshopValidate };
