import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from "express";

export const attachTrace = (req: Request, _res: Response, next: NextFunction) => {
  req.traceId = uuidv4();
  next();
};
