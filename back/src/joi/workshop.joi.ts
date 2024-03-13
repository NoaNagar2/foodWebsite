import Joi from "joi";
import { title } from "process";

const schema = Joi.object<IWorkshop>({
  title: Joi.string().min(2).max(100).required(),
  subtitle: Joi.string().min(0).max(200),
  url: Joi.string().min(2).max(1000).required(),
  alt: Joi.string().min(2).max(50).required(),
  address: Joi.string().min(2).max(200).required(),
  date: Joi.string()
    .pattern(/(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}/)
    .min(6)
    .max(100)
    .required(),
  time: Joi.string()
    .pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .min(5)
    .max(5)
    .required(),
});

export { schema as joiWorkshopSchema };
