import { RequestHandler } from "express";
import { Recipe } from "../database/model/recipe";
import { extractToken } from "./is-admin";
import { auth } from "../service/authService";
import { User } from "../database/model/users";
import { IUser } from "../@types/users";
import { FoodSiteError } from "../error/food_site_error";
import { isValidObjectId } from "mongoose";

const isLike: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = (await User.findOne({ email }).lean()) as IUser;
    const userId = user._id;

    const recipeId = req.params.id;

    const valid = isValidObjectId(recipeId);
    if (!valid) {
      throw new FoodSiteError("The Id is not type of ObjectId", 401);
    }

    const cardExist = await Recipe.findById(recipeId);
    if (!cardExist) throw new FoodSiteError("Card does not exist", 401);
    const { likes } = await Recipe.findById(recipeId);

    if (likes.includes(userId)) {
      const card = await Recipe.findOneAndUpdate(
        { _id: recipeId },
        { $pull: { likes: userId } },
        { new: true }
      );
      res.json({ card });
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};

export { isLike };
