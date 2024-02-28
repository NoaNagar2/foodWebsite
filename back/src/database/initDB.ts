import { Logger } from "../logs/logger";
import { auth } from "../service/authService";
import { User } from "./model/users";
import { usersArr } from "./usersArr";

const initDB = async () => {
  const usersCount = await User.countDocuments();

  if (usersCount != 0) return;

  if (usersCount == 0) {
    for (let user of usersArr) {
      user.password = await auth.hashPassword(user.password);
      const savedUser = await new User(user).save();
      Logger.verbose("Added users", savedUser);
    }
  }
};

export { initDB };
