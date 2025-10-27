// import { Router, Request, Response } from "express";
// import axios from "axios";

// export const router: Router = Router();

// router.get("/", (_req: Request, res: Response) => {
//   res.status(200).json({ message: "Auth route alive" });
// });

// router.post("/login", async (req: Request, res: Response) => {
//   try {
//     const response = await axios.post("http://auth:4001/login", req.body, {
//       headers: { "Content-Type": "application/json" },
//     });
//     res.status(response.status).json(response.data);
//   } catch (err: any) {
//     console.error("Auth proxy error:", err.message);
//     res.status(500).json({ error: "Auth service unreachable" });
//   }
// });
