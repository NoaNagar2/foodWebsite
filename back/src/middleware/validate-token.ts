import { RequestHandler, Request } from "express";
import { FoodSiteError } from "../error/food_site_error";
import { auth } from "../service/authService";
import { User } from "../database/model/users";

const extractToken = (req: Request) => {
  const authHeader = req.header("Authorization");
  if (
    authHeader &&
    authHeader.length > 7 &&
    authHeader.toLowerCase().startsWith("bearer ")
  ) {
    return authHeader.substring(7);
  }
  throw new FoodSiteError("token is missing in Authorization header", 400);
};

const validateToken: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);

    const { email } = auth.verifyJWT(token);
    const user = await User.findOne({ email });
    if (!user) throw new FoodSiteError("User does not exist", 401);
    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};

export { validateToken };
