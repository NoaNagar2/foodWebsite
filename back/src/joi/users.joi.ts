import Joi from "joi";
import { IUser } from "../@types/users";
import { phoneRegex } from "./patterns";
import { isAdmin } from "../middleware/is-admin";

const schema = Joi.object<IUser>({
  email: Joi.string().email().min(5).max(255).required(),

  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),

  password: Joi.string().min(5).max(100).required(),
  phone: Joi.string().pattern(phoneRegex).min(9).max(20).required(),
});

export { schema as joiUserSchema };
