import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../errors/not-authorized-error";
interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
      traceId?: string;
    }
  }
}

export const currentUser = ( req: Request, res: Response, next: NextFunction) => {
  const token = req.session?.jwt || req.headers.authorization?.replace("Bearer", "");

  if(!token) {
    return next()
  }

  if(!process.env.JWT_SECRET){
    throw new Error("JWT_Secret must be defined")
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
    req.currentUser = payload as UserPayload
  } catch (err) {
    // console.warn("[AUTH] Invalid JWT:", err  instanceof Error ? err.message: err)
    throw new  NotAuthorizedError();
  }

  next();
}

// export const currentUser = (
//   req: Request,
//   _res: Response,
//   next: NextFunction
// ) => {
//   if (!req.session?.jwt) {
//     return next();
//   }

//   try {
//     const payload = jwt.verify(
//       req.session.jwt,
//       process.env.JWT_KEY as string
//     ) as UserPayload;

//     req.currentUser = payload;
//   } catch (err) {}
//   next();
// };
