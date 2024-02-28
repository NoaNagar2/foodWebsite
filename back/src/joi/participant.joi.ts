import Joi from "joi";
import { phoneRegex } from "./patterns";

const schema = Joi.object({
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  email: Joi.string().min(6).max(100).email().required(),
  phone: Joi.string().min(9).max(15).pattern(phoneRegex).required(),
});

export { schema as joiParticipantSchema };
