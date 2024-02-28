import { Schema } from "mongoose";
import { IUser } from "../../@types/users";

const usersSchema = new Schema<IUser>({
  firstName: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 20,
  },
  lastName: {
    required: true,
    type: String,
    minlength: 0,
    maxlength: 20,
  },

  phone: {
    required: true,
    type: String,
    minlength: 9,
    maxlength: 20,
  },
  email: {
    unique: true,
    required: true,
    type: String,
    minlength: 7,
    maxlength: 20,
  },
  password: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 100,
  },
  isAdmin: {
    required: false,
    type: Boolean,
  },
});

export { usersSchema };
