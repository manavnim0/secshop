import express, { Router } from "express";
import { currentUser } from "@secshop/common";

const router: Router = express.Router();

// This route uses the middleware from @secshop/common
router.get("/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
