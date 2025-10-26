import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../errors/not-authorized-error";

interface UserPayload {
  id: string;
  email: string;
}

// Extend Express Request to include session and currentUser
declare global {
  namespace Express {
    interface Request {
      session?: {
        jwt?: string;
      };
      currentUser?: UserPayload;
      traceId?: string;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  // Support both cookie session and Authorization header
  const token =
    req.session?.jwt || req.headers.authorization?.replace(/^Bearer\s/, "");

  if (!token) {
    return next();
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be defined");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    throw new NotAuthorizedError();
  }

  next();
};
