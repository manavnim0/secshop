import express, { Router } from "express";

const router: Router = express.Router();
router.post("/signout", (req, res) => {
  req.session = undefined; // destroy cookie session
  res.send({ message: "Signed out successfully" });
});

export { router as signoutRouter };
