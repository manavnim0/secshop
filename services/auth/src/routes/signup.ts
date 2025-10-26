import express, { Request, Response, Router } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
// No longer need to import bcrypt here!
// import bcrypt from "bcryptjs"; 
import { validateRequest, BadRequestError } from "@secshop/common";
import { User } from "@secshop/db"; // Use the refactored User model

const router: Router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be 4–20 chars"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email is already in use");
    }

    // 1. Build the user document in memory using your static method
    const user = User.build({ email, password });

    // 2. Save to the database. The 'pre-save' hook now handles hashing automatically.
    await user.save();

    // 3. Generate JWT
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!
    );

    // 4. Store it on the session object
    req.session = { jwt: userJwt };

    // The 'toJSON' transform automatically removes the password from the response
    res.status(201).send(user);
  }
);

export { router as signupRouter };
// import express, { Request, Response, Router } from "express";
// import { body } from "express-validator";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import { validateRequest, BadRequestError } from "@secshop/common";
// import User  from "@secshop/db"

// // import { User } from "../../models/user";

// const router: Router = express.Router();

// router.post(
//   "/signup",
//   [
//     body("email").isEmail().withMessage("Email must be valid"),
//     body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be 4–20 chars")
//   ],
//   validateRequest,
//   async (req: Request, res: Response) => {
//     const { email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) throw new BadRequestError("Email in use");
//     const hashed = await bcrypt.hash(password, 10);
//     const user = await User.create({ email, password: hashed });

//     const userJwt = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!);

//     req.session  = { jwt: userJwt };

//     res.status(201).send(user);
//   }
// );

// export { router as signupRouter };