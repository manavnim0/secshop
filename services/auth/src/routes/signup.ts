import express, { Request, Response, Router } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validateRequest, BadRequestError } from "@secshop/common";
import { User } from "@secshop/db"; // <-- your Mongo model

const router: Router = express.Router();

router.post("/signup", async (req, res) =>{
  const { email } = req.body;
  console.log("Signup request received:", email);
  return res.status(201).json({ ok: true });
})

// router.post(
//   "/signup",
//   // Keep validation commented out for this testw
//   async (req: Request, res: Response) => {
//     const { email, password } = req.body;

//     console.log("1. [SIGNUP] Handler started for:", email); // <-- LOG 1

//     try {
//       const existingUser = await User.findOne({ email });

//       console.log("2. [SIGNUP] Database query finished."); // <-- LOG 2

//       if (existingUser) {
//         console.log("[SIGNUP] User already exists:", email);
//         throw new BadRequestError("Email in use");
//       }

//       const hashed = await bcrypt.hash(password, 10);
//       const user = await User.create({ email, password: hashed });

//       const userJwt = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!);
//       req.session = { jwt: userJwt };

//       console.log("3. [SIGNUP] User created successfully:", user.email);
//       res.status(201).send(user);

//     } catch (err) {
//       console.error("!!! [SIGNUP] AN ERROR OCCURRED:", err);
//       // Re-throw the error to be handled by your global errorHandler
//       throw err;
//     }
//   }
// );

export { router as signupRouter };