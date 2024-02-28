import mongoose from "mongoose";
import { usersSchema } from "../schema/usersSchema";

const User = mongoose.model("user", usersSchema);

export { User };
