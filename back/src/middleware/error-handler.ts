import { ErrorRequestHandler } from "express";
import { Logger } from "../logs/logger";
import { FoodSiteError } from "../error/food_site_error";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // userService Error
  Logger.error(err);
  if (err instanceof FoodSiteError) {
    return res.status(err.status).json({ message: err.message });
  }

  //   Json Error
  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: "Invalid Json" });
  }

  //   cathall
  return res.status(500).json({ message: "Internal Server Error" });
};

export { errorHandler };
