import express, { Request, Response, Router } from "express";
import { body } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@secshop/common";
import { User } from "../../models/user";


const router: Router = express.Router();

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password required")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    // Create JWT
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET!
    );

    // Store it on session object
    req.session = { jwt: userJwt };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
