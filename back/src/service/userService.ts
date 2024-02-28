import { IUser } from "../@types/users";
import { User } from "../database/model/users";
import { FoodSiteError } from "../error/food_site_error";
import { auth } from "./authService";

const createUser = async (userData: IUser) => {
  const user = new User(userData);
  user.password = await auth.hashPassword(user.password);
  return user.save();
};

const validateUser = async (
  email: string,
  password: string,
  _id: string,
  isAdmin: boolean
) => {
  const user = await User.findById(_id);

  if (!user) {
    throw new FoodSiteError("Bad credentials", 401);
  }

  //check the password:
  const isPasswordValid = await auth.validatePassword(password, user.password);

  if (!isPasswordValid) {
    throw new FoodSiteError("Bad credentials", 401);
  }

  const jwt = auth.generateJWT({ email, _id, isAdmin });

  return { jwt };
};

export { createUser, validateUser };
