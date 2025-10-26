import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validateRequest, BadRequestError } from "@secshop/common";
import { User } from "@secshop/mongo"; // <-- your Mongo model

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be 4–20 chars"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    console.log("[AUTH] Received signup request", email); // <--- add this

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("[AUTH] User exists:", email);
      throw new BadRequestError("Email in use");
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    const userJwt = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!);

    req.session = { jwt: userJwt };

    console.log("[AUTH] Created user:", user.email);
    res.status(201).send(user);
  }
);

export { router as signupRouter };