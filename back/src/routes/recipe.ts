import { Router } from "express";
import { Recipe } from "../database/model/recipe";
import { extractToken, isAdmin } from "../middleware/is-admin";
import { validateRecipe } from "../middleware/validation";
import { auth } from "../service/authService";
import { User } from "../database/model/users";
import { IUser } from "../@types/users";
import { isLike } from "../middleware/is-like";
import { FoodSiteError } from "../error/food_site_error";
import { IRecipe } from "../@types/recipe";

const router = Router();

// get all recipe
router.get("/", async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find();
    res.json(allRecipes);
  } catch (e) {
    next(e);
  }
});

// get recipe by category
router.get("/:category", async (req, res, next) => {
  try {
    const { category } = req.params;
    const recipe = await Recipe.find();
    const byCategory = [];
    for (let i of recipe) {
      if (i.category == category) {
        byCategory.push(i);
      }
    }
    res.json(byCategory);
  } catch (e) {
    next(e);
  }
});

// get recipe by id
router.get("/page/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id");

    const recipe = await Recipe.findById(id);
    res.json(recipe);
  } catch (e) {
    next(e);
  }
});

// create recipe
router.post("/", isAdmin, validateRecipe, async (req, res, next) => {
  try {
    const createRecipe = new Recipe(req.body as IRecipe);
    createRecipe.save();

    res.json(createRecipe);
  } catch (e) {
    next(e);
  }
});

// edit recipe
router.put("/:id", isAdmin, validateRecipe, async (req, res, next) => {
  try {
    const _id = req.params.id;

    const recipe = await Recipe.findByIdAndUpdate(_id, req.body);
    recipe.save();

    res.json(recipe);
  } catch (e) {
    next(e);
  }
});

// like a recipe
router.patch("/:id", isLike, async (req, res, next) => {
  try {
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = (await User.findOne({ email }).lean()) as IUser;
    const userId = user._id;

    const saveLike = await Recipe.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { likes: userId } },
      {
        new: true,
      }
    );
    if (!saveLike) {
      throw new FoodSiteError("Recipe is not found", 404);
    }

    res.json(saveLike);
  } catch (e) {
    next(e);
  }
});

// delete recipe
router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);
    res.json("deleted" + recipe);
  } catch (e) {
    next(e);
  }
});

export { router as recipeRouter };
