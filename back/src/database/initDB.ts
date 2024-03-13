import { Logger } from "../logs/logger";
import { auth } from "../service/authService";
import { Recipe } from "./model/recipe";
import { User } from "./model/users";
import { Workshop } from "./model/workshop";
import { recipeArr } from "./recipesArr";
import { usersArr } from "./usersArr";
import { workshopsArr } from "./workshopsArr";

const initDB = async () => {
  const usersCount = await User.countDocuments();
  const recipesCount = await Recipe.countDocuments();
  const workshopsCount = await Workshop.countDocuments();

  if (usersCount != 0) return;
  if (recipesCount != 0) return;
  if (workshopsCount != 0) return;

  if (usersCount == 0) {
    for (let user of usersArr) {
      user.password = await auth.hashPassword(user.password);
      const savedUser = await new User(user).save();
      Logger.verbose("Added users", savedUser);
    }
  }

  if (recipesCount == 0) {
    for (let user of recipeArr) {
      const savedRecipe = await new Recipe(user).save();
      Logger.verbose("Added recipes", savedRecipe);
    }
  }

  if (workshopsCount == 0) {
    for (let user of workshopsArr) {
      const savedWorkshop = await new Workshop(user).save();
      Logger.verbose("Added worksops", savedWorkshop);
    }
  }
};

export { initDB };
