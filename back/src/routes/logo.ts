import { Router } from "express";

const router = Router();

// get all recipe
router.get("/logo", async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

export { router as logoRouter };
