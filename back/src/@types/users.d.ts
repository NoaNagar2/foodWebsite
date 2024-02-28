import { ObjectId } from "mongoose";

type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  isAdmin?: boolean;
  _id?: string;
};

type ILogin = {
  email: string;
  password: string;
};

type IJWTPayload = {
  email: string;
  _id: string;
  isAdmin: boolean;
};

export { IUser, ILogin, IJWTPayload };
