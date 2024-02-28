import { Router } from "express";
import { createUser, validateUser } from "../service/userService";
import {
  validateLogin,
  validateUserRegistration,
} from "../middleware/validation";
import { ILogin, IUser } from "../@types/users";
import { User } from "../database/model/users";
import { isAdmin } from "../middleware/is-admin";

const router = Router();

// register
router.post("/", validateUserRegistration, async (req, res, next) => {
  try {
    const { email, password } = req.body as IUser;
    const saved = await createUser(req.body as IUser);
    const user = await User.findOne({ email: email });
    const jwt = await validateUser(email, password, user._id, user.isAdmin);
    res.json(jwt);
    res.status(201).json({ message: "Saved", user: saved });
  } catch (err) {
    next(err);
  }
});

// login
router.post("/login", validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body as ILogin;
    const user = await User.findOne({ email: email });
    const jwt = await validateUser(email, password, user._id, user.isAdmin);
    res.json(jwt);
  } catch (e) {
    next(e);
  }
});

// login with google

// get all users
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find();

    res.json(allUsers);
  } catch (e) {
    next(e);
  }
});

// get user by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = (await User.findById(id).lean()) as IUser;
    const { password, ...rest } = user!;
    return res.json({ user: rest });
  } catch (e) {
    next(e);
  }
});

export { router as usersRouter };
