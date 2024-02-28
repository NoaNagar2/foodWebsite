import Joi from "joi";
import { ILogin } from "../@types/users";

const schema = Joi.object<ILogin>({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(30).required(),
});

export { schema as joiLoginSchema };
